## Spatial indexes

Hierarchical grid systems, such as Quadkey, H3, and S2, are an essential tool for analysing large spatial datasets, especially when dealing with data sources in different spatial aggregations. These systems are based on geospatial indexes that provide a direct relationship between grid cells at different resolutions, enabling extremely performant spatial operations.

CARTO's Analytics Toolbox provides access to the most popular spatial indexes libraries through User Defined Functions (UDFs):

<div class="figures-table">
    <figure class="figure">
        <img src="/img/bq-analytics-toolbox/spatial-indexes/quadkeys-microsoft.jpg" alt="Microsoft Quadkeys">
        <figcaption class="figcaption">Quadkey (<a href="https://docs.microsoft.com/en-us/bingmaps/articles/bing-maps-tile-system">source</a>)</figcaption>
    </figure>
    <figure class="figure">
        <img src="/img/bq-analytics-toolbox/spatial-indexes/h3-uber-globe.png" alt="Uber H3">
        <figcaption class="figcaption">Uber's H3 (<a href="https://eng.uber.com/h3/">source</a>)</figcaption>
    </figure>
    <figure class="figure">
        <img src="/img/bq-analytics-toolbox/spatial-indexes/s2-florida.gif" alt="S2 indexes">
        <figcaption class="figcaption">S2 (<a href="https://s2geometry.io/devguide/examples/coverings">source</a>)</figcaption>
    </figure>
</div>

Go to the [Reference](../../sql-reference/quadkey) for the full list of available functions and the [Examples](../../examples/spatial-indexes) to access sample code. If you can't find what you need, please let us know by opening an issue in our [Github repository](https://github.com/CartoDB/carto-spatial-extension) or become a contributor. 


### Quadkey

Quadkey uniquely identifies any of the grid cells (or map tiles) that result from uniformly subdividing a map in Mercator projection into rows and columns at different levels of detail. A quadkey is a single value whose length is equal to the level of detail of the tile it identifies, ranging from one digit (lowest level of detail) to 23 digits (highest level of detail). Moreover, a quadkey is composed of the quadkey of its parent tile (containing tile at the previous level of detail) plus an extra digit. 

<div class="figures-table">
    <figure class="figure">
        <img src="/img/bq-analytics-toolbox/spatial-indexes/quadkeys-multilevel-microsoft.jpg" alt="Multiresolution quadkeys">
        <figcaption class="figcaption" style="text-align:center">Multiple levels of quadkeys (<a href="https://docs.microsoft.com/en-us/bingmaps/articles/bing-maps-tile-system">source</a>)</figcaption>
    </figure>
</div>


Quadkeys were developed by Microsoft to provide interactive mapping solutions. You can learn more in its documentation, the [Bings Maps Tile System](https://docs.microsoft.com/en-us/bingmaps/articles/bing-maps-tile-system).


##### Quadint

Quadkeys have as many digits as the zoom level to which they belong, which can lead to a lot of storage waste for high zoom levels and prevents fast comparison as they are internally treated as `STRING`, requiring a digit-by-digit evaluation. To overcome this limitation, in this module we use quadints, an encoded version of [quadkeys](https://wiki.openstreetmap.org/wiki/QuadTiles) stored in an `INT64`. Quadints offer faster comparison as the whole number is compared all at once.

To encode a quadkey into a quadint we transform into an `INT64` the bits referring to the tile Y, then the ones concerning tile X and finally we reserve 5 bits for storing the zoom level, i.e., `[ Bits Tile Y | Bits Tile X | 5 Bits for zoom ]`. This encoding introduces the limitation of not being able to encode tiles for zoom levels higher than 29, as they cannot be stored in 64 bits. 

In this module, we also provide the functions necessary to convert quadints into quadkeys and vice-versa.


### H3

[H3](https://h3geo.org/) is a multiresolution hexagonal global grid system with hierarchical indexing developed by Uber. It supports sixteen resolutions, each of them composed of cells with one-seventh the area of the lower resolution containing cell. Each hexagon cell at a particular resolution is uniquely identified, and these identifiers can be easily truncated to find the coarser-containing cell. However, since a hexagon cannot be exactly subdivided into seven hexagons, this process always results in a fixed amount of shape distortion.  

<div class="figures-table">
    <figure class="figure">
        <img src="/img/bq-analytics-toolbox/spatial-indexes/h3-multilevel-uber.png" alt="Multiresolution quadkeys">
        <figcaption class="figcaption" style="text-align:center">Multiple levels of H3 grids (<a href="https://eng.uber.com/h3">source</a>)</figcaption>
    </figure>
</div>

Instead of constructing a grid over a planar projection like Quadkey does, H3 projects from Earth like a sphere to a regular icosahedron, and then lays out hexagonal grid cells on each of its faces.

One of the most powerful properties of H3 is that all neighboring hexagons of a particular cell are at an equal distance. This enables fast computation of grid distances between hexagons and neighbouring areas around an index using the [DISTANCE](../../sql-reference/h3/#distance) and [KRING](../../sql-reference/h3/#kring) functions, respectively.

<div class="figures-table">
    <figure class="figure">
        <img src="/img/bq-analytics-toolbox/spatial-indexes/h3_kring_comparison.png" alt="H3 KRing">
        <figcaption class="figcaption" style="text-align:center">kRings of distance 1, 2 and 3 around an H3 index of resolution 11.</figcaption>
    </figure>
</div>

### S2

[S2](https://s2geometry.io), developed by Google, works exclusively with spherical projections. By mapping points on the Earth's surface to a sphere, S2 minimises distortion and avoids discontinuities such as the discontinuity along the 180-degree meridian present in the Mercator projection.

S2 enables the decomposition of the unit sphere into a hierarchy of cells, each of which is a quadrilateral formed by four geodesics. The cell hierarchy starts at level 0 and goes all the way down to 30, where cells represent approximately 1 squared cm. Level 0 is composed of six cells and lower levels are computed by subdividing each cell into four. 

<div class="figures-table">
    <figure class="figure">
        <img src="/img/bq-analytics-toolbox/spatial-indexes/s2-multilevel-google.gif" alt="Multiresolution quadkeys">
        <figcaption class="figcaption" style="text-align:center">S2 cell hierarchy (<a href="https://s2geometry.io/devguide/s2cell_hierarchy">source</a>)</figcaption>
    </figure>
</div>

S2 cells are uniquely identified by a 64-bit ID, following a numbering system optimized for spatial indexing: two S2 cells whose IDs are close together will also be close together in the space. To learn more about the properties of S2 cells, refer to the library's [official documentation](https://s2geometry.io/devguide/s2cell_hierarchy).


### Placekey

[Placekey](https://www.placekey.io) is a universal identifier for any physical place built upon H3. A placekey is composed of a *What* and a *Where* part (`What@Where`), the former capturing the descriptive element of a place and the latter its geospatial position.  

<div class="figures-table" style="text-align:center">
    <figure>
        <img src="/img/bq-analytics-toolbox/spatial-indexes/placekey-components.png" alt="Placekey components" style="width:60%">
        <figcaption class="figcaption" style="text-align:center">Placekey components (<a href="https://www.placekey.io">source</a>)</figcaption>
    </figure>
</div>

The *What* part of a placekey is composed of two sets of three characters encoding the address and the POI, to account for the fact that multiple places can share the same address. For example, a Starbucks and a Subway in 555 Main Street will share the first three characters but differ on the other three, therefore having different *What* parts. 

Finally, the *Where* part encodes the H3 hexagonal cell where the place is located. To learn more about Placekey, visit the [project's website](https://www.placekey.io).
