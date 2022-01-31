#!/usr/bin/env bash

# This script will run Lighthouse audits against a specified URL
# and generate a text report suitable for uploading to Slack.

# Friendly name to associate with the Lighthouse audit
NAME=$1
# URL to run Lighthouse against
URL=$2
# File to output results to
OUTPUT_FILE=$3

yarn lhci collect --url="$URL"

# LHCI doesn't an provide a way to easily expose the temporary storage URL, we have to extract it ourselves
REPORT_URL=$(yarn lhci upload --target=temporary-public-storage | grep -o "https:\/\/storage.googleapis.*.html\+")

# Primary result source, we'll use this to extract the raw audit data.
yarn lhci upload --target=filesystem --outputDir=./reports/metadata

# # Lighthouse runs multiple times and takes the median to account for varying network latency
REPRESENTATIVE_RUN=$(jq -r '.[] | select(.isRepresentativeRun==true)' ./reports/metadata/manifest.json)

# Extract the Lighthouse score for each relevant category
PERFORMANCE=$(jq -r '.summary.performance' <<<"$REPRESENTATIVE_RUN")
ACCESSIBILITY=$(jq -r '.summary.accessibility' <<<"$REPRESENTATIVE_RUN")
BEST_PRACTICES=$(jq -r '.summary."best-practices"' <<<"$REPRESENTATIVE_RUN")
SEO=$(jq -r '.summary.seo' <<<"$REPRESENTATIVE_RUN")

SUMMARY=$(jq -n \
    --arg performance "$PERFORMANCE" \
    --arg accessibility "$ACCESSIBILITY" \
    --arg best_practices "$BEST_PRACTICES" \
    --arg seo "$SEO" \
    --arg report_url "$REPORT_URL" \
    --arg report_name "$NAME" \
    '{performance: $performance, accessibility: $accessibility, "best-practices": $best_practices, seo: $seo, report_name: $report_name, report_url: $report_url}')

echo -e "$SUMMARY" >"$OUTPUT_FILE"
