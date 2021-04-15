#!/bin/sh

echo "= Spatial Extension SQL Reference ="

cd ./repos/carto-advanced-spatial-extension

echo "Fetch latest changes"
BRANCH=chore/ch147621/reference-documentation-synchronization # TODO: master
git checkout $BRANCH
git pull origin $BRANCH
git submodule update

echo "Copy SQL reference files: bq"
make doc --silent CLOUD=bq OUTDIR=../../app/content/spatial-extension-bq/sql-reference
