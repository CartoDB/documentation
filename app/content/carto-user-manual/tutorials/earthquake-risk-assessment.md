---
title: "Earthquake risk assessment"
description: "We find the best new location for a specific target demographics using spatial indexes and advanced statistical functions."
image: "/img/tutorials/pizza-hut-location-in-honolulu.png"
type: tutorials
date: "2022-05-09"
# categories:
#     - hard
#     - h3
#     - statistics
#     - retail
---

## Earthquake risk assessment

**Context**

In this section, we provide a tutorial that showcases how easy it is to perform geospatial analysis operations using CARTO Builder. 

In this example,  we will analyse the number of urban areas affected by (the most intense) earthquakes during 2021. This type of risk analysis maps can be useful to show the general situation of risks threatening a given population and to be able to plan measures and actions to mitigate their possible negative effects (human, economic and environmental)

**Steps To Reproduce**

1. Go to the <a href="http://app.carto.com/signup" target="_blank">CARTO signup</a> page.
   - Click on *Log in*.
   - Enter your email address and password. You can also log in with your existing Google account by clicking *Continue with Google*.
   - Once you have entered your credentials: click *Continue*.

   ![Log in Email and password](/img/cloud-native-workspace/get-started/login.png)

2. From the Navigation Menu in the left panel, select Data Explorer. 

   ![Menu features data explorer](/img/cloud-native-workspace/tutorials/tutorial1_the_menu_features_data_explorer.png)

3. Select the [CARTO Data Warehouse](../../connections/carto-data-warehouse) connection and click on *demo data > demo_tables* from the collapsible tree. 

   ![Data Explorer content carto data warehouse](/img/cloud-native-workspace/tutorials/tutorial1_content_carto_dw.png)

4. Select “spain_earthquakes” and explore the preview of the map and the details of the table. 

   ![Data Explorer map prewiew](/img/cloud-native-workspace/tutorials/tutorial14_de_map_preview.png)

   ![Data Explorer data prewiew](/img/cloud-native-workspace/tutorials/tutorial14_de_data_preview.png)

5. Create a map by clicking the *Create map* button on the top. This will open the table as a layer on a CARTO Builder map. Check [Creating a map from your data](../../data-explorer/creating-a-map-from-your-data) to get started.

   ![Data Explorer create map from table](/img/cloud-native-workspace/tutorials/tutorial14_de_map_from_table.png)

6. Change layer name to “Spain earthquakes”.

   ![Map layers rename](/img/cloud-native-workspace/tutorials/tutorial14_map_layer_rename.png)

7. Click *Layer style* to start styling the layer.

   ![Map layers options](/img/cloud-native-workspace/tutorials/tutorial14_map_layer_options.png)

8. Click the “three dots” icon in the Stroke Color section and select “Stroke color Based on” feature `magnitude`. Pick a palette for a sequential variable (gradient). Now the earthquakes on the map will display a ramp color based on on the magnitude at which they occur.

   ![Map stroke style based on field](/img/cloud-native-workspace/tutorials/tutorial14_map_stroke_color_based_on_field.png)

9. Now we can change the radius of the points in order to make them more visible.

    ![Map radius](/img/cloud-native-workspace/tutorials/tutorial14_change_radius.png)

10. We can change the basemap for another type, for example the Dark Matter version of a Google Maps basemap.

    ![Map basemap google maps](/img/cloud-native-workspace/tutorials/tutorial14_basemap_dark_google_maps.png)

11. Let’s now add another layer by clicking on the "Add source from…" button from Sources. Go to the Import file tab and select the [supported](../../data-explorer/importing-data/#supported-formats) local file you want to upload and give a name to the imported table. We are going to use a dataset from Natural Earth that you can download from [here](https://drive.google.com/file/d/17P3l_X834sVt-c5wBY0JNx-fDWxpoEVl/view). Once you have selected your file, click on *Continue*.

    ![Map import select file](/img/cloud-native-workspace/tutorials/tutorial14_map_import_select_file.png)

{{% bannerNote title=Note type="Note" %}}
When you import a file, the Auto-guessing option is always enabled by default. This option allows you to automatically guess column data types in the imported table.
{{%/ bannerNote %}}

12. The next screen will allow you to set the location. The file will be uploaded to the `CARTO Data Warehouse`. Once you have completed this configuration, click on *Continue*.

    ![Map import set location](/img/cloud-native-workspace/tutorials/tutorial14_map_import_set_location.png)


13. Review the details before starting the importing process and then click on *Add source*. This will start the importing process, you can minimise the modal screen and continue working in CARTO while the file is being imported.

    ![Map import confirmation](/img/cloud-native-workspace/tutorials/tutorial14_map_import_confirmation.png)

14. Once the data has been imported, the dataset is included in the Builder map tool as a new layer. For more details, check the [Add source from a local or remote file](../../maps/add-source/#add-source-from-a-local-or-remote-file) guide.

    ![Map import new layer](/img/cloud-native-workspace/tutorials/tutorial14_map_import_new_layer.png)

15. Rename layer name to “Urban areas”.

   ![Map layers rename](/img/cloud-native-workspace/tutorials/tutorial14_map_second_layer_rename.png)

16. We can style the layer, by changing for example the color of the geometries.

   ![Map fill color](/img/cloud-native-workspace/tutorials/tutorial14_map_second_layer_fill_color.png)

16. Now let´s started with our analysis by clicking on the three dots in the "spain_earthquakes" data source to find the Add SQL Analysis option.  For more details, check the [SQL Analyses](../../maps/sql-analyses/) guide.

   ![Map add sql analysis button](/img/cloud-native-workspace/tutorials/tutorial14_map_addsqlanalysis_button.png)


17.  You will see a list of analyses compatible with your source. Select **Filter by column** and click on *Continue*.

     ![Map add sql analysis filter by column](/img/cloud-native-workspace/tutorials/tutorial14_map_sqlanalysis_filterbycolumn.png)

18. Select `date` as target column, type "2021" manually in the values and press enter. Leave the keep option selected in the results and click on *Run SQL analysis*.

     ![Map add sql analysis filter by column parameters](/img/cloud-native-workspace/tutorials/tutorial14_map_sqlanalysis_filterbycolumn_parameters.png)

19. Once the analysis has finished, the dataset is included in the Builder map tool as a new layer. As we have run the analysis directly, the SQL editor will appear but in a collapsed mode. You can open it to check the SQL analysis or close
it if you don't need the query.

    ![Map add sql analysis filter by column new layer](/img/cloud-native-workspace/tutorials/tutorial14_map_analysis_filter_newlayer.png)

20. Close the SQL editor, disable the layer "Spain earthquakes" and rename the layer name to “Spain earthquakes (2021)”. Now the earthquakes on the map have been filtered to those occured in 2021.

    ![Map add sql analysis filter by column rename layer](/img/cloud-native-workspace/tutorials/tutorial14_map_analysis_filter_renamelayer.png)

 <!-- ![Map add sql analysis filter by column rename layer](/img/cloud-native-workspace/tutorials/tutorial14_map_analysis_filter_rename_layer.png) -->

22. Now we can change the radius of the points in order to make them more visible.

    ![Map radius](/img/cloud-native-workspace/tutorials/tutorial14_change_radius.png)

23. Now we are going to add a new SQL analysis from the previous one by clicking on the three dots in the "SQL Query 1" data source and selecting the Add SQL Analysis option.  

    ![Map add sql analysis button](/img/cloud-native-workspace/tutorials/tutorial14_map_second_addsqlanalysis_button.png)

22. Select **Create Buffers** and click on *Continue*.

    ![Map add sql analysis create buffers](/img/cloud-native-workspace/tutorials/tutorial14_map_sqlanalysis_createbuffers.png)

   <!-- ![Map add sql analysis create buffers](/img/cloud-native-workspace/tutorials/tutorial14_map_sqlanalysis_create_buffers.png) -->

23. Leave the default parameters, click on the arrow and select *Preview SQL analysis query*.

    ![Map add sql analysis create buffers preview sql query](/img/cloud-native-workspace/tutorials/tutorial14_map_sqlanalysis_createbuffers_preview_sql.png)

   <!-- ![Map add sql analysis create buffers](/img/cloud-native-workspace/tutorials/tutorial14_map_sqlanalysis_createbuffers_parameters.png) -->

24. As we have clicked on preview the analysis, the SQL editor will appear in a expanded mode and the layer will not be added until we run the analysis. You can either change the parameters or leave them as they are and click on *Run*.

    ![Map add sql analysis create buffers preview sql editor](/img/cloud-native-workspace/tutorials/tutorial14_map_sqlanalysis_createbuffers_preview_editor.png)

    The resulting SQL query will be the initial analysis with the new analysis added.

    ```sql
        WITH __q1 AS (
            SELECT * FROM `carto-demo-data.demo_tables.spain_earthquakes`
        ),
        __q2 AS (
            SELECT * FROM __q1 WHERE REGEXP_CONTAINS(date, r'(?i)(2021)')
        ),
        __q3 AS (
            SELECT
                * EXCEPT (geom),
                ST_Buffer(geom, 10000) AS geom
            FROM
                __q2
        )
        SELECT * FROM __q3
    ```

24. Run the analysis and rename the new layer to "Spain earthquakes (2021) buffer". What this SQL does is to create a 10km buffer around the epicentres of the earthquakes.

    ![Map add sql analysis create buffers new layer](/img/cloud-native-workspace/tutorials/tutorial14_map_sqlanalysis_createbuffers_new_layer.png)

25. Additionally, we are going to intersect the buffer with the table with Urban Areas data (“urban_areas”) and aggregate total urban area affecting by the earthquakes. Click on the three dots in the "SQL Query 2" data source and select the Add SQL Analysis option.  

     ![Map add sql analysis button](/img/cloud-native-workspace/tutorials/tutorial14_map_third_addsqlanalysis_button.png)


26. Select **Intersect and aggregate** and click on *Continue*.

      ![Map add sql analysis intersect and aggregate](/img/cloud-native-workspace/tutorials/tutorial14_map_sqlanalysis_interesect_aggregate.png)

27. Select `urban_areas` as second source, `SUM` as the aggregation operation AND `area_sqkm` as the aggregation column. Click on *Preview SQL analysis query*.

      ![Map add sql analysis intersect and aggregate parameters](/img/cloud-native-workspace/tutorials/tutorial14_map_sqlanalysis_interesect_aggregate_parameters.png)

28. Alternatively, we can also modify the SQL query in order to give the column resulting from the aggregation a more suitable alias. For example, by renaming the default alias `aggregated_value` to `affected_area` and changing the SQL query to: 

    ```sql
    WITH __q1 AS (
  	SELECT * FROM `carto-demo-data.demo_tables.spain_earthquakes`
    ),
    __q2 AS (
        SELECT * FROM __q1 WHERE REGEXP_CONTAINS(date, r'(?i)(2021)')
    ),
    __q3 AS (
        SELECT
            * EXCEPT (geom),
            ST_Buffer(geom, 10000) AS geom
        FROM
            __q2
    ),
    __q4 AS (
        SELECT * FROM `carto-dw-ac-lqe3zwgu.shared.urban_areas`
    ),
    __q5 AS (
        SELECT
            base.event,
            base.date,
            base.hour,
            base.lat,
            base.long,
            base.depth,
            base.intensity,
            base.magnitude,
            base.magnitude_type,
            base.location,
            base.time,
            ST_UNION_AGG(base.geom) as geom,
            sum(second.area_sqkm) as affected_area
        FROM
            __q3 as base,
            __q4 as second
        WHERE
            ST_INTERSECTS(base.geom, second.geom)
        GROUP BY
            1,2,3,4,5,6,7,8,9,10,11
    )
    SELECT * FROM __q5
    ```

29. Rename this new layer layer (E) as “Spain earthquakes (2021) buffer-intersect” and disable the layer “Spain earthquakes (2021) buffer”. 

    ![Map add sql analysis intersect and aggregate rename layer](/img/cloud-native-workspace/tutorials/tutorial14_map_analysis_intersect_aggregate_renamelayer.png)

    To display the full name of the layer, hover the mouse over the layer and a pop up with the full name will appear.

    ![Map add sql analysis intersect and aggregate popup layer](/img/cloud-native-workspace/tutorials/tutorial14_map_analysis_intersect_aggregate_popup_layer.png)

30. Let’s change the ordering of the layers and place the layer "Spain earthquakes (2021)" to the top of the list so the other layers render at the bottom of this layer. You should only drag & drop the “C" layer on the layer panel.

    ![Map add sql analysis intersect and aggregate reorder layer](/img/cloud-native-workspace/tutorials/tutorial14_map_analysis_intersect_aggregate_reorder_layer.png)

31. Let´s also minimize the "Sources" panel and close the SQL editor for better visibility.

    ![Map add sql analysis intersect and aggregate minimize panels](/img/cloud-native-workspace/tutorials/tutorial14_map_analysis_intersect_aggregate_minimize_panels.png)




30. Go to the *Widget tab*. If you haven’t created a widget yet, you will see the following page:
 
    ![Map widgets new widget](/img/cloud-native-workspace/tutorials/tutorial11_map_new_widget.png)

10. Click the *New widget* button and select "paris_cycling_network".

    ![Map widgets select source](/img/cloud-native-workspace/tutorials/tutorial11_map_widget_select_source.png)

    When you add a widget, it´s always the Formula widget by default, based on a Count operation on the number of features displayed on the map viewport:

    ![Map widgets formula by default](/img/cloud-native-workspace/tutorials/tutorial11_map_widget_formula_by_default.png)