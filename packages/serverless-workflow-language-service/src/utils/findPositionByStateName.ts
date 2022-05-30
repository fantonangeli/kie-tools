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

export type Position = {
  line: number;
  character: number;
};

/**
 * Find position (row number) of a node in a JSON by state name.
 *
 * @param fullText the full text where to search
 * @param stateName the name of the node
 * @param fileType the current file type
 * @returns the position of the node, null if not found
 */
export const findPositionByStateName = (
  fullText: string,
  stateName: string,
  fileType: "JSON" | "YAML" = "JSON"
): Position | null => {
  if (!fullText || !stateName) {
    return null;
  }

  const fullTextSplit = fullText.split("\n");
  let nameRegExp = new RegExp(`"name"\\s*:\\s*"${stateName}"`);

  if (fileType === "YAML") {
    nameRegExp = new RegExp(`name\\s*:\\s*${stateName}`);
  }

  for (let lineNum = 0, end = fullTextSplit.length; lineNum < end; lineNum++) {
    const line = fullTextSplit[lineNum];

    if (nameRegExp.test(line)) {
      const charNum = line.indexOf("name") - 1;
      return { line: lineNum, character: charNum };
    }
  }

  return null;
};
