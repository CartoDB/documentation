---
aliases:
    - /carto-python/working-with-data/how-to-use-the-analytics-toolbox-for-databricks
---

## How to access CARTO's Analytics Toolbox for Databricks and create visualizations via Python notebooks

This notebook guides the user through the process for connecting to CARTO account and leverage CARTO's Analytics Toolbox and CARTO's integration with Pydeck to be able to perform spatial analytics at scale and create map visualizations from Python notebooks. You can find the original notebook [here](https://docs.carto.com).

### Install dependencies


```python
!pip install pydeck-carto pydeck carto-auth -q
```


```python
import pydeck as pdk
from pydeck_carto import register_carto_layer, get_layer_credentials
from pydeck_carto.layer import MapType, CartoConnection
from pydeck_carto.styles import color_bins
from carto_auth import CartoAuth
```

### Authenticate with CARTO

The method below will get an OAuth access token that will give you permission to interact with the CARTO platform with the same privileges and access to resources as if you were logged in.


```python
carto_auth = CartoAuth.from_oauth()
```


### Loading an H3 Layer from a Databricks connection.

CARTO can connect to a Databricks SQL Warehouse or a Databricks cluster to push down SQL queries that will be fully executed in your Databricks environment. In both cases, the connection fully supports H3 indexes, leveraging [Databricks' native capabilities](https://docs.databricks.com/spark/latest/spark-sql/language-manual/sql-ref-functions-builtin.html#h3-geospatial-functions).

By using the examples in this notebook, you're leveraging CARTO APIs from within your Databricks Workspace.

Learn more about how to connect CARTO to Databricks [here](https://docs.carto.com/carto-user-manual/connections/creating-a-connection/#connection-to-databricks).


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

To get started creating maps, we recommend the following resources from the documentation:
* [Guide to create your first map](https://docs.carto.com/carto-user-manual/overview/getting-started/#quickstart-guide-to-create-your-first-map).
* [Guide to add widgets to a map](https://docs.carto.com/carto-user-manual/maps/map-settings/#widgets).
* [Step-by-step tutorial](https://docs.carto.com/carto-user-manual/tutorials/build-a-categories-and-bubbles-visualization/) to create a category and bubbles visualization, leveraging different map styles and widgets.

