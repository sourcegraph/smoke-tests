#!/bin/bash
instances=$(echo $INSTANCES | tr "," "\n")
echo "--- :list: Instances list $instances"

for instance in $instances; do
    echo "--- :fire: Running smoke tests against https://$instance"
    SOURCEGRAPH_URL=https://$instance npx @sourcegraph/web-smoke-tests@latest start
    # TODO notify/opsgenie slack if failure
done
