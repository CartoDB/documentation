#!/bin/sh

echo "\nAnalytics Toolbox for BigQuery"
echo "------------------------------"
CLOUD=bigquery node ./scripts/projects/analytics-toolbox.js

echo "\nAnalytics Toolbox for Snowflake"
echo "-------------------------------"
CLOUD=snowflake node ./scripts/projects/analytics-toolbox.js

echo "\nAnalytics Toolbox for Redshift"
echo "-------------------------------"
CLOUD=redshift node ./scripts/projects/analytics-toolbox.js

echo ""