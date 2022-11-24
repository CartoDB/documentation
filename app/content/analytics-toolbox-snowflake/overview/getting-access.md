---
aliases:
    - /analytics-toolbox-sf/overview/getting-access/
---

## Getting access

### Manual installation (for CARTO customers)

This guide explains all the steps to install the SQL functions and procedures of the Analytics Toolbox in your Snowflake database.

The CARTO Analytics Toolbox contains two packages:
* **core**: this is the public and open-source package. It contains all the core GIS functions that complement the GIS native functions available in Snowflake.
* **advanced**: this is a premium package. It contains advanced GIS functions to power high-level GIS analytics in Snowflake.

{{% bannerNote title="NOTE" type="note" %}}
This guide explains how to install the core package. In order to access the **advanced** features, please contact support@carto.com.
{{%/ bannerNote %}}

The process consists of two steps: [setup](#setup) and [installation](#installation). The first one is required only the first time you install the toolbox, while the second one must be done every time you want to install a new version of the packages.

#### Setup

This step consists of setting up the Snowflake database where you want to install the toolbox. A Snowflake account is required.

We'll create a schema named `carto` in the database where you want the CARTO Analytics Toolbox installed. We also recommend creating a dedicated Snowflake user called `carto` to manage the CARTO Analytics Toolbox.

The following script will create the user, schema and role to be used for the installation in your database. Please note that this script must be executed by an [account administrator](https://docs.snowflake.com/en/user-guide/security-access-control-considerations.html#using-the-accountadmin-role).

{{% bannerNote title="WARNING" type="warning" %}}
Before executing the script make sure to replace the placeholders `'<strong, unique password>'` and
`"<my database>"` by your password and the name of your database. respectively.
{{%/ bannerNote %}}

```sql
-- Set admin permissions
USE ROLE accountadmin;

-- Create a role for the carto user
CREATE ROLE carto_role;

-- Ensure the sysadmin role inherits any privileges the carto role is granted.
-- Note that this does not grant sysadmin privileges to the carto role
GRANT ROLE carto_role TO ROLE sysadmin;

-- Create the carto user
CREATE USER carto WITH DEFAULT_ROLE=carto_role DEFAULT_WAREHOUSE=COMPUTE_WH PASSWORD='<strong, unique password>';

-- Grant the carto role to the carto user
GRANT ROLE carto_role TO USER carto;

-- Let the carto user see this database
GRANT USAGE ON DATABASE "<my database>" TO ROLE carto_role;

-- Create the carto schema
CREATE SCHEMA "<my database>".carto;

-- Give the carto user full access to the carto schema
GRANT ALL PRIVILEGES ON SCHEMA "<my database>".carto TO ROLE carto_role;

-- Give the carto user permission to use the warehouse
GRANT OPERATE ON WAREHOUSE COMPUTE_WH TO ROLE CARTO_ROLE;
GRANT USAGE ON WAREHOUSE COMPUTE_WH TO ROLE CARTO_ROLE;

-- Grant usage to public role
-- Repeat this for any other role that needs to use the toolbox
GRANT USAGE ON DATABASE "<my database>" TO ROLE public;
GRANT USAGE ON SCHEMA "<my database>".carto TO ROLE public;
GRANT SELECT ON ALL TABLES IN SCHEMA "<my database>".carto TO ROLE public;
GRANT SELECT ON FUTURE TABLES IN SCHEMA "<my database>".carto TO ROLE public;
GRANT SELECT ON ALL VIEWS IN SCHEMA "<my database>".carto TO ROLE public;
GRANT SELECT ON FUTURE VIEWS IN SCHEMA "<my database>".carto TO ROLE public;
GRANT USAGE ON ALL FUNCTIONS IN SCHEMA "<my database>".carto TO ROLE public;
GRANT USAGE ON FUTURE FUNCTIONS IN SCHEMA "<my database>".carto TO ROLE public;
GRANT USAGE ON ALL PROCEDURES IN SCHEMA "<my database>".carto TO ROLE public;
GRANT USAGE ON FUTURE PROCEDURES IN SCHEMA "<my database>".carto TO ROLE public;
```

{{% bannerNote title="TIP" type="tip" %}}
Mark the "All Queries" check on your worksheet or select all the lines manually to execute the whole script you pasted in the SQL editor.
{{%/ bannerNote %}}

![Setup on Snowflake Classic Web Interface](/img/analytics-toolbox-snowflake/setup.png)

You can check out the [Snowflake getting started documentation](https://docs.snowflake.com/en/user-guide-getting-started.html) for further information.

#### Installation

Once the setup is completed, we can proceed with the installation of the toolbox. This step will be performed the first time and every time we want to install an updated version.

During this installation step you are going to need the following information from the [setup](#setup) step:
* database name where the Analytics Toolbox will be installed
* password for the `carto` user

##### 1. Connect to the database

This step is required to run the installation SQL script.

First, connect to your Snowflake account using the `carto` user and password. Then, set the role that will be used to install the toolbox:

```sql
USE ROLE carto_role;
```

![Setup on Snowflake Classic Web Interface](/img/analytics-toolbox-snowflake/install1.png)

##### 2. Create the functions and procedures

Download the [package file](https://storage.googleapis.com/carto-analytics-toolbox-core/snowflake/carto-analytics-toolbox-core-snowflake-latest.zip) and unzip it in your local storage.

{{% bannerNote title="TIP" type="tip" %}}
If you have a previously installed version of the Analytics Toolbox, you can check the installed version by running `SELECT carto.VERSION_CORE()`.
{{%/ bannerNote %}}

To install the functions and procedures of the Analytics Toolbox in the `carto` schema of your database, replace `@@DATABASE@@` with your database in the file `modules.sql`, and run that file in Snowflake. Please note that you must execute this file's commands in the same Worksheet where you executed all the previous statements of this installation guide.

{{% bannerNote type="warning" title="WARNING" %}}
Make sure that you're using the `CARTO_ROLE` role before executing the installation script `modules.sql` (see `USE ROLE carto_role;` above). Otherwise the functions and procedures will be owned by a different role and it won't be possible to perform automatic updates of the Analytic Toolbox.
{{%/ bannerNote %}}

You can load the script into a Worksheet by using the dropdown menu on the top right and choosing "Load Script". The "All Queries" check seems to work unreliably with large scripts, so we advice to select all the text instead (just press Control-A or Command-A if using a Mac), then press the "Run" button and confirm you want to execute all the lines.

![Setup on Snowflake Classic Web Interface](/img/analytics-toolbox-snowflake/install2.png)

{{% bannerNote title="WARNING" type="warning" %}}
This script will remove all the previously installed functions and procedures of the Analytics Toolbox in the `carto` schema.
{{%/ bannerNote %}}


##### 3. Check installation

You can check the installed functions and procedures by running the following statements:

```sql
SHOW USER FUNCTIONS IN SCHEMA carto;
SHOW USER PROCEDURES IN SCHEMA carto;
```

##### 4. Import sample data (optional)

In order to be able to reproduce the queries included in the [Guides](../../guides) and [Examples](../../examples) sections, you can optionally import into the `carto` schema a sample table containing the Starbucks locations in the US.

To do so, please run the following script in the same Worksheet you have used for the installation of the Analytics Toolbox:

```sql
-- Set geom format as wkt
ALTER SESSION SET GEOGRAPHY_OUTPUT_FORMAT = wkt;

-- Load sample table
CREATE OR REPLACE TABLE carto.starbucks_locations_usa(
  id BIGINT,
  brand STRING,
  store_name STRING,
  ownership_type STRING,
  address STRING,
  city STRING,
  state_province STRING,
  country STRING,
  postcode STRING,
  geog GEOGRAPHY);
COPY INTO carto.starbucks_locations_usa
  FROM 'gcs://carto-analytics-toolbox-core/samples/starbucks_locations_usa.csv'
  FILE_FORMAT = (type = 'csv', FIELD_OPTIONALLY_ENCLOSED_BY = '"');

-- Set geom format as geojson
ALTER SESSION SET GEOGRAPHY_OUTPUT_FORMAT = geojson;
```


**Congratulations!** you have successfully installed the CARTO Analytics Toolbox in your Snowflake database. Now you can start [using the functions](/analytics-toolbox-snowflake/sql-reference/overview/). Please refer to Step 3 above to check the installed version and functions.


### Marketplace installation (for non-CARTO customers)

You can get access to the core modules of the Analytics Toolbox for Snowflake through the [Snowflake's Data Marketplace](https://www.snowflake.com/datasets/carto-analytics-toolbox). If you are unsure of how to access the Data Marketplace, you can find detailed instructions in [this article](https://docs.snowflake.com/en/user-guide/data-marketplace-intro.html#how-do-i-access-the-snowflake-data-marketplace-to-browse-listings) of Snowflake's documentation center.

Once in the Data Marketplace, search for _carto analytics toolbox_ to find the listing:

![Analytics Toolbox for Snowflake listing](/img/sf-analytics-toolbox/sf-datamarketplace-step1.png)

Once you are in the details page of the listing, you will find that you can _GET_ the Analytics Toolbox directly following these instructions:


1. Click on the GET DATA button on the top right corner of the Data Marketplace listing.

![Analytics Toolbox for Snowflake get data](/img/sf-analytics-toolbox/sf-datamarketplace-step2-get.png)

2. Rename the database to the name of your choice. Next, click on _More options_ to choose all the roles to which you wish to give access to this database, accept the Terms of Use and finally click on "Create Database".

![Analytics Toolbox for Snowflake get data form](/img/sf-analytics-toolbox/sf-datamarketplace-step3-get.png)

By clicking on "View Database" you will be redirected to the database you just created, where you will be able to browse all the modules (schemas) and functions and procedures available within the Analytics Toolbox.

![Analytics Toolbox for Snowflake get data form](/img/sf-analytics-toolbox/sf-datamarketplace-step5-get.png)



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

    var codeEl = containerEl.getElementsByClassName('language-sql')[0];
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
