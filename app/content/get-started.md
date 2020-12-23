---
title: Get started with CARTO
description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas varius tortor nibh, sit amet"
url: "/get-started/"
---

## CARTO in a nutshell

CARTO is a leading Location Intelligence platform. It enables organizations to use spatial data and analysis for more efficient delivery routes, better behavioural marketing, strategic store placements, and much more. 

Data Scientists, Developers and Analysts use CARTO to optimize business processes, and predict future outcomes through the power of Spatial Data Science.

Our platform helps you visualize, analyze and build applications using location data. It is available for both individual users and enterprises. 




#### Intro to Products

CARTO Builder offers powerful map making, data visualization and pre-packaged analytics. And for the Data Scientist, CARTOframes provides more complex analytical functionality, fully integrated with Jupyter notebooks.

For the Developer community, we have created a complete library of APIs, frameworks, connectors and development tools to accelerate the spatial app development process.

## Components of the CARTO platform

Depending on your usage of the CARTO platform, whether it’s for visualization, analysis or application development, you will be using different components of the platform.

### Dashboard

A centralized place to see your connected data sources and maps and to configure different aspects of the platform.

![Dashboard image](/img/get-started/dashboard.png)

 [GO TO DASHBOARD (LOGIN REQUIRED)](www.carto.com/login)

### Builder

A visualization tool to create shareable maps, dashboards and to prototype your spatial applications.

![Builder image](/img/get-started/builder.png)

 
 [LEARN MORE](www.carto.com/builder)

### Platform APIs and libraries

If you are developing spatial applications, we expose a full set of APIs for map creation and to perform spatial queries. These APIs are wrapped in convenient libraries and tools to accelerate the development process.

![engine image](/img/get-started/engine-api.png)

 
 [VIEW ALL](www.docs.carto.com)

### Data Observatory

We catalog and distribute thousands of vetted public and premium spatial datasets, covering most global markets. These datasets are available across the different components of CARTO, so you can use them for data enrichment or as additional data layers for your spatial apps and analyses.

![DO image](/img/get-started/data-observatory.png)


 [EXPLORE DATA OBSERVATORY](www.carto.com/spatial-data-catalog)

### CARTOframes

CARTOframes is a Python package for integrating CARTO maps, analysis, and data services into your data science workflows.

![DO image](/img/get-started/cartoframes.png)


 [VIEW LIBRARY](www.carto.com/cartoframes)

## CARTO for Spatial Analysis

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas varius tortor nibh, sit amet tempor nibh finibus et.

#### Spatial Analysis Products

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas varius tortor nibh, sit amet tempor nibh finibus et. Aenean eu enim justo. Vestibulum aliquam.

### Spatial Analysis with Builder


{{<interactiveTutorial>}}
  {{% tutorialStep stepName="Intro"%}}

##### Build a map with our drag & drop editor

Builder is our drag & drop tool to design, build and publish interactive web maps with your location data. Maps can be easily shared or embedded on any website or blog.

In this guide, you will learn how to upload a .csv file and create your first dataset, create a simple map, and publish it.

![Builder image](/img/get-started/build-map-intro.png)
  

{{%/ tutorialStep %}}
{{% tutorialStep stepName="Import your data"%}}



##### Download and upload a comma-separated values (CSV) file to create your first dataset.

Download the following dataset:

          

|  World Ports |  3,669 rows                                   | 708 kB  | <a href="https://public.carto.com/api/v2/sql?q=select%20*%20from%20public.world_ports&format=csv&filename=world_ports"> Download</a> |
|---------------|---------------------------------------------|------------------| --------------|




In the Connect dataset section click “Browse”, select the file, and click “Connect dataset”

Builder is our drag & drop tool to design, build and publish interactive web maps with your location data. Maps can be easily shared or embedded on any website or blog.

In this guide, you will learn how to upload a .csv file and create your first dataset, create a simple map, and publish it.

![Builder image](/img/get-started/builder_step2@2x.png)

{{%/ tutorialStep %}}
{{% tutorialStep stepName="Explore your new dataset and learn how to manipulate it"%}}

##### Explore your new dataset and learn how to manipulate it.

Once the upload has finished and the new dataset has been created, you will be redirected to the Dataset view. Here, you can explore your data.

![Builder image2](/img/get-started/builder_step3@2x.png)
  

  Double-click on any cell to edit it.
Click on any of the columns to change the order, rename it, change its data type, remove it, or even add new columns.
You can also add new rows and export your data in different formats.

{{%/ tutorialStep %}}
{{% tutorialStep stepName="Create a map using your new dataset"%}}

##### Create a map using your new dataset.

From the dataset view, click “CREATE MAP” (on the bottom right of your screen).
Your map will be created and you will be redirected to Builder, CARTO’s map editor:

![Builder image2](/img/get-started/builder_step4@2x.png)

Double click on the name of the map (Untitled Map) and rename it to “My first map”. This will be the name that you will see on your dashboard as well.

Change the style of the features on the map (eg: point size, point color, strike size, strike color) by clicking on the layer name and playing with the styling options.

![Builder image2](/img/get-started/builder_step4b@2x.png)
 

{{%/ tutorialStep %}}
{{% tutorialStep stepName="Publish and share your map with the world"%}}

##### Publish and share your map with the world


1.- Click “Publish” to publish your map.

2.- Click on the red privacy button to make your map “Public”.

3.- Click “Publish” to publish this version of your map.

Your map has now been published and you can use the link or embed code to share your map.

![Builder image2](/img/get-started/builder_step5@2x.png)



{{%/ tutorialStep %}}
{{</interactiveTutorial>}}

### Spatial Analysis with CARTOframes

{{<interactiveTutorial>}}
  {{% tutorialStep stepName="ETL"%}}
##### Lorem ipsum

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas varius tortor nibh, sit amet tempor nibh finibus et. Aenean eu enim justo. Vestibulum aliquam hendrerit molestie. Mauris malesuada nisi sit amet augue accumsan tincidunt. Maecenas tincidunt, velit ac porttitor pulvinar, tortor eros facilisis libero, vitae commodo nunc quam et ligula.

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
{{</interactiveTutorial>}}

## CARTO for Developers

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