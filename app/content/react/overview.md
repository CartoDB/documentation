## Overview

CARTO for React is the best way to develop Location Intelligence (LI) Apps using the CARTO platform + React + deck.gl.


<asciinema-player src="/cast/react-basic-usage.cast" autoplay loop></asciinema-player>


It is based on [Create React App](https://github.com/facebook/create-react-app), the most popular toolchain, and it will allow you to start with a well designed structure following the best practices for modern frontend development and an integrated toolchain for testing, building, and deploying your application.

The code is open source and is available in the following repositories:

* Templates for Create React App: https://github.com/CartoDB/carto-react-template

* Library: https://github.com/CartoDB/carto-react


{{% bannerNote type="warning" title="Warning" %}}
This documentation site has been already updated for v1.1 beta but the latest stable version is 1.0. Please read [this guide](../guides/upgrade-guide) to learn more about the changes between v1.0 and v1.1 and CARTO for React compatibility with the different platform versions.
{{%/ bannerNote %}}

The *NPM* packages (latest version) are linked below:

- Templates: 
{{% tableWrapper tab="true" %}}
| Package | Version | Downloads |
| ------- | ------- | --------- |
| @carto/cra-template-base-3 (CARTO 3 template) | <a href="https://npmjs.org/package/@carto/cra-template-base-3">  <img src="https://img.shields.io/npm/v/@carto/cra-template-base-3.svg?style=flat-square" alt="version" style="margin-bottom: 0px; vertical-align: middle;" /></a> | <a href="https://npmjs.org/package/@carto/cra-template-base-3">  <img src="https://img.shields.io/npm/dt/@carto/cra-template-base-3.svg?style=flat-square" alt="downloads" style="margin-bottom: 0px; vertical-align: middle;" /></a> |
| @carto/cra-template-base-3-typescript (CARTO 3 template for TypeScript) | <a href="https://npmjs.org/package/@carto/cra-template-base-3-typescript">  <img src="https://img.shields.io/npm/v/@carto/cra-template-base-3-typescript.svg?style=flat-square" alt="version" style="margin-bottom: 0px; vertical-align: middle;" /></a> | <a href="https://npmjs.org/package/@carto/cra-template-base-3-typescript">  <img src="https://img.shields.io/npm/dt/@carto/cra-template-base-3-typescript.svg?style=flat-square" alt="downloads" style="margin-bottom: 0px; vertical-align: middle;" /></a> |
| @carto/cra-template-sample-app-3 (CARTO 3 template) | <a href="https://npmjs.org/package/@carto/cra-template-sample-app-3">  <img src="https://img.shields.io/npm/v/@carto/cra-template-sample-app-3.svg?style=flat-square" alt="version" style="margin-bottom: 0px; vertical-align: middle;" /></a> | <a href="https://npmjs.org/package/@carto/cra-template-sample-app-3">  <img src="https://img.shields.io/npm/dt/@carto/cra-template-sample-app-3.svg?style=flat-square" alt="downloads" style="margin-bottom: 0px; vertical-align: middle;" /></a> |
| @carto/cra-template-base-2 (CARTO 2 template) | <a href="https://npmjs.org/package/@carto/cra-template-base-2"><img src="https://img.shields.io/npm/v/@carto/cra-template-base-2.svg?style=flat-square" alt="version" style="margin-bottom: 0px; vertical-align: middle;" /></a> | <a href="https://npmjs.org/package/@carto/cra-template-base-2"> <img src="https://img.shields.io/npm/dt/@carto/cra-template-base-2.svg?style=flat-square" alt="downloads" style="margin-bottom: 0px; vertical-align: middle;" /></a> |
| @carto/cra-template-sample-app-2 (sample app template for CARTO 2) | <a href="https://npmjs.org/package/@carto/cra-template-sample-app-2"><img src="https://img.shields.io/npm/v/@carto/cra-template-sample-app-2.svg?style=flat-square" alt="version" style="margin-bottom: 0px; vertical-align: middle;" /></a> | <a href="https://npmjs.org/package/@carto/cra-template-sample-app-2"><img src="https://img.shields.io/npm/dt/@carto/cra-template-sample-app-2.svg?style=flat-square" alt="downloads" style="margin-bottom: 0px; vertical-align: middle;" /></a> |
{{% /tableWrapper %}}

- Lib packages:
{{% tableWrapper tab="true" %}}
| Package | Version | Downloads |
| ------- | ------- | --------- |
| @carto/react-api  | <a href="https://npmjs.org/package/@carto/react-api"><img src="https://img.shields.io/npm/v/@carto/react-api.svg?style=flat-square" alt="version" style="margin-bottom: 0px; vertical-align: middle;" /></a> | <a href="https://npmjs.org/package/@carto/react-api"><img src="https://img.shields.io/npm/dt/@carto/react-api.svg?style=flat-square" alt="downloads" style="margin-bottom: 0px; vertical-align: middle;" /></a> |
| @carto/react-auth  | <a href="https://npmjs.org/package/@carto/react-auth"><img src="https://img.shields.io/npm/v/@carto/react-auth.svg?style=flat-square" alt="version" style="margin-bottom: 0px; vertical-align: middle;" /></a> | <a href="https://npmjs.org/package/@carto/react-auth"><img src="https://img.shields.io/npm/dt/@carto/react-auth.svg?style=flat-square" alt="downloads" style="margin-bottom: 0px; vertical-align: middle;" /></a> |
| @carto/react-basemaps  | <a href="https://npmjs.org/package/@carto/react-basemaps"><img src="https://img.shields.io/npm/v/@carto/react-basemaps.svg?style=flat-square" alt="version" style="margin-bottom: 0px; vertical-align: middle;" /></a> | <a href="https://npmjs.org/package/@carto/react-basemaps"><img src="https://img.shields.io/npm/dt/@carto/react-basemaps.svg?style=flat-square" alt="downloads" style="margin-bottom: 0px; vertical-align: middle;" /></a> |
| @carto/react-core  | <a href="https://npmjs.org/package/@carto/react-core"><img src="https://img.shields.io/npm/v/@carto/react-core.svg?style=flat-square" alt="version" style="margin-bottom: 0px; vertical-align: middle;" /></a> | <a href="https://npmjs.org/package/@carto/react-core"><img src="https://img.shields.io/npm/dt/@carto/react-core.svg?style=flat-square" alt="downloads" style="margin-bottom: 0px; vertical-align: middle;" /></a> |
| @carto/react-redux  | <a href="https://npmjs.org/package/@carto/react-redux"><img src="https://img.shields.io/npm/v/@carto/react-redux.svg?style=flat-square" alt="version" style="margin-bottom: 0px; vertical-align: middle;" /></a> | <a href="https://npmjs.org/package/@carto/react-redux"><img src="https://img.shields.io/npm/dt/@carto/react-redux.svg?style=flat-square" alt="downloads" style="margin-bottom: 0px; vertical-align: middle;" /></a> |
| @carto/react-ui  | <a href="https://npmjs.org/package/@carto/react-ui"><img src="https://img.shields.io/npm/v/@carto/react-ui.svg?style=flat-square" alt="version" style="margin-bottom: 0px; vertical-align: middle;" /></a> | <a href="https://npmjs.org/package/@carto/react-ui"><img src="https://img.shields.io/npm/dt/@carto/react-ui.svg?style=flat-square" alt="downloads" style="margin-bottom: 0px; vertical-align: middle;" /></a> |
| @carto/react-widgets  | <a href="https://npmjs.org/package/@carto/react-widgets"><img src="https://img.shields.io/npm/v/@carto/react-widgets.svg?style=flat-square" alt="version" style="margin-bottom: 0px; vertical-align: middle;" /></a> | <a href="https://npmjs.org/package/@carto/react-widgets"><img src="https://img.shields.io/npm/dt/@carto/react-widgets.svg?style=flat-square" alt="downloads" style="margin-bottom: 0px; vertical-align: middle;" /></a> |
| @carto/react-workers  | <a href="https://npmjs.org/package/@carto/react-workers"><img src="https://img.shields.io/npm/v/@carto/react-workers.svg?style=flat-square" alt="version" style="margin-bottom: 0px; vertical-align: middle;" /></a> | <a href="https://npmjs.org/package/@carto/react-workers"><img src="https://img.shields.io/npm/dt/@carto/react-workers.svg?style=flat-square" alt="downloads" style="margin-bottom: 0px; vertical-align: middle;" /></a> |
{{% /tableWrapper %}}

### Architecture

![architecture](/img/react/architecture.png 'Architecture')

CARTO for React is based on the following libraries:

- [CARTO for deck.gl](https://carto.com/developers/deck-gl) as the library to visualize maps. For the basemaps you can use either Google Maps or CARTO basemaps.
- [React](https://reactjs.org/) as the JavaScript library for building user interfaces and [Redux](https://redux.js.org/) for managing global state for the application. We use [React-Redux](https://react-redux.js.org/) for managing the interactions between the React components with the Redux store.
- [Material-UI](https://material-ui.com/): UI React components for faster and easier web development.
- [@carto/react-*]: A set of packages created to make easy integration with CARTO platform and its APIs, geospatial widgets, and a custom theme for [Material-UI](https://material-ui.com/).

{{% bannerNote title="About CARTO platform versions" %}}
In this documentation we use the term “CARTO 3” to refer to the latest version of the CARTO platform launched on October 2021, and “CARTO 2” to refer to the previous version. We provide examples for both versions and we add notes when there are differences in the way you need to work with each of them. Note that each platform version has its own set of account credentials.
{{%/ bannerNote %}}

**Why React?**

Location Intelligence Apps tend to be applications with a reduced number of pages, but with lots of functionalities at each page and many relations between them.

In the past, they were developed using imperative programming (with MVC patterns or similar), but it easily ends up in a messy application with a huge amount of dependencies between components. And each time you need to add something new, a new bug is also introduced.

The reactive programming paradigm (React and deck.gl) fixes this issue and makes your application easy to maintain, test, and scale. We are 100% sure that you can create something manageable even if your application is really complex and includes lots of features with multiple interactions.

Yes, it is a new paradigm, but once you learn it, you will love it.

### Templates

CARTO for React includes the following Create React App templates for kickstarting your application:

- The CARTO 3 template that creates a simple application with just a map using the CARTO 3 platform. This is the template you are usually going to choose when you are creating a new app using JavaScript.

- The CARTO 3 template for TypeScript that creates a simple application with just a map using the CARTO 3 platform. This is the template you are usually going to choose when you are creating a new app using TypeScript.

- The CARTO 2 template, similar to the CARTO 3 template. You are going to use it when you are creating a new app with the CARTO 2 platform.

- The sample app templates for CARTO 2 and CARTO 3 that create a more complex application with several views, layers, and widgets. The purpose of these templates is to demonstrate how you can implement common Location Intelligence functionalities in a CARTO for React app.

The command to create a new application is the following:

```shell
npx create-react-app [application_name] --template [template_name]
```

- `application_name` is the name of the folder that will be created for your application
- `template_name` is the name of the template to use: 
  - `@carto/base-3` for the CARTO 3 template 
  - `@carto/base-3-typescript` for the CARTO 3 template for TypeScript
  - `@carto/sample-app-3` for the sample app template for CARTO 3.
  - `@carto/base-2` for the CARTO 2 template 
  - `@carto/sample-app-2` for the sample app template for CARTO 2.

{{% bannerNote title="note" %}}
In Windows environments, when using PowerShell as the shell (including the integrated terminal in Visual Studio Code), we need to wrap the `template_name` parameter in single quotes when selecting the default template:

```shell
npx create-react-app my-app --template '@carto'
```
{{%/ bannerNote %}}

### Library

In addition to the Create React App templates, we have created a library to:

1. Provide an easy integration with the CARTO platform and its APIs.

2. Provide a catalog of useful widgets for Location Intelligence Apps.

3. Create a custom theme for [Material-UI](https://material-ui.com/) to reduce the design work of your team.

There is a full [reference](../library-reference/introduction) available.

The library includes a set of [UI components](https://storybook-react.carto.com) ready to be used to create the best Location Intelligence Apps.

### Frequently Asked Questions (FAQ)

**Installing npm modules, learning React with Redux, learning Material-UI, it is just too much for my application, is there a simpler way?**

If your application is not so complex and does not need the benefits added by this template, you can just use CARTO for deck.gl with the scripting API. Please check the [examples](/deck-gl/examples/gallery).

**I’m using Vue or Angular for building my applications, what are my options?**

At this moment, we only provide a complete solution with templates and widgets for React. If you are building an application using Vue, Angular, or other JavaScript framework, you don’t have to worry, it is completely feasible and you just need to use the CARTO for deck.gl pure JavaScript flavor. Please check the [examples](https://github.com/CartoDB/viz-doc/tree/master/deck.gl/examples/pure-js) and the [CARTO + Vue.js](/vue) and [CARTO + Angular](/angular) docs.

**When should I use the CARTO 3 platform vs the CARTO 2 platform?**

CARTO 3 is the next version of the CARTO Platform and is still in beta. The main difference is that it provides full cloud native support to Datawarehouses, pushing down queries. If you are starting a new application we recommend that you use the latest version of CARTO by [requesting access](https://carto.com/carto3). Or [contact us](support@carto.com) if you have questions. 

**Can I use the library with my own Create React App template?**
Yes, the library can be used independently. You will need to ensure you have added the required dependencies and you won't be able to use the code generator, but you can take advantage of the functionality offered by the library: user interface components, widgets, state management, interaction with the CARTO platform...