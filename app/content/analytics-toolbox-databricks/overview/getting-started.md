## Getting started

{{% bannerNote title="BETA" type="tip" %}}
The Analytics Toolbox for Databricks is in Beta stage and the API might be subject to changes in the future. 
{{%/ bannerNote %}}

The CARTO Analytics Toolbox for Databricks provides geospatial functionality through SQL to unlock Spatial Analytics. It is comprised of a set of `ST` functions organized in different modules based on the functionality they offer. 
These functions provide the foundation needed to work with geometries in Databricks.

There are two types of modules: _core_ modules, that are [open source](https://github.com/CartoDB/analytics-toolbox-databricks), and _advanced_ modules, only available with a CARTO account. 

The Analytics Toolbox is distributed as a JAR package, available and ready to be installed in your Databricks cluster directly from the Maven repository. See the [installation instructions](../installation) to get started.

Visit the [SQL Reference](../../sql-reference/overview) to see the full list of available functions.

{{% bannerNote title="NOTE" type="note" %}}
The CARTO Analytics Toolbox is only needed to work with geometries. Support for **H3 indexes** is provided natively by Databricks and CARTO and it doesn't require any additional installation.
{{%/ bannerNote %}}