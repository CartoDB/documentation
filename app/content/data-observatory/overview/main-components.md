## Main components

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

* The Data table contains all the variables of the dataset except those associated with the Geography (i.e. data defining the spatial aggregation in the Dataset). Note that in the Data table there can be more than one record associated with one specific Geography (e.g. different daily aggregations for the same zip code).

* The Geography table contains the data for each unique geometry (e.g. point, polygon, line).

As mentioned above, the data and geography tables can be joined by the `geoid`. This operation is most of the times managed automatically by CARTO interfaces (eg. Builder, CARTOframes, etc.), but it should be carried out manually by the user when a Dataset is accessed directly via the user's data warehouse connected to CARTO.



### Variable

A variable is the most basic unit of information within a Dataset, which we also refer to as *column*, and as *feature* in the Data Science world. 

Each Dataset in the Data Observatory is composed of at least three variables, as by convention CARTO incorporates the `geoid` and `do_date` variables into any Dataset. The `geoid` is the unique identifier of the Geography associated to an individual record within the Data table (e.g. a specific zip code); and `do_date` is the date relevant to each record (as per `YYYY-MM-DD`).

Any variable in a Dataset has its own unique identifier, the Variable ID, which is used across CARTO interfaces to identify specific variables within a Dataset. For example, this ID is necessary to perform [Data Enrichments in CARTOframes](https://carto.com/developers/cartoframes/guides/Data-Observatory/#data-enrichment).


### Premium Datasets

It is a specific subset of the Datasets available via the Data Observatory which require the purchasing of a specific license so the user can access and work with the data. These premium datasets are normally products from data providers, such as Mastercard, Experian, SafeGraph, etc.

#### Extended license

For some Premium datasets, in order for the user to be able to access the data outside the CARTO platform, such as within the data warehouses environment (e.g. BigQuery, Snowflake, etc.), it is necessary to have an *extended license*. This license grants the user the rights to export and use the subscribed dataset in any other platform beyond CARTO. This type of license usually comes with a premium over the license with CARTO-only access.



### Public Datasets

The Public Datasets available via the Data Observatory are data products, usually from public sources. Anyuser with the Data Observatory enabled in their CARTO account can subscribe to these datasets at no additional cost.


### Subscriptions

An active end-user license granting access to a dataset during a specific period of time. A subscription in the Data Observatory can either be *In progress*, *Active* or *Expired*:

* **In progress** -- The user has requested a premium subscription via the Spatial Data Catalog. When a user requests access to a premium dataset, a member of our team gets in touch in order to provide all necessary details related to acquiring such data subscription.
* **Active** -- The user has an active license that grants access to that dataset during a specific period of time which ends on the expiration date. 
* **Expired** -- The dataset license has expired and needs to be renewed in order for the user to regain access to it. 

You can check the status of your subscriptions in the Subscription page of the CARTO dashboard.

![Data Observatory subscription status](/img/data-observatory/do_subscription_status.png)


### Spatial Data Catalog