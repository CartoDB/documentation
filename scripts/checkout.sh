#!/bin/bash

BRACH=master
CHECKOUT_DIR=./.checkout

rm -rf $CHECKOUT_DIR
mkdir $CHECKOUT_DIR

echo -e "\nCheckout Analytics Toolbox"
echo "-------------------------------"
git clone --branch $BRACH --depth 1 --recurse-submodules git@github.com:CartoDB/analytics-toolbox.git $CHECKOUT_DIR/analytics-toolbox
