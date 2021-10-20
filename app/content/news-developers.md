---
title: Developer News
description: "CARTO for Developers Latest News"
type: single-page

menu:
  - title: "Developer News"
    url: "news-developers"
---

### Announcing deck.gl 8.6 release

##### 2021-10-12

This new release includes several performance improvements, bug fixes and adds support for vector maps in the Google Maps module. Starting with Google Maps v3.45 there are two modes of rendering: Vector and Raster. The Vector rendering mode is, in general, more performant, and the GoogleMapsOverlay class offers several features not available when using Raster rendering like:

- Shared 3D space: objects drawn by the GoogleMapsOverlay class appear inside the Google Maps scene, correctly intersecting with 3D buildings and behind the contextual labels drawn by Google Maps

- Tilting and rotating the view is supported

- Rendering uses the same WebGL context as Google Maps, improving performance

<video autoplay="" loop="" muted=""> <source src="https://docs.carto.com/img/news-developers/deckgl-8-6.mp4" type="video/mp4"> Your browser does not support the video tag. </video>

For further information check the [blog post](https://medium.com/vis-gl/deck-gl-v8-6-now-available-with-deeper-google-maps-support-b734719076a7) and the updated documentation in the official deck.gl [site](https://deck.gl/docs/api-reference/google-maps/overview). We have also updated the documentation and examples in our site both for the [CARTO module](https://docs.carto.com/deck-gl) and the integration with [Google Maps](https://docs.carto.com/google-maps/).

---

### Support for the new CARTO platform in deck.gl 8.5

##### 2021-07-26

The release of deck.gl 8.5 adds support in our module for the upcoming version of the CARTO platform, to be released later this year. Now you can access directly datasets and tilesets hosted on your cloud data warehouse (BigQuery, Snowflake, Redshift, PostgreSQL), without needing to import first the data in the CARTO platform.

The CARTO module now includes a new [CartoLayer](https://deck.gl/docs/api-reference/carto/carto-layer) with support for all the different versions of the CARTO Maps API. You can migrate your existing code using [CartoSQLLayer](https://deck.gl/docs/api-reference/carto/carto-sql-layer#migration-to-cartolayer) and [CartoBQTilerLayer](https://deck.gl/docs/api-reference/carto/carto-bqtiler-layer#migration-to-cartolayer) by following the instructions in the docs. 

We have also added a new [getData](https://deck.gl/docs/api-reference/carto/overview#support-for-other-deckgl-layers) function to provide better support for other deck.gl layers (ArcLayer, Heatmap, H3HexagonLayer...) when working with the new version of the platform. You can retrieve the data in different formats like GeoJSON, JSON and NDJSON (to handle incremental loading).

In this version we have improved the support for vector tiles and the [MVTLayer](https://deck.gl/docs/api-reference/geo-layers/mvt-layer) is now 2x-3x faster processing tiles. You will experience improved performance with both the current and upcoming version of the platform. 

<video autoplay="" loop="" muted=""> <source src="https://docs.carto.com/img/news-developers/trips-layer.mp4" type="video/mp4"> Your browser does not support the video tag. </video>

See [what's new](https://deck.gl/docs/whats-new#deckgl-v85) in this release and check the updated documentation in the official deck.gl [site](https://deck.gl/docs/api-reference/carto/overview). We have also updated the documentation and examples within the [CARTO for deck.gl](https://docs.carto.com/deck-gl) section in our docs.

---

### Enhancing Geospatial in BigQuery with CARTO's Analytics Toolbox

##### 2021-04-29

The Analytics Toolbox is packed with functions and procedures to perform geospatial analysis using expressive and simple SQL, all natively within the data warehouse environment. The core layer of the Analytics Toolbox, which enhances the built-in GIS capabilities of the cloud data warehouses, is open source and freely available on [GitHub](https://github.com/CartoDB/carto-spatial-extension).

<video autoplay="" loop="" muted=""> <source src="https://docs.carto.com/img/news-developers/bigquery-se-core-layer.mp4" type="video/mp4"> Your browser does not support the video tag. </video>

For further information check the [blog post](https://carto.com/blog/enhancing-geospatial-in-bigquery-with-carto-spatial-extension/) and the [documentation](https://docs.carto.com/analytics-toolbox-bq/).

---

### Introducing CARTO for React

##### 2021-03-23

React is currently one of the most popular frameworks for building web applications. We are convinced that the React library along with Redux provides an unmatched environment for building Location Intelligence applications.

Today we are announcing a further development resource to help our partners and customers to be more productive building apps, by opening up the same tools we use to create CARTO itself, and announcing CARTO for React. With this announcement our goal is to make development of spatial applications at least twice as fast.

<video autoplay="" loop="" muted=""> <source src="https://docs.carto.com/img/news-developers/react-thinking-machines-app.mp4" type="video/mp4"> Your browser does not support the video tag. </video>

For further information check the [blog post](https://carto.com/blog/carto-for-react-faster-way-to-develop-spatial-applications/) and the [documentation](https://docs.carto.com/react/).

---

### Introducing CARTO for deck.gl

##### 2020-10-14

It is CARTO’s vision that you, as a developer, should be able to choose whichever mapping library you prefer for your applications. And for that reason we have been working over the last few months on adding support for one of the most popular libraries out there, deck.gl. We are so excited about its possibilities that we have decided to make it our preferred and recommended library for building spatial applications using CARTO. 

Today, we are very excited to announce that a complete CARTO module is now available as part of the deck.gl framework. This means developers can easily use CARTO APIs when building apps using the deck.gl framework.

The new CARTO modules for deck.gl allow you to visualize regular Tables in CARTO and [BigQuery Tilesets](https://carto.com/bigquery-tiler/).

<video autoplay="" loop="" muted=""> <source src="https://docs.carto.com/img/news-developers/deckgl-animation.mp4" type="video/mp4"> Your browser does not support the video tag. </video>

For additional information check the [blog post](https://carto.com/blog/carto-now-available-for-deck-gl/) and the [documentation](https://docs.carto.com/deck-gl/).

---
