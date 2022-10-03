---
title: 'Creating spatial index tilesets'
description: 'We provide a set of examples that showcase how to easily create tilesets based on spatial indexes allowing you to process and visualize very large spatial datasets stored in BigQuery. You should use this procedure if you have a dataset that contains a column with a spatial index identifier instead of a geometry and you want to visualize it at an appropriate zoom level.'
image: '/img/bq-analytics-toolbox/examples/uk_spatial_index_tileset.png'
type: examples
date: '2022-05-21'
categories:
    - tiler
---
## Creating spatial index tilesets

We provide a set of examples that showcase how to easily create simple tilesets allowing you to process and visualize very large spatial datasets stored in BigQuery. You should use this procedure if you have a dataset that contains a column with a spatial index identifier instead of a geometry and you want to visualize it at an appropriate zoom level.

### Tileset from UK Spatial Features QUADKEY dataset

In this example we are creating a tileset with population values from a UK Spatial Features dataset that contains a `geoid` column with QUADKEY ids. The dataset if publicly available in the [CARTO Data Observatory](https://gcp-us-east1.app.carto.com/data/observatory/carto/subscriptions.cdb_spatial_fea_1e9882ab).

The dataset is divided in two tables: one with the data and the spatial index ids, and another one with those ids and the corresponding polygon geometries. The procedure that creates the tileset does not require any geometry, and only uses the spatial index ids, so there is no need to use both tables or join them beforehand. Instead, the data table is passed to the procedure as input table.

Population for each cell is stored in a column named `population`. We will use a `sum` function to aggregate population values in the different levels of the tileset. The aggregated values will be stored in a column with that same name.

The query used to produce the tileset is the following:

{{% customSelector %}}𝅺{{%/ customSelector %}}
```sql
CALL `carto-un`.carto.CREATE_SPATIAL_INDEX_TILESET(
  "carto-data.ac_7xhfwyml.sub_carto_derived_spatialfeatures_gbr_quadgrid15_v1_yearly_v2",
  "my_project.my_dataset.uk_spatial_features_tileset_quadkey",
  '''
  {
      "resolution_min": 2,
      "resolution_max": 8,
      "spatial_index_column": "quadint:geoid",
      "resolution": 15,
      "aggregation_resolution": 4,
      "properties": {
          "population": {
              "formula":"sum(population)",
              "type":"Number"
          }
      }
  }
  '''
);
```


### Tileset from UK Spatial Features H3 dataset

A version of the UK Spatial Features dataset that uses H3 instead of QUADKEYS is also [available](https://gcp-us-east1.app.carto.com/catalog/dataset/cdb_spatial_fea_6b8f8034).

The following query can be used to create a tileset similar to the one described in the example above, but using H3 cells:

{{% customSelector %}}𝅺{{%/ customSelector %}}
```sql
CALL `carto-un`.carto.CREATE_SPATIAL_INDEX_TILESET(
  "carto-data.ac_7xhfwyml.sub_carto_derived_spatialfeatures_gbr_h3res8_v1_yearly_v2",
  "my_project.my_dataset.uk_spatial_features_tileset_h3",
  '''
  {
      "resolution_min": 1,
      "resolution_max": 4,
      "spatial_index_column": "h3:geoid",
      "resolution": 8,
      "aggregation_resolution": 4,
      "properties": {
          "population": {
              "formula":"sum(population)",
              "type":"Number"
          }
      }
  }
  '''
);
```
