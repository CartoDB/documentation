## Geometry Constructors


### st_box2DFromGeoHash
`Geometry st_box2DFromGeoHash(String geohash, Int prec)`

Alias of st_geomFromGeoHash.

### st_geomFromGeoHash
`Geometry st_geomFromGeoHash(String geohash, Int prec)`

Returns the `Geometry` of the bounding box corresponding to the Geohash string _geohash_ (base-32 encoded) with a precision of prec bits. See [Geohash](https://www.geomesa.org/documentation/stable/user/appendix/utils.html#geohash) for more information on GeoHashes.

### st_geomFromGeoJSON
`Geometry st_geomFromGeoJSON(String geojsonGeometry)`

Creates a `Geometry` from the given GeoJSON.

### st_geomFromWKB
`Geometry st_geomFromWKB(Array[Byte] wkb)`

Creates a `Geometry` from the given Well-Known Binary representation (WKB).

### st_geomFromWKT
`Geometry st_geomFromWKT(String wkt)`

Creates a `Geometry` from the given Well-Known Text representation (WKT).

### st_geometryFromText
`Geometry st_geometryFromText(String wkt)`

Alias of st_geomFromWKT

### st_lineFromText
`LineString st_lineFromText(String wkt)`

Creates a `LineString` from the given WKT representation.

### st_mLineFromText
`MultiLineString st_mLineFromText(String wkt)`

Creates a `MultiLineString` corresponding to the given WKT representation.

### st_mPointFromText
`MultiPoint st_mPointFromText(String wkt)`

Creates a `MultiPoint` corresponding to the given WKT representation.

### st_mPolyFromText
`MultiPolygon st_mPolyFromText(String wkt)`

Creates a `MultiPolygon` corresponding to the given WKT representation.

### st_makeBBOX
`Geometry st_makeBBOX(Double lowerX, Double lowerY, Double upperX, Double upperY)`

Creates a `Geometry` representing a bounding box with the given boundaries.

### st_makeBox2D
`Geometry st_makeBox2D(Point lowerLeft, `Point` upperRight)`

Creates a `Geometry` representing a bounding box defined by the given `Points`.

### st_makeLine
`LineString st_makeLine(Seq[Point] points)`

Creates a `LineString` using the given sequence of vertices in points.

### st_makePoint
`Point st_makePoint(Double x, Double y)`

Creates a `Point` with an _x_ and _y_ coordinate.

### st_makePointM
`Point st_makePointM(Double x, Double y, Double m)`

Creates a `Point` with an _x_, _y_, and _m_ coordinate.

### st_makePolygon
`Polygon st_makePolygon(LineString shell)`

Creates a `Polygon` formed by the given `LineString` shell, which must be closed.

### st_point
`Point st_point(Double x, Double y)`

Returns a `Point` with the given coordinate values. This is an OGC alias for st_makePoint.

### st_pointFromGeoHash
`Point st_pointFromGeoHash(String geohash, Int prec)`

Return the `Point` at the geometric center of the bounding box defined by the Geohash string _geohash_ (base-32 encoded) with a precision of prec bits. See [Geohash](https://www.geomesa.org/documentation/stable/user/appendix/utils.html#geohash) for more information on Geohashes.

### st_pointFromText
`Point st_pointFromText(String wkt)`

Creates a `Point` corresponding to the given WKT representation.

### st_pointFromWKB
`Point st_pointFromWKB(Array[Byte] wkb)`

Creates a `Point` corresponding to the given WKB representation.

### st_polygonFromText
`Polygon st_polygonFromText(String wkt)`

Creates a `Polygon` corresponding to the given WKT representation.

