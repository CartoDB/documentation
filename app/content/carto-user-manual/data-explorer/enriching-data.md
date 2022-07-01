## Enriching data

{{% bannerNote title="note" type="note" %}}
Currently the “Enrich table” functionality is available for data accessible via BigQuery (incl. CARTO Data Warehouse) and Snowflake connections. You need to have active data subscriptions from the [Data Observatory](/data-observatory/overview/getting-started/) and the [Analytics Toolbox](/analytics-toolbox/about-the-analytics-toolbox/) installed on the data warehouse you will use. 
{{%/ bannerNote %}}

Enrichment is the process of augmenting your data tables with new external variables by means of a spatial join between your data and a dataset from a [Data Observatory](/data-observatory/overview/getting-started/) subscription, and the application of an aggregation method (i.e. sum, average, max, min,...). 

To illustrate the case of enriching polygons, as in the image below, imagine that we have polygons representing municipalities (i.e. named A, B and C in the image) and we want to enrich them based on the population attribute in a known buffer (i.e. named D) coming from an external dataset. We don’t know how the population is distributed inside these municipalities or inside the buffer. They are probably concentrated in cities somewhere, but, since we don’t know where they are, our best guess is to assume that the population is evenly distributed in the different geometries involved in the process (i.e. every point inside the municipalities or buffer has the same population density). Population is an extensive property (it grows with area), so we can subset it and also aggregate it by summing. In this case, we’d calculate the population inside each part of the circle that intersects with a municipality. On the other hand, when enriching points, the result of the process will give you the value of the variables from the Data Observatory subscription in the areas intersecting with the locations of the target points (to be enriched). 

![Data Explorer enrichment introduction](/img/cloud-native-workspace/data-explorer/de_enrichment_introduction.png)

If you still do not have any active data subscription from the Data Observatory, start browsing our [Spatial Data Catalog](https://carto.com/spatial-data-catalog/browser/), where you will find information about the +11k spatial datasets from public and premium sources that we have in our offering.   

To enrich one of your data tables, from the Data Explorer, select a connection and click on the table you would like to enrich from the collapsible tree. Then, click on the *Enrich table* button from the available options at the top right of the screen.  

![Data Explorer enrich table](/img/cloud-native-workspace/data-explorer/de_enrich_table.png)

A new dialog screen will open for you to choose the Data Observatory subscription with which you want to enrich your data table. It is important to note that for the enrichment process to yield any result, your target table and the Data Observatory subscription need to have overlapping geometries. Meaning, in order to enrich your table of census block groups in Chicago, the dataset from the Data Observatory should also have data on that geographic area. Otherwise, the spatial join between the two data sources will provide NULL values.   

{{% bannerNote title="note" type="note" %}}
The data table you want to enrich and the dataset from the Data Observatory subscription should be available on the same data warehouse connection in order to be able to perform the enrichment procedure.
{{%/ bannerNote %}}

![Data Explorer enrichment data source](/img/cloud-native-workspace/data-explorer/de_enrichment_datasource.png)

Once you have selected the Data Observatory subscription, it is time to select the specific variables with which you want to enrich your table. You will notice that some variables/columns from the dataset are disabled since they are not applicable for the enrichment operation - this includes variables such as *geoid* and *do_date* that are internal to CARTO and variables that cannot be aggregated such as those in *string* data type. 

![Data Explorer enrichment variables](/img/cloud-native-workspace/data-explorer/de_enrichment_variabless.png)

In order to enrich your table with external variables you need also to specify which aggregation method will be applied when intersecting the target geometries with those from the Data Observatory subscription. CARTO has identified a default aggregation method for each of the available variables from datasets in the Data Observatory. However, you can also modify the default and pick your aggregation method of choice, from the different supported operations: Sum, Minimum, Maximum, Average, and Count.

![Data Explorer enrichment agg method](/img/cloud-native-workspace/data-explorer/de_enrichment_aggmethod.png)

After selecting the variables and their associated aggregation methods, it is time to select where you want to save the results from the enrichment procedure. Depending on the permissions that you have on the target table (i.e. write vs. read-only), you will be able to “Create a new table” with the result of the enrichment or to “Enrich current table”, which will append new columns to the same target table selected at the beginning of the process. 

![Data Explorer enrichment confirmation](/img/cloud-native-workspace/data-explorer/de_enrichment_confirmation.png)

If you select “Create new table”, the next step of the process will ask you to select the destination where the new table will be stored. Note that this destination should be accessible via the same data warehouse connection as the target table and the Data Observatory subscription, and that you will have to have the necessary write permissions in such destination. 

![Data Explorer enrichment output location](/img/cloud-native-workspace/data-explorer/de_enrichment_outputlocation.png)

If you don’t have the necessary write permission on the selected destination, you will see a message such as the one illustrated in the image below.  

![Data Explorer enrichment no permissions](/img/cloud-native-workspace/data-explorer/de_enrichment_nopermissions.png)

Once you have selected a valid output destination and table name, you can run the enrichment process by clicking on the “Create table” button. That will trigger the start of the enrichment process. 

![Data Explorer enrichment processing job](/img/cloud-native-workspace/data-explorer/de_enrichment_processingjob.png)

Depending on the characteristics of the datasets involved and the number of variables that you have selected, the enrichment process can take from several seconds to a few minutes. Once the process has finished you can click on “Done” and start leveraging your new enriched table for your spatial analysis.  

![Data Explorer enrichment job finished](/img/cloud-native-workspace/data-explorer/de_enrichment_jobfinished.png)

If you would like to learn more about the Enrichment methods in CARTO’s Analytics Toolbox, you will find them in the following sections of our documentation:

- [Analytics Toolbox for BigQuery](/analytics-toolbox-bigquery/sql-reference/data/)
- [Analytics Toolbox for Snowflake](/analytics-toolbox-snowflake/sql-reference/data/)
