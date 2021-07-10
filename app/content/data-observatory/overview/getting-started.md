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

Data Observatory datasets that are smaller than 2GB are synced into a table in your CARTO account upon subscription. You can identify these tables as those with a `subscription` tag.

<div style="text-align:center" >
<img src="/img/data-observatory/do-table-sync.png" alt="Data Observatory sync table." style="width:90%">
</div>

You can access these tables from any of the tools available in your CARTO Dashboard, including Builder, where you can create custom dashboards and analyses. Read more in [this guide](../../guides/managing-your-subscriptions).


#### From CARTOframes

Our Python library [CARTOframes](https://carto.com/developers/cartoframes/) is a great tool to access Data Observatory datasets of any size from your Python code or notebook. To get started, please refer to [this guide from the CARTOframes documentation page](https://carto.com/developers/cartoframes/guides/Data-Observatory/#data-access) or download the example notebook provided in _Your subscriptions_ page of the Dashboard.

<div style="text-align:center" >
<img src="/img/data-observatory/do-cartoframes-example-notebook.png" alt="Data Observatory example notebook for CARTOframes." style="width:100%">
</div>

CARTOframes also offers a set of functions to enrich your datasets with any of the [variables](../terminology/#variable) from your Data Observatory subscriptions by performing a spatial join between them and your own data. Enrichment is an essential step to incorporate Data Observatory data into your spatial analysis workflows. You can learn more in [this guide](https://carto.com/developers/cartoframes/guides/Data-Observatory/#data-enrichment).

#### From your cloud data storage or warehouse

You can also access your subscriptions directly from BigQuery, AWS or Azure. Refer to [this step-by-step guide](../../guides/accessing-your-subscriptions-from-bigquery-aws-or-azure) to learn more. If you are a BigQuery user, you can also leverage our [Spatial Extension for BigQuery](https://docs.carto.com/spatial-extension-bq) to perform spatial analysis using your Data Observatory datasets without leaving your BigQuery console.

<div style="text-align:center" >
<img src="/img/data-observatory/do-access-in-menu.png" alt="Data Observatory access in menu." style="width:100%">
</div>

### Data visualization

#### From your CARTO Dashboard

Data Observatory datasets that are smaller than 2GB can visualized from Builder. You can easily do so by clicking on the _Create map_ action in _Your subscriptions_ page of the Dashboard.

<div style="text-align:center" >
<img src="/img/data-observatory/do-create-map.png" alt="Using Builder to create a map from Data Observatory data." style="width:100%">
</div>

<div style="text-align:center" >
<img src="/img/data-observatory/do-example-map.png" alt="Data Observatory example map in Builder." style="width:100%">
</div>


#### From CARTOframes

Our Python library [CARTOframes](https://carto.com/developers/cartoframes/) allows you to create and embed interactive maps with your CARTO data, including Data Observatory datasets, directly from your notebooks. Please refer to [this guide](https://carto.com/developers/cartoframes/guides/Data-Visualization/) to learn more.

<div style="text-align:center" >
<img src="/img/data-observatory/do-cartoframes-map.png" alt="Data Observatory example map in CARTOframes." style="width:100%">
</div>

#### Using tilesets

Some of the spatial datasets offered in the Data Observatory are massive (a few TB), either due to their global coverage, such as [Worldpop](https://carto.com/spatial-data-catalog/browser/dataset/wp_population_e683f5e4/) or [NASADEM](https://carto.com/spatial-data-catalog/browser/dataset/nasa_nasadem_ec3517d7/), or their fine granularity, such as [ACS Sociodemographics](https://carto.com/spatial-data-catalog/browser/dataset/acs_sociodemogr_95c726f9/) at census block group level, and their visualization requires the creation of [tilesets](https://docs.carto.com/spatial-extension-bq/overview/tilesets/) using the [Spatial Extension for BigQuery](https://docs.carto.com/spatial-extension-bq/guides/tilesets/).

We have created a collection of ready-to-use Data Observatory tilesets from public datasets that are publicly available in the BigQuery project `carto-do-public-tilesets`. Visit [this page](../../tilesets-collection) for a gallery of visualizations and the full list of available lilesets. 

<div class="figures-table" style="text-align:center">
    <figure>
        <img src="/img/data-observatory/nasadem-elevation-tileset.png" alt="Multiresolution quadkeys">
        <figcaption class="figcaption" style="text-align:center"><a href="https://public.carto.com/viewer/user/public/bigquery?config=eyJpbml0aWFsVmlld1N0YXRlIjp7ImxhdGl0dWRlIjowLjMyODkxMjAyMjc2NTkzLCJsb25naXR1ZGUiOjE5LjY2OTQ5MjI4MzU3Njk4Miwiem9vbSI6MS43NTkxOTg3NjI4ODQxMTY0LCJwaXRjaCI6MCwiYmVhcmluZyI6MCwiZHJhZ1JvdGF0ZSI6ZmFsc2UsIndpZHRoIjoxMzQ0LCJoZWlnaHQiOjk1MywiYWx0aXR1ZGUiOjEuNSwibWF4Wm9vbSI6MjAsIm1pblpvb20iOjAsIm1heFBpdGNoIjo2MCwibWluUGl0Y2giOjAsInRyYW5zaXRpb25EdXJhdGlvbiI6MCwidHJhbnNpdGlvbkludGVycnVwdGlvbiI6MX0sInZpZXdzIjpbeyJAQHR5cGUiOiJNYXBWaWV3IiwiY29udHJvbGxlciI6dHJ1ZX1dLCJsYXllcnMiOlt7IkBAdHlwZSI6IkNhcnRvQlFUaWxlckxheWVyIiwiZGF0YSI6ImNhcnRvLWRvLXB1YmxpYy10aWxlc2V0cy5uYXNhLmVudmlyb25tZW50YWxfbmFzYWRlbV9nbG9fcXVhZGdyaWQxNV92MV9zdGF0aWNfdjFfdGlsZXNldF8wMDAiLCJjcmVkZW50aWFscyI6eyJ1c2VybmFtZSI6InB1YmxpYyIsImFwaUtleSI6ImRlZmF1bHRfcHVibGljIn0sImdldEZpbGxDb2xvciI6eyJAQGZ1bmN0aW9uIjoiY29sb3JCaW5zIiwiYXR0ciI6ImVsZXZhdGlvbiIsImRvbWFpbiI6WzAsMSwxMCw1MCwxMDAsMTAwMCwyMDAwLDUwMDAsMTAwMDBdLCJjb2xvcnMiOiJTdW5zZXQifSwicG9pbnRSYWRpdXNNaW5QaXhlbHMiOjEsInN0cm9rZWQiOmZhbHNlLCJsaW5lV2lkdGhNaW5QaXhlbHMiOjAuNSwiZ2V0TGluZUNvbG9yIjpbMjU1LDI1NSwyNTVdLCJwaWNrYWJsZSI6dHJ1ZSwiYmluYXJ5Ijp0cnVlfV19" target="_blank">NASADEM worldwide elevation tileset.</a></figcaption>
    </figure>
</div>

To ceate your own Data Observatory tilesets, either from public datasets not yet available in our public repository or from your premium subscriptions, simply find the location of your subscription in BigQuery using the [“Access in BigQuery”](../../guides/accessing-your-subscriptions-from-bigquery-aws-or-azure/#access-in-bigquery) functionality and run the Tiler from your console.

Tilesets can be visualized directly [from your CARTO Dashboard](https://docs.carto.com/spatial-extension-bq/guides/tilesets/#visualizing-a-tileset) or integrated into your custom spatial applications using [CARTO for deck.gl](https://docs.carto.com/deck-gl) following THIS GUIDE.
