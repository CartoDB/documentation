## Getting started

The CARTO platform is framework-agnostic so you can build applications using CARTO with your framework of choice. When you build an application with CARTO it is common to use deck.gl as the visualization library. This guide describes an approach for integrating [CARTO for deck.gl](/deck-gl) within applications developed using the [Angular](https://angular.io/) framework, but you can use CARTO with Angular and other visualization libraries.

We have created an example that you can download and execute in your own local machine, available in the viz-doc [repository](https://github.com/CartoDB/viz-doc):

<ul class="grid-cell--col10 grid u-mt16">
    <li class="grid-cell grid-cell--col6 grid-cell--col12--mobile u-mb20">
        <a href="https://github.com/CartoDB/viz-doc/tree/master/deck.gl/examples/pure-js/angular" target="_blank" class="clickable-card clickable-card--small">
        <img class="u-mr4" src="/img/documentation/github.svg" alt="Github" style="filter: invert(1); margin-bottom: 8px">
        <h3 class="title f20 is-txtBaseGrey u-mt8" style="margin-top: 8px;">viz-doc</h3>
        <p class="text f16 is-txtTypo2 u-mt8">CARTO for deck.gl + Angular example</p>
        </a>
    </li>
</ul>

This guide follows a step-by-step approach using the mentioned example as reference. To download and execute the example, start by cloning the repository:

```shell
git clone git@github.com:CartoDB/viz-doc.git
```   

Then change the current directory to the Angular example for CARTO 2 or CARTO 3:

```shell
cd viz-doc/deck.gl/examples/pure-js/angular/carto3
```   

Install the packages using the following command:

```shell
npm install
```   

Now you are ready to start the application in your local development environment:

```shell
ng serve
```   

And you will be able to access the application using the following URL:

`https://localhost:4200`

### Creating your application

We are going to start by creating a new Angular application using the [Angular CLI](https://angular.io/cli). If you haven't installed it already, you need to execute the following command:

```bash
npm install -g @angular/cli
```

Then we create our application using the `ng new` command:

```bash
ng new carto-deckgl-angular
```

The tool will ask us to select some options. We are going to select the following:

- Answer 'N' to strict type checking question
- Answer 'Y' to use angular routing
- Select 'CSS' as the stylesheet format

Now we are going to add the [deck.gl](https://deck.gl) packages using the following commands:

```bash
npm install deck.gl
npm install @deck.gl/carto
npm install @deck.gl/core
npm install @deck.gl/layers
```

### Basic layout

At this point we have the default Angular project structure with the addition of the deck.gl packages. Now we start by defining our application layout. We will have a simple but versatile layout with a header, a left sidebar, and a map area.

The first task we are going to perform is to generate a header component in the `src/app/components` folder with this command:

```bash
ng g component components/header
```

In the example, the header component includes a logo and a title. It also includes custom CSS styles. Please take a look at the [HTML template](https://github.com/CartoDB/viz-doc/blob/master/deck.gl/examples/pure-js/angular/src/app/components/header/header.component.html) and [component styles](https://github.com/CartoDB/viz-doc/blob/master/deck.gl/examples/pure-js/angular/src/app/components/header/header.component.scss) definition.

Then we specify the overall layout for the application in the App component HTML template. The layout includes the header and a `<router-outlet>` component that will be used to plug the different views into the outlet:

```html
<app-header></app-header>
<router-outlet></router-outlet>
```

### Home module

We start by adding the module into the `modules\home` folder using the CLI:

```bash
ng g module modules/home/home
```

Inside this module we are going to have one main component (`home`):

```bash
ng g component modules/home/home
```

This component will contain the `<router-outlet>` component to plug it into the main app component layout and a `<div>` element that will contain our map:

```html
<router-outlet name="home"></router-outlet>
<div class="map-container">
</div>
```

In the `<router-outlet>` element we are going to inject a new component (`SidebarComponent`) that will contain the user interface elements for this view:

```bash
ng g component modules/home/views/sidebar
```

We are going to leave this component empty for now but we are going to configure routing so this component will be loaded when we request the homepage for the application. We need to open the `app-routing.module.ts` file and configure the `routes` property to load the HomeComponent and its SidebarComponent child:

```Typescript
const routes: Routes = [
  {
    path: '', component: HomeComponent, children: [
      {
        path: '',
        component: SidebarComponent,
        outlet: 'home'
      }
    ]
  }
];
```

{{% bannerNote title="tip" %}}
Our example application is going to have only one module but we have prepared the example with [Angular Routing](https://angular.io/guide/router) so you can use it as an starting point for creating a more complex application with multiple modules and views.
{{%/ bannerNote %}}

### Map component

Now that we have our basic layout and routing, we are going to add a map component to the container that we have defined in the `home` component. This component could be potentially shared by different modules/views, so it is going to be included in a new module called `shared`:

```bash
ng g module modules/shared/shared
```

Now we create the `map` component:

```bash
ng g component modules/shared/map
```

The HTML template for this component will include a main `<div>` element with one inner `<div>` for the basemap and a `canvas` element for deck.gl:

```html
<div class="map-container">
  <div #mapboxContainer></div>
  <canvas #deckCanvas></canvas>
</div>
```

The style definition includes the CSS styles to ensure the map takes almost all of the remaining space:

```css
.map-container {
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: calc(100vh - 4rem);

  * {
    top: 0;
    left: 0;
    width: 100%;
    height: calc(100vh - 4rem);
  }
}
```

Finally we must add the code to include our map in the component TypeScript file. There are three main tasks we need to perform:

1. Add our map when the component has been initialized (`ngAfterViewInit`). We call a private function `launchMap` with the initial center coordinates and zoom level:

```Typescript
ngAfterViewInit() {
  this.launchMap(INITIAL_VIEW_STATE);
}
```

2. In the `launchMap` function, create the Mapbox GL JS `MapboxMap` object that will manage the basemap specifying the initial center coordinates and zoom level. Here we are using our Positron basemap.

```Typescript
const map = new MapboxMap({
  container: this.mapboxContainer.nativeElement,
  style: BASEMAP.POSITRON,
  interactive: false,
  center: [initialViewState.longitude, initialViewState.latitude],
  zoom: initialViewState.zoom
});
```

3. In the same function, right after the `MapboxMap`, create the deck.gl instance to draw our layers. We use the `onBeforeRender` event handler to synchronize the view state between the deck.gl instance and the basemap using the `jumpTo` and `redrawMapbox` methods.

```Typescript
this.deck = new Deck({
  canvas: this.deckCanvas.nativeElement,
  initialViewState,
  controller: true,
  onBeforeRender: () => {
    if (this.deck) {
      const viewport = this.deck.getViewports()[0];
      map.jumpTo({
        center: [viewport.longitude, viewport.latitude],
        zoom: viewport.zoom,
        bearing: viewport.bearing,
        pitch: viewport.pitch
      });
      this.redrawMapbox(map);
    }
  },
});
```

In order to have optimal performance, we run both the Mapbox GL JS map and deck.gl instantiations outside Angular zone, to ensure Angular is not running any change detection code (`zone.runOutsideAngular`).

### Layers

If we run our application in this moment, we will hopefully see our homepage with an empty sidebar on the left and our Positron basemap in the map area. We are ready to start adding our layers to the map.

The process for adding layers with datasets from the CARTO 3 platform involves these steps:

1. Create a connection in the Workspace with access to the datasets
2. Set the credentials to connect with the CARTO platform
3. Create a layer that uses the connection and the credentials to retrieve the data and render it
4. Add the layer to the map

#### Creating a connection in the workspace

In the Workspace we need to define a connection with access to those datasets and use the connection name when instancing the layers.

<video height="425" autoplay="" loop="" muted=""> <source src="/img/deck-gl/workspace-connection.mp4" type="video/mp4"> Your browser does not support the video tag. </video>

#### Setting the credentials

The Map component is also responsible for setting the credentials we will use for connecting with the CARTO platform and retrieving the data for the layers we are going to add in the next section. 

First we need to create a token using the Tokens API with access to the datasets we want to visualize:

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

Then we set the credentials by using the [`setDefaultCredentials`](https://deck.gl/docs/api-reference/carto/overview#carto-credentials) method from the CARTO for deck.gl module. 

```typescript
setDefaultCredentials({
  apiBaseUrl: 'https://gcp-us-east1.api.carto.com',
  apiVersion: API_VERSIONS.V3,
  accessToken: 'eyJhbGciOiJIUzI1NiJ9.eyJhIjoiYWNfbHFlM3p3Z3UiLCJqdGkiOiI1YjI0OWE2ZCJ9.Y7zB30NJFzq5fPv8W5nkoH5lPXFWQP0uywDtqUg8y8c'
});
```

#### Creating the layers

Once we have established the credentials for connecting to the CARTO platform, we can add layers to visualize the datasets. 

We are going to define a [base class](https://github.com/CartoDB/viz-doc/blob/master/deck.gl/examples/pure-js/angular/src/app/models/layer.ts) for layers from which all the layers will inherit. The Layer objects will include an `id` property in order to identify the layer and a `visible` property initialized by default to `true`. The base layer implements the `show` and `hide` methods and defines the `getLayer` method that must be implemented by derived layers:

```Typescript
export class Layer {

  id: string;
  visible: boolean = true;

  constructor() {}

  async getLayer () {
    return {}
  }

  show () {
    this.visible = true;
    return { visible: true }
  }

  hide () {
    this.visible = false;
    return { visible: false }
  }
}
```

{{% bannerNote title="tip" %}}
This base class is included in the `src/app/models` folder but we are going to include our application layers within the `home` module. If we think we are going to use the layers in multiple modules/views, we should probably add them to the `shared` module.
{{%/ bannerNote %}}

We want the layers to be provided and injected as dependencies so we define them as classes with the `Injectable` decorator. First we create a folder named `layers` within the `modules/home` folder and then we create a class for each of the layers we want to use in the application. 

In the example we have created three layers to showcase some of the options for working with CARTO datasets and tilesets. The Buildings and Railroads layers use the [`CartoLayer`](https://deck.gl/docs/api-reference/carto/carto-layer):

- [BuildingsLayer](https://github.com/CartoDB/viz-doc/blob/master/deck.gl/examples/pure-js/angular/src/app/modules/home/layers/buildings-layer.ts). This is a polygon layer created from a BigQuery tileset.

- [RailroadsLayer](https://github.com/CartoDB/viz-doc/blob/master/deck.gl/examples/pure-js/angular/src/app/modules/home/layers/rail-roads-layer.ts). This is a line layer created from a CARTO dataset.

- [StoresLayer](https://github.com/CartoDB/viz-doc/blob/master/deck.gl/examples/pure-js/angular/src/app/modules/home/layers/stores-layer.ts). This is a point layer created from a GeoJSON dataset extracted from the CARTO platform using the [`getData`](https://deck.gl/docs/api-reference/carto/overview#support-for-other-deckgl-layers) function that uses deck.gl [`GeoJsonLayer`](https://deck.gl/docs/api-reference/layers/geojson-layer). We could have directly added the `CartoLayer` with `type: MAP_TYPES.TABLE` but we wanted to illustrate the `getData` functionality. For CARTO 2 you can follow a similar approach with the [SQL API](https://carto.com/developers/sql-api/).

The structure for all the layers is similar: we define a class that extends from the base `Layer` class. We need to specify a unique `id` for the layer and set the `visible` property to `true` or `false` depending on if we want to show the layer or not when the view is loaded. The most important part is creating the deck.gl object that we must return in the `getLayer` method. Here we specify the data source for the layer, the `id`, and `visible` properties and the styling properties like `getFillColor` or `getLineColor`. Below you can see the implementation for the `getLayer` method in the `RailroadsLayer`:

```Typescript
async getLayer() {
  return new CartoLayer({
    id: this.id,
    connection: 'bqconn',
    type: MAP_TYPES.QUERY,
    data: 'SELECT geom, scalerank FROM cartobq.public_account.ne_10m_railroads_public',
    visible: this.visible,
    pickable: true,
    lineWidthScale: 20,
    lineWidthMinPixels: 2,
    getLineColor: colorContinuous({
      attr: 'scalerank',
      domain: [4, 5, 6, 7, 8, 9, 10],
      colors: 'BluYl'
    }),
    getLineWidth: (f: any) => f.properties.scalerank,
    autoHighlight: true,
    highlightColor: [0, 255, 0],
  });
}
```

#### Adding the layers to the map

Now that we have created our layers, we are ready to add them to the map. We want the layers to be added or removed when we load a new view (plug a component in the `<router-outlet>`). So we need to go to the component class definition and add the corresponding code. 

In this case, we must add it to the `SidebarComponent`. First we must inject the layer objects in the constructor:

```Typescript
export class SidebarComponent implements OnInit, OnDestroy {

  constructor(
    private railRoadsLayer: RailRoadsLayer,
    private buildingsLayer: BuildingsLayer,
    private storesLayer: StoresLayer
  ) 
  ...
```

Then we can use the `ngOnInit` event handler to add the layers to the map and the `ngOnDestroy` event handler to remove the layers from the map when we switch to a different view.

Instead of adding or removing directly the layers in those event handlers, we are going to define an Angular service that will implement the most common operations found in Location Intelligence applications. The service is going to be called [`MapService`](https://github.com/CartoDB/viz-doc/blob/master/deck.gl/examples/pure-js/angular/src/app/services/map.service.ts) and will take care of adding, removing, or updating layers, amongst other operations:

```shell
ng g service services/map
```

The first task we need to perform is to add to the service the deck.gl instance created by the `MapComponent`. We define a `setDeckInstance` public method that will be called after we have created the deck.gl instance in the `launchMap` private method:

```typescript
...
this.mapService.setDeckInstance(this.deck);
...
```

Then we need to add a couple of private arrays to manage the layers efficiently. The `layers` array will contain the collection of deck.gl layers and the `layersIdx` array will contain the ids for these layers so we can efficiently retrieve, update, or remove layers. 

For example, adding a layer to the map will be an asynchronous operation that includes adding the layer `id` to the `layersIdx` array, adding the deck.gl layer to the `layers` array and calling the `updateDeck` private method to update the deck.gl instance `layers` property:

```typescript
async addLayer(layer: Layer) {
  this.layersIdx[layer.id] = this.layers.length;
  this.layers.push(await layer.getLayer());

  if (this.deck) this.updateDeck();
}
```

Please review the [`MapService`](https://github.com/CartoDB/viz-doc/blob/master/deck.gl/examples/pure-js/angular/src/app/services/map.service.ts) code to discover how we are implementing the different layer operations.

Now that we have the `MapService` defined, we must inject the dependency in the `SidebarComponent` and use the service to add and remove layers in the event handlers:

```typescript
async ngOnInit() {
  await this.mapService.addLayer(this.railRoadsLayer);
  await this.mapService.addLayer(this.buildingsLayer);
  await this.mapService.addLayer(this.storesLayer);
}

ngOnDestroy () {
  this.mapService.removeLayer(this.railRoadsLayer.id);
  this.mapService.removeLayer(this.buildingsLayer.id);
  this.mapService.removeLayer(this.storesLayer.id);
}
```

One important functionality of this service is the ability to keep the different applications components in sync. In order to implement this functionality with a clear design we take advantage of the [`Observable`](https://rxjs-dev.firebaseapp.com/guide/observable), [`Subject`](https://rxjs-dev.firebaseapp.com/guide/subject), and [`BehaviorSubject`](https://rxjs-dev.firebaseapp.com/guide/subject#behaviorsubject) types defined in the Angular [RxJS library](https://angular.io/guide/rx-library). With this library we can use reactive programming concepts that provide a sound approach to Location Intelligence applications where you need to maintain several elements in sync (map, layers, user interface components...)

Please take a look at the `onLayerChange` event handler and the `onViewStateChange` property to understand how we are synchronizing layer changes (for example when we are filtering data) or viewstate changes.

### Manage layer visibility

We already have an application where we are showing layers with data coming from the CARTO platform. In Location Intelligence applications, one basic functionality is the ability to show or hide layers on demand. We are going to create a new component called `ToggleComponent` to control the visibility of layers.

```shell
ng g component modules/home/components/toggle/toggle
```

{{% bannerNote title="tip" %}}
We are adding this component to the `modules/home/components` folder because, in this simple example, we only have one module (`home`) and the component is quite coupled with the module/view. If you are going to build an application with multiples modules/views, it makes sense to generalize the functionality of this component and instead add it to the `modules/shared/components` folder so that we can reuse it in all the views.
{{%/ bannerNote %}}

In the HTML template for the component we are going to use the [`<mat-slide-toggle>`](https://material.angular.io/components/slide-toggle/overview) component from the [Angular Material](https://material.angular.io/) UI library. We will include a slide toggle component for each layer. We will use the `change` event to update the layer visibility when the user interacts with the toggle and the `checked` event to keep the layer visibility status up-to-date.

```html
<mat-slide-toggle
  (change)="onVisibilityChange($event)"
  [checked]="layersStatus[railRoadsLayer.id]"
  name="sql">
  Railroads
</mat-slide-toggle>

<mat-slide-toggle
  (change)="onVisibilityChange($event)"
  [checked]="layersStatus[buildingsLayer.id]"
  name="bigquery">
  Buildings
</mat-slide-toggle>

<mat-slide-toggle
  (change)="onVisibilityChange($event)"
  [checked]="layersStatus[storesLayer.id]"
  name="geojson">
  Stores
</mat-slide-toggle>
```

This component must access both the layers and the map service so we must inject them in the constructor. When the component is initialized (`ngOnInit`), we will initialize the layersStatus array with the values from the layers' `visible` property and we will create a [`Subscription`]() to the map service `onLayerChange` event so we can update the layer status when it changes.

When the user interacts with the toggle to update the visibility for a layer, the component will call the `MapService` `UpdateLayer` method and the layers' `show` or `hide` method:

```typescript
...
this.mapService.updateLayer(
  this.railRoadsLayer.id, 
  evt.checked ? this.railRoadsLayer.show() : this.railRoadsLayer.hide()
);
...
```

Finally we must add the component to the `SidebarComponent` HTML template:

```html
<app-toggle></app-toggle>
```

### Interactivity

Another important functionality commonly found in Location Intelligence applications is interactivity. In our example we are using two different features to make our application more interactive and have an improved user experience:

- Highlighting the features when the user moves the pointer over them
  
- Showing a tooltip with feature information when the user moves the pointer over it
  
Highlighting features is very easy using deck.gl. For instance, if we want to highlight the railroad lines with a green color, we just need to add the following properties to the deck.gl layer instantiation:

```typescript
...
pickable: true,
autoHighlight: true,
highlightColor: [0, 255, 0],
...
```

Implementing a tooltip with deck.gl is also straight forward. First we need to set the `pickable` property to `true` for all the layers we want to show a tooltip for (in the layer instantiation). Then we need to add an event handler for the `getTooltip` property in the deck.gl instance instantiation in the `MapComponent`:

```typescript
getTooltip: this.tooltip   
```

The `tooltip` method must first check if we have picked any object. If that's the case, the function must return the picked object and two properties: `html` and `style`, that define the content and style for the tooltip. We have made a generic implementation that shows all the properties from the object except for the `layerName` and `cartodb_id`:

```typescript
tooltip(pickingInfo: any) {
  if (pickingInfo.object) {
    let html = `<div style="padding-bottom: 10px;"><strong>${pickingInfo.layer.id}</strong></div>`;
    for (const [name, value] of Object.entries(pickingInfo.object.properties)) {
      if (name != "layerName" && name != "cartodb_id") {
        html += `<div><strong>${name}: </strong>${value}</div>`;
      }
    }
    let style = {
      backgroundColor: '#FFF',
      color: '#111',
      fontFamily: 'Open Sans'          
    };
    return(pickingInfo.object && {
      html: html,
      style: style
    });  
  }
  return(null);
}
```

{{% bannerNote title="tip" %}}
We have implemented a common tooltip that is applied to all the different layers. If you want to have a custom tooltip for each layer or you want to be able to capture other picking events such as the click on a feature, you must use the `onHover` and/or `onClick` events in the layer, instead of the deck.gl instance built-in tooltip.
{{%/ bannerNote %}}

### Charts

We are going to finish this guide by adding a chart to our application. This is another functionality that we usually see in Location Intelligence applications that allows users to better analyze the information displayed in the map.

In the example we have created a component that shows a bar chart with the number of the stores layer features by store type in the current viewport. To implement the chart we are using the [Apache ECharts](https://echarts.apache.org/en/index.html) library. 

First we must add the `echarts` package and the `ngx-echarts` package, that facilitates the use of ECharts with Angular, to our project. We must import the `NgxEchartsModule` and the different objects from the `echarts` package in our `HomeModule`:

```typescript
import { NgxEchartsModule } from "ngx-echarts";
import * as echarts from 'echarts';
```

Then we create our component:

```shell
ng g component modules/home/components/chart/chart
```

In the component HTML template, we add the `div` element that will contain our chart:

```html
<div echarts [options]="chartOptions" class="bar-chart"></div>
```

We set the chart height in the component styles definition file and then we are ready to add the charting code to the component class. The chart is updated automatically with every viewstate change. In order to achieve this, the `MapService` is injected in the component constructor and the component subscribes to the map service `onViewStateChange` event in the `ngOnInit` handler. When this event is fired, we retrieve the stores layer features in the current viewport and update the chart:

```typescript
ngOnInit() {
  ...
  this.subscription.add(
    this.mapService.onViewStateChange.subscribe((viewportBbox: any) => {
      if (viewportBbox && this.storesData) {
        const viewportFeatures = getViewportFeatures(this.storesData, viewportBbox);
        this.setChartDataWithViewportFeatures(viewportFeatures);
      }
    })
  );
  ...
}
```

To retrieve the features in the current viewport we use the `booleanIntersects` function from the [Turf.js](https://turfjs.org/) library:

```typescript
function getViewportFeatures(features: any, viewport: any) {
  return features.filter((f: any) => intersects(f, viewport));
}
```

Then the features are grouped by store type and counted using the `groupValuesByColumn` method. This method returns an array of key-value properties with the store type (category) as the key and the number of stores as the value. We call this method using the store type as the keys column and the store revenue as the values column.

This method uses a map-reduce approach: in the map stage, we assign the store to its category (store type) and in the reduce stage we accumulate the store revenue. Instead of summing the revenues for each of the store types, we are simplifying the calculation and just returning the number of elements (stores) per category (store type). 

```typescript
function groupValuesByColumn(data: [], valuesColumn: string, keysColumn: string) {
  ...    
  const groups = data.reduce((accumulator: any, item: any) => {
    const group = item.properties[keysColumn];

    accumulator[group] = accumulator[group] || [];

    const isValid = item.properties[valuesColumn] !== null && item.properties[valuesColumn] !== undefined;

    if (isValid) {
      accumulator[group].push(item.properties[valuesColumn]);
    }

    return accumulator;
  }, {});

  return Object.entries(groups).map(([category, value]: [string, any]) => ({
    category,
    value: value.length
  }));
  ...
}
```

Finally we must add the chart component to the `SidebarComponent` HTML template with a divider separating it from the toggle component:

```html
<app-toggle></app-toggle>
<mat-divider></mat-divider>
<app-chart></app-chart>
```

{{% bannerNote title="tip" %}}
In this simple example, we have included this chart component in the `Home` module and it is tightly coupled with the Stores layer. If you are building a more complex application with several charts, this component can be easily generalized to work with different layers and generate different types of charts. In the particular case of the `groupValuesByColumn`, this method is implementing a calculation similar to performing a SQL query with a `GROUP BY` clause on the keys column and the map stage can be improved to apply different aggregation operations, in addition to the current `COUNT` calculation (`AVG`, `SUM`, ..)
{{%/ bannerNote %}}

