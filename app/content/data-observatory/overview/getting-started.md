## Getting started

The Data Observatory is a spatial data platform that enables you to augment your data with the latest and greatest in spatial data. With a [catalog](https://carto.com/data) of thousands of spatial datasets from public and premium sources that have been vetted by our Data team, the Data Observatory provides a streamlined process to reduce the operational inefficiencies of discovering, licensing and accessing spatial data.

We strongly recommend reading through the [Terminology](../terminology) section to get familiar with all the components of the Data Observatory.

In the following sections you will find a collection of resources where you can learn how to:

* [subscribe to Data Observatory data](#data-subscriptions),
* [access it and introduce it in your analysis workflows](#data-access-and-analysis),
* and [visualize it](#data-visualization). 

<br/>

{{% bannerNote type="note" title="NOTE" %}}
Some of these actions require the usage of CARTO tools and libraries that integrate with the Data Observatory, such as [CARTOframes](https://carto.com/developers/cartoframes).
{{%/ bannerNote %}}


### Data subscriptions

Check out the following guides to learn how to find and subscribe to Data Observatory datasets:

* [Accessing and browsing the Spatial Data Catalog](../../guides/accessing-and-browsing-the-spatial-data-catalog).

* [Subscribing to public and premium datasets](../../guides/subscribing-to-public-and-premium-datasets).

* [Managing your subscriptions](../../guides/managing-your-subscriptions).


### Data access and analysis

#### From your CARTO Dashboard

Data Observatory datasets that are smaller than 2GB are synced in a table in your CARTO account upon subscription. You can identify these tables as those with a `subscription` tag.

<div style="text-align:center" >
<img src="/img/data-observatory/do-table-sync.png" alt="Data Observatory sync table." style="width:90%">
</div>

You can access this table from any of the tools available in your CARTO Dashboard, including Builder, where you can create custom dashboards and analyses. Read more in [this guide](../../guides/managing-your-subscriptions).


#### From CARTOframes

Our Python library [CARTOframes](https://carto.com/developers/cartoframes/) is a great tool to use Data Observatory datasets of any size from your Python code or notebook. To get started, please refer to [this guide from the CARTOframes documentation page](https://carto.com/developers/cartoframes/guides/Data-Observatory/#data-access) or download the example notebook provided in _Your subscriptions_ page of the Dashboard.

<div style="text-align:center" >
<img src="/img/data-observatory/do-cartoframes-example-notebook.png" alt="Data Observatory example notebook for CARTOframes." style="width:100%">
</div>

CARTOframes also offers a set of functions to enrich your datasets with any of the [variables](../terminology/#variable) from your Data Observatory subscriptions by performing a spatial join between them and your own data. Enrichment is an essential step to integarte Data Observatory data into your spatial analysis workflows. You can learn more in [this guide](https://carto.com/developers/cartoframes/guides/Data-Observatory/#data-enrichment).

#### From your cloud data storage or warehouse

You can also access your subscriptions directly from BigQuery, AWS or Azure. Refer to [this step-by-step guide](../../guides/accessing-your-subscriptions-from-bigquery-aws-or-azure) to learn how to do it. If you are a BigQuery user, you can also use our [Spatial Extension for BigQuery](https://docs.carto.com/spatial-extension-bq) to perform spatial analysis leveraging your Data Observatory datasets without leaving your BigQuery console.

<div style="text-align:center" >
<img src="/img/data-observatory/do-access-in-menu.png" alt="Data Observatory access in menu." style="width:100%">
</div>

### Data visualization

#### From your CARTO Dashboard

Data Observatory datasets that are smaller than 2GB can visualized from Builder. When that is the case, you will find a _Create map_ action in _Your subscriptions_ page of the Dashboard.

<div style="text-align:center" >
<img src="/img/data-observatory/do-create-map.png" alt="Using Builder to create a map from Data Observatory data." style="width:100%">
</div>

<div style="text-align:center" >
<img src="/img/data-observatory/do-example-map.png" alt="Data Observatory example map in Builder." style="width:100%">
</div>


#### From CARTOframes

Our Python library [CARTOframes](https://carto.com/developers/cartoframes/) allows you to create and embed interactive maps with your CARTO data, including Data Observatory datasets, directly from your Python notebooks. Please refer to [this guide](https://carto.com/developers/cartoframes/guides/Data-Visualization/) to learn more.

<div style="text-align:center" >
<img src="/img/data-observatory/do-cartoframes-map.png" alt="Data Observatory example map in CARTOframes." style="width:100%">
</div>

#### From a custom application

#### Tilesets

Data Observatory 

If you are a BigQuery user, you can visualize Data Observatory datasets that are larger than 2GB by creating a tileset using the Tiler from the Spatial Extension for BigQuery. Tilesets are a set of pre-computed vector tiles that enable the visualization of massive spatial datasets (such as the ones from the Data Observatory).

We have created a collection of Data Observatory tilesets from public datasets that are publicly available in the BigQuery project `carto-do-public-tileset`. To visualize them, simply You can find the catalog of available tilesets in this page.

To create new tilesets from your Data Observatory subscriptions, follow this guide.



{{% bannerNote type="note" title="IF YOU ARE A DEVELOPER" %}}
Data Observatory tilesets can be integrated in your custom apps using CARTO for deck.gl or CARTO for React. You can do so by using the `CartoBQLayer`. 
{{%/ bannerNote %}}
