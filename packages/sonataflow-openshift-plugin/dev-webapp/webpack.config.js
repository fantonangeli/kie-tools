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

const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const { merge } = require("webpack-merge");
const common = require("@kie-tools-core/webpack-base/webpack.common.config");
const patternflyBase = require("@kie-tools-core/patternfly-base");
const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");
const swEditorAssets = require("@kie-tools/serverless-workflow-diagram-editor-assets");

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const { env } = require("../env");

module.exports = (webpackEnv) =>
  merge(common(webpackEnv), {
    mode: "development",
    entry: {
      index: path.resolve(__dirname, "./index.tsx"),
      // "serverless-workflow-text-editor-envelope": path.resolve(
      //   __dirname,
      //   "./envelope/ServerlessWorkflowTextEditorEnvelopeApp.ts"
      // ),
      // "serverless-workflow-diagram-editor-envelope": path.resolve(
      //   __dirname,
      //   "./envelope/ServerlessWorkflowDiagramEditorEnvelopeApp.ts"
      // ),
      // "serverless-workflow-combined-editor-envelope": path.resolve(
      //   __dirname,
      //   "./envelope/ServerlessWorkflowCombinedEditorEnvelopeApp.ts"
      // ),
    },
    output: {
      path: path.resolve("../dist-dev"),
    },
    resolve: {
      alias: {
        "@patternfly/react-core/dist/*": path.resolve(__dirname, "../node_modules/@patternfly/react-core/src/*"),
        prettier$: path.resolve(__dirname, "../node_modules/prettier"),
        "prettier/parser-yaml": path.resolve(__dirname, "../node_modules/prettier/plugins/yaml"),
        "./impl/format": path.resolve(
          "/home/fantonan/NotBackedUp/repos/kie-tools-k/packages/sonataflow-openshift-plugin/node_modules/jsonc-parser/lib/umd/main.js"
        ),
        "jsonc-parser": require.resolve("jsonc-parser"),
        // "./impl/*": path.resolve(__dirname, "node_modules/jsonc-parser/lib/esm/impl/*"),
        // "./impl/*": path.resolve(__dirname, "../node_modules/jsonc-parser/lib/esm/impl/*"),
        "vscode-json-languageservice/*": path.resolve(
          __dirname,
          "../node_modules/vscode-json-languageservice/lib/esm/*"
        ),

        "@kie-tools/runtime-tools-components/dist": "@kie-tools/runtime-tools-components/src/common",
        "@kie-tools-core/editor/dist": "@kie-tools-core/editor/src",
        "@kie-tools-core/envelope-bus/dist": "@kie-tools-core/envelope-bus/src",
        "@kie-tools-core/workspace/dist": "@kie-tools-core/workspace/src",
        "@kie-tools/serverless-workflow-combined-editor/dist": "@kie-tools/serverless-workflow-combined-editor/src",
        "@kie-tools/serverless-workflow-standalone-editor/dist": "@kie-tools/serverless-workflow-standalone-editor/src",
        "@kie-tools/serverless-workflow-language-service/dist": "@kie-tools/serverless-workflow-language-service/src",
        "@kie-tools/json-yaml-language-service/dist": "@kie-tools/json-yaml-language-service/src",
        "@kie-tools/serverless-workflow-jq-expressions/dist": "@kie-tools/serverless-workflow-jq-expressions/src",
        "@kie-tools/serverless-workflow-service-catalog/dist": "@kie-tools/serverless-workflow-service-catalog/src",
        "@kie-tools/yaml-language-server": "@kie-tools/yaml-language-server/src",
        "!!raw-loader!../../dist/resources/swf/swfCombinedEditorEnvelopeIndex.html":
          "!!raw-loader!../serverless-workflow-standalone-editor/dist/resources/swf/swfCombinedEditorEnvelopeIndex.html",

        "!!raw-loader!../../dist/resources/swf/swfDiagramEditorEnvelopeIndex.html":
          "!!raw-loader!../serverless-workflow-standalone-editor/dist/resources/swf/swfDiagramEditorEnvelopeIndex.html",

        "!!raw-loader!../../dist/resources/swf/swfTextEditorEnvelopeIndex.html":
          "!!raw-loader!../serverless-workflow-standalone-editor/dist/resources/swf/swfTextEditorEnvelopeIndex.html",
      },
    },
    plugins: [
      new CopyPlugin({
        patterns: [
          { from: path.resolve(__dirname, "./static/index.html"), to: "./index.html" },
          {
            from: swEditorAssets.swEditorPath(),
            to: "./diagram",
            globOptions: { ignore: ["**/WEB-INF/**/*", "**/*.html"] },
          },
          {
            context: swEditorAssets.swEditorFontsPath(),
            from: "fontawesome-webfont.*",
            to: "./fonts",
            force: true,
          },
          {
            from: path.resolve(__dirname, "../resources/serverless-workflow-text-editor-envelope.html"),
            to: "./serverless-workflow-text-editor-envelope.html",
          },
          {
            from: path.resolve(__dirname, "../resources/serverless-workflow-diagram-editor-envelope.html"),
            to: "./serverless-workflow-diagram-editor-envelope.html",
          },
          {
            from: path.resolve(__dirname, "../resources/serverless-workflow-combined-editor-envelope.html"),
            to: "./serverless-workflow-combined-editor-envelope.html",
          },
        ],
      }),
      new MonacoWebpackPlugin({
        languages: ["json"],
        customLanguages: [
          {
            label: "yaml",
            entry: ["monaco-yaml", "vs/basic-languages/yaml/yaml.contribution"],
            worker: {
              id: "monaco-yaml/yamlWorker",
              entry: "monaco-yaml/yaml.worker.js",
            },
          },
        ],
      }),
    ],
    module: {
      rules: [...patternflyBase.webpackModuleRules],
    },
    ignoreWarnings: [/Failed to parse source map/],
    devServer: {
      historyApiFallback: true,
      static: [{ directory: path.join(__dirname) }],
      compress: true,
      port: env.sonataflowOpenshiftPlugin.dev.port,
    },
  });
