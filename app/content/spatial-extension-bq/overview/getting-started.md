## Getting started

The CARTO Spatial Extension for BigQuery is composed of a set of user-defined functions and procedures organized in a set of modules based on the functionality they offer. There are two types of modules: _core_ modules, that are [open source](https://github.com/CartoDB/carto-spatial-extension) and free to use for anyone with a BigQuery account, and _advanced_ modules, only available with a CARTO account. 

![Spatial Extension modules diagram](/img/bq-spatial-extension/se-modules-diagram.png)

Visit the [SQL Reference](../../sql-reference/) to see the full list of available modules and functions. If you already have a CARTO account, please keep reading to learn how you can access the *advanced* modules.

### Accessing advanced modules

To use the CARTO Spatial Extension, it requires to be activated for your account. For that, you will need:

   * A CARTO account. Go to your organization's sign-up page at [_your-organization.carto.com/signup_](), or directly to [_carto.com/signup_](https://carto.com/signup) to create an individual account.
   * A Google Cloud Platform account. For more information about how to get one [here](https://cloud.google.com/gcp/getting-started).

Access to the Spatial Extension for BigQuery is granted to every CARTO account when [adding a new connection to BigQuery](#connecting-to-bigquery). 

Some of the extension's capabilities are leveraged directly as SQL queries from the BigQuery console. To enable this, we'll grant access to the extension’s functions and procedures in BigQuery using the email address associated with your CARTO account.

#### Authorization

CARTO connects to BigQuery and runs some queries for actions such as listing projects, datasets and tables or publishing maps on the web.
This connection can be established using your GCP account via **OAuth** authentication or using a Google Cloud **service account**.

The email address you use for your CARTO and Google BigQuery accounts should be the same. This happens automatically when you sign in to CARTO using your Google Account.

Please make sure that your account has the `bigquery.jobs.list` permission on your project. This is needed to get metadata about the execution of the extension’s procedures.

Additionally, the following predefined roles need to be granted to your account or service account:

* **BigQuery Data Viewer** (`bigquery.dataViewer`) role for visualizing your tilesets privately from Map Viewer or in a custom application.
* **BigQuery Data Owner** (`bigquery.dataOwner`) role for changing permission on the tilesets from Map Viewer. 
  * This is needed for publishing maps with tileset layers on the web, available to anyone with the link. That means editing the tileset's permissions to grant CARTO APIs reading access to the tileset. 
  * This role is also required for unpublishing a public map. 
  * Learn more about creating public maps out of tilesets [here](../tiler/map-viewer/#share).
* **BigQuery Job User** (`bigquery.jobUser`) role for listing your projects, datasets and tilesets in the Dashboard.
* **BigQuery Read Session User** (`bigquery.readSessionUser`) role for importing data from BigQuery, as tables in CARTO embedded database.

Take a look at the BigQuery [documentation](https://cloud.google.com/bigquery/docs/access-control#bq-permissions) for more information about roles and permissions.

#### Connecting to BigQuery

Once you have created your CARTO account, you can go to _Data_, click on _Your Connections_ and create a _New connection_. 

![New Connection](/img/bq-spatial-extension/overview-new-connection.png)

From the list of available connections, choose BigQuery and complete the connection steps. It will ask you to upload a service account key in JSON format. It should have all the permissions described before.

Now you can go to your [BigQuery console](https://console.cloud.google.com/bigquery) and check that you have access to the extension. Running this query should return the Tiler module version.

```sql
SELECT bqcarto.tiler.VERSION()
```

{{% bannerNote title="tip" %}}
If you need to use the extension from GCP's EU multi-region, use `SELECT bqcartoeu.tiler.VERSION()` instead. Learn more about BigQuery locations [here](https://cloud.google.com/bigquery/docs/locations).
{{%/ bannerNote %}}

If you get a version number, you are all set! Take a look at the Tiler's [guides](../../guides/tilesets) section to start using some of the extension's more advanced functionalities.

If you get a permission error, please make sure that your account's email address matches your Google Account and create the BigQuery connection again. If you still can't access it, get in touch at [support@carto.com](mailto:support@carto.com)

### Deployment options

You can use the Spatial Extension calling the procedures directly from our BigQuery projects, or install it on your own projects if your BigQuery datasets are [within a VPC](https://cloud.google.com/vpc-service-controls). 

We make the extension available in different projects for different locations. As an example, the following queries should return the version number for the Tiler module for each region.

```sql
SELECT bqcarto.tiler.VERSION() -- US multi-region
SELECT bqcartoeu.tiler.VERSION() -- EU multi-region
```

Different types of capabilities belong to different modules of the Spatial Extension. Each of these modules is available on a different dataset.

For example, all the tiling functions to process and visualize large amounts of data are inside the `tiler` dataset. 

As we continue adding capabilities to the extension, we will release new modules organized in different datasets.

### Pricing and cost

When you are using CARTO Spatial Extension for BigQuery you will incur 2 different types of cost:

* BigQuery data processing: You will be charged for the amount of data processed. There are On-demand and Flat-rate options available. [Know more](https://cloud.google.com/bigquery/pricing) about BigQuery pricing.
* CARTO Spatial Extension Processing: We will keep track of the amount of data processed using the extension and enforce different limits based on your account pricing plan. These limits range from 10GB for  Free accounts to _unlimited_ in the highest Enterprise tier.

[Contact us](https://carto.com/contact/) if you have any questions around pricing and plans.
