## Looking for twin areas of a prolific business

In this example we are going to find twin area candidate for a well performing store.

### Gridify and enrich origin areas

```sql
CALL `cartodb-gcp-backend-data-team.fbaptiste_carto.GRIDIFY_ENRICH`(
    -- Biqquery inputs
    'cartodb-gcp-backend-data-team.fbaptiste_carto',
    -- Input query
    '''
      WITH
      T AS (
      SELECT
        DISTINCT store_location
      FROM
        `bigquery-public-data.iowa_liquor_sales.sales`
      WHERE
        store_location IS NOT NULL AND EXTRACT(YEAR FROM date)=2019)
    SELECT
      ST_GEOGFROMTEXT(store_location) geom
    FROM
      T
    ''',
    'point',
    'geom','index',
    -- Grid params: grid type and level
    'quadkey', 15, 
    -- Data Observatory enrichment
    [('total_pop_3409f36f','sum'),('households_d7d24db5','sum')],
    'carto-data.ac_7xhfwyml',
    -- Custom data enrichment
    'geom',
    '''
    WITH
      us_national_roads AS (
      SELECT
        road_geom
      FROM
        `bigquery-public-data.geo_us_roads.all_roads_19`),
      zip_codes AS (
      SELECT
        ST_CENTROID(zip_code_geom) zip_code_center,
        zip_code_geom
      FROM
        `bigquery-public-data.geo_us_boundaries.zip_codes`
      WHERE
        state_fips_code="19")
    SELECT
      ANY_VALUE(zip_code_geom) geom,
      SUM(IF(ST_DISTANCE(road_geom,zip_code_center)<1000, 1, 0)) count_qualified
    FROM
      us_national_roads,
      zip_codes
    GROUP BY
      ST_ASTEXT(zip_code_center)
  ''',
    [('count_qualified','sum')],
    -- Output table
    'twin_areas_test_data_origin_lonlat_quadkeyz15_enriched');
```

### Gridify and enrich target areas

```sql
    CALL `cartodb-gcp-backend-data-team.fbaptiste_carto.GRIDIFY_ENRICH`(
    -- Biqquery inputs
    'cartodb-gcp-backend-data-team.fbaptiste_carto',
    -- Input query
    'SELECT geom FROM  `cartodb-on-gcp-datascience.giulia.twin_areas_test_data_target_poly`',
    'polygon',
    'geom','index',
    -- Grid params: grid type and level
    'quadkey', 15, 
    -- Data Observatory enrichment
    [('total_pop_3409f36f','sum'),('households_d7d24db5','sum')],
    'carto-data.ac_7xhfwyml',
    -- Custom data enrichment
    'geom',
    '''
    WITH
      us_national_roads AS (
      SELECT
        road_geom
      FROM
        `bigquery-public-data.geo_us_roads.all_roads_48`),
      zip_codes AS (
      SELECT
        ST_CENTROID(zip_code_geom) zip_code_center,
        zip_code_geom
      FROM
        `bigquery-public-data.geo_us_boundaries.zip_codes`
      WHERE
        state_fips_code="48")
    SELECT
      ANY_VALUE(zip_code_geom) geom,
      SUM(IF(ST_DISTANCE(road_geom,zip_code_center)<1000, 1, 0)) count_qualified
    FROM
      us_national_roads,
      zip_codes
    GROUP BY
      ST_ASTEXT(zip_code_center)
  ''',
    [('count_qualified','sum')],
    -- Output table
    'twin_areas_test_data_target_poly_quadkeyz15_enriched');
```

### Compute the similarity score and find potential twin areas

Once we have gridify the origin and the target areas, we can easily get the cell of the Hy-Vee store that sells the most in 2019 in Iowa and look for twin cells in the target area.

```sql
    CALL `cartodb-gcp-backend-data-team.fbaptiste_carto.TWIN_AREAS`(
    -- Bigquery inputs
    'cartodb-gcp-backend-data-team.fbaptiste_carto',
    -- Index and geom columns names
    'index','geom',
    -- Input queries
    '''
    WITH selected_location AS (
    SELECT store_name, ANY_VALUE(ST_GEOGFROMTEXT(store_location)) store_location, sum(sale_dollars) sales
    FROM  `bigquery-public-data.iowa_liquor_sales.sales`
    WHERE store_name LIKE "%Hy-Vee%" AND EXTRACT(YEAR FROM date)=2019
    GROUP BY store_name
    ORDER BY sales DESC
    LIMIT 1
        )
    SELECT T.*
    FROM `cartodb-gcp-backend-data-team.fbaptiste_carto.twin_areas_test_data_origin_lonlat_quadkeyz15_enriched` T, selected_location
    WHERE ST_WITHIN(store_location, T.geom)
    ''',
    'SELECT * FROM `cartodb-gcp-backend-data-team.fbaptiste_carto.twin_areas_test_data_target_poly_quadkeyz15_enriched`',
    -- Twin areas model inputs
    'twin_areas_test_model_quadkeyz15_polygon',0.90,NULL);
```


