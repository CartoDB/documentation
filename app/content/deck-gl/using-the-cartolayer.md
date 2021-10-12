## Using the CartoLayer

### Introduction

The [CartoLayer](/deck-gl/reference/#cartolayer) is a deck.gl [`CompositeLayer`](https://deck.gl/docs/api-reference/core/composite-layer) used to visualize geospatial data from the CARTO platform.

It is compatible with the different versions of the CARTO Maps API (v1, v2, and v3) and is responsible for connecting to the platform in order to retrieve the data for visualization.

### Connecting to CARTO 3

1. Go to the Workspace and create a new connection:

   <video height="425" autoplay="" loop="" muted=""> <source src="/img/deck-gl/workspace-connection.mp4" type="video/mp4"> Your browser does not support the video tag. </video>

  {{% bannerNote title="note" %}}
  `carto_dw` connection is also available for users who don't have a data warehouse.
  {{%/ bannerNote %}}
  

2. Create a token using our token API with access to the required table.

   ```shell
   curl --location -g --request POST 'https://gcp-us-east1.api.carto.com/v3/tokens?access_token=eyJhb...' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "grants": [
            {
                "connection_name": "bqconn",
                "source": "cartobq.public_account.populated_places"
            }
        ],
      
    }'
   ```

3. Set connection parameters

   A function `setDefaultCredentials` is provided to define the connection parameters to CARTO:

   ```javascript
   setDefaultCredentials({
     apiBaseUrl: 'https://gcp-us-east1.api.carto.com',
     apiVersion: API_VERSIONS.V3,
     accessToken: 'eyJhbGciOiJIUzI1NiJ9.eyJhIjoiYWNfbHFlM3p3Z3UiLCJqdGkiOiI1YjI0OWE2ZCJ9.Y7zB30NJFzq5fPv8W5nkoH5lPXFWQP0uywDtqUg8y8c'
   });
   ```

   For more info about the parameters of this function, check the [reference](/deck-gl/reference#setdefaultcredentials).


4. Create a layer using the previously created connection:

   ```javascript
   new CartoLayer({
     id: 'places',
     connection: 'bqconn',
     type: MAP_TYPES.TABLE,
     data: 'cartobq.public_account.populated_places',
     pointRadiusMinPixels: 2,
     getFillColor: [200, 0, 80],
   }),
   ```

   <iframe
       id="getting-started-final-result"
       src="../examples/basic-examples/hello-world-carto3.html"
       width="100%"
       height="500"
       frameBorder="0">
   </iframe>

   > View the complete example [here](../examples/basic-examples/hello-world-carto3.html)
   
   <br/>

{{% bannerNote title="note" %}}

If you are using CARTO 2, there are some differences you need to take into account when specifying the properties:

- setDefaultCredentials needs an `username` and `apiKey`. For more info check the [reference](/deck-gl/reference#credentials) or our guide for [Managing your API keys](/authorization/#managing-your-api-keys) 

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



### Support for other deck.gl layers

The `CartoLayer` uses the `GeoJsonLayer` for rendering but you can also use any other deck.gl layer for rendering using the `getData` function from the CARTO module. This works for datasets with less than 200k rows but not for bigger datasets where you need to use a tileset.

This function receives an object with the following properties:

- [connection](../reference#connection-string)
- [type](../reference#type-string)
- [source](../reference#data-string) (equivalent to the `data` property for `CartoLayer`)
- [format](../reference#formats)

If the format is not explicitly specified, `getData` will pick a format automatically, depending on what is available from the CARTO API. The `getData` function returns an `Object` with the following properties:
  - `format`: the format of the returned data 
  - `data`: the actual data response
  
```javascript
import { getData, FORMATS } from '@deck.gl/carto';
import { H3HexagonLayer } from '@deck.gl/geo-layers/';

const result =  await getData({
  type: MAP_TYPES.QUERY,
  source: `SELECT `carto-un`.h3.ST_ASH3(internal_point_geom, 4) as h3, count(*) as count
              FROM bigquery-public-data.geo_us_census_places.us_national_places 
            GROUP BY h3`,
  connection: 'connection_name',
  format: FORMATS.JSON
});
const data = result.data;

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