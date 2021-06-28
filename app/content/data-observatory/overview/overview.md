## Overview

The Data Observatory is a spatial data platform that enables you to augment your data with the latest and greatest in spatial data. With a [catalog](https://carto.com/data) of thousands of spatial datasets from public and premium sources that have been vetted by our Data team, the Data Observatory provides a streamlined process to reduce the operational inefficiencies of discovering, licensing and accessing spatial data.

To get started, we recommend reading through the [Terminology](../terminology) section to get familiar with all the components of the Data Observatory and then using our Guides to get started.

In the following sections you will find a collection of resources where you can learn how to subscribe to Data Observatory data, access it, introduce it in your analysis workflows and visualize it. Please note that some of these resources link other product's documentation pages as they offer powerful tools to leverage the Data Observatory datasets.

### Data subscriptions

Check out the following guides to learn how to find and subscribe to Data Observatory datasets:

* [Accessing and browsing the Spatial Data Catalog](../../guides/accessing-and-browsing-the-spatial-data-catalog).

* [Subscribing to public and premium datasets](../../guides/subscribing-to-public-and-premium-datasets).

* [Managing your subscriptions](../../guides/managing-your-subscriptions).


### Data access and analysis

#### From your CARTO Dashboard

Data Observatory datasets that are smaller than 2GB are synced as a data table in your CARTO account. This means that you can use this data with from any of the tools available in your CARTO Dashboard. Read more in [this guide](../../guides/managing-your-subscriptions).

#### From Python

Our Python library [CARTOframes](https://carto.com/developers/cartoframes/) is a great tool to use Data Observatory datasets from your Python code or notebook. Please refer to [this guide from the CARTOframes documentation page](https://carto.com/developers/cartoframes/guides/Data-Observatory/#data-access) to know more.

CARTOframes also offers a set of functions to enrich your datasets with any of the [variables](../terminology/#variable) from your subscriptions. These processes perform a spatial join between your data and the Data Observatory datasets so you can find out, for example, the population in any arbitrary polygon. You can learn more in [this guide](https://carto.com/developers/cartoframes/guides/Data-Observatory/#data-enrichment).

#### From your cloud data storage or warehouse

You can also access your subscriptions directly from BigQuery, AWS or Azure. Learn how to do it in [this guide](../../guides/accessing-your-subscriptions-from-bigquery-aws-or-azure). If you are a BigQuery user, you can also use our [Spatial Extension for BigQuery](https://docs.carto.com/spatial-extension-bq) to perform spatial analysis leveraging your Data Observatory datasets without leaving your BigQuery console.


### Data visualization

#### Builder maps

Data Observatory datasets that are smaller than 2GB are synced as a data table in your CARTO account, which means that you can create maps in Builder with a

#### Tilesets

Data Observatory datasets that are larger than 2GB can be visualized by transforming first into tilesets using the Tiler from the Spatial Extension for BigQuery. Tilesets contain pre-computed vector tiles and enable the visualization of massive spatial datasets hosted in BigQuery (such as the ones from the Data Observatory).

To get started, you can visualize any of the tilesets publicly available in the BigQuery project `carto-do-public-tileset` following this guide. You can find the catalog of available tilesets in this page.

To create new tilesets from your Data Observatory subscriptions, follow this guide.

{{% bannerNote type="note" title="IF YOU ARE A DEVELOPER" %}}
Data Observatory tilesets can be integrated in your custom apps using CARTO for deck.gl or CARTO for React. You can do so by using the `CartoBQLayer`. 
{{%/ bannerNote %}}
