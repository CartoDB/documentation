#!/bin/bash

BRANCH=release/2022-12
CHECKOUT_DIR=./.checkout

rm -rf $CHECKOUT_DIR
mkdir $CHECKOUT_DIR

if [ -z "$LOCAL_AT_PATH" ];
then
    echo -e "\nCheckout Analytics Toolbox"
    echo "-------------------------------"
    git clone --branch $BRANCH \
        --depth 1 \
        --recurse-submodules \
        git@github.com:CartoDB/analytics-toolbox.git \
        $CHECKOUT_DIR/analytics-toolbox
else
    echo -e "\nLinking local Analytics Toolbox"
    ln -s "$LOCAL_AT_PATH" $CHECKOUT_DIR/analytics-toolbox
fi
