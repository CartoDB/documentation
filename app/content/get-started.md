---
title: Get started with CARTO
description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas varius tortor nibh, sit amet"
url: "/get-started/"
---

## CARTO in a nutshell

CARTO is a leading Location Intelligence platform. It enables organizations to use spatial data and analysis for more efficient delivery routes, better behavioural marketing, strategic store placements, and much more. 

Data Scientists, Developers and Analysts use CARTO to optimize business processes, and predict future outcomes through the power of Spatial Data Science.

Our platform helps you visualize, analyze and build applications using location data. It is available for both individual users and enterprises. 


### Components of the CARTO platform

Depending on your usage of the CARTO platform, whether it’s for visualization, analysis or application development, you will be using different components of the platform.

{{%sideImage image="/img/get-started/dashboard.png" alt="Dasbhoard"%}}
#### Dashboard

Through our dashboard, users can connect to multiple data sources, including local or remote files, cloud data warehouses and BI solutions. We also provide seamless access to a wealth of vetted datasets to enhance your geospatial analysis.

<a href="https://carto.com/signup" target="_blank">Login or create an account</a>
{{%/sideImage%}}

{{%sideImage image="/img/get-started/builder.png" alt="Builder"%}}
#### Builder

CARTO Builder offers powerful map making, data visualization and pre-packaged analytics.

<a href="https://carto.com/builder" target="_blank">Learn more</a>
{{%/sideImage%}}

{{%sideImage image="/img/get-started/engine-api.png" alt="Platfrom APIs and libraries"%}}
#### Platform APIs and libraries

For the Developer community, we have created a complete library of APIs, frameworks, connectors and development tools to accelerate the spatial app development process.

<a href="https://docs.carto.com" target="_blank">View all libraries and APIs</a>
{{%/sideImage%}}

{{%sideImage image="/img/get-started/data-observatory.png" alt="Data Observatory"%}}
#### Data Observatory

We catalog and distribute thousands of vetted public and premium spatial datasets, covering most global markets. These datasets are available across the different components of CARTO, so you can use them for data enrichment or as additional data layers for your spatial apps and analyses.

<a href="https://carto.com/spatial-data-catalog" target="_blank">Explore the Data Observatory</a>
{{%/sideImage%}}

{{%sideImage image="/img/get-started/cartoframes.png" alt="CARTOframes"%}}
#### CARTOframes

CARTOframes is a Python package for integrating CARTO maps, spatial analytics, and data services into your data science workflows.

<a href="https://carto.com/cartoframes" target="_blank">Learn more</a>
{{%/sideImage%}}

## CARTO for Spatial Analysis

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas varius tortor nibh, sit amet tempor nibh finibus et.


### Spatial Analysis with Builder


{{<interactiveTutorial>}}
  {{% tutorialStep stepName="Intro"%}}

Builder is our drag & drop tool to design, build and publish interactive web maps with your location data. Maps can be easily shared or embedded on any website or blog.

In this guide, you will learn how to upload a .csv file and create your first dataset, create a simple map, and publish it.

![Builder image](/img/get-started/build-map-intro.png)
  

{{%/ tutorialStep %}}
{{% tutorialStep stepName="Import your data"%}}

Download the following dataset:

|       |       |       |       |
|-------|-------|-------|-------|
| World Ports | 3,669 rows | 708 kB | <a href="https://public.carto.com/api/v2/sql?q=select%20*%20from%20public.world_ports&format=csv&filename=world_ports"> Download</a> |

In the "Connect dataset" tab, click on “Browse”, select the file, and then click on “Connect dataset”

![Builder image](/img/get-started/builder_step2@2x.png)


{{%/ tutorialStep %}}
{{% tutorialStep stepName="Explore your new dataset"%}}

Once the upload has finished and the new dataset has been created, you will be redirected to the Dataset view. Here, you can explore your data.

![Builder image2](/img/get-started/builder_step3@2x.png)
  

Double-click on any cell to edit it.
Click on any of the columns to change the order, rename it, change its data type, remove it, or even add new columns.
You can also add new rows and export your data in different formats.


{{%/ tutorialStep %}}
{{% tutorialStep stepName="Create a map using your new dataset"%}}

From the dataset view, click on “Create map” button (on the bottom right of your screen).
Your map will be created and you will be redirected to Builder, CARTO’s map editor:

![Builder image2](/img/get-started/builder_step4@2x.png)

Double click on the name of the map (Untitled Map) and rename it to “My first map”. This will be the name that you will see on your dashboard as well.

Change the style of the features on the map (eg: point size, point color, strike size, strike color) by clicking on the layer name and playing with the styling options.

![Builder image2](/img/get-started/builder_step4b@2x.png)
 

{{%/ tutorialStep %}}
{{% tutorialStep stepName="Publish and share your map with the world"%}}

1.- Click “Publish” to publish your map.

2.- Click on the red privacy button to make your map “Public”.

3.- Click “Publish” to publish this version of your map.

Your map has now been published and you can use the link or embed code to share your map.

![Builder image2](/img/get-started/builder_step5@2x.png)



{{%/ tutorialStep %}}
{{</interactiveTutorial>}}

### Spatial Analysis with CARTOframes

This guide is intended for those who want to start augmenting their data using CARTOframes. You can find full guides and examples in the [documentation page](https://carto.com/developers/cartoframes/).

{{<interactiveTutorial>}}
  {{% tutorialStep stepName="Intro"%}}

We define *enrichment* as the process of augmenting your data with new variables by means of a spatial join between your data and a dataset aggregated at a given spatial resolution in the CARTO Data Observatory.

The enrichment process can be performed using CARTOframes following a few simple steps. In this guide, we'll show you how to find out how many people live in the 

First, we need to set the credentials of the CARTO account that will be used to perform these operations.

```python
from cartoframes.auth import set_default_credentials

set_default_credentials('creds.json')
```
{{%/ tutorialStep %}}
{{% tutorialStep stepName="Get population data from the Data Observatory"%}}

After browsing the [Data Catalog](https://carto.com/spatial-data-catalog/browser/), we've decided we are going to enrich our data with demographics data aggregated at the Census block group level from this [dataset](https://carto.com/spatial-data-catalog/browser/dataset/ags_sociodemogr_a7e14220/) provided by [AGS](https://appliedgeographic.com/).

We can then list the variables available in this dataset with just a couple of lines of code:

```python
from cartoframes.data.observatory import Dataset

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
 <Variable.get('AGECY1014_b09611e')> #'Population age 10-14 (2019A)',
 <Variable.get('AGECY1519_7373df48')> #'Population age 15-19 (2019A)',
 <Variable.get('AGECY2024_32919d33')> #'Population age 20-24 (2019A)',
 <Variable.get('AGECY2529_4aeb2365')> #'Population age 25-29 (2019A)',
 <Variable.get('AGECY3034_9336cb17')> #'Population age 30-34 (2019A)',
 <Variable.get('AGECY3539_eb4c7541')> #'Population age 35-39 (2019A)',
 ...]
 ```

```python
import geopandas as gdp
from cartoframes.auth import set_default_credentials
from cartoframes.data.observatory import Enrichment

set_default_credentials('creds.json')
enrichment = Enrichment()

enriched_df = enrichment.enrich_points(
    df,
    variables=['total_pop_3cf008b3']
)
from cartoframes.auth import set_default_credentials
from cartoframes.data.observatory import Enrichment

set_default_credentials('creds.json')
enrichment = Enrichment()

enriched_df = enrichment.enrich_points(
    df,
    variables=['total_pop_3cf008b3']
)
```

|  Table sample |  My table                                   | One more column  |
|---------------|---------------------------------------------|------------------|
|  1            | <span style="color: #f00;">4</span>         | 3                |
|  2            | 5                                           | 8                |
|  2            | 6                                           | 9                |


![Builder image](/img/get-started/build-map-intro.png)
  {{%/ tutorialStep %}}

  {{% tutorialStep stepName="Table"%}}
##### Table

| table | example | nueva columna |
| :-----: | :------: | :-----------: |
| asd   | asdad   | asd           |

| h1     | h2     | h3     |
|--------|--------|--------|
| data-1 | data-2 | data-3 |


  {{%/ tutorialStep %}}

  {{% tutorialStep stepName="Snippet"%}}
##### Snippet

###### WITH LINE NUMBER
```python {linenos=table}
  from cartoframes import read_data

  read_data('ejemplo').to_carto()
```
<br>

###### WITHOUT LINE NUMBER
```python
  from cartoframes import read_data

  read_data('ejemplo').to_carto()
```


  {{%/ tutorialStep %}}
{{</interactiveTutorial>}}

## CARTO for Development

CARTO’s goal is to make the development of web-based spatial applications as easy as possible. To achieve this, we provide a complete set of app development tools that includes APIs, SDKs, development frameworks and database connectors to simplify the analysis of massive spatial datasets and the development of powerful Location Intelligence applications.

Our developer toolkit includes industry-leading visualization, mapping and application design components, giving developers unparalleled flexibility to create truly beautiful geospatial user experiences on the web and mobile.

Check out our full range of resources for geospatial application development including,  user authentication, data import, storage and enhancement, cartography, tiling, app user interface styling, and much more.


#### Lorem ipsum

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas varius tortor nibh, sit amet tempor nibh finibus et. Aenean eu enim justo. Vestibulum aliquam.

{{<grid>}}
  {{<productCard
      name="CARTO for deck.gl"
      description="Build apps using deck.gl advanced framework for data visualization. This is our recommended library."
      image="/img/icons/carto-deck.png"
      url="/documentation/carto-deck/"
      highlighted="true">}}
  {{<productCard
      name="CARTO BigQuery Tiler"
      description="Visualize Big Data without having to move data outside BigQuery."
      image="/img/icons/bq-tiler.png"
      url="/documentation/bq-tiler/">}}
  {{<productCard
      name="SQL API"
      description="Interact with your tables and data inside CARTO, as if you were running SQL statements."
      image="/img/icons/sql-api.png"
      url="/documentation/sql-api/">}}
  {{<productCard
      name="Maps API"
      description="Generate maps based on data hosted in your CARTO account."
      image="/img/icons/maps-api.png"
      url="/documentation/maps-api/">}}
{{</grid>}}