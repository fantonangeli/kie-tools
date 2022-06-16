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
import * as fs from "fs";
import * as path from "path";
import { SwfJsonOffsets } from "@kie-tools/serverless-workflow-language-service/dist/editor";

describe("SwfJsonOffsets tests", () => {
  const inputFilesBasePath = path.join("tests", "inputFiles", "json") + "/";
  const allInputFiles = [["helloState.sw.json"], ["greeting.sw.json"], ["greeting-long.sw.json"]];
  const allInputFilesFullText = new Map(
    allInputFiles.map((item) => [item[0], fs.readFileSync(inputFilesBasePath + item[0], "utf8").toString()])
  );

  describe("getFullAST", () => {
    it("Should return {} with wrong inputs", () => {
      expect(new SwfJsonOffsets("").getFullAST()).toStrictEqual({});
      // @ts-ignore
      expect(new SwfJsonOffsets(null).getFullAST()).toStrictEqual({});
      // @ts-ignore
      expect(new SwfJsonOffsets().getFullAST()).toStrictEqual({});
      expect(new SwfJsonOffsets('{"notValid":').getFullAST()).toStrictEqual({});
    });

    it.each(allInputFiles)("Should return a valid object parsing the input file %s", (fileName) => {
      const swfJsonOffsets = new SwfJsonOffsets(allInputFilesFullText.get(fileName)!);

      expect(swfJsonOffsets.getFullAST()).toHaveProperty("children");
    });
  });

  describe("getAllOffsets", () => {
    it("Should return {} with wrong inputs", () => {
      const emptyOffsets = { states: {} };
      // @ts-ignore
      expect(new SwfJsonOffsets(null).getAllOffsets()).toStrictEqual(emptyOffsets);
      // @ts-ignore
      expect(new SwfJsonOffsets().getAllOffsets()).toStrictEqual(emptyOffsets);
      expect(new SwfJsonOffsets("").getAllOffsets()).toStrictEqual(emptyOffsets);
      expect(new SwfJsonOffsets('{"notValid":').getAllOffsets()).toStrictEqual(emptyOffsets);
    });

    it("Should return a valid object parsing the input file 'helloState.sw.json'", () => {
      const fileName = "helloState.sw.json";
      const fullText = allInputFilesFullText.get(fileName)!;
      const offsets = new SwfJsonOffsets(fullText).getAllOffsets();

      expect(offsets.states["Hello State"].stateNameOffset).toBe(141);
      expect(offsets.states["Hello State Two"].offset.start).toBe(283);
      expect(offsets.states["Hello State Two"].offset.end).toBe(423);
    });

    it("Should return a valid object parsing the input file 'greeting.sw.json'", () => {
      const fileName = "greeting.sw.json";
      const fullText = allInputFilesFullText.get(fileName)!;
      const offsets = new SwfJsonOffsets(fullText).getAllOffsets();

      expect(offsets.states["GreetInEnglish"].stateNameOffset).toBe(840);
      expect(offsets.states["GetGreeting"].offset.start).toBe(1320);
      expect(offsets.states["GetGreeting"].offset.end).toBe(1780);
    });

    it("Should return a valid object parsing the input file 'greeting-long.sw.json'", () => {
      const fileName = "greeting-long.sw.json";
      const fullText = allInputFilesFullText.get(fileName)!;
      const offsets = new SwfJsonOffsets(fullText).getAllOffsets();

      expect(offsets.states["GreetInEnglish"].stateNameOffset).toBe(840);
      expect(offsets.states["GreetInPortuguese 2"].offset.start).toBe(1640);
      expect(offsets.states["GreetInEnglish 4"].offset.end).toBe(2446);
    });
  });

  describe("getStateNameOffset", () => {
    const fullText = allInputFilesFullText.get("helloState.sw.json")!;
    const helloStateJsonOffsets = new SwfJsonOffsets(fullText);

    it("Should return -1 with wrong inputs", () => {
      expect(new SwfJsonOffsets("").getStateNameOffset("Hello State")).toBe(-1);
      // @ts-ignore
      expect(helloStateJsonOffsets.getStateNameOffset()).toBe(-1);
      // @ts-ignore
      expect(helloStateJsonOffsets.getStateNameOffset(null)).toBe(-1);
      expect(helloStateJsonOffsets.getStateNameOffset("")).toBe(-1);
    });

    it("Should return -1 if the state is not found", () => {
      expect(() => {
        helloStateJsonOffsets.getStateNameOffset("Not a state");
      }).not.toThrowError();
      expect(helloStateJsonOffsets.getStateNameOffset("Not a state")).toBe(-1);
    });

    it.each([
      ["helloState.sw.json", "Hello State", 141],
      ["helloState.sw.json", "Hello State Two", 283],
      ["greeting.sw.json", "GreetInEnglish", 840],
      ["greeting.sw.json", "GetGreeting", 1320],
    ])(
      'On file %s, getStateNameOffset() with state name "%s" should return %s',
      (fileName, stateName, expectedOffset) => {
        const fullText = allInputFilesFullText.get(fileName)!;
        const swfJsonOffsets = new SwfJsonOffsets(fullText);
        expect(swfJsonOffsets.getStateNameOffset(stateName)).toBe(expectedOffset);
      }
    );
  });

  describe("getStateNameFromOffset", () => {
    const fullText = allInputFilesFullText.get("helloState.sw.json")!;
    const helloStateJsonOffsets = new SwfJsonOffsets(fullText);

    it("Should return null with wrong inputs", () => {
      expect(new SwfJsonOffsets("").getStateNameFromOffset(-1)).toBeNull();
      // @ts-ignore
      expect(helloStateJsonOffsets.getStateNameFromOffset()).toBeNull();
      // @ts-ignore
      expect(helloStateJsonOffsets.getStateNameFromOffset(0)).toBeNull();
    });

    it("Should return null if the state is not found", () => {
      expect(helloStateJsonOffsets.getStateNameFromOffset(999999999999999999999999999999999999999999999)).toBeNull();
      expect(() => {
        helloStateJsonOffsets.getStateNameFromOffset(100);
      }).not.toThrowError();
      expect(helloStateJsonOffsets.getStateNameFromOffset(100)).toBeNull();
    });

    it.each([
      ["helloState.sw.json", 161, "Hello State"],
      ["helloState.sw.json", 300, "Hello State Two"],
      ["greeting.sw.json", 860, "GreetInEnglish"],
      ["greeting.sw.json", 1360, "GetGreeting"],
    ])('On file %s, with offset %d should return state name "%s"', (fileName, offset, expectedStateName) => {
      const fullText = allInputFilesFullText.get(fileName)!;
      const swfJsonOffsets = new SwfJsonOffsets(fullText);
      expect(swfJsonOffsets.getStateNameFromOffset(offset)).toBe(expectedStateName);
    });
  });
});
