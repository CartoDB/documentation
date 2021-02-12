## Layers and Widgets

On this guide we're going to explain how to add a new page (view) showing a layer from a CARTO dataset stored in your account. We will also show how you can add widgets that are integrated with your layer.

### Uploading the sample dataset to your CARTO account

Go to your dashboard and click on `New Dataset`. In the `Add new dataset` dialog select the `URL` option within the `Cloud Files` section.

![add-new-dataset](/img/react/add-new-dataset.png 'Add new dataset')

Copy the following URL and click on `Submit`:

`https://public.carto.com/api/v2/sql?filename=retail_stores&q=select+*+from+public.retail_stores&format=shp`

If you want to access the dataset from the application, you can make it public or you can create an [API KEY](https://carto.com/developers/auth-api/guides/CARTO-Authorization/) and keep it private. In the latter case, you will need to introduce the generated API key in the initial state slice as explained in the [Getting Started](../getting-started#connecting-your-carto-account) guide.

### Creating a view

Now we're going to create a view called `Stores` that will be accesible in the `/stores` path.

The easiest way to create a new view in the application is to use the [code generator](../code-generator). You need to enter the following command:

```shell
yarn hygen view new
```

and select these options:

```shell
✔ Name: Stores
✔ Route path: /stores
✔ Do you want a link in the menu? (y/N) y
```

The code generator will perform three different actions:

- Modify the route settings in the application to add the `/stores` path.

- Add the view to the Header

- Create a new file for the view with the following filename: `src/components/views/Stores.js`

### Testing your new view

Now you're ready to start the local development server using the following command:

```bash
yarn
yarn start
```

You should see the map component with a `Hello World` text on the left sidebar and a link to the new view in the top navigation bar.

### Creating a source

A source is a key piece in a CARTO for React application. Both layers and widgets depend on sources. CARTO for React is designed in such a way that sources and models should be the only pieces that connects to the backend, whether it is the CARTO platform or your own backend/API. These are the main differences between them:

- A **source** exports a plain object with a certain structure that will be understood by the CARTO for React library to feed layers or widgets using the CARTO SQL and/or Maps APIs.

- A **model** exports simple functions that receive parameters and make a request to receive the values that feed a view. That request can be against the CARTO SQL API or your own backend.
   
Both model and source folders can be found inside the `/data` folder. The goal of the `/data` folder is to easily differentiate the parts of the application that have a communication with external services, like CARTO APIs, your own backend, GeoJSON files...

To create a source, the easiest way is again to use the [code generator](../code-generator):

```shell
yarn hygen source new
```

In this case, we're creating a new source that can feed a layers & widgets with the dataset we uploaded before. It is going to be called `StoresSource` to follow a convention. You need to choose the following options:

```shell
✔ Name: StoresSource
✔ Choose type: SQL dataset
✔ Type a query: select cartodb_id, store_id, storetype, revenue, address, the_geom_webmercator from retail_stores
```

The code generator will generated a new file named `src/data/sources/storesSource.js` that will contains the following basic structure:

```javascript
const STORES_SOURCE_ID = 'StoresSource';

const source = {
  id: STORES_SOURCE_ID,
  data: `
    select cartodb_id, store_id, storetype, revenue, address, the_geom_webmercator from retail_stores
  `,
  type: 'sql',
};

export default source;
```

If you are going to use this source for widgets, you can add here code to expose the columns that will be used by the widget. In order to do that, you can create a constant. For instance, we can create a constant called `STORES_SOURCE_COLUMNS` exposing the `revenue` and `storyType` columns and modify the SQL query to use the constant members:

```javascript
export const STORES_SOURCE_COLUMNS = {
  REVENUE: 'revenue',
  STORE_TYPE: 'storeType',
} 

export default {
  id: STORES_SOURCE_ID,
  data: `
    select
      store_id,
      storetype as ${STORES_SOURCE_COLUMNS.STORE_TYPE},
      revenue as ${STORES_SOURCE_COLUMNS.REVENUE},
      address,
      the_geom_webmercator
    from retail_stores
  `,
  type: 'sql',
};
```

This can increase code maintainability to accommodate future changes in the model of the database. You can use the `revenue` constant and don't care about how revenue is retrieved or what is the column that contain that value. It is a specially recommended solution for teams with specialized roles: the backend engineer takes the responsability to define the models and sources and the frontend engineer just consume them in a safe way using constants defined by the backend.

### Creating a layer

Once we have defined the source, we can add now the layer the map. 

We create the layer by using the [code generator](../code-generator):

```shell
yarn hygen layer new
```

We select the following options:

```shell
✔ Name: StoresLayer
✔ Choose a source: StoresSource
✔ Do you want to attach to some view (y/N) y
✔ Choose a view: Stores
```

The code generator will perform two different actions:

- Create a new layer in a file named `src/components/layers/StoresLayer.js`,

- Attach the layer to the view in the `src/components/views/Stores.js` file.

If you reload the page, you will see the new layer in the map.

The code that has been added to the view to attach the layer is the following:

```javascript
  import { STORES_LAYER_ID } from 'components/layers/StoresLayer';
  import storesSource from 'data/sources/storesSource';

  useEffect(() => {
    // Add the source to the store
    dispatch(
      addSource(storesSource)
    );

    // Add the layer to the store
    dispatch(
      addLayer({
        id: STORES_LAYER_ID,
        source: storesSource.id,
      })
    );

    // Cleanup
    return () => {
      dispatch(removeLayer(STORES_LAYER_ID));
      dispatch(removeSource(storesSource.id));
    };
  }, [dispatch]);
```

The `dispatch` function is used to dispatch an action to the Redux store. This is how this works:

1. The view dispatches the new source to the store.
   
2. The view dispatches the new layer to the store.
   
3. The Map Component is re-rendered since the store has changed.
   
4. The Map Component get all the layers in the store and draw them.

This is how reactive programming works: we can add the layer from any place in the application just by dispatching the right action.

Now let's take a look at `src/components/layers/StoresLayer.js`:

```javascript
export const STORES_LAYER_ID = 'storesLayer';

export default function StoresLayer() {
  // get the layer from the store
  const { storesLayer } = useSelector((state) => state.carto.layers);
  // get the source from the store
  const source = useSelector((state) => selectSourceById(state, storesLayer?.source));
  // set required CARTO filter props, they manage the viewport changes and filters
  // we'll explain what are the filters later in this guide with the widgets
  const cartoFilterProps = useCartoLayerFilterProps(source);

  if (storesLayer && source) {
    // if the layer and the source are defined in the store
    return new CartoSQLLayer({
      ...cartoFilterProps,
      id: STORES_LAYER_ID,
      data: source.data,
      credentials: source.credentials,
      getFillColor: [241, 109, 122],
      pointRadiusMinPixels: 2
    });
  }
}
```

This is the summary:

- To create a layer you need to:
    1. Define a function that returns a deck.gl layer.
    2. Exports the ID as a constant.
   
- The layer must be added to the application layers array.

- You need to add the source and the layer to the store.

- You need to add `cartoFilterProps` if required.

### Adding widgets

Now we are ready to create a Formula and a Category Widget inside the View.

The first thing you need to do is to add the following imports at the top of the `src/components/views/Stores.js` file:

```javascript
import { Divider } from '@material-ui/core';
import { AggregationTypes, FormulaWidget, CategoryWidget, HistogramWidget } from '@carto/react/widgets';
import { currencyFormatter } from 'utils/formatter';
```

Then, in the same file, you need to replace the `Hello World` text with:

```javascript
<div>
  <FormulaWidget
    id='totalRevenue'
    title='Total revenue'
    dataSource={storesSource.id}
    column={STORES_SOURCE_COLUMNS.REVENUE}
    operation={AggregationTypes.SUM}
    formatter={currencyFormatter}
    viewportFilter
  ></FormulaWidget>

  <Divider />

  <CategoryWidget
    id='revenueByStoreType'
    title='Revenue by store type'
    dataSource={storesSource.id}
    column={STORES_SOURCE_COLUMNS.STORE_TYPE}
    operationColumn={STORES_SOURCE_COLUMNS.REVENUE}
    operation={AggregationTypes.SUM}
    formatter={currencyFormatter}
    viewportFilter
  />
</div>
```

{{% bannerNote title="note" %}}
As you can see, we are using here the `STORES_SOURCE_COLUMNS` that we created before. It is very important to use constants and avoid to hardcode column names.
{{%/ bannerNote %}}

#### Widgets source data

When you are working with widgets, you can use two different source data types:

- **Server-side data**. Widgets will consume `global` data, without listening to the viewport changes. `viewportFilter` prop must be false. The widgets will show data corresponding to the whole dataset.

- **Client-side data**. Widgets will consume `viewport features` data, listening to the viewport changes. `viewportFilter` prop must be true. The viewport is part of the store so any time it changes, the widget is refreshed to include only data corresponding to the current viewport.

{{% bannerNote title="warning" %}}
* Setting `viewportFilter={false}` is the same as not specifying the property, because the default value is false.
  
* BigQuery tileset layers work only with client-side data so it requires `viewportFilter` prop set to true. Otherwise, you will get an error.
{{%/ bannerNote %}}

### Understanding how the pieces work together

There are two main elements in the store: the source and the viewport. When we change these elements, the following actions are triggered:

- The layer is filtered when the source changes.

- The widget is re-rendered when the source or viewport changes.

- Any time we change the map extent (pan or zoom), the viewport changes and all the widgets (with the `viewportFilter` prop) are refreshed.

- Any time a widget applies a filter (for example clicking on a widget category), the filter is dispatched to the store. When we add a filter, we are changing the source, so all the components depending on the source are updated: the widgets are re-rendered and the layers are filtered. The map applies the filters using the `DataFilterExtension` from deck.gl.
