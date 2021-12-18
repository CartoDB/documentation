## Creating a connection

To create a new connection follow these steps:

1. If you already have existing connections, click the *New connection* button. If you haven't created any connections yet, follow step 2.
2. Select your data warehouse: BigQuery, PostgreSQL, Redshift, Snowflake, etc.
3. Click the *Setup connection* button, or the *Connect using a service account* button if you are connecting to BigQuery.
4. Enter the connection parameters and credentials. You need to enter the connection parameters such as the server, username, password, or provide a service account, depending on the type of connector.

The following screen shows the connection setup options for Google Cloud BigQuery:

![Connection setup with BigQuery](/img/cloud-native-workspace/connections/the_connections_bigquery_parameters.png)

After you have provided the connection parameters, click *Connect*. Then you will see the list of your current connections:

![Successful connection](/img/cloud-native-workspace/connections/the_connections_connection_successful.png)

Once your connection is created, you can create maps using datasets from your data warehouse (navigating to the  *Data Explorer* ).

In the next sections we show how to configure connections to the supported cloud data wharehouses.

### Connection to BigQuery

CARTO uses access credentials to connect to BigQuery in order to run queries on your behalf.
You can use features of CARTO directly by using the BigQuery console through the CARTO Analytics Toolbox, or you can use the CARTO Workspace to launch the different processes, like tileset generation.

We will use a Google Cloud Service Account for other operations such as exploring your projects and fetching data for visualization.

When you access BigQuery, the billing account associated with the selected billing project will be charged. Unless you have a flat-rate pricing agreement with Google, we recommend you configure specific limits in BigQuery to avoid any unexpected charges.

When you select the BigQuery connector in the *New connection* dialog, you will see the following page:

![BigQuery Connection](/img/cloud-native-workspace/connections/the_connections_bigquery_first.png)

Click the *Connect using a service account* button. You will see the form where you need to provide your connection parameters:

- **Name** for your connection: You can register different connections with the BigQuery connector. You can use the name to identify the different connections.
- **Service account key file** in JSON format. Please read the following instructions to create a <a href="https://cloud.google.com/iam/docs/creating-managing-service-accounts" target="_blank">service account</a> and a service account <a href="https://cloud.google.com/iam/docs/creating-managing-service-account-keys" target="_blank">key file</a>. We will use this service account to list tilesets, visualize them privately, and grant publishing permissions. Be sure that the service account has <a href="https://cloud.google.com/iam/docs/understanding-roles#bigquery-roles" target="_blank">BigQuery Data Owner</a> (bigquery.dataOwner) and <a href="https://cloud.google.com/iam/docs/understanding-roles#bigquery-roles" target="_blank">BigQuery Job User</a> (bigquery.jobUser). Read our <a href="https://docs.carto.com/analytics-toolbox-bq/overview/getting-started/" target="_blank">documentation</a> if you want to learn about the specific permissions CARTO requires.
- **Billing project**: having entered the previous parameters, a selector for choosing the billing project will be enabled, enabling CARTO to run queries using your service account.

![BigQuery connection parameters](/img/cloud-native-workspace/connections/the_connections_bigquery_the_parameters.png)

Once you have entered the parameters, you can click the *Connect* button. CARTO will try to connect to your BigQuery server. If everything is OK, your new connection will be registered.

### Connection to PostgreSQL

You can use CARTO with your data in a PostgreSQL-compatible database, including Google Cloud SQL, Amazon Aurora & RDS, and Azure Database for PostgreSQL.

If you want to create a connection to your PostgreSQL server, you need to select the PostgreSQL connector in the *New connection* dialog. After you select the connector click on the *Setup connection* button.

![Connection setup with PostgreSQL](/img/cloud-native-workspace/connections/the_connections_postgres_first.png)

These are the parameters you need to provide:

- **Name** for your connection: You can register different connections with the PostgreSQL connector. You can use the name to identify the connections.
- **Server**: DNS name or IP address for your PostgreSQL server.
- **Username**: Name of the user account.
- **Password**: Password for the user account.
- **Database**: Database your connection will use.
- **Port**: TCP port where your server is listening for connections.

![Connection parameters with PostgreSQL](/img/cloud-native-workspace/connections/the_connections_postgres_parameters.png)

Once you have entered the parameters, you can click the *Connect* button. CARTO will try to connect to your PostgreSQL server. If everything is OK, your new connection will be registered.

### Connection to Amazon Redshift

You can use CARTO with your data in an Amazon Redshift data warehouse.

If you want to create a connection to your Redshift data warehouse, you need to select the Redshift connector in the *New connection* dialog. After you select the connector click the *Setup connection* button.

![Connection setup with Redshift](/img/cloud-native-workspace/connections/the_connections_redshift_first.png)

These are the parameters you need to provide:

- **Name** for your connection: You can register different connections with the Redshift connector. You can use the name to identify the connections.
- **Cluster**: DNS name or IP address for your Redshift cluster.
- **Username**: Name of the user account.
- **Password**: Password for the user account.
- **Database**: Database your connection will use.
- **Port**: TCP port where your cluster is listening for connections.

![Connection parameters with Redshift](/img/cloud-native-workspace/connections/the_connections_redshift_parameters.png)

Once you have entered the parameters, you can click the *Connect* button. CARTO will try to connect to your Redshift cluster. If everything is OK, your new connection will be registered.

### Connection to Snowflake

You can use CARTO with your data in a Snowflake data warehouse.

If you want to create a connection to your Snowflake data warehouse, you need to select the Snowflake connector in the *New connection* dialog. After you select the connector click the *Setup connection* button.

![Connection setup with Snowflake](/img/cloud-native-workspace/connections/the_connections_snowflake_first.png)

These are the parameters you need to provide:

- **Name** for your connection: You can register different connections with the Snowflake connector. You can use the name to identify the connections.
- **Database**: Database your connection will use.
- **Username**: Name of the user account.
- **Password**: Password for the user account.
- **Account**: Hostname for your account in the following format: `<account_name>.snowflakecomputing.com`.
- **Warehouse**: Default warehouse that will run your queries. This parameter is optional.

Currently we only support username/password authentication using the internal Snowflake authenticator. We don’t support federated authentication/SSO, OAuth, or SAML 2.0 compliant identity providers. We will add support to this other authentication methods in the months to come.

![Connection parameters with Snowflake](/img/cloud-native-workspace/connections/the_connections_snowflake_parameters.png)

Once you have entered the parameters, you can click the *Connect* button. CARTO will try to connect to your Snowflake account. If everything is OK, your new connection will be registered.

### Connection to Databricks

{{% bannerNote title="WARNING" type="tip" %}}
This connection is in BETA.

Please verify you've already [installed](/analytics-toolbox-databricks/overview/installation) the CARTO analytics toolbox in your cluster before following these steps.
{{%/ bannerNote %}}

You can use CARTO with your data from [Databricks](https://databricks.com).

If you want to create a connection to your Databricks, you need to select the Databricks connector in the *New connection* dialog. After you select the connector click the *Setup connection* button.

![Connection setup with Databricks](/img/cloud-native-workspace/connections/the_connections_databricks_first.png)

A dialog will appear informing you that you first need to install carto.analyticstoolbox.core package. Click on *Got it!*  to confirm.

![Connection setup with Databricks](/img/cloud-native-workspace/connections/the_connections_databricks_connect(warning).png)

These are the parameters you need to provide:

- **Name** for your connection: You can register different connections with the Databricks connector. You can use the name to identify the connections.
- **Server**: Databricks cluster JDBC/ODBC server hostname.
- **HTTP Path**: Databricks cluster JDBC/ODBC compute resources URL.
- **Port**: TCP port (443).
- **Token**: Token for the user account.
- **Database**: Database your connection will use. This database need to be the one where the [CARTO Analytics Toolbox UDFs have been created](/analytics-toolbox-databricks/overview/installation/). 

Please visit the documentation of the Databricks [connection parameters](/analytics-toolbox-databricks/overview/installation/#connection-parameters) to get more information about how to obtain them.

![Connection setup with Databricks](/img/cloud-native-workspace/connections/the_connections_databricks_parameters.png)

Once you have entered the parameters, you can click the *Connect* button. CARTO will try to connect to your Databricks cluster. If everything is OK, your new connection will be registered.
