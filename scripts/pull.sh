#!/bin/sh

echo "Pull the latest Spatial Extension changes"
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
