---
title: "Territory planning for a personal care product"
description: "We divide the Chicago metropolitan area into territories and report on their Total Addressable Market for a personal care product."
image: "/img/tutorials/cpg_territory_planning.png"
type: tutorials
date: "2022-11-25"
# categories:
#     - medium
#     - h3
#     - spatial indexes
#     - clustering
#     - cpg
---

## Territory planning for a personal care product, based on a Total Addressable Market estimation

**Context**

A common analysis that CPG companies undertake when managing their sales efforts is territory planning. This entails the division of a greater area into territories, assigning sales resources to each territory. This division can often be performed based on an underlying characteristic. For example, the Total Addressable Market (TAM from now on) of each territory can act as the basis for the division of the area, as it would divide the potential fairly.

In this tutorial we will perform territory planning for a hypothetical personal care product for men. We divide Pharmacy and supermarket locations in the area of Chicago into territories using [k-means clustering](https://docs.carto.com/analytics-toolbox-bigquery/sql-reference/clustering/#st_clusterkmeans). We then use geospatial data to estimate the TAM of each territory. A similar approach can be followed to understand the TAM of a set of locations pre-allocated into territories. This approach can be used iteratively to balance territories based on TAM.

The geospatial data we use to estimate the TAM are samples from the following datasets:
* [AGS - Consumer Spending](https://carto.com/spatial-data-catalog/browser/dataset/ags_consumer_sp_65eb589c/)
* [AGS - Sociodemographics](https://carto.com/spatial-data-catalog/browser/dataset/ags_sociodemogr_7496195f/)

**Steps to reproduce**

1. Go to the <a href="http://app.carto.com/signup" target="_blank">CARTO signup</a> page.
   - Click on *Log in*.
   - Enter your email address and password. You can also log in with your existing Google account by clicking *Continue with Google*.
   - Once you have entered your credentials: click *Continue*.

   ![Log in Email and password](/img/cloud-native-workspace/get-started/login_new.png)

2. From the Navigation Menu in the left panel, select Maps. On the top-right corner, select "New map". This should take you to a new instance of a Builder map:

    ![Map new map instance](/img/cloud-native-workspace/tutorials/tutorial18_map_cpg_sentiment_new_map.png)

3. Let's first create an H3 layer which we will use to calculate the TAM of the area. We limit the H3 layer using the Chicago boundary we have already defined for you

    Go to "Add source from...", select "Custom query" and run the query below:

    ```sql
    WITH polygon as (SELECT `carto-un`.carto.H3_POLYFILL(geom,8) as h3s FROM `cartobq.cpg_territory_planning_map.chicago_boundary` as countries_boundaries)

    SELECT h3 as geoid, `carto-un`.carto.H3_BOUNDARY(h3) as geom FROM polygon, polygon.h3s AS h3
    ```

   ![H3 layer](/img/cloud-native-workspace/tutorials/tutorial19_map_territory_planning_h3_layer.png)

4.  Save the new source as a new table, by clicking on "Create table from query" in the SQL editor. Save in the CARTO Data Warehouse, under the folder "organization data", "shared". Name as "chicago_h3_layer".

    When the operation is finished, rename the source and layer to "Chicago H3 layer".

    We have also saved it in the address "cartobq.cpg_territory_planning_map.chicago_h3_layer", so you can also select using a custom query.

    Delete all previous sources, leave only "Chicago H3 layer".

   ![Chicago H3 layer](/img/cloud-native-workspace/tutorials/tutorial19_map_territory_planning_chicago_h3_layer.png)

5.  We will now enrich the H3 layer with Consumer Spending and Sociodemographic data, as described in the Context section. We will use the following data from the two datasets:

    * Sociodemographics: Ages 30-34 (AGECY3034), Ages 35-39 (AGECY3539), Ages 40-44 (AGECY4044), Ages 45-49 (AGECY4549), Average household size (HHDCYAVESZ)
    * Consumer spending: Personal care spend, annual per household (XCYPC3), Number of households (HHDCY7)

    We have a table with the data located at "cartobq.cpg_territory_planning_map.ags_demographic_spending_chicago"

    To perform this enrichment we use the [ENRICH_GRID](https://docs.carto.com/analytics-toolbox-bigquery/sql-reference/data/#enrich_grid). run this query in the Data Warehouse.

    ```sql
    CALL `carto-un`.carto.ENRICH_GRID(
    'h3',
    'cartobq.cpg_territory_planning_map.chicago_h3_layer',
    'geoid',
    R'''
    SELECT * EXCEPT (geoid) FROM `cartobq.cpg_territory_planning_map.ags_demographic_spending_chicago`
    ''',
    'geom',
    [('age_30_34', 'sum'), ('age_35_39', 'sum') , ('age_40_44', 'sum'), ('age_45_49', 'sum'), ('average_household_size', 'avg') , ('personal_care_products_spending', 'avg'), ('households', 'sum')],
    ['cartobq.cpg_territory_planning_map.chicago_h3_enriched']
    );
    ```

    Remember to change the table target location to any location you have access to.

    As we have already created the resulting table, let's load using a custom query

    ```sql
    SELECT * FROM `cartobq.cpg_territory_planning_map.chicago_h3_enriched`
    ```

    Rename this layer "Chicago H3 enriched", and delete the source "Chicago H3 layer"


    ![Chicago H3 enriched](/img/cloud-native-workspace/tutorials/tutorial19_map_territory_planning_chicago_h3_enriched.png)

6. Let's now estimate the TAM for each H3 cell, based on the variables we enrched the layer with in the previous step. Run a custom query by pasting the snippet below:

    ```sql
    SELECT
    geoid,
    geom,
    households_sum as households,
    average_household_size_avg as avg_household_size,
    personal_care_products_spending_avg as personal_care_spending,
    age_30_34_sum + age_35_39_sum + age_40_44_sum + age_45_49_sum as population_30_49,
    (households_sum * personal_care_products_spending_avg)*((age_30_34_sum + age_35_39_sum + age_40_44_sum + age_45_49_sum)/2)/(average_household_size_avg * households_sum) as total_addressable_market
    FROM `cartobq.cpg_territory_planning_map.chicago_h3_enriched`
    WHERE average_household_size_avg <> 0 AND households_sum <> 0
    ```
    The TAM estimation formula calculates the total market spend for personal care products (households_sum * personal_care_products_spending_avg), and multiplies with the fraction representing men between the ages of 30-50 as part of the entire population (assuming this is the target consumer).

7. Save the new source as a new table, by clicking on "Create table from query" in the SQL editor. Save in the CARTO Data Warehouse, under the folder "organization data", "shared". Name as "chicago_h3_enriched_tam".

    When the operation is finished, rename the source and layer to "Personal care product TAM".

    We have also saved it in the address "cartobq.cpg_territory_planning_map.chicago_h3_enriched_tam", so you can also select using a custom query.

    Delete all previous sources, leave only "Personal care product TAM".

   ![Personal care product TAM](/img/cloud-native-workspace/tutorials/tutorial19_map_territory_planning_personal_care_product_tam.png)

8. Style the layer as seen in the configuration below:

    ![Personal care product TAM styled](/img/cloud-native-workspace/tutorials/tutorial19_map_territory_planning_personal_care_product_tam_styled.png)

    We can see that, as expected the TAM is stronger in the city of Chicago, but also in areas located in the north of the city.

9. Let's now import the all personal care and supermarket stores present in Chicago. We have obtained this sample from [Safegraph](https://carto.com/spatial-data-catalog/browser/dataset/sg_coreplaces_948d1168/), and filtered for "Health and Personal Care Stores" and "Grocery Stores", i.e., where personal care products could be purchased.

    We have made this sample available under "demo data", "demo tables", with the name "safegraph_personal_care_and_supermarkets_chicago_cpg".

    Rename the layer as "Personal care product merchants".

    ![Personal care product merchants](/img/cloud-native-workspace/tutorials/tutorial19_map_territory_planning_personal_care_product_merchants.png)

10. The next step is to assign a TAM to each merchant, so that we can then cluster all merchants and aggregate the TAM for each cluster.

    To assign a TAM to each merchant, we will divide the TAM of each H3 cell to the merchants included in the cell.

    Begin by intersecting and aggregating the "Personal care product TAM" layer and the "Personal care product merchants" layer, the aggregate should be the count of merchants in each cell. Go to "More Options" of the "Personal care product TAM" layer and select "Add SQL analysis". Select "Intersect and Aggregate" and configure as seen below.

    ![TAM merchant count](/img/cloud-native-workspace/tutorials/tutorial19_map_territory_planning_tam_merchant_count.png)

    Run the SQL analysis and rename the layer as "TAM with merchant count".

    ![TAM merchant count layer](/img/cloud-native-workspace/tutorials/tutorial19_map_territory_planning_tam_merchant_count_layer.png)

11. Next step, to allocate a TAM to each merchant. Intersect and aggregate the "TAM with merchant count" layer with the "Personal care product merchants" layer, assigning a TAM for each merchant (TAM of the cell divided by the number of merchants in the cell, which we calculated in the previous step).

    Go to "More Options" of the "Personal care product merchants" layer and select "Add SQL analysis". Select "Intersect and Aggregate" and configure as seen below.

    ![Merchants with tam allocated preview](/img/cloud-native-workspace/tutorials/tutorial19_map_territory_planning_merchants_with_tam_allocated_preview.png)

    Ensure you select "Preview SQL analysis query". This will open the SQL editor for this query.

12. In the generated query, replace the following line:

    ```sql
    max(second.total_addressable_market) as max_total_addressable_market
    ```

    with this line:

    ```sql
    (max(second.total_addressable_market)/max(second.count)) as allocated_addressable_market
    ```

    Run the query. Rename the layer as "Merchants with allocated addressable market". Delete the sources "TAM with merchant count" and "Personal care product merchants".

    ![Merchants with tam allocated layer](/img/cloud-native-workspace/tutorials/tutorial19_map_territory_planning_merchants_with_tam_allocated_layer.png)


13. Next step, let's cluster the merchants and create boundaries around them. Run a custom SQL query. In the SQL editor, paste and run the code below.

    ```sql
    WITH __q1 AS (
  	    SELECT * FROM `carto-demo-data.demo_tables.safegraph_personal_care_and_supermarkets_chicago_cpg`
    ),
    __q2 AS (
	    WITH clustering AS (
		    SELECT `carto-un`.carto.ST_CLUSTERKMEANS(ARRAY_AGG(geom), 6) as result
		    FROM __q1
		    WHERE geom IS NOT NULL
	    )
        SELECT result.cluster as cluster, result.geom as geom FROM clustering, unnest(result) as result
    )

    SELECT * EXCEPT(geom),`carto-un`.carto.ST_CONCAVEHULL(ARRAY_AGG(geom),NULL,NULL) as geom FROM __q2 GROUP BY cluster
    ```
    In this query we use the method [ST_CLUSTERKMEANS](https://docs.carto.com/analytics-toolbox-bigquery/sql-reference/clustering/#st_clusterkmeans) to cluster the merchants into 6 groups, while we use [ST_CONCAVEHULL](https://docs.carto.com/analytics-toolbox-bigquery/sql-reference/transformations/#st_concavehull) to create the boundaries around the clusters.

14. Save the new source as a new table, by clicking on "Create table from query" in the SQL editor. Save in the CARTO Data Warehouse, under the folder "organization data", "shared". Name as "territory_boundaries".

    When the operation is finished, rename the source and layer to "Territory boundaries".

    We have also saved it in the address "cartobq.cpg_territory_planning_map.territory_boundaries", so you can also select using a custom query.

    Delete the source of the previous step, leave only "Territory boundaries".

    ![Territory boundaries](/img/cloud-native-workspace/tutorials/tutorial19_map_territory_planning_territory_boundaries.png)

15. Let's now intersect the boundaries with the merchants, so that we can assign each merchant the territory it belongs to.

    Go to "More Options" of the "Merchants with allocated addressable market" layer and select "Add SQL analysis". Select "Intersect and Aggregate" and configure as seen below.

    ![Merchants with territory allocated](/img/cloud-native-workspace/tutorials/tutorial19_map_territory_planning_merchants_with_territory_allocated.png)

15. Run the analysis. Rename the new layer as "Merchants with allocated addressable market and territory". Delete the source "Merchants with allocated addressable market".

    Style the layer as seen below:

    ![Merchants styling](/img/cloud-native-workspace/tutorials/tutorial19_map_territory_planning_merchants_styling.png)

16. Let's also create a tooltip for the layer. Configure as seen below:

    ![Merchants tooltip](/img/cloud-native-workspace/tutorials/tutorial19_map_territory_planning_merchants_tooltip.png)

17. Finally, let's calculate the centroids of merchants within each territory, and aggregate the addressable market of each merchant.

    Go to "More Options" of the "Merchants with allocated addressable market and territory" layer and select "Add SQL analysis". Select "Compute centroids" and configure as seen below.

    ![Territory centre](/img/cloud-native-workspace/tutorials/tutorial19_map_territory_planning_centroids.png)

18. Run the analysis. Rename the new layer as "Territory centre".

    Style the layer as seen below, making sure the radius depends on the addressable market:

    ![Territory centre layer](/img/cloud-native-workspace/tutorials/tutorial19_map_territory_planning_centroids_layer.png)

19. Let's also create a tooltip for the layer. Configure as seen below:

    ![Territory centre tooltip](/img/cloud-native-workspace/tutorials/tutorial19_map_territory_planning_centroids_tooltip.png)

20. Hide the layer "Personal care product TAM" and change the basemap to CARTO Dark matter.

    ![Dark matter](/img/cloud-native-workspace/tutorials/tutorial19_map_territory_planning_dark_matter.png)

21. Let's create a couple of widgets to more easily be able to explore the map. First let's create a widget to filter merchants by sub-category, and a widget to filter by allocated addressable market (note: the filtering action will not update the summation represented by the territory centres)

    Go to the widgets tab and create a widget for "Merchants by category", using the "Merchants with allocated addressable market and territory" source. Configure as below:

    ![Category widget](/img/cloud-native-workspace/tutorials/tutorial19_map_territory_planning_category_widget.png)

    Create another widget using the same source. Configure as below:

    ![Addressable market widget](/img/cloud-native-workspace/tutorials/tutorial19_map_territory_planning_addressable_market_widget.png)

22. We are done! We can see that Territories closest to the city centre (territories 0 and 3 in our case) have the largest addressable market, as expected, with territories of 20 and 26 million USD. The territories outside the city centre have addressable markets ranging from 2 to 5 million USD. What we would do as a next setp of the analysis is divide the two territories with the largest addressable markets (territories 0 and 3) to 4 to 5 sub-territories, to balance the value as much as possible. In this way we could create territories with similar values, and based on our sales resources, divide or consolidate further.

13. Change the name of the map to "Territory planning for personal care product"

14. Finally we can make the map public and share the link to anybody in the organization. For that you should go to “Share” on the top right corner and set the map as Public. For more details, see [Publishing and sharing maps](../../maps/publishing-and-sharing-maps).

    ![Map public map](/img/cloud-native-workspace/tutorials/tutorial19_map_territory_planning_public_sharelink.png)

15. Finally, we can visualize the result.

    <iframe width="800px" height="800px" src="https://clausa.app.carto.com/map/9f5c4e83-7d56-4fbf-a7c5-8b3edbbfd008"></iframe>
