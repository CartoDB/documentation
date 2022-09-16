#!/bin/bash

CHECKOUT_DIR=./.checkout

rm -rf $CHECKOUT_DIR
mkdir $CHECKOUT_DIR

echo -e "\nCheckout Analytics Toolbox"
echo "-------------------------------"
git clone --branch master --depth 1 git@github.com:CartoDB/analytics-toolbox.git $CHECKOUT_DIR/analytics-toolbox
git clone --branch master --depth 1 git@github.com:CartoDB/analytics-toolbox-core.git $CHECKOUT_DIR/analytics-toolbox-core
# git clone --branch master --depth 1 --recurse-submodules git@github.com:CartoDB/analytics-toolbox.git $CHECKOUT_DIR/analytics-toolbox
