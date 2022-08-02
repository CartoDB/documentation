## Data enrichment using the Data Observatory

In this guide you will learn how to perform data enrichment using Data Observatory data and the Analytics Toolbox. You can also access and run this guide using [this Google Colab notebook](https://colab.research.google.com/drive/1tpJlOlGIeAmQBQumXlr1nrTcPqbDyoEf).

### 1. Create a connection with BigQuery in the CARTO Workspace

1. Sign into your CARTO Workspace. If you still don't have an account, you can sign-up [here](https://carto.com/signup) for a 14-day trial.
2. Navigate to the Connections section.
3. Create a new connection with BigQuery. You may choose the Service Account (SA) or the "Sign in with Google" options depending on where you are planning to run your queries:
    * If you are going to use the BigQuery console, please use the "Sign in with Google" option. 
    * If you are going to use a BigQuery client instead (a Python notebook for instance), please use the SA option and make sure you use that same SA to authenticate in the client.

For more details, please refer to the [documentation](https://docs.carto.com/carto-user-manual/connections/creating-a-connection/#connection-to-bigquery).


### 2. Subscribe to the Data Observatory datasets

1. Navigate to the Data Observatory section of the CARTO Workspace.
2. Using the Spatial Data Catalog, subscribe to the following datasets, both available for free. You can find these datasets by using the search bar or the filter column on the left of the screen: 
   * *Sociodemographics - United States of America (Census Block Group, 2018, 5yrs)* from American Community Survey.
   * *Nodes - United States of America (Latitude/Longitude)* from OpenStreetMap.

<div style="text-align:center" >
<img src="/img/bq-analytics-toolbox/guides/enrichment_guide_create_subscriptions.png" alt="Create Data Observatory subscriptions" style="width:100%">
</div>

3. Navigate to the Data Explorer and expand the Data Observatory section. Choose any of the your data subscriptions and click on the "Access in" button on the top right of the page. Copy the BigQuery project and dataset from any of the table locations that you see on the screen.

<div style="text-align:center" >
<img src="/img/bq-analytics-toolbox/guides/the_enrichment_guide_access_in.png" alt="Find the location of your Data Observatory subscriptions" style="width:100%">
</div>

<!-- <div style="text-align:center" >
<img src="/img/bq-analytics-toolbox/guides/enrichment_guide_access_in.png" alt="Find the location of your Data Observatory subscriptions" style="width:100%">
</div> -->

4. Confirm that you can see all of your data subscriptions by running the command below, which makes use of the [`DATAOBS_SUBSCRIPTIONS`](https://docs.carto.com/analytics-toolbox-bigquery/sql-reference/data/#dataobs_subscriptions) procedure. **Please replace the BigQuery project and dataset with those you copied in the previous step.**

```sql
CALL `carto-un`.carto.DATAOBS_SUBSCRIPTIONS('carto-data.ac_lqe3zwgu','');
```

<div style="text-align:center" >
<img src="/img/bq-analytics-toolbox/guides/enrichment_guide_dataobs_subscriptions.png" alt="Check your Data Observatory subscriptions in BigQuery" style="width:100%">
</div>

### 3. Choose variables for the enrichment
We can list all the variables (data columns) available in our Data Observatory subscriptions by running the following query, which makes use of the [`DATAOBS_SUBSCRIPTION_VARIABLES`](../../sql-reference/data/#dataobs_subscription_variables) procedure. **Please remember to replace the BigQuery project and dataset with those you used in the previous command.**

```sql
CALL `carto-un`.carto.DATAOBS_SUBSCRIPTION_VARIABLES('carto-data.ac_lqe3zwgu','');
```

<div style="text-align:center" >
<img src="/img/bq-analytics-toolbox/guides/enrichment_guide_dataobs_variables.png" alt="Select the Data Observatory variables for enrichment in BigQuery" style="width:100%">
</div>

In this particular example we are going to enrich our data with the following variables. Please note that these variables are uniquely identified by their `variable_slug`.
* `total_pop_3409f36f`, `median_age_e4b1c48c` and `income_per_capi_bfb55c80`: these variables are from the [ACS Sociodemographics dataset](https://carto.com/spatial-data-catalog/browser/dataset/acs_sociodemogr_95c726f9/) for the US, at Census Block Group level (2018). As we can see in the `variable_description` column, they represent the total population, their median age and their per capita income in the past 12 months, respectively.
* `shop_eede86ac`. This variable is from the [POIs dataset of OpenStreetMap](https://carto.com/spatial-data-catalog/browser/dataset/osm_nodes_74461e34) for the US. When the POI is a shop, this variable contains the specific shop category, e.g. "supermarket". It is NULL otherwise. 


### 4. Run the enrichment

We are going to enrich an H3 grid of resolution 6 of the city of New York with the four Data Observatory variables chosen in the previous step. The data table is publicly available at `cartobq.docs.nyc_boundary_h3z6` and it was created by leveraging the [H3 polyfill function](https://docs.carto.com/analytics-toolbox-bigquery/sql-reference/h3/#h3_polyfill) of the Analytics Toolbox, through the following query:

```sql
CREATE TABLE `cartobq.docs.nyc_boundary_h3z6` as
SELECT h3id FROM unnest(`carto-un`.carto.H3_POLYFILL(
(SELECT urban_area_geom
FROM `bigquery-public-data.geo_us_boundaries.urban_areas`
WHERE name like "New York%"), 6)) h3id
```


The enrichment is performed using the [`DATAOBS_ENRICH_GRID`](../../sql-reference/data/#dataobs_enrich_grid) procedure of the Analytics Toolbox. Please note that this particular procedure makes use of spatial indexes and does not require the input data to have a geometry column. 

The following inputs are needed:
* The type of spatial index used, H3 in our case.
* The input query to be enriched.
* The name of the column containing valid H3 indexes.
* The list of variables to be used for the enrichment and their aggregation method. As explained earlier, these variables are identified using their `variable_slug`. For more information about the aggregation methods, please refer to the [documentation](https://docs.carto.com/analytics-toolbox-bigquery/sql-reference/data/#dataobs_enrich_grid).
* Name of the utput table where the result of the enrichment will be stored. 
* Location of your Data Observatory subscriptions. This is the same `project.dataset` we used to run the `DATAOBS_SUBSCRIPTIONS` and `DATAOBS_SUBSCRIPTION_VARIABLES` in previous steps of this guide.

```sql
CALL `carto-un`.carto.DATAOBS_ENRICH_GRID
('h3', 
R'''
SELECT * from `cartobq.docs.nyc_boundary_h3z6`
''', 
'h3id', 
[('total_pop_3409f36f','sum'),('median_age_e4b1c48c','avg'),('income_per_capi_bfb55c80','avg'),('shop_eede86ac','count')], 
NULL, 
['cartobq.docs.nyc_boundary_h3z6_enriched'],
'carto-data.ac_lqe3zwgu')
```

<div style="text-align:center" >
<img src="/img/bq-analytics-toolbox/guides/enrichment_guide_result.png" alt="Preview of the enrichment result" style="width:100%">
</div>


### 5. Analyze the enrichment result

The table resulting from running the previous query, publicly available at `cartobq.docs.nyc_boundary_h3z6_enriched`, will include all the columns of the input query plus four additional columns, containing the value of each enrichment variable in each H3 cell. As shown below, the enrichment result can be analyzed with the help of a map and a set of interactive widgets created using Builder, our map making tool available from the CARTO Workspace. 

<iframe height=800px width=100% style='margin-bottom:20px' src="https://gcp-us-east1.app.carto.com/map/92c0a1ed-31cf-47cb-acd8-9485c9f21194" title="Enrichment of an H3 grid of resolution 6 with sociodemographics and POIs data"></iframe>

To get started creating maps, we recommend the following resources from the documentation:
* [Guide to create your first map](https://docs.carto.com/carto-user-manual/overview/getting-started/#quickstart-guide-to-create-your-first-map).
* [Guide to add widgets to a map](https://docs.carto.com/carto-user-manual/maps/map-settings/#widgets).
* [Step-by-step tutorial](https://docs.carto.com/carto-user-manual/tutorials/build-a-categories-and-bubbles-visualization/) to create a category and bubbles visualization, leveraging different map styles and widgets.

{{% euFlagFunding %}}
