#!/bin/bash

CHECKOUT_DIR=./.checkout

rm -rf $CHECKOUT_DIR
mkdir $CHECKOUT_DIR

echo -e "\nCheckout Analytics Toolbox for BigQuery"
echo "---------------------------------------"
git clone --branch master --depth 1 git@github.com:CartoDB/analytics-toolbox.git $CHECKOUT_DIR/at-bigquery-master
git clone --branch master --depth 1 git@github.com:CartoDB/analytics-toolbox-core.git $CHECKOUT_DIR/at-core-bigquery-master

echo -e "\nCheckout Analytics Toolbox for BigQuery prev"
echo "--------------------------------------------"
git clone --branch bq-prev --depth 1 git@github.com:CartoDB/analytics-toolbox.git $CHECKOUT_DIR/at-bigquery-bq-prev
git clone --branch bq-prev --depth 1 git@github.com:CartoDB/analytics-toolbox-core.git $CHECKOUT_DIR/at-core-bigquery-bq-prev

echo -e "\nCheckout Analytics Toolbox for Snowflake"
echo "----------------------------------------"
git clone --branch lds --depth 1 git@github.com:CartoDB/analytics-toolbox.git $CHECKOUT_DIR/at-snowflake-master
git clone --branch master --depth 1 git@github.com:CartoDB/analytics-toolbox-core.git $CHECKOUT_DIR/at-core-snowflake-master

echo -e "\nCheckout Analytics Toolbox for Snowflake prev"
echo "---------------------------------------------"
git clone --branch sf-prev --depth 1 git@github.com:CartoDB/analytics-toolbox.git $CHECKOUT_DIR/at-snowflake-sf-prev
git clone --branch sf-prev --depth 1 git@github.com:CartoDB/analytics-toolbox-core.git $CHECKOUT_DIR/at-core-snowflake-sf-prev

echo -e "\nCheckout Analytics Toolbox for Redshift"
echo "---------------------------------------"
git clone --branch lds --depth 1 git@github.com:CartoDB/analytics-toolbox.git $CHECKOUT_DIR/at-redshift-master
git clone --branch master --depth 1 git@github.com:CartoDB/analytics-toolbox-core.git $CHECKOUT_DIR/at-core-redshift-master
