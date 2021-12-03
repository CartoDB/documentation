#!/bin/sh

echo "\nAnalytics Toolbox: pull latest changes\n"
mkdir -p ./repos
cd ./repos

cd ./carto-spatial-extension
BRANCH=master
git checkout $BRANCH
git pull --ff-only origin $BRANCH

cd ../carto-advanced-spatial-extension
BRANCH=master
git checkout $BRANCH
git pull --ff-only origin $BRANCH
git submodule update --init

echo ""