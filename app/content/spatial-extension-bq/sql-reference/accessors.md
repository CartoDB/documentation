## accessors

<div class="badges"><div class="core"></div></div>

This module contains functions that provide information or transform internal geometries.

### ST_ENVELOPE

{{% bannerNote type="code" %}}
accessors.ST_ENVELOPE(geog)
{{%/ bannerNote %}}

**Description**

Takes any number of features and returns a rectangular Polygon that encompasses all vertices. https://turfjs.org/docs/#envelope

* `geog`: `ARRAY<GEOGRAPHY>` input features.

**Return type**

`GEOGRAPHY`

{{% customSelector %}}
**Examples**
{{%/ customSelector %}}

```sql
SELECT carto-os.accessors.ST_ENVELOPE([ST_GEOGPOINT(-75.833, 39.284), ST_GEOGPOINT(-75.6, 39.984), ST_GEOGPOINT(-75.221, 39.125)]);
-- POLYGON((-75.833 39.125, -75.68 39.125 ...
```

```sql
SELECT carto-os.accessors.ST_ENVELOPE([ST_GEOGPOINT(-75.833, 39.284), ST_GEOGPOINT(-75.6, 39.984), ST_GEOGPOINT(-75.221, 39.125)]);
-- POLYGON((-75.833 39.125, -75.68 39.125 ...
```

### VERSION

{{% bannerNote type="code" %}}
accessors.VERSION()
{{%/ bannerNote %}}

**Description**

Returns the current version of the accessors module.

**Return type**

`STRING`

{{% customSelector %}}
**Examples**
{{%/ customSelector %}}

```sql
SELECT carto-os.accessors.VERSION();
-- 1.0.0
```