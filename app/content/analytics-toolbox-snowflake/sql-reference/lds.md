---
aliases:
    - /analytics-toolbox-sf/sql-reference/lds/
---
## lds

<div class="badges"><div class="experimental"></div><div class="advanced"></div></div>

This module contains functions and procedures that make use of location data services, such as geocoding, reverse geocoding and isolines computation.

### CREATE_ISOLINES

{{% bannerNote type="code" %}}
carto.CREATE_ISOLINES(input, output_table, geom_column, mode, range, range_type)
{{%/ bannerNote %}}

{{% bannerNote type="warning" title="warning"%}}
This function consumes isolines quota. Each call consumes as many units of quota as the number of rows your input table or query has. Before running, we recommend checking the size of the data to be geocoded and your available quota using the [`LDS_QUOTA_INFO`](#lds_quota_info) function.
{{%/ bannerNote %}}

**Description**

Calculates the isolines (polygons) from given origins (points) in a table or query. It creates a new table with the columns of the input table or query except the `geom_column` plus the isolines in the column `geom` (if the input already contains a `geom` column, it will be overwritten). It calculates isolines sequentially in chunks of 100 rows.

* `input`: `VARCHAR` name of the input table or query.
* `output_table`: `VARCHAR` name of the output table. It will raise an error if the table already exists.
* `geom_column`: `VARCHAR` column name for the origin geography column.
* `mode`: `VARCHAR` type of transport. Supported: 'walk', 'car'.
* `range`: `INT` range of the isoline in seconds (for `range_type` 'time') or meters (for `range_type` 'distance').
* `range_type`: `VARCHAR` type of range. Supported: 'time' (for isochrones), 'distance' (for isodistances).

**Examples**

```sql
CALL carto.CREATE_ISOLINES(
    'my-schema.my-table',
    'my-schema.my-output-table',
    'my_geom_column',
    'car', 60, 'time'
);
-- The table `my-schema.my-output-table` will be created
-- with the columns of the input table except `my_geom_column`.
-- Isolines will be added in the "geom" column.
```

```sql
CALL carto.CREATE_ISOLINES(
    'select * from my-schema.my-table',
    'my-schema.my-output-table',
    'my_geom_column',
    'car', 60, 'time'
);
-- The table `my-schema.my-output-table` will be created
-- with the columns of the input query except `my_geom_column`.
-- Isolines will be added in the "geom" column.
```

### GEOCODE_TABLE

{{% bannerNote type="code" %}}
carto.GEOCODE_TABLE(input_table, address_column [, geom_column] [, country])
{{%/ bannerNote %}}

{{% bannerNote type="warning" title="warning"%}}
This function consumes geocoding quota. Each call consumes as many units of quota as the number of rows of your input table. Before running, we recommend checking the size of the data to be geocoded and your available quota using the [`LDS_QUOTA_INFO`](#lds_quota_info) function.
{{%/ bannerNote %}}

**Description**

Geocodes an input table by adding a column `geom` with the geographic coordinates (latitude and longitude) of a given address column. This procedure also adds a `carto_geocode_metadata` column with additional information of the geocoding result in JSON format. It geocodes sequentially the table in chunks of 500.

* `input_table`: `VARCHAR` name of the table to be geocoded. Please make sure you have enough permissions to alter this table, as this procedure will add two columns to it to store the geocoding result.
* `address_column`: `VARCHAR` name of the column from the input table that contains the addresses to be geocoded.
* `geom_column` (optional): `VARCHAR` column name for the geometry column. Defaults to `'geom'`.
* `country` (optional): `VARCHAR` name of the country in [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2). Defaults to `''`.

If the input table already contains a geometry column with the name `geom_column`, only those rows with NULL values will be geocoded.

**Examples**

```sql
CALL carto.GEOCODE_TABLE('my-schema.my-table');
-- The table `my-schema.my-table` will be updated
-- adding the columns: geom, carto_geocode_metadata.
```

```sql
CALL carto.GEOCODE_TABLE('my-schema.my-table', 'my_address_column');
-- The table `my-schema.my-table` will be updated
-- adding the columns: geom, carto_geocode_metadata.
```

```sql
CALL carto.GEOCODE_TABLE('my-schema.my-table', 'my_address_column', 'my_geom_column');
-- The table `my-schema.my-table` will be updated
-- adding the columns: my_geom_column, carto_geocode_metadata.
```

```sql
CALL carto.GEOCODE_TABLE('my-schema.my-table', 'my_address_column', 'my_geom_column', 'my_country');
-- The table `my-schema.my-table` will be updated
-- adding the columns: my_geom_column, carto_geocode_metadata.
```

**Troubleshooting**

For the `GEOCODE_TABLE` procedure to work, the input table should be owned by the same role as the procedure. The procedure may not have access to update the table, for example, if the table was created with the `ACCOUNTADMIN role`, but the  procedure is owned by the `SYSADMIN` role. In such scenario, the following error will be raised:

```
SQL access control error: Insufficient privileges to operate on table 'my-table'
```

You can check the `OWNERSHIP` of the table with the following query:

```sql
SHOW GRANTS ON TABLE "my-schema"."my-table";
```

To change the `OWNERSHIP` of to table to the `SYSADMIN role`, execute:

```sql
GRANT OWNERSHIP ON TABLE "my-schema"."my-table" TO ROLE SYSADMIN COPY CURRENT GRANTS;
```

After performing this operation, you will be able to run `GEOCODE_TABLE` without running into privilege issues.

### ISOLINE

{{% bannerNote type="code" %}}
carto.ISOLINE(origin, mode, range, range_type)
{{%/ bannerNote %}}

{{% bannerNote type="warning" title="warning"%}}
**We recommend using this function only with an input of up to 10 records. In order to calculate isolines for larger sets of locations, we strongly recommend using the [CREATE_ISOLINES](/analytics-toolbox-snowflake/sql-reference/lds/#create_isolines) procedure. Likewise, in order to materialize the results in a table.**

This function consumes isolines quota. Each call consumes one unit quota. Before running, check the size of the data and make sure you store the result in a table to avoid misuse of the quota. To check the information about available and consumed quota use the function [`LDS_QUOTA_INFO`](#lds_quota_info).
{{%/ bannerNote %}}

**Description**

Creates an isoline from the provided origin.

* `origin`: `GEOGRAPHY` of the origin of the isoline.
* `mode`: `VARCHAR` of the type of transport. Supported: 'walk', 'car'.
* `range`: `INT` range of the isoline in seconds (for `range_type` ‘time’) or meters (for `range_type` ‘distance’).
* `range_type`: `VARCHAR` of the range type. Supported: ‘time’ (for isochrones), ‘distance’ (for isodistances).

**Return type**

`GEOGRAPHY`

**Constraints**

This function performs requests to the CARTO Location Data Services API. Snowflake makes parallel requests depending on the number of records you are processing, potentially hitting the limit of the number of requests per seconds allowed for your account. The payload size of these requests depends on the number of records and could cause a timeout in the external function, with the error message `External function timeout`. Unexpected server errors will force Snowflake to retry the requests. The limit is around 500 records but could vary with the provider. To avoid this error, please try processing smaller volumes of data.

**Example**

```sql
SELECT carto.ISOLINE(ST_MAKEPOINT(-3,40), 'car', 10, 'time');
-- { "coordinates": [ [ [ -2.999868, 40.001907 ], [ -2.999439, 40.001736 ], [ -2.999096, 40.000706 ], [ -2.998066, 40.000362 ], [ ...
```

### GEOCODE

{{% bannerNote type="code" %}}
carto.GEOCODE(address [, country])
{{%/ bannerNote %}}

{{% bannerNote type="warning" title="warning"%}}
**We recommend using this function only with an input of up to 10 records. In order to geocode larger sets of locations, we strongly recommend using the [GEOCODE_TABLE](/analytics-toolbox-snowflake/sql-reference/lds/#geocode_table) procedure. Likewise, in order to materialize the results in a table.**

This function consumes geocoding quota. Each call consumes one unit of quota. Before running, check the size of the data to be geocoded and make sure you store the result in a table to avoid misuse of the quota. To check the information about available and consumed quota use the function [`LDS_QUOTA_INFO`](#lds_quota_info).
{{%/ bannerNote %}}

**Description**

Geocodes an address into a point with its geographic coordinates (latitude and longitude).

* `address`: `VARCHAR` input address to geocode.
* `country` (optional): `VARCHAR` name of the country in [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2). Defaults to `''`.

**Return type**

`GEOGRAPHY`

**Constraints**

This function performs requests to the CARTO Location Data Services API. Snowflake makes parallel requests depending on the number of records you are processing, potentially hitting the limit of the number of requests per seconds allowed for your account. The payload size of these requests depends on the number of records and could cause a timeout in the external function, with the error message `External function timeout`. Unexpected server errors will force Snowflake to retry the requests. The limit is around 500 records but could vary with the provider. To avoid this error, please try geocoding smaller volumes of data or using the procedure [`GEOCODE_TABLE`](#geocode_table) instead. This procedure manages concurrency and payload size to avoid exceeding this limit.

**Examples**

```sql
SELECT carto.GEOCODE('Madrid');
-- { "coordinates": [ -3.69196, 40.41956 ], "type": "Point" }
```

```sql
SELECT carto.GEOCODE('Madrid', 'es');
-- { "coordinates": [ -3.69196, 40.41956 ], "type": "Point" }
```

```sql
CREATE TABLE my_geocoded_table AS
SELECT ADDRESS, carto.GEOCODE(ADDRESS) AS GEOM FROM my_table
-- Table my_geocoded_table successfully created.
```

### GEOCODE_REVERSE

{{% bannerNote type="code" %}}
carto.GEOCODE_REVERSE(geom [, language])
{{%/ bannerNote %}}

{{% bannerNote type="warning" title="warning"%}}
This function consumes geocoding quota. Each call consumes one unit of quota. Before running, check the size of the data to be reverse geocoded and make sure you store the result in a table to avoid misuse of the quota. To check the information about available and consumed quota use the function [`LDS_QUOTA_INFO`](#lds_quota_info).
{{%/ bannerNote %}}

**Description**

Performs a reverse geocoding of the point received as input.

* `geom`: `GEOGRAPHY` input point to obtain the address.
* `language` (optional): `VARCHAR` language in which results should be returned.

**Return type**

`VARCHAR`

**Constraints**

This function performs requests to the CARTO Location Data Services API. Snowflake makes parallel requests depending on the number of records you are processing, potentially hitting the limit of the number of requests per seconds allowed for your account. The payload size of these requests depends on the number of records and could cause a timeout in the external function, with the error message `External function timeout`. Unexpected server errors will force Snowflake to retry the requests. The limit is around 500 records but could vary with the provider. To avoid this error, please try processing smaller volumes of data.

**Example**

```sql
SELECT carto.GEOCODE_REVERSE(ST_POINT(-74.0060, 40.7128));
-- 254 Broadway, New York, NY 10007, USA
```

### LDS_QUOTA_INFO

{{% bannerNote type="code" %}}
carto.LDS_QUOTA_INFO()
{{%/ bannerNote %}}

**Description**

Returns statistics about the usage of Location Data Services for the user account, including the monthly and consumed quota for both geocoding and isolines services and their associated provider.

**Return type**

`VARCHAR`

**Example**

```sql
SELECT carto.LDS_QUOTA_INFO();
-- [{"monthly_quota":1000,"provider":"tomtom","service":"geocoding","used_quota":10},{"monthly_quota":100,"provider":"here","service":"isolines","used_quota":10}]
```