## Geometry Constructors

### st_exteriorRing

`LineString st_exteriorRing(Geometry geom)`

Returns a `LineString` representing the exterior ring of the geometry; returns _null_ if the `Geometry` is not a `Polygon`.

### st_geomFromWKB
`Geometry st_geomFromWKB(Array[Byte] wkb)`

Creates a `Geometry` from the given Well-Known Binary representation ([WKB](https://en.wikipedia.org/wiki/Well-known_text_representation_of_geometry#Well-known_binary)).

### st_geomFromWKT
`Geometry st_geomFromWKT(String wkt)`

Creates a Geometry from the given Well-Known Text representation ([WKT](https://en.wikipedia.org/wiki/Well-known_text)).

### st_pointFromWKB
`Point st_pointFromWKB(Array[Byte] wkb)`

Creates a `Point` corresponding to the given [WKB](https://en.wikipedia.org/wiki/Well-known_text_representation_of_geometry#Well-known_binary) representation.


### st_makeBBOX
`Geometry st_makeBBOX(Double lowerX, Double lowerY, Double upperX, Double upperY)`

Creates a `Geometry` representing a bounding box with the given boundaries.

### st_makeLine
`LineString st_makeLine(Seq[Point] points)`

Creates a `LineString` using the given sequence of vertices in _points_.

