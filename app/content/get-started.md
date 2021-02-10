---
title: Getting started with CARTO
description: "Helpful resources to get you up and running."
tocName: "Get started"
type: single-page
---

## CARTO in a nutshell

CARTO is a leading Location Intelligence platform. It enables organizations to use spatial data and analysis for more efficient delivery routes, better behavioural marketing, strategic store placements, and much more. 

Data Scientists, Developers and Analysts use CARTO to optimize business processes, and predict future outcomes through the power of Spatial Data Science.

Our platform helps you visualize, analyze and build applications using location data. It is available for both individual users and enterprises. 


### Components of the CARTO platform

Depending on your usage of the CARTO platform, whether it’s for visualization, analysis or application development, you will be using different components of the platform.

{{%sideImage image="/img/get-started/dashboard.png" alt="Dasbhoard"%}}
##### Dashboard

Connect to multiple data sources, including local or remote files, cloud data warehouses and BI solutions. Seamlessly access a wealth of vetted datasets to enhance your geospatial analysis.

{{<link href="https://carto.com/signup" target="_blank">}}
  Login or create an account
{{</link>}}
{{%/sideImage%}}

{{%sideImage image="/img/get-started/builder.png" alt="Builder"%}}
##### Builder

CARTO Builder offers powerful map making, data visualization and pre-packaged analytics.

{{<link href="https://carto.com/builder" target="_blank">}}
  Learn more
{{</link>}}
{{%/sideImage%}}

{{%sideImage image="/img/get-started/engine-api.png" alt="Platfrom APIs and libraries"%}}
##### Platform APIs and libraries

For the Developer community, we have created a complete library of APIs, frameworks, connectors and development tools to accelerate the spatial app development process.

{{<link href="https://docs.carto.com/#dev-tools">}}
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

CARTO's Location Intelligence platform lets you store, enrich, analyze & visualize spatial data to make insightful decisions.

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
| World Ports | 3,669 rows | 708 kB | <a href="https://public.carto.com/api/v2/sql?q=select%20*%20from%20public.world_ports&format=csv&filename=worldports"> Download</a> |

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

This guide is intended for those who want to start augmenting their data using CARTOframes, our Python library. You can find full guides and examples in the [documentation page](https://carto.com/developers/cartoframes/).

{{<interactiveTutorial>}}
  {{% tutorialStep stepName="Intro"%}}

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
| data_range | geometry |
| -----: | ------: |
| 8 min.   | MULTIPOLYGON (((-73.95959 40.67571, -73.95971 ... |
| 17 min.   | POLYGON ((-73.95988 40.68110, -73.95863 40.681 ... |
| 25 min.   | POLYGON ((-73.95986 40.68815, -73.95711 40.688 ... |
| 8 min.   | MULTIPOLYGON (((-73.96185 40.58321, -73.96231 ... |
| 17 min.   | MULTIPOLYGON (((-73.96684 40.57483, -73.96830 ... |

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

Let's visualise the total population variable, `POPCY_4534fac4` in the context of one of our stores and its area of influence:

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

| data_range | geometry | POPCY
| -----: | ------: | ------: |
| 8 min.   | MULTIPOLYGON (((-73.95959 40.67571, -73.95971 ... | 21893.52 |
| 8 min.   | MULTIPOLYGON (((-73.96185 40.58321, -73.96231 ... | 23118.11 |
| 8 min.   | MULTIPOLYGON (((-73.99010 40.62280, -73.99067 ... | 18204.30 |
| 8 min.   | MULTIPOLYGON (((-74.02791 40.63631, -74.02809 ... | 17606.95 |
| 8 min.   | MULTIPOLYGON (((-74.00100 40.59815, -74.00141 ... | 2517.66 |

{{%/ tutorialStep %}}
{{% tutorialStep stepName="Visualize the result"%}}

Map visualizations can be created very easily using CARTOframes. In fact, all the maps that you've seen so far in this guide have been created with it. 

Let's create a map where we can see the result of our enrichment, this is, the areas of influence coloured according to the number of people who live in it. We can do it with a really simple single line of code:

``` python
Layer(enriched_aoi_gdf, color_continuous_style('POPCY'))
``` 

<iframe src="https://public.carto.com/kuviz/8775af20-9e27-40b5-a235-94403f5b058b" style="border: 1px solid #cfcfcf;
    width: 100%;height:500px" title="Iframe Example"></iframe>



  {{%/ tutorialStep %}}
{{</interactiveTutorial>}}

## CARTO for Development

Our goal is to make the development of web-based spatial applications as easy as possible. To achieve this, we provide a complete set of app development tools that includes APIs, SDKs, development frameworks and database connectors to simplify the analysis of massive spatial datasets and the development of powerful Location Intelligence applications.

Our developer toolkit includes industry-leading visualization, mapping and application design components, giving developers unparalleled flexibility to create truly beautiful geospatial user experiences on the web and mobile.


#### CARTO Developer Resources

If you are building a web-based spatial application, we recommend you to use CARTO for deck.gl, the most advanced geospatial visualization library. Go to the [Getting Started](/deck-gl/guides/getting-started/) guide to begin creating awesome applications.

CARTO is an open ecosystem that does not force you to use a specific technology or library. Please read the following guides if you want to work with CARTO and [Google Maps](/google-maps), [Mapbox](/mapbox-gl) or [Amazon Location](/amazon-location).

Your application probably provides access to datasets stored in the CARTO database. Please read this [article](/authorization) to understand how authorization is handled and how you can take advantage of CARTO support for the OAuth 2.0 protocol.

When you are interacting with the CARTO platform, you can reach some limits that we put in place to guarantee the performance and prevent abuse. Please read this [article](/limits) to know more about this.