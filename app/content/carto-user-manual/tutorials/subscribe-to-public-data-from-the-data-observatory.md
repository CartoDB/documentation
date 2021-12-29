---
title: "Subscribe to public data from the Data Observatory"
description: "In this tutorial we are going to showcase how to leverage the public data offering from our Data Observatory and use the data from a subscription to build an interactive dashboard in our map-making tool, Builder."
image: "/img/tutorials/chicago-spatial-features.png"
type: tutorials
date: "2021-07-12"
# categories:
#     - easy
#     - transformations
---

## Subscribe to public data from the Data Observatory

**Steps To Reproduce**

1. Go to the <a href="http://app.carto.com/signup" target="_blank">CARTO signup</a> page.
   - Click on *Log in*.
   - Enter your email address and password. You can also log in with your existing Google account by clicking *Continue with Google*.
   - Once you have entered your credentials: click *Continue*.

   ![Log in Email and password](/img/cloud-native-workspace/get-started/login.png)

2. Go to Data Observatory section to access our Spatial Data Catalog.

   ![Menu features data observatory](/img/cloud-native-workspace/tutorials/tutorial4_the_menu_features_data_observatory.png)

   ![DO Spatial data catalog](/img/cloud-native-workspace/tutorials/tutorial4_do_spatial_data_catalog_overview.png)

3. Browse the catalog to find the best spatial datasets to enrich your analysis. With the catalog filters you can explore the different datasets per country of coverage, category, type of license, data providers and placetypes. 

   ![DO Spatial data catalog filters](/img/cloud-native-workspace/tutorials/tutorial4_do_spatial_data_catalog_filters.png)

4. For this example we are going to look for a dataset in the United States of America with a public license. In particular we are going to select the dataset from CARTO in the “Derived” category named Spatial Features in the H3 Resolution 8 spatial aggregation. 

   ![DO Spatial data catalog filtered](/img/cloud-native-workspace/tutorials/tutorial4_do_spatial_data_catalog_filtered.png)

5. If we select that dataset, we can then access it’s particular page with all associated metadata (summary, data schema and map preview).

   ![DO Spatial data catalog summary](/img/cloud-native-workspace/tutorials/tutorial4_do_spatial_data_catalog_summary.png)

   ![DO Spatial data catalog data](/img/cloud-native-workspace/tutorials/tutorial4_do_spatial_data_catalog_data.png)

   ![DO Spatial data catalog map](/img/cloud-native-workspace/tutorials/tutorial4_do_spatial_data_catalog_map.png)

6. As this is a public dataset we can both access the free sample or directly subscribe to the dataset for free. In this case we are going to go ahead with the full subscription. Click on *I accept the License* to confirm your subscription.

   ![DO Spatial data catalog confirm public subscription](/img/cloud-native-workspace/tutorials/tutorial4_do_catalog_confirm_public_subscription.png)

7. Once we confirm the subscription, we are going to have access to the data from its relevant section in the Data Explorer.

   ![DO access data](/img/cloud-native-workspace/tutorials/tutorial4_do_access_data.png)

8. Now, we are going to click on the *Create* button and select the option to *Create map*. 

   Note that the table of this dataset is too large to be loaded entirely in Builder of map creation. For this reason, CARTO is going to add this dataset with a SQL query applied in order to filter the data. As we will illustrate next, you can modify this query in order to select the dataset in the area of interest for your analysis.  

   ![DO table too large](/img/cloud-native-workspace/tutorials/tutorial4_do_warning_table_too_large.png)

9. Before creating a map, we are asked to select which of the data warehouse connections through which this data subscription is available we want to use for the computing capacity that the map is going to require. In this case we are going to select the `CARTO Data Warehouse` connection that comes by default with any CARTO account.

   ![DO select connection](/img/cloud-native-workspace/tutorials/tutorial4_do_select_connection.png)

10. Once we click on *Create*, the application will open a new tab with a Builder map having this dataset as a source with a SQL applied. This default SQL query is filtering the data by applying a buffer of 1000 meters around a point in the center of Manhattan in New York City. 

    ![DO source with sql applied](/img/cloud-native-workspace/tutorials/tutorial4_do_source_with_sql_applied.png)

11. In case our analysis should be applied in another US region, we can just modify the SQL query to filter out the data in another area. For example, we can apply a 5km buffer in the center of Chicago, using the point location for the buffer in the coordinates (-87.687020,41.871550) and modifying the start of the filter SQL query as such: 

    ```sql
    WITH
    buffer AS (SELECT ST_BUFFER(ST_GEOGPOINT(-87.687020,41.871550), 10000) AS buffer_geom), ... 
    ```

    ![DO source with second sql applied](/img/cloud-native-workspace/tutorials/tutorial4_do_source_with_second_sql_applied.png)

12. Alternatively we can also modify the SQL query in order to filter the data in a bounding box. For example by defining this bounding box in Los Angeles (-118.341567,33.972640,-118.093688,34.089010) and changing the SQL query to: 

    ```sql
    WITH 
    filteredgeo AS (
    SELECT * FROM `carto-data.ac_jfjjof5m.sub_carto_geography_usa_h3res8_v1`
    WHERE ST_INTERSECTSBOX(geom, -118.341567,33.972640,-118.093688,34.089010)
    )
    SELECT do_data.*, do_geom.geom 
    FROM `carto-data.ac_jfjjof5m.sub_carto_derived_spatialfeatures_usa_h3res8_v1_yearly_v2` do_data 
    INNER JOIN `filteredgeo` do_geom 
    ON do_data.geoid=do_geom.geoid 
    ```

    ![DO source with bounding box sql applied](/img/cloud-native-workspace/tutorials/tutorial4_do_source_with_boundingbox_sql_applied.png)


{{% bannerNote type="warning" title="Warning" %}}
Note that when modifying the query you should keep the table IDs as defined for your own account, not based on the ones we showcase in this example (e.g. `carto-data.ac_lqe3zwgu`). The important part is the introduction of  `ST_INTERSECTSBOX(geom, -118.341567,33.972640,-118.093688,34.089010)`. 
{{%/ bannerNote %}}

13. Going back to our buffer in Chicago, we can now go ahead and use Builder in order to create an interactive dashboard. First let’s re-run the previous query and give a name to our layer such as “Spatial Features - Chicago”. 
    
    ![DO rename layer](/img/cloud-native-workspace/tutorials/tutorial4_do_rename_the_layer.png)

14. We can style the layer based on one of the features in the table. For that we click on “Layer Style”

    ![DO style layer](/img/cloud-native-workspace/tutorials/tutorial4_do_style_the_layer.png)

15. Click on the “three dots” icon next to Color in order to open the option style the “Color Based On”, we pick for example the feature `Population`. We can also select the color palette of our preference. 

    ![DO fill select field](/img/cloud-native-workspace/tutorials/tutorial4_do_fill_select_field.png)

    ![DO fill based on](/img/cloud-native-workspace/tutorials/tutorial4_do_fill_based_on.png)

16. We can now also add a widget in order to be able to filter the H3 cells based on the population and other features in the table. For that we click in the tab for “Widgets”.

    ![DO widget tab](/img/cloud-native-workspace/tutorials/tutorial4_do_widget_tab.png)

17. We select the HISTOGRAM widget and the field `Population`. We can also modify the number of bins to 12.

    ![DO histogram widget](/img/cloud-native-workspace/tutorials/tutorial4_do_histogram_widget.png)

18. We can rename the title of the widget to reflect the selected field. 

    ![DO widget options](/img/cloud-native-workspace/tutorials/tutorial4_do_widget_options.png)

    ![DO widget rename](/img/cloud-native-workspace/tutorials/tutorial4_do_widget_rename.png)

19. We can add a second widget for one of the category features that we have in our dataset. We click on the *Add widget* button.

    ![DO add widget](/img/cloud-native-workspace/tutorials/tutorial4_do_add_widget.png)

20. We are going to select the Category widget and the field `Urbanity`. 

    ![DO category widget](/img/cloud-native-workspace/tutorials/tutorial4_do_category_widget.png)

21. We change the name of the widget to `Urbanity level`.

    ![DO widget rename](/img/cloud-native-workspace/tutorials/tutorial4_do_widget_rename.png)

22. We can go ahead and also customize our tooltip/infowindows. For that we access the tab named “Interactions”.

    ![DO interactions tab](/img/cloud-native-workspace/tutorials/tutorial4_do_interactions_tab.png)

23. We are going to select the following fields: `Population`, `Male`, `Female`, `Retail`, `Elevation` and `Urbanity`.

    ![DO add interactions](/img/cloud-native-workspace/tutorials/tutorial4_do_add_interactions.png)

24. We can change the basemap for another type, for example the Dark Matter version of a Google Maps basemap. 

    ![DO basemap google maps](/img/cloud-native-workspace/tutorials/tutorial4_do_basemap_google_maps.png)

25.  When we are done with our dashboard, we can go ahead and change the sharing options. 

     ![DO share map](/img/cloud-native-workspace/tutorials/tutorial4_do_share_map.png)

26. We can share the map with the rest of our CARTO organization or make the map public. 

    ![DO share with organization](/img/cloud-native-workspace/tutorials/tutorial4_do_share_with_organization.png)

27. We can also make our map public so people outside your CARTO organization can interact with it.

    ![DO public map](/img/cloud-native-workspace/tutorials/tutorial4_do_public_map.png)

28. Finally, we can visualize the result.

    <iframe width="800px" height="400px" src="https://gcp-us-east1.app.carto.com/map/1a5df119-c536-4b9c-a657-c0b372d8f89d"></iframe>