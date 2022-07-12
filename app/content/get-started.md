---
title: Getting started with CARTO
description: "Helpful resources to get you up and running."
type: single-page

menu:
  - title: "Getting started with CARTO"
    url: "get-started"
---

## CARTO in a nutshell

CARTO is the leading Location Intelligence platform. It enables organizations to use spatial data and analysis for more efficient delivery routes, better behavioral marketing, strategic store placements, and much more. 

Data Scientists, Developers, and Analysts use CARTO to optimize business processes and predict future outcomes through the power of Spatial Data Science.

Our platform helps you visualize, analyze, and build applications using location data. It is available for both individual users and enterprises. 


### Components of the CARTO platform

Depending on your usage of the CARTO platform, whether it’s for visualization, analysis, or application development, you will be using different components of the platform.

{{%sideImage image="/img/get-started/dashboard.png" alt="Dasbhoard"%}}
##### Workspace

Connect to multiple cloud data warehouses and explore your geospatial data. Seamlessly access a wealth of vetted datasets to enhance your geospatial analysis.

{{<link href="https://carto.com/signup" target="_blank">}}
  Login or create an account
{{</link>}}
{{%/sideImage%}}

{{%sideImage image="/img/get-started/builder.png" alt="Builder"%}}
##### Builder

CARTO Builder offers powerful map making, data visualization, and integration with Data Warehouses.

{{<link href="https://carto.com/builder" target="_blank">}}
  Learn more
{{</link>}}
{{%/sideImage%}}

{{%sideImage image="/img/get-started/engine-api.png" alt="Platfrom APIs and libraries"%}}
##### Platform APIs and libraries

For the Developer community, we have created a complete library of APIs, frameworks, connectors, and development tools to accelerate the spatial app development process.

{{<link href="/#dev-tools">}}
  View all libraries and APIs
{{</link>}}
{{%/sideImage%}}

{{%sideImage image="/img/get-started/cartoframes.png" alt="CARTOframes"%}}
##### CARTOframes

CARTOframes is a Python package for integrating CARTO maps, spatial analytics, and data services into your data science workflows.

{{<link href="https://carto.com/cartoframes" target="_blank">}}
  Learn more
{{</link>}}
{{%/sideImage%}}

{{%sideImage image="/img/get-started/data-observatory.png" alt="Data Observatory"%}}
##### Data Observatory

We catalog and distribute thousands of vetted public and premium spatial datasets, covering most global markets. These datasets are available across the different components of CARTO, so you can use them for data enrichment or as additional data layers for your spatial apps and analyses.

{{<link href="https://carto.com/spatial-data-catalog" target="_blank">}}
  Explore our Spatial Data Catalog
{{</link>}}
{{%/sideImage%}}


## CARTO for Spatial Analysis

CARTO's Location Intelligence platform lets you store, enrich, analyze, & visualize spatial data to make insightful decisions.

### Spatial Analysis with Builder


{{<interactiveTutorial>}}
  {{% tutorialStep stepName="Intro"%}}

Builder is our mapping tool to design, build, and publish interactive web maps with your location data. Maps can be easily shared or embedded on any website or blog.

In this guide, you will learn how to use the sample data available in the CARTO Data Warehouse to find the best place to create a store close to the potential customers: 

![Builder image](/img/get-started/build-map-intro.png)

{{%/ tutorialStep %}}
{{% tutorialStep stepName="Create your first map"%}}

Log in to CARTO.

Go to Maps and click on "+ New Map".

![Builder image](/img/get-started/builder_step1a@2x.png)
  
Once in Builder, click on “Add source from …”

![Builder image](/img/get-started/builder_step1b@2x.png)

Select “Custom Query (SQL)” and “Type your own query” using the `carto_dw` connection and click on “Add Source”

![Builder image](/img/get-started/builder_step2a@2x.png)

Now, you have a SQL panel where you can run queries in CARTO Data Warehouse (based on Google BigQuery) and see the result in the map.

![Builder image](/img/get-started/builder_step2b@2x.png)

{{%/ tutorialStep %}}
{{% tutorialStep stepName="Explore your data"%}}

The following queries should be executed in order, and each of them will show a different result:

Let’s start by just plotting a table that we have through our connection with the CARTO Data Warehouse (note that you would achieve the same result creating a map from the Data Explorer)

```sql
SELECT * FROM `carto-demo-data`.demo_tables.sample_customer_home_locations
```
![Builder image](/img/get-started/builder_step3a@2x.png)
  

Optionally, you could spend some time and style this layer based on the customer value feature, either with the fill color of the points ... 

![Builder image](/img/get-started/builder_step3b@2x.png)

... or their radius.

![Builder image](/img/get-started/builder_step3c@2x.png)

{{%/ tutorialStep %}}
{{% tutorialStep stepName="Find clusters of points"%}}

Now, we are going to modify the SQL Query used to generate the map layer, and we are going to use the [clustering functions](/analytics-toolbox-bq/sql-reference/clustering/) in CARTO’s Analytics Toolbox to generate 6 clusters (which is the number of stores we want to open).

```sql
WITH clustered_points AS
  (
    SELECT `carto-un`.clustering.ST_CLUSTERKMEANS(ARRAY_AGG(geom ignore nulls), 6) AS cluster_arr
    FROM `carto-demo-data`.demo_tables.sample_customer_home_locations
  )

SELECT 
  cluster_element.cluster, 
  ST_UNION_AGG(cluster_element.geom) AS geom 
FROM clustered_points, UNNEST(cluster_arr) AS cluster_element 
GROUP BY cluster_element.cluster
```
![Builder image](/img/get-started/builder_step4a@2x.png)

Let’s now change the name of the layer to “Clusters of customer homes”

![Builder image](/img/get-started/builder_step4b@2x.png)

Style the layer by modifying the fill color of the points based on the column “cluster”. You can change the color and width of the stroke in order to polish the visualization.

![Builder image](/img/get-started/builder_step4c@2x.png)

You can also add a Widget to be able to filter the home locations based on the cluster

![Builder image](/img/get-started/builder_step4d@2x.png)

Let’s also add a tooltip to the points based on the cluster number

![Builder image](/img/get-started/builder_step4e@2x.png)

{{%/ tutorialStep %}}
{{% tutorialStep stepName="Locate your stores"%}}

We are now going to create another layer. In order to do that, click again on “Add source from”, “Customer Query (SQL)” and “Type your own query” from your `carto_dw` connection. Finally click on “Add source”.

![Builder image](/img/get-started/builder_step5a@2x.png)

For this second layer we are going to adapt the previous SQL Query and compute the centroid of each of the clusters using the [transformation functions](/analytics-toolbox-bq/sql-reference/transformations/) in the Analytics Toolbox; this would give us a potentially optimal location to open each store in the center of each of the previously computed clusters.

```sql
with clustered_points AS

  (
    SELECT `carto-un`.clustering.ST_CLUSTERKMEANS(ARRAY_AGG(geom ignore nulls), 6) AS cluster_arr
    FROM `carto-demo-data`.demo_tables.sample_customer_home_locations
  )

SELECT 
  cluster_element.cluster, 
  `carto-un`.transformations.ST_CENTERMEAN(ST_UNION_AGG(cluster_element.geom)) AS geom 
FROM clustered_points, UNNEST(cluster_arr) AS cluster_element 
GROUP BY cluster_element.cluster
```

Let’s rename this second layer as “Cluster centers” and style this layer by changing the fill color and increasing the radius of the points in order to make them more visible

![Builder image](/img/get-started/builder_step5b@2x.png)

That's it! The resulting map shows the different clusters of customer locations and the potential location of each store.

{{%/ tutorialStep %}}
{{</interactiveTutorial>}}

### Spatial Analysis with CARTOframes

This guide is intended for those who want to start augmenting their data using CARTOframes, our Python library. You can find full guides and examples in the [documentation page](https://carto.com/developers/cartoframes/).

{{<interactiveTutorial>}}
{{% tutorialStep stepName="Intro" %}}

We define *enrichment* as the process of augmenting your data with new variables by means of a spatial join between your data and a dataset aggregated at a given spatial resolution in the CARTO Data Observatory.

The enrichment process can be performed using CARTOframes following a few simple steps. In this guide, we'll show you how to find out how many people live in the areas of influence that can be covered during an 8-minute walk around each of these stores: 

<iframe src="https://public.carto.com/kuviz/9adba148-be95-4dcd-b479-c9754a6a9bcc" style="border: 1px solid #cfcfcf;
    width: 100%;height:500px" title="Iframe Example"></iframe>

First, we need to set the credentials of the CARTO account that will be used to perform these operations.

```python
from cartoframes.auth import set_default_credentials

set_default_credentials('creds.json')
```

{{%/ tutorialStep %}}

{{% tutorialStep stepName="Get areas of influence"%}}

Let's read the file where we have our areas of influence stored and check out the first few records:

``` python
aoi_gdf = read_file('http://libs.cartocdn.com/cartoframes/files/starbucks_brooklyn_isolines.geojson')
aoi_gdf.head()
```

{{% tableWrapper %}}
| data_range | geometry |
| -----: | ------: |
| 8 min.   | MULTIPOLYGON (((-73.95959 40.67571, -73.95971 ... |
| 17 min.   | POLYGON ((-73.95988 40.68110, -73.95863 40.681 ... |
| 25 min.   | POLYGON ((-73.95986 40.68815, -73.95711 40.688 ... |
| 8 min.   | MULTIPOLYGON (((-73.96185 40.58321, -73.96231 ... |
| 17 min.   | MULTIPOLYGON (((-73.96684 40.57483, -73.96830 ... |
{{% /tableWrapper %}}

Let's keep only the 8-minute range:

``` python
aoi_gdf_8 = aoi_gdf[aoi_gdf['range_label']=='8 min.']
```
{{%/ tutorialStep %}}

{{% tutorialStep stepName="Get population data from the Data Observatory"%}}

After browsing the [Data Catalog](https://carto.com/spatial-data-catalog/browser/), we've decided we are going to enrich our data with demographics data aggregated at the Census block group level from this [dataset](https://carto.com/spatial-data-catalog/browser/dataset/ags_sociodemogr_a7e14220/) provided by [AGS](https://appliedgeographic.com/).

We can then list the variables available in this dataset with just a couple of lines of code:

```python
from cartoframes.data.observatory import *

dataset = Dataset.get('ags_sociodemogr_a7e14220')
variables = dataset.variables
variables
```

```txt
[<Variable.get('BLOCKGROUP_30e525a6')> #'Geographic Identifier',
 <Variable.get('POPCY_4534fac4')> #'Population (2019A)',
 <Variable.get('POPCYGRP_3033ef2e')> #'Population in Group Quarters (2019A)',
 <Variable.get('POPCYGRPI_1e42899')> #'Institutional Group Quarters Population (2019A)',
 <Variable.get('AGECY0004_aaae373a')> #'Population age 0-4 (2019A)',
 <Variable.get('AGECY0509_d2d4896c')> #'Population age 5-9 (2019A)',
 ...]
 ```

Let's visualize the total population variable, `POPCY_4534fac4` in the context of one of our stores and its area of influence:

<iframe src="https://public.carto.com/kuviz/a8ae5b01-83c8-4db7-8ccc-9d738b2e69c6" style="border: 1px solid #cfcfcf;
    width: 100%;height:500px" title="Iframe Example"></iframe>

{{%/ tutorialStep %}}

{{% tutorialStep stepName="Enrich areas of influence"%}}

To enrich our areas of influence, we first have to select the variable that we are going to use for the enrichment (total population):
``` python
variable = Variable.get('POPCY_4534fac4')
```
Next, we run the enrichmenth of our areas of influence with this simple command:

``` python
enriched_aoi_gdf = Enrichment().enrich_polygons(aoi_gdf_8, [variable])
enriched_aoi_gdf.head()
```
As a result, we get a new column added to our dataset, containing the total population that lives inside each the areas of influence:

{{% tableWrapper %}}
| data_range | geometry | POPCY
| -----: | ------: | ------: |
| 8 min.   | MULTIPOLYGON (((-73.95959 40.67571, -73.95971 ... | 21893.52 |
| 8 min.   | MULTIPOLYGON (((-73.96185 40.58321, -73.96231 ... | 23118.11 |
| 8 min.   | MULTIPOLYGON (((-73.99010 40.62280, -73.99067 ... | 18204.30 |
| 8 min.   | MULTIPOLYGON (((-74.02791 40.63631, -74.02809 ... | 17606.95 |
| 8 min.   | MULTIPOLYGON (((-74.00100 40.59815, -74.00141 ... | 2517.66 |
{{% /tableWrapper %}}
{{%/ tutorialStep %}}

{{% tutorialStep stepName="Visualize the result"%}}

Map visualizations can be created very easily using CARTOframes. In fact, all the maps that you've seen so far in this guide have been created with it. 

Let's create a map where we can see the result of our enrichment, that is, the areas of influence colored according to the number of people who live in it. We can do it with a really simple single line of code:

``` python
Layer(enriched_aoi_gdf, color_continuous_style('POPCY'))
``` 

<iframe src="https://public.carto.com/kuviz/8775af20-9e27-40b5-a235-94403f5b058b" style="border: 1px solid #cfcfcf;
    width: 100%;height:500px" title="Iframe Example"></iframe>



{{%/ tutorialStep %}}
{{</interactiveTutorial>}}

## CARTO for Development

Our goal is to make the development of web-based spatial applications as easy as possible. To achieve this, our developer toolkit includes industry-leading visualization, mapping, and application design components, giving developers unparalleled flexibility to create truly beautiful geospatial user experiences on the web and mobile.

The CARTO platform is based on industry standards like GeoJSON or vector tiles. You can use your choice of visualization library because most of them have support for these standards. We recommend using [deck.gl](https://deck.gl) with the [CARTO module](https://deck.gl/docs/api-reference/carto/overview) as we are actively contributing to ensure the best integration and performance. In this website you will find guides and examples for working with CARTO and different visualization libraries.

If you are developing a web application, the CARTO platform is framework-agnostic, so you can use Angular, Vue.js, React, or any other frontend framework/library. We recommend using [React](https://reactjs.org) because we think reactive programming is a sound approach to spatial applications architecture. If you want to reduce development time, we encourage you to use [CARTO for React](/react), although you can build an application with CARTO and React without it. We also provide guides and examples for integrating CARTO with [Angular](/angular) and [Vue.js](/vue).

### App Development with CARTO for React

{{<interactiveTutorial>}}

{{% tutorialStep stepName="Intro"%}}

CARTO for React is our product for building faster and better spatial apps. Kickstart your development environment with our templates for Create React App and take advantage of our advanced widgets and the custom theme for Material-UI user interface components.

In this guide we will show you how easy it is to create a great looking spatial app from scratch to visualize a dataset and filter it with an interactive widget.

![Final app](/img/get-started/dev-final-app.png)  

{{%/ tutorialStep %}}

{{% tutorialStep stepName="Kickstart your app"%}}

CARTO for React provides templates for Create React App. The basic pre-requisite is to have [Node.js](https://nodejs.org/) installed in your computer, preferably using a version manager like [nvm](https://github.com/nvm-sh/nvm). You also need a package manager; by default Node.js comes with [npm](https://www.npmjs.com/) but you can also use other package managers like [yarn](https://yarnpkg.com/). To create a new app in a folder called `my-app` using the template for CARTO 3, you need to execute the following command in your terminal:

If you want to use npm:

```shell
~ npx create-react-app my-app --template @carto/base-3
```

If you want to use yarn:

```shell
~ yarn create react-app my-app --template @carto/base-3
```

Then you can start a development server by changing the current directory and executing the following command:

For npm:

```shell
~ cd my-app
~ npm start
```

For yarn:

```shell
~ cd my-app
~ yarn start
```

You should see the following app in your browser with a default header, a sidebar, and an area dedicated to the map:

![Blank app](/img/get-started/dev-blank-app.png)  

{{%/ tutorialStep %}}

{{% tutorialStep stepName="Adding a layer"%}}

Now we are going to add a layer to visualize data from a data source that will be displayed in a new view. These are the three main components for working with CARTO for React and we provide a code generation tool based on Hygen to make it really easy to create them.

The data source is a dataset coming from a BigQuery table named `retail_stores`. For this tutorial, we are using a token that provides access to the BigQuery table but you can also use OAuth for providing authenticated access. This means you also need to remove the `oauth` object from the initial state (or comment it out).

First you need to edit the `src/store/initialStateSlice.js` file and add the public access token to the credentials object:

```javascript
credentials: {
  apiBaseUrl: 'https://gcp-us-east1.api.carto.com',
  accessToken: 'eyJhbGciOiJIUzI1NiJ9.eyJhIjoiYWNfbHFlM3p3Z3UiLCJqdGkiOiI1YjI0OWE2ZCJ9.Y7zB30NJFzq5fPv8W5nkoH5lPXFWQP0uywDtqUg8y8c',
},
```

Then you create a new view named "Stores" and include the link in the header:

```shell
~ yarn hygen view new
$ hygen view new
✔ Name: · Stores
✔ Route path: · stores
✔ Do you want a link in the menu? (y/N) · true
```

You can now create a source pointing to the BigQuery table:

```shell
~ yarn hygen source new
$ hygen source new
✔ Name: · Stores
✔ Enter a valid connection name · bqconn
✔ Choose type · table
✔ Type a query · cartobq.public_account.retail_stores
```

Finally you can create a layer using the source and view created in the previous steps:

```shell
~ yarn hygen layer new
✔ Name: · Stores
✔ Choose a source · storesSource
✔ Do you want to attach to some view (y/N) · true
✔ Choose a view · Stores (views/Stores.js)
```

If we look at our browser, we should see a new link "Stores" in the header. If we click on this link, the stores layer will be displayed on top of the basemap:

![Add layer](/img/get-started/dev-add-layer.png)  

{{%/ tutorialStep %}}

{{% tutorialStep stepName="Adding a widget"%}}

Now we are going to add a widget to show the revenue by store type for stores in the current viewport. To do that, we are going to use the Category widget.

We need to open the `src/components/views/Stores.js` folder and import the component and enumeration that we will use in the widget definition:

```javascript
import { AggregationTypes } from '@carto/react-core';
import { CategoryWidget } from '@carto/react-widgets';
```

Then we need  to remove the "Hello World" `<Grid>` component and add the following JSX code for the widget:

```javascript
<CategoryWidget
  id='revenueByStoreType'
  title='Revenue by store type'
  dataSource={storesSource.id}
  column='storetype'
  operationColumn='revenue'
  operation={AggregationTypes.SUM}
/>
```

In addition to giving the widget a unique ID and a title, we link it with the layer through the `dataSource` property. The Category widget groups the features by the attribute specified in the `column` parameter and executes the aggregation operation specified in the `operation` parameter over the attribute specified in the `operationColumn` parameter.

If you go to your browser, you will see the widget in the sidebar and if you click on any of the store types, you will see how the map is filtered.

![Add widget](/img/get-started/dev-final-app.png)  

{{%/ tutorialStep %}}

{{% tutorialStep stepName="Additional resources"%}}

In this documentation center you will find comprehensive [documentation](/react) on CARTO for React. For visualization, CARTO for React uses our [module](/deck-gl) for deck.gl. You can also use deck.gl with other frontend frameworks like [Angular](/angular) or [Vue.js](/vue).

CARTO is an open ecosystem that does not force you to use a specific technology or library. Please read the following guides if you want to work with CARTO and [Google Maps](/google-maps), [Mapbox](/mapbox-gl), or [Amazon Location](/amazon-location).

Your application probably provides access to datasets stored in the CARTO database. Please read this [article](/authorization) to understand how authorization is handled and how you can take advantage of CARTO support for the OAuth 2.0 protocol.

When you are interacting with the CARTO platform, you may reach some limits that we put in place to guarantee the performance and prevent abuse. Please read this [article](/limits) to learn more about this.

{{%/ tutorialStep %}}

{{</interactiveTutorial>}}