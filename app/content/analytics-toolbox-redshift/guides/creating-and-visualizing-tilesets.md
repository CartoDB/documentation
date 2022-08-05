---
aliases:
    - /analytics-toolbox-rs/guides/
    - /analytics-toolbox-rs/guides/creating-and-visualizing-tilesets/
---
## Creating and visualizing tilesets

### Creating a tileset

#### From the CARTO Workspace

The CARTO Workspace offers a user interface that you can use to create [tilesets](/analytics-toolbox-redshift/overview/tilesets/#tileset-types-and-procedures). The option *Create a tileset* is available in the Data Explorer section from the Connections tab. To create a tileset from your data, select an available connection and click on a specific table (database/project(s), schemas/datasets and tables) from the collapsible tree.

<div style="text-align:center" >
<img src="/img/rs-analytics-toolbox/guides/create_tileset_rs_button_data_explorer_new2.png" alt="Create tileset button available from the Data Explorer" style="width:100%">
</div>


Clicking on the _Create tileset_ button will trigger a tileset creation wizard that you can follow along to configure your tileset. For step-by-step instructions, please visit [this guide](/carto-user-manual/data-explorer/creating-a-tileset-from-your-data/).

<div style="text-align:center" >
<img src="/img/rs-analytics-toolbox/guides/create_tileset_rs_ui_data_explorer.png" alt="Create tileset wizard from the Data Explorer" style="width:100%">
</div>


#### From the Redshift console or client

As a CARTO Analytics Toolbox module, the Tiler's capabilities are available as SQL procedures that can be executed directly from your [Redshift console](https://aws.amazon.com/redshift/).

<!-- or client of choice after connecting your CARTO account to BigQuery. -->

To check that your account has access to the Tiler, try running this query:

```sql
SELECT carto.VERSION_ADVANCED()
``` 

Check the [Getting Access](../../overview/getting-access) section if you run into any errors when running the query above.

Once you are all set getting access to the Tiler, creating a tileset is as easy as opening your Redshift console and running a query. In this case, we are going to create a *simple* tileset (see [Tileset procedures](../../overview/tilesets/#tileset-types-and-procedures)) from a couple of joined tables: one containing demographic information for Spain at the census section level, the other containing the geometries of the census sections.

The result will be a tileset with the geometry and the total population (`t1_1` variable) per census section:


```sql
USE DATABASE <analytics_toolbox_db>;
CALL carto.CREATE_SIMPLE_TILESET(
  'SELECT g.geom g.do_area, d.t1_1 FROM carto-do-public-data.esp_ine.geography_esp_censussection_2011 g 
   LEFT JOIN carto-do-public-data.esp_ine.demographics_sociodemographics_esp_censussection_2011_yearly_2011 d 
   ON (d.geoid = g.geoid)',
  'mydb.myschema.geography_esp_censussection_2011_tileset',
  '{
    "geom_column": "geom",
    "zoom_min": 0, 
    "zoom_max": 12,
    "properties": {
        "do_area": "Number",
        "t1_1": "Number"
    }
  }'
);
```
### Visualizing a tileset

#### From the CARTO Workspace

The CARTO Workspace offers access to the Data Explorer, where you will be able to preview your tilesets, and Builder, CARTO's state-of-the-art map making tool, where you will be able to style them, include them in your visualizations and share them.

##### Previewing tilesets from the Data Explorer

The Data Explorer offers a preview of your tilesets and displays their associated details and metadata, such as their size, number of records and statistics regarding the tile sizes per zoom level. Please refer to [this page](/carto-user-manual/data-explorer/introduction/) for more information regarding the Data Explorer.

<div style="text-align:center" >
<img src="/img/rs-analytics-toolbox/guides/tileset_rs_preview_data_explorer.png" alt="Tileset preview from the Data Explorer" style="width:100%">
</div>

##### Creating maps with tilesets using Builder

You can include tilesets as layers in your maps created with Builder. To do so, you have two options:

* use the _Create map_ option from the tileset preview page in the Data Explorer (see previous screenshot). This action will create a new map with your tileset as a its only layer.
* adding a layer to an existing map. 

For the latter option, you simply need to follow these simple steps:

1. Click on the _Add source from_ button in Builder, that can be found at the bottom left of the screen.

<div style="text-align:center" >
<img src="/img/pg-analytics-toolbox/guides/tileset_layer_choose_connection.png" alt="Choosing connection to add tileset from" style="width:100%">
</div>

2. Choose the Redshift connection from where your tileset is accessible.
3. Browse your projects and datasets until you find your tileset in the data explorer tree.

<div style="text-align:center" >
<img src="/img/rs-analytics-toolbox/guides/tileset_layer_choose_rs_tileset.png" alt="Choosing tileset to add as layer" style="width:100%">
</div>

4. Select your tileset. Your tileset will then be added as a layer.

<div style="text-align:center" >
<img src="/img/rs-analytics-toolbox/guides/tileset_layer_rs_loaded_new.png" alt="Tileset added as layer" style="width:100%">
</div>

5. Style your tileset like any other layer in Builder. For more details on how to style your layers, please visit [this page](/carto-user-manual/maps/map-styles/).

<div style="text-align:center" >
<img src="/img/rs-analytics-toolbox/guides/tileset_layer_rs_styled_new.png" alt="Tileset added as layer and styled" style="width:100%">
</div>

<!--- #### From the CARTO Dashboard

After connecting your CARTO account to BigQuery, a new _Your Tilesets_ tab will appear in the Data section of your Dashboard. This new tab shows the tilesets available to your account in a specific BigQuery project and dataset and some useful metadata. 

![Your Tilesets](/img/bq-analytics-toolbox/tiler/guides-your-tilesets.png)

Click in one of the tilesets to visualize it using **Map Viewer**. 

![Tileset Viewer](/img/bq-analytics-toolbox/tiler/guides-viewer-1.png)

Map Viewer uses CARTO for deck.gl's [declarative styling language](../../../deck-gl/guides/style-language), which makes it easier to create data-driven visualizations. 

Creating color ramps for data-driven visualizations is straight-forward, using helper functions for different types of classifications. Take a look at the [documentation](https://deck.gl/docs/api-reference/carto/styles) for more information.

Let's create a binned ramp visualization with the `colorBins()` helper function:

```js
"getFillColor": {
  "@@function": "colorBins",
  "attr": "total_pop",
  "domain": [
    729,
    937,
    1154,
    1394,
    1712,
    2235
  ],
  "colors": "Emrld"
}
```

* `attr`: name of the data attribute in your tileset. 
* `domain`: manual classification breaks. Click on [_Open TileJSON_](https://maps-api-v2.us.carto.com/user/ernestomb/bigquery/tileset?source=cartobq.maps.blockgroup_pop&format=tilejson&api_key=default_public) and find the `quantiles` section, which gives you the breaks for different quantile classifications.
* `colors`: Use an array of RGBA colors `[ [r, g, b, [a]] ]` , or just pick a [CARTOcolors](https://carto.com/carto-colors) ramp and use its name. 

![Tileset Viewer II](/img/bq-analytics-toolbox/tiler/guides-viewer-2.png)

Using Google Maps as a basemap is also possible with this tool. Add `"google": true` in the Map Style section, or just use the basemap selector in the top right corner of the screen:

![Tileset Viewer III](/img/bq-analytics-toolbox/tiler/guides-viewer-3.png)

##### Sharing a visualization

Tilesets can be used as data layers with many web mapping libraries. Take a look at the **Development tools** section in our [documentation](/#dev-tools) to learn about different options.

For quick sharing and publishing on the web, use the options from the _Share_ menu in Map Viewer.

Clicking on _Publish_ will grant permission in BigQuery to the CARTO Maps API service account, so it can directly fetch and serve the map tiles. Use the _Unpublish_ toggle to revoke the access.

![Tileset Viewer sharing menu](/img/bq-analytics-toolbox/tiler/guides-sharing.png)

Copy the link or the embed code to share or publish the visualization.

<iframe height=480px width=100% src="https://viewer.carto.com/user/ernestomb/bigquery?config=eyJkZXNjcmlwdGlvbiI6IkNhcnRvQlFUaWxlckxheWVyIGRlY2xhcmF0aXZlIGV4YW1wbGUiLCJpbml0aWFsVmlld1N0YXRlIjp7ImxhdGl0dWRlIjozOC4wNDE4NTQ4Njc1NTk4OCwibG9uZ2l0dWRlIjotOTYuNTI1MzY0NjgwNjUwMywiem9vbSI6MywicGl0Y2giOjAsImJlYXJpbmciOjAsImRyYWdSb3RhdGUiOmZhbHNlLCJ3aWR0aCI6NzA0LCJoZWlnaHQiOjcwOSwiYWx0aXR1ZGUiOjEuNSwibWF4Wm9vbSI6MjAsIm1pblpvb20iOjAsIm1heFBpdGNoIjo2MCwibWluUGl0Y2giOjAsInRyYW5zaXRpb25EdXJhdGlvbiI6MCwidHJhbnNpdGlvbkludGVycG9sYXRvciI6eyJfcHJvcHNUb0NvbXBhcmUiOlsibG9uZ2l0dWRlIiwibGF0aXR1ZGUiLCJ6b29tIiwiYmVhcmluZyIsInBpdGNoIl0sIl9wcm9wc1RvRXh0cmFjdCI6WyJsb25naXR1ZGUiLCJsYXRpdHVkZSIsInpvb20iLCJiZWFyaW5nIiwicGl0Y2giXSwiX3JlcXVpcmVkUHJvcHMiOlsibG9uZ2l0dWRlIiwibGF0aXR1ZGUiLCJ6b29tIl0sIm9wdHMiOnsiYXJvdW5kIjpbMjM1LDM3OV19fSwidHJhbnNpdGlvbkludGVycnVwdGlvbiI6MX0sInZpZXdzIjpbeyJAQHR5cGUiOiJNYXBWaWV3IiwiY29udHJvbGxlciI6dHJ1ZSwibWFwU3R5bGUiOiJAQCNDQVJUT19CQVNFTUFQLlBPU0lUUk9OIn1dLCJsYXllcnMiOlt7IkBAdHlwZSI6IkNhcnRvQlFUaWxlckxheWVyIiwiZGF0YSI6ImNhcnRvYnEubWFwcy5ibG9ja2dyb3VwX3BvcCIsImNyZWRlbnRpYWxzIjp7InVzZXJuYW1lIjoiZXJuZXN0b21iIiwiYXBpS2V5IjoiZGVmYXVsdF9wdWJsaWMifSwiZ2V0RmlsbENvbG9yIjp7IkBAZnVuY3Rpb24iOiJjb2xvckJpbnMiLCJhdHRyIjoidG90YWxfcG9wIiwiZG9tYWluIjpbNzI5LDkzNywxMTU0LDEzOTQsMTcxMiwyMjM1XSwiY29sb3JzIjoiRW1ybGQifSwicG9pbnRSYWRpdXNNaW5QaXhlbHMiOjIsInN0cm9rZWQiOmZhbHNlLCJwaWNrYWJsZSI6dHJ1ZX1dLCJnb29nbGUiOnRydWV9&embed=true" title="CARTO BigQuery Tiler map"></iframe>

##### Map Viewer

Map Viewer is a new tool for visualizing tilesets directly from the Dashboard. To open Map Viewer, just click on a tileset from 'Your Tilesets' tab in the 'Data' section of the Dashboard. 

Map Viewer provides some defaults to help you explore your data, but it's possible to customize the cartography using the [deck.gl styling language](../../../deck-gl/guides/style-language).

For this guide, we will use a tileset that contains every European river. It's available in the CARTO Data Observatory public data project in BigQuery. To visualize it, just type the `bqcartodemos` in the project selector and find the `tilesets` dataset.

![eurivers tileset](/img/bq-analytics-toolbox/tiler/guides-eurivers.png)

**Map Style**

By clicking on the icon on the left bar, the Map Style panel will appear, showing a text editor with a predefined style.

As mentioned before, Map Viewer uses deck.gl's style language. For more detailed information about the language's capabilities, see the complete reference [here](../../../deck-gl/guides/style-language/#api-reference).

![Map Style](/img/bq-analytics-toolbox/tiler/guides-mapstyle.png)

**Basemaps**

Map Viewer offers different basemaps for your visualizations. Click on the icon in the top-left corner to show the basemap selector. 

*Positron*, *Dark Matter*, and *Voyager* CARTO basemaps are optimized for data visualization and will make your data layer stand out. 

You can also use Google Maps as basemaps, selecting *Roads* or *Satellite*

![Map Style basemap selector](/img/bq-analytics-toolbox/tiler/guides-basemap-selector.png)

**Basic styles**

You can quickly change some of the properties, like `getFillColor` to modify the fill colors of points and polygons, or `getLineColor` for lines. The property expects a color defined as an `[r,g,b,[a]]` array. Simple visualization properties are detailed [here](../../../deck-gl/guides/style-language/#layers-basic-properties).

**Color ramps**

Basic styles might be a good option for the most basic maps, but creating more sophisticated, data-driven visualizations is also possible using [helper functions](../../../deck-gl/guides/style-language/#creating-advanced-visualizations) for three different types of visualization: 

* `colorBins` assigns different colors to different buckets in the data range. This is useful for a choropleth visualization where you need to define the breaks of the data and define a color palette.
* `colorCategories` assigns colors to specific values. This is useful for visualizing categorical data.
* `colorContinuous` assigns a blended color based on a linear interpolation of values. This is useful for different types of visualizations. This is the one we are going to use for our example.

Replace the `getLineColor` property with the following block to style the rivers depending on their bearing. 

```js
"getLineColor": {
  "@@function": "colorContinuous",
  "attr": "bearing",
  "domain": [
    0,
    60,
    120,
    180,
    240,
    300,
    360
  ],
  "colors": "Earth"
}
```

Let's explain a bit how this function works:

* `"attr"`: Select a property from your tileset that contains the values that you want to use for the styling. In this case, it's `bearing`, which contains the direction in degrees relative to the North in which each river flows. 
* `"domain"`: In this case, it contains the values that will be used for the interpolation. 
* `"colors"`: This value can be an array of `[r,g,b,[a]]` colors that will be mapped with the values in the domain. The intermediate colors will be assigned based on the linear interpolation of values.
Another option is using a [CARTOcolors](https://carto.com/carto-colors) palette, by just indicating its name.

Take a look at the result. Can you appreciate how the hydrographic basins stand out, just by assigning different colors to each river's bearing?  

![Map Style ramp](/img/bq-analytics-toolbox/tiler/guides-ramp.png)


##### Open TileJSON

At the bottom of the _Map Style_ section, you will find an _Open TileJSON_ button. It will open a new tab with a TileJSON request. The response contains a description of the tileset in TileJSON format, with metadata about: 
* The URL pattern to retrieve the tiles. 
* Zoom range, bounds, and center of the features in the tileset.
* Information about the layers contained in the tileset.
* Tilestats with statistic information such as maximum, minimum, average, count, and sum. It also includes a section called `quantiles` that contains the quantile breaks for the properties included, as well as the top 10 categories and their frequency. 

##### Copy XYZ URL

Also at the bottom of the _Map Style_ section there is a _Copy XYZ URL_ that copies directly in your clipboard the tiles URL following the XYZ convention:

{{% bannerNote type="code" %}}
https://maps-api-v2.us.carto.com/user/USERNAME/bigquery/tileset/{z}/{x}/{y}?source=project.dataset.tileset(...)&api_key=API_KEY
{{%/ bannerNote %}}

This is most useful for loading the tileset with any web-mapping library or desktop application, like QGIS.

##### Share

The _Share_ section allows the publishing of a tileset. By publishing, we grant **CARTO BigQuery Data Viewer** (`bigquery/dataViewer`) permissions to the associated tileset. By doing so, this map becomes public on the web, and anybody with the URL will be able to see it.

By unpublishing the tileset, we will revoke the permission mentioned above and disable the sharing links. 

{{% bannerNote title="Note" %}}
It can take up to 5 minutes to remove the map from the CDN cache.
{{%/ bannerNote %}}

Once published, you will find different options to publish the map URL on social networks, as well as the HTML code to embed the map on a website. -->

<!-- ### CLI tool

We provide a Python Command Line tool called `carto-bq-tiler`. Think of it as a supplement to the [bq command-line tool](https://cloud.google.com/bigquery/docs/bq-command-line-tool) provided by Google, but with some specific functionality to work with Tilesets. It allows you to:

* Create, list, delete, and manage Tilesets in your BigQuery project
* Visualize privately, using your authentication, your Tilesets
* Upload Tilesets generated using other tools in MBTiles format
* Download a tileset from BigQuery into a set of vector files or an MBTiles file to host your Tilesets somewhere else

##### Installation

You need to have the Google [bq command-line tool](https://cloud.google.com/bigquery/docs/bq-command-line-tool) already installed and [working](https://cloud.google.com/shell/docs/using-cloud-shell). So check if this command works for you:

```bash
bq query "SELECT 1"
```

If you get something like this:

![Working CLI](/img/bq-analytics-toolbox/tiler/working-cli.png)

you are good to go and you should install `carto-bq-tiler` like this:

```bash
pip3 install carto-bq-tiler
```

Finally, to check that the tool is working just type:

```bash
carto-bq-tiler --help
```

##### Authentication

`carto-bq-tiler` uses the credentials created by the [bq command-line tool](https://cloud.google.com/bigquery/docs/bq-command-line-tool), and it will use the default project configured for it. If you want to use another project you can use the `-p` (`--project`) option, for example for listing the tilests:

```bash
carto-bq-tiler -p PROJECT list
```

Also, if you have a service account JSON file you can use it instead with `-c` (`--credentials`):

```bash
carto-bq-tiler -c CREDENTIALS_JSON_PATH list
```

##### List your tilesets

List the Tilesets in your Google Cloud project with:

```bash
carto-bq-tiler list
```

##### Upload a tileset

You can upload MBTiles files that contain tiles in MVT format. The only constraint is that the features must have an `id` integer property.

```bash
carto-bq-tiler load MBTILES_PATH TILESET_NAME
```

`TILESET_NAME` is the tileset destination in BigQuery, and it's composed by the dataset and the table as `dataset.table`.

##### Delete a tileset

You can simply delete a dataset from BigQuery with:

```bash
carto-bq-tileset remove TILESET_NAME
```

##### Export a tileset

Tilesets can be exported to your computer in two formats:

MBTiles files:

```bash
carto-bq-tiler export-mbtiles TILESET_NAME
```

Directory tree:

```bash
carto-bq-tiler export-tiles TILESET_NAME
```

##### View a tileset

Tilesets can be viewed and explored in multiple ways:

A downloaded directory tree:

```bash
carto-bq-tiler view-local TILESET_DIRECTORY
```

A tileset in BigQuery:

```bash
carto-bq-tiler view TILESET_NAME
```

A tileset in BigQuery in comparative mode:

```bash
carto-bq-tiler view TILESET_NAME -c
```

An empty viewer:

```bash
carto-bq-tiler view -e
```

You can also modify the port of the viewer with the `--port` option.

{{% euFlagFunding %}}
 -->