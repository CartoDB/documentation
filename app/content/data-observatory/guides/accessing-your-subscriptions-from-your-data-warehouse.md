## Accessing your subscriptions from your data warehouse

You can access your subscriptions directly from your data warehouses [connected to CARTO](/carto-user-manual/connections/creating-a-connection). This is currently supported for BigQuery and Snowflake; Redshift and Databricks support is coming soon. 

### Access in BigQuery

{{% bannerNote type="warning" title="warning"%}}
This option is only available after you have created a [connection to BigQuery](/carto-user-manual/connections/creating-a-connection/#connection-to-bigquery) from the Connections section.  
{{%/ bannerNote %}}

Go to your subscription's detail page in the Data Observatory section of the Data Explorer, then click on the _Access in_ button and select the _BigQuery_ option. 

<div style="text-align:center" >
<img src="/img/data-observatory/access-in-bq-menu-1.png" alt="Access in BigQuery from your subscription page." style="width:100%">
</div>

The following information will be displayed:

* Location of the data table in BigQuery, in the format `project.dataset.table`.
* Location of the geography table in BigQuery, in the format `project.dataset.table`.
* Example query to join the data and geography tables.

<div style="text-align:center" >
<img src="/img/data-observatory/access-in-bq-access-details.png" alt="Access details for BigQuery." style="width:100%">
</div>

{{% bannerNote title="TIP" type="tip" %}}
Remember that your subscription is composed of a data and a geography table that you need to join in order to work with the data (read more about it [here](../../overview/terminology/#dataset)). Please use the example query provided to get started.
{{%/ bannerNote %}}

If your dataset subscription is a geography, such as [Australia's States by CARTO](https://carto.com/spatial-data-catalog/browser/geography/cdb_state_6b52fa47/), then only one table location will be shown:

<div style="text-align:center" >
<img src="/img/data-observatory/access-in-bq-access-details-geo.png" alt="Access details for BigQuery when your subscription is a geography." style="width:100%">
</div>

{{% bannerNote type="warning" title="warning"%}}
All Data Observatory data is stored in BigQuery's US region. You can learn more about regions [here](https://cloud.google.com/bigquery/docs/locations). 
{{%/ bannerNote %}}

#### Permissions

You can use the provided access information (table locations and sample query) to query your Data Observatory subscriptions directly from BigQuery. To do so, you need to operate with BigQuery authenticated with the same credentials you have used to set up your BigQuery connection(s) in CARTO:
* If you have set up a connection of type OAuth (using the "Sign in with Google" option), you will be granted permissions to query your Data Observatory subscriptions using the BigQuery console while you are logged in with the same Google user. 
* If your have set up a connection using a Service Account instead, you will be granted permissions to query your Data Observatory subscriptions from any BigQuery client while you are logged in using such Service Account.

### Access in Snowflake

{{% bannerNote type="warning" title="warning"%}}
This option is only available after you have created a [connection to Snowflake](/carto-user-manual/connections/creating-a-connection/#connection-to-snowflake) from the Connections section.  
{{%/ bannerNote %}}

#### Requesting access

In order for you to access any of your Data Observatory subscriptions from Snowflake, the data first needs to be imported into your database. This import process is performed by our engineering team on a request basis. 

To request it, go to the subscription's page, click on the _Access in_ button and choose the _Snowflake_ option. 

<div style="text-align:center" >
<img src="/img/data-observatory/access-in-sf-menu.png" alt="Access in Snowflake from your subscription page." style="width:100%">
</div>

If you have several Snowflake connections, you will be asked to select one to perform this action:

<div style="text-align:center" >
<img src="/img/data-observatory/access-in-sf-choose-connection.png" alt="Choose connection to access your subscriptions in Snowflake." style="width:100%">
</div>

Finally, you will be asked to request access to the dataset from your Snowflake database. 

<div style="text-align:center" >
<img src="/img/data-observatory/access-in-sf-request.png" alt="Request to access your subscriptions in Snowflake." style="width:100%">
</div>

Once we receive your request, we will get in touch with you to coordinate the import process. The data will be imported into a schema called `CARTO` that will be created in the Snowflake database you have set up in your Snowflake connection.

{{% bannerNote type="note" title="note"%}}
If you would like to access more than one of your Data Observatory subscriptions from your Snowflake database, it is not necessary to request access for each of them individually, as we can import several datasets at once during the same process. 
{{%/ bannerNote %}}


#### Checking access details

Once we have imported your Data Observatory subscription into your Snowflake database, you can check its access details through the _Access in_ button, following the same steps described in the previous section. 

The following information will be displayed:

* Location of the data table in your Snowflake database, in the format `YOURDATABASE.CARTO.TABLE`.
* Location of the geography table in your Snowflake database, in the format `YOURDATABASE.CARTO.TABLE`.
* Example query to join the data and geography tables.

<div style="text-align:center" >
<img src="/img/data-observatory/access-in-sf-access-details.png" alt="Access details for Snowflake." style="width:100%">
</div>





