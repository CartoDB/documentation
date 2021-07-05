## Code Generator

CARTO for React includes a code generator based on [Hygen](https://www.hygen.io/) to speed up the creation of the most common elements found in apps: views, sources and layers.

### Views

If you want to create a new View, you need to execute the following command in the project root folder:

```bash
yarn hygen view new
```

The command will ask you to select the following options:

| Option |Description|
|--------|-----------|
| Name | The name you want to give to the view. This will determine the filename for the class that will contain the view as well as the text that will appear in the navigation bar. |
| Route path | This is the path to your view. |
| Link in the menu | This option lets you choose if you want to add a link to the new view in the navigation bar. |

The code generator will perform three different actions in your code:

1. Modify the route settings in the application (in the `src/routes.js` file) to add the path to the new view.

2. Add the view to the header in the `src/components/common/Header.js` file.

3. Create a new file for the view in the following folder: `src/components/views`. This view will contain the "Hello World" string in the returned JSX code. You can substitute this string with the JSX code for your user interface.

### Sources

If you want to create a new Source, you need to execute the following command:

```bash
yarn hygen source new
```

The command will ask you to select the following options:

| Option |Description|
|--------|-----------|
| Name   | The name you will give to the source. The code generator will append "Source" at the end. |
| Type   | The source type. You can choose between a table name, a SQL query or a tileset. |
| Connection | Connection name in the workspace (only needed for CARTO 3). |
| Data   | Table name, SQL query or tileset name. |

The code generator will create a new file in the `src/data/sources/` folder that will define a source object with the following properties:

| Property |Description|
|--------|-----------|
| id     | This is a unique ID for the source generated from the provided source name. |
| type   | MAP_TYPES.QUERY, MAP_TYPES.TABLE or MAP_TYPES.TILESET. |
| connection | Connection name in the workspace (only needed for CARTO 3). |
| data   | This is the SQL query, table name or tileset name. |

In addition to these three properties, you can add an additional `credentials` property to the source after it has been created. This is useful if you want to add a source with different credentials from those specified in the `src/store/initialStateSlice.js` file.

### Layers

For creating a new layer, you need to execute the following command:

```bash
yarn hygen layer new
```

The command will ask you to select the following options:

| Option |Description|
|--------|-----------|
| Name   | The name you will give to the layer. The code generator will append "Layer" at the end. |
| Source   | The source you want to associate with your layer. This will determine the information displayed. |
| View  | You can optionally attach the layer to one of the existing views. This means the layer will be displayed in the map when you select this view and removed from the map when you switch to another view. |

The code generator will perform two different actions:

1. Create a new file for the layer in the `src/components/layers/` folder. This element will return a `CartoLayer`. If you want to modify the default visualization options, you can modify the corresponding deck.gl layer properties. 

2. Attach the layer to the view in the corresponding view file, if this option has been selected. If this is the case, before adding the layer by dispatching the `addLayer` action, the source will also be added using the `addSource` action.

### Help

For further information about these commands you can execute:

```bash
yarn hygen help
```
