## Rapid map prototyping

### Introduction

A common workflow when building a spatial application involves a cartographer that designs a visualization with a map making tool and then hands it to a developer that needs to recreate it with the library used in the application.

With the new version of CARTO Builder and deck.gl, you can easily replicate this workflow without having to specify the different properties to instantiate the deck.gl layers. In order to create the visualization, the developer just needs to call the [`fetchMap`](../reference#fetchmap) function with the map ID in the CARTO platform.

You create a new map in Builder, add your data sources and style your layers as desired. Then you need to copy the map ID and use it to retrieve the map configuration from the platform. It is available starting with CARTO Maps API version v3.

<div align="center">
  <div>
    <img src="https://raw.githubusercontent.com/visgl/deck.gl-data/master/images/docs/fetch-map.gif" />
    <p><i>CARTO Builder demo</i></p>
  </div>
</div>

### Static display of a CARTO map

The simplest way of loading a visualization created in Builder is to instantiate the `Deck` object with the value returned by the `fetchMap` function. In this case, you will get a visualization without a basemap. 

```js
import {Deck} from '@deck.gl/core';
import {fetchMap} from '@deck.gl/carto';
const cartoMapId = 'ff6ac53f-741a-49fb-b615-d040bc5a96b8';
fetchMap({cartoMapId}).then(map => new Deck(map));
```

### Integration with basemap

The `fetchMap` option returns an object with several map properties. The main property is `layers`, that contains an array of deck.gl layers ready to be added. In most cases, you would want to display your visualization with a basemap. If you have used a CARTO basemap in your Builder visualization, you can use the `mapStyle` property returned by the `fetchMap` function to load the basemap while initializing the main deck.gl object. You can also use the `initialViewState` property to set the initial properties of the map view.

```js
fetchMap({cartoMapId}).then(({initialViewState, mapStyle, layers}) => {
  const MAP_STYLE = `https://basemaps.cartocdn.com/gl/${mapStyle.styleType}-gl-style/style.json`;
  const deckgl = new deck.DeckGL({
    container: 'map',
    controller: true,
    mapStyle: MAP_STYLE,
    initialViewState,
    layers
  });
});
```

You are not forced to use all the properties from the Builder map in your application. For instance, you can just load the layers but use a different basemap or a different initial map view. 

The `fetchMap` function has a required parameter (`cartoMapId`) and admits several optional parameters. You can check those parameters and the properties of the returned object in the [API reference](../reference#fetchmap). 

### Loading private and shared maps

In the previous examples we are loading public Builder maps. In some cases you will want to load private or shared maps in your application. In those cases you need to specify a valid access token in the `credentials` object provided to the `fetchMap` function. 

### Auto-refreshing

Sometimes you have a map that is using one or more data sources that are continuously updated. In those cases you can use the `autoRefresh` parameter to create a live-updating map. This parameter specifies how often is the map fetched in minutes. You also need to define the handler for the `onNewData` event to indicate what to do when new data arrives. In most cases you would like to update the `layers` property as we are doing here. You can stop the auto-refresh by calling the `stopAutoRefresh` function returned by `fetchMap`.

```js
const deck = new Deck({canvas: 'deck-canvas'});
const mapConfiguration = {
  autoRefresh: 5,
  cartoMapId,
  onNewData: ({layers}) => {
    deck.setProps({layers});
  }
};
const {initialViewState, layers, stopAutoRefresh} = await fetchMap(mapConfiguration);
deck.setProps({controller: true, initialViewState, layers});
buttonElement.addEventListener('click', () => {
  stopAutoRefresh();
});
```

You can check a complete example loading a public map [here](/deck-gl/examples/basic-examples/builder-map).
