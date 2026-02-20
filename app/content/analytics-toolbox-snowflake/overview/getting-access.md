---
aliases:
    - /analytics-toolbox-sf/overview/getting-access/
---

## Getting access

### Assisted installation from the CARTO Workspace
{{% bannerNote title="PRIVATE BETA" type="tip" %}}
This installation mode is currently available in private beta. To request access please contact CARTO's support team at support@carto.com. Note that this feature is only available for the Admin users in your CARTO organization account.
{{%/ bannerNote %}}

This guide explains all the steps to install the SQL functions and procedures of the Analytics Toolbox in your Snowflake account.
The CARTO Analytics Toolbox contains two packages:

* **core:** this is the public and open-source package. It contains all the core GIS functions that complement the GIS native functions available in Snowflake. This module is also available from the [Snowflake Data Marketplace](#marketplace-installation-for-non-carto-customers) for free. 
* **advanced:** this is a premium package. It contains advanced GIS functions to power high-level GIS analytics in Snowflake.

Note that in order to be able to automatically install the Analytics Toolbox in your Snowflake account, CARTO requires you to run a specific setup so we can proceed with the installation and with the future updates. Please follow the instructions detailed below in order to complete the installation of the Analytics Toolbox for Snowflake.

#### Setup

CARTO requires a specific setup in your Snowflake account to be able to securely install the Analytics Toolbox and then access it from our different platform interfaces. This process must be completed by a user with ACCOUNTADMIN permissions in the Snowflake account. In this process you will need to create the following resources:

* “CARTO” database within your Snowflake account
* “CARTO” schema in the “CARTO” database
* “CARTO_ROLE” user role with full USAGE privileges in the “CARTO” database and ALL PRIVILEGES on the “CARTO” schema 
* “CARTO” user granted with the “CARTO_ROLE” that CARTO will use to perform the installation and maintain future updates

**Create resources**

In order to create the aforementioned resources please copy & paste the following queries in your Snowflake console. 

```sql
-- Set admin permissions
USE ROLE ACCOUNTADMIN;
 
-- Create the carto database where the toolbox will be installed
CREATE DATABASE "CARTO";
 
-- Create the carto schema in the carto database
CREATE SCHEMA "CARTO"."CARTO";
 
-- Create a carto role for the carto user
CREATE ROLE CARTO_ROLE;
 
-- Ensure the sysadmin role inherits any privileges the carto role is granted.
-- Note that this does not grant sysadmin privileges to the carto role
GRANT ROLE CARTO_ROLE TO ROLE SYSADMIN;
 
-- Create the carto user
CREATE USER CARTO WITH DEFAULT_ROLE=CARTO_ROLE DEFAULT_WAREHOUSE=COMPUTE_WH PASSWORD='<strong, unique password>';
 
-- Grant the carto role to the carto user
GRANT ROLE CARTO_ROLE TO USER CARTO;
 
-- Let the carto user see this database
GRANT USAGE ON DATABASE "CARTO" TO ROLE CARTO_ROLE;
 
-- Give the carto user full access to the carto schema
GRANT ALL PRIVILEGES ON SCHEMA "CARTO"."CARTO" TO ROLE CARTO_ROLE;

-- Give the carto user permission to use the warehouse
GRANT OPERATE ON WAREHOUSE COMPUTE_WH TO ROLE CARTO_ROLE;
GRANT USAGE ON WAREHOUSE COMPUTE_WH TO ROLE CARTO_ROLE;
```

**Grant usage**

In order to make the Analytics Toolbox available to use via the resources you have just created, some permissions should be granted. Please copy & paste the queries below if you want to grant usage of the Analytics Toolbox to all the users in your Snowflake account or amend the query to fulfill your specific user access requirements: 

```sql
-- Set admin permissions
USE ROLE ACCOUNTADMIN;
 
-- Grant usage to public role
-- Apply this for any other role that needs to use the toolbox
GRANT USAGE ON DATABASE "CARTO" TO ROLE PUBLIC;
GRANT USAGE ON SCHEMA "CARTO"."CARTO" TO ROLE PUBLIC;
GRANT SELECT ON ALL TABLES IN SCHEMA "CARTO"."CARTO" TO ROLE PUBLIC;
GRANT SELECT ON FUTURE TABLES IN SCHEMA "CARTO"."CARTO" TO ROLE PUBLIC;
GRANT SELECT ON ALL VIEWS IN SCHEMA "CARTO"."CARTO" TO ROLE PUBLIC;
GRANT SELECT ON FUTURE VIEWS IN SCHEMA "CARTO"."CARTO" TO ROLE PUBLIC;
GRANT USAGE ON ALL FUNCTIONS IN SCHEMA "CARTO"."CARTO" TO ROLE PUBLIC;
GRANT USAGE ON FUTURE FUNCTIONS IN SCHEMA "CARTO"."CARTO" TO ROLE PUBLIC;
GRANT USAGE ON ALL PROCEDURES IN SCHEMA "CARTO"."CARTO" TO ROLE PUBLIC;
GRANT USAGE ON FUTURE PROCEDURES IN SCHEMA "CARTO"."CARTO" TO ROLE PUBLIC;
```

**API integration**

CARTO’s Analytics Toolbox for Snowflake uses external lambda functions in Amazon Web Services (AWS) in order to perform requests to our external Location Data Services (LDS) providers for the geocoding and isolines functions in the [LDS module](../../sql-reference/lds/). CARTO provides a specific role to make use of the lambda functions: arn:aws:iam::000955892807:role/CartoFunctionsRole.

Snowflake external functions are required to call the lambda function via an API Gateway. These are the endpoints currently available for CARTO LDS, select the best for your case, depending on the region of your Snowflake account: 

| AWS region | Region name | API Gateway endpoint |
|------------|-------------|----------------------|
| Asia Pacific (Tokyo) | ap-northeast-1 | https://d0ril9q8b8.execute-api.ap-northeast-1.amazonaws.com/production/lds |
| Asia Pacific (Sydney) | ap-southeast-2 | https://wccsrp480l.execute-api.ap-southeast-2.amazonaws.com/production/lds |
| Europe (Ireland) | eu-west-1 | https://a3g86ayq28.execute-api.eu-west-1.amazonaws.com/production/lds |
| United States East (N. Virgina) | us-east-1 | https://m0qahrqhei.execute-api.us-east-1.amazonaws.com/production/lds |

{{% bannerNote title="WARNING" type="warning" %}}
Pay attention to this step and remember that you should choose the best API Gateway endpoint for your case based on the region of your Snowflake account. If you make the configuration using an endpoint and later you want to modify it, you must repeat the whole setup and installation process.
{{%/ bannerNote %}}

For illustration purposes let’s pick, for example, region “us-east-1”; then, the API Gateway end-point would be: “https://m0qahrqhei.execute-api.us-east-1.amazonaws.com/production/lds”.

To make the connection between Snowflake and the API Gateway, a component called API integration is required. Follow the steps below to create the API integration to be able to use CARTO’s Location Data Services (replacing the API Gateway endpoint with the most suitable one for your Snowflake account):

```sql
-- Set admin permissions
USE ROLE ACCOUNTADMIN;
 
-- Create the api integration
CREATE OR REPLACE API INTEGRATION CARTO_LDS
  API_PROVIDER = AWS_API_GATEWAY
  API_AWS_ROLE_ARN = 'arn:aws:iam::000955892807:role/CartoFunctionsRole'
  ENABLED = TRUE
  API_ALLOWED_PREFIXES = ('https://m0qahrqhei.execute-api.us-east-1.amazonaws.com/production/lds');
 
-- Grant usage on the api integration
GRANT USAGE ON INTEGRATION CARTO_LDS TO ROLE PUBLIC;
```

#### Installation
{{% bannerNote title="NOTE" type="note" %}}
These instructions are well tested to install the Analytics Toolbox in a Snowflake account. If you're running into issues, please confirm you've properly run all the Setup steps detailed in the previous sections. For assistance please contact CARTO’s support team at support@carto.com. 
{{%/ bannerNote %}}

Admin users can install the Analytics Toolbox in Snowflake accounts from the Settings section available in the CARTO Workspace. In Settings, Admins will find a sub-section called “Analytics Toolbox” in which they can see and manage all different installations of the Analytics Toolbox associated with the CARTO account. 

In order to start the installation process of the Analytics Toolbox in your Snowflake account, click on “+ New installation” on the aforementioned area of the Settings section. 

![Analytics Toolbox settins section](/img/analytics-toolbox-snowflake/SF_AT_install_UI1.png)

From the list of the supported cloud data warehouses, select “Snowflake” and click on “Continue”. 

![Analytics Toolbox new installation DW selection](/img/analytics-toolbox-snowflake/SF_AT_install_UI2.png)

The first thing that the installation wizard will ask you is to confirm that you have followed all the necessary steps detailed on the “Setup” section of this documentation. Mainly, the creation of the “carto” database with the “carto” schema, plus a user and a role with the necessary privileges for CARTO to securely connect with your account and perform the installation and future updates of the Analytics Toolbox.

Once you have ensured that your Snowflake account has been configured appropriately, confirm by ticking the box next to the message “I have already completed the setup of my Snowflake account”. 

![Analytics Toolbox new installation](/img/analytics-toolbox-snowflake/SF_AT_install_UI3.png)

In the next step, you should input your Snowflake account name and the password you have associated with the “carto” user. Then, click on “Validate setup” so CARTO can check that we have access to all necessary resources to securely proceed with the Analytics Toolbox installation in your Snowflake account.

![Analytics Toolbox new installation account details](/img/analytics-toolbox-snowflake/SF_AT_install_UI4.png)

During this process CARTO will check that we have access to the “carto” database and schema with the necessary privileges to perform the installation. We also check that we can see the API integration necessary for the Location Data Services procedures (e.g. geocoding, islones, etc.). If you encounter any issues in this step please do not hesitate to contact CARTO’s support team at support@carto.com to receive technical assistance. 

Once we validate that the Snowflake account has been set up successfully, you can click on “Install” in order to start the actual installation of the Analytics Toolbox. 

![Analytics Toolbox setup validation](/img/analytics-toolbox-snowflake/SF_AT_install_UI5.png)

Once you click on Install, the process of installing all functions and procedures in the relevant database will start. Please bear in mind that this process may take several minutes to complete. 

![Analytics Toolbox installation](/img/analytics-toolbox-snowflake/SF_AT_install_UI6.png)

Once the process completes successfully, click on “Done” to go back to the Analytics Toolbox section in Settings.

![Analytics Toolbox installation done](/img/analytics-toolbox-snowflake/SF_AT_install_UI7.png)

Now, you should be able to see your new Analytics Toolbox installation listed with its relevant details and “Available” as its Status. You are now all set to start getting the most out of advanced spatial analytics natively in your Snowflake account! 

![Analytics Toolbox settins section with a new installation register](/img/analytics-toolbox-snowflake/SF_AT_install_UI8.png)

Once you have installed the Analytics Toolbox in your Snowflake account, all connections to Snowflake databases within that account and which have access to the “carto” database and “carto” schema should be able to automatically detect the Analytics Toolbox and make use of it. In that case, you should see in the relevant connection cards in the “Connections” section of the Workspace that the Analytics Toolbox is available.  

![Carto connections with Analytics Toolbox available](/img/analytics-toolbox-snowflake/SF_AT_install_UI9.png)

#### Updates

We are currently actively working on further expanding and improving the Analytics Toolbox, therefore we tend to release a new update of this component approximately every month. When updates become available you will be informed in the Settings section plus in each connection card that is associated with a specific Analytics Toolbox installation.

![Carto connections with Analytics Toolbox updates](/img/analytics-toolbox-snowflake/SF_AT_install_UI10.png)

Admin users can manage the updates of the Analytics Toolbox from the Settings section, in the same area used to perform the installation. Once new updates become available, click on the “Update available” option in the Status column associated with the relevant installation.  

![Analytics Toolbox settings sections with updates in the installations list](/img/analytics-toolbox-snowflake/SF_AT_install_UI11.png)

Please confirm that you would like to proceed with the Analytics Toolbox update in the dialog box that will appear on your screen by clicking on the “Yes, update” button.

![Analytics Toolbox update process confirmation](/img/analytics-toolbox-snowflake/SF_AT_install_UI12.png)

CARTO will use the same credentials provided for that Analytics Toolbox installation and perform the update process on the same resources used during the installation.

![Analytics Toolbox update process](/img/analytics-toolbox-snowflake/SF_AT_install_UI13.png)

Once the update has completed successfully please click on “Done”. You should then see the Analytics Toolbox installation again with “Available” on the Status column.

![Analytics Toolbox update done](/img/analytics-toolbox-snowflake/SF_AT_install_UI14.png)

![Analytics Toolbox settins section with some installations](/img/analytics-toolbox-snowflake/SF_AT_install_UI15.png)

**Change credentials**

If for any reason you need to change the password of the “carto” user that was used for installing the Analytics Toolbox in your account and that will be used also for updating the package, you can do so by selecting “Change credentials” in the relevant Analytics Toolbox installation from the list.

![Analytics Toolbox settins change credentials](/img/analytics-toolbox-snowflake/SF_AT_install_UI16.png)

As all other parameters are fixed, you can only modify the password. Please introduce and confirm the new password associated with the “carto” user and click on “Validate credentials”.

![Analytics Toolbox change credentials screen](/img/analytics-toolbox-snowflake/SF_AT_install_UI17.png)

Next, CARTO will validate that with the new credentials we can check the setup that will be necessary to update the Analytics Toolbox when new versions become available. 

![Analytics Toolbox change credentials validation](/img/analytics-toolbox-snowflake/SF_AT_install_UI18.png)

Once CARTO has validated that everything works well, click on “Save changes”.  

![Analytics Toolbox change credentials done](/img/analytics-toolbox-snowflake/SF_AT_install_UI19.png)

#### Uninstallation

Admin users can uninstall the Analytics Toolbox from Snowflake accounts at any time. In order to do that, you should click on Uninstall from the relevant Analytics Toolbox installation detailed in the Settings section. 

![Analytics Toolbox settins change credentials](/img/analytics-toolbox-snowflake/SF_AT_install_UI16.png)

Next, as this process will be irreversible, we ask you to confirm that you would like to uninstall that specific Analytics Toolbox installation. Click on “Yes, uninstall” to proceed with uninstalling the Analytics Toolbox from your Snowflake account. 

![Analytics Toolbox uninstall confirmation](/img/analytics-toolbox-snowflake/SF_AT_install_UI20.png)

![Analytics Toolbox uninstall done](/img/analytics-toolbox-snowflake/SF_AT_install_UI21.png)

Once the process is complete, you will be taken back to the Analytics Toolbox section of Settings in which the specific installation that you have just removed should not appear anymore.  

![Analytics Toolbox settins section](/img/analytics-toolbox-snowflake/SF_AT_install_UI1.png)

Note that any active Snowflake connection will have stopped having access to the Analytics Toolbox. Therefore, in their connection cards you will be informed that the Analytics Toolbox is not available and that the Admin user should install it. 

![CARTO connections without Analytics Toolbox](/img/analytics-toolbox-snowflake/SF_AT_install_UI22.png)


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
