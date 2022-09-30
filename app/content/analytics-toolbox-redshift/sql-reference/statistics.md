## statistics

<div class="badges"><div class="advanced"></div></div>

This module contains functions to perform spatial statistics calculations.


### GETIS_ORD_QUADBIN

{{% bannerNote type="code" %}}
carto.GETIS_ORD_QUADBIN(input, size, kernel)
{{%/ bannerNote %}}

**Description**

This function computes the Getis-Ord Gi* statistic for each Quadbin index in the input array.

* `input`: `SUPER` input data with the indexes and values of the cells.
* `size`: `INT8` size of the Quadbin _k-ring_ (distance from the origin). This defines the area around each index cell that will be taken into account to compute its Gi* statistic.
* `kernel`: `VARCHAR` [kernel function](https://en.wikipedia.org/wiki/Kernel_(statistics)) to compute the spatial weights across the kring. Available functions are: uniform, triangular, quadratic, quartic and gaussian.

**Return type**

`SUPER`

**Example**

```sql
SELECT carto.GETIS_ORD_QUADBIN(
    JSON_PARSE('[
        {"index": 5266443791933898751, "value": 51.0},
        {"index": 5266443803500740607, "value": 28.0},
        {"index": 5266443790415822847, "value": 19.0}
    ]'),
    3, 'gaussian'
);
-- [{"index":5266443791933898751,"gi":1.3606194139870578,"p_value":0.086817058065399522},{"index":5266443803500740607,"gi":-0.34633948719670504,"p_value":0.63545613599515272},{"index":5266443790415822847,"gi":-1.0142799267903513,"p_value":0.84477538488255133}]
```


### MORANS_I_QUADBIN

{{% bannerNote type="code" %}}
carto.MORANS_I_QUADBIN(input, size, decay)
{{%/ bannerNote %}}

**Description**

This function computes the [Moran's I spatial autocorrelation](https://en.wikipedia.org/wiki/Moran%27s_I) from the input array of quadkey indexes.

* `input`: `SUPER` input data with the indexes and values of the cells.
* `size`: `INT8` size of the quadkey _k-ring_ (distance from the origin). This defines the area around each index cell where the distance decay will be applied.
* `decay`: `VARCHAR` decay function to compute the [distance decay](https://en.wikipedia.org/wiki/Distance_decay). Available functions are: uniform, inverse, inverse_square and exponential.

**Return type**

`FLOAT8`

**Example**

```sql
SELECT carto.MORANS_I_QUADBIN(
    JSON_PARSE('[
        {"index": 5266443791927869439, "value": 51.0},
        {"index": 5266443791928131583, "value": 28.0},
        {"index": 5266443791928918015, "value": 19.0}
    ]'),
    3, 'exponential'
);
-- -0.2966571382680862
```


### P_VALUE

{{% bannerNote type="code" %}}
carto.P_VALUE(z_score)
{{%/ bannerNote %}}

**Description**

This function computes the one tail p-value (upper-tail test) of a given [z-score](https://en.wikipedia.org/wiki/Standard_score) assuming the population follows a normal distribution where the mean is 0 and the standard deviation is 1. The z-score is a measure of how many standard deviations below or above the population mean a value is. It gives you an idea of how far from the mean a data point is. The [p-value](https://en.wikipedia.org/wiki/P-value) is the probability that a randomly sampled point has a value at least as extreme as the point whose z-score is being tested.

* `z_score`: `FLOAT8` input data with the indexes and values of the cells.

**Return type**

`FLOAT8`

**Example**

```sql
SELECT carto.P_VALUE(-2);
-- 0.9772499371127437
```
