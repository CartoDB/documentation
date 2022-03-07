## Terminology

The Data Observatory is a spatial data platform enabling CARTO users to access and enrich their own data with thousands of external spatial datasets from curated public and premium sources. In this section we will describe the terminology surrounding the Data Observatory to help you better navigate these documentation pages.

### Dataset

A dataset is the equivalent to a data product. It is the licensable entity for which the end-user holds a subscription. For example, [MBI’s Consumer Profiles - Spain (Census Sections)](https://carto.com/spatial-data-catalog/browser/dataset/mbi_consumer_pr_28142a94/) is a dataset, while [MBI’s Consumer Spending - Spain (Census Sections)](https://carto.com/spatial-data-catalog/browser/dataset/mbi_consumer_sp_3926ab3a/) is another dataset. 
The [Spatial Data Catalog](http://www.carto.com/data) offers a list of all datasets available via the Data Observatory.
Each dataset has a unique identifier which should be used to access the data in different interfaces across the CARTO stack. 

![Data Observatory dataset unique identifier](/img/data-observatory/carto2/do_unique_id.png)

A dataset is composed of two separate tables: the Data table and the Geography table, which can be joined by their shared field _geoid_, as depicted in the diagram below:

![Data Observatory tables](/img/data-observatory/carto2/do_data_geography_tables.png)

 Most of the times this operation is managed automatically by CARTO interfaces (eg. Builder, CARTOframes, etc.); but it should be carried out manually by the user [when a Dataset is accessed directly via the user's data warehouse connected to CARTO](../../guides/accessing-your-subscriptions-from-bigquery-aws-or-azure).

#### Data vs Geography tables

* The Data table contains all the variables of the dataset except those associated with the Geography (i.e. data defining the spatial aggregation in the Dataset). Note that in the Data table there can be more than one record associated with one specific Geography (e.g. different daily aggregations for the same zip code).

* The Geography table contains the data for each unique geometry (e.g. point, polygon, line).

As mentioned above, the data and geography tables can be joined by the `geoid`. Most of the times this operation is managed automatically by CARTO interfaces (eg. Builder, CARTOframes, etc.); but it should be carried out manually by the user [when a Dataset is accessed directly via the user's data warehouse connected to CARTO](../../guides/accessing-your-subscriptions-from-bigquery-aws-or-azure).



### Variable

A variable is the most basic unit of information within a Dataset, which we also refer to as *column*, and as *feature* in the Data Science world. 

Each Dataset in the Data Observatory is composed of at least three variables, as by convention CARTO incorporates the `geoid` and `do_date` variables into any Dataset. The `geoid` is the unique identifier of the Geography associated to an individual record within the Data table (e.g. a specific zip code); and `do_date` is the date relevant to each record (as per `YYYY-MM-DD`).

Any variable in a Dataset has its own unique identifier, the Variable ID, which is used across CARTO interfaces to identify specific variables within a Dataset. For example, this ID is necessary to perform [Data Enrichments in CARTOframes](https://carto.com/developers/cartoframes/guides/Data-Observatory/#data-enrichment).


### Premium Datasets

It is a specific subset of the Datasets available via the Data Observatory which require the purchasing of a specific license so the user can access and work with the data. These premium datasets are normally products from third-party data providers, such as Mastercard, Experian, SafeGraph, etc.

#### Extended license

For some Premium datasets, [in order for the user to be able to access the data outside the CARTO platform](../../guides/accessing-your-subscriptions-from-bigquery-aws-or-azure)., such as within the data warehouses environment (e.g. BigQuery, Snowflake, etc.), it is necessary to have an *extended license*. This license grants the user the rights to export and use the subscribed dataset in any other platform beyond CARTO. This type of license usually comes with a premium over the license with CARTO-only access.


### Public Datasets

The Public Datasets available via the Data Observatory are data products, usually from public sources. Any user with the Data Observatory enabled in their CARTO account can subscribe to these datasets at no additional cost.


### Subscriptions

An active end-user license granting access to a dataset during a specific period of time. A subscription in the Data Observatory can either be *In progress*, *Active* or *Expired*:

* **In progress** -- The user has requested a premium subscription via the Spatial Data Catalog. When a user requests access to a premium dataset, a member of our team gets in touch in order to provide all necessary details related to acquiring such data subscription.
* **Active** -- The user has an active license that grants access to that dataset during a specific period of time which ends on the expiration date. 
* **Expired** -- The dataset license has expired and needs to be renewed in order for the user to regain access to it. 

You can check the status of your subscriptions in the Subscription page of the CARTO dashboard.

![Data Observatory subscription status](/img/data-observatory/carto2/do_subscription_status.png)


### Spatial Data Catalog

The Spatial Data Catalog is a listing of every dataset that is available for subscription via CARTO’s Data Observatory, including both public and premium data. In the Catalog you will find, among others, a description of every dataset, its provider, the available countries with data coverage, the spatial and temporal aggregations of the data, the update frequency, the data dictionary (layout), a 10-row sample of the dataset and a preview map.

You will find the Spatial Data Catalog in the Data section of your CARTO dashboard. From there, you can subscribe to public datasets, request subscriptions to premium datasets and access data samples. Please visit the [Guides section](../../guides) for more details on how to perform each of these actions.

![Spatial Data Catalog](/img/data-observatory/carto2/spatial-data-catalog.png)


#### Data Categories

Every dataset of the Data Observatory belongs to a specific category. These categories serve as a filter in the Spatial Data Catalog so you can quickly find the data of interest to you. Here is a description of each of them: 

* **Demographics** -- Socio-demographic and socioeconomic characteristics of the population in a region, including age, gender, education level, migration background and ethnicity, marital status, average household income, employment rate, etc. These datasets are frequently delivered in the form of current year projections built upon the last census publication.

* **Human Mobility** -- Human Mobility data provides an aggregated view of population mobility patterns by processing data captured by telecom operators or location signals registered by SDKs installed in mobile apps.

* **Financial** -- Merchant and ATM transaction data anonymized and aggregated by leading banks and credit card companies. Credit card transaction insights allow decision-makers to equip themselves with a deep understanding of consumer trends.

* **Road Traffic** -- Data from vehicle routing apps and navigation systems allows users to analyze traffic patterns and commuter behavior. Location-based road traffic data can be used for multiple purposes including route optimization and retail planning.

* **Points of Interest** -- Location data about business establishments, restaurants, schools, attractions, and many more. Points of interest are classified per industry codes, categories, brands, and establishment names. They cover places from agriculture to tourism, through public administrations, retail places, and other industries.

* **Housing** -- Housing and Real Estate data provide insights on a parcel and cadastral property characteristics, purchase and rental prices, and historical market data to drive decisions in investment portfolios.

* **Environmental** -- Historical weather data, general climate statistics, weather forecasts and exposure to weather hazards can help discover the weather's influence in some activities and events and also allow risk prevention analysis.

* **Behavorial** -- Also called geosocial, these datasets are built using data from different social networks and defines audiences and segments of people by their interests and likeness. That can help companies target the right audience. 

* **Derived data** -- Datasets created from different sources, delivered in a common geographic support system curated by CARTO’s data scientists and providing an added value to the users. 

* **Covid-19** -- CARTO is trying to help governments, administrations, and businesses to make more informed decisions when adapting to the new status quo and optimising resources for the fastest possible recovery. This category allows all CARTO clients to access covid-19 related data to help overcome its impact. 

* **Boundaries** -- Boundaries for postal codes, administrative regions and statistical areas to help users define the different geographical areas.  