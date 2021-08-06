## Getting Started

This guide shows how you can create a basic CARTO for React application with layers and widgets. You will learn about the main files that compose the application and how to configure it to use datasets from your own CARTO account.

It is a really straightforward process as you can see in the following video:

<video height="400" autoplay="" loop="" muted=""> <source src="/img/react/getting-started.mp4" type="video/mp4"> Your browser does not support the video tag. </video>

### Creating an application

The basic prerequisite for using Create React App is to have a package manager ([npm](https://www.npmjs.com/get-npm) or [yarn](https://yarnpkg.com/)) previously installed.

To create a new application based on the CARTO 3 template for create-react-app, just type:

```bash
npx create-react-app my-app --template @carto/base-3
```

The template is configured by default to authenticate the users against the platform. The first thing you need to do is to create a new application in the Workspace (Developers section) with `https://127.0.0.1:3000` as the URL. Then you need to copy the value in the `Application ID` column and paste it in the `clientID` property for the `oauth` object in the `src/store/initialStateSlice.js` file.

{{% bannerNote type="note" title="CARTO 2 templates" %}}
You can also create a new application based on the CARTO 2 template if you use `@carto/base-2` as the template name. We have also created a sample app template (`@carto/sample-app-2`) for CARTO 2 showing how to implement common spatial apps features.
{{%/ bannerNote %}}

### Understanding the folder structure

These are the main folders:

* **src/components/common**: common components as Header, Footer, Menus, etc

* **src/components/layers**: deck.gl layers that area available to the Map component.

* **src/components/views**: pages which match with routes.

* **src/data**: sources and models.

* **src/store**: slice configuration.

* **src/utils**: general utils.

* **public**: the public folder contains the HTML file so you can tweak it, for example, to set the page title.

And these are the main files:

* **routes.js**: the file where views and routes are matched.

* **views/Main.js**: the general component that defines the layout of the application.

* **store/initialStateSlice.js**: the file that defines the configuration of CARTO as default values for the slices. Set your CARTO account, token / api key, basemap, OAuth app configuration, etc...

* **store/appSlice.js**: general slice of the app to include/extend with custom app functionality.

### Setting up the credentials for connecting your CARTO account

This getting started tutorial demonstrates how to create a private application that requires the user to authenticate against the CARTO platform. If you are building a public application (where the user does not need to login), you need to provide the token in the credentials object. Please read the Authentication & Authorization [guide](../authentication-and-authorization) to learn more about this.

In the credentials you need to specify the base URL for the API. You can check the value you must use in the Developers section in the Workspace and update the `apiBaseUrl` property in the `credentials` object within the `src/store/initialStateSlice.js` file:

```javascript
    ...
    credentials: {
      apiVersion: API_VERSIONS.V3,
      apiBaseUrl: 'https://gcp-us-east1.api.carto.com',
    },
    ...
  },
```

### Creating a view

We're going to create a view called `Stores` that will be accesible in the `/stores` path. When this view is loaded, the layer will be displayed.

The easiest way to create a new view in the application is to use the [code generator](../code-generator). You need to enter the following command:

```shell
yarn hygen view new
```

and select these options:

```shell
$ hygen view new
✔ Name: · Stores
✔ Route path: · stores
✔ Do you want a link in the menu? (y/N) · true
```

Now you're ready to start the local development server using the following command:

```bash
yarn
yarn start
```

You should see the map component with a `Hello World` text on the left sidebar and a link to the new view in the top navigation bar.

### Creating a source

A source is a key piece in a CARTO for React application. Both layers and widgets depend on sources. A source exports a plain object with a certain structure that will be understood by the CARTO for React library to feed layers or widgets using the CARTO SQL and/or Maps APIs.
   
To create a source, the easiest way is again to use the [code generator](../code-generator):

```shell
yarn hygen source new
```

Before adding the source, you need to create a connection to your data warehouse in the Workspace. If you have not created a connection yet, you can use the `carto_dw` connection to the CARTO Cloud Data Warehouse that is provided with all the accounts.

We are going to create a source pointing to the public BigQuery dataset `cartobq.public_account.retail_stores` using the `carto_dw` connection. We recommend you to create a source pointing to one of the datasets in your data warehouse. You need to choose the following options:

```shell
$ hygen source new
✔ Name: · Stores
✔ Enter a valid connection name · carto_dw
✔ Choose type · table
✔ Type a query · cartobq.public_account.retail_stores
```

### Creating a layer

Once we have defined the source, we can add now the layer to the map. 

We create the layer by using the [code generator](../code-generator) again:

```shell
yarn hygen layer new
```

We select the following options:

```shell
~ yarn hygen layer new
✔ Name: · Stores
✔ Choose a source · storesSource
✔ Do you want to attach to some view (y/N) · true
✔ Choose a view · Stores (views/Stores.js)
```

If you reload the page, you will see the new layer in the map.

### Adding widgets

Finally we are ready to add some widgets to the view. We will add a Formula and a Category Widget.

The first thing you need to do is to add the following imports at the top of the `src/components/views/Stores.js` file:

```javascript
import { Divider } from '@material-ui/core';
import { AggregationTypes } from '@carto/react-core';
import { FormulaWidget, CategoryWidget } from '@carto/react-widgets';
import { currencyFormatter } from 'utils/formatter';
```

Then, in the same file, you need to replace the `Hello World` text with:

```javascript
<div>
  <FormulaWidget
    id='totalRevenue'
    title='Total revenue'
    dataSource={storesSource.id}
    column='revenue'
    operation={AggregationTypes.SUM}
    formatter={currencyFormatter}
  />

  <Divider />

  <CategoryWidget
    id='revenueByStoreType'
    title='Revenue by store type'
    dataSource={storesSource.id}
    column='storetype'
    operationColumn='revenue'
    operation={AggregationTypes.SUM}
    formatter={currencyFormatter}
  />
</div>
```

### Understanding how the pieces work together

There are two main elements in the store: the source and the viewport. When we change any of these elements, the following actions are triggered:

- The layer is filtered when the source changes.

- The widget is re-rendered when the source or viewport changes.

- Any time we change the map extent (pan or zoom), the viewport changes and all the widgets are refreshed.

- Any time a widget applies a filter (for example selecting a widget category), the filter is dispatched to the store. When we add a filter, we are changing the source, so all the components depending on the source are updated: the widgets are re-rendered and the layers are filtered. The map applies the filters using the [`DataFilterExtension`](https://deck.gl/docs/api-reference/extensions/data-filter-extension) from deck.gl.
