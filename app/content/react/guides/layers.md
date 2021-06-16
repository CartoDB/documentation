## Layers

This guide explains how to work with layers in a CARTO for React application. 

### Layer types

CARTO for React uses deck.gl for visualization, so you can use any [deck.gl layer](https://deck.gl/docs/api-reference/layers), not only the specific CARTO submodule layers ([CartoSQLLayer](https://deck.gl/docs/api-reference/carto/carto-sql-layer) and [CartoBQTilerLayer](https://deck.gl/docs/api-reference/carto/carto-bqtiler-layer)). 

If you use the code generator for adding your layers (see [below](#creating-a-layer)), it will create one of the specific CARTO submodule layers depending on the associated source. 

### Layer sources

If you are working with a CARTO for deck.gl layer, you can associate it with a source (CARTO dataset or BigQuery tileset). The source provides `data` and, optionally, `credentials` properties that are used by CARTO for deck.gl to retrieve the vector tiles.

If you need to use a different deck.gl layer (i.e. TripsLayer), you can't associate the layer with a source and you need to take care of providing the data for the layer in the expected format.

If you want to sync the layer with one or more widgets, you can only use CARTO for deck.gl layers because filters are applied through the source. 

### Creating a layer

You can create layers manually but it is easier to use the [code generator](../code-generator):

```shell
yarn hygen layer new
```

When you execute this command, you will need to select the name and source for your layer and you need to decide if you want to attach the layer to a view, so the layer is displayed in the map when the view is selected and is removed when the user switches to another view.

It creates a new file that exports a function with the name of the layer. This functions returns a CARTO for deck.gl layer with default styling properties. The function retrieves the associated source from the store and use the source `data` and `credentials` properties.

If we introduce `Stores` as the name in the code generator, a file named `StoresLayer.js` will be created in the `src/components/layers` folder with the following content:

```javascript
export const STORES_LAYER_ID = 'storesLayer';

export default function StoresLayer() {
  // get the layer from the store
  const { storesLayer } = useSelector((state) => state.carto.layers);
  // get the source from the store
  const source = useSelector((state) => selectSourceById(state, storesLayer?.source));
  // set required CARTO filter props, they manage the viewport changes and filters
  // we'll explain what are the filters later in this guide with the widgets
  const cartoLayerProps = useCartoLayerProps(source);

  if (storesLayer && source) {
    // if the layer and the source are defined in the store
    return new CartoSQLLayer({
      id: STORES_LAYER_ID,
      data: source.data,
      credentials: source.credentials,
      getFillColor: [241, 109, 122],
      pointRadiusMinPixels: 2,
      ...cartoLayerProps
    });
  }
}
```

The code generator will include the new layer in the `getLayers` function within the `src/components/layers/index.js` file. This function is used by the `<Map/>` component to initialize the `layers` property.

```javascript
import StoresLayer from './StoresLayer';

export const getLayers = () => {
  return [
    StoresLayer(),
  ];
};
```

If you decide to attach the layer to an existing view, the following code is added to the view:

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

This is one of the benefits of reactive programming: we can add the layer from any place in the application just by dispatching the right action.

### useCartoLayerProps

The last parameter passed to the layer constructor is `...cartoLayerProps`. This is a set of default properties that are used mainly for filtering and highlight features. You can get more details about the `useCartoLayerProps` hook in the [library reference](../../library-reference/api/#usecartolayerprops). 

If you need to override the [`uniqueidproperty`](https://deck.gl/docs/api-reference/geo-layers/mvt-layer#uniqueidproperty), used in vector tile layers (including CartoSQLLayer and CartoBQTilerLayer) to identify features, you need to specify it when you call the hook. This is useful for filtering and highlighting when a feature crosses or is present in multiple tiles:


```javascript
const cartoLayerProps = useCartoLayerProps(source, 'uniqueIdProperty');
```

If you need to override any of the properties configured by the hook, you must include them in the layer constructor after `...cartoLayerProps`. For instance, if you want to add your own [`updateTriggers`](https://deck.gl/docs/api-reference/core/layer#updatetriggers) property, you could add the following code to maintain the current behaviour and add your own update trigger for a given accessor (`getFillColor`, `getRadius`...):

```javascript
return new CartoSQLLayer({
  ...,
  ...cartoLayerProps,
  updateTriggers: { // below the cartoLayerProps hook, otherwise it will be overwritten
    ...cartoLayerProps.updateTriggers, // getting existing update triggers
    accessor: data_property // the trigger (accessor will be re-evaluated if data_property changes)
  }
});
```

### Summary

This is the summary:

- To create a layer you need to:
    1. Define a function that returns a deck.gl layer.
    2. Export the layer ID as a constant.
   
- The layer must be added to the map component layers array.

- You need to add the source and the layer to the store when the view is initialized.

- You can add your own CARTO layer properties if required.

