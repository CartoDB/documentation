#!/bin/bash

echo -e "\nUpdate Analytics Toolbox for BigQuery"
echo "-------------------------------------"
CLOUD=bigquery TARGETPATH=./app/content/analytics-toolbox-bigquery \
node ./scripts/projects/analytics-toolbox.js

echo -e "\nUpdate Analytics Toolbox for Snowflake"
echo "--------------------------------------"
CLOUD=snowflake TARGETPATH=./app/content/analytics-toolbox-snowflake \
node ./scripts/projects/analytics-toolbox.js

echo -e "\nUpdate Analytics Toolbox for Redshift"
echo "-------------------------------------"
CLOUD=redshift TARGETPATH=./app/content/analytics-toolbox-redshift \
node ./scripts/projects/analytics-toolbox.js

echo -e "\nUpdate Analytics Toolbox for PostgreSQL"
echo "-------------------------------------"
CLOUD=postgres TARGETPATH=./app/content/analytics-toolbox-postgres \
node ./scripts/projects/analytics-toolbox.js

echo -e "\nUpdate Analytics Toolbox for Databricks"
echo "-------------------------------------"
CLOUD=databricks TARGETPATH=./app/content/analytics-toolbox-databricks \
node ./scripts/projects/analytics-toolbox.js
