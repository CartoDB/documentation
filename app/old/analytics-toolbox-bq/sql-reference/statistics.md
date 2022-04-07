## statistics

<div class="badges"><div class="advanced"></div></div>

This module contains functions to perform spatial statistics calculations.

### GETIS_ORD_H3

{{% bannerNote type="code" %}}
statistics.GETIS_ORD_H3(input, size, kernel)
{{%/ bannerNote %}}

**Description**

This function computes the Getis-Ord Gi* statistic for each H3 index in the input array.

* `input`: `ARRAY<STRUCT<index STRING, value FLOAT64>>` input data with the indexes and values of the cells.
* `size`: `INT64` size of the H3 kring (distance from the origin). This defines the area around each index cell that will be taken into account to compute its Gi* statistic.
* `kernel`: `STRING` [kernel function](https://en.wikipedia.org/wiki/Kernel_(statistics)) to compute the spatial weights across the kring. Available functions are: uniform, triangular, quadratic, quartic and gaussian.

**Return type**

`ARRAY<STRUCT<index STRING, gi FLOAT64>>`

{{% customSelector %}}
**Example**
{{%/ customSelector %}}

```sql
SELECT `carto-un`.statistics.GETIS_ORD_H3(
    [
        STRUCT('89394460323ffff', 51.0),
        STRUCT('89394460c37ffff', 28.0),
        STRUCT('89394460077ffff', 19.0)
    ],
    3, 'gaussian'
);
-- {"index": "89394460323ffff", "gi": 1.110941099464319}
-- {"index": "89394460c37ffff", "gi": -0.28278500713637167}
-- {"index": "89394460077ffff", "gi": -0.8281560923279462}
```

```sql
SELECT `carto-un`.statistics.GETIS_ORD_H3(input_data, 3, 'gaussian')
FROM (
    SELECT ARRAY_AGG(STRUCT(index, value)) AS input_data
    FROM mytable
)
```

### GETIS_ORD_QUADKEY

{{% bannerNote type="code" %}}
statistics.GETIS_ORD_QUADKEY(input, size, kernel)
{{%/ bannerNote %}}

**Description**

This function computes the Getis-Ord Gi* statistic for each quadkey index in the input array.

* `input`: `ARRAY<STRUCT<index STRING, value FLOAT64>>` input data with the indexes and values of the cells.
* `size`: `INT64` size of the quadkey kring (distance from the origin). This defines the area around each index cell that will be taken into account to compute its Gi* statistic.
* `kernel`: `STRING` [kernel function](https://en.wikipedia.org/wiki/Kernel_(statistics)) to compute the spatial weights across the kring. Available functions are: uniform, triangular, quadratic, quartic and gaussian.

**Return type**

`ARRAY<STRUCT<index STRING, gi FLOAT64>>`

{{% customSelector %}}
**Example**
{{%/ customSelector %}}

```sql
SELECT `carto-un`.statistics.GETIS_ORD_QUADKEY(
    [
        STRUCT(205405577137, 51.0),
        STRUCT(205430743409, 28.0),
        STRUCT(205292330897, 19.0)
    ],
    3, 'gaussian'
);
-- {"index": 205405577137, "gi": 1.110941099464319}
-- {"index": 205430743409, "gi": -0.28278500713637167}
-- {"index": 205292330897, "gi": -0.8281560923279462}
```

```sql
SELECT `carto-un`.statistics.GETIS_ORD_QUADKEY(input_data, 3, 'gaussian')
FROM (
    SELECT ARRAY_AGG(STRUCT(index, value)) AS input_data
    FROM mytable
)
```

### GFUN

{{% bannerNote type="code" %}}
statistics.GFUN(points)
{{%/ bannerNote %}}

**Description**

This function computes the [G-function](http://www.css.cornell.edu/faculty/dgr2/_static/files/ov/ov_PPA_Handout.pdf) of a given set of points.

* `points`: `ARRAY<GEOGRAPHY>` input data points.

**Return type**

`ARRAY<STRUCT<distance FLOAT64, gfun_G FLOAT64, gfun_ev FLOAT64>>`

where:
* `distance`: the nearest neighbors distances.
* `gfun_G`: the empirical G evaluated for each distance in the support.
* `gfun_ev`: the theoretical Poisson G evaluated for each distance in the support.

{{% customSelector %}}
**Example**
{{%/ customSelector %}}

```sql
SELECT *
FROM UNNEST((
    SELECT `carto-un`.statistics.GFUN(myarray)
    FROM (
        SELECT ARRAY_AGG(position_geom) myarray
        FROM `bigquery-public-data.catalonian_mobile_coverage.mobile_data_2015_2017`
        WHERE date = '2017-12-31'
    )
))
ORDER BY distance
--{
--  "distance": "38.599968853183",
--  "gfun_G": "0.4319167389418907",
--  "gfun_ev": "4.037383876246414E-4"
--},
--{
--  "distance": "77.199937706366",
--  "gfun_G": "0.5771899392888118",
--  "gfun_ev": "0.0016139757856029613"
--},
--{
--  "distance": "115.799906559549",
--  "gfun_G": "0.6522116218560278",
--  "gfun_ev": "0.003627782844736638"
--},
-- ...
```


### GWR_GRID

{{% bannerNote type="code" %}}
statistics.GWR_GRID(input_table, features_columns, label_column, cell_column, cell_type, kring_distance, kernel_function, fit_intercept, output_table)
{{%/ bannerNote %}}

**Description**

Geographically weighted regression (GWR) models local relationships between spatially varying predictors and an outcome of interest using a local least squares regression.

This procedures performs a local least squares regression for every input cell. In each regression, the data of each cell and that of the neighboring cells, defined by the `kring_distance` parameter, will be taken into account. The data of the neighboring cells will be assigned a lower weight the further they are from the origin cell, following the function specified in the `kernel_function`.

* `input_table`: `STRING` name of the source dataset. It should be a quoted qualified table with project and dataset: `<project-id>.<dataset-id>.<table-name>`.
* `features_columns`: `ARRAY<STRING>` array of column names from `input_table` to be used as features in the GWR.
* `label_column`: `STRING` name of the target variable column.
* `cell_column`: `STRING` name of the column containing the cell ids.
* `cell_type`: `STRING` spatial index type as 'h3' or 'quadkey'.
* `kring_distance`: `INT64` distance of the neighboring cells whose data will be included in the local regression of each cell.
* `kernel_function`: `STRING` [kernel function](https://en.wikipedia.org/wiki/Kernel_(statistics)) to compute the spatial weights across the kring. Available functions are: 'uniform', 'triangular', 'quadratic', 'quartic' and 'gaussian'.
* `fit_intercept `: `BOOL` whether to calculate the interception of the model or to force it to zero if, for example, the input data is already supposed to be centered. If NULL, `fit_intercept` will be considered as `TRUE`.
* `output_table `: `STRING` name of the output table. It should be a quoted qualified table with project and dataset: `<project-id>.<dataset-id>.<table-name>`. The process will fail if the target table already exists. If NULL, the result will be returned directly by the query and not persisted.

**Output**

The output table will contain a column with the cell id, a column for each feature column containing its corresponding coefficient estimate and one extra column for intercept if `fit_intercept` is `TRUE`.

{{% customSelector %}}
**Examples**
{{%/ customSelector %}}

```sql
CALL `carto-un`.statistics.GWR_GRID(
    'cartobq.docs.airbnb_berlin_h3_qk',
    ['bedrooms', 'bathrooms'], -- [ beds feature, bathrooms feature ]
    'price', -- price (target variable)
    'h3_z6', 'h3', 3, 'gaussian', TRUE,
    '<project-id>.<dataset-id>.<table-name>'
);
```

```sql
CALL `carto-un`.statistics.GWR_GRID(
    'cartobq.docs.airbnb_berlin_h3_qk',
    ['bedrooms', 'bathrooms'], -- [ beds feature, bathrooms feature ]
    'price', -- price (target variable)
    'qk_z12', 'quadkey', 3, 'gaussian', TRUE,
    '<project-id>.<dataset-id>.<table-name>'
);
```

### KNN

{{% bannerNote type="code" %}}
statistics.KNN(points, k)
{{%/ bannerNote %}}

**Description**

This function returns for each point the [_k-nearest neighbors_](https://en.wikipedia.org/wiki/K-nearest_neighbors_algorithm) of a given set of points.

* `points`: `ARRAY<STRUCT<geoid STRING, geo GEOGRAPHY>>` input data with unique id and geography.
* `k`: `INT64` number of nearest neighbors (positive, typically small).

**Return type**

`ARRAY<STRUCT<geo GEOGRAPHY, geo_knn GEOGRAPHY, geoid STRING, geoid_knn STRING, distance FLOAT64, knn INT64>>`

where:
* `geo`: the geometry of the considered point.
* `geo_knn`: the k-nearest neighbor point.
* `geoid`: the unique identifier of the considered point.
* `geoid_knn`: the unique identifier of the k-nearest neighbor.
* `distance`: the k-nearest neighbor distance to the considered point.
* `knn`: the k-order (knn)

{{% customSelector %}}
**Example**
{{%/ customSelector %}}

```sql
SELECT *
FROM UNNEST((
    SELECT `carto-un`.statistics.KNN(myarray, 10)
    FROM (
        SELECT ARRAY_AGG(STRUCT(format('%08x', uid),position_geom)) myarray
        FROM (
            SELECT ROW_NUMBER() OVER (ORDER BY hour) AS uid, position_geom
            FROM `bigquery-public-data.catalonian_mobile_coverage.mobile_data_2015_2017`
            WHERE date = '2017-12-31'
        )
    )
))
ORDER BY geoid
--{
--  "geo": "POINT(2.82263 41.97118)",
--  "geo_knn": "POINT(2.8225 41.97117)",
--  "geoid": "00000001",
--  "geoid_knn": "00000624",
--  "distance": "10.804663098937658",
--  "knn": "1"
--},
--{
--  "geo": "POINT(2.82263 41.97118)",
--  "geo_knn": "POINT(2.823 41.9712)",
--  "geoid": "00000001",
--  "geoid_knn": "00000666",
--  "distance": "30.66917920746894",
--  "knn": "2"
--},
--{
--  "geo": "POINT(2.82263 41.97118)",
--  "geo_knn": "POINT(2.82298 41.9713)",
--  "geoid": "00000001",
--  "geoid_knn": "00000618",
--  "distance": "31.863463704968353",
--  "knn": "3"
--},
-- ...
```

### LOF

{{% bannerNote type="code" %}}
statistics.LOF(points, k)
{{%/ bannerNote %}}

**Description**

This function computes the [Local Outlier Factor](https://en.wikipedia.org/wiki/Local_outlier_factor) of each point of a given set of points.

* `points`: `ARRAY<STRUCT<geoid STRING, geo GEOGRAPHY>>` input data points with unique id and geography.
* `k`: `INT64` number of nearest neighbors (positive, typically small).

**Return type**

`ARRAY<STRUCT<geo GEOGRAPHY, geoid GEOGRAPHY, lof FLOAT64>>`
where:
* `geo`: the geometry of the considered point.
* `geoid`: the unique identifier of the considered point.
* `lof`: the Local Outlier Factor score.

{{% customSelector %}}
**Example**
{{%/ customSelector %}}

```sql
SELECT *
FROM UNNEST((
    SELECT `carto-un`.statistics.LOF(myarray, 10)
    FROM (
        SELECT ARRAY_AGG(STRUCT(format('%08x', uid),position_geom)) myarray
        FROM (
            SELECT ROW_NUMBER() OVER (ORDER BY hour) AS uid, position_geom
            FROM `bigquery-public-data.catalonian_mobile_coverage.mobile_data_2015_2017`
            WHERE date = '2017-12-31'
        )
    )
))
ORDER BY geoid
-- {"geo": POINT(2.82263 41.97118), "geoid": "00000001", "lof": 1.3217599116891428}
-- {"geo": POINT(2.35705 41.49786), "geoid": "00000002", "lof": 1.235551000737416}
-- {"geo": POINT(2.13967 41.3838), "geoid": "00000003", "lof": 1.1305674032876687}
-- ...
```

### LOF_TABLE

{{% bannerNote type="code" %}}
statistics.LOF_TABLE(src_fullname STRING, target_fullname STRING, geoid_column_name STRING, geo_column_name STRING, k INT64)
{{%/ bannerNote %}}

**Description**

This function computes the [Local Outlier Factor](https://en.wikipedia.org/wiki/Local_outlier_factor) for each point of a specified column and stores the result in an output table along with the other input columns.

* `src_fullname`: `STRING` The input table. A `STRING` of the form <code>projectID.dataset.tablename</code> is expected. The projectID can be omitted (in which case the default one will be used).
* `target_fullname`: `STRING` The resulting table where the LOF will be stored. A `STRING` of the form <code>projectID.dataset.tablename</code> is expected. The projectID can be omitted (in which case the default one will be used). The dataset must exist and the caller needs to have permissions to create a new table in it. The process will fail if the target table already exists.
* `geoid_column_name`: `STRING` The column name with a unique identifier for each point.
* `geo_column_name`: `STRING` The column name containing the points.
* `lof_target_column_name`: `STRING` The column name where the resulting Local Outlier Factor will be stored in the output table.
* `k`: `INT64` Number of nearest neighbors (positive, typically small).

{{% customSelector %}}
**Example**
{{%/ customSelector %}}

```sql
CALL `carto-un`.statistics.LOF_TABLE(
  'bigquery-public-data.new_york_subway.stations',
  'myproject.mydataset.my_output_table',
  'station_id',
  'station_geom',
  'lof',
  10
);
-- The table `'myproject.mydataset.my_output_table` will be created
-- with an extra column containing the `lof` value.
```

### MORANS_I_H3

{{% bannerNote type="code" %}}
statistics.MORANS_I_H3(input, size, decay)
{{%/ bannerNote %}}

**Description**

This function computes the [Moran's I spatial autocorrelation](https://en.wikipedia.org/wiki/Moran%27s_I) from the input array of H3 indexes.

* `input`: `ARRAY<STRUCT<index STRING, value FLOAT64>>` input data with the indexes and values of the cells.
* `size`: `INT64` size of the H3 kring (distance from the origin). This defines the area around each index cell where the distance decay will be applied.
* `decay`: `STRING` decay function to compute the [distance decay](https://en.wikipedia.org/wiki/Distance_decay). Available functions are: uniform, inverse, inverse_square and exponential.

**Return type**

`FLOAT64`

{{% customSelector %}}
**Example**
{{%/ customSelector %}}

```sql
SELECT `carto-un`.statistics.MORANS_I_H3(
    [
        STRUCT('89394460323ffff', 51.0),
        STRUCT('89394460c37ffff', 28.0),
        STRUCT('89394460077ffff', 19.0)
    ],
    3, 'exponential'
);
-- 0.07219909881624618
```

```sql
SELECT `carto-un`.statistics.MORANS_I_H3(input_data, 3, 'exponential')
FROM (
    SELECT ARRAY_AGG(STRUCT(index, value)) AS input_data
    FROM mytable
)
```

### MORANS_I_QUADKEY

{{% bannerNote type="code" %}}
statistics.MORANS_I_QUADKEY(input, size, decay)
{{%/ bannerNote %}}

**Description**

This function computes the [Moran's I spatial autocorrelation](https://en.wikipedia.org/wiki/Moran%27s_I) from the input array of quadkey indexes.

* `input`: `ARRAY<STRUCT<index INT64, value FLOAT64>>` input data with the indexes and values of the cells.
* `size`: `INT64` size of the quadkey kring (distance from the origin). This defines the area around each index cell where the distance decay will be applied.
* `decay`: `STRING` decay function to compute the [distance decay](https://en.wikipedia.org/wiki/Distance_decay). Available functions are: uniform, inverse, inverse_square and exponential.

**Return type**

`FLOAT64`

{{% customSelector %}}
**Example**
{{%/ customSelector %}}

```sql
SELECT `carto-un`.statistics.MORANS_I_QUADKEY(
    [
        STRUCT(205405577137, 51.0),
        STRUCT(205430743409, 28.0),
        STRUCT(205292330897, 19.0)
    ],
    3, 'exponential'
);
-- 0.05514467303662483
```

```sql
SELECT `carto-un`.statistics.MORANS_I_QUADKEY(input_data, 3, 'exponential')
FROM (
    SELECT ARRAY_AGG(STRUCT(index, value)) AS input_data
    FROM mytable
)
```

### VERSION

{{% bannerNote type="code" %}}
statistics.VERSION()
{{%/ bannerNote %}}

**Description**

Returns the current version of the statistics module.

**Return type**

`STRING`

{{% customSelector %}}
**Example**
{{%/ customSelector %}}

```sql
SELECT `carto-un`.statistics.VERSION();
-- 1.0.0
```