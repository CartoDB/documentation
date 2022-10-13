---
aliases:
    - /carto-python/visualizing-data/
---

## Visualizing data

The library pydeck-carto is a wrapper of [pydeck](https://deckgl.readthedocs.io/en/latest/#) very useful to be able to visualize the tables and tilesets available in your cloud data warehouse as map layers within your data science workflows in Python notebooks using the CartoLayer for pydeck. It provides access to the data objects available in the connections created in the CARTO platform, and it allows you to improve your data visualization with color styling functions. It supports visualizing tilesets and leverage our dynamic tiling implementation for medium size datasets too. You can learn more about our techniques for data visualization in [our documentation](https://docs.carto.com/carto-user-manual/maps/performance-considerations/).


### CartoLayer 

CartoLayer renders cloud data from any data warehouse connection established in your CARTO platform (e.g. to Google BigQuery, Snowflake, Redshift, Postgres, and Databricks). It also provides access to data objects in the CARTO Data Warehouse associated with your CARTO account. It’s a Python wrapper over the [CartoLayer in deck.gl](https://deck.gl/docs/api-reference/carto/carto-layer).

Pydeck-carto is a package outside of pydeck, so calling **pydeck_carto.register_carto_layer()** is required to register CartoLayer in pydeck.


#### Properties

- **data:** (str) Either a SQL query or a name of dataset/tileset.
- **type:** (pydeck.types.String) Type of the input data. It can be either QUERY, TABLE or TILESET. pydeck_carto.layer.MapType().
- **connection:** (pydeck.types.String) Name of the connection registered in the CARTO Workspace. The connection for the CARTO Data Warehouse is already defined as a constant pydeck_carto.layer.CartoConnection().
- **geo_column:** (pydeck.types.String, optional) Name of the geo_column in the CARTO platform. It also supports spatial indexes (h3, quadbin) pydeck_carto.layer.GeoColumnType().
- **credentials:** (dict) Defines the app credentials to gather the information from CARTO. It is recommended to use pydeck_carto.get_layer_credentials() to automatically obtain the token from Oauth using the carto-auth package.
- **aggregation_exp:** (pydeck.types.String, optional) Aggregation SQL expression. Only used for spatial index datasets.
- **aggregation_res_level:** (int, optional) Aggregation resolution level. Only used for spatial index datasets, defaults to 6 for quadbins, 4 for h3.
- **on_data_error:** (pydeck.types.Function, optional) Callback called when the request to the CARTO Maps API failed. It is recommended to use with pydeck_carto.get_error_notifier() to display the error in the visualization.

Check the full list of [CartoLayer properties](https://deck.gl/docs/api-reference/carto/carto-layer#properties).


### Styling 

CARTO provides data-driven out-of-the-box styling functions for colors. Check the full list of [Carto styles in deck.gl](https://deck.gl/docs/api-reference/carto/styles).

The different functions available are:

- **Color_bins:** Helper function for quickly creating a color bins style. Data values of each attribute are rounded down to the nearest value in the domain and are then styled with the corresponding color.

- **Color_categories:** Helper function for quickly creating a color category style. Data values of each attribute listed in the domain are mapped one to one with corresponding colors in the range.

- **Color_continuous:** Helper function for quickly creating a color continuous style. Data values of each field are interpolated linearly across values in the domain and are then styled with a blend of the corresponding color in the range.


For more information and details about function parameters, default values etc., please go to the [reference](https://docs.carto.com/carto-python/reference/).

![png](/img/carto-python/carto-dw-notebook/cartodw_map.png)


### Examples

In this example, we visualize the spatial data with geometries in a map from our data warehouse connection established in our CARTO platform (could be to Google BigQuery, Snowflake, Redshift, Postgres, and Databricks).

```python
# Register CartoLayer in pydeck
register_carto_layer()

hexagons_query = """
SELECT  CARTO_DEV_DATA.carto.H3_BOUNDARY("H3") H3_GEOM,
        CROSSFIT_GYMS / TOTAL_GYMS AS dominance_ratio
        FROM SFDATABASE.CARTO.GYMS_CA_TOTAL_CENTROID
        """

credentials = get_layer_credentials(carto_auth)

hexagons = pdk.Layer(
    "CartoLayer",
    data = hexagons_query,
    geo_column=pdk.types.String("H3_GEOM"),
    type_=MapType.QUERY,
    connection=pdk.types.String("my_carto_connection"),
    credentials=credentials,
    opacity=0.2,
    stroked=True,
    get_fill_color = color_continuous("DOMINANCE_RATIO", [x/10 for x in range(10)], colors = "Tropic"),
    get_line_color=[0,42,42],
    line_width_min_pixels=2,
    on_data_error=get_error_notifier(),
    )

points_query = """
SELECT GEOM, 'crossfit' AS CATEGORY
FROM SFDATABASE.CARTO.GYMS_CA_CROSSFIT
UNION ALL
SELECT GEOM, 'competitors' AS CATEGORY
FROM SFDATABASE.CARTO.GYMS_CA_COMPETITION
"""

points = pdk.Layer(
    "CartoLayer",
    data = points_query,
    geo_column=pdk.types.String("GEOM"),
    type_=MapType.QUERY,
    connection=pdk.types.String("snowflake"),
    credentials=credentials,
    opacity=0.8,
    stroked=True,
    pickable=True,
    point_radius_min_pixels=2,
    get_fill_color = color_categories("CATEGORY", ["competitors", "crossfit"], colors = "Tropic"),
    
    on_data_error=get_error_notifier(),
    )

view_state = pdk.ViewState(latitude=33.64, longitude=-117.94, zoom=5)
r = pdk.Deck(
    [hexagons, points],
    initial_view_state=view_state,
    map_style=pdk.map_styles.LIGHT,
)
r.to_html(iframe_height = 700)
```

![png](/img/carto-python/styling-screenshot.png)


</br>

 In this case, you can see spatial data based on points visualized on a map, natively from our CARTO DW.  

```python
# Register CartoLayer in pydeck
register_carto_layer()

# Render CartoLayer in pydeck with color_bins style
layer = pdk.Layer(
    "CartoLayer",
    data="SELECT geom, price_num FROM `carto-dw-ac-XXX.shared.01_listings_la_2021_5_reviews`",
    type_=MapType.QUERY,
    connection=CartoConnection.CARTO_DW, 
    credentials=get_layer_credentials(carto_auth),
    point_radius_min_pixels=2.5,
    get_fill_color=color_bins("price_num",[0, 100, 200, 300, 400, 500], "PinkYl"),
    get_line_color=[0, 0, 0, 100],
    on_data_error=get_error_notifier(),
)
view_state = pdk.ViewState(latitude=34.5, longitude=-118, zoom=8)
pdk.Deck(layer, map_style=pdk.map_styles.ROAD, initial_view_state=view_state)
```

![png](/img/carto-python/points_map_cartodw.png)


</br>

And in this last example, we use the CARTO connection from your Databricks Workspace. This workflow is fully supported H3 indexes and leverage [Databricks' native capabilities](https://docs.databricks.com/spark/latest/spark-sql/language-manual/sql-ref-functions-builtin.html#h3-geospatial-functions) and the CARTO APIs ones. 

```python
# Register CartoLayer in pydeck
register_carto_layer()

# Render CartoLayer in pydeck
layer = pdk.Layer(
    "CartoLayer",
    data="hive_metastore.carto_dev_data.derived_spatialfeatures_ukr_h3int_res10_v1_yearly_v2_interpolated",
    type_=MapType.TABLE,
    connection=pdk.types.String("databricksconn_cluster"),
    credentials=get_layer_credentials(carto_auth),
    aggregation_exp=pdk.types.String("sum(population) as population"),
    aggregation_res_level=5,
    geo_column=pdk.types.String("h3"),
    get_fill_color=color_bins("population", [1, 10, 100, 1000, 10000, 100000], "SunsetDark"),
    get_line_color=[0, 0, 0, 80],
    line_width_min_pixels=0.5,
    stroked=True,
    extruded=False,
    pickable=True
)

tooltip = {
    "html": "Population: <b>{population}</b>",
    "style": {"background": "grey", "color": "white", "font-family": '"Helvetica Neue", Arial', "z-index": "10000"},
}

view_state = pdk.ViewState(latitude=49.0, longitude=30.0, zoom=5)
pdk.Deck(layer, map_style=pdk.map_styles.ROAD, initial_view_state=view_state)
```

![png](/img/carto-python/databricks-notebook/databricks_map.png)