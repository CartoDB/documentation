## geohash

<div class="badges"><div class="core"></div></div>

[Geohash](http://geohash.org/) is a public domain spatial index.


### ST_BOUNDARY

{{% bannerNote type="code" %}}
geohash.ST_BOUNDARY(index)
{{%/ bannerNote %}}

**Description**

Returns a geography representing the geohash cell. It will return `null` on error (invalid input).

* `index`: `STRING` The Geohash cell index. The maximum length supported is 17.

**Return type**

`GEOGRAPHY`

{{% customSelector %}}
**Example**
{{%/ customSelector %}}

```sql
SELECT `carto-os`.geohash.ST_BOUNDARY('ezrqcjzgdr3');
-- POLYGON((-1.00000128149986 41.9999988377094, -0.999999940395355 41.9999988377094, ...
```


### VERSION

{{% bannerNote type="code" %}}
geohash.VERSION()
{{%/ bannerNote %}}

**Description**

Returns the current version of the geohash module.

**Return type**

`STRING`

{{% customSelector %}}
**Example**
{{%/ customSelector %}}

```sql
SELECT `carto-os`.geohash.VERSION();
-- 1.0.0
```