---
aliases:
    - /carto-python/reference/
---

## Reference

Please note that these two packages are open source and that you can also find more detailed information in the correspondent repositories of both [carto-auth](https://github.com/cartodb/carto-auth) and [pydeck-carto](https://github.com/visgl/deck.gl/tree/master/bindings/pydeck-carto) packages.

### carto-auth

The carto-auth library provides two types of authentication methods with your CARTO account.

#### CartoAuth.from_oauth

Create a CartoAuth object using OAuth with CARTO.

**Parameters**

- **cache_filepath** (str, optional): File path where the token is stored. Default "home()/.carto-auth/token_auth.json".
- **use_cache** (bool, optional): Whether the stored cached token should be used. Default True.
- **open_browser** (bool, optional): Whether the web browser should be opened to authorize a user. Default True.

**Return type**

`CartoAuth`


**Examples**

```python
carto_auth = CartoAuth.from_oauth()
```

```python
carto_auth = CartoAuth.from_oauth(cache_filepath='./carto_token.json')
```
<hr>

#### CartoAuth.from_m2m

Create a CartoAuth object using a credentials file to login to the CARTO account.

**Parameters**
- **filepath** (str): File path of the CARTO credentials file.
- **cache_filepath** (str, optional): File path where the token is stored. Default "home()/.carto-auth/token_m2m.json".
- **use_cache** (bool, optional): Whether the stored cached token should be used. Default True.

**Return type**

`CartoAuth`

**Raises**
- **AttributeError**: If the CARTO credentials file does not contain the following attributes: "api_base_url", "client_id", "client_secret".
- **ValueError**: If the CARTO credentials file does not contain any attribute value.


**Example**

```python
carto_auth = CartoAuth.from_m2m('carto_credentials.json')
```

```python
carto_auth = CartoAuth.from_m2m('carto_credentials.json', cache_filepath='./carto_token.json')
```
<hr>

#### get_api_base_url

Method to get the API Base URL of the current CARTO session.

**Return type**

`Str`

**Example**

```python
carto_auth = CartoAuth.from_oauth()
api_base_url = carto_auth.get_api_base_url()
```
<hr>

#### get_access_token

Method to get the token of the current CARTO session.

**Return type**

`Str`

**Example**

```python
carto_auth = CartoAuth.from_oauth()
access_token = carto_auth.get_access_token()
```
<hr>

#### get_carto_dw_client

Returns a client to query directly the CARTO Data Warehouse using the [BigQuery client](https://googleapis.dev/python/bigquery/latest/generated/google.cloud.bigquery.client.Client.html#google.cloud.bigquery.client.Client).

It requires extra dependencies **carto-auth[carto-dw]** to be installed.

**Return type**

`Client`

**Example**
```python
carto_auth = CartoAuth.from_oauth()
carto_dw_client = carto_auth.get_carto_dw_client()
```
<hr>

#### get_carto_dw_credentials

Get the CARTO Data Warehouse credentials.

**Return type**

`tuple`

**Raises**
- **CredentialsError**: If the API Base URL is not provided.

**Example**
```python
carto_auth = CartoAuth.from_oauth()
carto_dw_project, carto_dw_token = carto_auth.get_carto_dw_credentials()
```
<hr>

### pydeck-carto

The pydeck-carto package is a wrapper of [pydeck](https://deckgl.readthedocs.io/en/latest/#) that uses the [CartoLayer](https://deck.gl/docs/api-reference/carto/carto-layer) to enable visualizing tables and tilesets available in your cloud data warehouses as map layers within your data science workflows in Python notebooks. It provides access to the data available in the connections created in the CARTO platform, and it allows you to build visualizations with several pre-built color styling functions.

#### register_carto_layer
Add CartoLayer JS bundle to pydeck's custom libraries.

**Example**
```python
pdkc.register_carto_layer()
```
<hr>

#### get_layer_credentials
Get the layer credentials object to gather information from Carto warehouses.

**Example**
```python
layer_creds = pdkc.get_layer_credentials(carto_auth)
```
<hr>

#### styles.color_bins

Helper function for quickly creating a color bins style.

Data values of each attribute are rounded down to the nearest value in the domain and are then styled with the corresponding color.

**Parameters**
- **attr** (str): Attribute or column to symbolize by.
- **domain** (list): Assign manual class break values.
- **colors** (Union[str, list], optional): Color assigned to each domain value. - str: A valid named CARTOColors palette. - list: Array of colors in RGBA [ [r, g, b, [a]] ]. Default is PurpOr.
- **null_color** (list, optional): Color for null values. Default is [204, 204, 204].

**Example**
```python
layer = pdk.Layer(
    "CartoLayer",
    data="SELECT geom, pct_higher_ed FROM `cartobq.public_account.higher_edu_by_county`",
    type_=pdkc.MapType.QUERY,
    connection=pdkc.CartoConnection.CARTO_DW,
    credentials=pdkc.get_layer_credentials(carto_auth),
    get_fill_color=pdkc.styles.color_bins("pct_higher_ed", [0, 20, 30, 40, 50, 60, 70], "PinkYl"),
    get_line_color=[0, 0, 0, 100],
    line_width_min_pixels=0.5,
    pickable=True,
)
```
<hr>

#### styles.color_categories

Helper function for quickly creating a color category style.

Data values of each attribute listed in the domain are mapped one to one with corresponding colors in the range.

**Parameters**
- **attr** (str): Attribute or column to symbolize by.
- **domain** (list): Category list. Must be a valid list of categories.
- **colors** (Union[str, list], optional): Color assigned to each domain value. - str: A valid named CARTOColors palette. - list: Array of colors in RGBA [ [r, g, b, [a]] ]. Default: PurpOr.
- **null_color** (list, optional): Color for null values. Default is [204, 204, 204].
- **others_color** (list, optional): Fallback color for a category not correctly assigned. Default is [119, 119, 119].

**Example**
```python
layer = pdk.Layer(
    "CartoLayer",
    data="SELECT geom, landuse_type FROM `cartobq.public_account.wburg_parcels`",
    type_=pdkc.MapType.QUERY,
    connection=pdkc.CartoConnection.CARTO_DW,
    credentials=pdkc.get_layer_credentials(carto_auth),
    get_fill_color=pdkc.styles.color_categories(
        "landuse_type",
        [
            "Multi-Family Walk-Up Buildings",
            "Multi-Family Elevator Buildings",
            "Mixed Residential And Commercial Buildings",
            "Parking Facilities",
            "1 and 2 Family Buildings",
            "Commercial and Office Buildings",
            "Vacant Land",
            "Public Facilities and Institutions",
            "Transportation and Utility",
            "Open Space and Outdoor Recreation",
            "Industrial and Manufacturing",
        ],
        "Bold",
    ),
    get_line_color=[0, 0, 0, 100],
    line_width_min_pixels=0.5,
    pickable=True,
)
```
<hr>

#### styles.color_continuous

Helper function for quickly creating a color continuous style.

Data values of each field are interpolated linearly across values in the domain and are then styled with a blend of the corresponding color in the range.

**Parameters**
- **attr** (str): Attribute or column to symbolize by.
- **domain** (list): Attribute domain to define the data range.
- **colors** (Union[str, list], optional): Color assigned to each domain value. - str: A valid named CARTOColors palette. - list: Array of colors in RGBA [ [r, g, b, [a]] ]. Default is PurpOr.
- **null_color** (list, optional): Color for null values. Default is [204, 204, 204].

**Example**
```python
layer = pdk.Layer(
    "CartoLayer",
    data="SELECT geom, value FROM cartobq.public_account.temps",
    type_=pdkc.MapType.QUERY,
    connection=pdkc.CartoConnection.CARTO_DW,
    credentials=pdkc.get_layer_credentials(carto_auth),
    get_fill_color=pdkc.styles.color_continuous("value", [70, 75, 80, 85, 90, 95, 100], "Peach"),
    point_radius_min_pixels=2.5,
    pickable=True,
)
```
<hr>