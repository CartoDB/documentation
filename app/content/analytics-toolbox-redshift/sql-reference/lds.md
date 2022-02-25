## lds

<div class="badges"><div class="experimental"></div><div class="advanced"></div></div>

This module contains functions and procedures that make use of location data services, such as geocoding, reverse geocoding and isolines computation.

### GEOCODE

{{% bannerNote type="code" %}}
carto.GEOCODE(address [, country])
{{%/ bannerNote %}}

{{% bannerNote type="warning" title="warning"%}}
This function consumes geocoding quota. Each call consumes one unit of quota. Before running, check the size of the data to be geocoded and make sure you store the result in a table to avoid misuse of the quota. To check the information about available and consumed quota use the function [`LDS_QUOTA_INFO`](#lds_quota_info).
{{%/ bannerNote %}}

**Description**

Geocodes an address into a point with its geographic coordinates (latitude and longitude).

* `address`: `VARCHAR(MAX)` input address to geocode.
* `country` (optional): `VARCHAR` name of the country in [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2). Defaults to `''`.

**Return type**

`GEOMETRY`

**Constraints**

This function performs requests to the CARTO Location Data Services API. When using this function, Redshift makes parallel requests depending on the number of records you are trying to geocode, potentially hitting the limit of the number of requests per seconds allowed for your account. To avoid this error, please try geocoding smaller volumes of data or using the procedure [`GEOCODE_TABLE`](#geocode_table) instead. This procedure manages concurrency and payload size to avoid exceeding this limit.

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
carto.GEOCODE_REVERSE(geom)
{{%/ bannerNote %}}

{{% bannerNote type="warning" title="warning"%}}
This function consumes geocoding quota. Each call consumes one unit of quota. Before running, check the size of the data to be reverse geocoded and make sure you store the result in a table to avoid misuse of the quota. To check the information about available and consumed quota use the function [`LDS_QUOTA_INFO`](#lds_quota_info)
{{%/ bannerNote %}}

**Description**

Performs a reverse geocoding of the point received as input.

* `geom`: `GEOMETRY` input point to obtain the address.

**Return type**

`VARCHAR(MAX)`

**Constraints**

This function performs requests to the CARTO Location Data Services API. When using this function, Redshift makes parallel requests depending on the number of records you are trying to reverse geocode, potentially hitting the limit of the number of requests per seconds allowed for your account. To avoid this error, please try processing smaller volumes of data.

**Example**

```sql
SELECT carto.GEOCODE_REVERSE(ST_POINT(-74.0060, 40.7128));
-- 254 Broadway, New York, NY 10007, USA
```

### GEOCODE_TABLE

{{% bannerNote type="code" %}}
carto.GEOCODE_TABLE(input_table, address_column [, geom_column] [, country])
{{%/ bannerNote %}}

{{% bannerNote type="warning" title="warning"%}}
This function consumes geocoding quota. Each call consumes as many units of quota as number of rows your input table has. Before running, we recommend checking the size of the data to be geocoded and your available quota using the [`LDS_QUOTA_INFO`](#lds_quota_info) function.
{{%/ bannerNote %}}

**Description**

Geocodes an input table by adding a column `geom` with the geographic coordinates (latitude and longitude) of a given address column. This procedure also adds a `carto_geocode_metadata` column with additional information of the geocoding result in JSON format.

* `input_table`: `VARCHAR(MAX)` name of the table to be geocoded. Please make sure you have enough permissions to alter this table, as this procedure will add two columns to it to store the geocoding result.
* `address_column`: `VARCHAR(MAX)` name of the column from the input table that contains the addresses to be geocoded.
* `geom_column` (optional): `VARCHAR(MAX)` column name for the geometry column. Defaults to `'geom'`.
* `country` (optional): `VARCHAR(MAX)` name of the country in [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2). Defaults to `''`.

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

### ISOLINE

{{% bannerNote type="code" %}}
carto.ISOLINE(origin, mode, range, range_type)
{{%/ bannerNote %}}

{{% bannerNote type="warning" title="warning"%}}
This function consumes isolines quota. Each call consumes one unit quota. Before running, check the size of the data and make sure you store the result in a table to avoid misuse of the quota. To check the information about available and consumed quota use the function [`LDS_QUOTA_INFO`](#lds_quota_info).
{{%/ bannerNote %}}

**Description**

Calculates the isoline polygon from a given point.

* `origin`: `GEOMETRY` of the origin of the isoline.
* `mode`: `VARCHAR(MAX)` of the type of transport. Supported: 'walk', 'car'.
* `range`: `INT` range of the isoline in seconds (for `range_type` 'time') or meters (for `range_type` 'distance').
* `range_type`: `VARCHAR(MAX)` of the range type. Supported: 'time' (for isochrones), 'distance' (for isodistances).

**Return type**

`GEOMETRY`

**Constraints**

This function performs requests to the CARTO Location Data Services API. When using this function, Redshift makes parallel requests depending on the number of records you are processing, potentially hitting the limit of the number of requests per seconds allowed for your account. To avoid this error, please try processing smaller volumes of data.

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
