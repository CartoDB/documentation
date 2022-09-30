---
aliases:
    - /analytics-toolbox-bq/sql-reference/statistics/
---
## statistics

<div class="badges"><div class="advanced"></div></div>

This module contains functions to perform spatial statistics calculations.


### GETIS_ORD_H3

{{% bannerNote type="code" %}}
carto.GETIS_ORD_H3(input, size, kernel)
{{%/ bannerNote %}}

**Description**

This function computes the Getis-Ord Gi* statistic for each H3 index in the input array.

* `input`: `ARRAY<STRUCT<index STRING, value FLOAT64>>` input data with the indexes and values of the cells.
* `size`: `INT64` size of the H3 kring (distance from the origin). This defines the area around each index cell that will be taken into account to compute its Gi* statistic.
* `kernel`: `STRING` [kernel function](https://en.wikipedia.org/wiki/Kernel_(statistics)) to compute the spatial weights across the kring. Available functions are: uniform, triangular, quadratic, quartic and gaussian.

**Return type**

`ARRAY<STRUCT<index STRING, gi FLOAT64, p_value FLOAT64>>`

{{% customSelector %}}
**Example**
{{%/ customSelector %}}

```sql
SELECT `carto-un`.carto.GETIS_ORD_H3(
    [
        STRUCT('89394460323ffff', 51.0),
        STRUCT('89394460c37ffff', 28.0),
        STRUCT('89394460077ffff', 19.0)
    ],
    3, 'gaussian'
);
-- {"index": "89394460323ffff", "gi": 1.3606194139870573, "p_value": 0.13329689888387608}
-- {"index": "89394460c37ffff", "gi": -0.34633948719670526, "p_value": 0.6113291103317855}
-- {"index": "89394460077ffff", "gi": -1.0142799267903515, "p_value": 0.7962089998559484 }
```

```sql
SELECT `carto-un`.carto.GETIS_ORD_H3(input_data, 3, 'gaussian')
FROM (
    SELECT ARRAY_AGG(STRUCT(index, value)) AS input_data
    FROM mytable
)
```

{{% bannerNote type="note" title="ADDITIONAL EXAMPLES"%}}
* [Identifying amenity hotspots in Stockholm](/analytics-toolbox-bigquery/examples/amenity-hotspots-in-stockholm/)
{{%/ bannerNote %}}

### GETIS_ORD_QUADBIN

{{% bannerNote type="code" %}}
carto.GETIS_ORD_QUADBIN(input, size, kernel)
{{%/ bannerNote %}}

**Description**

This function computes the Getis-Ord Gi* statistic for each Quadbin index in the input array.

* `input`: `ARRAY<STRUCT<index STRING, value FLOAT64>>` input data with the indexes and values of the cells.
* `size`: `INT64` size of the Quadbin _k-ring_ (distance from the origin). This defines the area around each index cell that will be taken into account to compute its Gi* statistic.
* `kernel`: `STRING` [kernel function](https://en.wikipedia.org/wiki/Kernel_(statistics)) to compute the spatial weights across the kring. Available functions are: uniform, triangular, quadratic, quartic and gaussian.

**Return type**

`ARRAY<STRUCT<index STRING, gi FLOAT64, p_value FLOAT64>>`

{{% customSelector %}}
**Example**
{{%/ customSelector %}}

```sql
SELECT `carto-un`.carto.GETIS_ORD_QUADBIN(
    [
        STRUCT(5266443791933898751, 51.0),
        STRUCT(5266443803500740607, 28.0),
        STRUCT(5266443790415822847, 19.0)
    ],
    3, 'gaussian'
);
-- {"index": 5266443791933898751, "gi": 1.360619413987058, "p_value": 0.086817058065399522}
-- {"index": 5266443803500740607, "gi": -0.3463394871967051, "p_value": 0.63545613599515272}
-- {"index": 5266443790415822847, "gi": -1.0142799267903515, "p_value": 0.84477538488255133}
```

```sql
SELECT `carto-un`.carto.GETIS_ORD_QUADBIN(input_data, 3, 'gaussian')
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
    SELECT `carto-un`.carto.GFUN(myarray)
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
* `cell_type`: `STRING` spatial index type as 'h3', 'quadbin'.
* `kring_distance`: `INT64` distance of the neighboring cells whose data will be included in the local regression of each cell.
* `kernel_function`: `STRING` [kernel function](https://en.wikipedia.org/wiki/Kernel_(statistics)) to compute the spatial weights across the kring. Available functions are: 'uniform', 'triangular', 'quadratic', 'quartic' and 'gaussian'.
* `fit_intercept`: `BOOL` whether to calculate the interception of the model or to force it to zero if, for example, the input data is already supposed to be centered. If NULL, `fit_intercept` will be considered as `TRUE`.
* `output_table`: `STRING` name of the output table. It should be a quoted qualified table with project and dataset: `<project-id>.<dataset-id>.<table-name>`. The process will fail if the target table already exists. If NULL, the result will be returned directly by the query and not persisted.

**Output**

The output table will contain a column with the cell id, a column for each feature column containing its corresponding coefficient estimate and one extra column for intercept if `fit_intercept` is `TRUE`.

{{% customSelector %}}
**Examples**
{{%/ customSelector %}}

```sql
CALL `carto-un`.carto.GWR_GRID(
    'cartobq.docs.airbnb_berlin_h3_qk_qb',
    ['bedrooms', 'bathrooms'], -- [ beds feature, bathrooms feature ]
    'price', -- price (target variable)
    'h3_z6', 'h3', 3, 'gaussian', TRUE,
    '<project-id>.<dataset-id>.<table-name>'
);
```

```sql
CALL `carto-un`.carto.GWR_GRID(
    'cartobq.docs.airbnb_berlin_h3_qk_qb',
    ['bedrooms', 'bathrooms'], -- [ beds feature, bathrooms feature ]
    'price', -- price (target variable)
    'qb_z12', 'quadbin', 3, 'gaussian', TRUE,
    '<project-id>.<dataset-id>.<table-name>'
);
```

{{% bannerNote type="note" title="ADDITIONAL EXAMPLES"%}}
* [Applying GWR to understand Airbnb listings prices](/analytics-toolbox-bigquery/examples/applying-gwr-to-understand-airbnb-listings-prices/)
{{%/ bannerNote %}}

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
    SELECT `carto-un`.carto.KNN(myarray, 10)
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


### LOCAL_MORANS_I_H3

{{% bannerNote type="code" %}}
carto.LOCAL_MORANS_I_H3(input, size, decay, permutations)
{{%/ bannerNote %}}

**Description**

This function computes the local Moran's I spatial autocorrelation from the input array of H3 indexes.
It outputs the H3 `index`, local Moran's I spatial autocorrelation `value`, simulated p value `psim`, Conditional randomization null - expectation `EIc`, Conditional randomization null - variance `VIc`, Total randomization null - expectation `EI`, Total randomization null - variance `VI`, and the quad HH=1, LL=2, LH=3, HL=4.

* `input`: `ARRAY<STRUCT<index STRING, value FLOAT64>>` input data with the indexes and values of the cells.
* `size`: `INT64` size of the H3 kring (distance from the origin). This defines the area around each index cell where the distance decay will be applied.
* `decay`: `STRING` decay function to compute the [distance decay](https://en.wikipedia.org/wiki/Distance_decay). Available functions are: uniform, inverse, inverse_square and exponential.
* `permutations`: `INT64` number of permutations for the estimation of p-value.

**Return type**

ARRAY<STRUCT<index STRING, value FLOAT64, psim FLOAT64, EIc FLOAT64, VIc FLOAT64, EI FLOAT64, VI FLOAT64, quad INT64>>

{{% customSelector %}}
**Example**
{{%/ customSelector %}}

```sql
SELECT `carto-un`.carto.LOCAL_MORANS_I_H3(
    [
        STRUCT('89394460323ffff', 51.0),
        STRUCT('8939446033bffff', 28.0),
        STRUCT('8939446032bffff', 19.0)
    ],
    3, 'exponential', 100
);
-- {
--   "index": "8939446032bffff",
--   "value": "-0.342921256629947",
--   "psim": "0.0099009900990099011",
--   "EIc": "-1.0287637698898404",
--   "VIc": "-1.0",
--   "EI": "0.0",
--   "VI": "-0.64721503525401447",
--   "quad": "3"
-- },
-- ...
```

```sql
SELECT `carto-un`.carto.LOCAL_MORANS_I_H3(
    ARRAY(SELECT AS STRUCT index, value FROM mytable),
    3, 'exponential', 100
)
```


### LOCAL_MORANS_I_QUADBIN

{{% bannerNote type="code" %}}
carto.LOCAL_MORANS_I_QUADBIN(input, size, decay)
{{%/ bannerNote %}}

**Description**

This function computes the local Moran's I spatial autocorrelation from the input array of Quadbin indexes. It outputs the Quadbin `index`, local Moran's I spatial autocorrelation `value`, simulated p value `psim`, Conditional randomization null - expectation `EIc`, Conditional randomization null - variance `VIc`, Total randomization null - expectation `EI`, Total randomization null - variance `VI`, and the quad HH=1, LL=2, LH=3, HL=4.

* `input`: `ARRAY<STRUCT<index INT64, value FLOAT64>>` input data with the indexes and values of the cells.
* `size`: `INT64` size of the Quadbin _k-ring_ (distance from the origin). This defines the area around each index cell where the distance decay will be applied.
* `decay`: `STRING` decay function to compute the [distance decay](https://en.wikipedia.org/wiki/Distance_decay). Available functions are: uniform, inverse, inverse_square and exponential.
* `permutations`: `INT64` number of permutations for the estimation of p-value.

**Return type**

ARRAY<STRUCT<index INT64, value FLOAT64, psim FLOAT64, EIc FLOAT64, VIc FLOAT64, EI FLOAT64, VI FLOAT64, quad INT64>>

{{% customSelector %}}
**Example**
{{%/ customSelector %}}

```sql
SELECT `carto-un`.carto.LOCAL_MORANS_I_QUADBIN(
    [
        STRUCT(5266443791927869439, 51.0),
        STRUCT(5266443791928131583, 28.0),
        STRUCT(5266443791928918015, 19.0)
    ],
    3, 'exponential', 100
);
-- {
--   "index": "5266443791928918015",
--   "value": "-0.076228184845253524",
--   "psim": "0.0099009900990099011",
--   "EIc": "-0.70361240532717062",
--   "VIc": "-0.68393972058572117",
--   "EI": "0.29943435718277039",
--   "VI": "0.19089112237884748",
--   "quad": "3"
-- },
-- ...
```

```sql
SELECT `carto-un`.carto.LOCAL_MORANS_I_QUADBIN(
    ARRAY(SELECT AS STRUCT index, value FROM mytable),
    3, 'exponential', 100
);
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
    SELECT `carto-un`.carto.LOF(myarray, 10)
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

* `src_fullname`: `STRING` The input table. A `STRING` of the form <code>project-id.dataset-id.table-name</code> is expected. The `project-id` can be omitted (in which case the default one will be used).
* `target_fullname`: `STRING` The resulting table where the LOF will be stored. A `STRING` of the form <code>project-id.dataset-id.table-name</code> is expected. The `project-id` can be omitted (in which case the default one will be used). The dataset must exist and the caller needs to have permissions to create a new table in it. The process will fail if the target table already exists.
* `geoid_column_name`: `STRING` The column name with a unique identifier for each point.
* `geo_column_name`: `STRING` The column name containing the points.
* `lof_target_column_name`: `STRING` The column name where the resulting Local Outlier Factor will be stored in the output table.
* `k`: `INT64` Number of nearest neighbors (positive, typically small).

{{% customSelector %}}
**Example**
{{%/ customSelector %}}

```sql
CALL `carto-un`.carto.LOF_TABLE(
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
carto.MORANS_I_H3(input, size, decay)
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
SELECT `carto-un`.carto.MORANS_I_H3(
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
SELECT `carto-un`.carto.MORANS_I_H3(input_data, 3, 'exponential')
FROM (
    SELECT ARRAY_AGG(STRUCT(index, value)) AS input_data
    FROM mytable
)
```

{{% bannerNote type="note" title="ADDITIONAL EXAMPLES"%}}
* [Computing the spatial autocorrelation of POIs locations in Berlin](/analytics-toolbox-bigquery/examples/computing-the-spatial-autocorrelation-of-pois-locations-in-berlin/)
{{%/ bannerNote %}}

### MORANS_I_QUADBIN

{{% bannerNote type="code" %}}
carto.MORANS_I_QUADBIN(input, size, decay)
{{%/ bannerNote %}}

**Description**

This function computes the [Moran's I spatial autocorrelation](https://en.wikipedia.org/wiki/Moran%27s_I) from the input array of Quadbin indexes.

* `input`: `ARRAY<STRUCT<index INT64, value FLOAT64>>` input data with the indexes and values of the cells.
* `size`: `INT64` size of the Quadbin _k-ring_ (distance from the origin). This defines the area around each index cell where the distance decay will be applied.
* `decay`: `STRING` decay function to compute the [distance decay](https://en.wikipedia.org/wiki/Distance_decay). Available functions are: uniform, inverse, inverse_square and exponential.

**Return type**

`FLOAT64`

{{% customSelector %}}
**Example**
{{%/ customSelector %}}

```sql
SELECT `carto-un`.carto.MORANS_I_QUADBIN(
    [
        STRUCT(5266443791927869439, 51.0),
        STRUCT(5266443791928131583, 28.0),
        STRUCT(5266443791928918015, 19.0)
    ],
    3, 'exponential'
);
-- -0.29665713826808621
```

```sql
SELECT `carto-un`.carto.MORANS_I_QUADBIN(input_data, 3, 'exponential')
FROM (
    SELECT ARRAY_AGG(STRUCT(index, value)) AS input_data
    FROM mytable
)
```


### ORDINARY_KRIGING

{{% bannerNote type="code" %}}
carto.ORDINARY_KRIGING(sample_points, interp_points, max_distance, variogram_params, n_neighbors, model)
{{%/ bannerNote %}}

**Description**

This function uses [Ordinary kriging](https://en.wikipedia.org/wiki/Kriging) to compute the interpolated values of an array of points, given another array of points with known associated values and a variogram. This variogram may be computed with the [#variogram] function.

* `sample_points`: `ARRAY<STRUCT<point GEOGRAPHY, value FLOAT64>>` input array with the sample points and their values.
* `interp_points`: `ARRAY<GEOGRAPHY>` input array with the points whose values will be interpolated.
* `max_distance`: `FLOAT64` maximum distance to compute the semivariance.
* `variogram_params`: `ARRAY<FLOAT64>` parameters [P0, P1, P2] of the variogram model.
* `n_neighbors`: `INT64` maximum number of neighbors of a point to be taken into account for interpolation.
* `model`: `STRING` type of model for fitting the semivariance. It can be either `exponential` or `spherical` and it should be the same type of model as the one used to compute the variogram:
  * `exponential`: `P0 * (1. - exp(-xi / (P1 / 3.0))) + P2`
  * `spherical`: `P1 * (1.5 * (xi / P0) - 0.5 * (xi / P0)**3) + P2`.

**Return type**

`ARRAY<STRUCT<point GEOGRAPHY, value FLOAT64>>`

{{% customSelector %}}
**Examples**
{{%/ customSelector %}}

Here is a standalone example:

```sql
SELECT
  `carto-un`.carto.ORDINARY_KRIGING(
             [STRUCT(st_geogpoint(0.26,1.02) as point, 1.0 as value),
              STRUCT(st_geogpoint(0.91,0.74) as point, 3.1 as value),
              STRUCT(st_geogpoint(-0.59,0.51) as point, 1.5 as value),
              STRUCT(st_geogpoint(0.86,0.92) as point, 3.6 as value),
              STRUCT(st_geogpoint(0.37,1.07) as point, 1.1 as value),
              STRUCT(st_geogpoint(0.69,-0.52) as point, 1.2 as value)],
             [st_geogpoint(0.,0.),
              st_geogpoint(0.,1.)],
             1.0E5,
             [0.1,1E8,0.1],
             20,
             'exponential')
-- {"point": "POINT(0 0)", "value": "1.357680916212768"},
-- {"point": "POINT(0 1)", "value": "1.07161192146499"}
```

Here is an example using the `ORDINARY_KRIGING` function along with a `VARIOGRAM` estimation:

```sql

DECLARE sample_points ARRAY<STRUCT<point GEOGRAPHY, value FLOAT64>>;
DECLARE variogram_output STRUCT<params ARRAY<FLOAT64>, x ARRAY<FLOAT64>, y ARRAY<FLOAT64>, yp ARRAY<FLOAT64>, count ARRAY<INT64>>;
DECLARE interp_points ARRAY<GEOGRAPHY>;

# generate the spatially correlated values
SET sample_points = ARRAY(SELECT AS STRUCT st_geogpoint(lon_sqrt+0.1*RAND(),lat_sqrt+0.1*RAND()) point,
            pow(sin(lon_sqrt)*sin(lat_sqrt),2)+0.1*RAND() value
        FROM
            UNNEST(GENERATE_ARRAY(-10,10,0.1)) lon_sqrt,
            UNNEST(GENERATE_ARRAY(-10,10,0.1)) lat_sqrt
        ORDER BY RAND()
        LIMIT 1000);

# compute parameters of the variogram
SET variogram_output = `carto-un`.carto.VARIOGRAM(sample_points, 20, 1.0E5, 'spherical');
    
# generate the points to be interpolated
SET interp_points = ARRAY(SELECT st_geogpoint(lon_sqrt,lat_sqrt) point
        FROM
            UNNEST(GENERATE_ARRAY(-5,5,0.25)) lon_sqrt,
            UNNEST(GENERATE_ARRAY(-5,5,0.25)) lat_sqrt
            );

# Calculate interpolated values
SELECT
  point, value
FROM
  UNNEST(`carto-un`.carto.ORDINARY_KRIGING(
         sample_points,
         interp_points,
         1.0E5,
         variogram_output.params,
         20,
         'spherical')) WITH OFFSET pos
ORDER BY pos

-- {"point": POINT(-5 -5), "value": 0.568294714734378},
-- {"point": POINT(-5 -4.75), "value": 0.8303238799265198},
-- {"point": POINT(-5 -4.5), "value": 0.8876712348264676},
-- {"point": POINT(-5 -4.25), "value": 0.7437099678173889},
-- {"point": POINT(-5 -4), "value": 0.5543380644791405},
-- {"point": POINT(-5 -3.75), "value": 0.45182050244159944}
-- ...
```


### ORDINARY_KRIGING_TABLE

{{% bannerNote type="code" %}}
carto.ORDINARY_KRIGING_TABLE(input_table, interp_table, target_table, n_bins, max_distance, n_neighbors, model)
{{%/ bannerNote %}}

**Description**

This procedure uses [Ordinary kriging](https://en.wikipedia.org/wiki/Kriging) to compute the interpolated values of a set of points stored in a table, given another set of points with known associated values.

* `input_table`: `STRING` name of the table with the sample points locations and their values stored in a column named `point` (type `GEOGRAPHY`) and `value` (type `FLOAT`), respectively. It should be a qualified table name including project and dataset: `<project-id>.<dataset-id>.<table-name>`.
* `interp_table`: `STRING` name of the table with the point locations whose values will be interpolated stored in a column named `point` of type `GEOGRAPHY`. It should be a qualified table name including project and dataset: `<project-id>.<dataset-id>.<table-name>`.
* `target_table`: `STRING` name of the output table where the result of the kriging will be stored. It should be a qualified table name including project and dataset: `<project-id>.<dataset-id>.<table-name>`. The process will fail if the target table already exists. If NULL, the result will be returned by the procedure and won't be persisted.
* `n_bins`: `INT64` number of bins to compute the semivariance.
* `max_distance`: `FLOAT64` maximum distance to compute the semivariance.
* `n_neighbors`: `INT64` maximum number of neighbors of a point to be taken into account for interpolation.
* `model`: `STRING` type of model for fitting the semivariance. It can be either:
  * `exponential`: `P0 * (1. - exp(-xi / (P1 / 3.0))) + P2`
  * `spherical`: `P1 * (1.5 * (xi / P0) - 0.5 * (xi / P0)**3) + P2`.

{{% customSelector %}}
**Example**
{{%/ customSelector %}}

```sql
CALL `carto-un`.carto.ORDINARY_KRIGING_TABLE(
         'cartobq.docs.nasadem_jp_extract',
         'cartobq.docs.interp_points',
         NULL,
         50,
         1000,
         20,
         'exponential');
-- {"point": "POINT(142.4277 43.51606)", "value": "288.531297133198"},
-- {"point": "POINT(142.4181 43.50518)", "value": "306.62910397500843"},
-- {"point": "POINT(142.4175 43.5045)", "value": "306.9708080004128"},
-- {"point": "POINT(142.4121 43.49838)", "value": "328.37518451985943"},
-- {"point": "POINT(142.4172 43.50416)", "value": "307.1771955935104"},
-- ...
```

{{% bannerNote type="note" title="ADDITIONAL EXAMPLES"%}}
* [Interpolating elevation along a road using kriging](/analytics-toolbox-bigquery/examples/interpolate-elevation-along-a-road/)
{{%/ bannerNote %}}

### P_VALUE

{{% bannerNote type="code" %}}
carto.P_VALUE(z_score)
{{%/ bannerNote %}}

**Description**

This function computes the one tail p-value (upper-tail test) of a given z-score assuming the population follows a normal distribution where the mean is 0 and the standard deviation is 1.
The [z-score](https://en.wikipedia.org/wiki/Standard_score) is a measure of how many standard deviations below or above the population mean a value is. It gives you an idea of how far from the mean a data point is.
The [p-value](https://en.wikipedia.org/wiki/P-value) is the probability that a randomly sampled point has a value at least as extreme as the point whose z-score is being tested.

* `z_score`: `FLOAT64`

**Return type**

`FLOAT64`

{{% customSelector %}}

**Example**
{{%/ customSelector %}}

```sql
SELECT `carto-un`.carto.P_VALUE(u) as p_value
    FROM UNNEST([-2,-1,0,1,2]) u;

-- [ 0.9772499371127437, 0.8413447361676363, 0.49999999949999996, 0.15865526383236372, 0.02275006288725634]
```


### SMOOTHING_MRF_H3

{{% bannerNote type="code" %}}
carto.SMOOTHING_MRF_H3(input, output, index_column, variable_column, options)
{{%/ bannerNote %}}

**Description**

This procedure computes a Markov Random Field (MRF) smoothing for a table containing H3 cell indexes and their associated values.

This implementation is based on the work of Christopher J. Paciorek: "Spatial models for point and areal data using Markov random fields on a fine grid." Electron. J. Statist. 7 946 - 972, 2013. <https://doi.org/10.1214/13-EJS791>

{{% bannerNote title="TIP" type="tip" %}}
if your data is in lat/long format, you can still use this procedure by first converting your points to H3 cell indexes by using the [H3_FROMLONGLAT](../h3/#h3_fromlonglat) function.
{{%/ bannerNote %}}

* `input`: `STRING` name of the source table. It should be a fully qualified table name including project and dataset: `<project-id>.<dataset-id>.<table-name>`.
* `output`: `STRING` name of the output table. It should be a fully qualified table name including project and dataset: `<project-id>.<dataset-id>.<table-name>`. The process will fail if the table already exists. If NULL, the result will be returned directly by the procedure and not persisted.
* `index_column`: `STRING` name of the column containing the cell ids.
* `variable_column`: `STRING` name of the target variable column.
* `options`: `STRING` JSON string to overwrite the model's default options. If set to NULL or empty, it will use the default values.
  * `closing_distance`: `INT64` distance of closing. It defaults to 0. If strictly positive, the algorithm performs a [morphological closing](https://en.wikipedia.org/wiki/Closing_(morphology)) on the cells by the `closing_distance`, defined in number of cells, before performing the smoothing. No closing is performed otherwise.
  * `output_closing_cell`: `BOOL` controls whether the cells generated by the closing are added to the output. If defaults to `FALSE`.
  * `lambda`: `FLOAT64` iteration update factor. It defaults to 1.6. For more details, see <https://doi.org/10.1214/13-EJS791>, page 963.
  * `iter`: `INT64` number of iterative queries to perform the smoothing. It defaults to 10. Increasing this parameter might help if the `convergence_limit` is not reached by the end of the procedure's execution. Tip: if this limit has ben reached, the status of the second-to-last step of the procedure will throw an error.
  * `intra_iter`: `INT64` number of iterations per query. It defaults to 50. Reducing this parameter might help if a resource error is reached during the procedure's execution.
  * `convergence_limit`: `FLOAT64` threshold condition to stop iterations. If this threshold is not reached, then the procedure will finish its execution after the maximum number of iterations (`iter`) is reached. It defaults to 10e-5. For more details, see <https://doi.org/10.1214/13-EJS791>, page 963.

**Return type**

`FLOAT64`

{{% customSelector %}}
**Example**
{{%/ customSelector %}}

```sql
CALL
  `carto-un`.SMOOTHING_MRF_H3( "cartobq.docs.airbnb_berlin_h3_qk",
    NULL,
    'h3_z7',
    'price',
    '{"closing_distance":0, "output_closing_cell":"true", "lambda":1.6, "iter":10, "intra_iter":5, "convergence_limit":10e-5}');
-- {"id": 871f18840ffffff, "beta": 64.56696796809489}
-- {"id": 871f18841ffffff, "beta": 62.61498241759014}
-- {"id": 871f18844ffffff, "beta": 65.47069449331353}
```


### SMOOTHING_MRF_QUADBIN

{{% bannerNote type="code" %}}
carto.SMOOTHING_MRF_QUADBI (input, output, index_column, variable_column, options)
{{%/ bannerNote %}}

**Description**

This procedure computes a Markov Random Field (MRF) smoothing for a table containing QUADBIN cell indexes and their associated values.

This implementation is based on the work of Christopher J. Paciorek: "Spatial models for point and areal data using Markov random fields on a fine grid." Electron. J. Statist. 7 946 - 972, 2013. <https://doi.org/10.1214/13-EJS791>

{{% bannerNote title="TIP" type="tip" %}}
if your data is in lat/long format, you can still use this procedure by first converting your points to QUADINT cell indexes by using the [QUADBIN_FROMLONGLAT](../quadbin/#quadbin_fromlonglat) function.
{{%/ bannerNote %}}

* `input`: `STRING` name of the source table. It should be a fully qualified table name including project and dataset: `<project-id>.<dataset-id>.<table-name>`.
* `output`: `STRING` name of the output table. It should be a fully qualified table name including project and dataset: `<project-id>.<dataset-id>.<table-name>`. The process will fail if the table already exists.
* `index_column`: `STRING` name of the column containing the cell ids.
* `variable_column`: `STRING` name of the target variable column.
* `options`: `STRING` JSON string to overwrite the model's default options. If set to NULL or empty, it will use the default values.
  * `closing_distance`: `INT64` distance of closing. It defaults to 0. If strictly positive, the algorithm performs a [morphological closing](https://en.wikipedia.org/wiki/Closing_(morphology)) on the cells by the `closing_distance`, defined in number of cells, before performing the smoothing. No closing is performed otherwise.
  * `output_closing_cell`: `BOOL` controls whether the cells generated by the closing are added to the output. If defaults to `FALSE`.
  * `lambda`: `FLOAT64` iteration update factor. It defaults to 1.6. For more details, see <https://doi.org/10.1214/13-EJS791>, page 963.
  * `iter`: `INT64` number of iterative queries to perform the smoothing. It defaults to 10. Increasing this parameter might help if the `convergence_limit` is not reached by the end of the procedure's execution. Tip: if this limit has ben reached, the status of the second-to-last step of the procedure will throw an error.
  * `intra_iter`: `INT64` number of iterations per query. It defaults to 50. Reducing this parameter might help if a resource error is reached during the procedure's execution.
  * `convergence_limit`: `FLOAT64` threshold condition to stop iterations. If this threshold is not reached, then the procedure will finish its execution after the maximum number of iterations (`iter`) is reached. It defaults to 10e-5. For more details, see <https://doi.org/10.1214/13-EJS791>, page 963.

**Return type**

`FLOAT64`

{{% customSelector %}}
**Example**
{{%/ customSelector %}}

```sql
CALL `carto-un`.carto.SMOOTHING_MRF_QUADBIN(
  'cartobq.docs.airbnb_berlin_h3_qk_qb',
  'my-project.my-dataset.my-smoothing-table',
  'qb_z11',
  'price',
  '''{
    "closing_distance": 0,
    "output_closing_cell": "true",
    "lambda": 1.6,
    "iter": 10,
    "intra_iter": 5,
    "convergence_limit": 10e-5
  }'''
);
-- The table `my-project.my-dataset.my-smoothing-table` will be created
-- with columns: id, price_smoothed
```


### VARIOGRAM

{{% bannerNote type="code" %}}
carto.VARIOGRAM(input, n_bins, max_distance, model)
{{%/ bannerNote %}}

**Description**

This function computes the [Variogram](https://en.wikipedia.org/wiki/Variogram) from the input array of points and their associated values.

It returns a STRUCT with the parameters of the variogram, the _x_ values, the _y_ values, the predicted _y_ values and the number of values aggregated per bin.

* `input`: `ARRAY<STRUCT<point GEOGRAPHY, value FLOAT64>>` input array with the points and their associated values.
* `n_bins`: `INT64` number of bins to compute the semivariance.
* `max_distance`: `FLOAT64` maximum distance to compute the semivariance.
* `model`: `STRING` type of model for fitting the semivariance. It can be either:
  * `exponential`: `P0 * (1. - exp(-xi / (P1 / 3.0))) + P2`
  * `spherical`: `P1 * (1.5 * (xi / P0) - 0.5 * (xi / P0)**3) + P2`.

**Return type**

`STRUCT<variogram_params ARRAY<FLOAT64>, x ARRAY<FLOAT64>, y ARRAY<FLOAT64>, yp ARRAY<FLOAT64>, count ARRAY<INT64>>`

where:

* `variogram_params`: array containing the parameters [P0, P1, P2] fitted to the `model`.
* `x`: array with the _x_ values used to fit the `model`.
* `y`: array with the _y_ values used to fit the `model`.
* `yp`: array with the _y_ values as predicted by the `model`.
* `count`: array with the number of elements aggregated in the bin.

{{% customSelector %}}
**Examples**
{{%/ customSelector %}}

```sql
DECLARE sample_points ARRAY<STRUCT<point GEOGRAPHY, value FLOAT64>>;

# generate the spatially correlated values
SET sample_points = ARRAY(SELECT AS STRUCT st_geogpoint(lon_sqrt+0.1*RAND(),lat_sqrt+0.1*RAND()) point,
            pow(sin(lon_sqrt)*sin(lat_sqrt),2)+0.1*RAND() value
        FROM
            UNNEST(GENERATE_ARRAY(-10,10,0.1)) lon_sqrt,
            UNNEST(GENERATE_ARRAY(-10,10,0.1)) lat_sqrt
        ORDER BY RAND()
        LIMIT 1000);

# compute parameters of the variogram
SELECT `carto-un`.carto.VARIOGRAM(sample_points, 20, 1.0E5, 'exponential');
-- {
--   variogram_params: [1.8656766501394384, 9890263.713521793, -0.007675798653736552],
--   x: [13433.902872564133, 20772.802451664986, 56973.516169567, 67627.90034684369, 70363.43483710312, 78689.64706974, ...],
--   y: [0.005, 0.125, 3.125, 3.380, 2.0, 2.205, ...],
--   yp: [-0.14889750150153813, 0.49581158712413576, 2.351461086006329, 2.635658071286461, 2.696612846710653, 2.857216896041544, ...],
--   count: [162, 308, 328, 326, 312, 305, ...]
-- }
```


{{% euFlagFunding %}}