---
title: "Analyzing Airbnb ratings in Los Angeles"
description: "In this tutorial we will analyze which factors drive the overall impression of Airbnb users by relating the overall rating score with different variables through a Geographically Weighted Regression model. Additionally, we'll analyze more in-depth the areas where the _location_ score drives the overall rating, and inspect sociodemographic attributes on these by enriching our visualization with data from the Data Observatory."
image: "/img/tutorials/airbnb-reviews.png"
type: tutorials
date: "2022-02-08"
# categories:
#     - easy
#     - transformation
---

## Analyzing Airbnb ratings in Los Angeles

### Context

Airbnb was founded in 2008 and has already become a very popular service for travellers around the world.

Having a better understanding on which are the key variables for listings success could help improving the service, as well as detecting main factors that attract tourism in a certain area.

Users provide both an overall rating and more specific ratings on 6 variables: accuracy, communication, cleanliness, location, check in and value.

In this tutorial we will aim to extract useful insights of what the overall impression of Airbnb users depends on, by relating the overall rating score with different variables (specifically: value, cleanliness and location) while taking into account the geographical neighbours behavior through a Geographically Weighted Regression model.

Additionally, we'll analyze more in-depth the areas where the _location_ score drives the overall rating, and inspect sociodemographic attributes on these by enriching our visualization with data from the Data Observatory.

### Steps to reproduce

#### Setting up

In this first step we will go through basic setup, including creating a CARTO account and importing the data that will be used for this tutorial.

1. Go to the new CARTO platform access page: https://app.carto.com

   ![Log in Email and password](/img/cloud-native-workspace/get-started/login.png)

2. Create a new CARTO organization. Check this [guide](../../overview/getting-started/) to get started.

3. The first time that you access the Workspace, you will see a Welcome banner with links providing quick access to different actions to get you started with CARTO, like creating your first connection or your first map.

    ![Welcome banner Homepage first new landing](/img/cloud-native-workspace/get-started/homepage_first_new_landing.png)

4. From the Navigation Menu in the left panel, select Data Explorer.

    ![Menu features data explorer](/img/cloud-native-workspace/tutorials/tutorial1_the_menu_features_data_explorer.png)

5. To import the Airbnb listings dataset that we will be using, click on the upload icon and select _URL_, then input the following URL.

  {{% bannerNote type="tip" title="tip" %}}
  Check this [guide](../../data-explorer/importing-data/) on importing data if it's your first time importing data into CARTO.
  {{%/ bannerNote %}}

  ```text
  https://storage.googleapis.com/carto-academy-public-data/b02_pub_airbnb_reviews_gwr/01_listings_la_2021_5_reviews.geojson
  ```

![Import file from URL](/img/cloud-native-workspace/tutorials/tutorial10_import_dataset_url.png)

Import the file into your connection or CARTO Data Warehouse as `01_listings_la_2021_5_reviews`.

{{% bannerNote type="note" title="note" %}}
The dataset used for this training corresponds with [open data from Airbnb](http://insideairbnb.com/get-the-data.html) that has been pre-filtered specifically for this exercise.
{{%/ bannerNote %}}

#### Exploring Airbnb listings distribution through Spatial Indexes (H3)

We will inspect how Airbnb listings are distributed accross Los Angeles and aggregate the raw data to have a better understanding on how different variables vary geographically within the city.

6. Inspect the data from the `01_listings_la_2021_5_reviews` dataset view within the Data Explorer, then click on the _Create map_ button.

7. Rename the map to `Map 1 Airbnb initial data exploration`. Then click on _Layer 1_ and apply the next style changes.

    - Name: `Airbnb listings`
    - Color: Dark yellow
    - Radius: `2,5`

![Style map layer](/img/cloud-native-workspace/tutorials/the_tutorial10_initial_map_styling.gif)

8. Add a new layer with source ‘Your connection’ and type 'SQL query'. Input the SQL query below.

With this SQL query we will create an H3 grid and aggregate the AirBnB listings into it by computing the average on our key variables. Read more information on Spatial Indexes such as H3 [here](../../../analytics-toolbox-bigquery/overview/spatial-indexes).

{{% bannerNote type="note" title="note" %}}
Replace `carto-academy.b02_pub_airbnb_reviews_gwr.01_listings_la_2021_5_reviews` with the project and dataset name where the `01_listings_la_2021_5_reviews` had been imported.

It is possible to get the qualified table name including the project and dataset name from the Data Explorer.
{{%/ bannerNote %}}

```sql
WITH
  h3_airbnb AS (
  SELECT
    `carto-un`.carto.H3_FROMGEOGPOINT(geom,
      8) AS h3_id,
      *
  FROM
    `carto-academy.b02_pub_airbnb_reviews_gwr.01_listings_la_2021_5_reviews`),
  aggregated_h3 AS (
  SELECT
    h3_id,
    ROUND(AVG(price_num), 2) price,
    ROUND(AVG(review_scores_rating), 2) overall_rating,
    ROUND(AVG(review_scores_value), 2) value_vs_price_rating,
    ROUND(AVG(review_scores_cleanliness), 2) cleanliness_rating,
    ROUND(AVG(review_scores_location), 2) location_rating,
    COUNT(*) AS total_listings
  FROM
    h3_airbnb
  GROUP BY
    h3_id
	HAVING COUNT(*) > 3)
SELECT
  * EXCEPT(h3_id),
  `carto-un`.carto.H3_BOUNDARY(h3_id) AS geom
FROM
  aggregated_h3
```

9. Style the new layer.

    - Name: `H3 Airbnb aggregation`
    - Order in display: 2
    - Fill color: 10 steps blue-red ramp based on column `price_num`
    - No stroke
    - Toggle the _Height_ button and style this parameter using:

        - Method: `sqrt`
        - Value: `20`
        - Column: `total_listings`

    <iframe width="860px" height="480px" src="https://gcp-us-east1.app.carto.com/map/46a32407-8647-4dd5-ac3c-05306f4cdc22"></iframe>

Inspect the map results carefully. Notice where most listings are located and where the areas with highest prices are.

Optionally, play with different variables and color ramps.

#### Estimating variables influence on the overall rating score

Next we will apply a Geospatially Weighted Regression (GWR) model using the [GWR_GRID](../../../analytics-toolbox-bigquery/sql-reference/statistics/#gwr_grid) function to our Airbnb H3 aggregated data. We’ve already seen where different variables rate higher on our previous map.

This model will allow us to extract insights of what the overall impression of Airbnb users depends on, by relating the overall rating score with different variables (specifically we will use: value, cleanliness and location)

We will also visualize where the *location* *score* variable significantly influences the ‘Overall rating’ result.

10. To save map results and continue working on a separate map, lets duplicate the map, disable the 3D view and rename the map copy to `Map 2 GWR Model map`

    ![Map duplicate](/img/cloud-native-workspace/tutorials/the_tutorial10_map_duplicate.png)

11. (Optional) Run the model in your Data Warehouse

Using the CARTO Analytics Toolbox in your Google BigQuery console, run the GWR model using a materialized version of the H3 aggregation SQL query that we applied before as input. Choose `value_vs_price_rating`, `cleanliness_rating` and `location_rating` as input variables and `overall_rating` as the target variable. All of that means the following query

```sql
CALL `carto-un`.carto.GWR_GRID(
    'carto-academy.b02_pub_airbnb_reviews_gwr.02_listings_la_2021_5_reviews_h3_z8_agg',
    ['value_vs_price_rating', 'cleanliness_rating', 'location_rating'], -- [ different ratings features ]
    'overall_rating', -- overall rating (target variable)
    'h3_z8', 'h3', 3, 'gaussian', TRUE,
    NULL
)
```

Once you've run this query in your Google BigQuery console, feel free to save it or simply use our materialized results

12. Add a new layer with source ‘Your connection’ and type 'SQL query'. Choose `h3` as the sptial data type. Now use the results of the GWR model with the following query:

```sql
SELECT 
  h3_z8 as h3,
  value_vs_price_rating_coef_estimate,
  cleanliness_rating_coef_estimate,
  location_rating_coef_estimate,
  intercept
FROM `cartobq.docs.airbnb_la_h3_gwr`
```

Where `cartobq.docs.airbnb_la_h3_gwr` is the result from step 11. Run this query.

13. Style the layer.

    - Name: `Location relevance (Model)`
    - Order: 3
    - Fill Color: 10 steps blue-red ramp based on `location_rating_coef_estimate`
    - No stroke

Optionally, style the layer by different attributes.

14. Change the basemap to Google Maps Roadmap basemap.

    ![Google Basemap Roadmap change](/img/cloud-native-workspace/tutorials/tutorial10_basemap_option_roadmap.png)

15. Click on the _Dual map view_ button to toggle the split map option.

    ![Dual map view button](/img/cloud-native-workspace/tutorials/the_tutorial10_switch_dual_map_view_menu.png)

    - Left map: disable the `Location relevance (Model)` and `Airbnb listings` layers
    - Right map: disable the `H3 AirBnB aggregation` and `Airbnb listings` layers

    ![Visible layers dual map](/img/cloud-native-workspace/tutorials/tutorial10_visible_layers_split_view_map.png)

    The map result would be similar to the following.

    <iframe width="860px" height="680px" src="https://gcp-us-east1.app.carto.com/map/aacef89b-91cb-4103-8cb7-4739452445b5"></iframe>

    Inspect the model results in detail to understand where the location matters the most for users' overall rating score and how the location rating values are distributed.

{{% bannerNote type="tip" title="tip" %}}
Style the map layers depending on other variables to have a better understanding on how different variables influence model results.
{{%/ bannerNote %}}

#### Enriching the visualization with a Data Observatory Tileset

So far we have seen how the Airbnb listings locations and its main variables are distributed across the city of Los Angeles. Next, we will try to combine this information with additional data by adding another source to our map: the `Spatial Features H3 Resolution 8` dataset from the [CARTO Data Observatory](../../../data-observatory/overview/getting-started/).

This dataset holds information that can be useful to explore the influence of different factors, including variables such as the total population, the urbanity level or the presence of certain type of points of interests in different areas.

We will use CARTO Analytics Toolbox BigQuery Tiler to create a [Tileset](../../../analytics-toolbox-bigquery/overview/tilesets/), a special type of table that allows visualizing large spatial datasets such as this one.

15. To save map results and continue working on a separate map, let's duplicate the previous map once again, and disable the dual map view (close the left panel), then rename the map copy to `Map 3 Airbnb Spatial Features`

16. From the main menu, click on ‘Data Observatory’ to browse the [Spatial Data Catalog](../../../data-observatory/guides/accessing-and-browsing-the-spatial-data-catalog/) and apply these filters:

    - Countries: United States of America
    - Licenses: Public data
    - Sources: CARTO

Select the `Spatial Features - United States of America (H3 Resolution 8)` dataset and click on _Subscribe for free_. This action will redirect us to the subscription level at the Data Explorer menu.

![Subscribe Spatial Features](/img/cloud-native-workspace/tutorials/tutorial10_subscribe_spatial_features.gif)

17. From the subscription level at the Data Explorer menu, click on the _Create_ button, then select 'Create a tileset' and complete the steps with the following settings.

    - Output tileset name: `cdb_spatial_fea_94e6b1f`
    - Zoom: 9-12
    - Columns: `geoid`, `population`, `tourism` and `urbanity`

    ![Tileset Spatial Features](/img/cloud-native-workspace/tutorials/tutorial10_create_tileset_z9_z12_spatialfeatures.gif)

18. Once the Tileset has been created, we can add it to our map. To do so first open the map and then click on _Add source from..._ and select the tileset from the tree menu.

    ![Add Tileset source](/img/cloud-native-workspace/tutorials/tutorial10_add_tileset_source_menu.png)

Once the tileset layer has been added, rename the layer to `Spatial Features` and zoom into the Los Angeles area.

19. Style the layer to have color opacity `0` in order to keep it hidden while displaying the information in the pop-up and the widgets that we will add next.

{{% bannerNote type="tip" title="tip" %}}
Optionally, style the layer as desired to visualize how different variables behave across the territory.
{{%/ bannerNote %}}

20. Add the following [widgets](../../maps/map-settings/#widgets) to the map

* Listings summary
    - Layer: A Airbnb listings
    - Type: Table
    - Columns: `review_scores_cleanliness`, `review_scores_location`, `review_scores_value`, `review_scores_rating` and `price_num`

* Population Spatial Features
    - Layer: C Spatial Features
    - Type: Formula
    - Operation: `SUM`
    - Column: `population`

* Tourism POIs
    - Layer: C Spatial Features
    - Type: Formula
    - Operation: `SUM`
    - Column: `tourism`

 * Urbanity level
    - Layer: C Spatial Features
    - Type: Category
    - Operation: `COUNT`
    - Column: `urbanity`

Navigate the map and observe how widget values vary depending on the viewport area. Check out specific areas by hovering over them and review pop-up attributes.

See how the final map would look like [here](https://gcp-us-east1.app.carto.com/map/db7734fa-0440-4a5f-9728-6bd301400da7).

21. Optionally, use the Lasso tool to create geometries and filter more specific areas of interest.

![Lasso Tool filter](/img/cloud-native-workspace/tutorials/tutorial10_lasso_tool_inspection.gif)

22. Finally we can make the map public and share the link to anybody in the organization. For that you should go to “Share” on the top right corner and set the map as Public. For more details, see [Publishing and sharing maps](../../maps/publishing-and-sharing-maps).

    ![Sharing map](/img/cloud-native-workspace/tutorials/tutorial10_sharing_map.png)