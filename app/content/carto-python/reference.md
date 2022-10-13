---
aliases:
    - /carto-python/reference/
---

## Reference

Remind that these two packages are open source, then you can find more information and details in the correspondent repositories of [carto-auth](https://github.com/cartodb/carto-auth)and [pydeck-carto](https://github.com/visgl/deck.gl/tree/master/bindings/pydeck-carto).

### carto_auth

#### class CartoAuth

CARTO Authentication object used to gather connect with the CARTO services.

Args: 
- api_base_url (str, optional): API Base URL for a CARTO account. Default "https: //gcp-us-east1.api.carto.com". 
- client_id (str, optional): Client id of a M2M application provided by CARTO. 
- client_secret (str, optional): Client secret of a M2M application provided by CARTO. 
- cache_filepath (str, optional): File path where the token is stored. Default ".carto_token.json". 
- use_cache (bool, optional): Whether the stored cached token should be used. Default True. 
- access_token (str, optional): Token already generated with CARTO. 
- expires_in (str, optional): Time in seconds when the token will be expired.

How to get the API credentials:
https: //docs.carto.com/carto-user-manual/developers/carto-for-developers/

**method __init__** 

```python
__init__(
    api_base_url='https://gcp-us-east1.api.carto.com',
    client_id=None,
    client_secret=None,
    cache_filepath='.carto_token.json',
    use_cache=True,
    access_token=None,
    expires_in=None
)
```
</br>
</br>

#### classmethod from_oauth

```python
from_oauth(
    api_base_url='https://gcp-us-east1.api.carto.com',
    cache_filepath='.carto_token.json',
    use_cache=True,
    open_browser=True
)
```

Create a CartoAuth object using OAuth with CARTO.

Args:
- api_base_url (str, optional): Base URL for a CARTO account.
- Default "https: //gcp-us-east1.api.carto.com".
- cache_filepath (str, optional): File path where the token is stored. Default ".carto_token.json".
- use_cache (bool, optional): Whether the stored cached token should be used. Default True.
- open_browser (bool, optional): Whether the web browser should be opened to authorize a user. Default True.

</br>
</br>

#### classmethod from_file

```python
from_file(filepath, use_cache=True)
```

Create a CartoAuth object using a credentials file to login to the CARTO account.

Args: 
- filepath (str): File path of the CARTO credentials file. 
- use_cache (bool, optional): Whether the stored cached token should be used. Default True.

Raises: AttributeError If the CARTO credentials file does not contain the following attributes: "client_id", "api_base_url", "client_secret". 
ValueError If the CARTO credentials file does not contain any attribute value.

</br>
</br>

#### method get_access_token
```python
get_access_token()
```
</br>
</br>

#### method get_carto_dw_client

```python
get_carto_dw_client()
```

Returns a client to query directly the CARTO Data Warehouse.

It requires extra dependencies carto-auth[carto-dw] to be installed.

</br>
</br>

#### method get_carto_dw_credentials

```python
get_carto_dw_credentials() → tuple
```

Get the CARTO Data Warehouse credentials.

Returns:

- tuple: carto_dw_project, carto_dw_token.

Raises:

- CredentialsError: If the API Base URL is not provided.

</br>
</br>

### pydeck_carto

#### CartoLayer

**get_error_notifier()** </br>
Helper function to get the layer error notifier callback.
</br>
</br>

**get_layer_credentials(carto_auth)→ dict**</br>
Get the layer credentials object to gather information from Carto warehouses.
</br>
</br>

**register_carto_layer()**</br>
Add CartoLayer JS bundle to pydeck”s custom libraries.
</br>
</br>

**classMapType**
- QUERY: alias of query

- TABLE: alias of table

- TILESET: alias of tileset

</br>
</br>

**classCartoConnection**</br>
- CARTO_DW: alias of carto_dw
</br>
</br>

**classGeoColumnType**</br>
- H3: alias of h3
- QUADBIN: alias of quadbin

</br>
</br>

#### pydeck_carto.styles


**color_bins(attr: str, domain: list, colors: Union[str, list] = 'PurpOr', null_color: list = [204, 204, 204])**

Parameters:
- attr (str) – Attribute or column to symbolize by.
- domain (list) – Assign manual class break values.
- colors (Union[str, list], optional) – Color assigned to each domain value. - str: A valid named CARTOColors palette. - list: Array of colors in RGBA [ [r, g, b, [a]] ]. Default is PurpOr.
- null_color (list, optional) – Color for null values. Default is [204, 204, 204].
</br>
</br>

**color_categories(attr: str, domain: list, colors: Union[str, list] = 'PurpOr', null_color: list = [204, 204, 204], others_color: list = [119, 119, 119])**

Parameters:
- attr (str) – Attribute or column to symbolize by.
- domain (list) – Category list. Must be a valid list of categories.
- colors (Union[str, list], optional) – Color assigned to each domain value. - str: A valid named CARTOColors palette. - list: Array of colors in RGBA [ [r, g, b, [a]] ]. Default: PurpOr.
- null_color (list, optional) – Color for null values. Default is [204, 204, 204].
- others_color (list, optional) – Fallback color for a category not correctly assigned. Default is [119, 119, 119].
</br>
</br>

**color_continuous(attr: str, domain: list, colors: Union[str, list] = 'PurpOr', null_color: list = [204, 204, 204])**

Parameters:
- attr (str) – Attribute or column to symbolize by.
- domain (list) – Attribute domain to define the data range.
- colors (Union[str, list], optional) – Color assigned to each domain value. - str: A valid named CARTOColors palette. - list: Array of colors in RGBA [ [r, g, b, [a]] ]. Default is PurpOr.
- null_color (list, optional) – Color for null values. Default is [204, 204, 204].

