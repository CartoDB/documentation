## Layers

This guide explains how to work with layers in a CARTO for React application. 

### Layer types

CARTO for React uses deck.gl for visualization, so you can use any [deck.gl layer](https://deck.gl/docs/api-reference/layers), not only the specific CARTO submodule layer ([CartoLayer](https://deck.gl/docs/api-reference/carto/carto-layer)). 

If you use the code generator for adding your layers (see [below](#creating-a-layer)), it will create a `CartoLayer` with default rendering and interactivity properties. 

### Layer sources

If you are working with the ([CartoLayer](https://deck.gl/docs/api-reference/carto/carto-layer)), you need to associate it with a data source. The source provides `data`, `type`, `connection`, and, optionally, `credentials` properties that are used by CARTO for deck.gl to retrieve the vector tiles.

If you want to sync the layer with one or more widgets, you can only use CARTO for deck.gl layers because filters are applied through the source.

Sources are usually created with the code generator. If you use `stores` as the name for your source, the code generator will create a new file named `storesSource.js` in the `src/data` folder with the following content:

```javascript
import { MAP_TYPES } from '@deck.gl/carto';

const STORES_SOURCE_ID = 'storesSource';

const source = {
  id: STORES_SOURCE_ID,
  type: MAP_TYPES.TABLE,
  connection: 'bqconn',
  data: 'cartobq.public_account.retail_stores',
};

export default source;
```

### Creating a layer

You can create layers manually but it is easier to use the [code generator](../code-generator):

```shell
yarn hygen layer new
```

When you execute this command, you will need to select the name and source for your layer and you need to decide if you want to attach the layer to a view, so the layer is displayed in the map when the view is selected and is removed when the user switches to another view.

It creates a new file that exports a function with the name of the layer. This function returns a CARTO for deck.gl layer with default styling properties. The function retrieves the associated source from the store and use the source `type`, `connection`, `data` and `credentials` properties.

If we introduce `Stores` as the name in the code generator, a file named `StoresLayer.js` will be created in the `src/components/layers` folder with the following content:

```javascript
import { useSelector } from 'react-redux';
import { CartoLayer } from '@deck.gl/carto';
import { selectSourceById } from '@carto/react-redux';
import { useCartoLayerProps } from '@carto/react-api';
import htmlForFeature from 'utils/htmlForFeature';

export const STORES_LAYER_ID = 'storesLayer';

export default function StoresLayer() {
  const { storesLayer } = useSelector((state) => state.carto.layers);
  const source = useSelector((state) => selectSourceById(state, storesLayer?.source));
  const cartoLayerProps = useCartoLayerProps({ source });

  if (storesLayer && source) {
    return new CartoLayer({
      ...cartoLayerProps,
      id: STORES_LAYER_ID,
      getFillColor: [241, 109, 122],
      pointRadiusMinPixels: 2,
      getLineColor: [255, 255, 255],
      lineWidthMinPixels: 1,
      pickable: true,
      onHover: (info) => {
        if (info?.object) {
          info.object = {
            html: htmlForFeature({ feature: info.object }),
            style: {},
          };
        }
      },
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

### Styling properties

If you use the code generator, the code will create a `CartoLayer` with default styling properties. To learn more about customizing the style properties for your layers, please read the [Customizing the CartoLayer style](/deck-gl/customizing-the-cartolayer-style) guide in the CARTO for deck.gl documentation.

### useCartoLayerProps

The last parameter passed to the layer constructor is `...cartoLayerProps`. This is a set of default properties that are used mainly for filtering and highlight features. You can get more details about the `useCartoLayerProps` hook in the [library reference](../../library-reference/api/#usecartolayerprops). 

If you need to override the [`uniqueidproperty`](https://deck.gl/docs/api-reference/geo-layers/mvt-layer#uniqueidproperty), used in vector tile layers to identify features, you need to specify it when you call the hook. This is useful for filtering and highlighting when a feature crosses or is present in multiple tiles:


```javascript
const cartoLayerProps = useCartoLayerProps({ source, uniqueIdProperty: 'mycustomid' });
```

If you need to override any of the properties configured by the hook, you must include them in the layer constructor after `...cartoLayerProps`. For instance, if you want to add your own [`updateTriggers`](https://deck.gl/docs/api-reference/core/layer#updatetriggers) property, you could add the following code to maintain the current behavior and add your own update trigger for a given accessor (`getFillColor`, `getRadius`...):

```javascript
return new CartoLayer({
  ...,
  ...cartoLayerProps,
  updateTriggers: { // below the cartoLayerProps hook, otherwise it will be overwritten
    ...cartoLayerProps.updateTriggers, // getting existing update triggers
    accessor: data_property // the trigger (accessor will be re-evaluated if data_property changes)
  }
});
```

### Support for other deck.gl layers

If you want to use a different deck.gl layer (i.e. ArcLayer, TripsLayer), read [this section](/deck-gl/using-the-cartolayer/#support-for-other-deckgl-layerss) in the deck.gl documentation to learn more.

### Summary

This is the summary:

- To create a layer you need to:
    1. Define a function that returns a deck.gl layer.
    2. Export the layer ID as a constant.
   
- The layer must be added to the map component layers array.

- You need to add the source and the layer to the store when the view is initialized.

