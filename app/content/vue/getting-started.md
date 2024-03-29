## Getting started

The CARTO platform is framework-agnostic so you can build applications using CARTO with your framework of choice. When you build an application with CARTO you mostly use deck.gl as the visualization library. This guide describes an approach for integrating [CARTO for deck.gl](/deck-gl) within applications developed using the [Vue.js](https://vuejs.org/) framework, but you can use CARTO with Vue.js and other visualization libraries.

We have created an example that you can download and execute in your own local machine, available in the viz-doc [repository](https://github.com/CartoDB/viz-doc):

<ul class="grid-cell--col10 grid u-mt16">
    <li class="grid-cell grid-cell--col6 grid-cell--col12--mobile u-mb20">
        <a href="https://github.com/CartoDB/viz-doc/tree/master/deck.gl/examples/pure-js/vue" target="_blank" class="clickable-card clickable-card--small">
        <img class="u-mr4" src="/img/documentation/github.svg" alt="Github" style="filter: invert(1); margin-bottom: 8px">
        <h3 class="title f20 is-txtBaseGrey u-mt8" style="margin-top: 8px;">viz-doc</h3>
        <p class="text f16 is-txtTypo2 u-mt8">CARTO for deck.gl + Vue.js example</p>
        </a>
    </li>
</ul>

This guide follows an step-by-step approach using the mentioned example as reference. To download and execute the example, start by cloning the repository:

```shell
git clone git@github.com:CartoDB/viz-doc.git
```   

Then change the current directory to the Vue.js example for CARTO 2 or CARTO 3:

```shell
cd viz-doc/deck.gl/examples/pure-js/vue/carto3
```   

Install the packages using the following command:

```shell
yarn
```   

Now you are ready to start the application in your local development environment:

```shell
yarn serve
```   

And you will be able to access the application in the following URL:

`https://localhost:8080`

{{% bannerNote title="About CARTO platform versions" %}}
In this documentation we use the term “CARTO 3” to refer to the latest version of the CARTO platform launched on October 2021, and “CARTO 2” to refer to the previous version. We provide examples for both versions and we add notes when there are differences in the way you need to work with each of them. Note that each platform version has its own set of account credentials.
{{%/ bannerNote %}}

### Creating your application

We are going to start by creating a new Vue.js application using the [Vue CLI](https://cli.vuejs.org/). If you haven't installed it already, you need to execute the following command:

```bash
yarn global add @vue/cli
```

Then we create our application using the `vue create` command:

```bash
vue create carto-deckgl-vue
```

The tool will ask us to pick a preset. We choose the `Default ([Vue 2] babel, eslint)` preset.

### Basic layout

At this point we have the default Vue.js project structure. Now we start by defining our application layout. We will have a simple but versatile layout with a header, a left sidebar, and a map area.

The first task we are going to perform is to generate a header component in the `src/components/app-header` folder. In this example we using single-file (.vue) components but we include the template and style content from separate files:

- app-header.html. This is the HTML template file for the component.
- app-header.scss. This is the style file for the component.
- AppHeader.vue. This file includes the component logic and the content of the two other files through the `<template>` and `<style>` tags.

We are going to use SASS as the CSS Preprocessor, so we need to add the following packages:

```shell
yarn add -D sass
yarn add -D sass-loader@^10
```

In the example, the header component includes a logo and a title. It also includes custom CSS styles. Please take a look at the [HTML template](https://github.com/CartoDB/viz-doc/blob/master/deck.gl/examples/pure-js/vue/src/components/app-header/app-header.html) and [component styles](https://github.com/CartoDB/viz-doc/blob/master/deck.gl/examples/pure-js/vue/src/components/app-header/app-header.scss) definition.

Now we are going to create the components for the sidebar and the map. Initially we are going to create empty components and we will be adding the contents in the next sections. We will create the `HomeSidebar` in the `src/components/home-sidebar` folder and the `MapComponent` in the `src/components/map-component` folder.

We are going to define our layout in a `<ViewTemplate>`. This component is going to include the header, a sidebar component, and a map component. We want to use Material Design for our user interface, so we need to start by adding [Vue Material](https://vuematerial.io) to our project:

```shell
yarn add vue-material
```

We start by importing the Vue Material CSS files in the `main.js` file:

```javascript
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
```

Now we can create our template component in the `src/components/template-component` folder. The HTML file will define the layout using Vue Material:

```html
<div class="template-container">
  <div class="md-layout header">
    <div class="md-layout-item">
      <AppHeader></AppHeader>
    </div>
  </div>

  <div class="md-layout content">
    <div class="md-layout-item">
      <HomeSidebar></HomeSidebar>
    </div>
    <div class="md-layout-item">
      <MapComponent></MapComponent>
    </div>
  </div>
</div>
```

The [style file](https://github.com/CartoDB/viz-doc/blob/master/deck.gl/examples/pure-js/vue/src/components/view-template/view-template.scss) will include the required styling properties and the component file will just include the different components used in the template:

```javascript
import AppHeader from '../app-header/AppHeader.vue';
import HomeSidebar from '../home-sidebar/HomeSidebar.vue';
import MapComponent from '../map-component/MapComponent.vue';

export default {
  name: 'TemplateComponent',
  components: {
    AppHeader,
    HomeSidebar,
    MapComponent
  }
}
```

We are going to have one default view called `Home`. We will create this view inside the `src/views/home` folder. In the template file, we are just going to include our template component:

```html
<div class="home-container">
  <ViewTemplate></ViewTemplate>
</div>
```

The style file will include the styles to ensure the view takes the full width and height. Finally, the Vue file will include the template component:

```javascript
import ViewTemplate from '@/components/view-template/ViewTemplate.vue';

export default {
  name: 'app-home',
  components: {
    ViewTemplate
  },
}
```

### Routing

Our sample application could grow and potentially include many views and lots of JavaScript code. In order to make sure we can manage different routes/paths easily and we provide a good user experience, we are going to use the [Vue Router](https://router.vuejs.org/) along with an AppShell for starting our application.

First we add the Vue Router to our project:

```shell
yarn add vue-router
```

Then we are going to create an AppShell component under the `src/app-shell` folder. The template file will include a <router-view> component to plug the different views:

```html
<div class="app-shell">
  <router-view></router-view>
</div>
```

In the style file, we will ensure the app takes the full width and height available:

```css
.app-shell {
  width: 100%;
  height: 100%;
}
```

Finally in the .vue file we will redirect the user to the `Home` view we have created above:

```javascript
export default {
  name: 'AppShell',
  computed: {
    routes () {
      return [
        {
          to: { name: 'home' },
          name: 'Home'
        }
      ]
    }
  }
}
```

Now we open the `main.js` file and tell the application to render our new `AppShell` component when starting up, instead of the `App` component, that we can safely delete now.

```javascript
import AppShell from './app-shell/AppShell.vue'
import router from './router'

new Vue({
  router,
  render: h => h(AppShell)
}).$mount('#app')
```

{{% bannerNote title="tip" %}}
Our example application is going to have one view only but we have prepared the example with Vue Router so you can use it as an starting point for creating a more complex application with multiple views.
{{%/ bannerNote %}}

### Map component

Until this point we have worked on the basic structure of our application but we have not added yet anything related to [deck.gl](https://deck.gl). In this section we are going to add the deck.gl map; deck.gl itself does not include basemap functionality but it is compatible with different libraries for managing basemaps like [Mapbox GL JS](https://docs.mapbox.com/mapbox-gl-js) or [Google Maps](https://developers.google.com/maps). 

If you want to include a basemap in your application, you need to create two different canvases: one for drawing the basemap and another for drawing the deck.gl layers. In addition, you need to make sure that both canvases are in sync and showing the same viewport.

We start by adding the deck.gl and Mapbox GL JS packages:

```shell
yarn add deck.gl
yarn add @deck.gl/carto
yarn add mapbox-gl@1.13.0
```

We are going to create a new class `DeckMap` that inherits from deck.gl `Deck` class and takes care of creating the canvases for the basemap and the deck.gl layers and keeping them in sync. We are going to store this class in the `src/components/map-component/map-utils` folder.

The `DeckMap` class accepts a set of `props` for initializing the object such as the container ID where the map will be placed, the initial view state or the basemap to use. We are going to create a set of default props that will be used if they are not provided when instancing the object:

```javascript
import { BASEMAP } from '@deck.gl/carto'
...
const DEFAULT_MAP_PROPS = {
  layers: [],
  mapStyle: BASEMAP.VOYAGER,
  initialViewState: {
    longitude: -97.2,
    latitude: 44.33,
    zoom: 3,
  },
  controller: true,
  useDevicePixels: 2,
  getCursor: ({ isDragging, isHovering }) => (isDragging ? 'grabbing' : isHovering ? 'pointer' : ''),
}
```

In the `DeckMap` constructor, we are going to initialize the `props` and create the canvases:

```javascript
export default class DeckMap extends Deck {
  constructor (props = {}) {
    props = {
      ...DEFAULT_MAP_PROPS,
      onResize: () => {
        if (this._map) {
          this._map.resize()
        }
      },
      ...props
    }
    const { mapboxCanvas, deckCanvas } = createCanvas(props)

    const viewState = props.viewState || props.initialViewState
    const basemap = props.basemap
    ...
  }
}
```

Once we have created the canvas for deck.gl and the basemap, we are ready to create the corresponding objects in the constructor. We create the `Deck` object by calling the base class constructor and we instantiate the Mapbox GL JS map using the same initial viewstate properties:

```javascript
export default class DeckMap extends Deck {
  constructor (props = {}) {
    ...
    super({ canvas: deckCanvas, ...props })
    this._map = new mapboxgl.Map({
      container: mapboxCanvas,
      style: props.mapStyle,
      interactive: false,
      center: [viewState.longitude, viewState.latitude],
      zoom: viewState.zoom,
      bearing: viewState.bearing || 0,
      pitch: viewState.pitch || 0
    })
    ...
  }
}
```

Finally we need to add the code for keeping the basemap and the layers in sync. We do this by using the `_onBeforeRender` event callback that is called just before the deck.gl canvas is re-rendered. We retrieve the current viewport and use the `jumpTo` method in the Mapbox GL JS `Map` object forcing a re-render with the `redrawMapbox` function. Please take a look at the [DeckMap.js](https://github.com/CartoDB/viz-doc/blob/master/deck.gl/examples/pure-js/vue/src/components/map-component/map-utils/DeckMap.js) file for the complete implementation.

```javascript
export default class DeckMap extends Deck {
  constructor (props = {}) {
    ...
    this._onBeforeRender = params => {
      this.onBeforeRender(params)
      if (this._map) {
        const viewport = this.getViewports()[0]
        this._map.jumpTo({
          center: [viewport.longitude, viewport.latitude],
          zoom: viewport.zoom,
          bearing: viewport.bearing,
          pitch: viewport.pitch
        })
        this.redrawMapbox()
      }
    }
  }
}
```

Now we are going to add the code to our `MapComponent` to initialize the map. When the component is mounted we are going to call a `setupDeck` method that will instantiate a `DeckMap` object passing the ID of the div container where we want to place the map (defined in the `MapComponent` HTML template file):

```javascript
import DeckMap from '@/components/map-component/map-utils/DeckMap'

export default {
  name: 'MapComponent',
  mounted () {
    this.setupDeck()
  },
  methods: {
    setupDeck () {
      this.deckInstance = new DeckMap({
        container: '#map'
      })
    }
  }
}
```

At this point, if you launch the development server by executing `yarn serve` in the project root folder, you should see the following web page when you go to `http://localhost:8080/`:

![vue-basic-layout](/img/deck-gl/vue-basic-layout.png 'Vue Basic Layout')

### Layers

Now we are ready to start adding deck.gl layers on top of the basemap. In Location Intelligence apps there are usually a set of functions for implementing common layer operations like adding, removing, retrieving, hiding, or showing a layer. We are going to encapsulate all this functionality in a new object that we are going to include in a file named [`layerManager`](https://github.com/CartoDB/viz-doc/blob/master/deck.gl/examples/pure-js/vue/src/components/map-component/map-utils/layerManager.js) within the `src/components/map-component/map-utils` folder. Most of the functions in that module are pretty simple but really useful for building spatial apps.

Instead of managing the `Deck` instance from the `MapComponent`, we are going to manage the instance from this module. We are going to add an `init` function that will take care of instantiating the object:

```javascript
import DeckMap from '@/components/map-component/map-utils/DeckMap'

export default {
  layers: {},
  deckInstance: null,
  init (deckProps) {
    this.deckInstance = new DeckMap(deckProps)
  },
  ...
}
```

Every time we make a modification to a layer (add, remove, update, hide, show...), we will call a `updateDeckInstance` function that will take care of updating the layers in the `Deck` instance:

```javascript
export default {
  ...,
  updateDeckInstance () {
    if (!this.deckInstance) {
      return
    }
    const layers = [...Object.values(this.layers)];
    if (this.deckInstance) {
      this.deckInstance.setProps({ layers })
    }
  },
  ...  
}
```

Now we need to go back to the `MapComponent` and initialize the `Deck` instance through the `layerManager`:

```javascript
import layerService from '@/services/layerManager'

export default {
  name: 'MapComponent',
  mounted () {
    this.setupDeck()
  },
  methods: {
    setupDeck () {
      layerService.init({
        container: '#map'
      })
    }
  }
}
```

We are going to add three different layers to showcase some of the options for working with [CARTO for deck.gl](/deck-gl). The Buildings and Railroads layers use the [`CartoLayer`](https://deck.gl/docs/api-reference/carto/carto-layer):

- Buildings. This is a polygon layer created from a BigQuery tileset. This layer will be hidden by default (`visible: false`).

- Railroads. This is a line layer created from a CARTO dataset.

- Stores. This is a point layer created from a GeoJSON dataset extracted from the CARTO platform using the [`getData`](https://deck.gl/docs/api-reference/carto/overview#support-for-other-deckgl-layers) function that uses deck.gl [`GeoJsonLayer`](https://deck.gl/docs/api-reference/layers/geojson-layer). We could have added directly the `CartoLayer` with `type: MAP_TYPES.TABLE` but we wanted to illustrate the `getData` functionality. For CARTO 2 you can follow a similar approach with the [SQL API](https://carto.com/developers/sql-api/).

When accessing datasets from the CARTO 3 platform you need to provide the name of a connection in the Workspace with access to the datasets:

<video height="425" autoplay="" loop="" muted=""> <source src="/img/deck-gl/workspace-connection.mp4" type="video/mp4"> Your browser does not support the video tag. </video> 

After you have created the connection, you need to create a token with access to the datasets using the Tokens API and use this token when setting up your credentials.

```shell
curl --location -g --request POST 'https://gcp-us-east1.api.carto.com/v3/tokens?access_token=eyJhb...' \
--header 'Content-Type: application/json' \
--data-raw '{
    "grants": [
        {
            "connection_name": "bqconn",
            "source": "SELECT geom, scalerank FROM cartobq.public_account.ne_10m_railroads_public"
        },
        {
            "connection_name": "bqconn",
            "source": "cartobq.public_account.retail_stores"
        },
        {
            "connection_name": "bqconn",
            "source": "cartobq.maps.msft_buildings"
        }
    ],
    "referers": []
}'
```

{{% bannerNote title="note" %}}
If you are working with the CARTO 2 platform you need to provide a username / API key combination that provides access to the datasets you want to use. In the CARTO 2 example we access data from the `public` user with the `default_public` API key. If you want to use your own datasets, public or private, you will need to provide your own credentials.
{{%/ bannerNote %}}

You provide the credentials using the [`setDefaultCredentials`](https://deck.gl/docs/api-reference/carto/overview#carto-credentials) function. These credentials will be used for accessing the datasets that will be the source for your layer. 

One common pattern in spatial apps is adding your layers when the view is accessed. So we are going to add our layers when the `Home` view is mounted. After we configure the credentials, we will call the `addLayer` function from the `layerManager` object with our deck.gl layer:

```javascript
import { GeoJsonLayer } from '@deck.gl/layers'
import { CartoLayer, API_VERSIONS, MAP_TYPES, setDefaultCredentials, colorCategories, colorContinuous } from '@deck.gl/carto'
import TemplateComponent from '@/components/template-component/TemplateComponent.vue';
import layerService from '@/services/layerService'

export default {
  name: 'app-home',
  components: {
    ViewTemplate
  },
  mounted () {
    setDefaultCredentials({
      apiBaseUrl: 'https://gcp-us-east1.api.carto.com',
      apiVersion: API_VERSIONS.V3,
      accessToken: 'eyJhbGciOiJIUzI1NiJ9.eyJhIjoiYWNfbHFlM3p3Z3UiLCJqdGkiOiI1YjI0OWE2ZCJ9.Y7zB30NJFzq5fPv8W5nkoH5lPXFWQP0uywDtqUg8y8c'
    });

    layerManager.addLayer(
      new CartoLayer({
        id: 'roads',
        connection: 'bqconn',
        type: MAP_TYPES.QUERY,
        data: 'SELECT cartodb_id, the_geom_webmercator, scalerank FROM cartobq.public_account.ne_10m_railroads_public',
        pickable: true,
        lineWidthScale: 20,
        lineWidthMinPixels: 2,
        autoHighlight: true,
        highlightColor: [0, 255, 0],
        getLineColor: colorContinuous({
          attr: 'scalerank',
          domain: [1, 2, 3, 4, 5, 10],
          colors: 'BluYl'
        })
      })
    )

    const geojsonData = await getData({
      type: MAP_TYPES.TABLE,
      source: `cartobq.public_account.retail_stores`,
      connection: 'bqconn',
      format: FORMATS.GEOJSON
    })
    this.storesData = geojsonData.features
    layerManager.addLayer(
      new GeoJsonLayer({
        id: 'stores',
        data: geojsonData.features,
        pointRadiusUnits: 'pixels',
        lineWidthUnits: 'pixels',
        pickable: true,
        getRadius: 3,
        autoHighlight: true,
        highlightColor: [0, 255, 0],
        getFillColor: colorCategories({
          attr: 'storetype',
          domain: ['Supermarket', 'Discount Store', 'Hypermarket', 'Drugstore', 'Department Store'],
          colors: 'Pastel'
        }),
        onDataLoad: data => this.storesData = data.features
      })
    )

    layerManager.addLayer(
      new CartoLayer({
        id: 'buildings',
        connection: 'bqconn', 
        type: MAP_TYPES.TILESET,
        data: 'cartobq.public_account.msft_buildings',
        visible: false,
        pointRadiusUnits: 'pixels',
        getFillColor: [240, 142, 240]
      })
    )
  },
  ...
}
```

If you reload the application now, you should see the railroads and stores layers overlaid on top of the basemap.

### Managing application state

One of the most difficult problems when designing a Location Intelligence app is coming up with a good design for managing the application global state. In spatial apps we usually have different components that have to be kept in sync. For instance, we have the map component and widgets like a layer selector or a chart. When we show or hide a layer using the layer selector, the map component needs to add or remove the corresponding layer from the map. In the case of charts, sometimes we want to show information only for the features in the current viewport, this means we need to listen to map viewport changes and update the chart accordingly.

We can have components listening directly to events generated by other components but it is very possible that our app will be difficult to maintain when the number of components and views grows. In modern Vue.js applications, we can take advantage of libraries like [Vuex](https://vuex.vuejs.org/) that provide state management functionality with a centralized store.

Vuex stores are reactive, meaning that, if you have components that retrieve state from the store, they will react to changes in the state and update themselves efficiently. It is also important to note that you cannot change the store's state directly. You need to commit [mutations](https://vuex.vuejs.org/guide/mutations.html) so you have a trackable record of changes to the state.

We start by adding the Vuex package:

```shell
yarn add vuex
```

Then we are going to create a store in the `src/store` folder. Vuex uses a single state tree but if you have a large application, you need to apply some kind of modular design to make it more manageable. We can divide the state in modules; in this example application we are going to have a single module called `map` but you can add more modules if your application grows.

We will start by creating an initial state for the `map` module in the `src/store/map/state.js` file. This state will contain the initial viewstate (initial center coordinates and zoom level), the credentials for accessing the CARTO datasets, the basemap, and a flag indicating if the map has been already loaded:

```javascript
import { BASEMAP } from '@deck.gl/carto'

export const initialViewState = () => ({
  longitude: -97.2,
  latitude: 44.33,
  zoom: 3,
})

export const state = {
  credentials: {
    username: 'public',
    apiKey: 'default_public'
  },
  basemap: BASEMAP.VOYAGER,
  mapLoaded: false,
  viewState: initialViewState(),
}
```

The first task we are going to perform with this state is remove the initializations we have added in the `DeckMap` class (`initialViewState` and `mapStyle`). If we want to access the state from a component, the simplest way is to return some store state from within a [computed property](https://vuejs.org/guide/computed.html). In the `MapComponent` we are going to retrieve both the `viewstate` and the `basemap` state variables.  

For retrieving state within a component we are going to use the [`mapState`](https://vuex.vuejs.org/guide/state.html#the-mapstate-helper) helper. We can use the `mapState` helper for directly retrieving state properties passing an array with the property names. As we want to retrieve more than one state variable, we must use the object spread operator to combine the different objects:

```javascript
import { mapState, mapGetters } from 'vuex'
import { MODULE_NAME, GETTERS } from '@/store/map'

export default {
  name: 'MapComponent',
  ...
  computed: {
    ...mapState(MODULE_NAME, ['viewState', 'basemap'])
  },
  methods: {
    setupDeck () {
      layerService.init({
        container: '#map',
        mapStyle: this.basemap,
        viewState: this.viewState
      });
    }
  }
}
```

Before being able to use the store, we need to add it in the `main.js` file:

```javascript
import store from './store'

new Vue({
  router,
  store,
  render: h => h(AppShell)
}).$mount('#app')
```

Now we should see our application with the railroads and stores layers but with the state initialized from the store. Before we end this section, we are going to discuss how we can update the state using mutations. We are going to focus in the case of updating the viewstate property when there is a change in the map viewstate but you can look at the code to see how we have implemented other mutations. 

We are going to start by defining the mutation. For convenience, we declare constants for each mutation in the `src/store/map/constants.js` file. In this case the constant is called `SET_VIEWSTATE`:

```javascript
...
export const MUTATIONS = {
  ...,
  SET_VIEWSTATE: 'setViewState',
  ...
}
```

Then we define the mutation in the `src/store/map/mutations.js` file that will update the state's `viewState` property. For performance errors we do a debounce to avoid updating the viewstate too many times in a continuous zoom or pan operation:

```javascript
import { MUTATIONS } from './constants'
import layerService from '@/services/layerService'
import { debounce } from '@/utils/debounce';

export const mutations = {
  ...,
  [MUTATIONS.SET_VIEWSTATE]: (state, viewState) => {
    setDelayedViewState(state, viewState);
    layerService.deckInstance.setProps({ viewState: { ...viewState } })
  },
  ...
}
...
const setDelayedViewState = debounce((state, v) => {
  state.viewState = v
}, 500)
```

Finally we need to commit the mutation when the map viewstate changes. We can track map viewstate changes in the deck.gl instance through the `onViewStateChange` event callback. We are going to add the code for commiting the mutation when we are initializing our `Deck` instance in the `MapComponent`:

```javascript
export default {
  name: 'MapComponent',
  ...,
  methods: {
    ...mapMutations(MODULE_NAME, [
      MUTATIONS.SET_VIEWSTATE
    ]),
    setupDeck () {
      layerService.init({
        container: '#map',
        mapStyle: this.basemap,
        viewState: this.viewState,
        onViewStateChange: ({ viewState }) => {
          this[MUTATIONS.SET_VIEWSTATE](viewState)
        }
      });
    }
  }
}
```

### Manage layer visibility

Now that we have a way for syncing components through a centralized state using the Vuex store, we can start adding useful functionality. In Location Intelligence applications, one basic feature is the ability to show or hide layers on demand. We are going to create a new component called `LayerSelector` to control the visibility of layers in the `src/components/layer-selector` folder.

In the HTML template for the component we are going to use the [`<md-switch>`](https://vuematerial.io/components/switch/) component from Vue Material. The first task we need to perform is import it in the `main.js` file and tell Vue to use it. The component will read the data from an array called `layersData`. We will use the `change` event to update the layer visibility when the user interacts with the toggle.

```html
<div class="switch-container">
  <h3 class="title">Layers</h3>
  <md-switch
    class="md-primary"
    v-if="mapLoaded_"
    v-for="l of layersData"
    v-model="l.isVisible"
    @change="handleChange(l.id)"
  >
    {{l.label}}
  </md-switch>
</div>
```

In the `.vue` file we will implement the component logic. The component will be initialized when the map is loaded, so we need to retrieve the `mapLoaded` property from the store's state and watch until it becomes `true`. When the map is loaded, we need to loop through the layers and initialize the component depending on the value of the layer `visible` property. Finally we need to define a method for handling the `change` event: this method will call the `layerService` functions for hiding or showing the layer. 

```javascript
import { mapState } from 'vuex'
import { MODULE_NAME } from '@/store/map'
import layerManager from '@/components/map-component/map-utils/layerManager'

export default {
  name: 'LayerSelector',
  components: {},
  data: () => ({
    mapLoaded_: false,
    layersData: []
  }),
  methods: {
    handleChange (layerId) {
      const isVisible = layerService.isVisible(layerId);
      layerService[isVisible ? 'hideLayer' : 'showLayer'](layerId);
    }
  },
  computed: {
    ...mapState(MODULE_NAME, ['mapLoaded']),
  },
  watch: {
    mapLoaded(isLoaded) {
      const layers = Object.entries(layerService.getLayers());
      this.layersData = layers.map(([id, layer]) =>
        ({ id, isVisible: 'visible' in layer.props ? layer.props.visible : true, label: id || '' }))
      this.mapLoaded_ = isLoaded
    },
  }
}
```

When we have our component ready, we must add it to the `HomeSidebar` HTML template:

```html
<div class="sidebar-container">
  <LayerSelector></LayerSelector>
</div>
```

And we need to include it in the `HomeSidebar.vue` file as well:

```javascript
import LayerSelector from '../layer-selector/LayerSelector.vue';

export default {
  name: 'HomeSidebar',
  components: {
    LayerSelector
  }
}
```

If we load the application now, we will see the layer selector which will be in the sidebar. The switch for the building layer will be off when initializing the map and the switches for the other two layers will be on. If we use the switches, the layers will be hidden or shown.

### Interactivity

Another important functionality commonly found in Location Intelligence applications is interactivity. In our example we are using two different features to make our application more interactive and have a better user experience:

- Highlighting the features when the user moves the pointer over them
  
- Showing a tooltip with feature information when the user moves the pointer over it
  
Highlighting features is very easy using deck.gl. For instance, if we want to highlight the railroad lines with a green color, we just need to add the following properties to the deck.gl layer instantiation in the `Home.vue` file:

```javascript
...
pickable: true,
autoHighlight: true,
highlightColor: [0, 255, 0],
...
```

Implementing a tooltip with deck.gl is also relatively easy. First we need to set the `pickable` property to `true` for all the layers we want to show a tooltip for (in the layer instantiation). Then we need to add an event handler for the `getTooltip` property in the deck.gl instance instantiation. In this example, we are going to define a default property in the `DeckMap` class:

```javascript
const DEFAULT_MAP_PROPS = {
  ...
  getTooltip,
  ...
```

The `getTooltip` function must first check if we have picked any object. If that's the case, the function must return the picked object and two properties: `html` and `style`, that define the content and style for the tooltip. We have made a generic implementation that shows all the properties from the object except for the `layerName` and `cartodb_id`:

```javascript
const TOOLTIP_STYLE = {
  color: '#fff',
  opacity: '0.9',
  borderRadius: '0.25rem',
  textTransform: 'capitalize',
  fontFamily: 'Montserrat, "Open Sans", sans-serif',
  fontSize: '0.7rem'         
};
...
function getTooltip(pickingInfo) {
  if (pickingInfo.object) {
    let html = `<div style="font-size: 0.9rem;"><strong>${pickingInfo.layer.id}</strong></div>`;

    for (const [name, value] of Object.entries(pickingInfo.object.properties)) {
      if (name !== 'layerName' && name !== 'cartodb_id') {
        html += `<div><strong>${name}: </strong>${value}</div>`;
      }
    }
    
    return {
      html,
      style: TOOLTIP_STYLE
    }
  }

  return null;
}
```

{{% bannerNote title="tip" %}}
We have implemented a common tooltip that is applied to all the different layers. If you want to have a custom tooltip for each layer or you want to be able to capture other picking events such as the click on a feature, you must use the `onHover` and/or `onClick` events in the layer, instead of the deck.gl instance built-in tooltip.
{{%/ bannerNote %}}

### Charts

We are going to finish this guide by adding a chart to our application. This is another functionality that we usually see in Location Intelligence apps that allows users to better analyze the information displayed in the map.

In the example we have created a component that shows a bar chart with the revenue by store type for stores in the current viewport. To implement the chart we are using the [Apache ECharts](https://echarts.apache.org/en/index.html) library. 

First we must add the `echarts` package and the `vue-echarts` package, that facilitates the use of ECharts with Vue, to our project. We also need to add the `@vue/composition-api` package as a dev dependency because it is a requirement for using `vue-echarts` in Vue 2:

```shell
yarn add echarts
yarn add vue-echarts
yarn add -D @vue/composition-api
```

We are going to start by creating a `BarChart` component in the `src/components/bar-chart` folder. The HTML template file will take advantage of the `<v-chart>` component from Vue Echarts:

```html
<div class="bar-chart-container">
    <v-chart :option="bar" :loading="isLoading" autoresize />
</div>
```

When the viewstate changes, we need to retrieve the features in the current viewport. We are going to add a `compute` function in a new `src/utils/viewportFeatures.js` file. This function is going to calculate the features in the current viewport using the `booleanIntersects` function from the [Turf.js](https://turfjs.org/) library.

First we add the corresponding packages:

```shell
yarn add @turf/bbox-polygon
yarn add @turf/boolean-intersects
```

And now we add the code to the `viewportFeatures.js` file:

```javascript
import { WebMercatorViewport } from '@deck.gl/core'
import bboxPolygon from '@turf/bbox-polygon'
import intersects from '@turf/boolean-intersects'

export const viewportFeaturesFunctions = {
  compute(viewState, features) {
    const viewport = getViewport(viewState)
    return features.filter((f) => intersects(f, viewport))
  }
}

function getViewport(viewState) {
  const bounds = new WebMercatorViewport(viewState).getBounds()
  return bboxPolygon(bounds)
}
```

To update the `viewportFeatures` property in the store's state, we need to watch for changes in the `viewState` state property in the `Home` view, calculate the features in the current viewport with the function above and commit the `SET_VIEWPORT_FEATURES` mutation. 

```javascript
export default {
  name: 'app-home',
  ...
  methods: {
    ...mapMutations(MODULE_NAME, [MUTATIONS.SET_VIEWPORT_FEATURES])
  },
  computed: {
    ...mapState(MODULE_NAME, ['viewState']),
  },
  watch: {
    viewState(v) {
      const viewportFeatures = viewportFeaturesFunctions.compute(v, this.storesData)
      this[MUTATIONS.SET_VIEWPORT_FEATURES](viewportFeatures)
    }
  }
}
```

Now we are ready to add the charting code to the component class. The chart is updated automatically with every viewstate change. To ensure this happens, the component retrieves the `viewportFeatures` property from the store's state that we have calculated above. When this property is updated, we do the calculations for grouping the stores by type in revenue buckets and update the chart:

```javascript
export default {
  components: {
    'v-chart': ECharts,
  },
  ...
  computed: {
    ...mapState(MODULE_NAME, ['viewportFeatures'])
  },
  watch: {
    viewportFeatures(data) {
      const groupedValues = groupValuesByColumn(data, 'revenue', 'storetype');
      const { xAxis, series } = this.bar;
      xAxis.data = groupedValues.map((d) => d.category);
      series.data = groupedValues.map((d) => d.value);
      this.isLoading = false;
    }
  }
};
```

The features are grouped by store type and the revenue is summed using the `groupValuesByColumn` method. This method returns an array of key-value properties with the store type (category) as the key and the revenue per store type as the value. We call this method using the store type as the keys column and the store revenue as the values column.

This method uses a map-reduce approach: in the map stage, we assign each store to its category (store type) and in the reduce stage we accumulate the store revenue. Finally we sum the revenues for each of the store types. 

```javascript
export function groupValuesByColumn(data, valuesColumn, keysColumn) {
  if (Array.isArray(data) && data.length === 0) {
    return [{category: '', value: 0}];
  }
  
  const groups = data.reduce((accumulator, item) => {
    const group = item.properties[keysColumn];
  
    accumulator[group] = accumulator[group] || [];
  
    const isValid = item.properties[valuesColumn] !== null && item.properties[valuesColumn] !== undefined;
  
    if (isValid) {
      accumulator[group].push(item.properties[valuesColumn]);
    }
  
    return accumulator;
  }, {});
  
  return Object.entries(groups).map(([category, value]) => ({
    category,
    value: sum(value)
  }));
}
  
const sum = (values, key) => {
  const fn = key ? (a, b) => a + b[key] : (a, b) => a + b;
  return values.reduce(fn, 0);
};
```

The last task left is adding the chart component to the `HomeSidebar` HTML template and `.vue` files:

```html
<div class="sidebar-container">
  <LayerSelector></LayerSelector>
  <BarChart></BarChart>
</div>
```

```javascript
import BarChart from '../bar-chart/BarChart.vue';

export default {
  name: 'HomeSidebar',
  components: {
    ...,
    BarChart
  }
}
```

{{% bannerNote title="tip" %}}
In this simple example, the chart component is tightly coupled with the Stores layer. If you are building a more complex application with several charts, this component can be easily generalized to work with different layers and generate different types of charts. In the particular case of the `groupValuesByColumn`, this method is implementing a calculation similar to performing a SQL query with a `GROUP BY` clause on the keys column and the map stage can be improved to apply different aggregation operations, in addition to the current `SUM` calculation (`COUNT`, `SUM`, ..)
{{%/ bannerNote %}}

