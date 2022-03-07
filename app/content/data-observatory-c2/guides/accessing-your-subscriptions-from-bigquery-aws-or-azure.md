## Accessing your subscriptions from BigQuery, AWS or Azure

You can access your Data Observatory subscriptions directly from BigQuery, AWS S3 and Azure Blob Storage. For BigQuery, you will be given access to the table(s) of your subscription. For AWS and Azure, your subscription will be uploaded to either of their storages as AVRO files.

{{% bannerNote title="WARNING: YOU MAY NEED AN EXTENDED LICENSE" type="tip" %}}
A small proportion of datasets require an Extended license in order to use this feature. Please refer to [this section](#requesting-an-extended-license) to know more.
{{%/ bannerNote %}}


### Access in BigQuery

If you haven't already, please create a BigQuery connection from _Your connections_ section, **otherwise this functionality won't be available**.

Go to Your Subscriptions page, click on the three dots to expand the menu and then on _Access in BigQuery_.

<div style="text-align:center" >
<img src="/img/data-observatory/carto2/carto2/access-in-bq-menu-1.png" alt="Access in BigQuery from Your Subscriptions." style="width:90%">
</div>

Alternatively, you can access this option directly from the dataset page.

<div style="text-align:center" >
<img src="/img/data-observatory/carto2/carto2/access-in-bq-menu-2.png" alt="Access in BigQuery from the Dataset page." style="width:90%">
</div>

The following information will be displayed:

* Location of the data table in BigQuery, in the format `project.dataset.table`.
* Location of the geography table in BigQuery, in the format `project.dataset.table`.
* Example query to join the data and geography tables.

<div style="text-align:center" >
<img src="/img/data-observatory/carto2/carto2/access-in-bq-access-details.png" alt="Access details for BigQuery." style="width:90%">
</div>

{{% bannerNote title="TIP" type="tip" %}}
Remember that your subscription is composed of a data and a geography table that you need to join in order to work with the data (read more about it [here](../../overview/terminology/#dataset)). Please use the example query provided to get started.
{{%/ bannerNote %}}

#### If your subscription is a geography

If your dataset subscription is a geography, such as [Australia's States by CARTO](https://carto.com/spatial-data-catalog/browser/geography/cdb_state_6b52fa47/), then only one table location will be shown:

<div style="text-align:center" >
<img src="/img/data-observatory/carto2/carto2/access-in-bq-access-details-geo.png" alt="Access details for BigQuery when your subscription is a geography." style="width:90%">
</div>

#### A note on BigQuery permissions

If the BigQuery connection you have set up in your CARTO Dashboard is of type OAuth, you will be granted permissions to query the BigQuery tables provided with your Google user (i.e. logged in on your BigQuery console). If your connection uses a Service Account instead, these tables can only be accessed using those credentials.

### Access in AWS or Azure

Since the process of accessing your subscription in AWS or Azure is similar, we will only detail that of AWS in the following description.

Go to Your Subscriptions page, click on the three dots to expand the menu and then on _Access in AWS_.

<div style="text-align:center" >
<img src="/img/data-observatory/carto2/carto2/access-in-aws-menu-1.png" alt="Access in BigQuery from Your Subscriptions." style="width:90%">
</div>

Alternatively, you can access this option directly from the dataset page.

<div style="text-align:center" >
<img src="/img/data-observatory/carto2/carto2/access-in-aws-menu-2.png" alt="Access in BigQuery from the Dataset page." style="width:90%">
</div>

The following screen will be shown, where you can confirm your request by clickin on the _Request access_ button. You will receive a confirmation email.

<div style="text-align:center" >
<img src="/img/data-observatory/carto2/carto2/access-in-aws-request.png" alt="Access in BigQuery from the Dataset page." style="width:90%">
</div>

Once your data has been uploaded to an AWS S3 bucket, you will be able to access its location by coming back to your subscription and clickin on the _Access in AWS_ button. 

<div style="text-align:center" >
<img src="/img/data-observatory/carto2/carto2/access-in-aws-access-details.png" alt="Access details for BigQuery when your subscription is a geography." style="width:90%">
</div>

### Requesting an Extended license

Although most of the datasets in our Spatial Data Catalog are eligible to be accessed directly in the different cloud data storages and warehouses detailed here, for some of them it is necessary to update your existing license to an _Extended_ type.

You will be able to identify when this additional step is necessary when trying to access your subscription from BigQuery, AWS or Azure, as the following screen will be shown:

<div style="text-align:center" >
<img src="/img/data-observatory/carto2/carto2/access-in-bq-request-extended.png" alt="Access details for BigQuery when your subscription is a geography." style="width:90%">
</div>

After you confirm your request by clicking on the _Request extended license_ button you will receive a confirmation email and a member of our team will get in touch with you to make the necessary adjustments to your license. Once this process is finished, you will be able to access this functionality as with any other of your subscriptions.



