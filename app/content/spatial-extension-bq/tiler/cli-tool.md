## CLI tool

We provide a Python Command Line tool called `carto-bq-tiler`. Think of it as a supplement to the [bq command line tool](https://cloud.google.com/bigquery/docs/bq-command-line-tool) provided by Google, but with some specific functionality to work with Tilesets. It allows you to:

* Create, list, delete, and manage Tilesets in your BigQuery project
* Visualize privately, using your authentication, your Tilesets
* Upload Tilesets generated using other tools in MBTiles format
* Download a tileset from BigQuery into a set of vector files or a MBTiles file to host your Tilesets somewhere else

### Installation

You need to have the Google [bq command line tool](https://cloud.google.com/bigquery/docs/bq-command-line-tool) already installed and [working](https://cloud.google.com/shell/docs/using-cloud-shell). So check if this command works for you:

```python
bq query "SELECT 1"
```

If you get something like this:

![Working CLI](/img/bq-spatial-extension/tiler/working-cli.png)

you are good to go and you should install `carto-bq-tiler` like this:

```python
pip3 install carto-bq-tiler
```

Finally, to check that the tool is working just type:

```python
carto-bq-tiler --help
```

### Authentication

`carto-bq-tiler` uses the credentials created by the [bq command line tool](https://cloud.google.com/bigquery/docs/bq-command-line-tool), and it will use the default project configured for it. If you want to use another project you can use the `-p` (`--project`) option, like for listing the tilests:

```python
carto-bq-tiler -p PROJECT list
```

Also, if you have a service account JSON file you can use it instead with `-c` (`--credentials`):

```python
carto-bq-tiler -c CREDENTIALS_JSON_PATH list
```

### List your tilesets

List the Tilesets in your Google Cloud project with:

```python
carto-bq-tiler list
```

### Upload a tileset

You can upload MBTiles files that contain tiles in MVT format. The only constraint is that the features must have an `id` integer property.

```python
carto-bq-tiler load MBTILES_PATH TILESET_NAME
```

`TILESET_NAME` is the tileset destination in BigQuery, and it's composed by the dataset and the table as `dataset.table`.

### Delete a tileset

You can simply delete a dataset from BigQuery with:

```python
carto-bq-tileset remove TILESET_NAME
```

### Export a tileset

Tilesets can be exported to your computer in two formats:

MBTiles files:

```python
carto-bq-tiler export-mbtiles TILESET_NAME
```

Directory tree:

```python
carto-bq-tiler export-tiles TILESET_NAME
```

### View a tileset

Tilesets can be viewed and explored in multiple ways:

A downloaded directory tree:

```python
carto-bq-tiler view-local TILESET_DIRECTORY
```

A tileset in BigQuery:

```python
carto-bq-tiler view TILESET_NAME
```

A tileset in BigQuery in comparative mode:

```python
carto-bq-tiler view TILESET_NAME -c
```

An empty viewer:

```python
carto-bq-tiler view -e
```

You can also modify the port of the viewer with the `--port` option.