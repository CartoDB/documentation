## Redux
**npm package: @carto/react-redux**

Functions to ease the management of CARTO within a react-redux application. The cra-template makes extensive use of redux, to provide complex features in an easy way.

### CARTO Slice

A [slice](https://redux-toolkit.js.org/api/createSlice) to manage the main redux blocks of a CARTO for React application, like basemap, viewState, sources, layers and filters.
#### createCartoSlice

A function that accepts an `initialState`, setups the state and creates
the CARTO reducers that support CARTO for React achitecture.

- **Input**:
  | Param        | Type                | Description       |
  | ------------ | ------------------- | ----------------- |
  | initialState | <code>object</code> | the initial state |

  An initial state object might look like:

  ```js
    import { POSITRON } from '@carto/react-basemaps';
    
    export const initialState = {
      viewState: {
        latitude: 31.802892,
        longitude: -103.007813,
        zoom: 2,
        pitch: 0,
        bearing: 0,
        dragRotate: false
      },
      basemap: POSITRON,
      credentials: {
        username: 'public',
        apiKey: 'default_public',
        serverUrlTemplate: 'https://{user}.carto.com'
      },
      googleApiKey: ''
    };
  ```



#### addSource

Action to add a **source** to the store.

- **Input**:
  | Param  | Type                | Description                                                                                           |
  | ------ | ------------------- | ----------------------------------------------------------------------------------------------------- |
  | source   | <code>object</code> | A valid CARTO source, expressed as `{ id, data, type }`                                                 |
  | source.id   | <code>string</code> | unique id for the source                                                                              |
  | source.data | <code>string</code> | data definition for the source. Either a Query for SQL dataset or the name of the tileset for BigQuery Tileset |
  | source.type | <code>string</code> | type of source. Posible values are 'sql' or 'bigquery'                                                |

- **Example**:
  ```js
  import { addSource } from '@carto/react-redux';

  const source = {
    id: 'sourceOne',
    type: 'sql',
    data: 'SELECT * FROM my_table'
  }
  
  const action = addSource(source);
  // dispatch(action);
  ```

#### removeSource

Action to remove a source from the store

- **Input**:
  | Param    | Type                | Description                |
  | -------- | ------------------- | -------------------------- |
  | sourceId | <code>string</code> | id of the source to remove |

- **Example**:
  ```js
  import { removeSource } from '@carto/react-redux';
  
  const action = removeSource('sourceOne');
  // dispatch(action);
  ```

#### addLayer

Action to add a Layer to the store. 

IMPORTANT: This doesn't imply adding a whole deck.gl layer to the redux store, just a "pointer" to it, by using an `id` shared with a Layer file + linking it to a `source`

- **Input**:
  | Param           | Type                | Description                                       |
  | --------------- | ------------------- | ------------------------------------------------- |
  | layer   | <code>object</code> | A valid CARTO layer, expressed as `{ id, source, layerAttributes }` 
  | layer.id              | <code>string</code> | unique id for the layer                           |
  | layer.source          | <code>string</code> | id of the source of the layer                     |
  | layer.layerAttributes | <code>object</code> | (optional) custom attributes to pass to the layer |

- **Example**:
  ```js
    const action = addLayer({ 
      id: 'layerOne', 
      source: 'sourceOne', 
      layerAttributes: { 
        extraAttribute: 1 
      }
    });
    // dispatch(action);
    // extraAttribute will be available inside the Layer, for custom operations inside it (eg. custom styling)
  ```

#### updateLayer

Action to update a Layer in the store

- **Input**:
  | Param           | Type                | Description                            |
  | --------------- | ------------------- | -------------------------------------- |
  | layer   | <code>object</code> | Update expressed as `{ id, layerAttributes }` 
  | layer.id              | <code>string</code> | unique id for the CARTO layer already in the store               |
  | layer.layerAttributes | <code>object</code> | custom attributes to update in the layer |

- **Example**:
  ```js
    const action = updateLayer({ 
      id: 'layerOne', 
      layerAttributes: { 
        extraAttribute: 100 
      }
    });
    // dispatch(action);
    // extraAttribute will be updated to the new value
  ```

#### removeLayer

Action to remove a layer from the store
- **Input**:
  | Param | Type                | Description               |
  | ----- | ------------------- | ------------------------- |
  | id    | <code>string</code> | id of the layer to remove |

- **Example**:
  ```js
    const action = removeLayer('layerOne');
    // dispatch(action);
  ```

#### setBasemap

Action to set a basemap

| Param   | Type                | Description            |
| ------- | ------------------- | ---------------------- |
| basemap | <code>String</code> | the new basemap to add |

#### addFilter

Action to add a filter on a given source and column

| Param    | Type                    | Description                                |
| -------- | ----------------------- | ------------------------------------------ |
| {id}     | <code>string</code>     | sourceId of the source to apply the filter |
| {column} | <code>string</code>     | column to filter at the source             |
| {type}   | <code>FilterType</code> | `FilterTypes.IN` and `FilterTypes.BETWEEN` |

#### removeFilter

Action to remove a column filter from a source

| Type                | Description                      |
| ------------------- | -------------------------------- |
| <code>id</code>     | sourceId of the filter to remove |
| <code>column</code> | column of the filter to remove   |

#### clearFilters

Action to remove all filters from a source

| Type            | Description                                       |
| --------------- | ------------------------------------------------- |
| <code>id</code> | sourceId of the source to remove all filters from |

#### selectSourceById

Redux selector to get a source by ID

#### setViewState

Action to set the current ViewState

| Param     | Type                |
| --------- | ------------------- |
| viewState | <code>Object</code> |

#### setViewportFeatures

Action to set the viewport features to a specific source

| Param      | Type                | Description       |
| ---------- | ------------------- | ----------------- |
| {sourceId} | <code>string</code> | id of the source  |
| {features} | <code>Array</code>  | viewport features |

#### removeViewportFeatures

Action to remove the viewport features to a specific source

| Param      | Type                | Description                                           |
| ---------- | ------------------- | ----------------------------------------------------- |
| {sourceId} | <code>string</code> | id of the source to remove the viewport features from |

#### setWidgetLoadingState

Action to set the widget loading state to a specific one

| Param      | Type                | Description       |
| ---------- | ------------------- | ----------------- |
| {widgetId} | <code>string</code> | id of the widget  |
| {isLoading} | <code>boolean</code>  | loading state |

#### removeWidgetLoadingState

Action to remove a specific widget loading state

| Param      | Type                | Description       |
| ---------- | ------------------- | ----------------- |
| {widgetId} | <code>string</code> | id of the widget  |

#### setAllWidgetsLoadingStates

Action to set the all the widgets loading state at once

| Param      | Type                | Description       |
| ---------- | ------------------- | ----------------- |
| {areLoading} | <code>boolean</code> | loading state  |

### OAuth Slice

#### createOauthCartoSlice

A function that accepts an initialState, setup the state and creates
reducers to manage OAuth with CARTO platform.

```javascript
export const oauthInitialState = {
  oauthApp: {
    clientId: 'CARTO OAUTH APP clienID'
    scopes: [
      'user:profile', // to load avatar photo
      'datasets:metadata', // to list all your datasets,
      'dataservices:geocoding', // to use geocoding through Data Services API
      'dataservices:isolines', // to launch isochrones or isodistances through Data Services API
    ],
    authorizeEndPoint: 'https://carto.com/oauth2/authorize',
  }
};
```

| Param        | Type                | Description       |
| ------------ | ------------------- | ----------------- |
| initialState | <code>object</code> | the initial state |

#### setOAuthApp

Action to set the OAuthApp

| Param             | Type                | Description                                                                                                   |
| ----------------- | ------------------- | ------------------------------------------------------------------------------------------------------------- |
| clientId          | <code>string</code> | unique OAuth App identifier                                                                                   |
| scopes            | <code>array</code>  | array of valid scopes for the App.                                                                            |
| authorizeEndPoint | <code>string</code> | URL of CARTO authorization endpoint. Except for on-premise, it should be 'https://carto.com/oauth2/authorize' |

#### setTokenAndUserInfoAsync

Action to get the userInfo once there is a valid token, and set them both into state

#### logout

Action to logout an user

#### selectOAuthCredentials

Selector to fetch the current OAuth credentials from the storage
