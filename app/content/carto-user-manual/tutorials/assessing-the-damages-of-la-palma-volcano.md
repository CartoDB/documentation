---
title: "Assessing the damages of La Palma Volcano"
description: "Since 11 September 2021, a swarm of seismic activity had been ongoing in the southern part of the Spanish Canary Island of La Palma (Cumbre Vieja region). The increasing frequency, magnitude, and shallowness of the seismic events were an indication of a pending volcanic eruption; which occurred on 16th September, leading to evacuation of people living in the vicinity. In this tutorial we are going to assess the number of buildings and population that may get affected by the lava flow and its deposits. We'll also estimate the value of damaged residential properties affected by the volcano eruption."
image: "/img/tutorials/volcano.png"
type: tutorials
date: "2021-10-12"
categories: 
    - tag one
    - tag two
    - tag three
    - tag four
    - tag five
    - tag six
    - una categoria mas
---

## Assessing the damages of La Palma Volcano

**Context**

Since 11 September 2021, a swarm of seismic activity had been ongoing in the southern part of the Spanish Canary Island of La Palma (Cumbre Vieja region). The increasing frequency, magnitude, and shallowness of the seismic events were an indication of a pending volcanic eruption; which occurred on 16th September, leading to evacuation of people living in the vicinity. 

In this tutorial we are going to assess the number of buildings and population that may get affected by the lava flow and its deposits. We'll also estimate the value of damaged residential properties affected by the volcano eruption.

**Steps to reproduce**

1. Go to the new CARTO platform access page: https://app.carto.com 

   ![Log in Email and password](/img/cloud-native-workspace/get-started/login.png)

2. Create a new CARTO organization. Check this [guide](../../overview/getting-started/) to get started.

3. The first time that you access the Workspace, you will see a Welcome banner with links providing quick access to different actions to get you started with CARTO, like creating your first connection or your first map. 

    ![Welcome banner Homepage first landing](/img/cloud-native-workspace/get-started/homepage_first_landing.png)

4. From the Navigation Menu in the left panel, select Data Explorer. 

   ![Menu features data explorer](/img/cloud-native-workspace/tutorials/tutorial1_the_menu_features_data_explorer.png)

5. Select the [CARTO Data Warehouse](../../connections/carto-data-warehouse) connection and click on *demo data > demo_tables* from the collapsible tree. 

   ![Data Explorer content carto data warehouse](/img/cloud-native-workspace/tutorials/tutorial1_content_carto_dw.png)

6. In this tutorial, we are going to use the following 3 tables:
   - lapalma_buildings: it contains the buildings in La Palma as obtained from the Spanish cadaster website;
   - lapalma_sociodemo_parcels: it contains a sample from Unica360's dataset in the Data Observatory “Cadaster and Sociodemographics (Parcel)”;
   - lapalma_volcano_lavaflow: it includes the lava flow from the Volcano eruption in La Palma, Spain as measured by the Copernicus satellite on 10/04/2021.

7. Spend some time exploring the three tables in the Data Explorer.

   ![Data Explorer data prewiew](/img/cloud-native-workspace/tutorials/tutorial7_de_data_preview_first_table.png)

   ![Data Explorer data prewiew](/img/cloud-native-workspace/tutorials/tutorial7_de_data_preview_second_table.png)

   ![Data Explorer data prewiew](/img/cloud-native-workspace/tutorials/tutorial7_de_map_preview_third_table.png)

8. Selected "lapalma_buildings" and click on *Create > Create map* button on the top.

   ![Data Explorer create map from table](/img/cloud-native-workspace/tutorials/tutorial7_de_create_map_from_table.png)

    This will open CARTO Builder with this table added as a layer to a map. 

   ![Data Explorer created map from table](/img/cloud-native-workspace/tutorials/tutorial7_created_map_from_table.png)

9.  Let's start by having a look at the Data table. Click on the three dots icon, select *Show data table* and your dataset table will be displayed.

    ![Map source options](/img/cloud-native-workspace/tutorials/tutorial7_map_source_options.png)

    Note that we have added a column called `estimated_prop_value` in which we have estimated the value of the residential buildings based on the average market value per square meter in each municipality and the surface area of each building (which is provided by the cadaster itself).

    ![Map table column](/img/cloud-native-workspace/tutorials/tutorial7_map_table_column.png)

10. Rename the layer to “La Palma Buildings”.

   ![Map layers rename](/img/cloud-native-workspace/tutorials/tutorial7_map_layer_rename.png)

11. Click on *Layer style* to start styling the layer.

   ![Map layers style](/img/cloud-native-workspace/tutorials/tutorial7_map_layer_style.png)

12. We can style the layer, by changing for example the color of the geometries.

    ![Map fill color](/img/cloud-native-workspace/tutorials/tutorial7_map_fill_color.png)

13. Let's now add another layer by clicking on the “Add source from…” button from Sources. Select Table/Tileset, then select the `CARTO Data Warehouse`connection and click on *demo data > demo_tables > lapalma_sociodemo_parcels* from the collapsible tree. Click on *Add Source*.

    ![Add source table](/img/cloud-native-workspace/tutorials/tutorial7_add_source_table.png)

14. Let's change the name of this second layer (B) to “La Palma demographics” 

   ![Map layers rename](/img/cloud-native-workspace/tutorials/tutorial7_map_second_layer_rename.png)

15. Now we change the style of this new layer, by changing the color and size of the geometries.

    ![Map fill color](/img/cloud-native-workspace/tutorials/tutorial7_map_fill_color_second_layer.png)

    ![Map radius](/img/cloud-native-workspace/tutorials/tutorial7_map_radius_second_layer.png)

    And we can also change the outline color.

    ![Map outline color](/img/cloud-native-workspace/tutorials/tutorial7_map_outline_color_second_layer.png)

16. Note that at this point we could do more things such as styling the size of the points by the population living in the parcel. For that, click on the “three dots” icon on “Radius” and select `p_t` as the field to base the radius on. 

    ![Map radius based on](/img/cloud-native-workspace/tutorials/tutorial7_map_second_layer_radius_based_on.png)

17. Now we are going to add a new layer by creating a custom SQL Query that is going to aggregate the number of buildings and their estimated value (remember, only for residential properties) that fall within the volcano's lava flow. 

    For that, we click again on “Add source from…”, but now we select “Custom Query (SQL)”, we select the `CARTO Data Warehouse` connection, and the option “Type your own query”. Then we click on *Add Source*. 
   
    ![Add source custom query](/img/cloud-native-workspace/tutorials/tutorial7_add_source_custom_query.png)

18. In the SQL panel, type the following query:

    ```sql
    WITH lava_flow AS (
    SELECT * FROM `carto-demo-data.demo_tables.lapalma_volcano_lavaflow`
    )
    SELECT *,
    FROM (SELECT count(*) as num_properties, sum(d.estimated_prop_value) as value_damage
    FROM `carto-demo-data.demo_tables.lapalma_buildings` d
    INNER JOIN lava_flow g
    ON ST_INTERSECTS(g.geom,d.geom)), lava_flow
    ```
    Click on *Run*.

    ![Map sql console first query](/img/cloud-native-workspace/tutorials/tutorial7_map_sql_console_firstquery.png)

19. This query should have generated a new layer with the volcano's lava flow and the following columns `num_properties` and `value_damage` . You can check the Data table from the “Source” to validate the result of your query.

    ![Map table results](/img/cloud-native-workspace/tutorials/tutorial7_map_table_results.png)

20. Let's rename this third layer (C) as “Lava flow”. 

   ![Map layers rename](/img/cloud-native-workspace/tutorials/tutorial7_map_third_layer_rename.png)

21. Let's change the ordering of the layers and place this third layer to the bottom of the list so the other layers render on top of the lava flow. You should only drag & drop the "C"layer on the layer panel.

    ![Map layers order](/img/cloud-native-workspace/tutorials/tutorial7_map_layers_order.png)

22. Let's change the styling of the Lava flow layer. Change the Fill and Stroke colors as suggested below:

    ![Map fill stroke](/img/cloud-native-workspace/tutorials/tutorial7_map_fill_stroke_third_layer.png)

23. In case it's not activated by default, let's activate a tooltip for this third layer, in order to show the values of the number of damaged buildings and the estimated damaged value of residential properties when hovering on top of the lava flow polygon. 

    For that, go to the *Interactions* tab and activate the tooltip option. Press on *Clear All* and delete the tooltips except for the third source “SQL Query 1” and leave the fields `Num_properties` and `Value_damage` as shown below:

    ![Map tooltips new tooltip](/img/cloud-native-workspace/tutorials/tutorial7_map_tooltip.png)

    ![Map tooltips new tooltip on map](/img/cloud-native-workspace/tutorials/tutorial7_map_tooltip_on_map.png)

24. Now let's add a last layer into the map. We are going to do again a Custom SQL query, so repeat the steps done before but now run the following query:

    ```sql
    WITH lava_buffer AS
    (SELECT `carto-un`.transformations.ST_BUFFER(geom,0.5,"kilometers",1) AS geom
    FROM `carto-demo-data.demo_tables.lapalma_volcano_lavaflow`),
 
    affected_properties AS 
    (SELECT *,
    FROM (SELECT count(*) AS num_properties, sum(d.estimated_prop_value) AS value_damage
    FROM `carto-demo-data.demo_tables.lapalma_buildings` d
    INNER JOIN lava_buffer g
    ON ST_INTERSECTS(g.geom,d.geom)), lava_buffer)
    
    SELECT *,
    FROM (SELECT round(sum(b.p_t)) AS affected_population
    FROM `carto-demo-data.demo_tables.lapalma_sociodemo_parcels` b
    INNER JOIN lava_buffer g
    ON ST_INTERSECTS(g.geom,b.geom)), affected_properties
    ```

    What this SQL does is to create a 0.5km buffer around the lava flow, and performs the same aggregations as we have done before to compute the total number of buildings and the estimated damaged value of the residential properties within this new geometry. Additionally, we intersect the buffer with the table with Sociodemographic data (“lapalma_sociodemo_parcels”) and aggregate the total number of population living within the lava buffer area.

    It should generate a fourth layer such as the one illustrated below:

    ![Map sql console second query](/img/cloud-native-workspace/tutorials/tutorial7_map_sql_console_secondquery.png)

25. Let's rename this fourth layer (D) as “Lava buffer” and place it at the bottom of all other layers. 

    ![Map layers rename](/img/cloud-native-workspace/tutorials/tutorial7_map_rename_fourth_layer.png)
   
    ![Map layers order](/img/cloud-native-workspace/tutorials/tutorial7_map_layers_order_again.png)


26. Let's apply some styling to the layer, for example as shown below:

    ![Map fill stroke](/img/cloud-native-workspace/tutorials/tutorial7_map_fill_stroke_fourth_layer.png)

27. Make sure you have the tooltip enabled also on this “D” layer, to show the fields `Affected_population`, `Num_properties` and `Value_damage`.

    ![Map tooltips new tooltip](/img/cloud-native-workspace/tutorials/tutorial7_map_second_tooltip.png)

    ![Map tooltips new tooltip](/img/cloud-native-workspace/tutorials/tutorial7_map_second_tooltip_on_map.png)

28. We can now also change the basemap of our map. Let's go to the *Basemap* tab and select Google Maps basemaps with the “Terrain” option, and let's remove all layers except the “Landscape” one. As follows:

    ![Map basemap](/img/cloud-native-workspace/tutorials/tutorial7_map_basemap.png)

29. Finally we can make the map public and share the link to anybody in the organization. For that you should go to “Share” on the top right corner and set the map as Public. For more details, see [Publishing and sharing maps](../../maps/publishing-and-sharing-maps).

    ![Map public map](/img/cloud-native-workspace/tutorials/tutorial7_map_public.png)

30. Finally, we can visualize the result.

    <iframe width="800px" height="400px" src="https://gcp-europe-west1.app.carto.com/map/1d60619f-e9d1-408a-9d23-5eb409f8dd9b"></iframe>





