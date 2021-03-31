## Layers

### Creating a layer

We create layers by using the [code generator](../code-generator):

```shell
yarn hygen layer new
```

This tool adds the following code to view:

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

This is the summary:

- To create a layer you need to:
    1. Define a function that returns a deck.gl layer.
    2. Exports the ID as a constant.
   
- The layer must be added to the application layers array.

- You need to add the source and the layer to the store.

- You need to add `cartoLayerProps` if required.

