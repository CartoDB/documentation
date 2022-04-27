---
title: "Find twin areas of your top performing stores"
description: "The Twin Areas analysis can be used to build a similarity score with respect to an existing site (e.g. the location of your top performing store) for a set of target locations, which can prove an essential tool for Site Planners looking at opening, relocating, or consolidating their retail network. In this example we select as potential origin locations the locations of the top 10 performing liquor stores in 2019 in Iowa, US from the publicly available [Liquor sales dataset](https://data.iowa.gov/Sales-Distribution/Iowa-Liquor-Sales/m3tr-qhgy) to find the most similar locations in Texas, US."
image: "/img/bq-analytics-toolbox/examples/twin-areas-iowa.png"
type: examples
date: "2022-04-22"
categories:
    - retail
aliases:
    - /analytics-toolbox-bq/examples/twin-areas-iowa/
---
## Applying the Twin Areas analysis to find the most similar location in Texas, US to the locations of the top 10 liquor stores in 2019 in Iowa.

[The Twin Areas analysis](https://carto.com/blog/spatial-data-science-site-planning/) consists in three main steps:
- Select relevant variables given the characteristics of your business (e.g. population, income, etc.), coming from either our [Data Observatory (DO)](https://carto.com/spatial-data-catalog/) or from your own data tables;

- Gridify and enrich the location of an existing site (from now on referred to as the origin location) and of all the target locations using the selected data sources. The process of gridification both for the origin and target locations, which is required in order to be able to compare areas of the same size, relies on the use of [spatial indexes](https://docs.carto.com/analytics-toolbox-bigquery/overview/spatial-indexes/) (either quadkey or h3) as constructed using the available procedures in the Analytics Toolbox.    

For this, we can use the [GRIDIFY_ENRICH](https://docs.carto.com/analytics-toolbox-bigquery/sql-reference/data/#gridify_enrich) procedure from the data module in CARTO’s Analytics Toolbox. This procedure is used to first gridify a set of geometries (point data in this case) to a quadkey grid with zoom 15,  and then to enrich each selected location with data from a subscription to one of the datasets available in the Data Observatory, including the total population (_total_pop_3409f36f_) and the number of households (_households_d7d24db5_) at the Census Block Group level from the ACS Sociodemographics dataset, as well as from a custom dataset, which contains the count of road links (_count_qualified_) per zip code.

```sql
CALL `carto-un`.carto.GRIDIFY_ENRICH(
    -- Input query
    'SELECT * FROM `cartobq.docs.twin_areas_iowa_liquor_sales_origin`',
    -- Grid params: grid type and level
    'quadkey', 15, 
    -- Data Observatory enrichment
    [('total_pop_3409f36f','sum'),('households_d7d24db5','sum')],
    'carto-data.ac_7xhfwyml',
    -- Custom data enrichment
    '''
    SELECT geom, count_qualified FROM `cartobq.docs.twin_areas_custom` 
    ''',
    [('count_qualified','count')],
    0,"uniform",
    -- Output table
    'cartobq.docs.twin_areas_origin_enriched')
```

This map shows both the locations of the selected stores (_left_) as well as the enriched grid for the population variable (_right_)

<iframe width="640px" height="360px" src="https://gcp-us-east1.app.carto.com/map/04a1916a-f7d6-4cda-8e84-cfa4a825628c"></iframe>

Similarly, we can use this procedure to gridify and enrich the target areas for which we will use a the Census Tracts polygons in Texas in the main urban areas

```sql
CALL `carto-un`.carto.GRIDIFY_ENRICH(
    -- Input query
     'SELECT geom FROM `cartobq.docs.twin_areas_target`',
    -- Grid params: grid type and level
    'quadkey', 15, 
    -- Data Observatory enrichment
    [('total_pop_3409f36f','sum'),('households_d7d24db5','sum')],
    'carto-data.ac_7xhfwyml',
    -- Custom data enrichment
    '''
    SELECT geom, count_qualified FROM `cartobq.docs.twin_areas_custom` 
    ''',
    [('count_qualified','count')],
    0,"uniform",
    -- Output table
    'cartobq.docs.twin_areas_target_enriched');
```

as shown in this map

<iframe width="640px" height="360px" src="https://gcp-us-east1.app.carto.com/map/bda48d97-09d6-4aa2-9807-db1d33d4383b"></iframe>

- Derive a similarity skill score between the origin and each target location by ranking the distance between the origin and each target cell in the variable space (where the selected variables are first transformed using to their Principal Component scores to account for pairwise correlations) with respect to the score of the average cell in the target areas.

Once we gridified and enriched the origin and target areas, we can then run the [FIND_TWIN_AREAS](ADD URL) procedure for a given origin location, here selected as the store with the highest revenue:

```sql
CALL
 `carto-un`.carto.FIND_TWIN_AREAS(
    -- Input queries
    '''SELECT * FROM `cartobq.docs.twin_areas_origin_enriched`
                    LIMIT 1''',
    '''SELECT * FROM `cartobq.docs.twin_areas_target_enriched`''',
    -- Twin areas model inputs
    -- Grid type
    'quadkey',
    -- Percentage of explained variance retained by the Principal Component Analysis (PCA)
    0.90,
    -- Maximum number of twin areas
    NULL,
    -- Output prefix used to store the results: <output_prefix>_model_pca_components for the PCA model and <output_prefix>_<origin_cell_ID>_results for the results 
    'cartobq.docs.twin_areas');
```

<iframe width="640px" height="360px" src="https://gcp-us-east1.app.carto.com/map/3fdf0e74-7301-4a19-81a9-d6a21dadc691" title="Twin Areas in Texas, US for the locations of the top 10 liquor stores in 2019 in Iowa."></iframe>

This map shows the similarity skill score for all the target cells with a positive score: larger scores indicate areas more similar to the origin location. 

Traditionally, discovering new areas for businesses represented a difficult and lengthy process, which required on-site market analysis and local expertise. Using instead our Twin Areas tool, retailers and companies in CPG can now easily discover the best locations to expand or optimize their network without a strong prior knowledge of the area and optimize their site planning process by taking advantage of our comprehensive data catalog and the analytical capability of CARTO’s cloud-native platform.

{{% bannerNote title="Note" %}}
Check out this [blogpost](https://docs.carto.com/analytics-toolbox-bigquery/sql-reference/retail/#find_twin_areas) for more information on the application of the Twin Areas analysis to this use case.
{{%/ bannerNote %}}
