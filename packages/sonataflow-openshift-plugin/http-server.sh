#!/usr/bin/env bash

set -u

PUBLIC_PATH="$1"
shift
SERVER_OPTS="$@"

http-server $PUBLIC_PATH -p 9001 -c-1 --cors $SERVER_OPTS
