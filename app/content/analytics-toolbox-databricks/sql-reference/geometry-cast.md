## Geometry Cast

### st_castToLineString
`LineString st_castToLineString(Geometry g)`

Casts `Geometry` _g_ to a LineString.

### st_castToPoint
`Point st_castToPoint(Geometry g)`

Casts `Geometry` _g_ to a Point.

### st_castToPolygon
`Polygon st_castToPolygon(Geometry g)`

Casts `Geometry` _g_ to a Polygon.

### st_castToGeometry
`Geometry st_castToGeometry(Geometry g)`

Casts `Geometry` subclass _g_ to a `Geometry`. This can be necessary e.g. when storing the output of `st_makePoint` as a `Geometry` in a case class.

### st_byteArray
`Array[Byte] st_byteArray(String s)`

Encodes string _s_ into an array of bytes using the UTF-8 charset.