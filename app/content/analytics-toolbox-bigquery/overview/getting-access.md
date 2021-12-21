## Getting access

### Access from the new CARTO Workspace

{{% bannerNote title="WARNING" type="warning" %}}
If you are still using the previous version of the CARTO platform and wish to get access to the Analytics Toolbox through the classic CARTO Dashboard, please refer to [this section](#access-from-the-carto-dashboard).
{{%/ bannerNote %}} 

To get access to the entire collection of modules of the CARTO Analytics Toolbox (both core and advanced) you will need:

   * A CARTO account. If you still don't have one, you can create a trial account [here](https://app.carto.com/signup). 
   * A Google Cloud Platform account. Find [here](https://cloud.google.com/gcp/getting-started) more information about how to get one.

#### Getting access for a Google user

Access to the Analytics Toolbox for BigQuery is granted to all Google users that create a connection to BigQuery from the CARTO Workspace using OAuth. You can find step-by-step instructions on how to create a connection with BigQuery [here](/carto-user-manual/connections/creating-a-connection/#connection-to-bigquery).

<div style="text-align:center" >
<img src="/img/bq-analytics-toolbox/create_connection_bq_oauth.png" alt="Creating a connection with BigQuery from the CARTO Workspace" style="width:100%">
</div>

Once you create a connection, your user will have the necessary permissions to run all the functions and procedures of the Analytics Toolbox for BigQuery available in the `carto-un` and `carto-un-eu` projects, under the `carto` dataset, directly from the BigQuery console. These projects are deployed in the US and EU multi-regions, respectively, and you may choose one or the other depending on the location of your data. 

#### Getting access for a Service Account

Access to the Analytics Toolbox for BigQuery is granted to every service account that is used to create a connection to BigQuery from the CARTO Workspace (Service Account option). You can find step-by-step instructions on how to create a connection with BigQuery [here](/carto-user-manual/connections/creating-a-connection/#connection-to-bigquery).

<div style="text-align:center" >
<img src="/img/bq-analytics-toolbox/create_connection_bq_sa.png" alt="Creating a connection with BigQuery from the CARTO Workspace" style="width:100%">
</div>

These service accounts will have the necessary permissions to run all the functions and procedures of the Analytics Toolbox for BigQuery available in the `carto-un` and `carto-un-eu` projects, under the `carto` dataset. These projects are deployed in the US and EU multi-regions, respectively, and you may choose one or the other depending on the location of your data. 

#### Running the Analytics Toolbox

The Analytics Toolbox can be run from:

* your BigQuery console, after creating an OAuth connection to BigQuery from the Workspace.
* any BigQuery client, authenticated using a Service Account that has been previously used to create a connection to BigQuery from the Workspace. 
* directly from the Workspace, by:
  * Creating tilesets from the Data Explorer following [this guide](/analytics-toolbox-bq/guides/creating-and-visualizing-tilesets/#from-the-carto-workspace).
  * Creating custom SQL layers in Builder following [this guide](/analytics-toolbox-bq/guides/running-queries-from-builder/).

{{% bannerNote title="CONTACT SUPPORT" type="info" %}}
Please contact [support@carto.com](mailto:support@carto.com) if you are a CARTO customer and you:

* need access to the Analytics Toolbox in a different region.
* wish to install the Analytics Toolbox on your own projects if your BigQuery datasets are [within a VPC](https://cloud.google.com/vpc-service-controls).
{{%/ bannerNote %}} 


### Access from the CARTO Dashboard

If you are using the previous version of the CARTO platform (CARTO Dashboard) you can also get access to the Analytics Toolbox for BigQuery. However, for the best experience we strongly recommend its usage from the the newest version of the platform (CARTO Workspace).

Access to the Analytics Toolbox for BigQuery is granted to every CARTO account when adding a new connection to BigQuery from your CARTO Dashboard. Please refer to the [_Connecting to BigQuery_](#connecting-to-bigquery) section for step-by-step instructions.

Upon creating a new connection to BigQuery, the email address associated with your CARTO account will be granted access to the Analytics Toolbox. For that to work successfully, this email address should be the same as the one you use to log into your BigQuery. This happens automatically when you sign in to CARTO using your Google Account.

Once this access is granted, you can call any of the Analytics Toolbox functions or procedures available in the `bqcarto` (US multi-region) and `bqcartoeu` (EU multi-region) projects directly from your BigQuery console. 


##### Connecting to BigQuery

CARTO connects to BigQuery and runs some queries for actions such as listing projects, datasets and tables or publishing maps on the web.

This connection can be established using your GCP account via **OAuth** authentication or using a Google Cloud **service account**. The account or service account that you choose to create the connection should have the permissions described [here](#required-permissions).

To create a connection with BigQuery from the CARTO Dashboard, go to _Data_, click on _Your Connections_ and create a _New connection_. 

![New Connection](/img/bq-analytics-toolbox/overview-new-connection.png)

From the list of available connections, choose BigQuery and complete the connection steps. If you choose the _Service Account_ option, it will ask you to upload a service account key in JSON format. 

Now you can go to your [BigQuery console](https://console.cloud.google.com/bigquery) and check that you have access to the Analytics Toolbox. Running this query should return the Tiler module version.

```sql
SELECT bqcarto.tiler.VERSION()
```
If you get a permission error, please make sure that your account's email address matches your Google Account and create the BigQuery connection again. If you still can't access it, get in touch at [support@carto.com](mailto:support@carto.com)

{{% bannerNote title="tip" %}}
The project `bqcarto` is deployed in GCP's US multi-region. If you need to use the Analytics Toolbox from GCP's EU multi-region, use `bqcartoeu` instead. Learn more about BigQuery locations [here](https://cloud.google.com/bigquery/docs/locations).
{{%/ bannerNote %}}

##### Required permissions

Please make sure that your account has the `bigquery.jobs.list` permission on your project. This is needed to get metadata about the execution of the Analytics Toolbox procedures.

Additionally, the following predefined roles need to be granted to your account or service account:

* **BigQuery Data Viewer** (`bigquery.dataViewer`) role for visualizing your tilesets privately from the Map Viewer or in a custom application.
* **BigQuery Data Owner** (`bigquery.dataOwner`) role for changing permission on the tilesets from the Map Viewer. 
  * This is needed for publishing maps with tileset layers on the web, available to anyone with the link. That means editing the tileset's permissions to grant CARTO APIs reading access to the tileset. 
  * This role is also required for unpublishing a public map. 
  * Learn more about creating public maps out of tilesets [here](/analytics-toolbox-bq/guides/creating-and-visualizing-tilesets/#from-the-carto-dashboard-legacy).
* **BigQuery Job User** (`bigquery.jobUser`) role for listing your projects, datasets and tilesets in the Dashboard.
* **BigQuery Read Session User** (`bigquery.readSessionUser`) role for importing data from BigQuery as tables into CARTO's embedded database.

Take a look at the BigQuery [documentation](https://cloud.google.com/bigquery/docs/access-control#bq-permissions) for more information about roles and permissions.


##### Deployment options

The Analytics Toolbox is currently available in GCP's US (`bqcarto`) and EU (`bqcartoeu`) multi-regions. As an example, the following queries should return the version number for the Tiler module for each region.

```sql
SELECT bqcarto.tiler.VERSION() -- US multi-region
SELECT bqcartoeu.tiler.VERSION() -- EU multi-region
```

If you need access to the Analytics Toolbox in a different region or install it on your own projects if your BigQuery datasets are [within a VPC](https://cloud.google.com/vpc-service-controls), please get in touch at [support@carto.com](mailto:support@carto.com).


### Free access to the core modules

If you are not a CARTO customer you can still use the **core** modules of the Analytics Toolbox. These modules are available to all BigQuery authenticated users through the `carto-os` and `carto-os-eu` projects. These projects are deployed in the US and EU multi-regions, respectively, and you may choose one or the other depending on the location of your data.