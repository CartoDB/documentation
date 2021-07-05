## Getting Started

This guide shows how you can create a basic CARTO for React application with layers and widgets. You will learn about the main files that compose the application and how to configure it to use datasets from your own CARTO account.

It is a really straightforward process as you can see in the following video:

<iframe width="560" height="315" src="https://www.youtube.com/embed/GVyiUZoxL_U" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style="margin-bottom: 30px;"></iframe>

### Creating an application

The basic prerequisite for using Create React App is to have a package manager ([npm](https://www.npmjs.com/get-npm) or [yarn](https://yarnpkg.com/)) previously installed.

To create a new application based on the skeleton template for create-react-app, just type:

```bash
npx create-react-app my-app --template @carto
cd my-app
yarn start
```

{{% bannerNote title="note" %}}
In Windows environments, when using PowerShell as the shell (including the integrated terminal in Visual Studio Code), we need to wrap the `template_name` parameter in single quotes when selecting the skeleton template:

```shell
npx create-react-app my-app --template '@carto'
```
{{%/ bannerNote %}}

If you want to create a template for the CARTO 3 platform, just type:

```bash
npx create-react-app my-app --template @carto/cloud-native
cd my-app
yarn start
```

A full [Sample Application](#sample-application) for the current platform with the most common functionality is available at https://sample-app-react.carto.com. If you want to create a new application based on the sample app template, just type the following:

```bash
npx create-react-app my-app --template @carto/sample-app
cd my-app
yarn start
```

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

* **store/initialStateSlice.js**: the file that defines the configuration of CARTO as default values for the slices. Set your CARTO account, apiKeys, basemap, OAuth apps, etc...

* **store/appSlice.js**: general slice of the app to include/extend with custom app functionality.

### Uploading the sample dataset to your CARTO account

We are going to start by uploading the sample dataset to your account. Go to your dashboard and click on `New Dataset`. In the `Add new dataset` dialog select the `URL` option within the `Cloud Files` section.

![add-new-dataset](/img/react/add-new-dataset.png 'Add new dataset')

Copy the following URL and click on `Submit`:

`https://public.carto.com/api/v2/sql?filename=retail_stores&q=select+*+from+public.retail_stores&format=shp`

### Connecting your CARTO account

Now that you have uploaded the dataset, you need to decide if you want to keep it public or private. If you want to keep it private, you need to create an [API KEY](https://carto.com/developers/auth-api/guides/CARTO-Authorization/) with read (SELECT) access to the dataset. OAuth Apps are available for more complex use cases, we'll cover this later on the [Data Management](../data-management) guide.

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

If you have made your dataset public and you don't need to use dataservices (geocoding, routing or isochrones), you can use the `default_public` API key.

### Creating a view

We're going to create a view called `Stores` that will be accesible in the `/stores` path. When this view is loaded, the layer will be displayed.

The easiest way to create a new view in the application is to use the [code generator](../code-generator). You need to enter the following command:

```shell
yarn hygen view new
```

and select these options:

```shell
✔ Name: Stores
✔ Route path: /stores
✔ Do you want a link in the menu? (y/N) y
```

Now you're ready to start the local development server using the following command:

```bash
yarn
yarn start
```

You should see the map component with a `Hello World` text on the left sidebar and a link to the new view in the top navigation bar.

### Creating a source

A source is a key piece in a CARTO for React application. Both layers and widgets depend on sources. A source exports a plain object with a certain structure that will be understood by the CARTO for React library to feed layers or widgets using the CARTO SQL and/or Maps APIs.
   
The different sources are stored inside the `/data/sources` folder. The goal of the `/data` folder is to easily differentiate the parts of the application that have a communication with external services, like CARTO APIs, your own backend, GeoJSON files...

To create a source, the easiest way is again to use the [code generator](../code-generator):

```shell
yarn hygen source new
```

In this case, we're creating a new source that can feed layers and widgets with the dataset we uploaded before. It is going to be called `StoresSource` to follow a convention ("Source" will be added to the name you provide). You need to choose the following options:

```shell
✔ Name: Stores
✔ Choose type: SQL dataset
✔ Type a query: select cartodb_id, store_id, storetype, revenue, address, the_geom_webmercator from retail_stores
```

### Creating a layer

Once we have defined the source, we can add now the layer to the map. 

We create the layer by using the [code generator](../code-generator) again:

```shell
yarn hygen layer new
```

We select the following options:

```shell
✔ Name: Stores
✔ Choose a source: StoresSource
✔ Do you want to attach to some view (y/N) y
✔ Choose a view: Stores
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

- Any time a widget applies a filter (for example selecting a widget category), the filter is dispatched to the store. When we add a filter, we are changing the source, so all the components depending on the source are updated: the widgets are re-rendered and the layers are filtered. The map applies the filters using the `DataFilterExtension` from deck.gl.
