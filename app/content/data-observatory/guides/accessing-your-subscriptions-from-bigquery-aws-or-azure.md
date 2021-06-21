## Accessing your subscriptions from BigQuery, AWS or Azure

You can access your Data Observatory datasets directly from BigQuery, AWS S3 and Azure Blob Storage. In the case of BigQuery, you will be given access to the table(s) of your subscription. For AWS and Azure, your subscription will be uploaded to either storage as AVRO files.

{{% bannerNote title="YOU MAY NEED AN EXTENDED LICENSE" type="tip" %}}
A small proportion of datasets require to access an Extended license in order to use this feature. Please refer to [this section](#requesting-an-extended-license) to know more.
{{%/ bannerNote %}}


### Access in BigQuery

Go to Your Subscriptions page, click on the three dots to expand the menu and then on _Access in BigQuery_.

<div style="text-align:center" >
<img src="/img/data-observatory/access-in-bq-menu-1.png" alt="Access in BigQuery from Your Subscriptions." style="width:90%">
</div>

Alternatively, you can access this option directly from the dataset page.

<div style="text-align:center" >
<img src="/img/data-observatory/access-in-bq-menu-2.png" alt="Access in BigQuery from the Dataset page." style="width:90%">
</div>

The following information will be displayed:

* Location of the data table, in the format `project.dataset.table`.
* Location of the geography table, in the format `project.dataset.table`.
* Example query to join the data and geography table.

<div style="text-align:center" >
<img src="/img/data-observatory/access-in-bq-access-details.png" alt="Access details for BigQuery." style="width:90%">
</div>

{{% bannerNote title="TIP" type="tip" %}}
Remember that your subscription is composed of a data and a geography table that you need to join in order to work with the data (read more about it [here](../../overview/terminology/#dataset)). Please use the example query provided to get started.
{{%/ bannerNote %}}


#### If your subscription is a geography

If your dataset subscription is a geography, such as [Australia's States by CARTO](https://carto.com/spatial-data-catalog/browser/geography/cdb_state_6b52fa47/), then only one table location will be shown:

<div style="text-align:center" >
<img src="/img/data-observatory/access-in-bq-access-details.png" alt="Access details for BigQuery when your subscription is a geography." style="width:90%">
</div>

### Access in AWS or Azure

Since the process of accessing your subscription in AWS or Azure is exactly the same, we will only detail that of AWS in the following description.

Go to Your Subscriptions page, click on the three dots to expand the menu and then on _Access in AWS_.

<div style="text-align:center" >
<img src="/img/data-observatory/access-in-aws-menu-1.png" alt="Access in BigQuery from Your Subscriptions." style="width:90%">
</div>

Alternatively, you can access this option directly from the dataset page.

<div style="text-align:center" >
<img src="/img/data-observatory/access-in-aws-menu-2.png" alt="Access in BigQuery from the Dataset page." style="width:90%">
</div>

The following screen will be shown, where you can confirm your request by clickin on the _Request extended license_ button. You will receive a confirmation email.

<div style="text-align:center" >
<img src="/img/data-observatory/access-in-aws-request.png" alt="Access in BigQuery from the Dataset page." style="width:90%">
</div>

Once your data has been uploaded to an AWS S3 bucket, you will be able to access its location by coming back to your subscription and clickin on the _Access in AWS_ button. 

<div style="text-align:center" >
<img src="/img/data-observatory/access-in-aws-access-details.png" alt="Access details for BigQuery when your subscription is a geography." style="width:90%">
</div>

### Requesting an Extended license

Although most of the datasets in our Spatial Data Catalog are eligible to be accessed directly in the cloud data storages and warehouses, some of them require you to purchase an Extended license. 

If that is the case, when trying to access your subscription from BigQuery, AWS or Azure, the following screen will be shown.

<div style="text-align:center" >
<img src="/img/data-observatory/access-in-bq-request-extended.png" alt="Access details for BigQuery when your subscription is a geography." style="width:90%">
</div>

After you confirm your request by clickin on the _Request extended license_ button you will receive a confirmation email and a member of our team will get in touch with you to make the necessary adjustments to your license. Once this process is finished, you will be able to access this functionality as with any other of your subscriptions.



