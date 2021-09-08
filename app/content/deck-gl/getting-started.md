## Getting Started

### Introduction

[deck.gl](https://deck.gl) is one of the most popular Open Source map visualization libraries and is the preferred library to use with CARTO. With deck.gl and CARTO you can create highly scalable applications that visualize location data in many different ways. We have created a submodule `@deck.gl/carto` that you can use to work with CARTO datasets and tilesets in a very easy and straightforward way.

The [CartoLayer](/deck-gl/using-the-cartolayer) is the deck.gl layer that provides the integration with the CARTO platform. This layer can be used from different frameworks like React, Angular, or Vue.js. It works with both CARTO 2 and CARTO 3.

We have provided many examples that you can study to see how to use the deck.gl library with our platform. Please take a look at the [examples](examples/basic-examples/hello-world.html) section in this site and the examples in the [viz-doc](https://github.com/CartoDB/viz-doc/tree/master/deck.gl/examples) repository. 

It is important that you begin by learning the core deck.gl concepts. Please check the [official deck.gl documentation site](https://deck.gl/docs).

![eu-rivers](/img/deck-gl/eu-rivers.jpg 'EU Rivers')


{{% bannerNote title="Are you a React user?" %}}
If you are a React user and want to build a web application using CARTO, we recommend you to use [CARTO for React](/react/overview/).
{{%/ bannerNote %}}

### What does CARTO provide

Starting with version 8.3, deck.gl includes a submodule `@deck.gl/carto` for integration with the CARTO platform. This module provides all that you need to:

- **Access data from the CARTO platform**. Using the [setDefaultCredentials](/deck-gl/reference/#setdefaultcredentials) function you supply the parameters needed to connect with the CARTO platform, then you use the [CartoLayer](/deck-gl/reference/#cartolayer) to visualize the datasets.
  
- **Use CARTO basemaps**. With deck.gl you can choose between different basemaps for your visualizations. CARTO provides a set of free basemaps from OpenStreetMap, but you can also use Google Maps, Mapbox, or any other provider with MVT support.
  
- **Create data-driven visualizations**. Using our style helpers you can easily create choropleth maps for numerical and categorical data.

### Installation

Two different flavors are provided:

- **Scripting**. Useful to build prototypes.
  
- **NPM Module**. You'll use the NPM module in React applications, Vanilla JavaScript applications, or applications using other frameworks such as Angular or Vue.js.

#### Using scripting

If you want to use the scripting API, you need to add to your HTML page both the deck.gl JavaScript bundle and the CARTO submodule JavaScript bundle:

```html
<script src="https://unpkg.com/deck.gl@latest/dist.min.js"></script>
<script src="https://unpkg.com/@deck.gl/carto@latest/dist.min.js"></script>
```   

In the [Examples](/deck-gl/examples/hello-world) section you can find interactive examples using the scripting API, like this Hello World example:

<div class="iframe-wrapper" data-fullscreen-target-id="example-iframe" >
  <iframe src="/deck-gl/examples/basic-examples/hello-world.html" style="border: 1px solid #cfcfcf; border-radius: 4px; width: 100%; height:100%; min-height: 500px;" title="{{ .Params.title }}"></iframe>
</div>

#### Using the NPM module

You can use the NPM module for Vanilla JavaScript applications or for applications using frameworks like React, Angular, or Vue.js. 

You just need to add the deck.gl dependency to your project using the package manager. When you install this dependency, the CARTO submodule is already included:

```shell
npm install deck.gl
```   

We have specific documentation for working with the CARTO submodule for deck.gl and different frameworks like [React](/react), [Angular](/angular), and [Vue.js](/vue). 

In the [viz-doc](https://github.com/CartoDB/viz-doc/tree/master/deck.gl/examples) repo we provide additional examples that you can download and run, using the following instructions:

- Clone the CARTO viz-doc [repo](https://github.com/CartoDB/viz-doc).

   ```shell
   git clone git@github.com:CartoDB/viz-doc.git
   ```   

- Change directory to the example you are interested in, e.g.,

   ```shell
   cd viz-doc/deck.gl/examples/pure-js
   ```   

- Then install the dependencies using the installer of your choice:

   ```shell
   npm install
   ```   

   or

   ```shell
   yarn
   ```   

- Finally run the example using:

   ```shell
   npm start
   ```   

   or

   ```shell
   yarn start
   ```   
