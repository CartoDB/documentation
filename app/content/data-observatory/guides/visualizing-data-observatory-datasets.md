## Visualizing Data Observatory datasets

### Creating maps

Data Observatory datasets can be visualized from the CARTO Workspace using Builder. You can easily do so by clicking on the _Create map_ action in the subscription's detail page, available from the Data Observatory section of the Data Explorer: 

<div style="text-align:center" >
<img src="/img/data-observatory/do-the-create-map.png" alt="Using Builder to create a map from Data Observatory data." style="width:100%">
</div>

<div style="text-align:center" >
<img src="/img/data-observatory/do-example-map.png" alt="Data Observatory example map in Builder." style="width:100%">
</div>

Or by adding a new Data Observatory source to an existing map:

<div style="text-align:center" >
<img src="/img/data-observatory/do-dataset-as-source.png" alt="Adding a Data Observatory subscription to an existing map" style="width:90%">
</div>

Those datasets whose size is within platform limits will be visualized in full. Bigger datasets will be applied a spatial filter (a buffer around the centroid of the most populated city of the dataset's country), but this filter can be modified at your own will through the provided SQL query (check out [this tutorial](/carto-user-manual/tutorials/subscribe-to-public-data-from-the-data-observatory/) for more details). These datasets will require a tileset to be visualized in full. Please refer to the [_Creating Data Observatory tilesets_](#creating-tilesets) section to learn more.

<div style="text-align:center" >
<img src="/img/data-observatory/do-example-map-buffer.png" alt="Data Observatory example map in Builder." style="width:100%">
</div>

#### Choosing a connection

You will be asked to select the connection that will be used to create a map with your Data Observatory subscription. The chosen connection will be used to retrieve the necessary data to add the layer to the map. Currently, CARTO Data Warehouse, BigQuery and Snowflake connections are supported; Redshift and Databricks support is coming soon.

<div style="text-align:center" >
<img src="/img/data-observatory/do-the-create-map-choose-connection.png" alt="Choose a connection to create a map with your Data Observatory subscription." style="width:100%">
</div>

In order to be able to use a Snowflake connection to create a map, the data first needs to be imported into your database. This import process is performed by our engineering team on a request basis. 

To request it, go to the subscription's page, click on the _Create map_ button and choose the desired Snowflake connection. You will be asked to request access to the dataset. 

<div style="text-align:center" >
<img src="/img/data-observatory/do-the-create-map-sf-request-access.png" alt="Request to access your subscriptions in Snowflake." style="width:100%">
</div>

Once we receive your request, we will get in touch with you to coordinate the import process. The data will be imported into a schema called `CARTO` that will be created in the Snowflake database you have set up in your Snowflake connection. Finallly, you will be able to create a map using such connection.

<div style="text-align:center" >
<img src="/img/data-observatory/do-the-create-map-sf-access-granted.png" alt="Create map of your Data Observatory subscription using a Snowflake connection." style="width:100%">
</div>

{{% bannerNote type="note" title="note"%}}
If you would like to access more than one of your Data Observatory subscriptions from your Snowflake database, it is not necessary to request access for each of them individually, as we can import several datasets at once during the same process. 
{{%/ bannerNote %}}

### Creating tilesets

Some of the spatial datasets offered in the Data Observatory are massive (a few TB), either due to their global coverage, such as [WorldPop](https://carto.com/spatial-data-catalog/browser/dataset/wp_population_e683f5e4/) or [NASADEM](https://carto.com/spatial-data-catalog/browser/dataset/nasa_nasadem_ec3517d7/), or their fine granularity, such as [ACS Sociodemographics](https://carto.com/spatial-data-catalog/browser/dataset/acs_sociodemogr_95c726f9/) at census block group level, and their visualization requires the creation of a [tileset](/analytics-toolbox-bigquery/overview/tilesets/).


<div class="figures-table" style="text-align:center">
    <figure>
        <img src="/img/data-observatory/carto2/nasadem-elevation-tileset.png" alt="Multiresolution quadkeys">
        <figcaption class="figcaption" style="text-align:center"><a href="https://public.carto.com/viewer/user/public/bigquery?config=eyJpbml0aWFsVmlld1N0YXRlIjp7ImxhdGl0dWRlIjowLjMyODkxMjAyMjc2NTkzLCJsb25naXR1ZGUiOjE5LjY2OTQ5MjI4MzU3Njk4Miwiem9vbSI6MS43NTkxOTg3NjI4ODQxMTY0LCJwaXRjaCI6MCwiYmVhcmluZyI6MCwiZHJhZ1JvdGF0ZSI6ZmFsc2UsIndpZHRoIjoxMzQ0LCJoZWlnaHQiOjk1MywiYWx0aXR1ZGUiOjEuNSwibWF4Wm9vbSI6MjAsIm1pblpvb20iOjAsIm1heFBpdGNoIjo2MCwibWluUGl0Y2giOjAsInRyYW5zaXRpb25EdXJhdGlvbiI6MCwidHJhbnNpdGlvbkludGVycnVwdGlvbiI6MX0sInZpZXdzIjpbeyJAQHR5cGUiOiJNYXBWaWV3IiwiY29udHJvbGxlciI6dHJ1ZX1dLCJsYXllcnMiOlt7IkBAdHlwZSI6IkNhcnRvQlFUaWxlckxheWVyIiwiZGF0YSI6ImNhcnRvLWRvLXB1YmxpYy10aWxlc2V0cy5uYXNhLmVudmlyb25tZW50YWxfbmFzYWRlbV9nbG9fcXVhZGdyaWQxNV92MV9zdGF0aWNfdjFfdGlsZXNldF8wMDAiLCJjcmVkZW50aWFscyI6eyJ1c2VybmFtZSI6InB1YmxpYyIsImFwaUtleSI6ImRlZmF1bHRfcHVibGljIn0sImdldEZpbGxDb2xvciI6eyJAQGZ1bmN0aW9uIjoiY29sb3JCaW5zIiwiYXR0ciI6ImVsZXZhdGlvbiIsImRvbWFpbiI6WzAsMSwxMCw1MCwxMDAsMTAwMCwyMDAwLDUwMDAsMTAwMDBdLCJjb2xvcnMiOiJTdW5zZXQifSwicG9pbnRSYWRpdXNNaW5QaXhlbHMiOjEsInN0cm9rZWQiOmZhbHNlLCJsaW5lV2lkdGhNaW5QaXhlbHMiOjAuNSwiZ2V0TGluZUNvbG9yIjpbMjU1LDI1NSwyNTVdLCJwaWNrYWJsZSI6dHJ1ZSwiYmluYXJ5Ijp0cnVlfV19" target="_blank">NASADEM worldwide elevation tileset.</a></figcaption>
    </figure>
</div>

#### From the Workspace

When a Data Observatory subscription requires a tileset to be visualized in full, a _Create tileset_ option will be available from the subscription's page.

<div style="text-align:center" >
<img src="/img/data-observatory/do-the-create-tileset-menu.png" alt="Create tileset menu option." style="width:100%">
</div>

<!-- <div style="text-align:center" >
<img src="/img/data-observatory/do-create-tileset-menu.png" alt="Create tileset menu option." style="width:100%">
</div> -->

Clicking on this option will display a wizard that will guide you through the tileset creation process:

1. Choose the name and location of the output tileset. Please note that you should have writing permissions in the destination dataset.

{{% bannerNote type="warning" title="warning"%}}
Tileset creation through the Workspace interface is only available for CARTO Data Warehouse and BigQuery connections.
{{%/ bannerNote %}}

<div style="text-align:center" >
<img src="/img/data-observatory/do-the-create-tileset-step-1.png" alt="Create tileset wizard: step 1." style="width:100%">
</div>

<!-- <div style="text-align:center" >
<img src="/img/data-observatory/do-create-tileset-step-1.png" alt="Create tileset wizard: step 1." style="width:100%">
</div> -->

2. Select the zoom range for which the tileset will be created.

<div style="text-align:center" >
<img src="/img/data-observatory/do-the-create-tileset-step-2.png" alt="Create tileset wizard: step 2." style="width:100%">
</div>

<!-- <div style="text-align:center" >
<img src="/img/data-observatory/do-create-tileset-step-2.png" alt="Create tileset wizard: step 2." style="width:100%">
</div> -->

3. Select the attributes (data columns) that will be included in the tileset.

<div style="text-align:center" >
<img src="/img/data-observatory/do-the-create-tileset-step-3.png" alt="Create tileset wizard: step 3." style="width:100%">
</div>

<!-- <div style="text-align:center" >
<img src="/img/data-observatory/do-create-tileset-step-3.png" alt="Create tileset wizard: step 3." style="width:100%">
</div> -->

4. Launch tileset creation.

<div style="text-align:center" >
<img src="/img/data-observatory/do-the-create-tileset-step-4.png" alt="Create tileset wizard: step 4." style="width:100%">
</div>

<!-- <div style="text-align:center" >
<img src="/img/data-observatory/do-create-tileset-step-4.png" alt="Create tileset wizard: step 4." style="width:100%">
</div> -->

Once the tileset creation has been launched, you can check its status using the processing jobs menu available at the top right of the page.

<div style="text-align:center" >
<img src="/img/data-observatory/do-the-create-tileset-job.png" alt="Create tileset job progress." style="width:100%">
</div>

<!-- <div style="text-align:center" >
<img src="/img/data-observatory/do-create-tileset-job.png" alt="Create tileset job progress." style="width:100%">
</div> -->

Finally, once the tileset is created, you can add it as a layer to any of your maps as with any other tileset. Please refer to [this guide](/carto-user-manual/maps/add-source/#add-source-from-a-connection) for more information.

{{% bannerNote type="tip" title="TIP" %}}
We have created a collection of ready-to-use Data Observatory tilesets from public datasets that are directly available in the BigQuery project `carto-do-public-tilesets`. Visit [this page](../../example-tilesets) for a gallery of visualizations and the full list of available tilesets. 
{{%/ bannerNote %}}

#### From your data warehouse

You can also create tilesets directly from your data warehouse using SQL commands. This option is currently only available for BigQuery using [any of the available procedures](/analytics-toolbox-bigquery/sql-reference/tiler/) in the Analytics Toolbox. You can create two types of tilesets: 
* Simple: choose this type if you are wanting to visualize the original features of the dataset. To get started, find [here](/analytics-toolbox-bigquery/examples/creating-simple-tilesets/) a set of examples on how to create simple tilesets using the `CREATE_TILESET` procedure.
* Aggregation: choose this type when your dataset is composed of points and you want to see them aggregated. To get started, find [here](/analytics-toolbox-bigquery/examples/creating-aggregation-tilesets/) a set of examples on how to create aggregation tilesets using the `CREATE_POINT_AGGREGATION_TILESET` procedure.

Both of the aforementioned procedures take as input a SQL query specifying the data that you want to transform into a tileset. If the case of Data Observatory datasets, you can use the example query provided as part of the _Access in_ functionality (learn more [here](../../guides/accessing-your-subscriptions-from-your-data-warehouse)). We recommend that in order to minimize the cost and avoid reaching BigQuery internal limits, you only include in your input query the data columns that you strictly need for your visualization.