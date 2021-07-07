## Using the CartoLayer

### Introduction

The [CartoLayer](/deck-gl/reference/#cartolayer) is a deck.gl [`CompositeLayer`](https://deck.gl/docs/api-reference/core/composite-layer) used to visualize geospatial data from the CARTO platform.

It is compatible with the different versions of the CARTO Maps API (v1, v2, and v3) and takes care of connecting to the platform to retrieve the data for visualization.

### Connecting to CARTO

1. Go to [workspace](https://gcp-us-east1.app.carto.com/connections/create) and create a new connection:

TODO: create a gif creating a bq connection with the name bqconn

2. Create a public token

TODO: CURL Request to get a token for project.mydataset.mytable
 
3. Set connection parameters

A function `setDefaultCredentials` is provided to define the connection to CARTO:

```javascript
setDefaultCredentials({
  apiBaseUrl: 'https://gcp-us-east1.api.carto.com',
  apiVersion: API_VERSIONS.V3,
  accessToken: 'yourAccessToken'
});
```

For more info about the parameters of this function, check the [reference](/deck-gl/reference#setdefaultcredentials).


4. Create a layer using the connection previously created:

```javascript
new CartoLayer({
  id: 'mylayer',
  connection: 'bqconn',
  type: MAP_TYPES.TABLE,
  data: 'project.mydataset.mytable',
  pointRadiusMinPixels: 2,
  getFillColor: [200, 0, 80],
}),
```

TODO: embed a live example here with the previous table and a public token.

{{% bannerNote title="note" %}}

If you are using CARTO 2, there are some differences you need to take into account when specifying the properties:

- setDefaultCredentials needs and `username` and `apiKey`. For more info check the [reference](/deck-gl/reference#credentials).

- The `connection` parameter is not required.

```javascript
  setDefaultCredentials({
    username: 'public',
    apiKey: 'default_public'
  });

  new CartoLayer({
    type: MAP_TYPES.QUERY,
    data: 'SELECT * FROM world_population_2015',
    pointRadiusMinPixels: 2,
    getLineColor: [0, 0, 0, 0.75],
    getFillColor: [238, 77, 90],
    lineWidthMinPixels: 1
  });
```

{{%/ bannerNote %}}

### Public vs Private Layers

When you retrieve data from a cloud data warehouse connection you need to provide an access token that authorizes access to the data. The way of generating this access token is different if your application is private or public.

####  Get a public token
If you are building a public application, you need to create a public token (TODO: link to API doc) for the datasets of your application. 

TODO: Add CURL example to get a token

####  Get a private token

CARTO uses OAuth to manage private access to the platform, you need to use CARTO for React (TODO: link to CARTO for React cloud native guide).

{{% bannerNote title="note" %}}

If you are using CARTO 2, the authentication is based on the `username`/`apiKey` combination. 

For private datasets, you need to create an [API key](https://docs.carto.com/authorization/#api-keys) that provides access to the datasets you are going to use in your application.

{{%/ bannerNote %}}

### Support for other deck.gl layers

The `CartoLayer` uses the `GeoJsonLayer` for rendering but you can also use any other deck.gl layer for rendering using the `getData` function from the CARTO module. This works for datasets with less than 200k rows but not for bigger datasets where you need to use a tileset.

This function expects the same connection parameters than the `CartoLayer` described above:

- [connection](deck-gl/reference/#connection-string)
- [type](deck-gl/reference/#type-string)
- [data](deck-gl/reference/#data-string)
- [format](deck-gl/reference/#formats)

```javascript
import { getData, FORMATS } from '@deck.gl/carto';
import { H3HexagonLayer } from '@deck.gl/geo-layers/';

const data =  await getData({
  type: MAP_TYPES.QUERY,
  source: `SELECT bqcarto.h3.ST_ASH3(internal_point_geom, 4) as h3, count(*) as count
              FROM bigquery-public-data.geo_us_census_places.us_national_places 
            GROUP BY h3`,
  connection: 'connection_name',
  format: FORMATS.JSON
});

new H3HexagonLayer({
  data,
  filled: true,
  getHexagon: d => d.h3,
  getFillColor: d => [0, (1 - d.count / 10) * 255, 0],
  getLineColor: [0, 0, 0, 200],
});
```

{{% bannerNote title="note" %}}

If you are using CARTO 2, there isn't an equivalent function to the `getData` function but you can use the SQL API to retrieve the data in JSON or GeoJSON format depending on the layer you want to use. Please check the `ArcLayer` [example](/deck-gl/examples/advanced-examples/arc-layer) to see how it works.

{{%/ bannerNote %}}