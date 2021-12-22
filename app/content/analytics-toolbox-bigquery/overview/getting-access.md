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
If you are a CARTO customer and need access to the Analytics Toolbox in a different BigQuery region or wish to install the Analytics Toolbox on your own projects if your BigQuery datasets are [within a VPC](https://cloud.google.com/vpc-service-controls), please follow the [manual installation guide](#manual-installation).
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


### Manual Installation

The Analytics Toolbox is currently available in GCP's US and EU multi-regions, but it can also be installed manually in any GCP project in any region by using a package file provided by CARTO.

The CARTO Analytics Toolbox contains two packages:
* **core**: this is the public and open-source package. It contains all the core GIS functions that complement the GIS native functions available in BigQuery.
* **advanced**: this is a premium package. It contains advanced GIS functions to power high-level GIS analytics in BigQuery.

{{% bannerNote title="NOTE" type="note" %}}
This guide explains how to install the core package which is publicly available. If you are a CARTO customer and wish to access the **advanced** features, please contact support@carto.com.
{{%/ bannerNote %}}

We can divide the process into three steps: preparation, setup and installation. The setup must be done only the first time, then the installation must be done every time you want to install a new version of the packages.

In this guide we will use Google Cloud Shell to setup and install the toolbox.
Please open the [GCP console](https://console.cloud.google.com) and select the project to install the toolbox, then use the ">_" button (top right) to "Activate Cloud Shell".

<div style="text-align:center" >
<img src="/img/bq-analytics-toolbox/gcp-cloud-shell.png" alt="GCP Cloud Shell" style="width:100%">
</div>

#### Preparation

You will need a GCP project to install the Toolbox, as well as a storage bucket in the same project to store the JavasScript libraries needed. Users of the Toolbox will need permissions to read both the BigQuery dataset (where the functions and procedures will be installed) and the bucket in order to run the CARTO Analytics Toolbox.

We will set the project and bucket names as well as the [location](https://cloud.google.com/bigquery/docs/locations) where the toolbox will be created (should be the same as the bucket) as Cloud Shell environment variables:

* `TARGET_PROJECT`: Project id where the toolbox dataset will be created
* `TARGET_BUCKET`: Name of the bucket to store the JavasScript libraries needed by the Toolbox
  (please omit any protocol prefix like `gs://`)
* `TARGET_REGION`: Location of the BigQuery dataset that will be created to install the Analytics Toolbox

Set these variables by executing the following in Cloud Shell (after replacing the appropriate values):

```bash
export TARGET_PROJECT="<my-project>"
export TARGET_REGION="<my-region>"
export TARGET_BUCKET="<my-bucket>"
```

{{% bannerNote title="WARNING" type="warning" %}}
After a while without using the Cloud Shell you may need to reconnect it; if that happens, you will need to set the environment variables again.
{{%/ bannerNote %}}

#### Setup

This step is only required before the first installation. Activate the Cloud Shell in the target project and make sure the environment variables from the preparation step above are set.

Before starting the process make sure the target GCP project exists and that it is the correct one by executing the following:

```bash
# Check project existence
gcloud projects describe $TARGET_PROJECT
```

Then, create a BigQuery dataset named `carto`, where the Toolbox will be installed:

```bash
# Create dataset "carto"
bq mk --location=$TARGET_REGION --description="CARTO dataset" -d $TARGET_PROJECT:carto
```

#### Installation

To install the Analytics Toolbox in the `carto` dataset we will use the [this installation package](https://storage.googleapis.com/carto-analytics-toolbox-core/bigquery/carto-analytics-toolbox-core-bigquery-latest.zip) and follow the instructions below. Please note that this process should be repeated every time a new version of the Toolbox is available.

Access the Cloud Shell and set the environment variables as described in the preparation step above, then run the following commands:

```bash
# Download package
wget https://storage.googleapis.com/carto-analytics-toolbox-core/bigquery/carto-analytics-toolbox-core-bigquery-latest.zip
unzip carto-analytics-toolbox-core-bigquery-latest.zip

# Enter the directory (you may need to change the version)
cd carto-analytics-toolbox-core-bigquery-2021.12.16

# Prepare SQL code
sed -e 's!<BUCKET>!'"$TARGET_BUCKET"'!g'  modules.sql > modules_rep.sql

# Copy libs to bucket
gsutil -m cp -r libs/ gs://$TARGET_BUCKET/carto/

# Install the functions and procedures
bq --location=$TARGET_REGION --project_id=$TARGET_PROJECT query --use_legacy_sql=false --max_statement_results=10000 --format=prettyjson < modules_rep.sql
```

{{% bannerNote title="WARNING" type="warning" %}}
This will remove all the previous functions and procedures in the "carto" dataset.
{{%/ bannerNote %}}

#### Check the installed version

Execute the following in the BigQuery console, in the same project where the Toolbox was installed:

```sql
SELECT carto.VERSION_CORE();
```

You can also check all the installed routines (functions and procedures) with:

```sql
SELECT * FROM carto.INFORMATION_SCHEMA.ROUTINES;
```

**Congratulations!** you have successfully installed the CARTO Analytics Toolbox in your BigQuery project. Now you can start [using the functions](/analytics-toolbox-bigquery/sql-reference/overview/).

<style>
.highlight {
  position: relative;
}
.highlight-copy-btn {
  position: absolute;
  top: 7px;
  right: 7px;
  border: 0;
  border-radius: 4px;
  padding: 1px;
  font-size: 0.7em;
  line-height: 1.8;
  color: #fff;
  background-color: #777;
  min-width: 55px;
  text-align: center;
}
.highlight-copy-btn:hover {
  background-color: #666;
}
</style>
<script>
(function() {
  'use strict';

  if(!document.queryCommandSupported('copy')) {
    return;
  }

  function flashCopyMessage(el, msg) {
    el.textContent = msg;
    setTimeout(function() {
      el.textContent = "Copy";
    }, 1000);
  }

  function selectText(node) {
    var selection = window.getSelection();
    var range = document.createRange();
    range.selectNodeContents(node);
    selection.removeAllRanges();
    selection.addRange(range);
    return selection;
  }

  function addCopyButton(containerEl) {
    var copyBtn = document.createElement("button");
    copyBtn.className = "highlight-copy-btn";
    copyBtn.textContent = "Copy";

    var codeEl = containerEl.getElementsByClassName('language-sql')[0] || containerEl.getElementsByClassName('language-bash')[0];
    copyBtn.addEventListener('click', function() {
      try {
        var selection = selectText(codeEl);
        document.execCommand('copy');
        selection.removeAllRanges();

        flashCopyMessage(copyBtn, 'Copied!')
      } catch(e) {
        console && console.log(e);
        flashCopyMessage(copyBtn, 'Failed :\'(')
      }
    });

    containerEl.appendChild(copyBtn);
  }

  // Add copy button to code blocks
  var highlightBlocks = document.getElementsByClassName('highlight');
  Array.prototype.forEach.call(highlightBlocks, addCopyButton);
})();
</script>
