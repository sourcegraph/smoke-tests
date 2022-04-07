#!/bin/bash

SOURCEGRAPH_URL="$BASE_URL"
echo "--- :fire: Running smoke tests against $SOURCEGRAPH_URL"
npx @sourcegraph/web-smoke-tests@latest start
