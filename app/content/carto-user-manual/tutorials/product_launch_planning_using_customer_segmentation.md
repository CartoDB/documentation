---
title: "Planning for product launch by shortlisting merchants in high-potential segments"
description: "We identify merchants to launch a healthy beverage product through customer segmentation and filtering based on trade area characteristics."
image: "/img/tutorials/cpg_product_launch_planning.png"
type: tutorials
date: "2022-11-29"
# categories:
#     - hard
#     - segmentation
#     - cpg
---

## Identifying target area for marketing campaign using consumer sentiment data

**Context**

Product launch planning is a key activity for CPG companies. Selecting the best merchants / areas to launch a new product can be decided based on a variety of methods, factors and priorities. In this tutorial we present how segmentation of merchants helps in detecting high potential areas, in which merchants can be filtered further to identify a product launch shortlist. 

We will consider a hypothetical healthy premium beverage, which we believe appeals to a young, high income, healthy audience. We are considering to launch it in the Bay Area. 

In the absence of sales data, how can we identify high potential? We can use geospatial data and analysis to identify where a consumer with such characteristics is more likely to be present. As such, we will create trade areas around merchants, enrich them with relevant data, and segment them using k-means clustering. All methods used form part of the [CPG module of CARTO's Analytics Toolbox for BigQuery](https://docs.carto.com/analytics-toolbox-bigquery/sql-reference/cpg/).

For this analysis we will use samples of data from the following datasets:
* Bay Area Restaurants and cafés from [Safegraph](https://carto.com/spatial-data-catalog/browser/dataset/sg_coreplaces_948d1168/)
* Sociodemographics for Bay Area from [AGS](https://carto.com/spatial-data-catalog/browser/dataset/ags_sociodemogr_7496195f/)
* Consumer Spending for Bay Area from [AGS](https://carto.com/spatial-data-catalog/browser/dataset/ags_consumer_sp_65eb589c/)
* Proximity Data for Bay Area from [Spatial.ai](https://carto.com/spatial-data-catalog/browser/dataset/spa_proximity_d_4af58f15/)

**Steps to reproduce**

1. Go to the <a href="http://app.carto.com/signup" target="_blank">CARTO signup</a> page.
   - Click on *Log in*.
   - Enter your email address and password. You can also log in with your existing Google account by clicking *Continue with Google*.
   - Once you have entered your credentials: click *Continue*.

   ![Log in Email and password](/img/cloud-native-workspace/get-started/login_new.png)

2. From the Navigation Menu in the left panel, select Maps. On the top-right corner, select "New map". This should take you to a new instance of a Builder map:   

    ![Map new map instance](/img/cloud-native-workspace/tutorials/tutorial18_map_cpg_sentiment_new_map.png)

3. Let's first import the restaurants and cafés in Bay Area, which are the relevant subset of merchants we are interested in for our tutorial.  Go to "Add source from...", select "Custom query" and run the query below:

    ```sql
    SELECT * FROM `cartobq.cpg_product_launch_bay_area_map.merchants`
    ```
    Rename the layer as "Restaurants and cafes".

   ![Safegraph dataset](/img/cloud-native-workspace/tutorials/tutorial20_map_cpg_product_launch_merchants.png)

4. We then proceed to create trade areas around each merchant. To achieve this we will use the method [GENERATE_TRADE_AREAS](https://docs.carto.com/analytics-toolbox-bigquery/sql-reference/cpg/#generate_trade_areas) from CARTO's Analytics Toolbox. 

    We will create trade areas for 3 levels of urbanity:
    * 500m buffer for high urbanity areas
    * 5,000m buffer for medium urbanity areas
    * 15,000m buffer for low urbanity areas

    We will consult urbanity from [CARTO's Derived Spatial features dataset](https://carto.com/spatial-data-catalog/browser/dataset/cdb_spatial_fea_94e6b1f/).

    To run this analysis, we need to run the method 3 times (one for each size of trade area), and consolidate the results. 

    We have already created the table, which you can import into the map by creating a new source and running the following query:

    ```sql
    SELECT * FROM `cartobq.cpg_product_launch_bay_area_map.trade_areas`
    ```
    If you have access to a Data Warehouse, you can run the SQL snippets below to create the trade areas and replicate the analysis. 
    
    First we create trade areas for merchants in areas of low urbanity.
    ```sql
    CALL `carto-un`.carto.GENERATE_TRADE_AREAS(
    --customers_query
    '''
    SELECT a.geoid as store_id,  geom,
    FROM `cartobq.cpg_product_launch_bay_area_map.merchants` a
    JOIN `carto-demo-data.demo_tables.derived_spatialfeatures_usa_h3res8_v1_yearly_v2` b on `carto-un`.carto.H3_FROMGEOGPOINT(geom,8)=b.h3
    where closed_on is NULL and b.urbanity in ('remote','rural','Low_density_urban')
    AND CONTAINS_SUBSTR(top_category,'Restaurants and Other Eating Places')
    ''',
    --method
    'buffer',
    --options
    "{'buffer':15000.0}",
    --output_prefix (Remember to change dataset address to your preferred dataset address)
    'carto-dw-ac-dp1glsh.shared.product_launch_bay_area_low_urban'
    );
    ```

    Then to create trade areas for merchants in areas of medium urbanity.
    ```sql
    CALL `carto-un`.carto.GENERATE_TRADE_AREAS(
    --customers_query
    '''
    SELECT a.geoid as store_id,  geom,
    FROM `cartobq.cpg_product_launch_bay_area_map.merchants` a
    JOIN `carto-demo-data.demo_tables.derived_spatialfeatures_usa_h3res8_v1_yearly_v2` b on `carto-un`.carto.H3_FROMGEOGPOINT(geom,8)=b.h3
    where closed_on is NULL and b.urbanity in ('Medium_density_urban')
    AND CONTAINS_SUBSTR(top_category,'Restaurants and Other Eating Places')
    ''',
    --method
    'buffer',
    --options
    "{'buffer':5000.0}",
    --output_prefix (Remember to change dataset address to your preferred dataset address)
    'carto-dw-ac-dp1glsh.shared.product_launch_bay_area_medium_urban'
    );
    ```

    Then create trade areas for merchants in areas of low urbanity.
    ```sql
    CALL `carto-un`.carto.GENERATE_TRADE_AREAS(
    --customers_query
    '''
    SELECT a.geoid as store_id,  geom,
    FROM `cartobq.cpg_product_launch_bay_area_map.merchants` a
    JOIN `carto-demo-data.demo_tables.derived_spatialfeatures_usa_h3res8_v1_yearly_v2` b on `carto-un`.carto.H3_FROMGEOGPOINT(geom,8)=b.h3
    where closed_on is NULL and b.urbanity in ('High_density_urban','Very_High_density_urban')
    AND CONTAINS_SUBSTR(top_category,'Restaurants and Other Eating Places')
    ''',
    --method
    'buffer',
    --options
    "{'buffer':500.0}",
    --output_prefix (Remember to change dataset address to your preferred dataset address)
    'carto-dw-ac-dp1glsh.shared.product_launch_bay_area_high_urban'
    );
    ```

    Finally, let's combine all outputs to create one table of all trade areas. 
    ```sql
    CREATE OR replace table `carto-dw-ac-dp1glsh.shared.product_launch_bay_area_trade_areas` AS
    select * from `carto-dw-ac-dp1glsh.shared.product_launch_bay_area_low_urban`
    UNION ALL
    select * from `carto-dw-ac-dp1glsh.shared.product_launch_bay_area_medium_urban`
    UNION ALL
    select * from `carto-dw-ac-dp1glsh.shared.product_launch_bay_area_high_urban`
    ```

    Import the resulting table into the map by creating a new source and importing the table from the dataset it was created in. 

    Rename the layer as "Merchant trade areas". The map will look a bit messy due to the overlapping trade areas, but it gives a visual illustration of this step of our analysis.

   ![Merchant trade areas](/img/cloud-native-workspace/tutorials/tutorial20_map_cpg_product_launch_merchant_trade_areas.png)

5. Next step is to enrich the trade areas with the variables using which we would like to segment. We have created 3 tables with sample data from the datasets outlined in the Context section. 

    For this analysis we will use the [CUSTOMER_SEGMENTATION_ANALYSIS_DATA](https://docs.carto.com/analytics-toolbox-bigquery/sql-reference/cpg/#customer_segmentation_analysis_data) method from CARTO's Analytics Toolbox. We need to run the method 3 times (once for each dataset used for enrichment). We will use the enriched output of each step as input to the next step.

    We have already created the table, which you can import into the map by creating a new source and running the following query:

    ```sql
    SELECT * FROM `cartobq.cpg_product_launch_bay_area_map.trade_areas_enrich`
    ```

    If you have access to a Data Warehouse, you can run the SQL snippets below to create the trade areas and replicate the analysis. 

    First, let's enrich with consumer spending data, specifically with "food at home" annual spending per household, and "food away from home".
    ```sql
    CALL `carto-un`.carto.CUSTOMER_SEGMENTATION_ANALYSIS_DATA(
    -- Select the trade areas of merchants, can be pre-enriched trade areas
    R'''
    SELECT * EXCEPT(method,input_arguments)
    FROM `cartobq.cpg_product_launch_bay_area_map.trade_areas`
    WHERE st_intersectsbox(geom,-122.531181, 37.812490,-122.283507, 37.511955)
    ''',
    -- Data Observatory enrichment
    NULL,NULL,
 
    -- Custom data enrichment
    [("food_at_home",'avg'),("food_away_from_home",'avg')],
    R'''
    SELECT *
    FROM `cartobq.cpg_product_launch_bay_area_map.consumer_spending`
    ''',
    --output_prefix
    'carto-dw-ac-dp1glsh.shared.product_launch_trade_areas_enriched_consspending'
    );
    ```

    Then, let's enrich with sociodemographics data, specifically with "population", "median age", "median household income", "median income for ages under 24" and "median income for ages 25 to 34".
    ```sql
    CALL `carto-un`.carto.CUSTOMER_SEGMENTATION_ANALYSIS_DATA(
    -- Select the trade areas of merchants, can be pre-enriched trade areas
    R'''
    SELECT *
    FROM `carto-dw-ac-dp1glsh.shared.product_launch_trade_areas_enriched_consspending_enrich`
    ''',
    -- Data Observatory enrichment
    NULL,NULL,
    -- Custom data enrichment
    [("population", 'sum'), ("median_age",'avg'),("median_income_age_under_24",'avg'),("median_income_age_25_34",'avg'),("median_household_income",'avg')],
    R'''
    SELECT *
    FROM `cartobq.cpg_product_launch_bay_area_map.sociodemographics`
    ''',
    --output_prefix
    'carto-dw-ac-dp1glsh.shared.product_launch_trade_areas_enriched_sociodemographics'
    );
    ```

    Finally, let's enrich with proximity social data, specifically with "hipster culture segment", "ingredient attentive segment", "fueling for fitness segment", "fitness obsession segment". For further details regarding the definition of each segment please refer to the [dataset's documentation](https://carto.com/spatial-data-catalog/browser/dataset/spa_proximity_d_4af58f15/).
    ```sql
    CALL `carto-un`.carto.CUSTOMER_SEGMENTATION_ANALYSIS_DATA(
    -- Select the trade areas of merchants, can be pre-enriched trade areas
    R'''
    SELECT *
    FROM `carto-dw-ac-dp1glsh.shared.product_launch_trade_areas_enriched_sociodemographics_enrich`
    ''',
    -- Data Observatory enrichment
    NULL,NULL,
    -- Custom data enrichment
    [("hipster_culture", 'avg'), ("trendy_eats",'avg'),("ingredient_attentive",'avg'),("fueling_for_fitness",'avg'),("fitness_obsession",'avg')],
    R'''
    SELECT *
    FROM `cartobq.cpg_product_launch_bay_area_map.geosocial_segments`
    ''',
    --output_prefix
    'carto-dw-ac-dp1glsh.shared.product_launch_trade_areas_enriched_final'
    );
    ```

    Import the resulting table into the map by creating a new source and importing the table from the dataset it was created in. 

    Rename the layer as "Merchant trade areas enriched". You can start exploring the trade areas by creating widgets to filter by values. 

   ![Merchant trade areas enriched](/img/cloud-native-workspace/tutorials/tutorial20_map_cpg_product_launch_merchant_trade_areas_enriched.png)

6.  The last analysis will have created 3 output tables:
    * <output_prefix>_enrich: Trade areas enriched with variables
    * <output_prefix>_correlation: Correlation table of variables included in analysis
    * <output_prefix>_descriptives: Statistical descriptives of the variables included in the analysis

    For more details regarding the output tables refer [here](https://docs.carto.com/analytics-toolbox-bigquery/sql-reference/cpg/#customer_segmentation_analysis_data). 

7.  Let's explore the correlation between the variables. We have created a table using the table found in "cartobq.cpg_product_launch_bay_area_map.trade_areas_correlation":

    ![Variable correlation](/img/cloud-native-workspace/tutorials/tutorial20_map_cpg_product_launch_variable_correlation.png)

    "Food away from home" and "food at home" are fully correlated, which means we should keep only one of those for the next steps of our analysis.

    "Median household income" and "median income for 25-34" are highly correlated, which makes sense, as ages 25-34 form a strong part of the workforce. We will use only "median income for 25-34" in our analysis going forward.

    Finally, "trendy eats" and "hipster culture" are also highly correlated; we can use only "trendy eats" for our analysis going forward.

8. Let's refine the latest table to reflect the findings above. Go to "Add source from...", select "Custom query" and run the query below:

    ```sql
    SELECT * EXCEPT (hipster_culture_avg, median_household_income_avg, food_at_home_avg)
    FROM  `carto-dw-ac-dp1glsh.shared.product_launch_trade_areas_enriched_final_enrich`
    ```
    Rename the layer "Trade areas enriched". At this point you can keep this layer, and the "Restaurants and cafes" layer we created earlier. Delete the rest. 

9. Next step, let's segment the trade areas enriched with all relevant variables. We will use the [RUN_CUSTOMER_SEGMENTATION](https://docs.carto.com/analytics-toolbox-bigquery/sql-reference/cpg/#run_customer_segmentation) method from CARTO's Analytics Toolbox.

    Go to "Add source from...", select "Custom query" and run the query below:

    ```sql
    CALL `carto-un`.carto.RUN_CUSTOMER_SEGMENTATION(
    --select the source table of merchants enriched with geospatial characteristics
    'carto-dw-ac-dp1glsh.shared.product_launch_trade_areas_enriched_final_enrich',
    
    --select the number of clusters to be identified (five analyses to identify 4, 5, 6, 7 and 8 clusters respectively)
    [4, 5, 6, 7, 8],

    --PCA explainability ratio
    0.9,

    --output prefix
    'carto-dw-ac-dp1glsh.shared.product_launch_bay_area_results'
    );
    ```

    As you see, we run a clustering analysis for 5 combinations of numbers of clusters. We will compare the output statistics of each analysis and choose the best combination for our analysis. 

10. Let's explore the output. The latest method creates four tables:
    * <output_prefix>_clusters: The segment number each merchant belongs to 
    * <output_prefix>_clusters_descr: Descriptive statistics for each variable included in the analysis, for each segment
    * <output_prefix>_clusters_stats: Output analysis statistics, related to the quality of each clustering analysis
    * <output_prefix>_pca_data: PCA analysis data

    If we look at the cluster_stats table, we can identify the analysis with the best quality output (based on Davies Bouldin index and Mean Squared Distance). 

    | num_clusters| davies_bouldin_index | mean_squared_distance |
    | ----------- | ----------- | ----------- |
    | 4      | 1.391716469 | 4.676854126 |
    | 5      | 1.60587001 | 4.348304334 |
    | 6      | 1.338738228 | 3.674701341 |
    | 7      | 1.315496174 | 3.494503331 |
    | 8      | 1.383514319 | 3.140280454 |

    If we observe the values, we can see that the analysis quality is best for 7 segments and 8 segments (lowest numbers of Davies Bouldin index and Mean Squared Distance). Let's use the combination of 7 segments for the rest of the tutorial. 

11. As this was the last step in the analysis, we will now bring everything together and visualize the result on the map. Go to "Add source from...", select "Custom query" and run the query below:

    ```sql
    SELECT merchants.*, enrich.* EXCEPT (store_id,geom), CONCAT("segment ", segments.cluster_7) AS segment
    FROM `cartobq.cpg_product_launch_bay_area_map.merchants` merchants
    INNER JOIN `carto-dw-ac-dp1glsh.shared.product_launch_trade_areas_enriched_final_enrich` enrich
    ON merchants.geoid = enrich.store_id
    INNER JOIN `carto-dw-ac-dp1glsh.shared.product_launch_bay_area_results_clusters` segments
    ON merchants.geoid = segments.store_id
    ```

    We have already created the table, which you can import into the map by creating a new source and running the following query:

    ```sql
    SELECT * FROM `cartobq.cpg_product_launch_bay_area_map.segmented_merchants`
    ```

    Rename the layer "Segmented merchants". Style according to the image below:

    ![Segmented merchants](/img/cloud-native-workspace/tutorials/tutorial20_map_cpg_product_launch_segmented_merchants.png)

12. Create a widget to filter the merchants. Let's create a category widget. Go to the widgets tab, and select layer "Segmented merchants". Create a widget according to the configuration seen below:

    ![Merchants by segment widget](/img/cloud-native-workspace/tutorials/tutorial20_map_cpg_product_launch_merchants_by_segment_widget.png)

13. Also create a tooltip for the Segmented Merchants layer. Navigate to the tooltip tab, and enable tooltips for the "Segmented Merchants" layer. Create tooltips when the user hovers over the points, according to the config below:

    ![Merchants segment tooltip](/img/cloud-native-workspace/tutorials/tutorial20_map_cpg_product_launch_merchant_segment_tooltip.png)

14. Let's explore the characteristics of the segments. We have created a table that helps do that, based on the content of table "cluster descriptives".

    ![Segment characteristics](/img/cloud-native-workspace/tutorials/tutorial20_map_cpg_product_launch_segment_characteristics.png)

    You will observe that Segments 2, 5 and 7 seem to have the better combination of high presence of target behavioral segments, higher income levels and higher population (in the case of segment 5). The population level of segments 2 and 7 is lower probably due to the smaller trade areas. 

    Selecting these segments on the map we can see we have areas in San Francisco city, as well as the Silicon Valley. This gives a good representation of both urban and suburban areas.

    ![Selected segments](/img/cloud-native-workspace/tutorials/tutorial20_map_cpg_product_launch_selected_segments.png)

15. So we now have an understanding of which segments can be attractive to launch our product. But, if we want to take our analysis a step further, which merchants within those segments should we prioritize?

    To assess that, we can create a set of widgets, which will allow us to filter merchants by their trade area characteristics.

    Let's create a histogram filter for the "Food Away From Home spend", one for "Median income for ages 25-34", one for "Ingredient Attentive segment", one for the "Fitness Obsession segment". Go to widgets, and select layer "Segmented merchants". Create each widget according to the configuration seen below.

    ![Widgets](/img/cloud-native-workspace/tutorials/tutorial20_map_cpg_product_launch_widgets.png)

    List of all widgets:
    ![All widgets](/img/cloud-native-workspace/tutorials/tutorial20_map_cpg_product_launch_all_widgets.png)

16. Navigate to basemaps and change the basemap to CARTO Dark matter. 

    ![Dark Matter](/img/cloud-native-workspace/tutorials/tutorial20_map_cpg_product_launch_dark_matter.png)

17. Let's now filter to shortlist merchants:
    * Segments: 2, 5, 7
    * Food away from home: >8k 
    * Median income age 25-34: >150k
    * Ingredient attentive segment: >50
    * Fitness obsession segment: >53

    ![Filtered merchants](/img/cloud-native-workspace/tutorials/tutorial20_map_cpg_product_launch_filtered_merchants.png)

    As you will observe, we have started from 6700 merchants, and post our analysis we have shortlisted 320 merchants to investigate further. This data-driven approach can result to a very targeted product launch network, saving significant costs in on-site research. 

18. Finally, let's create a tooltip for each merchant. This will allow the user to explore in detail any merchants of interest. 

    Navigate to the tooltip tab, and enable tooltips for the "Segmented merchants" layer. Include the following details when a user hovers over a point:

    * Segment
    * Location name
    * Category
    * Food away from home spend
    * Median income ages 25 to 34
    * Ingredient attentive segment
    * Fitness obsession segment 

    ![Filtered merchants](/img/cloud-native-workspace/tutorials/tutorial20_map_cpg_product_launch_filtered_merchants_tooltip.png)

19. (Optional) Another interesting use case which can be enabled by the HTML tooltip configurator is embedding Google Street view along with the rest of the tooltip information. Paste the code below:

    ```html
    <div class="CDB-Popup">
    <dl>
        <div>
            <dt>Segment</dt>
            <dd>{{segment}}</dd>
        </div>
        <div>
        <dt>Name</dt>
            <dd>{{location_name}}</dd>
        </div>
        <div>
            <dt>Category</dt>
            <dd>{{sub_category}}</dd>
        </div>
        <div>
            <dt>Food away from home</dt>
            <dd>{{food_away_from_home_avg}}</dd>
        </div>
        <div>
            <dt>Median income ages 25 to 34</dt>
            <dd>{{median_income_age_25_34_avg}}</dd>
        </div>
        <div>
            <dt>Ingredient attentive segment</dt>
            <dd>{{ingredient_attentive_avg}}</dd>
        </div>
        <div>
            <dt>Fitness obsessive segment</dt>
            <dd>{{fitness_obsession_avg}}</dd>
        </div>
        <div>
            <dt>Street view</dt>
            <img height="200" src="https://maps.googleapis.com/maps/api/streetview?size=400x400&amp;location={{latitude}},{{longitude}}&amp;fov=90&amp;heading=70&amp;pitch=0&amp;key=yourKey&amp;">
        </div>
    </dl>
    </div>
    ```

    Remember to replace your API key to enable this service. For more information on how to do this, please follow the following [tutorial](https://carto.com/blog/google-street-view-pop-ups-with-carto/).

    ![Street view tooltip](/img/cloud-native-workspace/tutorials/tutorial20_map_cpg_product_launch_filtered_merchants_tooltip_streetview.png)

13. Change the name of the map to "Product launch planning based on customer segmentation"

14. Finally we can make the map public and share the link to anybody in the organization. For that you should go to “Share” on the top right corner and set the map as Public. For more details, see [Publishing and sharing maps](../../maps/publishing-and-sharing-maps).

    ![Map public map](/img/cloud-native-workspace/tutorials/tutorial20_map_cpg_product_launch_public_sharelink.png)

15. Finally, we can visualize the result.

    <iframe width="800px" height="800px" src="https://clausa.app.carto.com/map/0d814402-7c76-46f3-b73b-b40feb344e36"></iframe>



