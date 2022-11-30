---
title: "Locating the best out-of-home panels using human mobility data"
description: "In this tutorial we find the Out-Of-Home panels in Madrid that best match the forecasted mobility of a target audience. We visualize mobility using quadints that represent visitor volumes"
image: "/img/tutorials/ooh_coverage_analysis.png"
type: tutorials
date: "2022-07-20"
# categories:
#     - easy
#     - spatial indexes
#     - out-of-home
---

## Locating the best out-of-home panels based on human mobility data

**Context**

A common use case of the Out-of-home advertising industry is coverage analysis, which is the identification of the best panels for a campaign based on forecasted  visits of a chosen audience. The use case can be useful both during campaign planning (select panels) and campaign monitoring and otpimization (adjust the panel inventory allocated to the campaign)
In this tutorial we are showcasing an example where we vizualize forecasted visits of a certain audience on a heatmap, overlay with the point locations of panel inventory, and select the best area to focus on based on the results.

**Steps to reproduce**

1. Go to the <a href="http://app.carto.com/signup" target="_blank">CARTO signup</a> page.
   - Click on *Log in*.
   - Enter your email address and password. You can also log in with your existing Google account by clicking *Continue with Google*.
   - Once you have entered your credentials: click *Continue*.

   ![Log in Email and password](/img/cloud-native-workspace/get-started/login.png)

2. From the Navigation Menu in the left panel, select Maps. On the top-right corner, select "New map". This should take you to a new instance of a Builder map:

    ![Map new map instance](/img/cloud-native-workspace/tutorials/tutorial13_map_new_map_instance.png)


3. Let's first explore a table which includes data for visits and visitors for different locations in the central part of the Madrid metropolitan area, including the visitors´ sociodemographic characteristics.

    Go to the Data Explorer, in the CARTO Datawarehouse, in the "demo_tables" folder. Click on the "madrid_est_pedestrian_traffic" table, and then "Data Preview" tab. You will see we have a Point geometry dataset visits, visitors and associated sociodemographics, for the weekdays of the first week of the year.

    ![Map explore data table](/img/cloud-native-workspace/tutorials/tutorial16_map_ooh_coverage_visitors_table.png)

4. To begin our analysis we will need to convert our point geometries to quadints, so that we can visualize the differences more clearly.

    Click on the "Add Source from..." button and select "Custom Query (SQL)".  Select "Type your own query" and then click on "Add Source". Once you view the SQL editor paste the following and run the query:

    ```sql
    SELECT geoid, `carto-un`.carto.QUADINT_BOUNDARY(geoid) geom,
    FROM (
        SELECT distinct geoid FROM `carto-demo-data.demo_tables.madrid_est_pedestrian_traffic`
    )
    ```

    Using the query above we convert the point geometries in the source table to quadints, so that we can better vizualize the caharacteristics of each geometry. Rename the layer "Pedestrian visitors and visits"

    ![Map define area of study](/img/cloud-native-workspace/tutorials/tutorial16_map_ooh_coverage_area_of_study.png)


5. We then decide to base our analysis on the visitors in the area, rather than the visits, as we are interested in the unique views of our advertisements.

    Click on the "Add Source from..." button and select "Custom Query (SQL)".  Select "Type your own query" and then click on "Add Source". Once you view the SQL editor paste the following and run the query:

    ```sql
    SELECT geoid, geom, gender, age, income, visitors, LOG(visitors) as log_visitors
    FROM `carto-demo-data.demo_tables.madrid_est_pedestrian_traffic`
    WHERE visitors > 0
    ```
    Let's rename this layer "Pedestrian visitors".

    ![Map import pedestrian visitor data](/img/cloud-native-workspace/tutorials/tutorial16_map_ooh_coverage_pedestrian_visitors.png)


6. Next, let's combine the two sources to create an quadint layer with all the information of interest. Click on the 3 dots on the right of the first source we have created (the Area of Study source), selecting "Add SQL analysis". Select "Add columns from second source" and click on Continue.

   ![Map select UI analysis to merge two sources](/img/cloud-native-workspace/tutorials/tutorial16_map_ooh_coverage_merge_tables.png)


7. On the left hand side of the analysis box, choose the two data sources and the column "geoid" as the key. On the right hand side keep "geoid" and "geom" as variables from the base source, and add "gender", "age", "income", "visitors" and "log_visitors" as the variables from the second source to add. The configuration can be shown below.

    ![Map select config to merge two sources](/img/cloud-native-workspace/tutorials/tutorial16_map_ooh_coverage_merge_tables_config.png)


8. Once you have configured the analysis click on Run SQL analysis.

    Once the query completes, rename the resulting layer to "Pedestrian audience"

    You can also delete the last two sources as we have everything in the latest source we have created. This will make map loading faster next time we open the map. Please see the resulting configuration below

    ![Map pedestrian audience](/img/cloud-native-workspace/tutorials/tutorial16_map_ooh_coverage_pedestrian_audience.png)

9. Let's style the layer so that the colour of each quadbin represents the amount of unique visitors expected in the quadbin for the selected period of time. Style the layer as seen below.

    ![Map pedestrian audience styling](/img/cloud-native-workspace/tutorials/tutorial16_map_ooh_coverage_pedestrian_audience_styling.png)


10. With the current configuration we are vizualzing several quadbins on top of at each location, representing different combinations of audiences. However we will want to narrow down our map to only show data for a target audience when we perform coverage analysis. To do that we will need 3 widgets.

    Go to the widgets tab and select "New widget", followed by the data source.

    The first widget we will create is to select the "gender". Create a category widget, with the configuration as seen below.

    ![Map gender widget](/img/cloud-native-workspace/tutorials/tutorial16_map_ooh_coverage_gender_widget.png)

11. Next we will create two further category widgets in similar fashion. These will be age bands and income level.

    Create the two widgets according to the configuration below and rename "Age bands" and "Income level".

    ![Map age bands widget](/img/cloud-native-workspace/tutorials/tutorial16_map_ooh_coverage_age_bands_widget.png)

    ![Map income level widget](/img/cloud-native-workspace/tutorials/tutorial16_map_ooh_coverage_income_level_widget.png)

12. Now let's create a tooltip to understand the number of visitors in each quadbin. Go to the "Interactions" section, and create a tooltip for the Potential audience layer. Style as seen below

   ![Map visitors tooltip](/img/cloud-native-workspace/tutorials/tutorial16_map_ooh_coverage_visitors_tooltip.png)

13. Let's now import another layer, the panels within the same area, to understand where we could achieve coverage. Go to "Add source from...", choose the CARTO Datawarehouse, go to the "demo data" folder, then "data_tables" and select the "madrid_ooh_panels" table. Import the table into the map and style as seen below.

    ![Map panel visibility polygons](/img/cloud-native-workspace/tutorials/tutorial16_map_ooh_coverage_panels_madrid.png)

14. Let's create a widget for the panel layer. Create a new category widget but this time select the latest layer as the source. The new widget will be used to filter panels by type. Style as in the screen below.

    ![Map panel type widget](/img/cloud-native-workspace/tutorials/tutorial16_map_ooh_coverage_panel_type_widget.png)

15. Now let's add an interaction tooltip for the panel layer. Create a new interaction tooltip but this time select the latest layer as the source. The new tooltip will be used to see panel info when we hover over them. Style as in the screen below.

    ![Map panel tooltip](/img/cloud-native-workspace/tutorials/tutorial16_map_ooh_coverage_panel_tooltip.png)

16. Let's now test our map. Imagine we our audience is men, between the age of 30 and 50, with mid-high to high income. We use the widgets to filter for that audience. In the resulting map below we can see that our audience is mostly located in the north-east of Madrid, where we have a good coverage in terms of panels.

    ![Map panel audience](/img/cloud-native-workspace/tutorials/tutorial16_map_ooh_coverage_target_audience.png)

17. But let's say we have a cutoff of visitors within the selected period we would consider. Let's create a new Histogram widget, to filter quadints based on the volumes of visitors attracted.

    Style the widget as seen below. Place the widget at the top of the widgets´ list.

    Note to base the histogram on the Logarithm of visitors rather than the number of visitors, so that we can achieve a normal distribution histogram.

    ![Map audience widget](/img/cloud-native-workspace/tutorials/tutorial16_map_ooh_coverage_audience_widget.png)

18. Let's test our map again with the same audience, filtering for the higher end of visitors. We can do this by selecting the columns on the right hand side of the potential audiences distribution curve.

    ![Map audience filtered](/img/cloud-native-workspace/tutorials/tutorial16_map_ooh_coverage_audience_filtered.png)

19. We can clearly see that our audience is located almost exclusively in the north-east of Madrid. We can further use the "Panel type" widget to choose the panel type which is of interest for our campaign.

    In the example below we have chosen only Billboards and Screens.

    ![Map panels filtered](/img/cloud-native-workspace/tutorials/tutorial16_map_ooh_coverage_panels_filtered_new.png)

20. You can then use the selection tool to select the area of interest (north-east), and create a table widget to list all selected panels. See the result in the screen below.

    ![Map final selected area](/img/cloud-native-workspace/tutorials/tutorial16_map_ooh_coverage_selected_area_new.png)

21. Revert to step 19. Change the name of the map to "Identifying out-of-home panels using coverage information "

22. Finally we can make the map public and share the link to anybody in the organization. For that you should go to “Share” on the top right corner and set the map as Public. For more details, see [Publishing and sharing maps](../../maps/publishing-and-sharing-maps).

    ![Map public map](/img/cloud-native-workspace/tutorials/tutorial16_map_ooh_coverage_public_sharing.png)

23. Finally, we can visualize the result.

   <iframe width="800px" height="800px" src="https://gcp-us-east1.app.carto.com/map/e3c84aac-9571-4867-a8a0-0f850755ba96"></iframe>
