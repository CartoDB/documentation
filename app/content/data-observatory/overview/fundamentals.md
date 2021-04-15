## Main concepts

The Data Observatory is a spatial data platform enabling CARTO users to access and enrich their own data with thousands of external spatial datasets from curated public and premium sources. In this section we will describe the internal components of the Data Observatory, allowing you to get a better understanding on how to access it across the different CARTO interfaces.

### Dataset

A dataset is the equivalent to a data product. It is the licensable entity for which the end-user holds a subscription. For example, [MBI’s Consumer Profiles - Spain (Census Sections)](https://carto.com/spatial-data-catalog/browser/dataset/mbi_consumer_pr_28142a94/) is a dataset, while [MBI’s Consumer Spending - Spain (Census Sections)](https://carto.com/spatial-data-catalog/browser/dataset/mbi_consumer_sp_3926ab3a/) is another dataset. 
The [Spatial Data Catalog](http://www.carto.com/data) offers a list of all datasets available via the Data Observatory.
Each dataset has a unique identifier which should be used to access the data in different interfaces across the CARTO stack. 

![Data Observatory dataset unique identifier](/img/data-observatory/do_unique_id.png)

A dataset is composed of two separate tables: the Data table and the Geography table, which can be joined by their shared field _geoid_, as depicted in the diagram below:

![Data Observatory dataset unique identifier](/img/data-observatory/do_data_geography_tables.png)

This operation is most of the times managed automatically by CARTO interfaces (eg. Builder, CARTOframes, etc.); but it should be carried out manually by the user when a Dataset is accessed directly via the user's data warehouse connected to CARTO.

#### Data vs Geography tables

The Data table contains all the variables of the dataset except those associated with the Geography (i.e. data defining the spatial aggregation in the Dataset). Note that in the Data table there can be more than one record associated with one specific Geography (e.g. different daily aggregations for the same zip code).

The Geography table contains the data for each unique geometry (e.g. point, polygon, line).

As mentioned above, the data and geography tables can be joined by the `geoid`. This operation is most of the times managed automatically by CARTO interfaces (eg. Builder, CARTOframes, etc.), but it should be carried out manually by the user when a Dataset is accessed directly via the user's data warehouse connected to CARTO.



