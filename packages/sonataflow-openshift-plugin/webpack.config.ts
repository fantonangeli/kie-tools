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

import * as path from "path";
import { merge } from "webpack-merge";
import NodePolyfillPlugin from "node-polyfill-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
// import MonacoWebpackPlugin from "monaco-editor-webpack-plugin";
import CopyPlugin from "copy-webpack-plugin";
import FileManagerPlugin from "filemanager-webpack-plugin";
import { ConsoleRemotePlugin } from "@openshift-console/dynamic-plugin-sdk-webpack";
import common from "@kie-tools-core/webpack-base/webpack.common.config";
import * as swEditorAssets from "@kie-tools/serverless-workflow-diagram-editor-assets";
import webpack from "webpack";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { env } from "./env";

const buildEnv: any = env; // build-env is not typed

const isProd = process.env.NODE_ENV === "production";

export default async (webpackEnv: any, webpackArgv: any) => {
  return [
    {
      ...merge(common(webpackEnv), {
        entry: {},
        context: path.resolve(__dirname, "src"),
        output: {
          path: path.resolve("./dist"),
          filename: "[name].js",
          chunkFilename: "[name].bundle.js",
        },
        resolve: {
          fallback: {
            https: require.resolve("https-browserify"),
            http: require.resolve("stream-http"),
            os: require.resolve("os-browserify/browser"),
          },
          alias: {
            "@patternfly/react-core/dist": "@patternfly/react-core",
            prettier$: path.resolve(__dirname, "node_modules/prettier"),
            "prettier/parser-yaml": path.resolve(__dirname, "node_modules/prettier/plugins/yaml"),
            // "jsonc-parser": require.resolve("jsonc-parser"),
            // "./impl/*": path.resolve(__dirname, "node_modules/jsonc-parser/lib/esm/impl/*"),
            "jsonc-parser": require.resolve("jsonc-parser/lib/esm/main.js"),
            "./impl/*": path.resolve(__dirname, "node_modules/jsonc-parser/lib/esm/impl/*"),
            "vscode-json-languageservice/*": path.resolve(
              __dirname,
              "node_modules/vscode-json-languageservice/lib/esm/*"
            ),

            "@kie-tools/runtime-tools-components/dist": "@kie-tools/runtime-tools-components/src/common",
            "@kie-tools-core/editor/dist": "@kie-tools-core/editor/src",
            "@kie-tools-core/envelope-bus/dist": "@kie-tools-core/envelope-bus/src",
            "@kie-tools-core/workspace/dist": "@kie-tools-core/workspace/src",
            "@kie-tools/serverless-workflow-combined-editor/dist": "@kie-tools/serverless-workflow-combined-editor/src",
            "@kie-tools/serverless-workflow-standalone-editor/dist":
              "@kie-tools/serverless-workflow-standalone-editor/src",
            "@kie-tools/serverless-workflow-language-service/dist":
              "@kie-tools/serverless-workflow-language-service/src",
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
          extensions: [".tsx", ".ts", ".js", ".jsx"],
          modules: ["node_modules"],
        },
        plugins: [
          // new webpack.IgnorePlugin({
          //   resourceRegExp: /^jsonc-parser$/,
          // }),
          new ConsoleRemotePlugin(),
          // new HtmlWebpackPlugin({
          //   template: "./src/index.html",
          //   inject: false,
          //   minify: false,
          // }),
          new CopyPlugin({
            patterns: [
              { from: "../resources", to: "./resources" },
              {
                from: "../node_modules/@kie-tools/serverless-workflow-standalone-editor/dist/resources",
                to: "./resources",
              },
              {
                from: "../resources/serverless-workflow-combined-editor-envelope.html",
                to: "./serverless-workflow-combined-editor-envelope.html",
              },
              {
                from: "../resources/serverless-workflow-diagram-editor-envelope.html",
                to: "./serverless-workflow-diagram-editor-envelope.html",
              },
              {
                from: "../resources/serverless-workflow-text-editor-envelope.html",
                to: "./serverless-workflow-text-editor-envelope.html",
              },
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
            ],
          }),
          new FileManagerPlugin({
            events: {
              onEnd: {
                mkdir: ["./dist/resources/webapp/"],
                copy: [
                  { source: "./dist/*.js", destination: "./dist/resources/webapp/" },
                  { source: "./dist/*.map", destination: "./dist/resources/webapp/" },
                  // { source: "./dist/fonts", destination: "./dist/resources/webapp/fonts" },
                ],
              },
            },
          }),
          // new MonacoWebpackPlugin({
          //   languages: ["json"],
          // }),
          new NodePolyfillPlugin(),
        ],
      }),
      module: {
        rules: [
          {
            test: /\.(jsx?|tsx?)$/,
            exclude: /\/node_modules\//,
            use: [
              {
                loader: "ts-loader",
                options: {
                  configFile: path.resolve(__dirname, "tsconfig.json"),
                },
              },
            ],
          },
          {
            test: /\.(css|sass|scss)$/,
            use: [require.resolve("style-loader"), require.resolve("css-loader"), require.resolve("sass-loader")],
          },
          {
            test: /\.(png|jpg|jpeg|gif|svg|woff2?|ttf|eot|otf)(\?.*$|$)/,
            type: "asset/resource",
            generator: {
              filename: isProd ? "assets/[contenthash][ext]" : "assets/[name][ext]",
            },
          },
          {
            test: /\.(m?js)$/,
            resolve: {
              fullySpecified: false,
            },
          },
          {
            test: /\.(svg|ttf|eot|woff|woff2)$/,
            use: {
              loader: require.resolve("file-loader"),
              options: {
                // Limit at 50k. larger files emited into separate files
                limit: 5000,
                outputPath: "fonts",
                name: "[path][name].[ext]",
              },
            },
          },
        ],
      },
      devServer: {
        static: {
          directory: "./dist",
        },
        port: buildEnv.sonataflowOpenshiftPlugin.plugin.port,
        compress: true,
        historyApiFallback: false,
        hot: true,
        client: {
          overlay: {
            warnings: false,
            errors: true,
            runtimeErrors: false,
          },
          progress: true,
        },
        proxy: {
          "/svg": {
            target: "http://localhost:4000",
            secure: false,
            changeOrigin: true,
          },
        },
        // Allow Bridge running in a container to connect to the plugin dev server.
        allowedHosts: "all",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
          "Access-Control-Allow-Headers": "X-Requested-With, Content-Type, Authorization",
        },
        devMiddleware: {
          writeToDisk: true,
        },
      },
    },
  ];
};
