---
title: "Geocoding your address data"
description: "We provide an example that showcase how to easily geocode your address data using the Analytics Toolbox LDS module from the BigQuery console and from the CARTO Workspace."
image: "/img/bq-analytics-toolbox/examples/geocode.png"
type: examples
date: "2022-09-20"
categories:
    - LDS
---
## Geocoding your address data


In this example, we will geocode a table with some Starbucks address data that we have available in BigQuery.
The geocoding process will add a new column to your input table called "geom" with a Point geometry based on the geographic coordinates of the location; which are derived from the location information in your table (e.g. street address, postal code, country, etc.).

{{% bannerNote type="warning" title="warning"%}}
This function consumes isolines quota. Each call consumes as many units of quota as the number of rows your input table or query has. Before running, we recommend checking the size of the data to be geocoded and your available quota using the [LDS_QUOTA_INFO()](https://docs.carto.com/analytics-toolbox-bigquery/sql-reference/lds/#lds_quota_info) function.
{{%/ bannerNote %}}


### Geocoding from the BigQuery console

As a module within CARTO’s Analytics Toolbox, the location data services ([lds](https://docs.carto.com/analytics-toolbox-bigquery/sql-reference/lds/#lds)) capabilities are available as SQL procedures that can be executed directly from your BigQuery console or client of choice after connecting your BigQuery project with your CARTO account.
To check whether your Google account or Service Account has access to the LDS module, please execute this query:

{{% customSelector %}}𝅺{{%/ customSelector %}}
```sql
SELECT `carto-un`.carto.VERSION_ADVANCED()
--Use `carto-un-eu`.carto.VERSION_ADVANCED() if your data is in GCP's EU multi-region
```



The lds module is generally available in the Analytics Toolbox since the “July 26, 2022” version. Please check the [Getting Access](https://docs.carto.com/analytics-toolbox-bigquery/overview/getting-access/) section if you run into any errors when running the query above.

For this example we will use a table with the Starbucks addresses that can be found in the publicly available `bqcartodemos.sample_tables.starbucks_ny_geocode` . The table contains a column called "full_address" that we will use as input for the geocoding process.


<div style="text-align:center" >
<img src="/img/bq-analytics-toolbox/examples/bq_console_geocode_input_table.png" alt="Geocode input table in BQ console" style="width:100%">
</div>



Once you are all set getting access to the lds module, geocoding your data is as easy as opening your BigQuery console or SQL client and running the [GEOCODE_TABLE()](https://docs.carto.com/analytics-toolbox-bigquery/sql-reference/lds/#geocode_table) procedure as detailed in the following query:

{{% customSelector %}}𝅺{{%/ customSelector %}}
```sql
CALL `carto-un`.carto.GEOCODE_TABLE('<api_base_url>', '<lds_token>',
'Bqcartodemos.sample_tables.starbucks_ny_geocode',
'full_address','geom', 'US', NULL);
-- The table 'bqcartodemos.sample_tables.starbucks_ny_notgeocoded' will be updated
-- adding the columns: geom , carto_geocode_metadata.
```



In this case, we select  'bqcartodemos.sample_tables.starbucks_ny_geocode' as input table and “full_address” as address column. We choose the “geom” as the column name for the geometry column (like it is by default), and we also specify the name of the country based on its ISO 3166-1 alpha-2 code [ISO 3166-1 alpha-2 code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2). Last but not least, you need to add to the query your API Base URL and your LDS Token, which can be obtained in the [Developers](https://docs.carto.com/carto-user-manual/developers/carto-for-developers/) section of the CARTO Workspace. You can refer to the [SQL reference](https://docs.carto.com/analytics-toolbox-bigquery/sql-reference/lds/#geocode_table) if you need more details about this procedure and its parameters.


<div style="text-align:center" >
<img src="/img/bq-analytics-toolbox/examples/lds_token.png" alt="LDS token in the CARTO UI" style="width:100%">
</div>



As a result of the query, we obtain the input table modified with a new column called "geom" with the geographic coordinates (latitude and longitude) and the "carto_geocode_metadata" column with additional information of the geocoding result in JSON format.


<div style="text-align:center" >
<img src="/img/bq-analytics-toolbox/examples/bq_console_geocode_output_table.png" alt="Geocode output table in BQ console" style="width:100%">
</div>



### Geocoding from CARTO Workspace

The Data Explorer offers you a graphical interface that you can use to [geocode your data](https://docs.carto.com/carto-user-manual/data-explorer/geocoding-data/). Let's use it here to reproduce the same use case that we have done from the BigQuery console but from the CARTO Workspace.

You will find the option Geocode table available from the Data Explorer in tables that do not contain any geometry column. To find your table please select the corresponding connection, pick the right dataset/folder and find the table you want to geocode from the collapsible tree.


<div style="text-align:center" >
<img src="/img/bq-analytics-toolbox/examples/bq_workspace_geocode_input_table.png" alt="Geocode inout table in CARTO Workspace" style="width:100%">
</div>



Clicking on the "Geocode table" button will trigger a wizard that you can follow along to configure the different parameters to geocode your data.

In this case, to reproduce the geocoding example that we have done before from a SQL console, we will select geocode by address and we will choose the ‘full_address’ column as input parameter. You can also provide extra location information choosing “United States of America” in the country selector.


<div style="text-align:center" >
<img src="/img/bq-analytics-toolbox/examples/bq_workspace_geocode_step1.png" alt="Geocode proces in CARTO step 1" style="width:100%">
</div>



Click on “Continue” to proceed to the next step where you can review the summary of the operation that will be performed on your data and confirm it by clicking on “Geocode”.


<div style="text-align:center" >
<img src="/img/bq-analytics-toolbox/examples/bq_workspace_geocode_step2.png" alt="Geocode proces in CARTO step 2" style="width:100%">
</div>



The geocoding process could take some minutes, remember that you may be geocoding a big amount of data and that the operation is calling an external geocoding service. You can minimize the process window and continue working with CARTO in the meantime and follow the progress of the geocoding process at any time you want.


<div style="text-align:center" >
<img src="/img/bq-analytics-toolbox/examples/bq_workspace_geocode_processing.png" alt="Geocode proces in CARTO processing" style="width:100%">
</div>



Once the process finishes, you will be able to access your geocoded table, which will have a new column called "geom" including the geographic coordinates of your input data.


<div style="text-align:center" >
<img src="/img/bq-analytics-toolbox/examples/bq_workspace_geocode_output_table.png" alt="Geocode output table in CARTO Workspace" style="width:100%">
</div>



{{% euFlagFunding %}}