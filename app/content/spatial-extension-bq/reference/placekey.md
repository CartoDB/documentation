## placekey

[Placekey](https://www.placekey.io/faq) is a free and open universal standard identifier for any physical place, so that the data pertaining to those places can be shared across organizations easily. Since Placekey is based on H3, here we offer a way to transform to and from that index and delegate any extra functionality to H3 itself.

### H3_ASPLACEKEY

{{% bannerNote type="code" %}}
bqcarto.placekey.H3_ASPLACEKEY(h3index)
{{%/ bannerNote %}}

* `h3index`: `INT64` H3 identifier.

Returns the `STRING` Placekey equivalent to the given H3 index.


### PLACEKEY_ASH3

{{% bannerNote type="code" %}}
bqcarto.placekey.PLACEKEY_ASH3(placekey)
{{%/ bannerNote %}}

* `placekey`: `STRING` Placekey identifier.

Returns the `INT64` H3 index equivalent to the given bqcarto.placekey.

### ISVALID

{{% bannerNote type="code" %}}
bqcarto.placekey.ISVALID(placekey)
{{%/ bannerNote %}}

* `placekey`: `STRING` Placekey identifier.

Returns a `BOOLEAN` of value `true` when the given string represents a valid Placekey, `false` otherwise.

### VERSION

{{% bannerNote type="code" %}}
bqcarto.placekey.VERSION() -> STRING
{{%/ bannerNote %}}

Returns the current version of the Placekey module as a `STRING`.