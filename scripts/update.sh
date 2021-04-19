#!/bin/sh

echo "Update Spatial Extension reference: bq"
cd /repos/carto-advanced-spatial-extension
sh /scripts/projects/spatial-extension.sh bq /src/content/spatial-extension-bq/sql-reference
