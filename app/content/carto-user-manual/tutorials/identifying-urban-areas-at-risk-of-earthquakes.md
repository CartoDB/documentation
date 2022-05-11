---
title: "Identifying urban areas at risk of earthquakes"
description: "In this section, we provide a tutorial that showcases how easy it is to perform geospatial analysis operations using CARTO Builder. 
In this example,  we will analyse the total of urban areas affected in Spain by earthquakes over 2021. This type of analysis can be useful to show the general situation of risks threatening a given population in order to be able to plan measures and actions to mitigate their possible negative effects (human, economic and environmental)."
image: "/img/tutorials/spain_earthquakes_2021.png"
type: tutorials
date: "2022-05-09"
# categories:
#     - hard
#     - h3
#     - statistics
#     - retail
---

## Identifying urban areas at risk of earthquakes

<!-- Earthquake risk assessment -->

**Context**

In this section, we provide a tutorial that showcases how easy it is to perform geospatial analysis operations using CARTO Builder. 

In this example,  we will analyse the total of urban areas affected in Spain by earthquakes over 2021. This type of analysis can be useful to show the general situation of risks threatening a given population in order to be able to plan measures and actions to mitigate their possible negative effects (human, economic and environmental)

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

<!-- 7. Click *Layer style* to start styling the layer.

   ![Map layers options](/img/cloud-native-workspace/tutorials/tutorial14_map_layer_options.png) -->

<!-- 8. Click the “three dots” icon in the Stroke Color section and select “Stroke color Based on” feature `magnitude`. Pick a palette for a sequential variable (gradient). Now the earthquakes on the map will display a ramp color based on on the magnitude at which they occur.

   ![Map fill color based on field](/img/cloud-native-workspace/tutorials/tutorial14_map_fill_color_based_on_field.png)

9. Now we can change the radius of the points in order to make them more visible.

    ![Map radius](/img/cloud-native-workspace/tutorials/tutorial14_change_radius.png)-->

<!-- 10. We can change the basemap for another type, for example the Dark Matter version of a Google Maps basemap.

    ![Map basemap google maps](/img/cloud-native-workspace/tutorials/tutorial14_basemap_dark_google_maps.png)  -->

6. Let’s now add another layer by clicking on the "Add source from…" button from Sources. Go to the Import file tab and select the [supported](../../data-explorer/importing-data/#supported-formats) local file you want to upload and give a name to the imported table. We are going to use a dataset from Natural Earth that you can download from [here](https://drive.google.com/file/d/17P3l_X834sVt-c5wBY0JNx-fDWxpoEVl/view). Once you have selected your file, click on *Continue*.

    ![Map import select file](/img/cloud-native-workspace/tutorials/tutorial14_map_import_select_a_file.png)

    <!-- ![Map import select file](/img/cloud-native-workspace/tutorials/tutorial14_map_import_select_file.png) -->

{{% bannerNote title=Note type="Note" %}}
When you import a file, the Auto-guessing option is always enabled by default. This option allows you to automatically guess column data types in the imported table.
{{%/ bannerNote %}}

7. The next screen will allow you to set the location. The file will be uploaded to the `CARTO Data Warehouse`. Once you have completed this configuration, click on *Continue*.

    ![Map import set location](/img/cloud-native-workspace/tutorials/tutorial14_map_import_set_the_location.png)

    <!-- ![Map import set location](/img/cloud-native-workspace/tutorials/tutorial14_map_import_set_location.png) -->

8. Review the details before starting the importing process and then click on *Add source*. This will start the importing process, you can minimise the modal screen and continue working in CARTO while the file is being imported.

    ![Map import confirmation](/img/cloud-native-workspace/tutorials/tutorial14_map_import_the_confirmation.png)

    <!-- ![Map import confirmation](/img/cloud-native-workspace/tutorials/tutorial14_map_import_confirmation.png) -->

    Once the data has been imported, the dataset is included in the Builder map tool as a new layer. For more details, check the [Add source from a local or remote file](../../maps/add-source/#add-source-from-a-local-or-remote-file) guide.

    <!-- ![Map import new layer](/img/cloud-native-workspace/tutorials/tutorial14_map_import_new_layer.png) -->

9. Rename the name of the layers to “Spain earthquakes” and "Urban areas", respectively.

   <!-- ![Map layers rename](/img/cloud-native-workspace/tutorials/tutorial14_map_layer_rename.png) -->

   ![Map layers rename](/img/cloud-native-workspace/tutorials/tutorial14_map_second_layer_rename.png)

<!-- 11. We can style the layer, by changing for example the color of the geometries.

   ![Map fill color](/img/cloud-native-workspace/tutorials/tutorial14_map_second_layer_fill_color.png) -->

10. Now let´s started with our analysis by clicking on the three dots in the "spain_earthquakes" data source to find the Add SQL Analysis option.  For more details, check the [SQL Analyses](../../maps/sql-analyses/) guide.

   ![Map add sql analysis button](/img/cloud-native-workspace/tutorials/tutorial14_map_addsqlanalysis_button.png)


11.  You will see a list of analyses compatible with your source. Select **Filter by column** and click on *Continue*.

     ![Map add sql analysis filter by column](/img/cloud-native-workspace/tutorials/tutorial14_map_analysis_filterbycolumn.png)

     <!-- ![Map add sql analysis filter by column](/img/cloud-native-workspace/tutorials/tutorial14_map_sqlanalysis_filterbycolumn_parameters.png) -->

12. Select `date` as target column, type "2021" manually in the values and press enter. Leave the keep option selected in the results and click on *Run SQL analysis*.

     ![Map add sql analysis filter by column](/img/cloud-native-workspace/tutorials/tutorial14_map_analysis_filterbycolumn_parameters.png)

     <!-- ![Map add sql analysis filter by column parameters](/img/cloud-native-workspace/tutorials/tutorial14_map_sqlanalysis_filterbycolumn_parameters.png) -->

13. Once the analysis has finished, the dataset is included in the Builder map tool as a new layer. As we have run the analysis directly, the SQL editor will appear but in a collapsed mode. You can open it to check the SQL analysis or close
it if you don't need the query.

    ![Map add sql analysis filter by column new layer](/img/cloud-native-workspace/tutorials/tutorial14_map_analysis_filterbycolumn_new_layer.png)

    <!-- ![Map add sql analysis filter by column new layer](/img/cloud-native-workspace/tutorials/tutorial14_map_analysis_filterbycolumn_newlayer.png) -->

<!-- 14. Close the SQL editor, disable the layer "Spain earthquakes" and rename the layer name to “Spain earthquakes (2021)”. Now the earthquakes on the map have been filtered to those occured in 2021.

    ![Map add sql analysis filter by column rename layer](/img/cloud-native-workspace/tutorials/tutorial14_map_analysis_filterbycolumn_renamelayer.png)

15. Let´s change the color based on `magnitude` (the same as in step 8) and the radius of the points in order to make them more visible.

    ![Map fill color based on field](/img/cloud-native-workspace/tutorials/tutorial14_map_fill_color_based_on.png)

    ![Map radius](/img/cloud-native-workspace/tutorials/tutorial14_change_radius.png) -->

14. Now we are going to add a new SQL analysis from the previous one by clicking on the three dots in the "SQL Query 1" data source and selecting the Add SQL Analysis option.  

    ![Map add sql analysis button](/img/cloud-native-workspace/tutorials/tutorial14_map_second_addsqlanalysis_button.png)

15. Select **Intersect and aggregate** and click on *Continue*. Select `urban_areas` as second source and `COUNT` as the aggregation operation. Click on *Preview SQL analysis query*.

    ![Map add sql analysis button](/img/cloud-native-workspace/tutorials/tutorial14_map_analysis_intersect_and_aggregate_earthquakes.png)

16. As we have clicked on preview the analysis, the SQL editor will appear in a expanded mode and the layer will not be added until we run the analysis. You can either change the parameters or leave them as they are and click on *Run*.

    ![Map add sql analysis button](/img/cloud-native-workspace/tutorials/tutorial14_map_analysis_intersect_and_aggregate_earthquakes_previewquery.png)


    The resulting SQL query will be the initial analysis with the new analysis added. We are analysing earthquakes occurring in 2021 that intersect with urban areas. 

    ```sql
    WITH __q1 AS (
        SELECT * FROM `carto-demo-data.demo_tables.spain_earthquakes`
    ),
    __q2 AS (
        SELECT * FROM __q1 WHERE REGEXP_CONTAINS(date, r'(?i)(2021)')
    ),
    __q3 AS (
        SELECT * FROM `carto-dw-ac-lqe3zwgu.shared.urban_areas`
    ),
    __q4 AS (
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
            COUNT(*) as aggregated_value
        FROM
            __q2 as base,
            __q3 as second
        WHERE
            ST_INTERSECTS(base.geom, second.geom)
        GROUP BY
            1,2,3,4,5,6,7,8,9,10,11
    )
    SELECT * FROM __q4
    ```
17. Run the analysis, close the SQL editor, disable the layers "Layer 3" and "Spain earthquakes" and rename the new layer to “Spain earthquakes (2021)”. 

    ![Map add sql analysis button](/img/cloud-native-workspace/tutorials/tutorial14_map_analysis_intersect_and_aggregate_earthquakes_newlayer.png)

18. We are going to add a new SQL analysis from the previous one by clicking on the three dots in the "SQL Query 2" data source and selecting the Add SQL Analysis option. Select **Create Buffers** and click on *Continue*.

    ![Map add sql analysis create buffers](/img/cloud-native-workspace/tutorials/tutorial14_map_analysis_createbuffer.png)

    <!-- ![Map add sql analysis create buffers](/img/cloud-native-workspace/tutorials/tutorial14_map_sqlanalysis_createbuffer.png) -->

16. Leave the default parameters, click on the arrow and select *Preview SQL analysis query*.

    ![Map add sql analysis create buffers parameters](/img/cloud-native-workspace/tutorials/tutorial14_map_analysis_createbuffer_parameters.png)

    <!-- ![Map add sql analysis create buffers parameters](/img/cloud-native-workspace/tutorials/tutorial14_map_sqlanalysis_createbuffers_theparameters.png) -->

<!-- 26. As we have clicked on preview the analysis, the SQL editor will appear in a expanded mode and the layer will not be added until we run the analysis. You can either change the parameters or leave them as they are and click on *Run*.

    ![Map add sql analysis create buffers preview query](/img/cloud-native-workspace/tutorials/tutorial14_map_analysis_createbuffers_preview_query.png)

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
    ``` -->

17. Run the analysis, close the SQL editor and rename the new layer to "Spain earthquakes (2021) buffer". What this SQL does is to create a 10km buffer around the earthquakes.

    <!-- ![Map add sql analysis create buffers new layer](/img/cloud-native-workspace/tutorials/tutorial14_map_analysis_createbuffers_newlayer.png) -->

    ![Map add sql analysis create buffers new layer](/img/cloud-native-workspace/tutorials/tutorial14_map_analysis_createbuffers_earthquakes_newlayer.png)

18. Additionally, we are going to intersect the buffer with the table with Urban Areas data (“urban_areas”) and aggregate the total urban area affecting by the earthquakes. Click on the three dots in the "SQL Query 3" data source and select the Add SQL Analysis option. Select **Intersect and aggregate** and click on *Continue*.

     <!-- ![Map add sql analysis button](/img/cloud-native-workspace/tutorials/tutorial14_map_third_addsqlanalysis_button.png) -->

      ![Map add sql analysis intersect and aggregate](/img/cloud-native-workspace/tutorials/tutorial14_map_sqlanalysis_interesect_and_aggregate_buffer.png)

      <!-- ![Map add sql analysis intersect and aggregate](/img/cloud-native-workspace/tutorials/tutorial14_map_sqlanalysis_interesect_and_aggregate.png) -->

19. Select `urban_areas` as second source, `SUM` as the aggregation operation AND `area_sqkm` as the aggregation column. Click on *Preview SQL analysis query*.

      ![Map add sql analysis intersect and aggregate parameters](/img/cloud-native-workspace/tutorials/tutorial14_map_sqlanalysis_interesect_and_aggregate_parameters_buffer.png)

      <!-- ![Map add sql analysis intersect and aggregate parameters](/img/cloud-native-workspace/tutorials/tutorial14_map_sqlanalysis_interesect_and_aggregate_parameters.png) -->

20. We can also modify the SQL query in order to give the column resulting from the aggregation a more suitable alias. For example, by renaming the default alias `aggregated_value` to `affected_area` and changing the SQL query to: 

    ```sql
        WITH __q1 AS (
        SELECT * FROM `carto-demo-data.demo_tables.spain_earthquakes`
    ),
    __q2 AS (
        SELECT * FROM __q1 WHERE REGEXP_CONTAINS(date, r'(?i)(2021)')
    ),
    __q3 AS (
        SELECT * FROM `carto-dw-ac-lqe3zwgu.shared.urban_areas`
    ),
    __q4 AS (
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
            COUNT(*) as aggregated_value
        FROM
            __q2 as base,
            __q3 as second
        WHERE
            ST_INTERSECTS(base.geom, second.geom)
        GROUP BY
            1,2,3,4,5,6,7,8,9,10,11
    ),
    __q5 AS (
        SELECT
            * EXCEPT (geom),
            ST_Buffer(geom, 10000) AS geom
        FROM
            __q4
    ),
    __q6 AS (
        SELECT * FROM `carto-dw-ac-lqe3zwgu.shared.urban_areas`
    ),
    __q7 AS (
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
            base.aggregated_value,
            ST_UNION_AGG(base.geom) as geom,
            sum(second.area_sqkm) as affected_area
        FROM
            __q5 as base,
            __q6 as second
        WHERE
            ST_INTERSECTS(base.geom, second.geom)
        GROUP BY
            1,2,3,4,5,6,7,8,9,10,11,12
    )
    SELECT * FROM __q7
    ```

21. Rename this new layer layer (F) as “Spain earthquakes (2021) buffer-intersect” and disable the layer “Spain earthquakes (2021) buffer”. 

    ![Map add sql analysis intersect and aggregate rename layer](/img/cloud-native-workspace/tutorials/tutorial14_map_analysis_intersect_aggregate_rename_layer.png)

    <!-- ![Map add sql analysis intersect and aggregate rename layer](/img/cloud-native-workspace/tutorials/tutorial14_map_analysis_intersect_aggregate_renamelayer.png) -->

    <!-- To display the full name of the layer, hover the mouse over the layer and a pop up with the full name will appear.

    ![Map add sql analysis intersect and aggregate popup layer](/img/cloud-native-workspace/tutorials/tutorial14_map_analysis_intersect_aggregate_popup_layer.png) -->

22. Let’s change the ordering of the layers and place the layer "Spain earthquakes (2021)" to the top of the list so the other layers render at the bottom of this layer. You should only drag & drop the “C" layer on the layer panel.

    ![Map add sql analysis intersect and aggregate reorder layer](/img/cloud-native-workspace/tutorials/tutorial14_map_analysis_intersect_aggregate_reorder.png)

    <!-- ![Map add sql analysis intersect and aggregate reorder layer](/img/cloud-native-workspace/tutorials/tutorial14_map_analysis_intersect_aggregate_reorder_layer.png) -->

23. Let´s also minimize the "Sources" panel and close the SQL editor for better visibility.

    ![Map add sql analysis intersect and aggregate minimize panels](/img/cloud-native-workspace/tutorials/tutorial14_map_analysis_intersect_aggregate_minimizepanels.png)

    <!-- ![Map add sql analysis intersect and aggregate minimize panels](/img/cloud-native-workspace/tutorials/tutorial14_map_analysis_intersect_aggregate_minimize_panel.png) -->

24. Select the "Spain earthquakes (2021)" layer and click the “three dots” icon. Select *Layer style* to start styling the layer.

   ![Map layers options](/img/cloud-native-workspace/tutorials/tutorial14_map_layer_menu_options.png)

   <!-- ![Map layers options](/img/cloud-native-workspace/tutorials/tutorial14_map_layer_options.png) -->

25. Click the “three dots” icon in the Stroke Color section and select “Stroke color Based on” feature `magnitude`. Pick a palette for a sequential variable (gradient). Now the earthquakes on the map will display a ramp color based on on the magnitude at which they occur.

   ![Map layers options](/img/cloud-native-workspace/tutorials/tutorial14_map_layer_style_options.png)

   <!-- ![Map fill color based on field](/img/cloud-native-workspace/tutorials/tutorial14_map_fill_color_based_on_field.png) -->

26. We can change the radius of the points in order to make them more visible.

    ![Map radius](/img/cloud-native-workspace/tutorials/tutorial14_change_radius.png)

27. Now let´s change the opacity of the layer "Spain earthquakes (2021 buffer-intersect)" Change the opacity to 0,2.

   ![Map fill color based on field and opacity](/img/cloud-native-workspace/tutorials/tutorial14_map_change_opacity.png)

   <!-- ![Map fill color based on field and opacity](/img/cloud-native-workspace/tutorials/tutorial14_map_fill_color_based_on_opacity.png) -->


28. In case it’s not activated by default, let’s activate a tooltip for this layer ("Spain earthquakes (2021) buffer-intersect"), in order to show the to show the place of occurrence of the earthquake and the affected urban area when hovering on top of the earthquake buffer zones.

    For that, go to the Interactions tab and activate the tooltip option. Press on Clear All and delete the tooltips except for the fifth source “SQL Query 4” and leave the fields `location` and `affected_area` as shown below:

    ![Map tooltip](/img/cloud-native-workspace/tutorials/tutorial14_map_show_tooltip.png)

    <!-- ![Map tooltip](/img/cloud-native-workspace/tutorials/tutorial14_map_showing_tooltip.png) -->

<!-- 37. Alternatively, we can also an create a table from this last analysis by clicking on the three dots in the "SQL Query 3" data source to find the Open SQL Editor. Once the SQL editor is opened, click on *Create table from query* button at the bottom right.

    ![Map create table from query button](/img/cloud-native-workspace/tutorials/tutorial14_map_create_table_from_query_button.png)

38. Set the location and name of the output table and click on *Create table from query*.

    ![Map create table from query](/img/cloud-native-workspace/tutorials/tutorial14_map_create_table_from_query.png)

39. Once the process is finished, the table is included in the Builder map as a new layer. 

    ![Map table from query](/img/cloud-native-workspace/tutorials/tutorial14_map_new_table_from_query.png) -->

29. Go to the *Widget tab*. If you haven’t created a widget yet, you will see the following page:
 
    ![Map widgets new widget](/img/cloud-native-workspace/tutorials/tutorial14_map_newwidget.png)

    <!-- ![Map widgets new widget](/img/cloud-native-workspace/tutorials/tutorial14_map_new_widget.png) -->

30. Click the *New widget* button and select "SQL Query 2". When you add a widget, it´s always the Formula widget by default, based on a Count operation on the number of features displayed on the map viewport. Rename the widget to “Nº of earthquakes in Spain (2021)”.

    ![Map widgets formula rename](/img/cloud-native-workspace/tutorials/tutorial14_map_widget_formula_renaming.png)

    <!-- ![Map widgets formula rename](/img/cloud-native-workspace/tutorials/tutorial14_map_widget_formula_rename.png) -->

42. Now we are going to add a few more interactive widgets (HISTOGRAM). Click the Add widget button and select “SQL Query 1”.

    ![Map widgets select source histogram](/img/cloud-native-workspace/tutorials/tutorial14_map_widget_histogram_select_source.png)

    <!-- ![Map widgets select source histogram](/img/cloud-native-workspace/tutorials/tutorial14_map_widget_select_source_histogram.png) -->

    Select the HISTOGRAM widget and choose the field `magnitude` from the list. You will get a histogram widget in order to be able to filter the earthquakes in Spain based on their magnitude. Rename the widget to “Earthquakes in Spain by magnitude”.

    ![Map histogram widget select field](/img/cloud-native-workspace/tutorials/tutorial14_map_histogram_widget_selectfield.png)

    <!-- ![Map histogram widget select field](/img/cloud-native-workspace/tutorials/tutorial14_map_histogram_widget_select_a_field.png) -->

    <!-- ![Map histogram widget select field](/img/cloud-native-workspace/tutorials/tutorial14_map_histogram_widget_select_field.png) -->

43. We are going to add the last widget. For that, go back to the widget’s list, click on *Add widget* button, select “SQL Query 1" and choose the TIME-SERIES widget. We are going to aggregate the data range of the `time` column by months. The histogram widget displays the number of earthquakes in each month over time, allowing you to select and visualize a specific range of data.

    ![Map time series widget select field](/img/cloud-native-workspace/tutorials/tutorial14_map_timeseries_widget_selectfield.png)

    <!-- ![Map time series widget select field](/img/cloud-native-workspace/tutorials/tutorial14_map_timeseries_widget_select_field.png) -->

44. Rename the map to “Earthquakes in Spain over 2021”.

    ![Map rename title and legend](/img/cloud-native-workspace/tutorials/tutorial14_map_renaming_title.png)

    <!-- ![Map rename title and legend](/img/cloud-native-workspace/tutorials/tutorial14_map_rename_title_legend.png) -->

    <!-- ![Map rename title and legend](/img/cloud-native-workspace/tutorials/tutorial14_map_rename_title.png) -->

45. We can make the map public and share it online with our colleagues. We could also protect our map before sharing it by enabling password protection and setting a map password. For more details, see [Publishing and sharing maps](../../maps/publishing-and-sharing-maps/) .

    ![Map public map](/img/cloud-native-workspace/tutorials/tutorial14_map_publicsharing_options.png)

    <!-- ![Map public map](/img/cloud-native-workspace/tutorials/tutorial14_map_public_options.png) -->

46. Finally, we can visualize the result.

<iframe width="800px" height="400px" src="https://gcp-us-east1.app.carto.com/map/268588f6-37ca-4e5e-9670-d7b87747dfbb"></iframe>
