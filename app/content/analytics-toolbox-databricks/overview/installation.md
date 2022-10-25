### Installation

To install the CARTO Analytics Toolbox in your Databricks cluster, follow the instructions below on your Databricks workspace UI:

* Click on _Compute_
* Select the cluster where you want to install the Analytics Toolbox
* Open the _Libraries_ tab
* Click on _Install new_
* Select _Maven_ as Library Source
* Click on _Search Packages_, select _Maven Central_ and look for `carto.analyticstoolbox`; select the latest version and click on _Select_
<div style="text-align:center" >
  <img src="/img/databricks-analytics-toolbox/databricks-install-at.png" alt="Install CARTO Analytics Toolbox in your cluster" style="width:100%">
</div>

* Click _Install_ to finish the process. Dependencies of the package will be installed transitively

Once the package is installed, you need to create the SQL UDFs functions in your cluster, open a SQL console and run [this script](https://storage.googleapis.com/carto-analytics-toolbox-core/databricks/modules.sql):

<div style="text-align:center" >
  <img src="/img/databricks-analytics-toolbox/databricks-install-udf.png" alt="SQL UDFs functions in your cluster" style="width:100%">
</div>

{{% bannerNote title="WARNING" type="tip" %}}
Running the script above will install the functions in your Databrick's `default` database.
{{%/ bannerNote %}}

As mentioned in the note above, not qualified function names will install them in your Databrick's `default` database. If you need your UDF's in a different database, you will need to qualify the function name, for example:

```sql
CREATE OR REPLACE FUNCTION your_db.st_area as 'com.carto.analyticstoolbox.core.ST_Area';
```

Take this into account when [creating a Databricks connection](../../../carto-user-manual/connections/creating-a-connection/#connection-to-databricks) in your CARTO Workspace, as it will require to have the UDF's installed in the database that you use for the connection.

### Connection parameters

In order to leverage the spatial functionality provided by the Analytics Toolbox, you need to create a Databricks connection in your CARTO account. See [this section](../../../carto-user-manual/connections/creating-a-connection/#connection-to-databricks) of the user manual to get more information about creating connections.

The connection parameters need to be obtained from the Databricks workspace UI:

Click on _Compute_. Select your cluster and see the _Advanced options_. Open the _JDBC/ODBC_ tab to find the following parameters:

* **Server Hostname**. i.e: `adb-XXXXXXXXXXXXXXXX.X.azuredatabricks.net`
* **Port**. i.e.: `443`
* **HTTP Path**. i.e.: `sql/protocolv1/o/XXXXXXXXXXXXXXXX/0000-0000000-aaaaaaaaa`

To get a **Token**, click on _Settings > User Settings_.
* Make sure you are on the _Access Tokens_ tab and click on _Generate New Token_.
* Give the token a name and set the lifetime for it.
* Click on _Generate_ and you will have the option to copy your token. That is the only time you will be able to see it.