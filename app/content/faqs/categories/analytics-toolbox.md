## Analytics Toolbox

[What is CARTO’s Analytics Toolbox?](#what-is-cartos-analytics-toolbox)

[How can I use the functions available in the Analytics Toolbox?](#how-can-i-use-the-functions-available-in-the-analytics-toolbox)

[Can I use the Analytics Toolbox from the CARTO Data Warehouse connection?](#can-i-use-the-analytics-toolbox-from-the-carto-data-warehouse-connection)

[In the Analytics Toolbox for BigQuery, are there differences when using it from different GCP regions?](#in-the-analytics-toolbox-for-bigquery-are-there-differences-when-using-it-from-different-gcp-regions)

---

<!-- Using level 5 headers to avoid the title being listed in the tree -->

##### What is CARTO’s Analytics Toolbox?
CARTO’s Analytics Toolbox is a set of UDFs and Store Procedures to unlock Spatial Analytics directly on top of your cloud data warehouse platform. It is organized in a set of modules based on the functionality they offer. 

---
##### How can I use the functions available in the Analytics Toolbox?
You can use the functions in the Analytics Toolbox via CARTO Builder, SQL Notebooks, and directly in the console of your cloud data warehouse platform. 

To learn how to get access to the toolbox please visit the Documentation page for the:
- [Analytics Toolbox for BigQuery](https://docs.carto.com/analytics-toolbox-bq/overview/getting-access/#access-from-the-new-carto-workspace) (also valid for the CARTO Data Warehouse)
- [Analytics Toolbox for Snowflake](https://docs.carto.com/analytics-toolbox-snowflake/overview/getting-started/)
- [Analytics Toolbox for Redshift](https://docs.carto.com/analytics-toolbox-redshift/overview/getting-started/)
- [Analytics Toolbox for Databricks](https://docs.carto.com/analytics-toolbox-databricks/overview/getting-started/)

 In CARTO Builder, you can use the Analytics Toolbox functions in your custom SQL queries when [adding a source](https://docs.carto.com/carto-user-manual/maps/add-source/#custom-queries-using-the-analytics-toolbox) to your map.

---
##### Can I use the Analytics Toolbox from the CARTO Data Warehouse connection?
Yes, you can. CARTO Data Warehouse connection works under the hood as a connection to Google BigQuery in the same region in which you have provisioned your CARTO organization account. Follow the same guides and reference for the [Analytics Toolbox for BigQuery](https://docs.carto.com/analytics-toolbox-bigquery/overview/getting-access/) to use this functionality from your CARTO Data Warehouse connection.

---
##### In the Analytics Toolbox for BigQuery, are there differences when using it from different GCP regions?
Yes, there are. The projects in which we install the Analytics Toolbox functions vary depending on the [cloud region](https://cloud.google.com/compute/docs/regions-zones). In this [section of the documentation](https://docs.carto.com/analytics-toolbox-bigquery/overview/regions-table/) you can find the BigQuery Project name for the Analytics Toolbox depending on the cloud region to which you have created a connection between CARTO and BigQuery.

For BigQuery connections in US and EU regions, we recommend to use the Analytics Toolbox we have enabled in US multi-region (project name: carto-un) and EU multi-region (project name: carto-un-eu)

Note that this also applies if you want to leverage the Analytics Toolbox from your CARTO Data Warehouse connection.
