---
aliases:
    - /carto-python/working-with-data/how-to-use-the-analytics-toolbox-for-bigquery
---

## How to access CARTO's Analytics Toolbox for BigQuery and create visualizations via Python notebooks

This notebook guides the user through the process for connecting to CARTO account and leverage CARTO's Analytics Toolbox and CARTO's integration with Pydeck to be able to perform spatial analytics at scale and create map visualizations from Python notebooks. You can find the original notebook [here](https://colab.research.google.com/drive/1rGrXgKuFdtKN_wnpz1jtlzFPyed-V1Ry?usp=sharing).

The outline of this notebooks is as follows:

*   Authentication with BigQuery to access to our data and CARTO's Analytics Toolbox functions and to be able to use 'CartoLayer' in Pydeck
*   Opeartions and anlysis using BigQuery's SQL Client for Python
*   Map visualizations with CARTO and Pydeck


### Install all necessary libraries
Please run the following commands to install pydeck-carto and all other required libraries.


```python
!pip install pydeck-carto geopandas db_dtypes -q 
```

    [K     |████████████████████████████████| 1.0 MB 7.1 MB/s 
    [K     |████████████████████████████████| 206 kB 78.4 MB/s 
    [K     |████████████████████████████████| 47 kB 5.2 MB/s 
    [K     |████████████████████████████████| 77 kB 5.8 MB/s 
    [K     |████████████████████████████████| 1.0 MB 61.4 MB/s 
    [K     |████████████████████████████████| 4.7 MB 41.9 MB/s 
    [K     |████████████████████████████████| 6.3 MB 75.5 MB/s 
    [K     |████████████████████████████████| 16.7 MB 362 kB/s 

</br>

```python
import pydeck as pdk
import geopandas as gpd
import pandas as pd
import google.cloud.bigquery as bigquery
from pydeck_carto import register_carto_layer, get_layer_credentials
from pydeck_carto.layer import MapType, CartoConnection
from pydeck_carto.styles import color_bins
from carto_auth import CartoAuth
from google.colab import auth
```

### Authenticate to CARTO and BigQuery

In this step, we use the carto_auth package to authenticate to our CARTO account. We want to be authenticate to our Google account too so we can connect to our projects in Google BigQuery and be able to operate with our data tables using BigQuery's SQL Client for Python notebooks.



```python
#carto autentication
carto_auth = CartoAuth.from_oauth()
```




```python
from google.colab import auth
auth.authenticate_user()
print('Authenticated')
```


After that, we need to set the BigQuery project to future api calls.


```python
bq_client = bigquery.Client(project='bqcartodemos')
```

And then, we can already list datasets, data objects, and even read tables by passing the "table id". In short, we can work with the entire [BigQuery client](https://cloud.google.com/bigquery/docs/reference/libraries). 
In this example, we list all tables contained in a specific BigQuery dataset.


```python
dataset_id = 'bqcartodemos.sample_tables'
tables = list(bq_client.list_tables(dataset_id) ) # Make an API request.

print("Tables contained in '{}':".format(dataset_id))
for table in tables:
    print("{}.{}.{}".format(table.project, table.dataset_id, table.table_id))
```


And we can also show the properties from a table.


```python
# Set table_id to the ID of the table model to fetch.
table_id = 'bqcartodemos.sample_tables.01_listings_la_2021_5_reviews'

# Make an API request.
table = bq_client.get_table(table_id)  

# View table properties
print(f"Got table {table_id}.")
print(f"Table schema: {table.schema}")
print(f"Table description: {table.description}")
print(f"Table has {table.num_rows} rows")
```


### Load data from BigQuery into a dataframe

Next, you can also load data available in BigQuery into a geodataframe in Python.


```python
# Load table
table = bq_client.get_table("bqcartodemos.sample_tables.01_listings_la_2021_5_reviews")
gdf = bq_client.list_rows(table).to_geodataframe()
#formating
gdf['review_scores_cleanliness'] = gdf['review_scores_cleanliness'].astype('float')
gdf['review_scores_location'] = gdf['review_scores_location'].astype('float')
gdf['review_scores_value'] = gdf['review_scores_value'].astype('float')
gdf['review_scores_rating'] = gdf['review_scores_rating'].astype('float')
pd.set_option('display.precision', 2)
# Table preview
gdf.head()
```



    
![png](/img/carto-python/bq-notebook/output_14_1.png)
    


### Use Analytics Toolbox functions

CARTO's Analytics Toolbox is a suite of functions and procedures that run natively in SQL within the different supported data warehouse. This means, that the user can run functions from the Analytics Toolbox using the BigQuery SQL Client.

To be able to access the Analytics Toolbox here, you will need to first connect your BigQuery account to CARTO in the Connections section of the CARTO Workspace.


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
    bqcartodemos.sample_tables.01_listings_la_2021_5_reviews),
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

gdf_air = bq_client.query(query_string_air).result().to_dataframe()
gdf_air['overall_rating'] = gdf_air['overall_rating'].astype('float')
gdf_air['value_vs_price_rating'] = gdf_air['value_vs_price_rating'].astype('float')
gdf_air['cleanliness_rating'] = gdf_air['cleanliness_rating'].astype('float')
gdf_air['location_rating'] = gdf_air['location_rating'].astype('float')
gdf_air.head()
```



    
![png](/img/carto-python/bq-notebook/output_17_1.png)
    


### Write a result in a new table on BigQuery
Once you have the desired result, you might want to store it in a new table in your BigQuery account. Let's see how to do it. 


```python
bq_client.load_table_from_dataframe(gdf_air, "sample_tables.listings_from_notebook").result()
```



```python
query = \
f"""
SELECT *
FROM `bqcartodemos.sample_tables.listings_from_notebook`
"""

gdf_test = bq_client.query(query).result().to_dataframe()
gdf_test.head()
```



    
![png](/img/carto-python/bq-notebook/output_20_1.png)
    


### Plot your data in a map
Using pydeck_carto, you can visualize your data in a map when you are working on it, doing analysis and so on as a part of your Data Science Workflow.


```python
# Register CartoLayer in pydeck
register_carto_layer()

# Render CartoLayer in pydeck with color_bins style
layer = pdk.Layer(
    "CartoLayer",
    data="SELECT h3, total_listings FROM `bqcartodemos.sample_tables.listings_from_notebook`",
    type_=MapType.QUERY,
    connection=pdk.types.String("ds-connection"), #Use the name of your connection in Carto platform
    credentials=get_layer_credentials(carto_auth),
    aggregation_exp=pdk.types.String("sum(total_listings) as total_listings"),
    aggregation_res_level=5,
    geo_column=pdk.types.String("h3"),
    get_fill_color=color_bins("total_listings",[0, 5, 10, 15, 20, 25], "PinkYl"),
    get_line_color=[0, 0, 0, 100],
    line_width_min_pixels=0.5,
    stroked=True,
    extruded=False,
    pickable=True,
    on_data_error=get_error_notifier()
)

tooltip = {
    "html": "Listing: <b>{total_listings}</b>",
    "style": {"background": "grey", "color": "white", "font-family": '"Helvetica Neue", Arial', "z-index": "10000"},
}

view_state = pdk.ViewState(latitude=34.5, longitude=-118, zoom=8)
pdk.Deck(layer, map_style=pdk.map_styles.ROAD, initial_view_state=view_state)
```
![png](/img/carto-python/bq-notebook/bq_map.png)
