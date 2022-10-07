## placekey

<div class="badges"><div class="core"></div></div>

[Placekey](https://www.placekey.io/faq) is a free and open universal standard identifier for any physical place, so that the data pertaining to those places can be shared across organizations easily. Since Placekey is based on H3, here we offer a way to transform to and from that index and delegate any extra functionality to H3 itself.

You can learn more about Placekey on [their website](https://www.placekey.io/) or in the [Overview section](/spatial-extension-rs/sql-reference/placekey/#placekey) of this documentation.


### PLACEKEY_ASH3

{{% bannerNote type="code" %}}
carto.PLACEKEY_ASH3(placekey)
{{%/ bannerNote %}}

**Description**

Returns the H3 index equivalent to the given placekey.

* `placekey`: `VARCHAR` Placekey identifier.

**Return type**

`VARCHAR`

**Example**

```sql
SELECT carto.PLACEKEY_ASH3('@ff7-swh-m49');
-- 8a7b59dffffffff
```


### PLACEKEY_FROMH3

{{% bannerNote type="code" %}}
carto.PLACEKEY_FROMH3(h3index)
{{%/ bannerNote %}}

**Description**

Returns the Placekey equivalent to the given H3 index.

* `h3index`: `VARCHAR` H3 identifier.

**Return type**

`VARCHAR`

**Example**

```sql
SELECT carto.PLACEKEY_FROMH3('847b59dffffffff');
-- @ff7-swh-m49
```


### PLACEKEY_ISVALID

{{% bannerNote type="code" %}}
carto.PLACEKEY_ISVALID(placekey)
{{%/ bannerNote %}}

**Description**

Returns a boolean value `true` when the given string represents a valid Placekey, `false` otherwise.

* `placekey`: `VARCHAR` Placekey identifier.

**Return type**

`BOOLEAN`

**Examples**

```sql
SELECT carto.PLACEKEY_ISVALID('@ff7-swh-m49');
-- true
```

```sql
SELECT carto.PLACEKEY_ISVALID('ff7-swh-m49');
-- true
```

```sql
SELECT carto.PLACEKEY_ISVALID('x');
-- false
```
