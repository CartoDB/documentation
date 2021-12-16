## geocoding

<div class="badges"><div class="experimental"></div><div class="advanced"></div></div>

This module contains functions that perform geocoding: taking a text-based description of a location and returning geographic coordinates.

### GEOCODE_BATCH

{{% bannerNote type="code" %}}
carto.GEOCODE_BATCH(input_query, search, country, admin, output, max_multiple_results, max_resolution)
{{%/ bannerNote %}}

**Description**

This procedure can be used to either geocode an input query and produce a new table with the results, or to geocode an input table in place, adding some columns to it for the results.

* `input_query`: `STRING` Either a query that selects the data to be geocoded, or, if the `output` parameter is NULL, the full name of a table to geocode.
* `search`: `STRING` SQL expression (e.g. input query column name, literal, etc.) that specifies the search text to be geocoded.
* `country`: `STRING` SQL expression that specifies the country; can be NULL.
* `admin`: `STRING` SQL expression that specifies the admin division (state/province/...); can be NULL.
* `output`: `STRING` containing the name of an output table to store the results. The name of the output table should include project and dataset: `project-id.dataset-id.table-name`. If this parameter is NULL, then the `input_query` parameter must specify an existing table (also including project and dataset), to which the geocode columns will be added.
* `max_multiple_results`: `INT64`. Set it to NULL to return only a single best match geocode result per row. Geocoding attributes will appear as separate columns of the result. If you pass an integer greater than 0 multiple geocoding result per row will be returned in a `__carto_geocode`column. Geocoding attributes will appear as STRUCT fields. The integer passed will define the maximum geocode matches per row; note that if you pass 1 you will get single best matches, but in a single column with the same format as for multiple results.
* `max_resolution`: `STRING`. By default, if this parameter is NULL, the highest resolution (i.e. more detailed) entity found that matches the search expression (and country/admin if present) will be used. Currently the highest resolution corresponds to cities, followed by administrative divisions and countries. Sometimes, for example if the entities to geocode are states or countries, it's preferable to limit the maximum resolution level to match and give priority to lower resolutions. The value `topadmin` can be assigned to this parameter to geocode administrative divisions in general, where the _largest_ (lower resolution) entities are given priority and cities are excluded.

**Result**,

If `max_multiple_results` is NULL the following columns will be added to either the input table (when `output` is NULL) or the output table:

* `__carto_geocode_center`: GEOGRAPHY
* `__carto_geocode_resolution`: level of detail of the geocoded entity: `country`, `admin1`, `admin1`, `admin2`, `admin3`, `admin4` (administrative levels; smaller number for larger divisions) and `city` for populated places.
* `__carto_geocode_dissimilitude` degree of dissimiltude between the input search and the matched geocoded place. For a perfect match it will be 0; the higher the value the less similar the names are.
* `__carto_num_equal_matches`: Number of matches with the same dissimilitude. A number higher than 1 indicates that this match is ambiguous.
* `__carto_country_id`: ISO code (2 letters) of the matched country, if country was present in the input.
* `__carto_admin_level`: admin level matched, if present in the input.
* `__carto_admin_id`: code of the matched admin division if present in the input.
* `__carto_geocode_name`: name of the matched entity
* `__carto_geocode_country` country of the matched entity
* `__carto_geocode_admin1` admin level 1 of the matched entity
* `__carto_geocode_admin2` admin level 2 of the matched entity
* `__carto_matched_name`: name matched to the input

If `max_multiple_results` is an integer, then multiple results will appear in a single column `__carto_geocode` of type ARRAY, containing objects with fields corresponding to the columns mentioned above (but without the `__carto_` prefixes in their names).

{{% customSelector %}}
**Examples**
{{%/ customSelector %}}

Geocode cities. Note that `country` & `state` are optional, but it's highly
recommendable to provide at least the country. Otherwise results may not only
be inaccurate, but processing time can be very long, since each input has to be search globally.

```sql
CALL `carto-un`.carto.GEOCODE_BATCH(
  'SELECT id, city, state, country FROM `my-project.my-dataset.my-table`',
  'city', 'country', 'state',
  'my-project.my-dataset.my-geocoded-table',
  NULL,
  NULL
);
```

Geocode states. In this case `admin` should be NULL and the `topadmin` option must be used.

```sql
CALL `carto-un`.geocoding.GEOCODE_BATCH(
  'SELECT id, state, country FROM `my-project.my-dataset.my-table`',
  'state', 'country', NULL ,
  'my-project.my-dataset.my-geocoded-table',
  NULL,
  'topadmin'
);
```

Geocode countries. Both `country` and `admin` should be NULL and the `topadmin` option must be used.

```sql
CALL `carto-un`.geocoding.GEOCODE_BATCH(
  'SELECT id, country FROM `my-project.my-dataset.my-table`',
  'country', NULL, NULL ,
  'my-project.my-dataset.my-geocoded-table',
  NULL,
  'topadmin'
);
```


### GEOCODE_PC_BATCH

{{% bannerNote type="code" %}}
carto.GEOCODE_PC_BATCH(input_query, search, country, output, max_multiple_results)
{{%/ bannerNote %}}

**Description**

This procedure can be used to either geocode postal codes an input query and produce a new table with the results, or to geocode postal codes of an input table in place, adding some columns to it for the results.

* `input_query`: `STRING` Either a query that selects the data to be geocoded, or, if the `output` parameter is NULL, the full name of a table to geocode.
* `search`: `STRING` SQL expression (e.g. input query column name, literal, etc.) that specifies the postal code to be geocoded.
* `country`: `STRING` SQL expression that specifies the country; can be NULL.
* `output`: `STRING` containing the name of an output table to store the results. The name of the output table should include project and dataset: `project-id.dataset-id.table-name`. If this parameter is NULL, then the `input_query` parameter must specify an existing table (also including project and dataset), to which the geocode columns will be added.
* `max_multiple_results`: `INT64`. Set it to NULL to return only a single best match geocode result per row. Geocoding attributes will appear as separate columns of the result. If you pass an integer greater than 0 multiple geocoding result per row will be returned in a `__carto_geocode`column. Geocoding attributes will appear as STRUCT fields. The integer passed will define the maximum geocode matches per row;
note that if you pass 1 you will get single best matches, but in a single column with the same format as for multiple results.

**Result**

If `max_multiple_results` is NULL the following columns will be added to either the input table (when `output` is NULL) or the output table:

* `__carto_geocode_dissimilitude` degree of dissimiltude between the input search and the matched postal code. For a perfect match it will be 0; the higher the value the less similar the names are.
* `__carto_geocode_num_matches` Total number of matched postal codes.
* `__carto_goecode_country`: ISO code (2 letters) of the matched postal code.
* `__carto_geocode_postal_code`: matched  postal code.
* `__carto_geocode_center`: location of the matched postal code.

If `max_multiple_results` is an integer, then multiple results will appear in a single column `__carto_geocode` of type ARRAY, containing objects with fields corresponding to the columns mentioned above (but without the `__carto_` prefixes in their names).

{{% customSelector %}}
**Example**
{{%/ customSelector %}}

```sql
CALL `carto-un`.carto.GEOCODE_PC_BATCH(
  'SELECT id, zip, FROM `my-project.my-dataset.my-table`',
  'zip', "'US'",
  'my-project.my-dataset.my-geododed-table',
  NULL
);
```
