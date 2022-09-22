---
title: "Generating trade areas based on drive/walk-time isolines"
description: "We generate trade areas based on drive/walk-time isolines from BigQuery console and from CARTO Builder."
image: "/img/bq-analytics-toolbox/examples/isolines.png"
type: examples
date: "2022-09-20"
categories:
    - LDS
---
## Generating trade areas based on drive/walk-time isolines


In this example, we will create isolines around some Starbucks locations in order to estimate their trade areas based on drive-time areas around them. 

This process will generate a new table with the columns of the input table (except the column with the point geometry) plus a new column with the isoline polygon (__iso_geom column). 


{{% bannerNote type="warning" title="warning"%}}
This function consumes isolines quota. Each call consumes as many units of quota as the number of rows your input table or query has. Before running, we recommend checking the size of the data to be geocoded and your available quota using the [LDS_QUOTA_INFO()](https://docs.carto.com/analytics-toolbox-bigquery/sql-reference/lds/#lds_quota_info) function.
{{%/ bannerNote %}}


### Create isolines from the BigQuery console

As a module within CARTO’s Analytics Toolbox, the location data services ([lds](https://docs.carto.com/analytics-toolbox-bigquery/sql-reference/lds/#lds)) capabilities are available as SQL procedures that can be executed directly from your BigQuery console or client of choice after connecting your BigQuery project with your CARTO account. 
To check whether your Google account or Service Account has access to the LDS module, please execute this query:


```sql
SELECT `carto-un`.carto.VERSION_ADVANCED()
--Use `carto-un-eu`.carto.VERSION_ADVANCED() if your data is in GCP's EU multi-region
```



The lds module is generally available in the Analytics Toolbox since the “July 26, 2022” version. Please check the [Getting Access](https://docs.carto.com/analytics-toolbox-bigquery/overview/getting-access/) section if you run into any errors when running the query above.

For this example we will use a table with the Starbucks addresses geocoded that can be found in the publicly available `bqcartodemos.sample_tables.starbucks_ny_geocode` . The table contains information about Starbucks stores and a column called ‘geom’ with the geographic coordinates (latitude and longitude) of each location. Around these locations we will create isolines based on 15 minutes walking.  


<div style="text-align:center" >
<img src="/img/bq-analytics-toolbox/examples/bq_console_geocode_output_table.png" alt="Isolines input table in BQ console" style="width:100%">
</div>



In order to create the isolines, we will execute the [CREATE_ISOLINES()](https://docs.carto.com/analytics-toolbox-bigquery/sql-reference/lds/#create_isolines) procedure with the following SQL query: 


```sql
CALL `carto-un`.carto.CREATE_ISOLINES(
   'bqcartodemos.sample_tables.starbucks_ny_geocode',
   'bqcartodemos.sample_tables.starbucks_ny_geocoded_iso_walk_time900',
   'geom',
   'walk', 900, 'time',
   '<api_base_url>', '<lds_token>');
```



In the query we specify (in this order) the input table, the output table and "geom" as column name for the origin geometry column. We add that we want to calculate the isolines based on 15 minutes walking, fixing "mode" parameter on "walk" and "range_value" parameter on 900 seconds (15 min). Also you need to provide us the API base url where your account is stored in "api_base_url" and your token for accessing the different API services in "lds_token" parameter.

{{% bannerNote type="note" title="NOTE"%}}
In order to be able to run the geocoding procedure you need to pass as input the CARTO API url and your LDS Token that can be obtained in the [Developers](https://docs.carto.com/carto-user-manual/developers/carto-for-developers/) section of the CARTO Workspace. 
{{%/ bannerNote %}}


<div style="text-align:center" >
<img src="/img/bq-analytics-toolbox/examples/lds_token.png" alt="LDS token in the CARTO UI" style="width:100%">
</div>



As a result of the query we obtain a new table with the name that we have chosen in the second parameter of the procedure. This output table has the same schema as the input one, but adding the “_iso_geom” column with the geometry of the polygon of the isoline that we have calculated.


<div style="text-align:center" >
<img src="/img/bq-analytics-toolbox/examples/bq_console_isolines_output_table.png" alt="Geocode output table in BQ console" style="width:100%">
</div>



### Create isolines from CARTO Builder

If you prefer you can create isolines without writing any line of SQL code thanks to our map-making tool [CARTO Builder](https://carto.com/builder/), which offers a user interface that you can use to [calculate trade areas](https://docs.carto.com/carto-user-manual/maps/sql-analyses/#trade-areas) based on walk/drive times or distances. Let's use it here to reproduce the same-use case as we have previously done from the SQL console, but from the Builder interface.

First of all, you should create a new map and add a source with the table including the locations around which you want to calculate isolines. You can find more details on how to create maps in Builder in the [Maps](https://docs.carto.com/carto-user-manual/maps/introduction/) section of the User Manual.

Then, on that data source, click on “Add SQL Analysis”. 



<div style="text-align:center" >
<img src="/img/bq-analytics-toolbox/examples/bq_isolines1_builder.png" alt="Isolines step 1 CARTO Builder" style="width:100%">
</div>



Select “Trade areas” in the list of available SQL Analysis.


<div style="text-align:center" >
<img src="/img/bq-analytics-toolbox/examples/bq_isolines2_builder.png" alt="Isolines step 2 CARTO Builder" style="width:100%">
</div>



Choose the parameters of your isolines, in this example “walk” mode and 900 seconds (15 minutes) . Then, click on the “Save results in a new table” button.


<div style="text-align:center" >
<img src="/img/bq-analytics-toolbox/examples/bq_isolines3_builder.png" alt="Isolines step 3 CARTO Builder" style="width:100%">
</div>



You should choose the location and the name of the output table and click on "create table" to run the process. As simple as that, directly from CARTO Builder and running natively in BigQuery.


<div style="text-align:center" >
<img src="/img/bq-analytics-toolbox/examples/bq_isolines4_builder.png" alt="Isolines step 4 CARTO Builder" style="width:100%">
</div>



As a result of the analysis, we obtain a new table (also added as a data source in our map) with the name that we have chosen in the last step which contains the geometry of the polygons of the isoline that we have calculated. Now we have two layers in our map, the original data with the Starbucks locations and a second layer with the isolines that we have created around each store.  


<div style="text-align:center" >
<img src="/img/bq-analytics-toolbox/examples/bq_isolines_output_builder.png" alt="Isolines output CARTO Builder" style="width:100%">
</div>



{{% euFlagFunding %}}