## Getting started

The Data Observatory is a spatial data platform that enables you to augment your data with the latest and greatest in spatial data. With a [catalog](https://carto.com/data) of thousands of spatial datasets from public and premium sources that have been vetted by our Data team, the Data Observatory provides a streamlined process to reduce the operational inefficiencies of discovering, licensing, and accessing spatial data.

We strongly recommend reading through the [Terminology](../terminology) section to get familiar with all the components of the Data Observatory.

In the following sections you will find a collection of resources where you can learn how to:

* [subscribe to Data Observatory data](#data-subscriptions),
* [access and introduce the data in your analysis workflows](#data-access-and-analysis),
* [visualize it](#data-visualization). 

<br/>

{{% bannerNote type="note" title="NOTE" %}}
Some of these actions require the usage of CARTO tools and libraries that integrate with the Data Observatory, such as the [Analytics Toolbox](/analytics-toolbox-bigquery).
{{%/ bannerNote %}}


### Data subscriptions

Check out the following guides to learn how to find and subscribe to Data Observatory datasets:

* [Accessing and browsing the Spatial Data Catalog](../../guides/accessing-and-browsing-the-spatial-data-catalog).

* [Subscribing to public and premium datasets](../../guides/subscribing-to-public-and-premium-datasets).

* [Managing your subscriptions](../../guides/managing-your-subscriptions).


### Data access and analysis

You can access your subscriptions directly from your data warehouses [connected to CARTO](/carto-user-manual/connections/creating-a-connection). The Data Observatory is currently supported for BigQuery and Snowflake; Redshift and Databricks support is coming soon. 

Access information can be checked through the _Access in_ button available in the dataset's detail page. Please refer to [this step-by-step guide](../../guides/accessing-your-subscriptions-from-your-data-warehouse) to learn more. 

<div style="text-align:center" >
<img src="/img/data-observatory/do-access-in-menu.png" alt="Data Observatory access in menu." style="width:100%">
</div>

<!-- <div style="text-align:center" >
<img src="/img/data-observatory/do-the-access-in-menu.png" alt="Data Observatory access in menu." style="width:100%">
</div> -->

<div style="text-align:center" >
<img src="/img/data-observatory/do-access-in-details.png" alt="Data Observatory access in details." style="width:100%">
</div>

<!-- <div style="text-align:center" >
<img src="/img/data-observatory/do-the-access-in-details.png" alt="Data Observatory access in details." style="width:100%">
</div> -->

The Analytics Toolbox for [BigQuery](/analytics-toolbox-bigquery) and [Snowflake](/analytics-toolbox-snowflake) offer a set of functions to enrich your datasets with any of the [variables](../terminology/#variable) from your Data Observatory subscriptions by performing a spatial join between them and your own data. Enrichment is an essential step to incorporate Data Observatory data into your spatial analysis workflows. 

<div style="text-align:center" >
<img src="/img/data-observatory/do-enrichment-bq.png" alt="Data Observatory enrichment example using the Analytics Toolbox for Bigquery." style="width:80%">
</div>

Please check out the following resources to learn more: 

* BigQuery: [data enrichment functions](/analytics-toolbox-bigquery/sql-reference/data) and [step-by-step guide](/analytics-toolbox-bigquery/guides/data-enrichment-using-the-data-observatory).
* Snowflake: [data enrichment functions](/analytics-toolbox-snowflake/sql-reference/data).


### Data visualization

Data Observatory datasets can be visualized from the CARTO Workspace using Builder. You can easily do so by clicking on the _Create map_ action in the subscription's detail page, available from the Data Observatory section of the Data Explorer: 

<div style="text-align:center" >
<img src="/img/data-observatory/do-create-map.png" alt="Using Builder to create a map from Data Observatory data." style="width:100%">
</div>

<div style="text-align:center" >
<img src="/img/data-observatory/do-example-map.png" alt="Data Observatory example map in Builder." style="width:100%">
</div>

Or by adding a new Data Observatory source to an existing map:

<div style="text-align:center" >
<img src="/img/data-observatory/do-dataset-as-source.png" alt="Adding a Data Observatory subscription to an existing map" style="width:90%">
</div>

Those datasets whose size is within platform limits will be visualized in full. Bigger datasets will be applied a spatial filter (a buffer around the centroid of the most populated city of the dataset's country) and will require a tileset to be visualized in full. 

<div style="text-align:center" >
<img src="/img/data-observatory/do-example-map-buffer.png" alt="Data Observatory example map in Builder." style="width:100%">
</div>

Please refer to [this guide](../../guides/visualizing-data-observatory-datasets) to learn more on how to visualize Data Observatory datasets using Builder.



