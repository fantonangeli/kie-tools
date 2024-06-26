/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import KieSandboxFs from "@kie-tools/kie-sandbox-fs";

const fs = new KieSandboxFs();
const pfs = fs.promises;

// IDK it's broke. It's time to rewrite KieSandboxFs basically.

xdescribe("hotswap backends", () => {
  it("graceful transition", async () => {
    const N = 1;
    class MockBackend {
      constructor() {
        this.count = 0;
        this.writeFile = this.writeFile.bind(this);
      }
      async writeFile() {
        await new Promise((r) => setTimeout(r, 100 * Math.random()));
        this.count++;
      }
      async readFile() {
        return "foo";
      }
    }

    const b1 = new MockBackend();
    const b2 = new MockBackend();

    // write N files to mock backend 1
    await fs.init("testfs-custom-1", { backend: b1, defer: true });
    for (let i = 0; i < N; i++) {
      // we don't await
      pfs.writeFile("hello", "foo");
    }

    // swap backends without waiting
    await fs.init("testfs-custom-2", { backend: b2, defer: true });
    expect(pfs._operations.size).toBe(N);

    // write N files to mock backend 2
    for (let i = 0; i < N; i++) {
      // we don't await
      pfs.writeFile("hello", "foo");
    }

    // swap backend back without waiting
    fs.init("testfs-custom-1", { backend: b1, defer: true });
    expect(pfs._operations.size).toBe(N);

    // but now we have to wait. because we're dumb and the hotswapping isn't perfect
    await new Promise((r) => setTimeout(r, 250));
    expect(pfs._operations.size).toBe(0);

    // everything should be synced now
    expect(b1.count).toBe(N);
    expect(b2.count).toBe(N);
  });
});
