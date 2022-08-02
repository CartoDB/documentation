---
aliases:
    - /analytics-toolbox-sf/guides/
    - /analytics-toolbox-sf/guides/creating-and-visualizing-tilesets/
---

## Creating and visualizing tilesets

### Creating a tileset

#### From the CARTO Workspace

The CARTO Workspace offers a user interface that you can use to create [simple tilesets](/analytics-toolbox-snowflake/overview/tilesets/#tileset-types-and-procedures). The option _Create tileset_ is available from the Data Explorer for those tables that are too big to be visualized directly and therefore require the creation of a tileset.

<div style="text-align:center" >
<img src="/img/sf-analytics-toolbox/guides/create_tileset_sf_button_data_explorer.png" alt="Create tileset button available from the Data Explorer" style="width:100%">
</div>

<!-- <div style="text-align:center" >
<img src="/img/bq-analytics-toolbox/tiler/create_tileset_button_data_explorer.png" alt="Create tileset button available from the Data Explorer" style="width:100%">
</div> -->


Clicking on the _Create tileset_ button will trigger a tileset creation wizard that you can follow along to configure your tileset. For step-by-step instructions, please visit [this guide](/carto-user-manual/data-explorer/creating-a-tileset-from-your-data/).

<div style="text-align:center" >
<img src="/img/sf-analytics-toolbox/guides/create_tileset_sf_ui_data_explorer.png" alt="Create tileset wizard from the Data Explorer" style="width:100%">
</div>

<!-- <div style="text-align:center" >
<img src="/img/bq-analytics-toolbox/tiler/create_tileset_ui_data_explorer.png" alt="Create tileset wizard from the Data Explorer" style="width:100%">
</div> -->

#### From the Snowflake console or client
As a CARTO Analytics Toolbox module, the Tiler's capabilities will be available as SQL procedures that can be executed directly from your [Snowflake console](https://console.cloud.google.com/bigquery).

<!-- or client of choice after connecting your CARTO account to BigQuery. -->

To check that your Google account or service account has access to the Tiler, try running this query:

```sql
SELECT carto.VERSION_ADVANCED()
``` 

Check the [Getting Access](../../overview/getting-access) section if you run into any errors when running the query above.

Once you are all set getting access to the Tiler, creating a tileset is as easy as opening your Snowflake console and running a query. In this case, we are going to create a *simple* tileset (see [Tileset procedures](../../overview/tilesets/#tileset-types-and-procedures)) from a couple of joined tables: one containing demographic information for the US at the blockgroup level, the other containing the geometries of the blockgroups.

The result will be a tileset with the geometry and the total population per county:


```sql
USE DATABASE <ANALYTICS_TOOLBOX_DB>;
CALL carto.CREATE_SIMPLE_TILESET(
  'SELECT g.GEOM, d.TOTAL_POP FROM CARTO-DO-PUBLIC-DATA.CARTO.GEOGRAPHY_USA_COUNTY_2019 g 
   LEFT JOIN CARTO-DO-PUBLIC-DATA.USA_ACS.DEMOGRAPHICS_SOCIODEMOGRAPHICS_USA_COUNTY_2015_YEARLY_2018 d 
   ON (d.GEOID = g.GEOID)',
  'MYDB.MYSCHEMA.TILESET_GEOGRAPHY_USA_COUNTY_2019_TILESET',
  '{
    "geom_column": "GEOM",
    "zoom_min": 0, 
    "zoom_max": 12,
    "properties": {
      "TOTAL_POP": "Number",
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
<img src="/img/sf-analytics-toolbox/guides/tileset_sf_preview_data_explorer.png" alt="Tileset preview from the Data Explorer" style="width:100%">
</div>

<!-- <div style="text-align:center" >
<img src="/img/bq-analytics-toolbox/tiler/tileset_preview_data_explorer.png" alt="Tileset preview from the Data Explorer" style="width:100%">
</div> -->

##### Creating maps with tilesets using Builder

You can include tilesets as layers in your maps created with Builder. To do so, you have two options:

* use the _Create map_ option from the tileset preview page in the Data Explorer (see previous screenshot). This action will create a new map with your tileset as a its only layer.
* adding a layer to an existing map. 

For the latter option, you simply need to follow these simple steps:

1. Click on the _Add source from_ button in Builder, that can be found at the bottom left of the screen.

<div style="text-align:center" >
<img src="/img/sf-analytics-toolbox/guides/tileset_layer_choose_sf_connection.png" alt="Choosing connection to add tileset from" style="width:100%">
</div>

<!-- <div style="text-align:center" >
<img src="/img/bq-analytics-toolbox/tiler/tileset_layer_choose_connection.png" alt="Choosing connection to add tileset from" style="width:100%">
</div> -->

2. Choose the BigQuery connection from where your tileset is accessible.
3. Browse your projects and datasets until you find your tileset in the data explorer tree.

<div style="text-align:center" >
<img src="/img/sf-analytics-toolbox/guides/tileset_layer_choose_sf_tileset.png" alt="Choosing tileset to add as layer" style="width:100%">
</div>

<!-- <div style="text-align:center" >
<img src="/img/bq-analytics-toolbox/tiler/tileset_layer_choose_tileset.png" alt="Choosing tileset to add as layer" style="width:100%">
</div> -->

4. Select your tileset. Your tileset will then be added as a layer.

<div style="text-align:center" >
<img src="/img/sf-analytics-toolbox/guides/tileset_layer_sf_loaded.png" alt="Tileset added as layer" style="width:100%">
</div>

<!-- <div style="text-align:center" >
<img src="/img/bq-analytics-toolbox/tiler/tileset_layer_loaded.png" alt="Tileset added as layer" style="width:100%">
</div> -->

5. Style your tileset like any other layer in Builder. For more details on how to style your layers, please visit [this page](/carto-user-manual/maps/map-styles/).

<div style="text-align:center" >
<img src="/img/sf-analytics-toolbox/guides/tileset_layer_sf_styled.png" alt="Tileset added as layer and styled" style="width:100%">
</div>

<!-- <div style="text-align:center" >
<img src="/img/bq-analytics-toolbox/tiler/tileset_layer_styled.png" alt="Tileset added as layer and styled" style="width:100%">
</div> -->
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