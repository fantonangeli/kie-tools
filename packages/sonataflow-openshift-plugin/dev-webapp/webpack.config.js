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
      index: path.resolve(__dirname, "./src/index.tsx"),
    },
    output: {
      path: path.resolve("../dist-dev"),
      publicPath: "/",
    },
    resolve: {
      alias: {
        prettier$: path.resolve(__dirname, "../node_modules/prettier"),

        // force the use of esm format instead of umd
        "vscode-json-languageservice/lib/umd/services": path.resolve(
          __dirname,
          "../node_modules/vscode-json-languageservice/lib/esm/services"
        ),

        "@kie-tools-core/editor/dist": "@kie-tools-core/editor/src",
        "@kie-tools-core/envelope-bus/dist": "@kie-tools-core/envelope-bus/src",
        "@kie-tools-core/workspace/dist": "@kie-tools-core/workspace/src",
        "@kie-tools/json-yaml-language-service/dist": "@kie-tools/json-yaml-language-service/src",
        "@kie-tools/runtime-tools-components/dist": "@kie-tools/runtime-tools-components/src/common",
        "@kie-tools/serverless-workflow-combined-editor/dist": "@kie-tools/serverless-workflow-combined-editor/src",
        "@kie-tools/serverless-workflow-jq-expressions/dist": "@kie-tools/serverless-workflow-jq-expressions/src",
        "@kie-tools/serverless-workflow-language-service/dist": "@kie-tools/serverless-workflow-language-service/src",
        "@kie-tools/serverless-workflow-service-catalog/dist": "@kie-tools/serverless-workflow-service-catalog/src",
        "@kie-tools/serverless-workflow-standalone-editor/dist": "@kie-tools/serverless-workflow-standalone-editor/src",
        "@kie-tools/yaml-language-server": "@kie-tools/yaml-language-server/src",
      },
      extensions: [".js", ".json", ".ts"],
    },
    plugins: [
      new CopyPlugin({
        patterns: [{ from: "./dev-webapp/static", to: "." }],
      }),
    ],
    module: {
      rules: [
        ...patternflyBase.webpackModuleRules,
        {
          test: /\.sw\.(yaml|yml|json)$/i,
          type: "javascript/auto",
          use: "raw-loader",
        },
      ],
    },
    ignoreWarnings: [/Failed to parse source map/],
    devServer: {
      historyApiFallback: true,
      static: [{ directory: path.join(__dirname, "./dist") }, { directory: path.join(__dirname, "./static") }],
      compress: true,
      port: env.sonataflowOpenshiftPlugin.dev.port,
    },
  });
