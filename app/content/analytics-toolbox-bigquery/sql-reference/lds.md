---
aliases:
    - /analytics-toolbox-bq/sql-reference/lds/
---
## lds

<div class="badges"><div class="experimental"></div><div class="advanced"></div></div>

This module contains functions and procedures that make use of location data services, such as geocoding, reverse geocoding and isolines computation.

### CREATE_ISOLINES

{{% bannerNote type="code" %}}
carto.CREATE_ISOLINES(input, output_table, geom_column, mode, range, range_type, lds_api_url, lds_token)
{{%/ bannerNote %}}

{{% bannerNote type="warning" title="warning"%}}
This function consumes isolines quota. Each call consumes as many units of quota as the number of rows your input table or query has. Before running, we recommend checking the size of the data to be geocoded and your available quota using the [`LDS_QUOTA_INFO`](#lds_quota_info) function.
{{%/ bannerNote %}}

**Description**

Calculates the isolines (polygons) from given origins (points) in a table or query. It creates a new table with the columns of the input table or query except the `geom_column` plus the isolines in the column `geom` (if the input already contains a `geom` column, it will be overwritten). It calculates isolines sequentially in chunks of 100 rows.

* `input`: `STRING` name of the input table or query.
* `output_table`: `STRING` name of the output table. It will raise an error if the table already exists.
* `geom_column`: `STRING` column name for the origin geometry column.
* `mode`: `STRING` type of transport. Supported: 'walk', 'car'.
* `range_value`: `INT64` range of the isoline in seconds (for `range_type` 'time') or meters (for `range_type` 'distance').
* `range_type`: `STRING` type of range. Supported: 'time' (for isochrones), 'distance' (for isodistances).
* `lds_api_url`: `STRING` url of the API where the customer account is stored.
* `lds_token`: `STRING` customer's token for accessing the different API services.

**Example**

```sql
CALL carto.CREATE_ISOLINES(
    'my-schema.my-table',
    'my-schema.my-output-table',
    'my_geom_column',
    'car', 60, 'time',
    'my_lds_api_url', 'my_lds_token'
);
-- The table `my-schema.my-output-table` will be created
-- with the columns of the input table except `my_geom_column`.
-- Isolines will be added in the "geom" column.
```

### GEOCODE_REVERSE_TABLE

{{% bannerNote type="code" %}}
carto.GEOCODE_REVERSE_TABLE(input_table, geom_column, address_column, language, lds_api_url, lds_token)
{{%/ bannerNote %}}

{{% bannerNote type="warning" title="warning"%}}
This function consumes geocoding quota. Each call consumes as many units of quota as the number of rows your input table has. Before running, we recommend checking the size of the data to be geocoded and your available quota using the [`LDS_QUOTA_INFO`](#lds_quota_info) function.
{{%/ bannerNote %}}

**Description**

Reverse-geocodes an input table by adding a column `address` with the address coordinates a given point location column. It geocodes sequentially the table in chunks of 100 rows.

* `input_table`: `STRING` name of the table to be reverse-geocoded. Please make sure you have enough permissions to alter this table, as this procedure will add two columns to it to store the geocoding result.
* `geom_column` (optional): `GEOMETRY` column name for the geometry column that contains the points to be reverse-geocoded. Defaults to `'geom'`.
* `address_column`: `STRING` name of the column where the computed addresses will be stored. It defaults to `'address'`, and it is created on the input table if it doesn't exist.
* `language` (optional): `STRING` language in which results should be returned. Defaults to `''`. The effect and interpretation of this parameter depends on the LDS provider assigned to your account.
* `lds_api_url`: `STRING` url of the API where the customer account is stored.
* `lds_token`: `STRING` customer's token for accessing the different API services.

If the input table already contains a column with the name `address_column`, only those rows with NULL values will be reverse-geocoded.

**Examples**

```sql
CALL carto.GEOCODE_REVERSE_TABLE('my-schema.my-table', NULL, NULL, NULL, 'my_lds_api_url', 'my_lds_token');
-- The table `my-schema.my-table` with a column `geom` will be updated
-- adding the column `address`.
```

```sql
CALL carto.GEOCODE_REVERSE_TABLE('my-schema.my-table', 'my_geom_column', NULL, NULL, 'my_lds_api_url', 'my_lds_token');
-- The table `my-schema.my-table` with a column `my_geom_column` will be updated
-- adding the column `address`.
```

```sql
CALL carto.GEOCODE_REVERSE_TABLE('my-schema.my-table', 'my_geom_column', 'my_address_column', NULL, 'my_lds_api_url', 'my_lds_token');
-- The table `my-schema.my-table` with a column `my_geom_column` will be updated
-- adding the column `my_address_column`.
```

```sql
CALL carto.GEOCODE_REVERSE_TABLE('my-schema.my-table', 'my_geom_column', 'my_address_column', 'en-US', 'my_lds_api_url', 'my_lds_token');
-- The table `my-schema.my-table` with a column `my_geom_column` will be updated
-- adding the column `my_address_column`.
-- The addresses will be in the (US) english language, if supported by the account LDS provider.
```

### GEOCODE_TABLE

{{% bannerNote type="code" %}}
carto.GEOCODE_TABLE(input_table, address_column, geom_column, country, lds_api_url, lds_token)
{{%/ bannerNote %}}

{{% bannerNote type="warning" title="warning"%}}
This function consumes geocoding quota. Each call consumes as many units of quota as the number of rows of your input table. Before running, we recommend checking the size of the data to be geocoded and your available quota using the [`LDS_QUOTA_INFO`](#lds_quota_info) procedure.
{{%/ bannerNote %}}

**Description**

Geocodes an input table by adding a column `geom` with the geographic coordinates (latitude and longitude) of a given address column. This procedure also adds a `carto_geocode_metadata` column with additional information of the geocoding result in JSON format. It geocodes sequentially the table in chunks of 100.

* `input_table`: `STRING` name of the table to be geocoded. Please make sure you have enough permissions to alter this table, as this procedure will add two columns to it to store the geocoding result.
* `address_column`: `STRING` name of the column from the input table that contains the addresses to be geocoded.
* `geom_column` (optional): `STRING` column name for the geometry column. Defaults to `'geom'`. Set to `NULL` to use the default value.
* `country` (optional): `STRING` name of the country in [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2). Defaults to `''`. Set to `NULL` to use the default value.
* `lds_api_url`: `STRING` url of the API where the customer account is stored.
* `lds_token`: `STRING` customer's token for accessing the different API services.

If the input table already contains a geometry column with the name `geom_column`, only those rows with `NULL` values will be geocoded.

**Examples**

```sql
CALL carto.GEOCODE_TABLE('my-schema.my-table', 'my_address_column', NULL, NULL, 'my_lds_api_url', 'my_lds_token');
-- The table `my-schema.my-table` will be updated
-- adding the columns: geom, carto_geocode_metadata.
```

```sql
CALL carto.GEOCODE_TABLE('my-schema.my-table', 'my_address_column', 'my_geom_column', NULL, 'my_lds_api_url', 'my_lds_token');
-- The table `my-schema.my-table` will be updated
-- adding the columns: my_geom_column, carto_geocode_metadata.
```

```sql
CALL carto.GEOCODE_TABLE('my-schema.my-table', 'my_address_column', 'my_geom_column', 'my_country', 'my_lds_api_url', 'my_lds_token');
-- The table `my-schema.my-table` will be updated
-- adding the columns: my_geom_column, carto_geocode_metadata.
```


### LDS_QUOTA_INFO

{{% bannerNote type="code" %}}
carto.LDS_QUOTA_INFO(lds_api_url, lds_token)
{{%/ bannerNote %}}

**Description**

Returns statistics about the usage of Location Data Services for the user account, including the monthly and consumed quota for both geocoding and isolines services and their associated provider.

* `lds_api_url`: `STRING` url of the API where the customer account is stored.
* `lds_token`: `STRING` customer's token for accessing the different API services.

**Return type**

`STRING`

**Example**

```sql
CALL carto.LDS_QUOTA_INFO('my_lds_api_url', 'my_lds_token');
-- [{"monthly_quota":1000,"provider":"tomtom","service":"geocoding","used_quota":10},{"monthly_quota":100,"provider":"here","service":"isolines","used_quota":10}]
```

NOTE: using a procedure instead of a function because referencing connections within a standard SQL function are not supported.


{{% euFlagFunding %}}