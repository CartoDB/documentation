## Overview

CARTO's Spatial Extension for BigQuery...Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas varius tortor nibh, sit amet tempor nibh finibus et. Aenean eu enim justo. Vestibulum aliquam hendrerit molestie. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas varius tortor nibh, sit amet tempor nibh finibus et.

Aenean eu enim justo. Vestibulum aliquam. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas varius tortor nibh, sit amet tempor nibh finibus et. Aenean eu enim justo. Vestibulum aliquam.


### Getting access

The only two things needed to start using the Spatial Extension are:
  * A CARTO account. Go to your organization's sign up page at [_your-organization.carto.com/signup_](), or directly to [_carto.com/signup_](https://carto.com/signup) to create an individual account.
  * A Google Cloud Platform account. Get more information about how to get one [here](https://cloud.google.com/gcp/getting-started).


Access to the Spatial Extension for BigQuery is granted to every CARTO account, and activated when adding a new connection to BigQuery. See the **Getting Started** section below for more information about it.

The extension's capabilities can be leveraged directly from the BigQuery console, and we'll grant access to the functions and procedures to the email address associated with your CARTO account.

If your organization has the "Login with Google" option enabled and you signed up using your Google Account, we'll grant it access to the extension. If your account was created with a different email address, it can be changed in your account's settings before creating the connection to BigQuery. 

### Getting started

Once you have created your CARTO account (ideally using your Google Account for sign up and login) the next step is **creating a BigQuery connection**. Check out [the documentation](WIP:add.link.to.actual.docs) about connections to get familiar with the process. 

**WIP: Add screenshot and actual link**

Now that we're set on the CARTO side, let's open the BigQuery console and check that we have access to the extension functions:

```sql
SELECT cartobq.tiler.Version()
```

{{% bannerNote title="tip" %}}
If you need to use the extension from the **EU** multi-region, use `SELECT cartobq.tiler_eu.Version()` instead. Learn more about BigQuery locations [here](https://cloud.google.com/bigquery/docs/locations).
{{%/ bannerNote %}}

**WIP: Update with actual function**

If you get a version number, you're all set! Take a look at the tiler's [**Quickstart**](https://docs.carto.com/spatial-extension-bq/tiler/#quickstart) section to get started using some of the extension's more advanced functionalities.

If you get a permission error, please make sure that your account's email address matches your Google Account and create the BigQuery connection again. If you still can't access, get in touch at [support@carto.com](mailto:support@carto.com)

### Usage limits

Each CARTO account has their own usage limits for the Spatial Extension. Aligned with BigQuery billing system, we'll control the amount of data processed by the extension's procedures.

Depending on the account type, the limit on the data processed by the extension ranges from 10GB in Free accounts to _unlimited_ in the highest Enterprise tier. 

| Plan | Data processed limit|
|------|---------------------|
|Free | 10GB |
|Individual | 200GB |
|Enterprise | Starting at 500GB |
