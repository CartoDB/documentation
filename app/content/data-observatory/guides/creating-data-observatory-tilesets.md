## Creating Data Observatory tilesets

In this guide you will learn how to create tilesets from your Data Observatory datasets. Tilesets are necessary for the visualization of datasets that are too big to be visualized directly in Builder, specifically those that have the _Create map_ action disabled in _Your Subscriptions_ page.

<div style="text-align:center" >
<img src="/img/data-observatory/do-subs-create-map-disabled.png" alt="Create Map action disabled in Your Subscription page." style="width:90%">
</div>


{{% bannerNote type="note" title="NOTE" %}}
Tileset creation is currently only available for BigQuery users using the [CARTO Analytics Toolbox](/analytics-toolbox-bq).
{{%/ bannerNote %}}


In addition to creating your own tilesets, you can also use any of the tilesets in our collection of ready-to-use Data Observatory tilesets from public datasets, available in the BigQuery project `carto-do-public-tilesets`. You can access [here](../../example-tilesets) the full list of tilesets and a gallery of example visualizations.


### Create a BigQuery connection

In order to be able to create a tileset from your Data Observatory dataset you first need to create a connection of type OAuth from your CARTO Dashboard. To do so, go to _Your Connections_ page, click on _New Connection_ and choose the type BigQuery:

<div style="text-align:center" >
<img src="/img/data-observatory/do-create-bq-connection.png" alt="Create a BigQuery connection from the Dashboard." style="width:75%">
</div>

Then, choose to create a connection of type OAuth and follow the steps to complete the configuration. Please note that the email associated with your CARTO account should be the same as the one you use to create the BigQuery connection.

<div style="text-align:center" >
<img src="/img/data-observatory/do-create-bq-connection-oauth.png" alt="Create a BigQuery connection of type OAuth from the Dashboard." style="width:75%">
</div>


Once your BigQuery connection has been set up, the Google user that you have used to create it should now have access to both the [CARTO Analytics Toolbox](/analytics-toolbox-bq) and your Data Observatory subscriptions directly from BigQuery.

### Access your Data Observatory dataset in BigQuery

Go to Your Subscriptions page and identify the dataset that you want to create the tileset from. Click on the three dots to expand the menu and then on _Access in BigQuery_.

<div style="text-align:center" >
<img src="/img/data-observatory/do-access-in-bq-tileset-1.png" alt="Access in BigQuery from Your Subscriptions." style="width:75%">
</div>

The following information will be displayed:

* Location of the data table in BigQuery, in the format `project.dataset.table`.
* Location of the geography table in BigQuery, in the format `project.dataset.table`.
* Example query to join the data and geography tables.

<div style="text-align:center" >
<img src="/img/data-observatory/do-access-in-bq-tileset-2.png" alt="Access details for BigQuery" style="width:75%">
</div>


Copy the example query, as you will need it in the next step of the process.

### Run the Tiler

The next step is to use [any of the available procedures](/analytics-toolbox-bq/sql-reference/tiler/) in the Analytics Toolbox for BigQuery to create a tileset. You can create two types of tilesets: 
* Simple: choose this type if you are wanting to visualize the original features of the dataset. To get started, find [here](analytics-toolbox-bq/examples/creating-simple-tilesets/) a set of examples on how to create simple tilesets using the `CREATE_TILESET` procedure.
* Aggregation: choose this type when your dataset is composed of points and you want to see them aggregated. To get started, find [here](/analytics-toolbox-bq/examples/creating-aggregation-tilesets/) a set of examples on how to create aggregation tilesets using the `CREATE_POINT_AGGREGATION_TILESET` procedure.

Both of the aforementioned procedures take as input a SQL query specifying the data that you want to transform into a tileset. If the case of Data Observatory datasets, you can use the example query provided as part of the "Access in BigQuery" functionality (see the previous section) as a starting point. We recommend that in order to minimize the cost and avoid reaching BigQuery internal limits, you only include in your input query the data columns that you strictly need for your visualization.

Here is a GIF showcasing how the full process works:

<div style="text-align:center" >
<img src="/img/data-observatory/do_tileset_creation.gif" alt="Creating a Data Observatory tileset" style="width:90%">
</div>

### Create a visualization

The final step is visualizing the tileset. Tilesets can be visualized directly from your CARTO Workspace following [this guide](/analytics-toolbox-bq/guides/creating-and-visualizing-tilesets/) or integrated into your custom spatial applications using [CARTO for deck.gl](/deck-gl) following [this example code](/deck-gl/examples/basic-examples/data-observatory-tileset-layer/).

Here is an example of a tileset visualization of [WorldPop's dataset](https://carto.com/spatial-data-catalog/browser/dataset/carto-do-public-data.worldpop.demographics_population_glo_grid1km_v1_yearly_2020) created from the Dashboard:

<iframe height=480px width=100% style='margin-bottom:20px' src="https://public.carto.com/viewer/user/public/bigquery?config=eyJpbml0aWFsVmlld1N0YXRlIjp7ImxhdGl0dWRlIjozNC41MjU2MDM1MDY0NjEzMSwibG9uZ2l0dWRlIjoxMy45MTY2NTcyODAwNTMyOTcsInpvb20iOjIsInBpdGNoIjowLCJiZWFyaW5nIjowLCJkcmFnUm90YXRlIjpmYWxzZSwid2lkdGgiOjg2NCwiaGVpZ2h0Ijo3ODIsImFsdGl0dWRlIjoxLjUsIm1heFpvb20iOjIwLCJtaW5ab29tIjowLCJtYXhQaXRjaCI6NjAsIm1pblBpdGNoIjowLCJ0cmFuc2l0aW9uRHVyYXRpb24iOjAsInRyYW5zaXRpb25JbnRlcnJ1cHRpb24iOjF9LCJ2aWV3cyI6W3siQEB0eXBlIjoiTWFwVmlldyIsImNvbnRyb2xsZXIiOnRydWV9XSwibGF5ZXJzIjpbeyJAQHR5cGUiOiJDYXJ0b0JRVGlsZXJMYXllciIsImRhdGEiOiJjYXJ0by1kby1wdWJsaWMtdGlsZXNldHMud29ybGRwb3AuZGVtb2dyYXBoaWNzX3BvcHVsYXRpb25fZ2xvX2dyaWQxa21fdjFfeWVhcmx5XzIwMjBfdGlsZXNldF8wMDAiLCJjcmVkZW50aWFscyI6eyJ1c2VybmFtZSI6InB1YmxpYyIsImFwaUtleSI6ImRlZmF1bHRfcHVibGljIn0sImdldEZpbGxDb2xvciI6eyJAQGZ1bmN0aW9uIjoiY29sb3JDb250aW51b3VzIiwiYXR0ciI6InBvcHVsYXRpb25fdCIsImRvbWFpbiI6WzAsMTAsMTAwLDEwMDAsMTAwMDAsMTAwMDAwXSwiY29sb3JzIjoiVGVtcHMifSwicG9pbnRSYWRpdXNNaW5QaXhlbHMiOjEsInN0cm9rZWQiOmZhbHNlLCJsaW5lV2lkdGhNaW5QaXhlbHMiOjAuMSwiZ2V0TGluZUNvbG9yIjpbMjU1LDI1NSwyNTVdLCJwaWNrYWJsZSI6dHJ1ZSwiYmluYXJ5Ijp0cnVlLCJvbkRhdGFFcnJvciI6eyJAQGZ1bmN0aW9uIjoib25EYXRhRXJyb3IifX1dfQ%3D%3D&embed=true" title="Data Observatory tileset example"/>