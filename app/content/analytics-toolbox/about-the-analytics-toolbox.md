## Overview

The CARTO Analytics Toolbox is a suite of functions and procedures to easily enhance the geospatial capabilities available in the different leading cloud data warehouses. 

It is currently available for Google BigQuery, Snowflake, Redshift, Databricks and PostgreSQL.

The Analytics Toolbox contains more than 100 advanced spatial functions, grouped in different modules. For most data warehouses, a core set of functions are distributed as [open source](https://github.com/CartoDB/carto-spatial-extension), while the most advanced functions (including vertical-specific modules such as retail) are distributed only to CARTO customers.

<div style="text-align:center" >
<img src="/img/analytics-toolbox/analytics-toolbox.png" alt="Analytics Toolbox modules overview, displaying core and advanced modules" style="width:100%">
</div>

## How does it work

Technically speaking, the CARTO Analytics Toolbox is a set of SQL UDFs and Stored Procedures that run natively within each data warehouse, leveraging their computational power and scalability and avoiding the need for time consuming ETL processes.

The functions can be executed directly from the CARTO Workspace or in your cloud data warehouse console and APIs, using SQL commands.

Here's an example of a query that returns the compact H3 cells for a given region, using Analytics Toolbox functions such as `H3_POLYFILL()` or `H3_COMPACT()` from our H3 module. 

Check the documentation for each data warehouse (listed below) for a complete SQL reference, guides, and examples.

```SQL
WITH q AS (
  SELECT `carto-os`.carto.H3_COMPACT(
  `carto-os`.carto.H3_POLYFILL(geom,11)) as h3
  FROM `carto-do-public-data.carto.geography_usa_censustract_2019`
  WHERE geoid='36061009900'
) 

SELECT h3 FROM q, UNNEST(h3) as h3
```

<iframe width="100%" height="360px" src="https://gcp-us-east1.app.carto.com/map/2b5c899a-3b76-4335-a0ce-de62e525a4cc?bearing=270"></iframe>

## Supported Data Warehouses

#### Google BigQuery
Unlock advanced geospatial within Google Cloud. Find more information, guides, and examples here: 

- [Analytics Toolbox for BigQuery](/analytics-toolbox-bigquery/overview/getting-started/)

#### Snowflake
Get your Snowflake geospatial capabilities to the next level, no matter what cloud you use. Find more information, guides, and examples here:

- [Analytics Toolbox for Snowflake](/analytics-toolbox-snowflake/overview/getting-started/)

#### Amazon Redshift
Combine the power of Redshift with the geospatial capabilities of CARTO. Find more information, guides, and examples here:

- [Analytics Toolbox for Redshift](/analytics-toolbox-redshift/overview/getting-started/)

#### Databricks
Use CARTO Analytics Toolbox natively in Databricks. Find more information, guides, and examples here:

- [Analytics Toolbox for Databricks](/analytics-toolbox-databricks/overview/getting-started/)

#### PostgreSQL
Combine PostGIS with the CARTO Analytics Toolbox in your own PostgreSQL instance. Find more information, guides, and examples here:

- [Analytics Toolbox for PostgreSQL](/analytics-toolbox-postgres/overview/getting-started/)
