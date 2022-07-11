## Data Sources

Data sources, abbreviated sources in CARTO for React, are objects that represent the source of the data that is going to be visualized with layers or displayed and filtered with widgets. They need to include spatial information either using traditional geometry/geography representations or geospatial indexes (H3 / Quadbins).

The source objects include the following properties:

- `connection`. Name of the connection to the data warehouse in the Workspace. Not used for CARTO 2.
  
- `credentials`. Specific credentials to use for this source. We usually define global credentials in the initialState slice but sometimes we need to retrieve data sources using different credentials.

- `data`. Table name, SQL query or static tileset name. 

- `id`. Unique identifier.

- `type`. Type of data source: can be a data warehouse table (MAP_TYPES.TABLE), a SQL query that is executed in the data warehouse to retrieve data (MAP_TYPES.QUERY) or a static tileset that has been pre-generated in the data warehouse (MAP_TYPES.TILESET). The MAP_TYPES.TABLE is not supported for CARTO 2.

### Filtering and Linking Layers and Widgets

CARTO for React applications synchronize the different components (map, layers, widgets...) through a centralized store managed by [Redux Toolkit](https://redux-toolkit.js.org/).

The data sources link layers with widgets in order to filter the visualization or the information displayed in the widgets.

When we filter a data source using a widget (i.e. selecting a category in a `CategoryWidget`), what we are doing is adding this filter to the data source in the Redux store. Then, the layers that are using this data source react to the changes and apply the same filter to the features that are being displayed in the map.

The same approach is followed to implement the viewport mode in the widgets. When the user changes the viewstate by zooming or panning, the `viewState` object in the store is updated and the widgets react to the changes and update the calculations.

A similar apprach is used to implement the `FeatureSelectionWidget`. In this case, when the user completes the shape, the geometry is added to the `spatialFilter` object in the store. The widgets are updated to take into account the new filter and deck.gl applies a mask to the visualization to hide all the features outside the shape drawn by the user.

### Dropping features

Since deck.gl 8.8, the `CartoLayer` only works with vector tiles, both dynamic and static. Vector tiles are designed with visualization in mind. Geometries are simplified depending on the zoom level and features are discarded in order to be able to visualize large datasets quickly. This means that feature dropping can happen at lower zoom levels when there are too many features in the same tile or when two or more points in the same tile coordinates.

For those zoom levels where feature dropping is happening, the widgets linked to the same source that are using the viewport mode will not display results because we don't have all the information needed to make the calculations locally in the browser. If we want the widgets to work at all zoom levels, we need to fetch the data in GeoJSON format and then use the `GeoJsonLayer` intead of the `CartoLayer`.

You can see the following example in action in the sample-app-3 template. We create a [memoized](https://reactjs.org/docs/hooks-reference.html#usememo) data promise to fetch the data in GeoJSON format using the `fetchLayerData` function from the CARTO module for deck.gl. Then, we create a `GeoJsonLayer` with the `data` property pointing to the promise and we extract the actual `FeatureCollection` from the response when it arrives using the `dataTransform` callback. 

```js
const dataPromise = useMemo(
  () =>
    source?.data &&
    fetchLayerData({
      type: source.type,
      connection: source.connection,
      source: source.data,
      format: 'geojson',
    }),
  [source?.type, source?.data, source?.connection]
);

if (storesLayer && source) {
  return new GeoJsonLayer({
    ...cartoLayerProps,
    data: dataPromise,
    dataTransform: (res) => res.data,
```

This solution will work only if the dataset is of small-medium size. The larger the dataset, the more powerful computer you need to be able to render all the features client-side. You can look at the total number of points/vertices in your dataset but you need to take into consideration that rendering polygons is more computationally expensive than lines and rendering lines is more expensive than points. Please read the [Performance Considerations](/carto-user-manual/maps/performance-considerations/) section in the User Manual for additional information.

If you are working with a large dataset and you are OK with aggregating data at lower zoom levels, another solution to avoid feature dropping is to use [spatial indexes](#spatial-indexes), like H3 or quadbins, instead of traditional geometries. With this solution, no features are going to be dropped and performance is going to be good at all zoom levels because the geospatial index resolution is adapted to the current zoom level.

{{% bannerNote title="Global Mode" %}}
If your widget is working on global mode, the calculations are not using locally available data from the vector tiles but they are requesting data from the backend. This means that calculations are always accurate but they are using the full dataset, not only the features in the current viewport. This does not work with static (pre-generated) tilesets, only with dynamic tiling. For more information check the [Modes](../widgets/#modes-behavior) section in the Widgets guide.
{{%/ bannerNote %}}

### Spatial Indexes

CARTO for React 1.3 adds support for data sources using spatial indexes from discrete global grid systems, in addition to datasets using traditional geometries. The CARTO platform is compatible with datasets using H3 and Quadbins (improved coding for quadkeys) indexes. You can add a source (table, query or static tileset) where there is a column using a spatial index and then use this source for layers and widgets.

In order for the source to be correctly processed and visualized the name of the column containing the spatial index must be `'h3'` for H3 or `'quadbin'` for Quadbins. Then you need to define the `geoColumn` and `aggregationExp` properties in the `CartoLayer` as explained in the [layer guide](../layers#spatial-indexes).

As explained above, spatial indexes are a powerful solution when you are dealing with very large datasets. In addition to provide a way to visualize those datasets, there are some spatial join operations like intersections that become regular joins. Spatial join operations can be quite expensive to compute when we are dealing with datasets with dozens/hundreds of millions of features. Using spatial indexes we can execute these operations in a fraction of the time.

For additional information, check the [Aggregated Grids](/carto-user-manual/maps/add-source/#aggregated-grids) section in the User Manual.

### Dynamic Sources

Sometimes you want a source to be dynamic so the `data` property is updated as a reaction to the user actions. For instance, you can point the data source to a different table or tileset or you can add a condition to a SQL query.

The right way to update the `data` property is to dispatch the action to add the source to the store with the new `data` property but using the same `id` to ensure the source is updated.

```js
const updatedSource = {
  id: `my_source_id`,
  connection: `my_connection_name`,
  type: MAP_TYPES.TABLE,
  data: `my_new_table_or_my_new_query`
};

dispatch(addSource(updatedSource));
```

We need to take into account that the updated source is going to keep the new value for the `data` property as long as we stay in the same view, if we are adding the static source in a `useEffect` hook, as it happens with the automatic code created by the code generator. If we switch to another view and then we come back to the view where we updated the `data` property, the source is going to use again the `data` property value from the .js file.