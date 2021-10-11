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
SELECT carto-st.statistics.GETIS_ORD_H3(
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
SELECT carto-st.statistics.GETIS_ORD_H3(input_data, 3, 'gaussian')
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
SELECT carto-st.statistics.GETIS_ORD_QUADKEY(
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
SELECT carto-st.statistics.GETIS_ORD_QUADKEY(input_data, 3, 'gaussian')
FROM (
    SELECT ARRAY_AGG(STRUCT(index, value)) AS input_data
    FROM mytable
)
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
SELECT carto-st.statistics.MORANS_I_H3(
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
SELECT carto-st.statistics.MORANS_I_H3(input_data, 3, 'exponential')
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
SELECT carto-st.statistics.MORANS_I_QUADKEY(
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
SELECT carto-st.statistics.MORANS_I_QUADKEY(input_data, 3, 'exponential')
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
SELECT carto-st.statistics.VERSION();
-- 1.0.0
```