## Geometry Outputs

### st_asBinary
`Array[Byte] st_asBinary(Geometry geom)`

Returns `Geometry` _geom_ in WKB representation.

### st_asGeoJSON
`String st_asGeoJSON(Geometry geom)`

Returns `Geometry` _geom_ in GeoJSON representation.

### st_asLatLonText
`String st_asLatLonText(Point p)`

Returns a `String` describing the latitude and longitude of `Point` _p_ in degrees, minutes, and seconds. (This presumes that the units of the coordinates of _p_ are latitude and longitude.)

### st_asText
`String st_asText(Geometry geom)`

Returns `Geometry` _geom_ in WKT representation

### st_geoHash
`String st_geoHash(Geometry geom, Int prec)`

Returns the Geohash (in base-32 representation) of an interior point of `Geometry` _geom_. See [Geohash](https://www.geomesa.org/documentation/stable/user/appendix/utils.html#geohash) for more information on Geohashes.