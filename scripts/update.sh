#!/bin/sh

echo "\nSpatial Extension for BigQuery"
echo "------------------------------"
CLOUD=bigquery node ./scripts/projects/spatial-extension.js

echo "\nSpatial Extension for Snowflake"
echo "-------------------------------"
CLOUD=snowflake node ./scripts/projects/spatial-extension.js

echo ""