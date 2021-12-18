## Spatial Relationships

### st_area
`Double st_area(Geometry g)`

If Geometry _g_ is areal, returns the area of its surface in square units of the coordinate reference system (for example, `degrees^2` for EPSG:4326). Returns `0.0` for non-areal geometries (e.g. `Points`, non-closed `LineStrings`, etc.).

### st_centroid
`Point st_centroid(Geometry g)`

Returns the geometric center of a geometry.

### st_closestPoint
`Point st_closestPoint(Geometry a, Geometry b)`

Returns the `Point` 
on a that is closest to b. This is the first `Point` of the shortest line.

### st_contains
`Boolean st_contains(Geometry a, Geometry b)`

Returns true if and only if no points of b lie in the exterior of a, and at least one `Point` of the interior of b lies in the interior of a.

### st_covers
`Boolean st_covers(Geometry a, Geometry b)`

Returns true if no `Point` in `Geometry` _b_ is outside `Geometry` _a_.

### st_crosses
`Boolean st_crosses(Geometry a, Geometry b)`

Returns true if the supplied geometries have some, but not all, interior points in common.

### st_difference
`Geometry st_difference(Geometry a, Geometry b)`

Returns the difference of the input geometries.

### st_disjoint
`Boolean st_disjoint(Geometry a, Geometry b)`

Returns true if the geometries do not “spatially intersect”; i.e., they do not share any space together. Equivalent to `NOT st_intersects(a, b)`.

### st_distance
`Double st_distance(Geometry a, Geometry b)`

Returns the 2D Cartesian distance between the two geometries in units of the coordinate reference system (e.g. degrees for EPSG:4236).

### st_distanceSphere
`Double st_distanceSphere(Geometry a, Geometry b)`

Approximates the minimum distance between two longitude/latitude geometries assuming a spherical earth.

### st_equals
`Boolean st_equals(Geometry a, Geometry b)`

Returns true if the given Geometries represent the same logical `Geometry`. Directionality is ignored.

### st_intersection
`Geometry st_intersection(Geometry a, Geometry b)`

Returns the intersection of the input geometries.

### st_intersects
`Boolean st_intersects(Geometry a, Geometry b)`

Returns true if the geometries spatially intersect in 2D (i.e. share any portion of space). Equivalent to `NOT st_disjoint(a, b)`.

### st_length
`Double st_length(Geometry geom)`

Returns the 2D path length of linear geometries, or perimeter of areal geometries, in units of the the coordinate reference system (e.g. degrees for EPSG:4236). Returns 0.0 for other geometry types (e.g. `Point`).

### st_lengthSphere
`Double st_lengthSphere(LineString line)`

Approximates the 2D path length of a `LineString` geometry using a spherical earth model. The returned length is in units of meters. The approximation is within 0.3% of st_lengthSpheroid and is computationally more efficient.

### st_overlaps
`Boolean st_overlaps(Geometry a, Geometry b)`

Returns true if the geometries have some but not all points in common, are of the same dimension, and the intersection of the interiors of the two geometries has the same dimension as the geometries themselves.

### st_relate
`String st_relate(Geometry a, Geometry b)`

Returns the DE-9IM 3x3 interaction matrix pattern describing the dimensionality of the intersections between the interior, boundary and exterior of the two geometries.

### st_relateBool
`Boolean st_relateBool(Geometry a, Geometry b, String mask)`

Returns true if the DE-9IM interaction matrix mask mask matches the interaction matrix pattern obtained from `st_relate(a, b)`.

### st_touches
`Boolean st_touches(Geometry a, Geometry b)`

Returns true if the geometries have at least one `Point` in common, but their interiors do not intersect.

### st_within
`Boolean st_within(Geometry a, Geometry b)`

Returns _true_ if geometry _a_ is completely inside geometry _b_.