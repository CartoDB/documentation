## Workspace

<!-- Using level 5 headers to avoid the title being listed in the tree -->

##### What cloud data warehouses can I use with CARTO?
CARTO's new platform is designed to give you a fully cloud native experience, allowing you to run CARTO on top of your leading cloud data warehouse platform of choice ((i.e. Google BigQuery, Snowflake, AWS Redshift, and any PostgreSQL-based data warehouse platform). 

##### What happens if I do not have any cloud data warehouse platform to connect?
For users who do not have any cloud data warehouse platform to which they want to connect CARTO, we are offering cloud storage and computing resources in what we call the CARTO Data Warehouse. A CARTO Data Warehouse connection is offered by default with your CARTO subscription. 

##### Can I import geospatial files into CARTO’s new platform? 
Yes, at the moment you can import both local or remote (via url) Shapefiles or GeoJSON files. In the coming weeks, we will add support to CSV files. You have more details available in the corresponding section of our [User Manual](https://docs.carto.com/carto-user-manual/data-explorer/importing-data/).

##### What is a tileset, and when should I create one?
A tileset is a set of vector data broken up into a uniform grid of square tiles, and it is a lightweight data format for storing large geospatial vector data and their attributes. Each individual tile is a row in a table, with the tile coordinates and the encoded [MVT](https://docs.mapbox.com/vector-tiles/specification/) stored in different columns. Tilesets are cacheable and load quickly, which make them a great solution to process and visualize large datasets of millions or even billions of rows. Learn more about them [here](https://docs.carto.com/analytics-toolbox-bq/overview/tilesets/)

Note that creating tilesets is currently only available for data accessible via Google BigQuery and CARTO Data Warehouse connections.
