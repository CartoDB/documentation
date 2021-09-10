## geocoding

<div class="badges"><div class="experimental"></div><div class="advanced"></div></div>

This module contains functions that perform geocoding: taking a text-based description of a location and returning geographic coordinates.

### GEOCODE_BATCH

{{% bannerNote type="code" %}}
geocoding.GEOCODE_BATCH(input_query, search, country, admin, output, max_multiple_results, input)
{{%/ bannerNote %}}

**Description**

This procedure geocodes an input query. To geocode a table pass a query like `SELECT * FROM table`.

* `input_query`: `STRING` query that selects the data to be geocoded.
* `search`: `STRING` SQL expression (e.g. input query column name, literal, etc.) that specifies the search text to be geocoded.
* `country`: `STRING` SQL expression that specifies the country; can be NULL.
* `admin`: `STRING` SQL expression that specifies the admin division (state/province/...); can be NULL.
* `output`: `ARRAY<STRING>` containing the name of an output table to store the results and optionally an SQL clause that can be used to partition it, e.g. `'PARTITION BY number'`. The name of the output table should include project and dataset: `project-id.dataset-id.table-name`. This parameter can be NULL or empty, in which case the enrichment result is simply returned but not stored anywhere.
* `max_multiple_results`: `INT64`. Set it to NULL to return only a single best match geocode result per row. Geocoding attributes will appear as separate columns of the result. If you pass an integer greater than 0 multiple geocoding result per row will be returned in a `__carto_geocode__`column. Geocoding attributes will appear as STRUCT fields. The integer passed will define the maximum geocode matches per row;
note that if you pass 1 you will get single best matches, but in a single column with the same format as for multiple results.
* `source`: `STRING` name of the location where the Data Observatory subscriptions of the user are stored, in `project_id.dataset_id` format. If only the `dataset_id` is included, it uses the project `carto-customers` by default.

**Result**

Produces a table with the result of the input query and some additional attributes per geocoding match:

* `__carto_geocode_center__`: GEOGRAPHY
* `__carto_geocode_resolution__`: resolution of the geocodings
* `__carto_geocode_dissimilitude__` degree of dissimiltude between the input search and the matched geocoded place. For a perfect match it will be 0; the higher the value the less similar the names are.
* `__carto_country_id__`: ISO code (2 letters) of the detected country.
* `__carto_admin_level__`: admin level matched
* `__carto_admin_id__`: code of the matched admin division.
* `__carto_geocode_name__`: named of the matched entity

{{% customSelector %}}
**Example**
{{%/ customSelector %}}

```sql
CALL bqcarto.geocoding.GEOCODE_BATCH(
  'SELECT id, city, state, country FROM `my-project.my-dataset.my-table`',
  'city', 'country', 'state',
  ['`my-project.my-dataset.my-geododed-table`'],
  NULL,
  'my-dataobs-project.my-dataobs-dataset'
);
```

### VERSION

{{% bannerNote type="code" %}}
geocoding.VERSION()
{{%/ bannerNote %}}

**Description**

Returns the current version of the geocoding module.

**Return type**

`STRING`

{{% customSelector %}}
**Example**
{{%/ customSelector %}}

```sql
SELECT bqcarto.geocoding.VERSION();
-- 1.0.0
```