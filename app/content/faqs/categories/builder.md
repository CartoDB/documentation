## Builder

[What methods can I use to create a map layer?](#what-methods-can-i-use-to-create-a-map-layer)

[How can I run spatial analyses in Builder?](#how-can-i-run-spatial-analyses-in-builder)

---

<!-- Using level 5 headers to avoid the title being listed in the tree -->

##### What methods can I use to create a map layer? 
To add a data source to a map as a new layer you can either:

* Pick a table or tileset from one of your active connections to cloud data warehouses
* Add data resulting from applying a custom SQL Query. You can also leverage the SQL functions available in CARTO’s [Analytics Toolbox](https://docs.carto.com/carto-user-manual/maps/add-source/#custom-queries-using-the-analytics-toolbox).
* Importing data from a local or remote file. Right now we currently support GeoJSON and Shapefiles (in a zip package), and soon also CSV files.

---

##### How can I run spatial analyses in Builder? 
The SQL Query editor (accessible when adding a data source as a custom query) allows you to push SQL commands directly to your cloud data warehouse, supporting everything you have available in that platform (e.g. BigQuery, Snowflake, etc.). 

Additionally, you can also leverage the UDFs and store procedures that have been curated by us and which are part of the [Analytics Toolbox](https://docs.carto.com/carto-user-manual/maps/add-source/#custom-queries-using-the-analytics-toolbox).

In the coming months we will be adding more functionality into Builder in order to allow you to run spatial analysis with a click-based approach. 
