## Spatial indexes

Hierarchical grid systems, such as Quadbin, H3, and S2, are an essential tool for analysing large spatial datasets, especially when dealing with data sources in different spatial aggregations. These systems are based on geospatial indexes that provide a direct relationship between grid cells at different resolutions, enabling extremely performant spatial operations.

<div class="figures-table">
    <figure class="figure">
        <img src="/img/bq-analytics-toolbox/spatial-indexes/quadkeys-microsoft.jpg" alt="Microsoft Quadkeys">
        <figcaption class="figcaption">Quadbin (<a href="https://docs.microsoft.com/en-us/bingmaps/articles/bing-maps-tile-system">source</a>)</figcaption>
    </figure>
    <figure class="figure">
        <img src="/img/bq-analytics-toolbox/spatial-indexes/h3-uber-globe.png" alt="Uber H3">
        <figcaption class="figcaption">H3 (<a href="https://h3geo.org/">source</a>)</figcaption>
    </figure>
    <figure class="figure">
        <img src="/img/bq-analytics-toolbox/spatial-indexes/s2-florida.gif" alt="S2 indexes">
        <figcaption class="figcaption">S2 (<a href="https://s2geometry.io/">source</a>)</figcaption>
    </figure>
</div>

Go to the [Reference](../../sql-reference/quadbin) for the full list of available functions and the [Examples](../../examples/spatial-indexes) to access sample code. If you can't find what you need, please let us know by opening an issue in our [Github repository](https://github.com/CartoDB/carto-spatial-extension) or become a contributor.


### Quadbin

Quadbin is a hierarchical geospatial index based on the [Bing Maps Tile System](https://docs.microsoft.com/en-us/bingmaps/articles/bing-maps-tile-system) (Quadkey). Designed to be cluster-efficient, it stores in a 64-bit number the information to uniquely identify any of the grid cells that result from uniformly subdividing a map in Mercator projection into four squares at different resolution levels, from 0 to 26 (less than 1m² at the equator). The bit layout is inspired in the H3 design, and provides different modes to store not only cells, but edges, corners or vertices.

<div class="figures-table">
    <figure class="figure">
        <img src="/img/bq-analytics-toolbox/spatial-indexes/quadkeys-multilevel-microsoft.jpg" alt="Quadbin">
        <figcaption class="figcaption" style="text-align:center">Multiple levels of quadbins (<a href="https://docs.microsoft.com/en-us/bingmaps/articles/bing-maps-tile-system">source</a>)</figcaption>
    </figure>
</div>

### H3

[H3](https://h3geo.org/) is a multiresolution hexagonal global grid system with hierarchical indexing developed by Uber. It supports sixteen resolutions, each of them composed of cells with one-seventh the area of the lower resolution containing cell. Each hexagon cell at a particular resolution is uniquely identified, and these identifiers can be easily truncated to find the coarser-containing cell. However, since a hexagon cannot be exactly subdivided into seven hexagons, this process always results in a fixed amount of shape distortion.

<div class="figures-table">
    <figure class="figure">
        <img src="/img/bq-analytics-toolbox/spatial-indexes/h3-multilevel-uber.png" alt="H3">
        <figcaption class="figcaption" style="text-align:center">Multiple levels of H3 grids (<a href="https://eng.uber.com/h3">source</a>)</figcaption>
    </figure>
</div>

Instead of constructing a grid over a planar projection like Quadbin does, H3 projects from Earth like a sphere to a regular icosahedron, and then lays out hexagonal grid cells on each of its faces.

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
        <img src="/img/bq-analytics-toolbox/spatial-indexes/s2-multilevel-google.gif" alt="S2">
        <figcaption class="figcaption" style="text-align:center">S2 cell hierarchy (<a href="https://s2geometry.io/devguide/s2cell_hierarchy">source</a>)</figcaption>
    </figure>
</div>

S2 cells are uniquely identified by a 64-bit ID, following a numbering system optimized for spatial indexing: two S2 cells whose IDs are close together will also be close together in the space. To learn more about the properties of S2 cells, refer to the library's [official documentation](https://s2geometry.io/devguide/s2cell_hierarchy).


### Placekey

[Placekey](https://www.placekey.io) is a universal identifier for any physical place built upon H3. A placekey is composed of a *What* and a *Where* part (`What@Where`), the former capturing the descriptive element of a place and the latter its geospatial position.

<div class="figures-table" style="text-align:center">
    <figure>
        <img src="/img/bq-analytics-toolbox/spatial-indexes/placekey-components.png" alt="Placekey" style="width:60%">
        <figcaption class="figcaption" style="text-align:center">Placekey components (<a href="https://www.placekey.io">source</a>)</figcaption>
    </figure>
</div>

The *What* part of a placekey is composed of two sets of three characters encoding the address and the POI, to account for the fact that multiple places can share the same address. For example, a Starbucks and a Subway in 555 Main Street will share the first three characters but differ on the other three, therefore having different *What* parts.

Finally, the *Where* part encodes the H3 hexagonal cell where the place is located. To learn more about Placekey, visit the [project's website](https://www.placekey.io).

{{% euFlagFunding %}}
