#!/bin/sh

echo "Update Spatial Extension reference: bq"
cd /repos
cd ./carto-spatial-extension
sh /scripts/projects/spatial-extension.sh bq /src/content/spatial-extension-bq/sql-reference
cd ../carto-advanced-spatial-extension
sh /scripts/projects/spatial-extension.sh bq /src/content/spatial-extension-bq/sql-reference
