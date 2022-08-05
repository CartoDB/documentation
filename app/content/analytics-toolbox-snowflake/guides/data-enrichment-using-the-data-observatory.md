## Data enrichment using the Data Observatory

In this guide you will learn how to perform data enrichment using Data Observatory data and the Analytics Toolbox.
In this guide you will learn how to perform data enrichment using Data Observatory data and the Analytics Toolbox from your Snowflake console. To use the Enrichment UI available in the Data Explorer, please refer to [this guide](https://docs.carto.com/carto-user-manual/data-explorer/enriching-data/).

### 1. Create a connection with Snowflake in the CARTO Workspace

1. Sign into your CARTO Workspace. If you still don't have an account, you can sign-up [here](https://carto.com/signup) for a 14-day trial.
2. Navigate to the Connections section.
3. Create a new connection with Snowflake.

For more details, please refer to the [documentation](https://docs.carto.com/carto-user-manual/connections/creating-a-connection/#connection-to-snowflake).


### 2. Subscribe to the Data Observatory datasets

1. Navigate to the Data Observatory section of the CARTO Workspace.
2. Using the Spatial Data Catalog, subscribe to the following datasets. You can find these datasets by using the search bar or the filter column on the left of the screen: 
   * *Spatial Features - Spain (H3 Resolution 8)* from CARTO.
   * *Census Sections (Spain), with displaced Canary Islands (2020)* from CARTO.

<div style="text-align:center" >
<img src="/img/sf-analytics-toolbox/guides/enrichment_sf_guide_create_public_subscriptions.png" alt="Create Data Observatory subscriptions" style="width:100%">
</div>

<!-- <div style="text-align:center" >
<img src="/img/sf-analytics-toolbox/guides/enrichment_sf_guide_create_subscriptions.png" alt="Create Data Observatory subscriptions" style="width:100%">
</div> -->

3. In order for you to access any of your Data Observatory subscriptions from Snowflake, the data first needs to be imported into your database. This import process is performed by our engineering team on a request basis.

<div style="text-align:center" >
<img src="/img/sf-analytics-toolbox/guides/enrichment_sf_guide_create_request_public_subscriptions.png" alt="Create Data Observatory subscriptions" style="width:100%">
</div>

3. Navigate to the Data Explorer and expand the Data Observatory section. Choose any of the your data subscriptions and click on the "Access in" button on the top right of the page. Copy the Snowflake project and dataset from any of the table locations that you see on the screen.

<div style="text-align:center" >
<img src="/img/sf-analytics-toolbox/guides/enrichment_sf_guide_access_in.png" alt="Find the location of your Data Observatory subscriptions" style="width:100%">
</div>

<!-- <div style="text-align:center" >
<img src="/img/bq-analytics-toolbox/guides/enrichment_guide_access_in.png" alt="Find the location of your Data Observatory subscriptions" style="width:100%">
</div> -->

4. Confirm that you can see all of your data subscriptions by running the command below, which makes use of the [`DATAOBS_SUBSCRIPTIONS`](https://docs.carto.com/analytics-toolbox-snowflake/sql-reference/data/#dataobs_subscriptions) procedure. **Please replace the Snowflake database and schema with those you copied in the previous step.**

```sql
USE DATABASE <ANALYTICS_TOOLBOX_DB>;
CALL carto.DATAOBS_SUBSCRIPTIONS('carto_dev_data.carto','');
-- CALL carto.DATAOBS_SUBSCRIPTIONS('MY_DATAOBS_DB.MY_DATAOBS_SCHEMA', '');
```
<div style="text-align:center" >
<img src="/img/sf-analytics-toolbox/guides/enrichment_sf_guide_dataobs_subscriptions.png" alt="Check your Data Observatory subscriptions in BigQuery" style="width:100%">
</div>

![enrichment_sf_subscriptions](/img/sf-analytics-toolbox/guides/enrichment_sf_guide_dataobs_subscriptions_details.png)

<!-- <div style="text-align:center" >
<img src="/img/bq-analytics-toolbox/guides/enrichment_guide_dataobs_subscriptions.png" alt="Check your Data Observatory subscriptions in BigQuery" style="width:100%">
</div> -->

### 3. Choose variables for the enrichment
We can list all the variables (data columns) available in our Data Observatory subscriptions by running the following query, which makes use of the [`DATAOBS_SUBSCRIPTION_VARIABLES`](../../sql-reference/data/#dataobs_subscription_variables) procedure. **Please remember to replace the Snowflake database and schema with those you used in the previous command.**

```sql
USE DATABASE <ANALYTICS_TOOLBOX_DB>;
CALL carto.DATAOBS_SUBSCRIPTION_VARIABLES('carto_dev_data.carto','');
-- CALL carto.DATAOBS_SUBSCRIPTION_VARIABLES('MY_DATAOBS_DB.MY_DATAOBS_SCHEMA', '');
```

<div style="text-align:center" >
<img src="/img/sf-analytics-toolbox/guides/enrichment_sf_guide_dataobs_variables.png" alt="Select the Data Observatory variables for enrichment in BigQuery" style="width:100%">
</div>

![enrichment_sf_subscription_variables](/img/sf-analytics-toolbox/guides/enrichment_sf_guide_dataobs_subscription_variables.png)

<!-- <div style="text-align:center" >
<img src="/img/bq-analytics-toolbox/guides/enrichment_guide_dataobs_variables.png" alt="Select the Data Observatory variables for enrichment in BigQuery" style="width:100%">
</div> -->

In this particular example we are going to enrich our data with the following variables. Please note that these variables are uniquely identified by their `variable_slug`.
* `population_23c282a0`, `retail_dba575bc`,`elevation_65d16a8a` and `tavg_jan_de4f1914`: these variables are from [CARTO](https://carto.com/spatial-data-catalog/browser/dataset/cdb_spatial_fea_a07a4ca5) for Belgium. As we can see in the `variable_description` column, they represent the total population, their female and male population, their average age and their average rent, respectively.
<!-- * `name_c0d0f60f`. This variable is from the [PC 4-digit - Belgium](https://carto.com/spatial-data-catalog/browser/geography/mbi_pc_4_digit_d11546d7/data) for Belgium.  -->

### 4. Run the enrichment

The enrichment is performed using the [`DATAOBS_ENRICH_POINTS`](../../sql-reference/data/#dataobs_enrich_points) procedure of the Analytics Toolbox. Please note that this particular procedure makes use of spatial indexes and does not require the input data to have a geometry column. 

The following inputs are needed:
* The input table to be enriched.
* The list of variables to be used for the enrichment and their aggregation method. As explained earlier, these variables are identified using their `variable_slug`. For more information about the aggregation methods, please refer to the [documentation](https://docs.carto.com/analytics-toolbox-snowflake/sql-reference/data/#dataobs_enrich_points).
* Name of the output table where the result of the enrichment will be stored. 
* Location of your Data Observatory subscriptions. This is the same `database.schema` we used to run the `DATAOBS_SUBSCRIPTIONS` and `DATAOBS_SUBSCRIPTION_VARIABLES` in previous steps of this guide.

```sql
USE DATABASE <ANALYTICS_TOOLBOX_DB>;
CALL carto.DATAOBS_ENRICH_POINTS
('MY_DATAOBS_DB.MY_DATAOBS_SCHEMA.BEL_PC4DIGIT_2021', 'GEOM', 
 ARRAY_CONSTRUCT(
  OBJECT_CONSTRUCT('variable', 'population_23c282a0', 'aggregation', 'SUM'),
  OBJECT_CONSTRUCT('variable', 'retail_dba575bc', 'aggregation', 'SUM'),
  OBJECT_CONSTRUCT('variable', 'elevation_65d16a8a', 'aggregation', 'AVG'),
  OBJECT_CONSTRUCT('variable', 'tavg_jan_de4f1914', 'aggregation', 'AVG'),
  OBJECT_CONSTRUCT('variable', 'name_c0d0f60f', 'aggregation', 'ANY')), 
 NULL, 
 TO_ARRAY('MY_DATAOBS_DB.MY_DATAOBS_SCHEMA.BEL_PC4DIGIT_2021_ENRICHED'), 
 'MY_DATAOBS_DB.MY_DATAOBS_SCHEMA');
-- The table `BEL_PC4DIGIT_2021_ENRICHED` will be created
```

<div style="text-align:center" >
<img src="/img/sf-analytics-toolbox/guides/enrichment_sf_guide_result.png" alt="Preview of the enrichment result" style="width:100%">
</div>

<!-- <div style="text-align:center" >
<img src="/img/bq-analytics-toolbox/guides/enrichment_guide_result.png" alt="Preview of the enrichment result" style="width:100%">
</div> -->

### 5. Analyze the enrichment result

The table resulting from running the previous query,`BEL_PC4DIGIT_2021_ENRICHED`, will include all the columns of the input table plus four additional columns, containing the value of each enrichment variable in each polygon. As shown below, the enrichment result can be analyzed with the help of a map and a set of interactive widgets created using Builder, our map making tool available from the CARTO Workspace. 

<iframe height=800px width=100% style='margin-bottom:20px' src="https://gcp-us-east1.app.carto.com/map/87557c15-2e11-4038-b084-fd096aa9aa12" title="Enrichment of Snowflake"></iframe>

To get started creating maps, we recommend the following resources from the documentation:
* [Guide to create your first map](https://docs.carto.com/carto-user-manual/overview/getting-started/#quickstart-guide-to-create-your-first-map).
* [Guide to add widgets to a map](https://docs.carto.com/carto-user-manual/maps/map-settings/#widgets).
* [Step-by-step tutorial](https://docs.carto.com/carto-user-manual/tutorials/build-a-categories-and-bubbles-visualization/) to create a category and bubbles visualization, leveraging different map styles and widgets.

{{% euFlagFunding %}}
