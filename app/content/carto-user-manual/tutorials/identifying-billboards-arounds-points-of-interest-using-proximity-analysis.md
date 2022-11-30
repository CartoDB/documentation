---
title: "Identifying billboards around POIs using proximity analysis"
description: "We find the OOH panels closest to a certain point of interest, in this case Starbucks, using proximity analysis ."
image: "/img/tutorials/ooh_proximity_analysis.png"
type: tutorials
date: "2022-07-11"
# categories:
#     - medium
#     - distance
#     - statistics
#     - out-of-home
---

## Identifying billboards around points of interest using proximity analysis

**Context**

A common use case of the Out-of-home advertising industry is proximity analysis, which allows a user to identify the panels closest or within a certain distance of locations. This is particularly useful when we want to alert pedestrians that there is a store of a brand located close by, or when we want to place the brand in their thoughts as there is a high likelihood they will pass by the store as they walk through the area.
In this tutorial we are showcasing an example where we want to find the panels within a 400m radius of Starbucks locations in the New York City area (5 mins walking distance).

**Steps to reproduce**

1. Go to the <a href="http://app.carto.com/signup" target="_blank">CARTO signup</a> page.
   - Click on *Log in*.
   - Enter your email address and password. You can also log in with your existing Google account by clicking *Continue with Google*.
   - Once you have entered your credentials: click *Continue*.

   ![Log in Email and password](/img/cloud-native-workspace/get-started/login.png)

2. From the Navigation Menu in the left panel, select Maps. On the top-right corner, select "New map". This should take you to a new instance of a Builder map:

    ![Map new map instance](/img/cloud-native-workspace/tutorials/tutorial13_map_new_map_instance.png)


3. We will first import all panels for the New York City area. We have already created a dataset for all panels in New York and New Jersey. Select the "Add source from..." at the bottom left of the page. Select the tab named "Custom Query (SQL)", and click on the "CARTO Data Warehouse" connection. Run the query below:

    ```sql
    SELECT * FROM `carto-demo-data.demo_tables.newyork_newjersey_ooh_panels`
    WHERE ST_INTERSECTS(geom, ST_GEOGFROMTEXT('POLYGON((-74.0217027068138 40.71878617467263,-74.01135742664336 40.76296271079593,-73.96672010421752 40.82326631011446,-73.91943275928496 40.8004687826801,-73.94931256771086 40.76206069582457,-73.96792978048323 40.73763256552792,-73.95601004362105 40.71923951008711,-73.95529121160506 40.64212814693562,-74.03532564640044 40.64323734371749,-74.0217027068138 40.71878617467263))'))
    ```

    ![Map load panel layer](/img/cloud-native-workspace/tutorials/tutorial15_map_ooh_proximity_panels.png)

   You will notice that we are looking at panel locations in the NY metropolitan area. Rename the panels layer "NY Panels"


4. Then we import the locations corresponding to Starbucks stores in NY. Select the “Add source from…” at the bottom left of the page. Select the tab named “Custom Query (SQL)”, and click on the “CARTO Data Warehouse” connection. Run the query below:

    ```sql
    --Filtering all the available Starbucks inside NY dense urban area
    --Also, filtering by date as there are several Starbucks in the same position with different dates.
    select * from (
        SELECT *, ROW_NUMBER() OVER(PARTITION BY geoid ORDER BY do_date DESC) as rn
        FROM `carto-demo-data.demo_tables.safegraph_coreplaces_starbucks_ny`
        WHERE ST_INTERSECTS(geom, ST_GEOGFROMTEXT('POLYGON((-74.0217027068138 40.71878617467263,-74.01135742664336 40.76296271079593,-73.96672010421752 40.82326631011446,-73.91943275928496 40.8004687826801,-73.94931256771086 40.76206069582457,-73.96792978048323 40.73763256552792,-73.95601004362105 40.71923951008711,-73.95529121160506 40.64212814693562,-74.03532564640044 40.64323734371749,-74.0217027068138 40.71878617467263))'))
    )
    where rn = 1
    ```

    ![Map load starbucks layer](/img/cloud-native-workspace/tutorials/tutorial15_map_ooh_proximity_starbucks.png)

    Rename this new layer "NY Starbucks"

    You can hide these two layers when performing the next steps of this analysis by clicking on the "eye" icon on each layer entry.


5. As we said in our introduction, we would like to find all panels which are within 400m of each Starbucks. To do this, we have run a new custom query, the query below:

   ```sql
    WITH starbucks AS (
        select * from (
            SELECT *, ROW_NUMBER() OVER(PARTITION BY geoid ORDER BY do_date DESC) as rn
            FROM `carto-demo-data.demo_tables.safegraph_coreplaces_starbucks_ny`
            WHERE ST_INTERSECTS(geom, ST_GEOGFROMTEXT('POLYGON((-74.0217027068138 40.71878617467263,-74.01135742664336 40.76296271079593,-73.96672010421752 40.82326631011446,-73.91943275928496 40.8004687826801,-73.94931256771086 40.76206069582457,-73.96792978048323 40.73763256552792,-73.95601004362105 40.71923951008711,-73.95529121160506 40.64212814693562,-74.03532564640044 40.64323734371749,-74.0217027068138 40.71878617467263))'))
        )
        where rn = 1
    ),

    panels AS (
        SELECT ROW_NUMBER() OVER() as id, * FROM `carto-demo-data.demo_tables.newyork_newjersey_ooh_panels`
        WHERE ST_INTERSECTS(geom, ST_GEOGFROMTEXT('POLYGON((-74.0217027068138 40.71878617467263,-74.01135742664336 40.76296271079593,-73.96672010421752 40.82326631011446,-73.91943275928496 40.8004687826801,-73.94931256771086 40.76206069582457,-73.96792978048323 40.73763256552792,-73.95601004362105 40.71923951008711,-73.95529121160506 40.64212814693562,-74.03532564640044 40.64323734371749,-74.0217027068138 40.71878617467263))'))
    ),

    panels_unique AS(
    SELECT * from(
        SELECT p.* , ROW_NUMBER() OVER (PARTITION BY p.id) as row1
        FROM panels p, starbucks s
        WHERE ST_DWITHIN(p.geom, s.geom, 400)
        ORDER BY p.id
    )
    WHERE row1 = 1
    )
    SELECT * FROM panels_unique
    ```

    Rename the layer to "Panels within 400m of a Starbucks", and style the layer according to the config seen below. Place the layer to the top of the layer list to give prominence.

   ![Map keep panels less than 400m from Starbucks1](/img/cloud-native-workspace/tutorials/tutorial15_map_ooh_proximity_panels_less_than_400m.png)


7. To filter the panels by type, we can create a widget. Navigate to the Widgets tab and click on "New widget". Select the last Source we have created and create a new Category widget. Style according to the configuration below.

   ![Map Panel type category widget](/img/cloud-native-workspace/tutorials/tutorial15_map_ooh_proximity_panel_category_widget.png)

8. We will also need to see panel info when we click on it. Navigate to the interactions section and switch on interactions for the "Panels within 400m" layer. Configure as seen in the screenshot below

    ![Map Panel tooltip](/img/cloud-native-workspace/tutorials/tutorial15_map_ooh_proximity_panel_tooltip.png)

9.  Next we will perform the same for Starbucks locations, ie. create a layer with only the locations within 400m distance from a panel. To do this, we have run a custom query, as seen below:

    ```sql
    WITH starbucks AS (
        select * from (
            SELECT *, ROW_NUMBER() OVER(PARTITION BY geoid ORDER BY do_date DESC) as rn
            FROM `carto-demo-data.demo_tables.safegraph_coreplaces_starbucks_ny`
            WHERE ST_INTERSECTS(geom, ST_GEOGFROMTEXT('POLYGON((-74.0217027068138 40.71878617467263,-74.01135742664336 40.76296271079593,-73.96672010421752 40.82326631011446,-73.91943275928496 40.8004687826801,-73.94931256771086 40.76206069582457,-73.96792978048323 40.73763256552792,-73.95601004362105 40.71923951008711,-73.95529121160506 40.64212814693562,-74.03532564640044 40.64323734371749,-74.0217027068138 40.71878617467263))'))
        )
        where rn = 1
    ),
    panels AS (
        SELECT ROW_NUMBER() OVER() as id, * FROM `carto-demo-data.demo_tables.newyork_newjersey_ooh_panels`
        WHERE ST_INTERSECTS(geom, ST_GEOGFROMTEXT('POLYGON((-74.0217027068138 40.71878617467263,-74.01135742664336 40.76296271079593,-73.96672010421752 40.82326631011446,-73.91943275928496 40.8004687826801,-73.94931256771086 40.76206069582457,-73.96792978048323 40.73763256552792,-73.95601004362105 40.71923951008711,-73.95529121160506 40.64212814693562,-74.03532564640044 40.64323734371749,-74.0217027068138 40.71878617467263))'))
    )
    SELECT  s.street_address, s.open_hours,ST_UNION_AGG(s.geom) AS geom
    FROM starbucks s, panels p
    WHERE ST_DWITHIN(p.geom, s.geom, 400)
    GROUP BY 1,2
    ```

    Rename the layer "Starbucks within 400m distance of a panel" and reorder the layer to place it as the second layer. Style as seen below.

    ![Map keep Starbucks less than 400m from a panel](/img/cloud-native-workspace/tutorials/tutorial15_map_ooh_proximity_starbucks_less_than_400m.png)


10. We will need to see Starbucks info when we hover over each one. Navigate to the interactions section and switch on interactions for the "Starbucks within 400m" layer. We will want to see basic address info when we hover over a Starbucks location. Configure as seen in the screenshot below

    ![Map Starbucks tooltip](/img/cloud-native-workspace/tutorials/tutorial15_map_ooh_proximity_starbucks_tooltip.png)

11. We already have our panels that are within 400m of Starbucks. But some panels are close to multiple Starbucks. Which Starbucks is the closest to each panel? Also what is the exact distance of panels to Starbucks, so that we can limit our selection based on a shorter distance?
    For that we will need to create another layer

    To do this, we have run the query below. Click on the "Add Source from..." button and select "Custom Query (SQL)".  Select "Type your own query" and then click on "Add Source". Once you view the SQL editor paste the following and run the query:

    ```sql
    WITH starbucks AS (
        select * from (
            SELECT *, ROW_NUMBER() OVER(PARTITION BY geoid ORDER BY do_date DESC) as rn
            FROM `carto-demo-data.demo_tables.safegraph_coreplaces_starbucks_ny`
            WHERE ST_INTERSECTS(geom, ST_GEOGFROMTEXT('POLYGON((-74.0217027068138 40.71878617467263,-74.01135742664336 40.76296271079593,-73.96672010421752 40.82326631011446,-73.91943275928496 40.8004687826801,-73.94931256771086 40.76206069582457,-73.96792978048323 40.73763256552792,-73.95601004362105 40.71923951008711,-73.95529121160506 40.64212814693562,-74.03532564640044 40.64323734371749,-74.0217027068138 40.71878617467263))'))
        )
        where rn = 1
    ),
    panels AS (
        SELECT ROW_NUMBER() OVER() as id, * FROM `carto-demo-data.demo_tables.newyork_newjersey_ooh_panels`
        WHERE ST_INTERSECTS(geom, ST_GEOGFROMTEXT('POLYGON((-74.0217027068138 40.71878617467263,-74.01135742664336 40.76296271079593,-73.96672010421752 40.82326631011446,-73.91943275928496 40.8004687826801,-73.94931256771086 40.76206069582457,-73.96792978048323 40.73763256552792,-73.95601004362105 40.71923951008711,-73.95529121160506 40.64212814693562,-74.03532564640044 40.64323734371749,-74.0217027068138 40.71878617467263))'))
    ),

    nclosest AS (
        SELECT ARRAY_AGG(
        STRUCT(
            s.geoid,
            s.geom,
            p.id,
            p.geom as pgeom,
            ST_DISTANCE(s.geom, p.geom) as distance
        ) ORDER BY ST_DISTANCE(s.geom, p.geom) LIMIT 6
    ) n
    FROM starbucks s, panels p
    GROUP BY s.geoid
    )

    SELECT
    geoid,
    distance,
    ST_MAKELINE([geom, pgeom]) as geom
    FROM nclosest, UNNEST(n)
    WHERE distance < 400
    ```

    Rename the layer "Panel distance to Starbucks" and reorder the layer to place as the third layer. Style the layer according to the config seen below.

    ![Map distance between panels and Starbucks](/img/cloud-native-workspace/tutorials/tutorial15_map_ooh_proximity_distances.png)


12. To filter by distance, we can create a widget. Navigate to the Widgets tab and click on "New widget". Select the latest source we have created and create a new histogram widget. Style according to the configuration below.

    ![Map distance widget](/img/cloud-native-workspace/tutorials/tutorial15_map_ooh_proximity_distance_widget.png)

13. We will also need to see distance info when we hover over each connection. Navigate to the interactions section and switch on interactions for the "Panel distance to Starbucks" layer. Configure as seen in the screenshot below

    ![Map distance tooltip](/img/cloud-native-workspace/tutorials/tutorial15_map_ooh_proximity_distance_tooltip.png)

14. Final step before we make our conclusions, as a basemap please use the Google "Dark matter", as it will allow us to explore the areas of most interest

    ![Map Google dark matter basemap](/img/cloud-native-workspace/tutorials/tutorial15_map_ooh_proximity_dark_matter_basemap.png)

15. As we can see in our map there are candidates spread across Manhattan and Brooklyn. There is a concentration of candidates in Midtown and Lower Manhattan. There are several insights we can draw from this map but let's focus on two examples:
    1) We can see that there are some key candidates close to Midtown East which can act as "Brand awareness" panels because of their close distance to numerous Starbucks in the area.

    ![Map insight 1](/img/cloud-native-workspace/tutorials/tutorial15_map_ooh_proximity_insight1.png)

    2) There are some panels at very close distances to Starbucks locations in the Meatpacking District, which can be used to drive traffic to those stores.

    ![Map insight 2](/img/cloud-native-workspace/tutorials/tutorial15_map_ooh_proximity_insight2.png)

14. Change the name of the map to "Selecting out-of-home advertising panels using proximity analysis "

15. Finally we can make the map public and share the link to anybody in the organization. For that you should go to “Share” on the top right corner and set the map as Public. For more details, see [Publishing and sharing maps](../../maps/publishing-and-sharing-maps).

    ![Map public map](/img/cloud-native-workspace/tutorials/tutorial15_map_ooh_proximity_public_sharelink.png)

16. Finally, we can visualize the result.

   <iframe width="800px" height="800px" src="https://gcp-us-east1.app.carto.com/map/a3e312cd-c231-415b-91ca-bb65ebaa91e2"></iframe>
