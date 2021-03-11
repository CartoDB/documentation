## Overview

CARTO's Spatial Extension provides access to the most popular spatial indexes libraries through BigQuery [user-defined functions](https://cloud.google.com/bigquery/docs/reference/standard-sql/user-defined-functions) (UDFs). These functions are The full list of functions is available in the [Reference](/spatial-extension-bq/reference). If you can't find what you need, please let us know by opening an issue in our [Github repository](https://github.com/CartoDB/carto-spatial-extension) or become a contributor. 

Hierarchical grid systems, such as Quadkeys, H3 and S2 are an essential tool for analysing large spatial datasets, especially when dealing with data sources in different spatial aggregations. These systems are based on geospatial indexes that provide a direct relationship between grid cells at different resolutions, enabling extremely performant spatial operations.

<div class="row" style="display:flex">
  <div class="column" style="flex-grow:1;flex-shrink:0;flex-basis:300px;">
    <figure>
        <div style="width:100%;height:300px">
            <img src="/img/bq-spatial-extension/spatial-indexes/quadkeys-microsoft.jpg" alt="Microsoft Quadkeys">
        </div>
        <figcaption style="width:100%;text-align:center">Quadkeys (<a href="https://docs.microsoft.com/en-us/bingmaps/articles/bing-maps-tile-system">source</a>)</figcaption>
    </figure>
  </div>
  <div class="column" style="flex-grow:1;flex-shrink:0;flex-basis:300px;">
    <figure>
        <div style="width:100%;height:300px">
            <img src="/img/bq-spatial-extension/spatial-indexes/h3-uber-globe.png" alt="Uber H3">
        </div>
        <figcaption style="width:100%;text-align:center">Uber's H3 grid system (<a href="https://eng.uber.com/h3/">source</a>)</figcaption>
    </figure>
  </div>
  <div class="column" style="flex-grow:1;flex-shrink:0;flex-basis:300px;">
    <figure>
        <div style="width:100%;height:300px">
            <img src="/img/bq-spatial-extension/spatial-indexes/s2-florida.gif" alt="S2 indexes">
        </div>
        <figcaption style="width:100%;text-align:center">Uber's H3 grid system (<a href="https://s2geometry.io/devguide/examples/coverings">source</a>)</figcaption>
    </figure>
  </div>
</div>

CARTO's Spatial Extension provides access to the most popular spatial indexes systems through BigQuery [user-defined functions](https://cloud.google.com/bigquery/docs/reference/standard-sql/user-defined-functions) (UDFs). The full list of available functions is available in the [Reference](/spatial-extension-bq/reference). If you can't find what you need, please let us know by opening an issue in our [Github repository](https://github.com/CartoDB/carto-spatial-extension) or become a contributor. 

### Quadkeys

Quadkeys enable to uniquely identify by a single value any of the grid cells that result from uniformly subdividing a map in Mercator projection in rows and columns at different zoom levels.

<div>
    <figure>
        <img src="/img/bq-spatial-extension/spatial-indexes/quadkeys-multilevel-microsoft.jpg" alt="Multiresolution quadkeys">
        <figcaption style="text-align:center">Multiresolution quadkeys (<a href="https://docs.microsoft.com/en-us/bingmaps/articles/bing-maps-tile-system">source</a>)</figcaption>
    </figure>
</div>


Quadkeys were developed by Microsoft to provide interactive mapping solutions. You can learn more in its documentation, the [Bings Maps Tile System](https://docs.microsoft.com/en-us/bingmaps/articles/bing-maps-tile-system).


### H3

H3 is a multiresolution hexagonal global grid system with hierarchical indexing. 

### S2

### Placekey
