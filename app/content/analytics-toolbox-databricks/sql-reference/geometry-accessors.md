## Geometry Accessors

### st_boundary
`Geometry st_boundary(Geometry geom)`

Returns the boundary, or an empty `Geometry` of appropriate dimension, if geom is empty.

### st_coordDim
`Int st_coordDim(Geometry geom)`

Returns the number of dimensions of the coordinates of `Geometry` geom.

### st_dimension
`Int st_dimension(Geometry geom)`

Returns the inherent number of dimensions of this `Geometry` object, which must be less than or equal to the coordinate dimension.

### st_envelope
`Geometry st_envelope(Geometry geom)`

Returns a `Geometry` representing the bounding box of geom.

### st_exteriorRing
`LineString st_exteriorRing(Geometry geom)`

Returns a `LineString` representing the exterior ring of the geometry; returns null if the `Geometry` is not a `Polygon`.

### st_geometryN
`Int st_geometryN(Geometry geom, Int n)`

Returns the _n_-th `Geometry` (1-based index) of _geom_ if the `Geometry` is a `GeometryCollection`, or _geom_ if it is not.

### st_interiorRingN
`Int st_interiorRingN(Geometry geom, Int n)`

Returns the n-th interior `LineString` ring of the `Polygon` geom. Returns null if the `Geometry` is not a `Polygon` or the given _n_ is out of range.

### st_isClosed
`Boolean st_isClosed(Geometry geom)`

Returns true if geom is a `LineString` or `MultiLineString` and its start and end points are coincident. Returns true for all other `Geometry` types.

### st_isCollection
`Boolean st_isCollection(Geometry geom)`

Returns `true` if _geom_ is a `GeometryCollection`.

### st_isEmpty
`Boolean st_isEmpty(Geometry geom)`

Returns `true` if _geom_ is empty.

### st_isGeomField
`Boolean st_isGeomField(String geom)`

Returns `true` if _geom_ is string containing WKT or WKB representation of a geometry.

### st_isRing
`Boolean st_isRing(Geometry geom)`

Returns `true` if _geom_ is a `LineString` or a `MultiLineString` and is both closed and simple.

### st_isSimple
`Boolean st_isSimple(Geometry geom)`
Returns `true` if _geom_ has no anomalous geometric points, such as self intersection or self tangency.

### st_isValid
`Boolean st_isValid(Geometry geom)`

Returns `true` if the `Geometry` is topologically valid according to the OGC SFS specification.

### st_numGeometries
`Int st_numGeometries(Geometry geom)`

If _geom_ is a `GeometryCollection`, returns the number of geometries. For single geometries, returns `1`,

### st_numPoints
`Int st_numPoints(Geometry geom)`

Returns the number of vertices in `Geometry` _geom_.

### st_pointN
`Point st_pointN(Geometry geom, Int n)`

If _geom_ is a `LineString`, returns the _n_-th vertex of _geom_ as a `Point`. Negative values are counted backwards from the end of the `LineString`. Returns `null` if _geom_ is not a `LineString`.

### st_x
`Float st_X(Geometry geom)`

If _geom_ is a `Point`, return the X coordinate of that point.

### st_y
`Float st_y(Geometry geom)`

If _geom_ is a `Point`, return the Y coordinate of that point.