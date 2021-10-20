## Enrichment of catchment areas for store characterization

In this example we are going to characterize all Starbucks locations in the US by the total population covered by their catchment areas. We are going to define these catchment areas as a 3km buffer around each store.

First, let’s start by visualizing all Starbucks locations in the US, extracted from [Safegraph’s Places dataset sample](https://www.snowflake.com/datasets/safegraph-core-places-starbucks), freely available through Snowflake's Data Marketplace.

```sql
SELECT ST_MAKEPOINT(LONGITUDE, LATITUDE) as geom FROM CDA26920_STARBUCKS_CORE_PLACES_SAMPLE.PUBLIC.CORE_POI
```

<div style="text-align:center" >
<img src="/img/sf-analytics-toolbox/examples/sf-enrichment-example-1.png" alt="Store locations." style="width:90%">
</div>

To quickly explore this data, using the Analytics Toolbox, we can easily compute an aggregation of these locations using Quadkeys at resolution 15, which lets us visualize the result as a heatmap. Here is a close-up of the Manhattan area, where we can easily identify the areas of highest concentration of Starbucks stores. 

```sql
with qks as 
(SELECT sfcarto.quadkey.LONGLAT_ASQUADINT(LONGITUDE, LATITUDE, 15) as qk
FROM CDA26920_STARBUCKS_CORE_PLACES_SAMPLE.PUBLIC.CORE_POI)
SELECT count(*) as num_stores, sfcarto.quadkey.ST_BOUNDARY(qk) as geom from qks GROUP BY qk
```

<div style="text-align:center" >
<img src="/img/sf-analytics-toolbox/examples/sf-enrichment-example-2.png" alt="Store aggregations in quadkeys of resolution 15." style="width:90%">
</div>

Now, let’s enhance our analysis by computing a 3 km buffer around each store, using the geometry constructor module from the Analytics Toolbox:

```sql
SELECT sfcarto.constructors.ST_MAKEELLIPSE(ST_POINT(LONGITUDE,LATITUDE),3,3,0,'kilometers',12) as geom
FROM CDA26920_STARBUCKS_CORE_PLACES_SAMPLE.PUBLIC.CORE_POI
```

<div style="text-align:center" >
<img src="/img/sf-analytics-toolbox/examples/sf-enrichment-example-3.png" alt="Store locations and 3km buffers." style="width:90%">
</div>

We can then deepen our analysis by computing the Quadkeys at resolution 15 that intersect with these buffers using the available polyfill function.

```sql
WITH qks AS(
SELECT sfcarto.quadkey.ST_ASQUADINT_POLYFILL(
    sfcarto.constructors.ST_MAKEELLIPSE(ST_POINT(LONGITUDE,LATITUDE),3,3,0,'kilometers',12), 15) AS qk
FROM CDA26920_STARBUCKS_CORE_PLACES_SAMPLE.PUBLIC.CORE_POI
)

SELECT sfcarto.quadkey.ST_BOUNDARY(VALUE) AS geom
FROM qks, lateral FLATTEN(input => qk)
```

<div style="text-align:center" >
<img src="/img/sf-analytics-toolbox/examples/sf-enrichment-example-4.png" alt="Quadkey polyfills of store buffers." style="width:90%">
</div>

Next, we enrich the resulting Quadkeys with the total population and the population by gender using CARTO’s Spatial Features dataset, [available for free in the Snowflake Data Marketplace](https://www.snowflake.com/datasets/carto-spatial-features-usa-quadgrid-15/). Since this dataset is already delivered in Quadkeys at resolution 15, enrichment can be performed by a simple JOIN.

```sql
WITH qks AS(
SELECT sfcarto.quadkey.ST_ASQUADINT_POLYFILL(
    sfcarto.constructors.ST_MAKEELLIPSE(ST_POINT(LONGITUDE,LATITUDE),3,3,0,'kilometers',12), 15) AS qk
FROM CDA26920_STARBUCKS_CORE_PLACES_SAMPLE.PUBLIC.CORE_POI
),
geom_data AS(
SELECT sfcarto.quadkey.QUADKEY_FROMQUADINT(VALUE::BIGINT) AS geoid, sfcarto.quadkey.ST_BOUNDARY(VALUE) AS geom
FROM qks, lateral FLATTEN(input => qk)
GROUP BY VALUE
)
SELECT t1.geom AS geom, population, t2.female, t2.male
FROM geom_data t1
INNER JOIN DATA_MARKETPLACE.CARTO.VIEW_DERIVED_SPATIALFEATURES_USA_QUADGRID15_V1_YEARLY_2020 t2
ON t1.geoid = t2.geoid;
```

By zooming into a particular area we can see the distribution of the total population (where darker colors represent higher population levels).

<div style="text-align:center" >
<img src="/img/sf-analytics-toolbox/examples/sf-enrichment-example-5.png" alt="Enriched polyfill buffers." style="width:90%">
</div>

Once we have this data ready, we can now calculate the total population that is within a 3km radius from each store location. This catchment analysis can be performed from start to finish with the following query:

```sql
WITH qks AS(
SELECT sfcarto.quadkey.ST_ASQUADINT_POLYFILL(
    sfcarto.constructors.ST_MAKEELLIPSE(ST_POINT(LONGITUDE,LATITUDE),3,3,0,'kilometers',12), 15) AS qk, SAFEGRAPH_PLACE_ID as store_id
FROM CDA26920_STARBUCKS_CORE_PLACES_SAMPLE.PUBLIC.CORE_POI
),

flat_qks AS(
SELECT t1.store_id, sfcarto.quadkey.QUADKEY_FROMQUADINT(VALUE::BIGINT) AS geoid
FROM qks t1, lateral FLATTEN(input => qk)
),

enriched_qks AS(
SELECT t1.store_id, t1.geoid, t2.population, t2.female, t2.male
FROM flat_qks t1
INNER JOIN DATA_MARKETPLACE.CARTO.VIEW_DERIVED_SPATIALFEATURES_USA_QUADGRID15_V1_YEARLY_2020 t2
ON t1.geoid = t2.geoid
),

kpis_per_store AS(
SELECT store_id, SUM(population) as tot_pop, SUM(female) as tot_female, sum(male) as tot_male
FROM enriched_qks
GROUP BY store_id
)

SELECT t1.store_id, t1.tot_pop, t1.tot_female, t1.tot_male, ST_POINT(LONGITUDE,LATITUDE) as geom
FROM kpis_per_store t1
INNER JOIN CDA26920_STARBUCKS_CORE_PLACES_SAMPLE.PUBLIC.CORE_POI t2
ON t1.store_id = t2.SAFEGRAPH_PLACE_ID
```

The result is a beautiful map visualization, where each Starbucks location is represented by a point and whose catchment is proportional to the total population within a 3km radius: 

<div style="text-align:center" >
<img src="/img/sf-analytics-toolbox/examples/sf-enrichment-example-result.png" alt="Store characterization by population covered by catchment area." style="width:100%">
</div>