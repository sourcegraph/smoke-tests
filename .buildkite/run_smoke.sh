#!/bin/bash

echo "--- :fire: Running smoke tests against $BASE_URL"
SOURCEGRAPH_URL=$BASE_URL npx @sourcegraph/web-smoke-tests@latest start
