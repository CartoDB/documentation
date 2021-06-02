## Overview

CARTO for React is the best way to develop Location Intelligence (LI) Apps using the CARTO platform + React + deck.gl.


<asciinema-player src="/cast/react-basic-usage.cast" autoplay loop></asciinema-player>


It is based on [Create React App](https://github.com/facebook/create-react-app), the most popular toolchain, and it will allow you to start with a well designed structure following the best practices for modern frontend development and an integrated toolchain for testing, building and deploying your application.

The code is open source and is available in the following repositories:

* Templates for Create React App: https://github.com/CartoDB/carto-react-template

* Library: https://github.com/CartoDB/carto-react


The *NPM* packages are available here:

- Templates: 
{{% tableWrapper tab="true" %}}
| Package | Version | Downloads |
| ------- | ------- | --------- |
| @carto/cra-template (skeleton template) | <a href="https://npmjs.org/package/@carto/cra-template"><img src="https://img.shields.io/npm/v/@carto/cra-template.svg?style=flat-square" alt="version" /></a> | <a href="https://npmjs.org/package/@carto/cra-template"> <img src="https://img.shields.io/npm/dt/@carto/cra-template.svg?style=flat-square" alt="downloads" /></a> |
| @carto/cra-template-sample-app (sample app template) | <a href="https://npmjs.org/package/@carto/cra-template-sample-app"><img src="https://img.shields.io/npm/v/@carto/cra-template-sample-app.svg?style=flat-square" alt="version" /></a> | <a href="https://npmjs.org/package/@carto/cra-template-sample-app"><img src="https://img.shields.io/npm/dt/@carto/cra-template-sample-app.svg?style=flat-square" alt="downloads" /></a> |
{{% /tableWrapper %}}

- Lib packages:
{{% tableWrapper tab="true" %}}
| Package | Version | Downloads |
| ------- | ------- | --------- |
| @carto/react-api  | <a href="https://npmjs.org/package/@carto/react-api"><img src="https://img.shields.io/npm/v/@carto/react-api.svg?style=flat-square" alt="version" /></a> | <a href="https://npmjs.org/package/@carto/react-api"><img src="https://img.shields.io/npm/dt/@carto/react-api.svg?style=flat-square" alt="downloads" /></a> |
| @carto/react-auth  | <a href="https://npmjs.org/package/@carto/react-auth"><img src="https://img.shields.io/npm/v/@carto/react-auth.svg?style=flat-square" alt="version" /></a> | <a href="https://npmjs.org/package/@carto/react-auth"><img src="https://img.shields.io/npm/dt/@carto/react-auth.svg?style=flat-square" alt="downloads" /></a> |
| @carto/react-basemaps  | <a href="https://npmjs.org/package/@carto/react-basemaps"><img src="https://img.shields.io/npm/v/@carto/react-basemaps.svg?style=flat-square" alt="version" /></a> | <a href="https://npmjs.org/package/@carto/react-basemaps"><img src="https://img.shields.io/npm/dt/@carto/react-basemaps.svg?style=flat-square" alt="downloads" /></a> |
| @carto/react-core  | <a href="https://npmjs.org/package/@carto/react-core"><img src="https://img.shields.io/npm/v/@carto/react-core.svg?style=flat-square" alt="version" /></a> | <a href="https://npmjs.org/package/@carto/react-core"><img src="https://img.shields.io/npm/dt/@carto/react-core.svg?style=flat-square" alt="downloads" /></a> |
| @carto/react-redux  | <a href="https://npmjs.org/package/@carto/react-redux"><img src="https://img.shields.io/npm/v/@carto/react-redux.svg?style=flat-square" alt="version" /></a> | <a href="https://npmjs.org/package/@carto/react-redux"><img src="https://img.shields.io/npm/dt/@carto/react-redux.svg?style=flat-square" alt="downloads" /></a> |
| @carto/react-ui  | <a href="https://npmjs.org/package/@carto/react-ui"><img src="https://img.shields.io/npm/v/@carto/react-ui.svg?style=flat-square" alt="version" /></a> | <a href="https://npmjs.org/package/@carto/react-ui"><img src="https://img.shields.io/npm/dt/@carto/react-ui.svg?style=flat-square" alt="downloads" /></a> |
| @carto/react-widgets  | <a href="https://npmjs.org/package/@carto/react-widgets"><img src="https://img.shields.io/npm/v/@carto/react-widgets.svg?style=flat-square" alt="version" /></a> | <a href="https://npmjs.org/package/@carto/react-widgets"><img src="https://img.shields.io/npm/dt/@carto/react-widgets.svg?style=flat-square" alt="downloads" /></a> |
| @carto/react-workers  | <a href="https://npmjs.org/package/@carto/react-workers"><img src="https://img.shields.io/npm/v/@carto/react-workers.svg?style=flat-square" alt="version" /></a> | <a href="https://npmjs.org/package/@carto/react-workers"><img src="https://img.shields.io/npm/dt/@carto/react-workers.svg?style=flat-square" alt="downloads" /></a> |
{{% /tableWrapper %}}
### Architecture

![architecture](/img/react/architecture.png 'Architecture')

CARTO for React is based on the following libraries:

- [CARTO for deck.gl](https://carto.com/developers/deck-gl) as the library to visualize maps. For the basemaps you can use either Google Maps or CARTO basemaps.
- [React](https://reactjs.org/) as the JavaScript library for building user interfaces and [Redux](https://redux.js.org/) for managing global state for the application. We use [React-Redux](https://react-redux.js.org/) for managing the interactions between the React components with the Redux store.
- [Material-UI](https://material-ui.com/): UI React components for faster and easier web development.
- [@carto/react-*]: A set of packages created to make easy integration with CARTO platform and its APIs, geospatial widgets and a custom theme for [Material-UI](https://material-ui.com/).

**Why React?**

LI Apps tend to be applications with a reduced number of pages, but with lots of functionalities at each page and many relations between them.

In the past, they were developed using imperative programming (with MVC patterns or similar), but it easily ends up in a messy application with a huge amount of relations between components. And each time you need to add something new, a new bug is also introduced.

The reactive programming (React and deck.gl) comes to fix this issue and make your application easy to maintain, to test and to scale. We're 100% sure that you can create something manageable even if your application is really complex and includes lots of features with multiple interactions.

Yes, it's a new paradigm, but once you learn it, you'll love it.

### Templates

CARTO for React includes two different Create React App templates for kickstarting your application:

- The skeleton template that creates a simple application with just a map. This is the template you are usually going to choose when you are creating a new app.

- The sample app template that creates a more complex application with several views, layers and widgets. The purpose of this template is demonstrating how you can implement common LI functionalities in a CARTO for React app.

The command to create a new application is the following:

```shell
npx create-react-app [application_name] --template [template_name]
```

- `application_name` is the name of the folder that will be created for your application
- `template_name` is the name of the template to use (`@carto` for the skeleton template or `@carto/sample-app` for the sample app template)

{{% bannerNote title="note" %}}
In Windows environments, when using PowerShell as the shell (including the integrated terminal in Visual Studio Code), we need to wrap the `template_name` parameter in single quotes when selecting the skeleton template:

```shell
npx create-react-app my-app --template '@carto'
```
{{%/ bannerNote %}}

### Library

In addition to the Create React App templates, we have created a library to:

1. Provide an easy integration with the CARTO platform and its APIs.

2. Provide a catalog of useful widgets for LI Apps.

3. Create a custom theme for [Material-UI](https://material-ui.com/) to reduce the design work of your team.

There is a full [reference](../library-reference/api) available.

The library includes a set of [UI components](https://storybook-react.carto.com) ready to be used to create the best LI Apps.

### Frequently Asked Questions (FAQ)

**Installing npm modules, learning React with Redux, learning Material-UI, it is just too much for my application, is there a simpler way?**

If your application is not so complex and does not need the benefits added by this template, you can just use CARTO for deck.gl with the scripting API. Please check the [examples](https://docs.carto.com/deck-gl/examples/hello-world).

**I’m using Vue or Angular for building my applications, what are my options?**

At this moment, we only provide a complete solution with templates and widgets for React. If you are building an application using Vue, Angular or other JavaScript framework, you don’t have to worry, it is completely feasible and you just need to use the CARTO for deck.gl pure JavaScript flavor. Please check the [examples](https://github.com/CartoDB/viz-doc/tree/master/deck.gl/examples/pure-js).