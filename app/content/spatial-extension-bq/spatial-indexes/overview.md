## Overview

Hierarchical grid systems, such as Quadkeys, H3 and S2, are an essential tool for analysing large spatial datasets, especially when dealing with data sources in different spatial aggregations. These systems are based on geospatial indexes that provide a direct relationship between grid cells at different resolutions, enabling extremely performant spatial operations.

<div class="figures-table">
    <figure class="figure">
        <img src="/img/bq-spatial-extension/spatial-indexes/quadkeys-microsoft.jpg" alt="Microsoft Quadkeys">
        <figcaption class="figcaption">Quadkeys (<a href="https://docs.microsoft.com/en-us/bingmaps/articles/bing-maps-tile-system">source</a>)</figcaption>
    </figure>
    <figure class="figure">
        <img src="/img/bq-spatial-extension/spatial-indexes/h3-uber-globe.png" alt="Uber H3">
        <figcaption class="figcaption">Uber's H3 (<a href="https://eng.uber.com/h3/">source</a>)</figcaption>
    </figure>
    <figure class="figure">
        <img src="/img/bq-spatial-extension/spatial-indexes/s2-florida.gif" alt="S2 indexes">
        <figcaption class="figcaption">S2 (<a href="https://s2geometry.io/devguide/examples/coverings">source</a>)</figcaption>
    </figure>
</div>

CARTO's Spatial Extension provides access to the most popular spatial indexes libraries through BigQuery [user-defined functions](https://cloud.google.com/bigquery/docs/reference/standard-sql/user-defined-functions) (UDFs). These functions are public to everyone and ready to be used on your regular SQL on BigQuery. The full list of functions is available in the [Reference](/spatial-extension-bq/reference). If you can't find what you need, please let us know by opening an issue in our [Github repository](https://github.com/CartoDB/carto-spatial-extension) or become a contributor. 


### Quadkeys

Quadkeys uniquely identify any of the grid cells (or map tiles) that result from uniformly subdividing a map in Mercator projection in rows and columns at different levels of detail. A quadkey is a single value whose length is equal to the level of detail of the tile it identifies, ranging from one digit (lowest level of detail) to 23 digits (highest level of detail). Moreover, a quadkey is composed by the quadkey of its parent tile (containing tile at the previous level of detail) plus an extra digit. 

<div class="figures-table">
    <figure class="figure">
        <img src="/img/bq-spatial-extension/spatial-indexes/quadkeys-multilevel-microsoft.jpg" alt="Multiresolution quadkeys">
        <figcaption class="figcaption" style="text-align:center">Multiple levels of quadkeys (<a href="https://docs.microsoft.com/en-us/bingmaps/articles/bing-maps-tile-system">source</a>)</figcaption>
    </figure>
</div>


Quadkeys were developed by Microsoft to provide interactive mapping solutions. You can learn more in its documentation, the [Bings Maps Tile System](https://docs.microsoft.com/en-us/bingmaps/articles/bing-maps-tile-system).

##### Quadints

Quadkeys have as many digits as the zoom level to which they belong, which can lead to a lot of storage waste for high zoom levels and prevents fast comparison as they are internally treated as `STRING`, requiring a digit-by-digit evaluation. To overcome this limitation, on this module we use Quadints, our own version of [Quadkeys](https://wiki.openstreetmap.org/wiki/QuadTiles) that are stored in an `INT64`. Quadints offer faster comparision as the whole number is compared all at once.

To encode a Quadkey into a Quadint we transform into an `INT64` the bits referring to the tile Y, then the ones concerning tile Y and finally we reserve 5 bits for storing the zoom level, i.e., `[ Bits Tile Y | Bits Tile X | 5 Bits for zoom ]`. This encoding introduces the limitation of not being able to encode tiles for zoom levels higher than 29, as they cannot be stored in 64 bits. 

On this module, we also provide the functions necessary to convert Quadints into Quadkeys and viceversa.


### H3

H3 is a multiresolution hexagonal global grid system with hierarchical indexing. It supports sixteen resolutions, each of them composed by cells with one seventh the area of the lower resolution containing cell. Each hexagon cell at a particular resolution is uniquely identified, and these identifiers can be easily truncated to find the coarser containing cell. However, since an hexagon cannot be exactly subdivided into seven hexagons, this process results in a fixed amount of shape distortion.  

<div class="figures-table">
    <figure class="figure">
        <img src="/img/bq-spatial-extension/spatial-indexes/h3-multilevel-uber.png" alt="Multiresolution quadkeys">
        <figcaption class="figcaption" style="text-align:center">Multiple levels of H3 grids (<a href="https://docs.microsoft.com/en-us/bingmaps/articles/bing-maps-tile-system">source</a>)</figcaption>
    </figure>
</div>

One of the most powerful properties of H3 is that all neighboring hexagons of a particular cell are at an equal distance. This enables fast computation of grid distances between hexagons and neighbouring areas around an index using the [DISTANCE](/spatial-extension-bq/reference/#h3kring) and [KRING](/spatial-extension-bq/reference/#h3distance) functions, respectively. 


### S2

### Placekey
