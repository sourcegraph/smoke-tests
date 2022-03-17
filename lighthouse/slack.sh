#!/usr/bin/env bash

# Report folder to analyze
INPUT_FOLDER=$1
# File to output results to
OUTPUT_FILE=$2

# Extract the median Lighthouse score for each relevant category
PERFORMANCE=$(jq -rs 'map(.performance) | sort | .[length/2|floor]' $INPUT_FOLDER/reports/*.json)
# ACCESSIBILITY=$(jq -rs 'map(.accessibility) | sort | .[length/2|floor]' "$INPUT_FOLDER/reports/*.json")
# BEST_PRACTICES=$(jq -rs 'map(.best-practices) | sort | .[length/2|floor]' "$INPUT_FOLDER/reports/*.json")
# SEO=$(jq -rs 'map(.seo) | sort | .[length/2|floor]' "$INPUT_FOLDER/reports/*.json")

# Extract latest metadata for Slack formatting
REPORT_URL=$(jq -r '.report_url' "$INPUT_FOLDER/latest_report.json")
REPORT_NAME=$(jq -r '.report_name' "$INPUT_FOLDER/latest_report.json")

SUMMARY="
$REPORT_NAME: <$REPORT_URL|Report>
Performance: $PERFORMANCE/1
Accessibility: $ACCESSIBILITY/1
Best practices: $BEST_PRACTICES/1
SEO: $SEO/1\n
"

echo -e "$SUMMARY" >>"$OUTPUT_FILE"
