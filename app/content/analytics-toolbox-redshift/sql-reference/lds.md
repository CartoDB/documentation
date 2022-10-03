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

Note that The term _isoline_ is used here in a general way to refer to the areas that can be reached from a given origin point within the given travel time or distance (depending on the `range_type` parameter).

* `input`: `VARCHAR(MAX)` name of the input table or query.
* `output_table`: `VARCHAR(MAX)` name of the output table. It will raise an error if the table already exists.
* `geom_column`: `VARCHAR(MAX)` column name for the origin geometry column.
* `mode`: `VARCHAR(MAX)` type of transport. Supported: 'walk', 'car'.
* `range`: `INT` range of the isoline in seconds (for `range_type` 'time') or meters (for `range_type` 'distance').
* `range_type`: `VARCHAR(MAX)` type of range. Supported: 'time' (for isochrones), 'distance' (for isodistances).

**Example**

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

{{% bannerNote type="note" title="ADDITIONAL EXAMPLES"%}}

* [Generating trade areas based on drive/walk-time isolines](/analytics-toolbox-redshift/examples/trade-areas-based-on-isolines/)
{{%/ bannerNote %}}


### GEOCODE

{{% bannerNote type="code" %}}
carto.GEOCODE(address [, country])
{{%/ bannerNote %}}

{{% bannerNote type="warning" title="warning"%}}
This function consumes geocoding quota. Each call consumes one unit of quota. Before running, check the size of the data to be geocoded and make sure you store the result in a table to avoid misuse of the quota. To check the information about available and consumed quota use the function [`LDS_QUOTA_INFO`](#lds_quota_info).

**We recommend using this function only with an input of up to 10 records. In order to geocode larger sets of addresses, we strongly recommend using the [GEOCODE_TABLE](#geocode_table) procedure. Likewise, in order to materialize the results in a table.**
{{%/ bannerNote %}}

**Description**

Geocodes an address into a point with its geographic coordinates (latitude and longitude).

* `address`: `VARCHAR(MAX)` input address to geocode.
* `country` (optional): `VARCHAR` name of the country in [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2). Defaults to `''`.

**Return type**

`GEOMETRY`

**Constraints**

This function performs requests to the CARTO Location Data Services API. Redshift makes parallel requests depending on the number of records you are processing, potentially hitting the limit of the number of requests per seconds allowed for your account. The payload size of these requests depends on the number of records and could cause a timeout in the external function, with the error message `External function timeout`. The limit is around 500 records but could vary with the provider. To avoid this error, please try geocoding smaller volumes of data or using the procedure [`GEOCODE_TABLE`](#geocode_table) instead. This procedure manages concurrency and payload size to avoid exceeding this limit.

**Examples**

```sql
SELECT carto.GEOCODE('Madrid');
-- POINT(109.590465335923 34.1733770650093)
```

```sql
SELECT carto.GEOCODE('Madrid', 'es');
-- POINT(51.405967078794 20.3365500266832)
```

```sql
CREATE TABLE my_schema.my_geocoded_table AS
SELECT address, carto.GEOCODE(address) AS geom FROM my_table
-- Table my_geocoded_table successfully created.
```


### GEOCODE_REVERSE

{{% bannerNote type="code" %}}
carto.GEOCODE_REVERSE(geom [, language])
{{%/ bannerNote %}}

{{% bannerNote type="warning" title="warning"%}}
This function consumes geocoding quota. Each call consumes one unit of quota. Before running, check the size of the data to be reverse geocoded and make sure you store the result in a table to avoid misuse of the quota. To check the information about available and consumed quota use the function [`LDS_QUOTA_INFO`](#lds_quota_info)

**We recommend using this function only with an input of up to 10 records. In order to reverse-geocode larger sets of locations, we strongly recommend using the [GEOCODE_REVERSE_TABLE](#geocode_reverse_table) procedure. Likewise, in order to materialize the results in a table.**
{{%/ bannerNote %}}

**Description**

Performs a reverse geocoding of the point received as input.

* `geom`: `GEOMETRY` input point for which to obtain the address.
* `language` (optional): `VARCHAR(MAX)` language in which results should be returned.

**Return type**

`VARCHAR(MAX)`

**Constraints**

This function performs requests to the CARTO Location Data Services API. Redshift makes parallel requests depending on the number of records you are processing, potentially hitting the limit of the number of requests per seconds allowed for your account. The payload size of these requests depends on the number of records and could cause a timeout in the external function, with the error message `External function timeout`. The limit is around 500 records but could vary with the provider. To avoid this error, please try processing smaller volumes of data.

**Example**

```sql
SELECT carto.GEOCODE_REVERSE(ST_POINT(-74.0060, 40.7128));
-- 254 Broadway, New York, NY 10007, USA
```


### GEOCODE_REVERSE_TABLE

{{% bannerNote type="code" %}}
carto.GEOCODE_REVERSE_TABLE(input_table [, geom_column] [, address_column] [, language])
{{%/ bannerNote %}}

{{% bannerNote type="warning" title="warning"%}}
This function consumes geocoding quota. Each call consumes as many units of quota as the number of rows your input table has. Before running, we recommend checking the size of the data to be geocoded and your available quota using the [`LDS_QUOTA_INFO`](#lds_quota_info) function.
{{%/ bannerNote %}}

**Description**

Reverse-geocodes an input table by adding a column `address` with the addresses for a given point location column. It geocodes sequentially the table in chunks of 10 rows.

* `input_table`: `VARCHAR(MAX)` name of the table to be reverse-geocoded. Please make sure you have enough permissions to alter this table, as this procedure will add two columns to it to store the geocoding result.
* `geom_column` (optional): `GEOMETRY` column name for the geometry column that contains the points to be reverse-geocoded. Defaults to `'geom'`.
* `address_column`: `VARCHAR(MAX)` name of the column where the computed addresses will be stored. It defaults to `'address'`, and it is created on the input table if it doesn't exist.
* `language` (optional): `VARCHAR(MAX)` language in which results should be returned. Defaults to `''`. The effect and interpretation of this parameter depends on the LDS provider assigned to your account.

If the input table already contains a column with the name `address_column`, only those rows with NULL values in it will be reverse-geocoded.

**Examples**

```sql
CALL carto.GEOCODE_REVERSE_TABLE('my-schema.my-table');
-- The table `my-schema.my-table` with a column `geom` will be updated
-- adding the column `address`.
```

```sql
CALL carto.GEOCODE_REVERSE_TABLE('my-schema.my-table', 'my_geom_column');
-- The table `my-schema.my-table` with a column `my_geom_column` will be updated
-- adding the column `address`.
```

```sql
CALL carto.GEOCODE_REVERSE_TABLE('my-schema.my-table', 'my_geom_column', 'my_address_column');
-- The table `my-schema.my-table` with a column `my_geom_column` will be updated
-- adding the column `my_address_column`.
```

```sql
CALL carto.GEOCODE_REVERSE_TABLE('my-schema.my-table', 'my_geom_column', 'my_address_column', 'en-US');
-- The table `my-schema.my-table` with a column `my_geom_column` will be updated
-- adding the column `my_address_column`.
-- The addresses will be in the (US) english language, if supported by the account LDS provider.
```


### GEOCODE_TABLE

{{% bannerNote type="code" %}}
carto.GEOCODE_TABLE(input_table, address_column [, geom_column] [, country])
{{%/ bannerNote %}}

{{% bannerNote type="warning" title="warning"%}}
This function consumes geocoding quota. Each call consumes as many units of quota as the number of rows your input table has. Before running, we recommend checking the size of the data to be geocoded and your available quota using the [`LDS_QUOTA_INFO`](#lds_quota_info) function.
{{%/ bannerNote %}}

**Description**

Geocodes an input table by adding a column `geom` with the geographic coordinates (latitude and longitude) corresponding to a given address column. This procedure also adds a `carto_geocode_metadata` column with additional information of the geocoding result in JSON format. It geocodes sequentially the table in chunks of 100 rows.

* `input_table`: `VARCHAR(MAX)` name of the table to be geocoded. Please make sure you have enough permissions to alter this table, as this procedure will add two columns to it to store the geocoding result.
* `address_column`: `VARCHAR(MAX)` name of the column from the input table that contains the addresses to be geocoded.
* `geom_column` (optional): `VARCHAR(MAX)` column name for the output geometry column. Defaults to `'geom'`.
* `country` (optional): `VARCHAR(MAX)` name of the country in [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2). Defaults to `''`.

If the input table already contains a geometry column with the name `geom_column`, only those rows with NULL values in it will be geocoded.

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

{{% bannerNote type="note" title="ADDITIONAL EXAMPLES"%}}

* [Geocoding your address data](/analytics-toolbox-redshift/examples/geocoding-your-address-data/)
{{%/ bannerNote %}}


### ISOLINE

{{% bannerNote type="code" %}}
carto.ISOLINE(origin, mode, range, range_type)
{{%/ bannerNote %}}

{{% bannerNote type="warning" title="warning"%}}
This function consumes isolines quota. Each call consumes one unit quota. Before running, check the size of the data and make sure you store the result in a table to avoid misuse of the quota. To check the information about available and consumed quota use the function [`LDS_QUOTA_INFO`](#lds_quota_info).

**We recommend using this function only with an input of up to 10 records. In order to calculate isolines for larger sets of locations, we strongly recommend using the [CREATE_ISOLINES](#create_isolines) procedure. Likewise, in order to materialize the results in a table.**
{{%/ bannerNote %}}

**Description**

Calculates the isoline polygon from a given point.

* `origin`: `GEOMETRY` origin point of the isoline.
* `mode`: `VARCHAR(MAX)` type of transport. Supported: 'walk', 'car'.
* `range`: `INT` range of the isoline in seconds (for `range_type` 'time') or meters (for `range_type` 'distance').
* `range_type`: `VARCHAR(MAX)` type of range. Supported: 'time' (for isochrones), 'distance' (for isodistances).

**Return type**

`GEOMETRY`

**Constraints**

This function performs requests to the CARTO Location Data Services API. Redshift makes parallel requests depending on the number of records you are processing, potentially hitting the limit of the number of requests per seconds allowed for your account. The payload size of these requests depends on the number of records and could cause a timeout in the external function, with the error message `External function timeout`. The limit is around 500 records but could vary with the provider. To avoid this error, please try processing smaller volumes of data.

**Examples**

```sql
SELECT carto.ISOLINE(ST_POINT(13.37749, 52.51578), 'car', 10, 'time');
-- POLYGON ((13.377142 52.516537, 13.377399 52.516193, 13.377743 52.51585, 13.377914 52.515335, 13.377743 52.51482, 13.377399 52.51482, 13.376713 52.515507, 13.376541 52.516022, 13.376627 52.516537, 13.376884 52.516708, 13.377142 52.516537))
```


### LDS_QUOTA_INFO

{{% bannerNote type="code" %}}
carto.LDS_QUOTA_INFO()
{{%/ bannerNote %}}

**Description**

Returns statistics about the usage of Location Data Services for the user account, including the monthly and consumed quota for both geocoding and isolines services and their associated provider.

**Return type**

`VARCHAR(MAX)`

**Example**

```sql
SELECT carto.LDS_QUOTA_INFO();
-- [{"monthly_quota":1000,"provider":"tomtom","service":"geocoding","used_quota":10},{"monthly_quota":100,"provider":"here","service":"isolines","used_quota":10}]
```
