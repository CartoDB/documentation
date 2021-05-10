#!/bin/sh

echo "Update Spatial Extension reference: bq"
cd /repos
cd ./carto-spatial-extension
sh /scripts/projects/spatial-extension.sh bq /src/content/spatial-extension-bq/sql-reference
cd ../carto-advanced-spatial-extension
sh /scripts/projects/spatial-extension.sh bq /src/content/spatial-extension-bq/sql-reference

echo "Update Spatial Extension reference: sf"
cd /repos
cd ./carto-spatial-extension
sh /scripts/projects/spatial-extension.sh sf /src/content/spatial-extension-sf/sql-reference
cd ../carto-advanced-spatial-extension
sh /scripts/projects/spatial-extension.sh sf /src/content/spatial-extension-sf/sql-reference