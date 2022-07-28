---
aliases:
    - /analytics-toolbox-bq/overview/getting-access/
---

## Getting access

### Access from CARTO Workspace

To get access to the entire collection of modules of the CARTO Analytics Toolbox (both core and advanced) you will need:

   * A CARTO account. If you still don't have one, you can create a trial account [here](https://app.carto.com/signup).
   * A Google Cloud Platform account. Find [here](https://cloud.google.com/gcp/getting-started) more information about how to get one.

#### Getting access for a Google user

Access to the Analytics Toolbox for BigQuery is granted to all Google users that create a connection to BigQuery from the CARTO Workspace using OAuth. You can find step-by-step instructions on how to create a connection with BigQuery [here](/carto-user-manual/connections/creating-a-connection/#connection-to-bigquery).

<div style="text-align:center" >
<img src="/img/bq-analytics-toolbox/create_connection_bq_oauth.png" alt="Creating a connection with BigQuery from the CARTO Workspace" style="width:100%">
</div>

Once you create a connection, your user will have the necessary permissions to run all the functions and procedures of the Analytics Toolbox for BigQuery directly from the BigQuery console. They will be available in a specific project depending on the region of your BigQuery account and always under the `carto` dataset. For example, in the US and EU multi-regions, the analytics toolbox functions are available in the `carto-un` and `carto-un-eu` projects respectively. Please check the [full list of projects](../regions-table) for the different cloud regions in order to choose the optimal one depending on the location of your data.


#### Getting access for a Service Account

Access to the Analytics Toolbox for BigQuery is granted to every service account that is used to create a connection to BigQuery from the CARTO Workspace (Service Account option). You can find step-by-step instructions on how to create a connection with BigQuery [here](/carto-user-manual/connections/creating-a-connection/#connection-to-bigquery).

<div style="text-align:center" >
<img src="/img/bq-analytics-toolbox/create_connection_bq_sa.png" alt="Creating a connection with BigQuery from the CARTO Workspace" style="width:100%">
</div>

These service accounts will have the necessary permissions to run all the functions and procedures of the Analytics Toolbox for BigQuery available in a specific project depending on the region of your BigQuery account and always under the `carto` dataset. For example, in the US and EU multi-regions, the analytics toolbox functions are available in the `carto-un` and `carto-un-eu` projects respectively. Please check the [full list of projects](../regions-table) for the different cloud regions in order to choose the optimal one depending on the location of your data.


#### Running the Analytics Toolbox

The Analytics Toolbox can be run from:

* your BigQuery console, after creating an OAuth connection to BigQuery from the Workspace.
* any BigQuery client, authenticated using a Service Account that has been previously used to create a connection to BigQuery from the Workspace. 
* directly from the Workspace, by:
  * Creating tilesets from the Data Explorer following [this guide](/analytics-toolbox-bigquery/guides/creating-and-visualizing-tilesets/#from-the-carto-workspace).
  * Creating custom SQL layers in Builder following [this guide](/analytics-toolbox-bigquery/guides/running-queries-from-builder/).
  * Enriching your data with Data Observatory subscriptions following [this guide](/carto-user-manual/data-explorer/enriching-data/). 

{{% bannerNote title="CONTACT SUPPORT" type="info" %}}
If you are a CARTO customer and need access to the Analytics Toolbox in a different BigQuery region or wish to install the Analytics Toolbox on your own projects if your BigQuery datasets are [within a VPC](https://cloud.google.com/vpc-service-controls), please follow the [manual installation guide](#manual-installation).
{{%/ bannerNote %}}


### Free access to the core modules

If you are not a CARTO customer you can still use the **core** modules of the Analytics Toolbox. These modules are available to all BigQuery authenticated users through the `carto-os` and `carto-os-eu` projects. These projects are deployed in the US and EU multi-regions, respectively, and you may choose one or the other depending on the location of your data.


### Manual Installation

The Analytics Toolbox is available in a specific project depending on the region of your BigQuery account. Please check the full [list of projects](/analytics-toolbox-bigquery/overview/regions-table/) for the different cloud regions in order to choose the optimal one depending on the location of your data.

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

* `PROJECT`: Project id where the toolbox dataset will be created
* `REGION`: Location of the BigQuery dataset that will be created to install the Analytics Toolbox
* `BUCKET`: Name of the bucket to store the JavasScript libraries needed by the Toolbox
  (please omit any protocol prefix like `gs://`)

Set these variables by executing the following in Cloud Shell (after replacing the appropriate values):

```bash
export PROJECT="<my-project>"
export REGION="<my-region>"
export BUCKET="<my-bucket>"
```

{{% bannerNote title="WARNING" type="warning" %}}
After a while without using the Cloud Shell you may need to reconnect it; if that happens, you will need to set the environment variables again.
{{%/ bannerNote %}}

#### Setup

This step is only required before the first installation. Activate the Cloud Shell in the target project and make sure the environment variables from the preparation step above are set.

Before starting the process make sure the target GCP project exists and that it is the correct one by executing the following:

```bash
# Check project existence
gcloud projects describe $PROJECT
```

Then, create a BigQuery dataset named `carto`, where the Toolbox will be installed:

```bash
# Create dataset "carto"
bq mk --location=$REGION --description="CARTO dataset" -d $PROJECT:carto
```

#### Installation

To install the Analytics Toolbox in the `carto` dataset we will use the [this installation package](https://storage.googleapis.com/carto-analytics-toolbox-core/bigquery/carto-analytics-toolbox-core-bigquery-latest.zip) and follow the instructions below. Please note that this process should be repeated every time a new version of the Toolbox is available.

Access the Cloud Shell and set the environment variables as described in the preparation step above, then run the following commands:

```bash
# Download package
wget https://storage.googleapis.com/carto-analytics-toolbox-core/bigquery/carto-analytics-toolbox-core-bigquery-latest.zip
unzip carto-analytics-toolbox-core-bigquery-latest.zip

# Enter the directory
cd $(unzip -Z -1 carto-analytics-toolbox-core-bigquery-latest.zip | head -1)

# Prepare SQL code
sed -e 's!<BUCKET>!'"$BUCKET"'!g'  modules.sql > modules_rep.sql

# Copy libs to bucket
gsutil -m cp -r libs/ gs://$BUCKET/carto/

# Install the functions and procedures
bq --location=$REGION --project_id=$PROJECT query --use_legacy_sql=false --max_statement_results=10000 --format=prettyjson < modules_rep.sql
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

{{% euFlagFunding %}}

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
