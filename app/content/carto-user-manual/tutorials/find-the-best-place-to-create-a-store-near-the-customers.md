## Find the best place to create a store near the customers 

**Steps To Reproduce** 

1. Go to the <a href="http://app.carto.com/signup" target="_blank">CARTO signup</a> page.
   - Click on *Log in*.
   - Enter your email address and password. You can also log in with your existing Google account by clicking *Continue with Google*.
   - Once you have entered your credentials: click *Continue*.

   ![Log in Email and password](/img/cloud-native-workspace/get-started/login.png)

2. From the Navigation Menu in the left panel, select Maps. 

   ![Menu features maps](/img/cloud-native-workspace/tutorials/tutorial5_the_menu_features_maps.png)

3. Click on *New map*. This will open the CARTO map-making tool, Builder.

    ![Maps section new map](/img/cloud-native-workspace/tutorials/tutorial5_maps_new_map.png)

4. Once in Builder, you can add data as layers to the map by clicking on “Add source from”, where you can access the contents from your existing data warehouse connections.

    ![Add source to your map](/img/cloud-native-workspace/tutorials/tutorial5_add_source_to_your_map.png)

5. Select *Custom Query (SQL)* and “Type your own query” using the `CARTO Data Warehouse` connection and click on *Add Source*.

    ![Add source custom query](/img/cloud-native-workspace/tutorials/tutorial5_add_source_custom_query.png)

6. Once the process is finished, the SQL panel appears in the Builder interface, where you can run queries in `CARTO Data Warehouse` (based on Google BigQuery) and see the result in the map. 

    ![Map sql console](/img/cloud-native-workspace/tutorials/tutorial5_map_sql_console.png)

{{% bannerNote title="Note" type="note" %}}
   The following queries should be executed in order, and each of them will show a different result.
{{%/ bannerNote %}} 

7. Let’s start by just plotting a table that we have through our connection with the `CARTO Data Warehouse` (note that you would achieve the same result creating a map from the Data Explorer).

    ```sql
    SELECT * FROM carto-demo-data.demo_tables.sample_customer_home_locations
    ```
    You can see how this query returns the table with the customer home locations that we will use in this analysis.

   ![Map add query](/img/cloud-native-workspace/tutorials/tutorial5_map_add_query.png)

8. Optionally, you could spend some time and style this layer based on the `customer_value` feature, either with the fill color of the points or their radius.

    ![Map style fill based and radius](/img/cloud-native-workspace/tutorials/tutorial5_map_fill_based_and_radius.png)

    ![Map style fill and radius](/img/cloud-native-workspace/tutorials/tutorial5_map_fill_and_radius_based.png)

9. Now we are going to modify the SQL Query used to generate the map layer, and we are going to use the  [`clustering functions`](/analytics-toolbox-bq/sql-reference/clustering/) 
in `CARTO’s Analytics Toolbox` to generate 6 clusters (which is the number of stores we want to open).

    ```sql
    WITH
    clustered_points AS (
    SELECT
        `carto-un`.clustering.ST_CLUSTERKMEANS(ARRAY_AGG(geom ignore nulls), 6) AS cluster_arr
    FROM `carto-demo-data.demo_tables.sample_customer_home_locations`
    )
    SELECT
    cluster_element.cluster,
    ST_UNION_AGG(cluster_element.geom) AS geom
    FROM clustered_points,UNNEST(cluster_arr) AS cluster_element 
    GROUP BY cluster_element.cluster
    ```
    ![Map sql cluster](/img/cloud-native-workspace/tutorials/tutorial5_map_sql_cluster.png)

10. Let’s now change the name of the layer to “Clusters of customer homes”.

   ![Map layers rename](/img/cloud-native-workspace/tutorials/tutorial5_map_layer_rename.png)

11. Style the layer by modifying the fill color of the points based on the feature `cluster`. You can change the color and width of the stroke in order to polish the visualization. 

    ![Map fill style based on field](/img/cloud-native-workspace/tutorials/tutorial5_map_fill_based_on.png)

12. You can also add a Widget to be able to filter the home locations based on the cluster.

    ![Map widgets first widget](/img/cloud-native-workspace/tutorials/tutorial5_map_first_widget.png)

13. Let’s also add a tooltip to the points based on the cluster number.

    ![Map tooltip new tooltip](/img/cloud-native-workspace/tutorials/tutorial5_map_tooltip.png)


14. We can change our basemap. Go to Basemaps tab and select “Dark Matter” from CARTO.

    ![Map basemap](/img/cloud-native-workspace/tutorials/tutorial5_map_basemap.png)

15. We are now going to create another layer. In order to do that, back to *Layers* tab and click again on "Add source from”, *Customer Query (SQL)* and “Type your own query” from your `CARTO Data Warehouse` connection. Finally click on *Add source*.

    ![Add source custom query](/img/cloud-native-workspace/tutorials/tutorial5_add_source_custom_query_second.png)

16. For this second layer we are going to adapt the previous SQL Query and compute the centroid of each of the clusters using the [`transformation functions`](/analytics-toolbox-bq/sql-reference/transformations/) 
in the `Analytics Toolbox`; this would give us a potentially optimal location to open each store in the center of each of the previously computed clusters.

    ```sql
    WITH clustered_points AS (
    SELECT 
        `carto-un`.clustering.ST_CLUSTERKMEANS(ARRAY_AGG(geom ignore nulls), 6) AS cluster_arr
    FROM `carto-demo-data.demo_tables.sample_customer_home_locations`
    )
    SELECT 
    cluster_element.cluster, 
    `carto-un`.transformations.ST_CENTERMEAN(ST_UNION_AGG(cluster_element.geom)) AS geom 
    FROM clustered_points, UNNEST(cluster_arr) AS cluster_element 
    GROUP BY cluster_element.cluster
    ```
17. Let’s rename this second layer as “Cluster centers”.

   ![Map layers rename](/img/cloud-native-workspace/tutorials/tutorial5_map_second_layer_rename.png)

18. Finally, we are going to style this layer by changing the fill color and increasing the radius of the points in order to make them more visible.

    ![Map style centroid fill and radius](/img/cloud-native-workspace/tutorials/tutorial5_map_centroid_fill_and_radius.png)

19. We can also make the map public and share it online with our colleagues. For more details, see [Publishing and sharing maps](../../maps/publishing-and-sharing-maps).

    ![Map public map](/img/cloud-native-workspace/tutorials/tutorial5_map_public.png)
