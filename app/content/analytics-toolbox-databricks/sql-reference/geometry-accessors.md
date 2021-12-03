## Geometry Accessors

### st_numGeometries
`Int st_numGeometries(Geometry geom)`

If _geom_ is a `GeometryCollection`, returns the number of geometries. For single geometries, returns 1,

### st_numPoints
`Int st_numPoints(Geometry geom)`

Returns the number of vertices in `Geometry` _geom_.

### st_X
`Float st_X(Geometry geom)`

If _geom_ is a `Point`, return the X coordinate of that point.

### st_Y
`Float st_Y(Geometry geom)`

If _geom_ is a `Point`, return the Y coordinate of that point.
