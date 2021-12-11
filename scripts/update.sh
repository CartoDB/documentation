#!/bin/bash

echo -e "\nUpdate Analytics Toolbox for BigQuery"
echo "-------------------------------------"
CLOUD=bigquery BRANCH=master TARGETPATH=./app/content/analytics-toolbox-bq \
node ./scripts/projects/analytics-toolbox.js

echo -e "\nUpdate Analytics Toolbox for Snowflake"
echo "--------------------------------------"
CLOUD=snowflake BRANCH=master TARGETPATH=./app/content/analytics-toolbox-snowflake \
node ./scripts/projects/analytics-toolbox.js

echo -e "\nUpdate Analytics Toolbox for Snowflake prev"
echo "-------------------------------------------"
CLOUD=snowflake BRANCH=sf-prev TARGETPATH=./app/content/analytics-toolbox-sf \
node ./scripts/projects/analytics-toolbox.js

echo -e "\nUpdate Analytics Toolbox for Redshift"
echo "-------------------------------------"
CLOUD=redshift BRANCH=master TARGETPATH=./app/content/analytics-toolbox-redshift \
node ./scripts/projects/analytics-toolbox.js
