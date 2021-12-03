## Spatial Relationships

### st_area
`Double st_area(Geometry geom)`

If `Geometry` _geom_ is areal, returns the area of its surface in square units of the coordinate reference system (for example, degrees^2 for EPSG:4326). Returns `0.0` for non-areal geometries (e.g. Points, non-closed LineStrings, etc.).

### st_centroid
`Point st_centroid(Geometry g)`

Returns the geometric center of a geometry.

### st_contains
`Boolean st_contains(Geometry a, Geometry b)`

Returns true if and only if no points of `b` lie in the exterior of `a`, and at least one point of the interior of `b` lies in the interior of `a`.

### st_covers
`Boolean st_covers(Geometry a, Geometry b)`

Returns true if no point in `Geometry` _b_ is outside `Geometry` _a_.

### st_crosses
`Boolean st_crosses(Geometry a, Geometry b)`

Returns true if the supplied geometries have some, but not all, interior points in common.

### st_difference
`Geometry st_difference(Geometry a, Geometry b)`

Returns the difference of the input geometries.

### st_disjoint
`Boolean st_disjoint(Geometry a, Geometry b)`

Returns true if the geometries do not “spatially intersect”; i.e., they do not share any space together. Equivalent to `NOT st_intersects(a, b)`.

### st_equals
`Boolean st_equals(Geometry a, Geometry b)`

### st_intersection
`Geometry st_intersection(Geometry a, Geometry b)`

Returns the intersection of the input geometries.

### st_intersects
`Boolean st_intersects(Geometry a, Geometry b)`

Returns true if the geometries spatially intersect in 2D (i.e. share any portion of space). Equivalent to `NOT st_disjoint(a, b)`.

### st_overlaps
`Boolean st_overlaps(Geometry a, Geometry b)`

Returns true if the geometries have some but not all points in common, are of the same dimension, and the intersection of the interiors of the two geometries has the same dimension as the geometries themselves.

### st_touches
`Boolean st_touches(Geometry a, Geometry b)`

Returns true if the geometries have at least one point in common, but their interiors do not intersect.

### st_within
`Boolean st_within(Geometry a, Geometry b)`

Returns true if geometry _a_ is completely inside geometry _b_.

