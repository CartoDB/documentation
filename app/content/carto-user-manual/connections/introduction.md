## Introduction

The CARTO Workspace includes functionalities for registering and managing connections to your data warehouse(s) of choice. Once you have registered a connection, you will then be able to perform different operations with the available data, like performing advanced spatial analysis with CARTO's Analytics Toolbox or creating stunning maps in Builder.

Currently we support connectivity to the following data warehouses: **Google BigQuery, Snowflake, Amazon Redshift, Databricks** and **PostgreSQL**.

{{% bannerNote type="note" title="Note"%}}
##### When I connect to a data warehouse, do you copy or store any data?
No, your connection allow us to perform queries against your data on your behalf, and the results are either stored again in your data warehouse or rendered in the client, as visible maps. CARTO being fully cloud native means no storage needs, less security concerns and no need for data replication or complex ETL processing.
{{%/ bannerNote %}}

In the Connections section of the Workspace, you can access the list of your current connections. If you haven’t registered a connection yet, you will see the following page:

![Connections module](/img/cloud-native-workspace/connections/the_connections_the_cartodw.png)

To manage the connections to your data warehouse(s), learn how to:

- Create new connection [guide](../../connections/creating-a-connection)
- Edit a connection [guide](../../connections/editing-a-connection)
- Share a connection [guide](../../connections/sharing-a-connection)
- Delete a connection [guide](../../connections/deleting-a-connection)

