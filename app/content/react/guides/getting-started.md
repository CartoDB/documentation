## Getting Started

This guide shows how you can create a CARTO for React application. You will learn about the main files that compose the application and how to configure it to use datasets from your own CARTO account.

It is a really straightforward process as you can see in the following video that also shows how to add views and layers to your application:

<iframe width="560" height="315" src="https://www.youtube.com/embed/G_BeSZPD2EQ" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style="margin-bottom: 30px;"></iframe>

### Creating an application

The basic prerequisite for using Create React App is to have a package manager ([npm](https://www.npmjs.com/get-npm) or [yarn](https://yarnpkg.com/)) previously installed.

To create a new application based on the skeleton template for create-react-app, just type:

```bash
npx create-react-app my-app --template @carto
cd my-app
yarn start
```

A full [Sample Application](#sample-application) with the most common functionality is available at https://sample-app-react.carto.com. If you want to create a new application based on the sample app template, just type the following:

```bash
npx create-react-app my-app --template @carto/sample-app
cd my-app
yarn start
```

### Understanding the folder structure

These are the main folders:

* **src/config**: configuration of the application.

* **src/components/common**: common components as Header, Footer, Menus, etc

* **src/components/layers**: deck.gl layers that area available to the Map component.

* **src/components/views**: pages which match with routes.

* **src/data**: sources and models.

* **src/models**: async functions to connect with external APIs.

* **src/utils**: general utils.

* **public**: the public folder contains the HTML file so you can tweak it, for example, to set the page title.

And these are the main files:

* **routes.js**: the file where views and routes are matched.

* **views/Main.js**: the general component that defines the layout of the application.

* **store/initialStateSlice.js**: the file that define the configuration of CARTO as default values for the slices. Set your CARTO account, apiKeys, basemap, OAuth apps, etc...

* **store/appSlice.js**: general slice of the app to include/extend with custom app functionality.

### Connecting your CARTO account

When you create the application using the Create React Template, the first thing you need to do is to include your credentials, so you can access datasets from your account.

You need to edit the `src/store/initialStateSlice.js` file and add your own credentials.

```javascript
    ...
    credentials: {
      username: '<your_username>',
      apiKey: '<your_api_key>',
      serverUrlTemplate: 'https://{user}.carto.com',
    },
    ...
  },
```

The API KEY could be set to `default_public` if you're dealing with public datasets and you don't need to use dataservices (geocoding, routing or isochrones).

If you're dealing with private data and/or data services you need to provide a valid [API KEY](https://carto.com/developers/auth-api/guides/CARTO-Authorization/).

OAuth Apps are available for more complex use cases, we'll cover this later on [Permissions and user management](04_permissions_user_management.md).

Once you've connected your account, you can jump to the next guide:

{{<link href="../layers-and-widgets">}}
  Adding layers and widgets
{{</link>}}