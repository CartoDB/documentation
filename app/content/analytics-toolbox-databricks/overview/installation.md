### Installation

To install the CARTO Analytics Toolbox in your Databricks cluster, follow the instructions below on your Databricks workspace UI: 

* Click on _Compute_
* Select the cluster where you want to install the Analytics Toolbox
* Open the _Libraries_ tab
* Click on _Install new_
* Select _Maven_ as Library Source
<!-- TO DO: Review this part -->
* Introduce these coordinates: `com.carto.analytics-toolbox_X.Y:1.0.0`
* Alternatively, you can click on _Search Packages_ and look for `carto.analytics-toolbox`; select the latest version and click on _Select_
* Click _Install_ to finish the process. Dependencies of the package will be installed transitively


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