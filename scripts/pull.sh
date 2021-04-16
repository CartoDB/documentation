#!/bin/sh

echo "Pull the latest Spatial Extension changes"
mkdir -p ./repos
cd ./repos/carto-advanced-spatial-extension
BRANCH=chore/ch147621/reference-documentation-synchronization # TODO: master
git checkout $BRANCH
git pull --ff-only origin $BRANCH
git submodule update --init
