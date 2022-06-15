## Enriching data

{{% bannerNote title="note" type="note" %}}
Currently the “Enrich table” functionality is available for data accessible via BigQuery (incl. CARTO Data Warehouse) and Snowflake connections. You need to have active data subscriptions from the [Data Observatory](/data-observatory/overview/getting-started/) and the [Analytics Toolbox](/analytics-toolbox/about-the-analytics-toolbox/) installed on the data warehouse you will use. 
{{%/ bannerNote %}}

Enrichment is the process of augmenting your data tables with new external variables by means of a spatial join between your data and a dataset from a [Data Observatory](/data-observatory/overview/getting-started/) subscription, and the application of an aggregation method (i.e. sum, average, max, min,...). 

To illustrate the case of enriching polygons, as in the image below, imagine that we have polygons representing municipalities (i.e. named A, B and C in the image) and we want to enrich them based on the population attribute in a known buffer (i.e. named D) coming from an external dataset. We don’t know how the population is distributed inside these municipalities or inside the buffer. They are probably concentrated in cities somewhere, but, since we don’t know where they are, our best guess is to assume that the population is evenly distributed in the different geometries involved in the process (i.e. every point inside the municipalities or buffer has the same population density). Population is an extensive property (it grows with area), so we can subset it and also aggregate it by summing. In this case, we’d calculate the population inside each part of the circle that intersects with a municipality. On the other hand, when enriching points, the result of the process will give you the value of the variables from the Data Observatory subscription in the areas intersecting with the locations of the target points (to be enriched). 

![Data Explorer enrich data](/img/cloud-native-workspace/data-explorer/de_enrichment_introduction.png)
