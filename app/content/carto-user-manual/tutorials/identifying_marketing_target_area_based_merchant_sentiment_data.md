---
title: "Identifying target area for marketing campaign using merchant reviews"
description: "We find coffee-loving areas to launch a marketing campaign, based on sentiment in merchant reviews."
image: "/img/tutorials/cpg_marketing_area_merchant_reviews.png"
type: tutorials
date: "2022-11-25"
# categories:
#     - medium
#     - quadbin
#     - spatial indexes
#     - cpg
---

## Identifying target area for marketing campaign using merchant reviews

**Context**

CPG merchants´ reviews can be used not only to understand how consumers perceive the merchant, but also, when observed with similar data from other adjacent merchants, to understand how consumers perceive entire areas. 

In this tutorial, we will be using sentiment data from [The Data Appeal Company](https://carto.com/spatial-data-catalog/browser/?provider=dataappeal) to identify the areas which we should target for a new marketing campaign of a quality coffee product in Berlin. Specifically we will use the [Main Listing](https://carto.com/spatial-data-catalog/browser/dataset/tdac_placessenti_66e9e87e/) dataset to gather POI, review volume and footfall data, as well as the [Clusters & Topics](https://carto.com/spatial-data-catalog/browser/dataset/tdac_placessenti_705ef6b/) dataset to analyze sentiment for the topic "coffee".

We will then construct spatial indexes to identify the best areas to launch a campaign based on the review volumes, footfall and coffee sentiment data.

**Steps to reproduce**

1. Go to the <a href="http://app.carto.com/signup" target="_blank">CARTO signup</a> page.
   - Click on *Log in*.
   - Enter your email address and password. You can also log in with your existing Google account by clicking *Continue with Google*.
   - Once you have entered your credentials: click *Continue*.

   ![Log in Email and password](/img/cloud-native-workspace/get-started/login_new.png)

2. From the Navigation Menu in the left panel, select Maps. On the top-right corner, select "New map". This should take you to a new instance of a Builder map:   

    ![Map new map instance](/img/cloud-native-workspace/tutorials/tutorial18_map_cpg_sentiment_new_map.png)

3. Let´s first import the restaurants and cafes in Berlin, which is the relevant subset of the Data Appeal Main Listing dataset for our tutorial. Navigate to "Add source from:" and select the table "cpg_dataappeal_restaurants_and_cafes_berlin", located under the "demo_tables" folder in the CARTO Data Warehouse connection

    When the table loads, click on "More options" in the source and "Show data table". Scroll to the right and observe the columns "reviews", "sentiment" and "footfall", which are relevant in our case. Visit the dataset [documentation](https://carto.com/spatial-data-catalog/browser/dataset/tdac_placessenti_705ef6b/) to understand what the variables represent.

    Rename the layer as "Restaurants and cafes".

   ![Data Appeal Main Listing dataset](/img/cloud-native-workspace/tutorials/tutorial18_map_cpg_sentiment_main_listing_dataset.png)

4. As we mentioned earlier, we are not so much interested in analyzing a general sentiment value. Rather, we are interested to understand sentiment when it comes to the topic coffee. For that, we will import sentiment data for the "coffee" and "kaffee" topics for each POI. This data can be found in the Data Appeal Clusters and Topics dataset, from which we will import a subset filtered only for the relevant topics.Navigate to "Add source from:" and select the table "cpg_dataappeal_clusters_and_topics_berlin", located under the "demo_tables" folder in the CARTO Data Warehouse connection.

    When the table loads, click on "More options" in the source and "Show data table". Scroll to the right and observe the columns "topic", "polarity" and "opinions_count", which are relevant in our case. Visit the dataset [documentation](https://carto.com/spatial-data-catalog/browser/dataset/tdac_placessenti_66e9e87e/) to understand what the variables represent.

    Rename the layer as "Coffee sentiment data".

   ![Data Appeal Clusters and Topics dataset](/img/cloud-native-workspace/tutorials/tutorial18_map_cpg_sentiment_clusters_and_topics_dataset.png)

5. We can see that we have polarity and opinions data for each POI, only for the coffee topic. To create a sentiment score for each POI, let´s assign a score of 1 to each positive polarity, a score of -1 to each negative polarity, multiply by the value of "opinions_count" and aggregate for each POI. 

    We also combine the resulting table with the "Restaurants and cafes" data, matching the two tables on "poi_id".

    Go to "Add source from...", select "Custom query" and run the query below:

    ```sql
    WITH polarity AS (
        SELECT *,
            CASE
            WHEN polarity = '+' THEN CAST(opinions_count AS INT64)
            WHEN polarity = '-' THEN -CAST(opinions_count AS INT64)
            ELSE 0
            END
            as polarity_score
        FROM `carto-demo-data.demo_tables.cpg_dataappeal_clusters_and_topics_berlin`
    ),

    poi_coffee_sentiment AS( 
        SELECT poi_id, SUM(polarity_score) AS poi_coffee_sentiment
        FROM polarity
        GROUP BY poi_id
    ),

    pois_with_coffee_sentiment AS (
        SELECT poi_coffee_sentiment.*, polarity.geoid, polarity.cluster, polarity.topic, ROW_NUMBER() OVER(PARTITION BY polarity.poi_id ORDER BY polarity.geoid) AS row_num FROM poi_coffee_sentiment
        INNER JOIN polarity 
        ON polarity.poi_id = poi_coffee_sentiment.poi_id
    ),

    final_table AS (
        SELECT * FROM pois_with_coffee_sentiment
        WHERE row_num = 1
    )

    SELECT a.*, b.poi_coffee_sentiment, b.cluster
    FROM `carto-demo-data.demo_tables.cpg_dataappeal_restaurants_and_cafes_berlin` a
    INNER JOIN final_table b
    ON a.poi_id = b.poi_id
    ```

   ![Sentiment coffee score query](/img/cloud-native-workspace/tutorials/tutorial18_map_cpg_sentiment_coffee_sentiment_score_query.png)

6.  Save the new source as a new table, by clicking on "Create table from query" in the SQL editor. Save in the CARTO Data Warehouse, under the folder "organization data", "shared". Name as "pois_with_coffee_sentiment_score". 

    When the operation is finished, rename the source and layer to "POIs with coffee sentiment score", and style the buffer according to the config seen below.

    We have also saved it in the address "cartobq.cpg_marketing_sentiment_analysis_map.pois_with_coffee_sentiment_score", so you can also select using a custom query.
    
    Delete all previous sources, leave only "POIs with coffee sentiment score".

   ![POIs with coffee sentiment score](/img/cloud-native-workspace/tutorials/tutorial18_map_cpg_sentiment_pois_with_coffee_sentiment_score.png)

7.  We will attempt to create a spatial index, aggregating the coffee setiment, reviews volume and footfaal scores of all POIs across quadbins, to find the best areas to launch this campaign.

    First we will create the spatial index. We will use the [QUADBIN_FROMGEOGPOINT](https://docs.carto.com/analytics-toolbox-bigquery/sql-reference/quadbin/#quadbin_fromgeogpoint) method, found in the analytics toolbox.

    Go to "Add source from...", select "Custom query" and run the query below (make sure to select "quadbin" mode on the right hand side of the SQL editor):

    ```sql
    with pois as (
        SELECT poi_data.*,`carto-un`.carto.QUADBIN_FROMGEOGPOINT(geom, 17) as quadbin
        FROM `cartobq.cpg_marketing_sentiment_analysis_map.pois_with_coffee_sentiment_score` poi_data
    )

    SELECT quadbin,
    sum(reviews) as reviews_sum,
    sum(poi_coffee_sentiment) as coffee_sentiment_sum,
    sum(footfall) as footfall_sum,
    count(*) as poi_count
    FROM pois
    GROUP by quadbin
    ```

    ![Aggregated variables](/img/cloud-native-workspace/tutorials/tutorial18_map_cpg_sentiment_aggregated_variable_layer.png)

8. Save the new source as a new table, by clicking on "Create table from query" in the SQL editor. Save in the CARTO Data Warehouse, under the folder "organization data", "shared". Name as "market_plan_poi_quadbins". 

    When the operation is finished, rename the source and layer to "Aggregated POIs", and style the buffer according to the config seen below.

    We have also saved it in the address "cartobq.cpg_marketing_sentiment_analysis_map.market_plan_poi_quadbins", so you can also select using a custom query.
    
    Delete the custom query source with which we have created this new layer.

   ![Aggregated POIs](/img/cloud-native-workspace/tutorials/tutorial18_map_cpg_sentiment_aggregated_pois.png)

9. Let´s create a new custom index score, to aggregate footfall, review volumes, and sentiment score in one single value we can use to compare areas. Go to "Add source from...", select "Custom query" and run the query below (make sure to select "quadbin" mode on the right hand side of the SQL editor):

    ```sql
    WITH quadbin_normalized AS (
	SELECT *,
        ( (reviews_sum - AVG(reviews_sum) OVER () ) / 
         NULLIF(STDDEV_POP(reviews_sum) OVER (), 0) 
        ) AS reviews_sum_normalized,
        ( (coffee_sentiment_sum - AVG(coffee_sentiment_sum) OVER () ) / 
         NULLIF(STDDEV_POP(coffee_sentiment_sum) OVER (), 0) 
        ) AS coffee_sentiment_sum_normalized,
        ( (footfall_sum - AVG(footfall_sum) OVER () ) / 
         NULLIF(STDDEV_POP(footfall_sum) OVER (), 0) 
        ) AS footfall_sum_normalized
	FROM `cartobq.cpg_marketing_sentiment_analysis_map.market_plan_poi_quadbins`
    )

    SELECT *, (0.5*coffee_sentiment_sum_normalized + 0.25*footfall_sum_normalized + 0.25*reviews_sum_normalized) as index_score 
    FROM quadbin_normalized
    ```

    We normalize all variables and then we create the score by assigning weights to the variables. We assign most weight (0.5) to the coffee sentiment variables, while we divide the rest of the weight to footfall and reviews volume (0.25 each).

    Rename the layer and source to "Index score" and style as seen below. Hide the "Aggregated POIs" layer. 

    ![Index score layer](/img/cloud-native-workspace/tutorials/tutorial18_map_cpg_sentiment_index_score.png)

10. We can see that there are, as expected, a lot of areas of interest in the center, but also some areas in the suburbs. Let´s introduce some widgets to explore further.

    Let´s create a histogram filter for the index score, one for coffee sentiment, one for footfall, one for the reviews volume. Go to widgets, and select layer "Index score". Create a widget according to the configuration seen below.

    ![Index score widget](/img/cloud-native-workspace/tutorials/tutorial18_map_cpg_sentiment_index_score_widget.png)

11. Repeat the process for coffee sentiment, footfall and reviews volume. Create widgets and configure as seen below. 

    ![Index score widget](/img/cloud-native-workspace/tutorials/tutorial18_map_cpg_sentiment_other_widgets.png)

12. Also create a tooltip for the index score layer. Navigate to the tooltip tab, and enable tooltips for the "Index score" layer. Create tooltips when the user hovers over the qudbin, enable for the following variables:

    * Index score (average)
    * Coffee sentiment normalized (sum)
    * Footfall normalized (sum)
    * Reviews normalized (sum)

    ![Index score tooltip](/img/cloud-native-workspace/tutorials/tutorial18_map_cpg_sentiment_index_score_tooltip.png)

13. We can see that there are some areas in the center but also west and east which should be good candidates for our campaign. But which are the areas with good sentiment? 

    To vizualize that, let´s assign coffee sentiment as height criterion in the index layer. We cannot do that in the current viewport, as we also want to vizualize individual POIs, so we need to duplicate the map and vizualize the index score layer in two different ways. 

    Click on "More options ..." on the "Index score" layer, click on "Duplicate layer". Style as below. Name as "Index score (coffee sentiment)"

    ![Index score coffee sentiment height](/img/cloud-native-workspace/tutorials/tutorial18_map_cpg_sentiment_index_score_coffee_sentiment_height.png)

14. To view both layers in separate viewports, click on "Switch to dual map view", and "3D view".

    In the former viewport, hide the "Index score (coffee sentiment)" layer, in the latter viewport, hide the other two layers.

    ![Index score dual view](/img/cloud-native-workspace/tutorials/tutorial18_map_cpg_sentiment_index_score_dual_view.png)

15. Also create a tooltip for the second index score layer. Navigate to the tooltip tab, and enable tooltips for the "Index score (coffee sentiment)" layer. Replicate the configuration as for the prior layer:

    * Index score (average)
    * Coffee sentiment normalized (sum)
    * Footfall normalized (sum)
    * Reviews normalized (sum)

    ![Index score coffee sentiment tooltip](/img/cloud-native-workspace/tutorials/tutorial18_map_cpg_sentiment_index_score_coffee_sentiment_tooltip.png)  

16. We can now see more clearly which are the best areas in Berlin, with the highest index score and coffee sentiment score. Let´s now find the the merchants with the highest coffee sentiment score, to validate that they fall within the identified areas, and to explore the areas using Google Street view API. 

    First create a widget, choosing the "POIs with coffee sentiment score" source. Style as below 

    ![POIs widget](/img/cloud-native-workspace/tutorials/tutorial18_map_cpg_sentiment_merchant_coffee_sentiment_widget.png)  

    We can see that few merchants (around 200) in Berlin stand out for coffee sentiment. For a trade spend allocation exercise, we could had chosen to focus trade spend budget on those merchants.

17. Let´s now create a tooltip for each merchant, embedding Google Street view along with the name and coffee sentiment score. Enable the tooltip for the POIs layer, and choose to configure using HTML code. Paste the code below: 

    ```html
    <div class="CDB-Popup">
    <dl>
        <div>
            <dt>Name</dt>
            <dd>{{name}}</dd>
        </div>
        <div>
            <dt>Coffee sentiment</dt>
            <dd>{{poi_coffee_sentiment}}</dd>
        </div>
        <div>
            <dt>Street view</dt>
            <img height="200" src="https://maps.googleapis.com/maps/api/streetview?size=400x400&amp;location={{latitude}},{{longitude}}&amp;fov=90&amp;heading=70&amp;pitch=0&amp;key=yourKey&amp;">
        </div>
    </dl>
    </div>
    ```

    Remember to replace your API key to enable this service. For more information on how to do this, please follow the following [tutorial](https://carto.com/blog/google-street-view-pop-ups-with-carto/).

    ![POIs street view](/img/cloud-native-workspace/tutorials/tutorial18_map_cpg_sentiment_merchant_street_view.png)    

13. Change the name of the map to "Marketing campaign locations based on sentiment data analysis"

14. Finally we can make the map public and share the link to anybody in the organization. For that you should go to “Share” on the top right corner and set the map as Public. For more details, see [Publishing and sharing maps](../../maps/publishing-and-sharing-maps).

    ![Map public map](/img/cloud-native-workspace/tutorials/tutorial18_map_cpg_sentiment_public_sharelink.png)

15. Finally, we can visualize the result.

   <iframe width="800px" height="800px" src="https://clausa.app.carto.com/map/a9f4b50e-bb5a-4a5f-9c69-b9db2cd7aa8d"></iframe>




