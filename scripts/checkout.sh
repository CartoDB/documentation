#!/bin/bash

CHECKOUT_DIR=./.checkout

rm -rf $CHECKOUT_DIR
mkdir $CHECKOUT_DIR

echo -e "\nCheckout Analytics Toolbox for BigQuery"
echo "---------------------------------------"
git clone --branch master --depth 1 git@github.com:CartoDB/analytics-toolbox.git $CHECKOUT_DIR/at-bigquery-master
git clone --branch master --depth 1 git@github.com:CartoDB/analytics-toolbox-core.git $CHECKOUT_DIR/at-core-bigquery-master

echo -e "\nCheckout Analytics Toolbox for Snowflake"
echo "----------------------------------------"
git clone --branch master --depth 1 git@github.com:CartoDB/analytics-toolbox.git $CHECKOUT_DIR/at-snowflake-master
git clone --branch master --depth 1 git@github.com:CartoDB/analytics-toolbox-core.git $CHECKOUT_DIR/at-core-snowflake-master

echo -e "\nCheckout Analytics Toolbox for Redshift"
echo "---------------------------------------"
git clone --branch master --depth 1 git@github.com:CartoDB/analytics-toolbox.git $CHECKOUT_DIR/at-redshift-master
git clone --branch master --depth 1 git@github.com:CartoDB/analytics-toolbox-core.git $CHECKOUT_DIR/at-core-redshift-master

echo -e "\nCheckout Analytics Toolbox for PostgreSQL"
echo "---------------------------------------"
git clone --branch master --depth 1 git@github.com:CartoDB/analytics-toolbox.git $CHECKOUT_DIR/at-postgres-master
git clone --branch master --depth 1 git@github.com:CartoDB/analytics-toolbox-core.git $CHECKOUT_DIR/at-core-postgres-master

echo -e "\nCheckout Analytics Toolbox for Databricks"
echo "---------------------------------------"
git clone --branch master --depth 1 git@github.com:CartoDB/analytics-toolbox-core.git $CHECKOUT_DIR/at-core-databricks-master