---
aliases:
    - /carto-python/working-with-data/how-to-work-with-your-data-in-the-carto-data-warehouse
---

## How to work with your data in the CARTO Data Warehouse

This notebook guides the user through the process for connecting to the CARTO account and leverage CARTO's Analytics Toolbox and CARTO's integration with Pydeck to be able to perform spatial analytics at scale and create map visualizations from Python notebooks. You can find the original notebook [here](https://colab.research.google.com/drive/1Zu2vI9uV-kINp1Nw2MmMYx-j0LQA7dgD?usp=sharing).

The outline of this notebooks is as follows:

*   Authenticating with your CARTO account: to get access to the objects within the CARTO Data Warehouse, to run analysis functions from CARTO's [Analytics Toolbox](https://docs.carto.com/analytics-toolbox-bigquery/overview/getting-started/), and to be able to use 'CartoLayer' in Pydeck for visualizing your data
*   Running data opeartions and anlyses using the Python client for the CARTO Data Warehouse
*   Creating map visualizations with CARTO and Pydeck


### Install all necessary libraries

Please run the following commands to install the CARTO's Python packages (pydeck-carto and carto-auth) and all other required libraries.

Note that in order to install the Python client to access the CARTO Data Warehouse you need to identify the extra parameter [carto-dw] when installing the carto-auth package. Note that this client is a wrapper to the [Python client for Google BigQuery](https://googleapis.dev/python/bigquery/latest/index.html).


```python
!pip install pydeck-carto carto-auth[carto-dw] geopandas db_dtypes -q
```


```python
import pydeck as pdk
import geopandas as gpd
import pandas as pd
from pydeck_carto import register_carto_layer, get_layer_credentials
from pydeck_carto.layer import MapType, CartoConnection
from pydeck_carto.styles import color_bins
from carto_auth import CartoAuth
```

### Authenticate to CARTO

In this step, we use the carto_auth package to authenticate to our CARTO account and to get the necessary details to interact with data available in the CARTO Data Warehouse.



```python
# Using the Oauth autentication method
carto_auth = CartoAuth.from_oauth()
# CARTO Data Warehouse client
carto_dw_client = carto_auth.get_carto_dw_client()
```


```python
#to take the dataset_id in CARTO DW
datasets = list(carto_dw_client.list_datasets()) 

if datasets:
    print("Datasets in CARTO Data Warehouse:")
    for dataset in datasets:
        print("\t{}".format(dataset.dataset_id))
else:
    print("CARTO Data Warehouse project does not contain any datasets.")
```


We can already list datasets, data objects, and even read tables by passing the "table id". In this example we show how to get the properties from a table.

We can also list all tables contained in the "shared" dataset of the CARTO Data Warehouse.


```python
#to list the tables contained in the dataset_id previously obtained
dataset_id = 'shared'
tables = carto_dw_client.list_tables('shared')  # Make an API request.

print("Tables contained in '{}':".format(dataset_id))
for table in tables:
    print("{}.{}.{}".format(table.project, table.dataset_id, table.table_id))
```



### Loading data from the CARTO Data Warehouse into a dataframe
Next, you can also load data available in the CARTO Data Warehouse into a geodataframe in Python.


```python
# Load table
table = carto_dw_client.get_table("carto-dw-ac-jfjjof5m.shared.01_listings_la_2021_5_reviews")
gdf = carto_dw_client.list_rows(table).to_geodataframe()
#formating
gdf['review_scores_cleanliness'] = gdf['review_scores_cleanliness'].astype('float')
gdf['review_scores_location'] = gdf['review_scores_location'].astype('float')
gdf['review_scores_value'] = gdf['review_scores_value'].astype('float')
gdf['review_scores_rating'] = gdf['review_scores_rating'].astype('float')
pd.set_option('display.precision', 2)
# Table preview
gdf.head()
```



    
![png](/img/carto-python/carto-dw-notebook/output_13_1.png)
    


### Using functions from the Analytics Toolbox

CARTO's Analytics Toolbox is a suite of functions and procedures that run natively in SQL within the different supported data warehouses. This means that the user can run functions from the Analytics Toolbox using the Python clients from BigQuery, Snowflake, Redshift and so on. In the case of the CARTO Data Warehouse the carto_dw_client provides a wrapper to the BigQuery client, so we will be leveragin the [Analytics Toolbox for BigQuery](https://docs.carto.com/analytics-toolbox-bigquery/overview/getting-started/) implementation.



```python
query_string_air = \
f"""
WITH
  h3_airbnb AS (
  SELECT
    `carto-un`.carto.H3_FROMGEOGPOINT(geom,
      8) AS h3,
      *
  FROM
    shared.01_listings_la_2021_5_reviews),
  aggregated_h3 AS (
  SELECT
    h3,
    ROUND(AVG(price_num), 2) price,
    ROUND(AVG(review_scores_rating), 2) overall_rating,
    ROUND(AVG(review_scores_value), 2) value_vs_price_rating,
    ROUND(AVG(review_scores_cleanliness), 2) cleanliness_rating,
    ROUND(AVG(review_scores_location), 2) location_rating,
    COUNT(*) AS total_listings
  FROM
    h3_airbnb
  GROUP BY
    h3
	HAVING COUNT(*) > 3)
SELECT
  * 
FROM
  aggregated_h3
"""

gdf_air = carto_dw_client.query(query_string_air).result().to_dataframe()
gdf_air['overall_rating'] = gdf_air['overall_rating'].astype('float')
gdf_air['value_vs_price_rating'] = gdf_air['value_vs_price_rating'].astype('float')
gdf_air['cleanliness_rating'] = gdf_air['cleanliness_rating'].astype('float')
gdf_air['location_rating'] = gdf_air['location_rating'].astype('float')
gdf_air.head()
```



    
![png](/img/carto-python/carto-dw-notebook/output_15_1.png)
    



### Uploading the result of our analysis as a new table in our data warehouse

Once you have the desired result, you might want to store it as a new table in your CARTO Data Warehouse. 


```python
carto_dw_client.load_table_from_dataframe(gdf_air, "carto-dw-ac-jfjjof5m.shared.listings_from_notebook").result()
```




```python
query = \
f"""
SELECT *
FROM `carto-dw-ac-jfjjof5m.shared.listings_from_notebook`
"""

gdf_test = carto_dw_client.query(query).result().to_dataframe()
gdf_test.head()
```



    
![png](/img/carto-python/carto-dw-notebook/output_18_1.png)
    


### Visualize your data in a map
Using pydeck-carto, you can visualize your spatial data in a map at any step of your data science workflow, natively from your data warehouse.


```python
# Register CartoLayer in pydeck
register_carto_layer()

# Render CartoLayer in pydeck with color_bins style
layer = pdk.Layer(
    "CartoLayer",
    data="SELECT h3, total_listings FROM `shared.listings_from_notebook`",
    type_=MapType.QUERY,
    connection=CartoConnection.CARTO_DW,
    credentials=get_layer_credentials(carto_auth),
    aggregation_exp=pdk.types.String("sum(total_listings) as total_listings"),
    aggregation_res_level=5,
    geo_column=pdk.types.String("h3"),
    get_fill_color=color_bins("total_listings",[0, 5, 10, 15, 20, 25], "PinkYl"),
    get_line_color=[0, 0, 0, 100],
    line_width_min_pixels=0.5,
    stroked=True,
    extruded=False,
    pickable=True
)

tooltip = {
    "html": "Listing: <b>{total_listings}</b>",
    "style": {"background": "grey", "color": "white", "font-family": '"Helvetica Neue", Arial', "z-index": "10000"},
}

view_state = pdk.ViewState(latitude=34.5, longitude=-118, zoom=8)
pdk.Deck(layer, map_style=pdk.map_styles.ROAD, initial_view_state=view_state)
```

![png](/img/carto-python/carto-dw-notebook/cartodw_map.png)