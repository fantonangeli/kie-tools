#!/bin/sh
#
# Licensed to the Apache Software Foundation (ASF) under one
# or more contributor license agreements.  See the NOTICE file
# distributed with this work for additional information
# regarding copyright ownership.  The ASF licenses this file
# to you under the Apache License, Version 2.0 (the
# "License"); you may not use this file except in compliance
# with the License.  You may obtain a copy of the License at
#
#   http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing,
# software distributed under the License is distributed on an
# "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
# KIND, either express or implied.  See the License for the
# specific language governing permissions and limitations
# under the License.
#

ARGV=("$@")
KIE_TOOLS_ORG=$1
KIE_TOOLS_BRANCH=$2
KIE_TOOLS_PACKAGE_NAMES_TO_BUILD=("${ARGV[@]:2}")
KIE_TOOLS_PACKAGES_PNPM_FILTER_STRING=$(echo ${KIE_TOOLS_PACKAGE_NAMES_TO_BUILD[@]} | xargs -n1 -I{} echo -n "-F {}... " | xargs)
KIE_TOOLS_GIT_REMOTE_URL="https://github.com/$KIE_TOOLS_ORG/incubator-kie-tools"
KIE_TOOLS_CLONE_DIR_PATH='incubator-kie-tools'
KIE_TOOLS_PATHS_INCLUDED_BY_DEFAULT='scripts repo docs patches'

echo "[kie-tools-sparse-checkout] Starting..."
echo "KIE_TOOLS_ORG:                           $KIE_TOOLS_ORG"
echo "KIE_TOOLS_BRANCH:                        $KIE_TOOLS_BRANCH"
echo "KIE_TOOLS_PACKAGE_NAMES_TO_BUILD:        ${KIE_TOOLS_PACKAGE_NAMES_TO_BUILD[@]}"
echo "KIE_TOOLS_PACKAGES_PNPM_FILTER_STRING:   $KIE_TOOLS_PACKAGES_PNPM_FILTER_STRING"
echo "KIE_TOOLS_GIT_REMOTE_URL:                $KIE_TOOLS_GIT_REMOTE_URL"
echo "KIE_TOOLS_CLONE_DIR_PATH:                $KIE_TOOLS_CLONE_DIR_PATH"
echo "KIE_TOOLS_PATHS_INCLUDED_BY_DEFAULT:     $KIE_TOOLS_PATHS_INCLUDED_BY_DEFAULT"
echo ""

echo "[kie-tools-sparse-checkout] Cloning into $KIE_TOOLS_CLONE_DIR_PATH..."
git clone --filter=blob:none --no-checkout --depth 1 --branch $KIE_TOOLS_BRANCH $KIE_TOOLS_GIT_REMOTE_URL
cd $KIE_TOOLS_CLONE_DIR_PATH
git sparse-checkout init --cone
git checkout $KIE_TOOLS_BRANCH
git sparse-checkout set $KIE_TOOLS_PATHS_INCLUDED_BY_DEFAULT
echo ""

echo "[kie-tools-sparse-checkout] Installing scripts and root dependencies..."
pnpm bootstrap:root --frozen-lockfile
echo ""

echo "[kie-tools-sparse-checkout] Listing paths of packages to fetch for (${KIE_TOOLS_PACKAGE_NAMES_TO_BUILD[@]})..."
KIE_TOOLS_PACKAGE_PATHS_TO_FETCH=$(pnpm kie-tools--list-packages-dependencies ./repo "${KIE_TOOLS_PACKAGE_NAMES_TO_BUILD[@]}")
echo $KIE_TOOLS_PACKAGE_PATHS_TO_FETCH | xargs -n1
echo ""

echo "[kie-tools-sparse-checkout] Fetching packages..."
eval "git sparse-checkout set $KIE_TOOLS_PATHS_INCLUDED_BY_DEFAULT $KIE_TOOLS_PACKAGE_PATHS_TO_FETCH"
echo ""

echo "[kie-tools-sparse-checkout] Installing packages dependencies..."
eval "pnpm bootstrap:packages $KIE_TOOLS_PACKAGES_PNPM_FILTER_STRING --frozen-lockfile"
echo ""

echo "[kie-tools-sparse-checkout] Done."
