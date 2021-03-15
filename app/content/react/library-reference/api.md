## API
**npm package: @carto/react-api**

Set of functions that allow to work with CARTO APIs.

### executeSQL ⇒ <code>Object</code>

Async function that executes a SQL query against [CARTO SQL API](https://carto.com/developers/sql-api/)

- **Input**:
    | Param                         | Type                | Description                                                           |
    | ----------------------------- | ------------------- | ----------------------------------------------------------------------|
    | credentials                   | <code>Object</code> | CARTO user credentials                                                |
    | credentials.username          | <code>string</code> | CARTO username                                                        |
    | credentials.apiKey            | <code>string</code> | CARTO API Key                                                         |
    | credentials.serverUrlTemplate | <code>string</code> | CARTO server URL template (eg: *https://{user}.carto.com*)            |
    | query                         | <code>string</code> | SQL query to be executed                                              |
    | opts                          | <code>Object</code> | Optional. Additional options for the HTTP request                     |
    | opts.format                   | <code>string</code> | Output format (i.e. 'geojson')                                        |

- **Returns**: <code>Object</code> - Data returned from the SQL query execution

- **Example**:
    ```js
    import { executeSQL } from '@carto/react-api';

    const credentials = {
        username: 'public',
        apiKey: 'default_public',
        serverUrlTemplate: 'https://{user}.carto.com',
    };
    const query = `SELECT COUNT(cartodb_id) FROM populated_places`;

    const fetchData = async () => {
        const result = await executeSQL(credentials, query);
        return result;
    }

    const rows = await fetchData();
    console.log(rows[0]); // {count: 7343}
    ```

### useCartoLayerProps ⇒ <code>Object</code>

React hook that allows a more powerful use of CARTO deck.gl layers, creating a set of layer props (see [@deck.gl/carto module](https://deck.gl/docs/api-reference/carto/overview)). It manages automatically filtering and viewport-related calculations, for common use cases.

- **Input**:
    | Param                               | Type                          | Description                                                               |
    | ----------------------------------- | ----------------------------- | ------------------------------------------------------------------------- |
    | source                              | <code>Object</code>           | Required source. { id, type, data }                                       |
    | uniqueIdProperty                    | <code>string</code>           | Optional. *Default* = 'cartodb_id'. Name of the column for identity. To be used by widget computations                                     |


- **Returns**: a set of props for the layer.
    | Param                               | Type                          | Description                                                               |
    | ----------------------------------- | ----------------------------- | ------------------------------------------------------------------------- |
    | props                               | <code>Object</code>           | Default props required for layers                                         |
    | props.uniqueIdProperty              | <code>string</code>           | Unique id property for the layer, default to `cartodb_id`                 |
    | props.onViewportLoad                | <code>function</code>         | Function that is called when all tiles in the current viewport are loaded |
    | props.getFilterValue                | <code>function</code>         | Accessor to the filterable value of each data object                      |
    | props.filterRange                   | <code>[number, number]</code> | The [min, max] bounds of the filter values to display                     |
    | props.extensions                    | <code>[Object]</code>         | Bonus features to add to the core deck.gl layers                          |
    | props.updateTriggers                | <code>Object</code>           | Tells deck.gl exactly which attributes need to change, and when           |
    | props.updateTriggers.getFilterValue | <code>Object</code>           | Updating `getFilterValue` accessor when new filters are applied to source |

- **Example**:
    ```js
    import { useCartoLayerProps } from '@carto/react-api';
    
    const cartoLayerProps = useCartoLayerProps(source);

    const layer = new CartoSQLLayer({
      id: 'exampleLayer',
      data: source.data,
      credentials: source.credentials,
      getFillColor: [255, 0, 255],      
      ...cartoLayerProps,
    }    
    ```

    Note: if you're using cra-template, you would usually get the `source` from Redux. It is recommended to use the hook as the latest prop; and you might need to apply destructuring on its properties for more advanced use cases.

### SourceTypes

Enum for the different types of @deck.gl/carto sources. You won't normally require its use; if you create a source with hygen, it will manage the type for you.

**Kind**: global enum  
**Read only**: true

<dl>
<dt><a href="#SQL">SQL</a></dt>
<dd><p>'sql'</p>
</dd>
<dt><a href="#BIGQUERY">BIGQUERY</a></dt>
<dd><p>'bigquery'</p>
</dd>
</dl>
