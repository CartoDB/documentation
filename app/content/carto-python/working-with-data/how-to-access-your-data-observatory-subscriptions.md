---
aliases:
    - /carto-python/working-with-data/how-to-access-your-data-observatory-subscriptions
---

## How to access your Data Observatory subscriptions from a Python notebook

This guide showcases how to access the data from your Data Observatory subscriptions available in your CARTO Data Warehouse by using the Analytics Toolbox from a Python notebook. You can find the original notebook [here](https://colab.research.google.com/drive/1_yabVJq7WrPu5pLMlUU3tKaDQ88z00e9?usp=sharing).

To learn more about how to explore and subscribe to data from our Data Observatory, please check [our documentation](https://docs.carto.com/data-observatory/overview/getting-started/).

We first authenticate to the CARTO account so to be able to access the CARTO Data Warehouse resources with the `carto_auth` library, and then we use the Python client to explore your Data Observatory subscriptions and select variables of our interest. Finally, we perform an enrichment of a sample dataset with one of our subscriptions.


```python
!pip install carto_auth[carto-dw] pydeck pydeck-carto -q
```

### Authentication to CARTO
We start by using the `carto_auth` package to authenticate to our CARTO account and to get the necessary details to interact with data available in the CARTO Data Warehouse. Note that the CARTO Data Warehouse is based on Google BigQuery, so we will be using that platform for storing and computing on the data. This also means that we will be levarging the implementation of the [Analytics Toolbox for BigQuery](https://docs.carto.com/analytics-toolbox-bigquery/overview/getting-started/).


```python
import pydeck as pdk
import pydeck_carto as pdkc
from carto_auth import CartoAuth
```


```python
# Authentication with CARTO
carto_auth = CartoAuth.from_oauth()
# CARTO Data Warehouse client
carto_dw_client = carto_auth.get_carto_dw_client()
```


### Listing our Data Observatory subscriptions and exploring their metadata
We first retrieve a list of all our subscriptions as a pandas dataframe in order to explore what datasets from the Data Observatory we have available.
For more details about how to use the following SQL functions, please refer to the [Analytics Toolbox documentation](https://docs.carto.com/analytics-toolbox-bigquery/sql-reference/data/#dataobs_subscriptions).

To understand how the Data Observatory structures the datasets, we recommend you to read the [Terminology section](https://docs.carto.com/data-observatory/overview/terminology/) of the Data Observatory documentation.


```python
datasets = list(carto_dw_client.list_datasets())

if datasets:
    print("Datasets in CARTO Data Warehouse:")
    for dataset in datasets:
        print("\t{}".format(dataset.dataset_id))
else:
    print("CARTO Data Warehouse project does not contain any datasets.")
```



```python
cdw_dataset = "carto-data.ac_7xhfwyml" # detail here your own cdw_dataset. This consists of your Google Cloud project_id followed by the BigQuery dataset where your subscriptions are stored: "{project_id}.{bigquery_dataset_id}"
get_subscriptions_q = \
f"""
CALL `carto-un`.carto.DATAOBS_SUBSCRIPTIONS('{cdw_dataset}',"dataset_license = 'Public data'");
"""
```


```python
subs_df = carto_dw_client.query(get_subscriptions_q).result().to_dataframe()
subs_df.sample(5)

```



![png](/img/carto-python/do-notebook/output_8_0.png)



Let's take a look at what subscriptions we have that are specifically for the "United States".


```python
subs_df.query("dataset_country == 'United States of America'").tail(5)
```



![png](/img/carto-python/do-notebook/output_10_0.png)



After exploring all the available datasets and their metadata, we decide to pick for this example the "Population" dataset from Worldpop and explore what variables it contains. For that we use the `dataset_slug`.


```python
get_dataset_variables = \
f"""
CALL `carto-un`.carto.DATAOBS_SUBSCRIPTION_VARIABLES(
    "{cdw_dataset}",
    "dataset_slug = 'wp_population_704f6b75'"
    );
"""

```


```python
vars_df = carto_dw_client.query(get_dataset_variables).result().to_dataframe()
vars_df
```



![png](/img/carto-python/do-notebook/output_13_0.png)



### Accessing and exporting data from a Data Observatory subscription

Once we have explored the available variables, and we know what we want to do with the data; we can use the Python client for the CARTO Data Warehouse connection and use any available function from the Analytics Toolbox.
Additionally, we can export the data to geodataframe or event into local files in csv or parquet for example.

In this example, we will retrieve the `population` variable for a 10 km buffer around Atlanta.

We will need the IDs of both data tables and geography tables of the specific subscription we want to work with.


```python
dataset_id, geography_id = subs_df.query("dataset_slug == 'wp_population_704f6b75'")[["dataset_table", "associated_geography_table"]].values.ravel()
dataset_id, geography_id
```



```python
usa_pop_q = \
f"""
WITH whole_usa AS (
SELECT population, geom
FROM `{cdw_dataset}.{dataset_id}` d
JOIN `{cdw_dataset}.{geography_id}` g
ON d.geoid = g.geoid
)
SELECT * FROM whole_usa
WHERE ST_INTERSECTS(geom, ST_BUFFER(ST_GEOGPOINT(-84.387655, 33.760213), 10000))
"""
```


```python
atlanta_df = carto_dw_client.query(usa_pop_q).result().to_dataframe()
atlanta_df.sample(5)
```



![png](/img/carto-python/do-notebook/output_17_0.png)



Now that we have our data of interest in a dataframe, we can also save it in our local machine in several formats.


```python
atlanta_df.to_csv("atlanta_df.csv")
```


```python
atlanta_df.to_parquet("atlanta_df.parquet")
```

### Enriching data with a Data Observatory subscription

The `retail_stores` is a dataset with information about revenue and size of retail stores in USA which can be found by default as demo data in your CARTO Data Warehouse. We are going to enrich this table with the population variable from the previous example (slug_id: `population_e3a78133`), based on the population reported by Worldpop in the location of each retail store.

We define an output table where the enriched data will be placed, also within the CARTO Data Warehouse. Later we use the pydeck-carto package to visualize the results, rendering directly from the table in the data warehouse.

To learn more about the Data Enrichment functions please check the relevant section of the [SQL Reference](https://docs.carto.com/analytics-toolbox-bigquery/sql-reference/data/) of the Analytics Toolbox. There is also additional information about the Enrichment workflow with the Analytivccs Toolbox


```python
output_table_id = 'carto-dw-ac-7xhfwyml.shared.retail_stores_enriched'
enrich_q = \
f"""
CALL `carto-un`.carto.DATAOBS_ENRICH_POINTS(
   R'''
   SELECT cartodb_id, revenue, geom FROM `carto-demo-data.demo_tables.retail_stores`
   ''',
   'geom',
   [('population_e3a78133', 'sum')],
   NULL,
   ['{output_table_id}'],
   '{cdw_dataset}'
);
"""
carto_dw_client.delete_table(output_table_id, not_found_ok = True)
carto_dw_client.query(enrich_q).result()
```




```python
carto_dw_client.query(f"SELECT * FROM `{output_table_id}` WHERE population_e3a78133_sum > 0  LIMIT 10").result().to_dataframe()
```



![png](/img/carto-python/do-notebook/output_24_0.png)




```python
# Register CartoLayer in pydeck
pdkc.register_carto_layer()
credentials = pdkc.get_layer_credentials(carto_auth)

enriched_layer = pdk.Layer(
    "CartoLayer",
    data = "SELECT * FROM `carto-dw-ac-7xhfwyml.shared.retail_stores_enriched`",
    geo_column=pdk.types.String("geom"),
    type_=pdkc.MapType.QUERY,
    connection=pdkc.CartoConnection.CARTO_DW,
    credentials=credentials,
    opacity=0.2,
    pickable=True,
    stroked=True,
    point_radius_min_pixels=2,
    get_fill_color=pdkc.styles.color_continuous("population_e3a78133_sum", [x*100 for x in range(10)], colors = "Tropic")
    )

tooltip = {
    "html": "Population: <b>{population_e3a78133_sum}</b> - Revenue <b>{revenue}</b>",
    "style": {"background": "grey", "color": "white", "font-family": '"Helvetica Neue", Arial', "z-index": "10000"},
}

view_state = pdk.ViewState(latitude=33.64, longitude=-117.94, zoom=4)
r = pdk.Deck(
    [enriched_layer],
    tooltip = tooltip,
    initial_view_state=view_state,
    map_style=pdk.map_styles.LIGHT,
)
r.to_html(iframe_height = 400)
```

![png](/img/carto-python/do-notebook/do_map.png)