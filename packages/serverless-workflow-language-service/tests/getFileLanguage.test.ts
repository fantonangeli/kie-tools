/*
 * Copyright 2022 Red Hat, Inc. and/or its affiliates.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { getFileLanguage } from "@kie-tools/serverless-workflow-language-service/dist/editor";

describe("getFileLanguage", () => {
  it("Checking file language with not valid inputs", () => {
    // @ts-ignore
    expect(getFileLanguage(null)).toBe(null);
    // @ts-ignore
    expect(getFileLanguage(undefined)).toBe(null);
    // @ts-ignore
    expect(getFileLanguage("")).toBe(null);
    // @ts-ignore
    expect(getFileLanguage(" ")).toBe(null);
  });

  it.each([
    ["not_valid.txt", null],
    ["/home/user/Desktop/not_valid.txt", null],
    ["C:\\Users\\MyName\\Desktop\\not_valid.txt", null],
    ["not_valid.json", null],
    ["/home/user/Desktop/not_valid.json", null],
    ["C:\\Users\\MyName\\Desktop\\not_valid.json", null],
    ["valid.sw.json", "json"],
    ["/home/user/Desktop/valid.sw.json", "json"],
    ["C:\\Users\\MyName\\Desktop\\valid.sw.json", "json"],
    ["valid.sw.yml", "yaml"],
    ["/home/user/Desktop/valid.sw.yml", "yaml"],
    ["C:\\Users\\MyName\\Desktop\\valid.sw.yml", "yaml"],
    ["valid.sw.yaml", "yaml"],
    ["/home/user/Desktop/valid.sw.yaml", "yaml"],
    ["C:\\Users\\MyName\\Desktop\\valid.sw.yaml", "yaml"],
  ])("Checking file language of: %s", (fileName, expectFileLanguage) => {
    expect(getFileLanguage(fileName)).toBe(expectFileLanguage);
  });
});
