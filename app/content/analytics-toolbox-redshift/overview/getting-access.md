## Getting access

Welcome to the installation guide for the CARTO Analytics Toolbox in Redshift. This guide explains all the steps to install the Python libraries and the SQL functions and procedures of the toolbox in your Redshift database.

The CARTO Analytics Toolbox contains two packages:

- **core**: this is the public and open-source package. It contains all the core GIS functions that complement the GIS native functions available in Redshift.
- **advanced**: this is a premium package only available for CARTO customers. It contains advanced GIS functions to power high-level GIS analytics in Redshift.

{{% bannerNote type="note" title="note"%}}
This guide explains how to install the core package. To access the advanced features, please contact support@carto.com.
{{%/ bannerNote %}}

We can divide the process into two steps: setup and installation. The first one must be done only the first time. The second one must be done every time you want to install a new version of the packages.

### Setup

This step consists of setting up the Redshift cluster and database where we want to install the toolbox. An AWS account is required.

Here is the documentation to create a Redshift cluster. Once the cluster is created, save the hostname (e.g. redshift-cluster-1.asdf1234.us-east-2.redshift.amazonaws.com). This is required to perform the connection to the database.

#### Creating the schema

Once the account and the cluster are created, connect the database to create the `carto` schema. The CARTO Analytics Toolbox will be installed in this schema. We also recommend having a dedicated user called `carto` with the permissions to manage the `carto` schema.

To do this, connect to your Redshift database and run the following script:

```sql
-- Create the carto user
CREATE USER carto WITH PASSWORD '<strong, unique password>';
 
-- Create the carto schema
CREATE SCHEMA carto;
 
-- Give the carto user full access to the carto schema
GRANT ALL ON SCHEMA carto TO carto;
GRANT USAGE ON LANGUAGE plpgsql TO carto;
GRANT USAGE ON LANGUAGE plpythonu TO carto;
```

This information (database, user and password) will be needed in the installation step.

You can check out the Redshift getting started documentation for further information.

### Installation

Once the setup is completed, we can proceed with the installation of the toolbox. This step will be performed the first time and every time we want to install an updated version.

#### 1. Connect to the database

This step is required to run the next SQL scripts. Connect to the database that has the CARTO schema using the CARTO user and password.

#### 2. Download the package file

Download the [package file](https://storage.googleapis.com/carto-analytics-toolbox-core/redshift/carto-analytics-toolbox-core-redshift-latest.zip) and unzip it in your local storage.

{{% bannerNote title="TIP" type="tip" %}}
If you have a previously installed version of the Analytics Toolbox, you can check the installed version by running `SELECT carto.VERSION_CORE()`.
{{%/ bannerNote %}}

#### 3. Create the libraries in the cluster

Run the `libraries.sql` to create the Python libraries used by the toolbox in the cluster.

{{% bannerNote type="tip" title="Troubleshooting"%}}
If the following error arises `Must be superuser or the owner of library X`, means that the library is already created by a superuser, so your user can not replace it. If the superuser drops the library (`DROP LIBRARY X`), then your user will be able to create it.
{{%/ bannerNote %}}

#### 4. Create the functions and procedures

Run the `modules.sql` to create the SQL functions and procedures in the `carto` schema.

{{% bannerNote type="warning" title="warning"%}}
This script will remove all the previous functions and procedures in the `carto` schema.
{{%/ bannerNote %}}


**Congratulations!** you have successfully installed the CARTO Analytics Toolbox in your Redshift database. Now you can start testing the functions in the [SQL reference](../../sql-reference/).
