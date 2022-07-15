## Views

Views are essential React components of CARTO for React applications. There are some standard or default views that are created when you kickstart the application with one of the templates and custom views that you can create manually or with the code generator.

### Standard Views

The standard views should not be modified because they provide essential functionality. The views that are created with every application are:

- `DefaultView`. This component adds the `Header` component and a collection of childrens. By default, the collection of children contains the `Main` view.
 
- `Login`. This view shows a page with a login button for those applications that require the users to login with their credentials. This login button initiates the OAuth protocol flow.
  
- `Main`. This view specifies the layout for the main components in the application that are included below the header: `Sidebar` and `MapContainer`.

- `NotFound`. This view is displayed when the user is trying to access a URL that is not registered in the application.

### Custom Views

The custom views are React components that are displayed on the `Sidebar` component included by the Main view. This is where you can include widgets and other user interface components.

You can create custom views manually or using the code generator. When using the code generator, in addition to creating the React component in a new file within the `src/components/views` folder, you also have the option to add a link to the view in the `Header` component.

When you click on one of the links in the header, the routing engine loads the React component for the view where the link points. The React component defined by the view is then injected into the `Sidebar` using the `Outlet` component from the `react-router-dom` package.

### Navigating to a custom view by default

The `Header` component includes by default a `Home` link pointing to the root URL where the application is deployed. The root URL displays the default view with an interactive map and a blank sidebar. If you want to show by default a custom view when the user enters the application, you need to perform a redirection to the route that points to the view you want to use.

You can edit the `src/routes.js` file and uncomment the following line within the `children` array:

```js
// { path: '/', element: <Navigate to='/<your default view>' /> },
```

You will need to import the `Navigate` component from the `react-router-dom` package and include the path to the view you want to use as the default:

```js
{ path: '/', element: <Navigate to='/my-default-view-path' /> },
```

### Client-Side Navigation

CARTO for React applications are single page applications (SPA) where navigation from page to page happens client-side. To implement this navigation we use the `react-router-dom` library that is quite flexible and easy to use.

The routing configuration is defined in the `src/routes.js` file. First the paths are specified in the `ROUTE_PATHS` object and then these paths are mapped to specific React components in the `routes` array that is exported by this file.

The routing configuration for the custom views is included within the `children` array corresponding to the `DEFAULT` path. For each custom view we have an object with two properties: the `path` and the `element` (React component) that will be injected in the sidebar:

```js
{ path: '/stores', element: <Stores /> }
```

### Attaching layers to views

One UX design pattern often found in geospatial applications is to automatically visualize some layers when a view is selected.

The easiest way to do this with CARTO for React is to use the code generator to create the layers. When using the code generator, you need to answer 'Yes' to the question about attaching the layer to the view and then you need to select the view you want to attach the layer to.

When you select this option, we add code to the view using the React `useEffect` hook to automatically add the data source and the layer to the store so the layer is rendered. In the cleanup function for the hook we also add the corresponding code to remove the source and the layer:

```js
useEffect(() => {
  dispatch(addSource(mySource));
  dispatch(
    addLayer({
      id: MY_LAYER_ID,
      source: mySource.id,
    })
  );

  return () => {
    dispatch(removeLayer(MY_LAYER_ID));
    dispatch(removeSource(mySource.id));
  };
}, [dispatch]);
```

If you want to attach the same layer automatically to more than one view, you can copy the `useEffect` code from the view where you have attached your layer to the other view. 

### Setting a custom viewstate

Sometimes, in addition to loading a set of layers when a view is selected, you also want to set the viewstate with a specific configuration because the data in the view is located in a different area.

In order to do this, you can also follow a similar approach by dispatching the action to set the viewstate to the desired view configuration:

```js
useEffect(() => {
  dispatch(
    setViewState({
      latitude: 31.802892,
      longitude: -103.007813,
      zoom: 3,
      transitionDuration: 500,
    })
  );

  return () => {
    // Maybe set here the viewstate to a default configuration
  };
}, [dispatch]);
```

### Adding components to all the views

In some cases you want to add the same component (i.e. a search bar) to all the views so it is always displayed. In this case, you can add the component to one of the components included in the main layout of the application: `Header`, `Sidebar` and `MapContainer`. 

In order to do this you need to add your component to the JSX code returned by these components with appropriate CSS styling/positioning properties.

In the `sample-app-2` template you can see how to add the `GeocoderWidget` directly to the `MapContainer` so it appears in all the views where the `MapContainer` is rendered.