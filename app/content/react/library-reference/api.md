## API

{{% tableWrapper %}}
| Package | Version | Downloads |
| ------- | ------- | --------- |
| @carto/react-api  | <a href="https://npmjs.org/package/@carto/react-api">  <img src="https://img.shields.io/npm/v/@carto/react-api.svg?style=flat-square" alt="version" style="margin-bottom: 0px; vertical-align: middle;" /></a> | <a href="https://npmjs.org/package/@carto/react-api">  <img src="https://img.shields.io/npm/dt/@carto/react-api.svg?style=flat-square" alt="downloads" style="margin-bottom: 0px; vertical-align: middle;" /></a>
{{%/ tableWrapper %}}

Set of functions that allow to work with CARTO APIs.

### Functions

#### executeSQL

Async function that executes a SQL query against [CARTO SQL API](https://carto.com/developers/sql-api/)

- **Input**:

  Receives a single `Object` argument with the following properties:

{{% tableWrapper tab="true" %}}
| Param                         | Type                | Description                                                |
| ----------------------------- | ------------------- | ---------------------------------------------------------- |
| credentials                   | <code>Object</code> | CARTO user credentials (check the parameters [here](/deck-gl/reference#setdefaultcredentials))                                    |
| credentials.apiVersion        | <code>string</code> | SQL API version                                             |
| credentials.username          | <code>string</code> | CARTO username (required for CARTO 2)                                            |
| credentials.apiKey            | <code>string</code> | CARTO API Key (required for CARTO 2)                                             |
| credentials.apiBaseUrl        | <code>string</code> | API Base URL (required for CARTO 3)                                             |
| credentials.accessToken       | <code>string</code> | Access token (required for CARTO 3)                                             |
| query                         | <code>string</code> | SQL query to be executed                                   |
| connection                    | <code>string</code> | Connection name (required for CARTO 3)                                   |
| opts                          | <code>Object</code> | Optional. Additional options for the HTTP request, following the [Request](https://developer.mozilla.org/es/docs/Web/API/Request) interface |
| opts.abortController          | <code>AbortController</code>       | To cancel the network request using [AbortController](https://developer.mozilla.org/en-US/docs/Web/API/AbortController) |
| opts.format                   | <code>string</code> | Output format to be passed to SQL API (i.e. 'geojson')                             |
{{%/ tableWrapper %}}

- **Returns**: <code>Object</code> - Data returned from the SQL query execution

- **Example**:

  ```js
  import { executeSQL } from "@carto/react-api";

  const credentials = {
    username: "public",
    apiKey: "default_public"
  };
  const query = `SELECT COUNT(cartodb_id) FROM populated_places`;

  const fetchData = async () => {
    const result = await executeSQL({credentials, query});
    return result;
  };

  const rows = await fetchData();
  console.log(rows[0]); // {count: 7343}
  ```

#### useCartoLayerProps

React hook that allows a more powerful use of CARTO deck.gl layers, creating a set of layer props (see [@deck.gl/carto module](https://deck.gl/docs/api-reference/carto/overview)). It manages automatically filtering and viewport-related calculations, for common use cases.

- **Input**:
{{% tableWrapper tab="true" %}}
| Param              | Type                | Description                                                                                                                   |
| ------------------ | ------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| source             | <code>Object</code> | Data source                                  |
| source.id          | <code>string</code> | Unique source ID |
| source.type        | <code>string</code> | Source type. Check available types [here](/deck-gl/reference#type-string)  |
| source.connection  | <code>string</code> | Connection name. Required only for CARTO 3.  |
| source.data        | <code>string</code> |  Table name, tileset name or SQL query                                           |
| source.credentials | <code>string</code> |  Credentials for accessing the source (check the parameters [here](/deck-gl/reference#setdefaultcredentials))                                           |
| [uniqueIdProperty] | <code>string</code> | (optional) Name of the column for identity. To be used internally when getting viewportFeatures (used by widget computations) |
{{%/ tableWrapper %}}

   {{% bannerNote title="tip" %}}
   About `uniqueIdProperty`: the uniqueIdProperty allows to identify a feature unequivocally. When using tiles, it allows to detect portions of a same feature present in different tiles (think about a road segment crossing 2 tiles) and apply correct calculations (eg. avoid counting the same feature more than once). These are the rules used internally, in this precise order:

   1. if user indicates a particular property, it will be honoured.
   2. if `cartodb_id` is present, it will be used (all features coming from a `CartoLayer` with Maps API version v2 have this field, just be sure to include it in the SQL you use)
   3. if `geoid` is present, it will be used. Some datasets with `MAP_TYPES.TILESET` type have this identifier.
   4. finally, if a value isn't set for this param and none `cartodb_id` or `geoid` are found, every feature (or portion of a feature), will be treated as a unique feature.
   {{%/ bannerNote %}}

- **Returns**: a set of props for the layer.
{{% tableWrapper tab="true" %}}
| Param                               | Type                          | Description                                                               |
| ----------------------------------- | ----------------------------- | ------------------------------------------------------------------------- |
| props                               | <code>Object</code>           | Default props required for layers                                         |
| props.binary                        | <code>boolean</code>          | Returns true. The internal viewportFeatures calculation requires MVT property set to true             |
| props.uniqueIdProperty              | <code>string</code>           | Returns same unique id property for the layer as the input one             |
| props.type        | <code>string</code> | Source type. Check available types [here](/deck-gl/reference#type-string)  |
| props.connection  | <code>string</code> | Connection name. Used only for CARTO 3.  |
| props.data        | <code>string</code> |  Table name, tileset name or SQL query                                           |
| props.credentials | <code>string</code> |  Credentials for accessing the source                                    |
| props.onViewportLoad                | <code>function</code>         | Function that is called when all tiles in the current viewport are loaded. Available when using vector tile sources. Vector tiles are returned if using Maps API v2, or if using Maps API v3 with `MAP_TYPES.TILESET` sources. |
| props.onDataLoad                | <code>function</code>         | Function that is called when all the dataset features are loaded. Available when using Maps API v3 with `MAP_TYPES.TABLE` or `MAP_TYPES.QUERY` sources. |
| props.getFilterValue                | <code>function</code>         | Accessor to the filterable value of each data object                      |
| props.filterRange                   | <code>[number, number]</code> | The [min, max] bounds of the filter values to display                     |
| props.extensions                    | <code>[Object]</code>         | Bonus features to add to the core deck.gl layers                          |
| props.updateTriggers                | <code>Object</code>           | Tells deck.gl exactly which attributes need to change, and when           |
| props.updateTriggers.getFilterValue | <code>Object</code>           | Updating `getFilterValue` accessor when new filters are applied to source |
{{%/ tableWrapper %}}

- **Example**:

  ```js
  import { useCartoLayerProps } from '@carto/react-api';

  const cartoLayerProps = useCartoLayerProps(source);

  const layer = new CartoLayer({
    ...cartoLayerProps,
    id: 'exampleLayer',
    getFillColor: [255, 0, 255],
  }
  ```
