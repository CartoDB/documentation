## Using the CartoLayer

### Introduction

The `CartoLayer` is a deck.gl [`CompositeLayer`](https://deck.gl/docs/api-reference/core/composite-layer) used to visualize geospatial data from the CARTO platform.

It is compatible with the different versions of the CARTO Maps API (v1, v2, and v3) and takes care of connecting to the platform to retrieve the data for visualization.

It accepts a credential object with the configuration for connecting with the platform and a set of properties for identifying the dataset to retrieve.

### Connecting to CARTO

The CartoLayer uses the credentials specified with the `setDefaultCredentials` function by default but it can override these credentials. In order to connect to the CARTO platform you need to specify the following properties:

- `apiBaseUrl`. This is the API base URL to connect to your instance. Points by default to the CARTO US-EAST-1 instance on the Google Cloud Platform: `https://gcp-us-east1.api.carto.com`. You can check your URL in the `Developers` section within the Workspace.
  
- `apiVersion`. This is the API version. Points by default to v2 (`API_VERSIONS.V2`). To specify the API version the CARTO module includes an enumeration named `API_VERSIONS`, including constants for the different supported Maps API versions. For CARTO 3 you need to set it to `API_VERSIONS.V3`.
   
- `accessToken`. This is the access token that authorizes access to the dataset. Depending on your application you will use access tokens retrieved using the OAuth protocol or public tokens. More on that on the [Public vs Private Layers](#public-vs-private-layers) section below. 

In addition to the `credentials` object, you need to specify the properties to retrieve your dataset:

- `connection`. Connection to the cloud data source. You need to setup a connection in the Workspace to the cloud data warehouse / database where you are hosting the datasets you want to visualize. 

- `type`. Type of dataset. You can specify a table name, a SQL query or a tileset name. There is an enumeration called `MAP_TYPES` with the different types supported. Tables and SQL queries are limited to 200k rows; if the dataset size is bigger, you must pre-generate a tileset.

- `data`. Table name, SQL query or tileset name to retrieve data from. 

Then you can specify additional deck.gl properties for rendering and interactivity. The CartoLayer uses the `GeoJsonLayer` for rendering (directly for GeoJSON sources or through the `MVTLayer` for vector tile sources) so you can use any of the properties accepted by this layer.

The code for instantiating a `CartoLayer` from a BigQuery dataset filtered out using a SQL query will be the following (assumming a BigQuery connection named `bqconn` has been created in the Workspace and the default CARTO instance):

```javascript
setDefaultCredentials({
  apiVersion: API_VERSIONS.V3,
  accessToken: 'XXXXXX'
});

new CartoLayer({
  id: 'mylayer',
  connection: 'bqconn',
  type: MAP_TYPES.QUERY,
  data: 'SELECT geom, field1, field2 FROM mydataset.mytable',
  pointRadiusMinPixels: 2,
  getFillColor: [200, 0, 80],
}),
```

{{% bannerNote title="note" %}}

If you are using CARTO 2, there are some differences you need to take into account when specifying the properties:

- Authorization is not performed using an `accessToken` but you need to specify your CARTO `username` and `apiKey`.

- The `connection` parameter is not used. The `CartoLayer` connects by default with your PostgreSQL database if you specify a SQL query or to your BigQuery project if you specify a tileset (using the connection defined in your dashboard).

- The `region` property points to the CARTO 2 US instance. You don't need to change this parameter unless your CARTO 2 database is located in the CARTO 2 EU instance.

- The `mapsUrl` points by default to the CARTO 2 Maps API instance. You only need to change it if you have an on-premises CARTO 2 deployment.

{{%/ bannerNote %}}

### Public vs Private Datasets

When you retrieve data from a cloud data warehouse connection you need to provide an access token that authorizes access to the data. The way of generating this access token is different if your application is private or public.

If you are building a private application with restricted access, these are the steps you need to follow:

1. Create an application in the CARTO 3 workspace. 
2. Configure the application client ID and launch the OAuth protocol in your application login workflow so the user authenticates against the CARTO platform. 
3. Upon successful authentication, you will receive an access token that you can use to authenticate your requests. The user must have access to the connection to the cloud data warehouse where the data resides.

If you are building a public application where the users don't need to login, you need to follow these steps:

1. Create a public token with access to the datasets used in the application. To manage this public token you need to use the tokens API endpoints. The payload to create a public token includes the connection name in the dashboard and the exact data source you are going to use as the `data` property in your CartoLayer (if you are going to use a SQL query dataset type, you need to specify the query).
2. Use the public token returned from the endpoint as the `accessToken` property in the `credentials` object.

{{% bannerNote title="note" %}}

If you are using CARTO 2, the authentication is based on the `username`/`apiKey` combination. 

For private datasets, you need to create an API key that provides access to the datasets you are going to use in your application.

For public datasets, you don't need to specify the `apiKey` property or you can specify the `default_public` api key if you are using both private and public datasets in your application.

{{%/ bannerNote %}}

### Different types of layers

The `CartoLayer` uses the `GeoJsonLayer` for rendering but you can also use any other deck.gl layer for rendering using the `getData` function from the CARTO module. This works for datasets with less than 200k rows but not for bigger datasets where you need to use vector tiles.

This function expects the same connection parameters than the `CartoLayer` described above:

- `connection`. This is equivalent to the `connection` property in the `CartoLayer`.
- `type`. This is equivalent to the `type` property in the `CartoLayer`.
- source. This is equivalent to the `data` property in the `CartoLayer`.
- `format`. You will one of the constant in the `FORMATS` enumeration, usually `FORMAT.JSON` or `FORMAT.GEOJSON` depending on the data source expected by the deck.gl layer you want to use for rendering.

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