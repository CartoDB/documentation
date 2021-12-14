## Getting access

There are two ways to get access to the Analytics Toolbox for Snowflake; the easiest is to get it from the Data Marketplace, but if you need to install it into your database or require more control over the installation you can also perform a manual installation.

### Marketplace installation

You can get access to the Analytics Toolbox for Snowflake through the [Snowflake's Data Marketplace](https://www.snowflake.com/datasets/carto-spatial-extension/). If you are unsure of how to access the Data Marketplace, you can find detailed instructions in [this article](https://docs.snowflake.com/en/user-guide/data-marketplace-intro.html#how-do-i-access-the-snowflake-data-marketplace-to-browse-listings) of Snowflake's documentation center.

Once in the Data Marketplace, search for _carto analytics toolbox_ to find the listing:

![Analytics Toolbox for Snowflake listing](/img/sf-analytics-toolbox/sf-datamarketplace-step1.png)

Once you are in the details page of the listing, you will find that you can _GET_ the Analytics Toolbox directly following these instructions:


1. Click on the GET DATA button on the top right corner of the Data Marketplace listing.

![Analytics Toolbox for Snowflake get data](/img/sf-analytics-toolbox/sf-datamarketplace-step2-get.png)

2. Rename the database to `SFCARTO`. Next, click on _More options_ to choose all the roles to which you wish to give access to this database, accept the Terms of Use and finally click on "Create Database".

![Analytics Toolbox for Snowflake get data form](/img/sf-analytics-toolbox/sf-datamarketplace-step3-get.png)

By clicking on "View Database" you will be redirected to the database you just created, where you will be able to browse all the modules (schemas) and functions and procedures available within the Analytics Toolbox.

![Analytics Toolbox for Snowflake get data form](/img/sf-analytics-toolbox/sf-datamarketplace-step5-get.png)




### Manual installation

This guide explains all the steps to install the SQL functions and procedures of the toolbox in your Snowflake database.

The CARTO Analytics Toolbox contains two packages:
* **core**: this is the public and open-source package. It contains all the core GIS functions that complement the GIS native functions available in Snowflake.
* **advanced**: this is a premium package. It contains advanced GIS functions to power high-level GIS analytics in Snowflake.

NOTE: This guide explains how to install the core package. In order to access the **advanced** features, please contact support@carto.com.

We can divide the process into two steps: setup and installation. The first one must be done only the first time, then the second one must be done every time you want to install a new version of the packages.

#### Setup

This step consists of setting up the Snowflake database where we want to install the toolbox. A Snowflake account and cluster are required.

We'll create a database named "carto" to hold the CARTO Analytics Toolbox.This is the recommended setup; in case you need to install it in an existing database you can follow the instructions further below.

We also recommend having a dedicated user called "carto" to manage the CARTO Analytics Toolbox. The following script will create the user, database, schema and role to be used for the installation. Note that this script must be executed by an [account administrator](https://docs.snowflake.com/en/user-guide/security-access-control-considerations.html#using-the-accountadmin-role)

```sql
-- Set admin permissions
USE ROLE accountadmin;

-- Create a role for the carto user
CREATE ROLE carto_role;

-- Ensure the sysadmin role inherits any privileges the carto role is granted.
-- Note that this does not grant sysadmin privileges to the carto role
GRANT ROLE carto_role TO ROLE sysadmin;

-- Create carto database?
CREATE DATABASE carto;

-- Create the carto user
CREATE USER carto WITH DEFAULT_ROLE=carto_role DEFAULT_WAREHOUSE=COMPUTE_WH PASSWORD='<strong, unique password>';

-- Grant the carto role to the carto user
GRANT ROLE carto_role TO USER carto;

-- Let the carto user see this database
GRANT USAGE ON DATABASE carto TO ROLE carto_role;

-- Create the carto schema
CREATE SCHEMA carto.carto;

-- Give the carto user full access to the carto schema
GRANT ALL PRIVILEGES ON SCHEMA carto.carto TO ROLE carto_role;

-- Grant usage on public role
GRANT USAGE ON DATABASE carto TO ROLE public;
GRANT USAGE ON SCHEMA carto.carto TO ROLE public;
GRANT SELECT ON ALL TABLES IN SCHEMA carto.carto TO ROLE public;
GRANT SELECT ON FUTURE TABLES IN SCHEMA carto.carto TO ROLE public;
GRANT SELECT ON ALL VIEWS IN SCHEMA carto.carto TO ROLE public;
GRANT SELECT ON FUTURE VIEWS IN SCHEMA carto.carto TO ROLE public;
GRANT USAGE ON ALL FUNCTIONS IN SCHEMA carto.carto TO ROLE public;
GRANT USAGE ON FUTURE FUNCTIONS IN SCHEMA carto.carto TO ROLE public;
GRANT USAGE ON ALL PROCEDURES IN SCHEMA carto.carto TO ROLE public;
GRANT USAGE ON FUTURE PROCEDURES IN SCHEMA carto.carto TO ROLE public;
```

In the installation step the information established by this script will be needed:
* database name ("carto")
* user ("carto")
* password

You can check out the [Snowflake getting started documentation](https://docs.snowflake.com/en/user-guide-getting-started.html) for further information.

#### Installation

Once the setup is completed, we can proceed with the installation of the toolbox. This step will be performed the first time and every time we want to install an updated version.

##### 1. Connect to the database

This step is required to run the next SQL scripts. Connect to the account using the "carto" user and password. Then it is very important to set the role, database and schema used to install the toolkit:

```sql
USE ROLE carto_role;
USE DATABASE carto;
USE SCHEMA carto;
```

##### 2. Check the installed version

If this is the first time installing the toolbox, skip this step.

Download the version file from:
https://storage.googleapis.com/carto-analytics-toolbox-core/snowflake/latest/version

Compare with your version installed:

```sql
SELECT carto.VERSION_CORE();
```

##### 3. Create the functions and procedures

Download the `modules.sql` file from: https://storage.googleapis.com/carto-analytics-toolbox-core/snowflake/latest/modules.sql

Execute the file `modules.sql` to create the SQL functions and procedures in the "carto" schema of the "carto" database.

Warning: this file will remove all the previous functions and procedures in the "carto" schema.

**Congratulations!** you have successfully installed the CARTO Analytics Toolbox in your Snowflake database. Now you can start [using the functions](/analytics-toolbox-snowflake/sql-reference/overview/).
