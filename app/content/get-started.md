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

Through our dashboard, users can connect to multiple data sources, including local or remote files, cloud data warehouses or BI solutions. We also provide seamless access to a wealth of vetted datasets to enhance your geospatial analysis. 

CARTO Builder offers powerful map making, data visualization and pre-packaged analytics. And for the Data Scientist, CARTOframes provides more complex analytical functionality, fully integrated with Jupyter notebooks.

For the Developer community, we have created a complete library of APIs, frameworks, connectors and development tools to accelerate the spatial app development process.

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
##### Importing your data to Builder 

This is just a test. I repeat. This is just a test

![Builder image](/img/get-started/build-map-intro.png)
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

## CARTO for Development

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas varius tortor nibh, sit amet tempor nibh finibus et.

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