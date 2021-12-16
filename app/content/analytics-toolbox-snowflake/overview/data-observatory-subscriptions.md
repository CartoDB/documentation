## Data Observatory Subscriptions

The Data Observatory is a spatial data platform that enables you to augment your data with the latest and greatest in spatial data. With a [catalog](https://carto.com/spatial-data-catalog/browser/) of thousands of spatial datasets from public and premium sources that have been vetted by our Data team, the Data Observatory provides a streamlined process to reduce the operational inefficiencies of discovering, licensing, and accessing spatial data.

### Manual synchronization

This guide explains all the steps to synchronize your Data Observatory Subscriptions in your Snowflake database.

We can divide the process into two steps: setup and synchronization. The first one must be done only the first time, then the second one must be done every time you want to synchronize new data into the database.

#### Setup

{{% bannerNote title="TIP" type="tip" %}}
This step is the same as the setup for the Analytics Toolbox in the [_Getting Access_](../getting-access) guide. If you have already done that setup you can skip this step.
{{%/ bannerNote %}}

This step consists of setting up the Snowflake database where we want to sync the data. A Snowflake account is required.

We'll create a schema named "carto" in the database where you want the sync the data.

We recommend having a dedicated user called "carto" to manage the execution of the SQL queries to sync the data. The following script will create the user, schema and role to be used for the synchronization in your database. Note that this script must be executed by an [account administrator](https://docs.snowflake.com/en/user-guide/security-access-control-considerations.html#using-the-accountadmin-role).

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

-- Grant usage on public role
-- Repeat this for any other role that needs access to use "carto" schema
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

{{% bannerNote title="WARNING" type="warning" %}}
Before executing the script be sure to replace the placeholders `'<strong, unique password>'` and
`"<my database>"` by your password and the name of your database repectively.
{{%/ bannerNote %}}

[IMG]

{{% bannerNote title="TIP" type="tip" %}}
Mark the "All Queries" check on your worksheet or select all the lines manually to execute the whole script you pasted in the SQL editor.
{{%/ bannerNote %}}

In the installation step the information established by this script will be needed:
* **database** name
* **password**

You can check out the [Snowflake getting started documentation](https://docs.snowflake.com/en/user-guide-getting-started.html) for further information.

#### Configure external connection

{{% bannerNote title="NOTE" type="note" %}}
This step requires your CARTO Account ID. Please contact support@carto.com to request the ID.
{{%/ bannerNote %}}

The Data Observatory subscriptions are provisioned in Google Cloud Storage. In Snowflake, the integrations allow to configure secure access to external data sources. We will use a Snowflake integration to load the data subscriptions from GCS. After the integration, two stages will be created to access both public and premium data. You can check out the [Snowflake documentation to load data from GCS](https://docs.snowflake.com/en/user-guide/data-load-gcs-config.html) for further information.

The following script will create the integration in your account. Note that this script must be executed by an [account administrator](https://docs.snowflake.com/en/user-guide/security-access-control-considerations.html#using-the-accountadmin-role).

```sql
-- Set admin permissions
USE ROLE accountadmin;

-- Create the "carto_integration" integration
CREATE OR replace STORAGE INTEGRATION carto_integration
  TYPE = EXTERNAL_STAGE
  STORAGE_PROVIDER = GCS
  ENABLED = TRUE
  STORAGE_ALLOWED_LOCATIONS = (
    'gcs://carto-data-observatory-public/',
    'gcs://carto-data-observatory-premium-<user_id>/'
  );

-- Create the "carto_public_stage" stage
CREATE OR REPLACE STAGE "<my database>".carto.carto_public_stage
  STORAGE_INTEGRATION = carto_integration
  URL = 'gcs://carto-data-observatory-public/';

-- Create the "carto_premium_stage" stage
CREATE OR REPLACE STAGE "<my database>".carto.carto_premium_stage
  STORAGE_INTEGRATION = carto_integration
  URL = 'gcs://carto-data-observatory-premium-<user_id>/';

-- Give the carto role access to the integration and stages
GRANT USAGE ON INTEGRATION carto_integration TO ROLE carto_role;
GRANT USAGE ON STAGE "<my database>".carto.carto_public_stage TO ROLE carto_role;
GRANT USAGE ON STAGE "<my database>".carto.carto_premium_stage TO ROLE carto_role;
```

{{% bannerNote title="WARNING" type="warning" %}}
Before executing the script be sure to replace the placeholders `'<strong, unique password>'` and
`"<my database>"` by your password and the name of your database repectively.
{{%/ bannerNote %}}

![Create Integration on Snowflake Classic Web Interface](/img/data-observatory-snowflake/create-integration-stages.png)

Then, it's required to describe the integration in order to validate that it has been correcly created and also get the GCP Service Account to make a secure connection to access your data. In the same session, run the following query:

```sql
-- Describe the "carto_integration"
DESCRIBE integration carto_integration;
```

[IMG]

{{% bannerNote title="NOTE" type="note" %}}
Please copy the GCP Service Account ID and send it to support@carto.com to enable secure access to your data.
{{%/ bannerNote %}}

Finally, to verify that everything went well, let's list the available public subscriptions:

```sql
-- List the available tables in "carto_public_stage"
LIST @"<my database>".carto.carto_public_stage
  PATTERN = '.*[.]avro';
```

[IMG]

#### Synchronization

Once the integration is successfully created and your GCP Service Account has permissions to download the data, we can start with the synchronization step.

##### 1. Request the data

Currently, the data is manually provisioned on demand. Once you are subscribed to the data, you need to perform a request at support@carto.com with the subscriptions you want to load in Snowflake.

When the data is provisioned we will send you a SQL script to run in order to load the data.

##### 2. Connect to the database

This step is required to run the next SQL script. Connect to the account using the "carto" user and password. Then it is very important to set the role, database to sync the data:

```sql
USE ROLE carto_role;
USE DATABASE "<my database>";
```

[IMG]

##### 3. Create the tables

Execute the provided SQL script to create the tables in the "carto" schema of your database. You must execute this file's commands in the same session where you executed the statements in step 1 (`USE ROLE carto_role; ...`). So, on the Snowflake web interface use the same worksheet.

{{% bannerNote title="TIP" type="tip" %}}
You can load the script into a Worksheet using the dropdown menu on top right and chosing "Load Script". Then mark the "All Queries" check on your worksheet to execute the whole script you pasted in the SQL editor; otherwise you need to select all the lines in the script.
{{%/ bannerNote %}}

This is a example of the query:

```sql
CREATE OR REPLACE TABLE carto.avro_sub_carto_geography_can_censusdivision_2016(raw VARIANT);
COPY INTO carto.avro_sub_carto_geography_can_censusdivision_2016(raw)
  FROM '@carto.carto_public_stage'
  PATTERN = 'tables/spatial_catalog_datasets_.*[.]avro'
  FILE_FORMAT = (type = 'avro');
...
```

[IMG]

{{% bannerNote title="WARNING" type="warning" %}}
This script will overwrite the same name tables in the "carto" schema if exist.
{{%/ bannerNote %}}

**Congratulations!** you have successfully synchronized your CARTO Data Observatory subscriptions.

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
