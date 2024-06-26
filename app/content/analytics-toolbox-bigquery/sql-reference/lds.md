---
aliases:
    - /analytics-toolbox-bq/sql-reference/lds/
---
## lds

<div class="badges"><div class="experimental"></div><div class="advanced"></div></div>

This module contains functions and procedures that make use of location data services, such as geocoding, reverse geocoding and isolines computation.

### Credentials

Your CARTO account has monthly quotas assigned for each LDS service that are used up by every call to the LDS functions and procedures in the Analytics Toolbox.

Accordingly, the use of these functions and procedures requires providing authorization credentials to prevent fraudulent usage. Two parameters are needed:

* `api_base_url` The API base url is simply the address through which you can access all the services of your CARTO account, and it depends on the region or premises where your account is located. Usually it will be this one: `https://gcp-us-east1.api.carto.com`.

* `lds_token` The LDS token is a secret key that allows using up the LDS services assign to your account.
You must keep this secret! Anyone that has access to this key can use up the LDS quota assign to your account.

Both the API base url and your LDS token can be found in the developers section of the CARTO user interface.

For more information about CARTO for developers, please refer to <https://docs.carto.com/carto-user-manual/developers/carto-for-developers/>

![Developers](/img/bq-analytics-toolbox/carto_open_dev.png)

{{% bannerNote type="note" title="Tip"%}}

To check that everything works correctly, without spending any credits,
make a call to the `LDS_QUOTA_INFO` procedure. You can enter the following in the GCP Bigquery console having selected the project where the Analytics Toolbox is installed:

```sql
CALL carto.LDS_QUOTA_INFO(
  '<my-api-base-url>',
  '<my-lds-token>'
)
```

You should get a JSON response like this, with the available services and the quotas:

```json
[
  {
    "service":"geocoding",
    "monthly_quota":10000,
    "provider":"tomtom",
    "used_quota":7485
  },
  {
    "service":"isolines",
    "monthly_quota":14500,
    "provider":"here",
    "used_quota":27782
  }
]
```

This will allow you not only to verify that you have the right credentials, the AT is installed correctly and the service is working, but also what quota you have left for the different LDS services available. If the used quota reaches the monthly limit you won't be able to use the service until the next monthly period. To increase the quota contact a CARTO representative.

{{%/ bannerNote %}}


### GEOCODE_TABLE

{{% bannerNote type="code" %}}
carto.GEOCODE_TABLE(api_base_url, lds_token, input_table, address_column, geom_column, country, options)
{{%/ bannerNote %}}

{{% bannerNote type="warning" title="warning"%}}
This function consumes geocoding quota. Each call consumes as many units of quota as the number of rows of your input table. Before running, we recommend checking the size of the data to be geocoded and your available quota using the [`LDS_QUOTA_INFO`](#lds_quota_info) procedure.
{{%/ bannerNote %}}

**Description**

Geocodes an input table by adding a column `geom` with the geographic coordinates (latitude and longitude) of a given address column. This procedure also adds a `carto_geocode_metadata` column with additional information of the geocoding result in JSON format. It geocodes sequentially the table in chunks of 100.

* `api_base_url`: `STRING` url of the API where the customer account is stored.
* `lds_token`: `STRING` customer's secret token for accessing the LDS API services.
* `input_table`: `STRING` name of the table to be geocoded. Please make sure you have enough permissions to alter this table, as this procedure will add two columns to it to store the geocoding result.
* `address_column`: `STRING` name of the column from the input table that contains the addresses to be geocoded.
* `geom_column` (optional): `STRING` column name for the geometry column. Defaults to `'geom'`. Set to `NULL` to use the default value.
* `country` (optional): `STRING` name of the country in [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2). Defaults to `''`. Set to `NULL` to use the default value.
* `options`: `STRING`|`NULL` containing a valid JSON with the different options. Valid options are described in the table below. If no options are indicated then 'default' values would be applied.

  | Provider | Option | Description |
  | :----- | :----- | :------ |
  |`All`|`language`| A `STRING` that specifies the language of the geocoding in RFC 4647 format.|

If the input table already contains a geometry column with the name defined by `geom_column`, only those rows with `NULL` values will be geocoded.

{{% bannerNote type="note" %}}
If you plan to repeat the geocoding process, bear in mind that if you drop columns from your table
you won't be able to create columns with the same name for a period of time (7 days) because BigQuery reserves the deleted columns names for [_time travel_](https://cloud.google.com/bigquery/docs/time-travel) purposes. So, for example, instead of dropping the `geom` column to re-geocode all rows, update the table and set it to `NULL`.
{{%/ bannerNote %}}

**Examples**

```sql
CALL carto.GEOCODE_TABLE('my_api_base_url', 'my_lds_token', 'my-schema.my-table', 'my_address_column', NULL, NULL, NULL);
-- The table `my-schema.my-table` will be updated
-- adding the columns: geom, carto_geocode_metadata.
```

```sql
CALL carto.GEOCODE_TABLE('my_api_base_url', 'my_lds_token', 'my-schema.my-table', 'my_address_column', 'my_geom_column', NULL, NULL);
-- The table `my-schema.my-table` will be updated
-- adding the columns: my_geom_column, carto_geocode_metadata.
```

```sql
CALL carto.GEOCODE_TABLE('my_api_base_url', 'my_lds_token', 'my-schema.my-table', 'my_address_column', 'my_geom_column', 'my_country', NULL);
-- The table `my-schema.my-table` will be updated
-- adding the columns: my_geom_column, carto_geocode_metadata.
```

```sql
CALL carto.GEOCODE_TABLE('my_api_base_url', 'my_lds_token', 'my-schema.my-table', 'my_address_column', 'my_geom_column', 'my_country', '{"language":"en-US"}');
-- The table `my-schema.my-table` will be updated
-- adding the columns: my_geom_column, carto_geocode_metadata.
```

{{% bannerNote type="note" title="ADDITIONAL EXAMPLES"%}}

* [Geocoding your address data](/analytics-toolbox-bigquery/examples/geocoding-your-address-data/)
{{%/ bannerNote %}}


### GEOCODE_REVERSE_TABLE

{{% bannerNote type="code" %}}
carto.GEOCODE_REVERSE_TABLE(api_base_url, lds_token, input_table, geom_column, address_column, language, options)
{{%/ bannerNote %}}

{{% bannerNote type="warning" title="warning"%}}
This function consumes geocoding quota. Each call consumes as many units of quota as the number of rows your input table has. Before running, we recommend checking the size of the data to be geocoded and your available quota using the [`LDS_QUOTA_INFO`](#lds_quota_info) function.
{{%/ bannerNote %}}

**Description**

Reverse-geocodes an input table by adding a column `address` with the address coordinates corresponding to a given point location column. It geocodes sequentially the table in chunks of 100 rows.

* `api_base_url`: `STRING` url of the API where the customer account is stored.
* `lds_token`: `STRING` customer's secret token for accessing the LDS API services.
* `input_table`: `STRING` name of the table to be reverse-geocoded. Please make sure you have enough permissions to alter this table, as this procedure will add two columns to it to store the geocoding result.
* `geom_column` (optional): `GEOMETRY` column name for the geometry column that contains the points to be reverse-geocoded. Defaults to `'geom'`.
* `address_column`: `STRING` name of the column where the computed addresses will be stored. It defaults to `'address'`, and it is created on the input table if it doesn't exist.
* `language` (optional): `STRING` language in which results should be returned. Defaults to `''`. The effect and interpretation of this parameter depends on the LDS provider assigned to your account.
* `options`: `STRING`|`NULL` containing a valid JSON with the different options. No options are allowed currently, so this value will not be taken into account.

If the input table already contains a column with the name defined by `address_column`, only those rows with NULL values will be reverse-geocoded.

{{% bannerNote type="note" %}}
If you plan to repeat the reverse-geocoding process, bear in mind that if you drop columns from your table
you won't be able to create columns with the same name for a period of time (7 days) because BigQuery reserves the deleted columns names for [_time travel_](https://cloud.google.com/bigquery/docs/time-travel) purposes. So, for example, instead of dropping the `address_column` column to re-process all rows, update the table and set it to `NULL`.
{{%/ bannerNote %}}

**Examples**

```sql
CALL carto.GEOCODE_REVERSE_TABLE('my_api_base_url', 'my_lds_token', 'my-schema.my-table', NULL, NULL, NULL, NULL);
-- The table `my-schema.my-table` with a column `geom` will be updated
-- adding the column `address`.
```

```sql
CALL carto.GEOCODE_REVERSE_TABLE('my_api_base_url', 'my_lds_token', 'my-schema.my-table', 'my_geom_column', NULL, NULL, NULL);
-- The table `my-schema.my-table` with a column `my_geom_column` will be updated
-- adding the column `address`.
```

```sql
CALL carto.GEOCODE_REVERSE_TABLE('my_api_base_url', 'my_lds_token', 'my-schema.my-table', 'my_geom_column', 'my_address_column', NULL, NULL);
-- The table `my-schema.my-table` with a column `my_geom_column` will be updated
-- adding the column `my_address_column`.
```

```sql
CALL carto.GEOCODE_REVERSE_TABLE('my_api_base_url', 'my_lds_token', 'my-schema.my-table', 'my_geom_column', 'my_address_column', 'en-US', NULL);
-- The table `my-schema.my-table` with a column `my_geom_column` will be updated
-- adding the column `my_address_column`.
-- The addresses will be in the (US) english language, if supported by the account LDS provider.
```


### CREATE_ISOLINES

{{% bannerNote type="code" %}}
carto.CREATE_ISOLINES(api_base_url, lds_token, input, output_table, geom_column, mode, range, range_type, options)
{{%/ bannerNote %}}

{{% bannerNote type="warning" title="warning"%}}
This function consumes isolines quota. Each call consumes as many units of quota as the number of rows your input table or query has. Before running, we recommend checking the size of the data to be geocoded and your available quota using the [`LDS_QUOTA_INFO`](#lds_quota_info) function.
{{%/ bannerNote %}}

**Description**

Calculates the isolines (polygons) from given origins (points) in a table or query. It creates a new table with the columns of the input table or query except the `geom_column` plus the isolines in the column `geom` (if the input already contains a `geom` column, it will be overwritten). It calculates isolines sequentially in chunks of 100 rows.

Note that The term _isoline_ is used here in a general way to refer to the areas that can be reached from a given origin point within the given travel time or distance (depending on the `range_type` parameter).

* `api_base_url`: `STRING` url of the API where the customer account is stored.
* `lds_token`: `STRING` customer's secret token for accessing the LDS API services.
* `input`: `STRING` name of the input table or query.
* `output_table`: `STRING` name of the output table. It will raise an error if the table already exists.
* `geom_column`: `STRING` column name for the origin geometry column.
* `mode`: `STRING` type of transport. The supported modes depend on the provider:
  * `Here`: 'walk', 'car', 'truck', 'taxi', 'bus' and 'private_bus'.
  * `Mapbox`: 'walk', 'car' and 'bike'.
  * `TomTom`: 'walk', 'car', 'bike', 'motorbike', 'truck', 'taxi', 'bus' and 'van'.
* `range_value`: `INT64` range of the isoline in seconds (for `range_type` 'time') or meters (for `range_type` 'distance').
* `range_type`: `STRING` type of range. Supported: 'time' (for isochrones), 'distance' (for isodistances).
* `options`: `STRING`|`NULL` containing a valid JSON with the different options. Valid options are described in the table below. If no options are indicated then 'default' values would be applied.

  | Provider | Option | Description |
  | :----- | :----- | :------ |
  |`Here`|`arrival_time`| A `STRING` that specifies the time of arrival. If the value is set, a reverse isoline is calculated. If `"any"` is introduced, then time-dependent effects will not be taken into account. It cannot be used in combination with `departure_time`. Supported: `"any"`, `"now"` and date-time as `"<YYYY-MM-DD>T<hh:mm:ss>"`.|
  |`Here`|`departure_time`| Default: `"now"`. A `STRING` that specifies the time of departure. If `"any"` is introduced, then time-dependent effects will not be taken into account. It cannot be used in combination with `arrival_time`. Supported: `"any"`, `"now"` and date-time as `"<YYYY-MM-DD>T<hh:mm:ss>"`.|
  |`Here`|`optimize_for`| Default: `"balanced"`. A `STRING` that specifies how isoline calculation is optimized. Supported: `"quality"` (calculation of isoline focuses on quality, that is, the graph used for isoline calculation has higher granularity generating an isoline that is more precise), `"performance"` (calculation of isoline is performance-centric, quality of isoline is reduced to provide better performance) and `"balanced"` (calculation of isoline takes a balanced approach averaging between quality and performance).|
  |`Here`|`routing_mode`| Default: `"fast"`. A `STRING` that specifies which optimization is applied during isoline calculation. Supported: `"fast"` (route calculation from start to destination optimized by travel time. In many cases, the route returned by the fast mode may not be the route with the fastest possible travel time. For example, the routing service may favor a route that remains on a highway, even if a faster travel time can be achieved by taking a detour or shortcut through an inconvenient side road) and `"short"` (route calculation from start to destination disregarding any speed information. In this mode, the distance of the route is minimized, while keeping the route sensible. This includes, for example, penalizing turns. Because of that, the resulting route will not necessarily be the one with minimal distance).|
  |`TomTom`|`departure_time`| Default: `"now"`. A `STRING` that specifies the time of departure. If `"any"` is introduced, then time-dependent effects will not be taken into account. Supported: `"any"`, `"now"` and date-time as `"<YYYY-MM-DD>T<hh:mm:ss>"`.|
  |`TomTom`|`traffic`| Default: `true`. A `BOOLEAN` that specifies if all available traffic information will be taken into consideration. Supported: `true` and `false`.|

{{% bannerNote type="warning" title="warning"%}}
Before running, we recommend checking your provider using the [`LDS_QUOTA_INFO`](#lds_quota_info) function. Notice that some of the parameters are provider dependant. Please contact your CARTO representative if you have questions regarding the service provider configured in your organization.
{{%/ bannerNote %}}

**Examples**

```sql
CALL carto.CREATE_ISOLINES(
    'my-schema.my-table',
    'my-schema.my-output-table',
    'my_geom_column',
    'car', 60, 'time',
    'my_api_base_url', 'my_lds_token'
);
-- The table `my-schema.my-output-table` will be created
-- with the columns of the input table except `my_geom_column`.
-- Isolines will be added in the "geom" column.
```

```sql
CALL carto.CREATE_ISOLINES(
    'my_api_base_url', 'my_lds_token',
    'my-schema.my-table',
    'my-schema.my-output-table',
    'my_geom_column',
    'car', 60, 'time',
    '{"departure_time":"any"}'
);
-- The table `my-schema.my-output-table` will be created
-- with the columns of the input table except `my_geom_column`.
-- Isolines will be added in the "geom" column.
```

{{% bannerNote type="note" title="ADDITIONAL EXAMPLES"%}}

* [Generating trade areas based on drive/walk-time isolines](/analytics-toolbox-bigquery/examples/trade-areas-based-on-isolines/)
{{%/ bannerNote %}}


### LDS_QUOTA_INFO

{{% bannerNote type="code" %}}
carto.LDS_QUOTA_INFO(api_base_url, lds_token)
{{%/ bannerNote %}}

**Description**

Returns statistics about the usage of Location Data Services for the user account, including the monthly and consumed quota for both geocoding and isolines services and their associated provider.

* `api_base_url`: `STRING` url of the API where the customer account is stored.
* `lds_token`: `STRING` customer's secret token for accessing the LDS API services.

**Return type**

`STRING`

**Example**

```sql
CALL carto.LDS_QUOTA_INFO('my_api_base_url', 'my_lds_token');
-- [{"monthly_quota":1000,"provider":"tomtom","service":"geocoding","used_quota":10},{"monthly_quota":100,"provider":"here","service":"isolines","used_quota":10}]
```

NOTE: a procedure is used instead of a function because referencing connections within a standard SQL function is not supported.


{{% euFlagFunding %}}