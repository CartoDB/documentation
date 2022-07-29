---
title: "Selecting out-of-home panels using geosegmentation"
description: "In this tutorial we explore the best locations to place panels for Starbucks advertisements, using geosegmentation and spatial indexes."
image: "/img/tutorials/pizza-hut-location-in-honolulu.png"
type: tutorials
date: "2022-07-25"
# categories:
#     - hard
#     - h3
#     - segmentation
#     - spatial indexes    
#     - ooh advertising
---

## Selecting out-of-home panels using geosegmentation

**Context**

A common use case of Out-of-home advertising is goesegmentation. Geosegmentation helps in identifying where target audiences live in or commute through, and in association where panels should be located. This is particularly useful if the goal of the advertising campaign is not necessarily to direct traffic to nearby locations, but rather to maximize the population the panel appeals to. 

In this example, we will use spciodemographic and income data to perform geosegmentation to identify where a theoretical target audience for Starbucks is located in New York. We will construct a spatial index score for the panels using the geosegmentation criteria, so that we prioritize panels based on their score.

**Steps to reproduce**

1. Go to the <a href="http://app.carto.com/signup" target="_blank">CARTO signup</a> page.
   - Click on *Log in*.
   - Enter your email address and password. You can also log in with your existing Google account by clicking *Continue with Google*.
   - Once you have entered your credentials: click *Continue*.

   ![Log in Email and password](/img/cloud-native-workspace/get-started/login.png)

2. Firstly, we need to subscribe to a dataset where we will be able to find sociodemographic and income data. A dataset with this information which is free to subscribe to is the "Sociodemographics" dataset from the American Community Survey. Navigate to the Data Observatory within CARTO and search for "Sociodemographics - United States of America (Census Block Group, 2018, 5yrs)". 

    ![Map new dataset](/img/cloud-native-workspace/tutorials/tutorial17_map_ooh_geosegmentation_new_dataset.png)

3. Subscribe to the dataset. After the subscription is finished you should be able to see the following screen in your Data Explorer, in the Data Observatory section.

    ![Map new dataset subscription](/img/cloud-native-workspace/tutorials/tutorial17_map_ooh_geosegmentation_dataset_subscription.png)

    Navigate to the "Data" tab and explore the dataset. You will see we have variable for age bands and for median income

    ![Map dataset variables](/img/cloud-native-workspace/tutorials/tutorial17_map_ooh_geosegmentation_dataset_variables.png)

4. We should also subscribe to the dataset with geographic boundaries from CARTO, for the year 2018. Navigate to the Data Observatory and search for "County - United States of America (2018)". Subscribe to the dataset as done in the prior steps. 

    ![Map geographic boundaries](/img/cloud-native-workspace/tutorials/tutorial17_map_ooh_geosegmentation_geographic_boundaries.png)

    You can find the location of the dataset by clicking on "Access in" in the top-right of the view, and copy the location of the Geography table.

5. Now let´s start creating the map. From the Navigation Menu in the left panel, select Maps. On the top-right corner, select "New map". This should take you to a new instance of a Builder map:   

    ![Map new map instance](/img/cloud-native-workspace/tutorials/tutorial13_map_new_map_instance.png)

6. We will define the overall Area of study and divide into hexagons by running an SQL query. Select the "Add source from..." at the bottom left of the page. Select the tab named "Custom Query (SQL)", and click on the "CARTO Data Warehouse" connection: 

   ![Map select new source custom query](/img/cloud-native-workspace/tutorials/tutorial17_map_custom_query.png)

7. We will write a custom SQL query, therefore select the "Type your own query" option and click on "Add source" on the bottom right. This should open the SQL Editor:

   ![Map new map sql editor](/img/cloud-native-workspace/tutorials/tutorial13_map_new_sql_editor.png)

8. We define the study area and create h3 layer and save the h3 layer as a new table for the study area. For this project, we’re using the greater NYC area as our study area. To define that area we need to select the four polygons representing Brooklyn, Queens, Manhattan and the Bronx, and merge them together.
    ```sql
    -- define study area
    WITH study_area AS (
        SELECT ST_UNION_AGG(geom) AS geom 
        FROM `carto-data.ac_dp1glsh.sub_carto_geography_usa_county_2018`
        WHERE geoid = '36047' or geoid = '36081' or geoid = '36005' or geoid = '36061'
    )
    -- make h3 geometry layer
    SELECT
    h3,
    `carto-un`.carto.H3_BOUNDARY(h3) AS geom
    from study_area, unnest(
        `carto-un`.carto.H3_POLYFILL(study_area.geom,9) 
    ) as h3
    ```

    Remember to replace the location of the county shapefile with the one related to your org.

   ![Map area of study](/img/cloud-native-workspace/tutorials/tutorial17_map_ooh_geosegmentation_area_of_study.png)

   Then, save the resulting source as a separate table. Navigate to the bottom-right of the SQL editor, select "Create table from query". Select the CARTO Data Warehouse connection, and save the new table under "organization data", "shared". Name the table as "ooh_geosegmentation_h3_area_of_study". You can also use your own connection.

   ![Map save H3 area of study](/img/cloud-native-workspace/tutorials/tutorial17_map_ooh_geosegmentation_area_of_study_table.png)

   A new source and layer will now be created. Please delete the previous source. 

9. Now let´s enrich the H3 area of study. Go to the Data Explorer, CARTO Data Warehouse connection, and open the last table where it has been saved. On the top right click on "Enrich table". Read the introduction guide and click Continue, you should now see this screen

   ![Map enrichment begin](/img/cloud-native-workspace/tutorials/tutorial17_map_ooh_geosegmentation_enrich_ready.png)

10. In the first step, select the subscription of Sociodemographics for the United States of America from the American Community Survey. Click continue

    Let´s enrich with columns which we can use to construct our audience, in this case. This would be women between the ages of 18 to 40, with an income above $70k. To construct this audience we need to select the following variables. Sum the age fields and average the income field.
    
    ```sql
    -- Enrich the following fields
    female_18_to_19	
    female_20	
    female_21	
    female_22_to_24	
    female_25_to_29	
    female_30_to_34	
    female_35_to_39
    median_income
    ```
    ![Map enrichment select variables](/img/cloud-native-workspace/tutorials/tutorial17_map_ooh_geosegmentation_enrich_select_variables.png)

    In the final step of enrichment, select "Enrich current table". 

11. Now go back to the map, click on the 3 dots on the right hand side of the latest source we created. Select "Show data table". Observe that the table is now enriched with the columns from the sociodemographics table. 

    ![Map enrichment full table](/img/cloud-native-workspace/tutorials/tutorial17_map_ooh_geosegmentation_enrich_full_table.png)

12. Now we can build some custom variables in our new table. Let´s first consolidate all age values per H3 into a single variable, and subsequently normalize it. As before, we will write a custom query. Select the "Add source from..." at the bottom left of the page. Select the tab named "Custom Query (SQL)", and click on the "CARTO Data Warehouse" connection. Insert the query below:

    ```sql
    WITH pop_stats AS (
	    SELECT
	    *, female_18_to_19_6d791436_sum + female_20_f727dc_sum + female_21_77f0174a_sum + female_22_to_24_121a63e5_sum + female_25_to_29_a90c21d6_sum + female_30_to_34_50344313_sum + female_35_to_39_7cbd1009_sum AS female_18_40_pop, 
	    FROM 
	    `carto-dw-ac-dp1glsh.shared.ooh_geosegmentation_h3_area_of_study`
    ),

    pop_stats_norm AS (
        SELECT *, ML.MIN_MAX_SCALER(female_18_40_pop) OVER() AS female_18_40_norm FROM pop_stats
        WHERE geom IS NOT NULL
    )

    SELECT * FROM pop_stats_norm
    ```

    Remember to replace the location of the dataset with the one related to your org.

    Style the resulting layer as seen below. As we can see, population of women between 18 and 40 is high in most parts of Ney York metropolitan area, slightly higher in Manhattan East, while as we move away from Kings and Queens population drops.

    ![Map new variable consolidated age stats](/img/cloud-native-workspace/tutorials/tutorial17_map_ooh_geosegmentation_new_variable_age.png)

13. Let´s now add variables to represent geographies where the median annual income is above $70,000, and subsequently normalize it. As before, we will write a custom query, but we will run this in the same layer as before, on other words we will perform further analysis on the same layer. Replace the previous query with the query below:

    ```sql
    WITH pop_stats AS (
	    SELECT
	    *, female_18_to_19_6d791436_sum + female_20_f727dc_sum + female_21_77f0174a_sum + female_22_to_24_121a63e5_sum + female_25_to_29_a90c21d6_sum + female_30_to_34_50344313_sum + female_35_to_39_7cbd1009_sum AS female_18_40_pop, 
	    FROM 
	    `carto-dw-ac-dp1glsh.shared.ooh_geosegmentation_h3_area_of_study`
    ),

    pop_stats_norm AS (
        SELECT *, ML.MIN_MAX_SCALER(female_18_40_pop) OVER() AS female_18_40_norm FROM pop_stats
        WHERE geom IS NOT NULL
    ), 

    -- Since we're only interested in incomes over 70000, doing this is a form of normalization
    -- to remove positive impact of incomes <70000 on the final index score 
    income AS (
	    SELECT *, CASE
  		    WHEN median_income_6eb619a2_avg <70000 THEN 0
  		    WHEN median_income_6eb619a2_avg >= 70000 THEN median_income_6eb619a2_avg-70000
  		    END AS income_fixed
	    FROM pop_stats_norm
	    WHERE geom IS NOT NULL AND median_income_6eb619a2_avg IS NOT NULL
    ),

    normed_income AS (
        SELECT *, ML.MIN_MAX_SCALER(income_fixed) OVER() AS income_norm FROM income
        WHERE geom IS NOT NULL
    )

    SELECT * FROM normed_income
    ```

    Style the resulting layer as seen below. As we can see, income is higher in lower Manhattan and Brooklyn.

    ![Map new variable income stats](/img/cloud-native-workspace/tutorials/tutorial17_map_ooh_geosegmentation_new_variable_income.png)

14. Finally, let´s create an index score to represent both income and audience population levels within our geography. We will use the normalized values for both population and income level, and we will combine both in a single score by allocating the population value double the weight to the income value. We will once again normalize the resulting score. 

    As before, we will write a custom query, adding to the previous analysis. Replace the previous query with the query below:

    ```sql
    WITH pop_stats AS (
	    SELECT
	    *, female_18_to_19_6d791436_sum + female_20_f727dc_sum + female_21_77f0174a_sum + female_22_to_24_121a63e5_sum + female_25_to_29_a90c21d6_sum + female_30_to_34_50344313_sum + female_35_to_39_7cbd1009_sum AS female_18_40_pop, 
	    FROM 
	    `carto-dw-ac-dp1glsh.shared.ooh_geosegmentation_h3_area_of_study`
    ),

    pop_stats_norm AS (
        SELECT *, ML.MIN_MAX_SCALER(female_18_40_pop) OVER() AS female_18_40_norm FROM pop_stats
        WHERE geom IS NOT NULL
    ), 

    -- Since we're only interested in incomes over 70000, doing this is a form of normalization
    -- to remove positive impact of incomes <70000 on the final index score 
    income AS (
	    SELECT *, CASE
  		    WHEN median_income_6eb619a2_avg <70000 THEN 0
  		    WHEN median_income_6eb619a2_avg >= 70000 THEN median_income_6eb619a2_avg-70000
  		    END AS income_fixed
	    FROM pop_stats_norm
	    WHERE geom IS NOT NULL AND median_income_6eb619a2_avg IS NOT NULL
    ),

    normed_income AS (
        SELECT *, ML.MIN_MAX_SCALER(income_fixed) OVER() AS income_norm FROM income
        WHERE geom IS NOT NULL
    ),

    build_index AS (
        SELECT *, (female_18_40_norm * 200) + (income_norm * 100) AS index_score
        FROM normed_income
        WHERE geom IS NOT NULL
    ),

    build_index_norm AS (
        SELECT *, ML.MIN_MAX_SCALER(index_score) OVER() * 100 as score FROM build_index
        WHERE geom IS NOT NULL
    )

    SELECT * FROM build_index_norm
    ```
    
    Then, save the resulting source as a separate table. Navigate to the bottom-right of the SQL editor, select "Create table from query". Select the CARTO Data Warehouse connection, and save the new table under "organization data", "shared". Name the table as "ooh_geosegmentation_starbucks_audience". You can also use your own connection. 

    A new source and layer will load, so you can delete the previous one.

    Style the resulting layer as seen below. 

    ![Map new variable score](/img/cloud-native-workspace/tutorials/tutorial17_map_ooh_geosegmentation_new_variable_score.png)

    Set the colours to a custom colour scale, as seen below. 

    ![Map new variable score custom colour](/img/cloud-native-workspace/tutorials/tutorial17_map_ooh_geosegmentation_new_variable_score_custom_colour.png)

    Rename the layer to "Demographic suitability score". As we can see the score is highest in Lower Manhattan and Brooklyn, but there are also some interesting areas in Queens and Upper Manhattan.

    You can load the work we have done so far separately, as we have created already this table. You can access it by navigating to the "demo_tables" folder in the Data Explorer, and creating a map using the "ooh_geosegmentation_starbucks_audience_score". Once you load the table, you can style as above.

15. Let´s create a tooltip for this layer, so that we can see the score, population and median income within each geography. Navigate to the Interactions section, and enable the tooltip for the latest layer. Configure the tooltip to show values when hovering, and add the variables as below:

    ![Map index score tooltip](/img/cloud-native-workspace/tutorials/tutorial17_map_ooh_geosegmentation_index_score_tooltip.png)

16. We have our demographics score layer. It is now time to add the panel inventory. We already have a sample table with panels in New York and New Jersey, extracted from Open Street Maps. You can load only the panels located within our area of interest by creating a new layer and running the custom query below:

    ```sql
    SELECT
    t.*
    FROM
    `carto-dw-ac-dp1glsh.shared.ooh_geosegmentation_starbucks_audience` n,
    `carto-demo-data.demo_tables_ooh_onboarding.ooh_panels` t
    WHERE
    ST_INTERSECTS(n.geom,t.geom)
    ```

13. Change the name of the map to "Selecting a new restaurant location using Commercial Hotspots analysis"

14. Finally we can make the map public and share the link to anybody in the organization. For that you should go to “Share” on the top right corner and set the map as Public. For more details, see [Publishing and sharing maps](../../maps/publishing-and-sharing-maps).

    ![Map public map](/img/cloud-native-workspace/tutorials/tutorial13_map_public_sharelink.png)

15. Finally, we can visualize the result.

   <iframe width="800px" height="800px" src="https://gcp-us-east1.app.carto.com/map/bf3846cc-aa71-42f2-88da-fe98233072d1"></iframe>




