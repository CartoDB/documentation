## Introduction

CARTO Maps API v3 allows to create map layers using data from different data warehouses. 
It uses an existing connection in your CARTO account to access the data securely and is able to return layers in different formats.

## Authorization
CARTO Maps API v3 uses an access token as authorization method. Learn more about obtaining and using access tokens in the general [Authorization section](https://docs.carto.com/carto3-api/overview/getting-started/#authorization)

## Endpoints

### `/table`
Get a map layer from a table in your data warehouse. Use the fully qualified name for the table, for example:

* For a table in BigQuery: `?name=project_id.dataset.table`
* For Snowflake, Redshift and PostgreSQL: `?name=database.schema.table`

The response includes URLs to download the data in different formats, along with information about the size of the table in bytes and number of rows:
```
geojson: {url: [,…]}
json: {url: [,…]}
ndjson: {url: [,…]}
nrows: 1000
size:70087

```

### `/query`
Get a map layer from an arbitrary query that is executed in your data warehouse. The query will run with the connection's privileges and is subject to access privileges, limits, etc defined in the data warehouse, for example:

* For a table in BigQuery: `?q=SELECT *, ST_GEOGPOINT(longitude,latitude) AS geom FROM project_id.dataset.table`
* For Snowflake, Redshift and PostgreSQL: `?q=SELECT * database.schema.table`

The response includes URLs to download the data in different formats, along with information about the size of the table in bytes and number of rows:
```
geojson: {url: [,…]}
json: {url: [,…]}
ndjson: {url: [,…]}
nrows: 1000
size:70087

```

### `/tileset`
Get a map layer from a tileset created using the CARTO Spatial Extension. Get more information about tilesets and the extension's tiler module[here](https://docs.carto.com/spatial-extension-bq/overview/tilesets/).

The response includes a TileJSON URL that can be used with compatible clients.


