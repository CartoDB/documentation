#!/bin/bash

CHECKOUT_DIR=./.checkout

rm -rf $CHECKOUT_DIR
mkdir $CHECKOUT_DIR

echo -e "\nCheckout Analytics Toolbox"
echo "-------------------------------"
git clone --branch feature/sc-254423/lds-warning-message-in-bq-rs-and-sf --depth 1 --recurse-submodules git@github.com:CartoDB/analytics-toolbox.git $CHECKOUT_DIR/analytics-toolbox
