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

import * as jsonc from "jsonc-parser";
import { load, YAMLNode, Kind } from "yaml-language-server-parser";
import { FileLanguage } from "../editor";
import { SwfLanguageService, SwfLanguageServiceArgs, SwfLSNode, SwfLSNodeType } from "./SwfLanguageService";

export class SwfYamlLanguageService extends SwfLanguageService {
  fileLanguage = FileLanguage.YAML;
  fileMatch = ["*.sw.yaml", "*.sw.yml"];

  constructor(args: SwfLanguageServiceArgs) {
    super(args);
  }

  protected parseContent(content: string): SwfLSNode | undefined {
    const ast = load(content);

    // check if the yaml is not valid
    if (ast.errors && ast.errors.length) {
      throw new Error(ast.errors[0].message);
    }

    return astConvert(ast);
  }
}

const getSwfLSNodeType = (kind: Kind): SwfLSNodeType => {
  switch (kind) {
    case 0:
      return "property";
    case 1:
      return "string";
    case 2:
      return "object";
    case 3:
      return "array";
    default:
      return "object";
  }
};

const astConvert = (node: YAMLNode, parentNode?: SwfLSNode): SwfLSNode | undefined => {
  const currentNode: SwfLSNode = {
    type: getSwfLSNodeType(node.kind),
    value: node.value.value,
    offset: node.startPosition,
    length: node.endPosition - node.startPosition,
    colonOffset: node.endPosition,
    parent: parentNode,
  };

  currentNode.children = node.value.items.map((child: YAMLNode) => astConvert(child, currentNode));

  return currentNode;
};