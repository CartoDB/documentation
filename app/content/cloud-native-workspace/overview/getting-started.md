## Getting started

The CARTO 3 Workspace allows you to create amazing maps and spatial analytics at a scale, straight from your data warehouse. Take the most from our Spatial Extension, the Tilesets module, and other fresh features.

### Create your CARTO 3 account

4 simple steps gets you into the CARTO 3 Workspace:

1. **Email and password**

    - Go to the <a href="http://app.carto.com" target="_blank">CARTO 3 Sign In</a> page.
    - Click *Sign up*.
    - Enter your email address and password. You can also sing up with your existing Google account by clicking *Continue with Google*.
    - Once you have entered your credentials: click *Continue*.

    ![Sign up Email and password](/img/cloud-native-workspace/get-started/signup_email_password.png)
    - Verify your account with the link sent to your existing email address.
    - Click *Verify email* in the email sent.

    ![Verify your account](/img/cloud-native-workspace/get-started/signup_verify_account.png)

    - Click *Back to Accounts Login/Signup*.

    ![Email verified](/img/cloud-native-workspace/get-started/signup_email_verified.png)

2. **Account setup**

    - Choose an account name.
    - Choose your region: CARTO’s cloud-infrastructure of Google Cloud Platform is in 2 GCP regions (Europe-West and USA-Central). We give you the possibility to choose the region that is closer to your data warehouse.
    - Click *Next*.

    ![Account setup](/img/cloud-native-workspace/get-started/account_setup.png)

3. **Personal information**

    Enter your personal information:

    - First name.
    - Last name.
    - Country.
    - Phone number.
    - Click *Next*.

    ![Personal information](/img/cloud-native-workspace/get-started/personal_information.png)

4. **Business profile**

    Enter your business profile information:

    - Company name.
    - Job title.
    - Number of employees (optional).
    - Industry (optional).
    - What use case are you interested in? (optional).

    By signing up you accept the <a href="https://carto.com/legal/" target="_blank">Terms and conditions of the Services</a> and the <a href="https://carto.com/privacy/" target="_blank">privacy notice</a>.

    - Click *Finish*.

    ![Business profile](/img/cloud-native-workspace/get-started/business_profile.png)
	
You are all set up to start using CARTO 3!

### CARTO 3 Workspace overview

Learn everything you need to know about your Workspace and how to make the most out of it.

When you log in to your CARTO 3 account, you land on your Workspace. The workspace allows you to manage connections to your data warehouses, creating tilesets and maps, list your applications, access your account settings, manage users of your organization, and access spatial application development features.

![Workspace overview](/img/cloud-native-workspace/get-started/workspace_overview.png)

#### Welcome

The first time that you access the Workspace, you will see a *Welcome* banner with quick access to the *Connections* panel. By clicking this banner, you can easily connect your data warehouse to start using the Workspace. Check the [Quick guide to connect data and create maps](#quick-guide-to-connect-data-and-create-maps) to get started.

![Welcome banner](/img/cloud-native-workspace/get-started/first_connection.png)

#### Recent maps

View your latest content. This module displays the latest 3 maps that you have been working on so that you can quickly access and continue working with them.

![Recent maps](/img/cloud-native-workspace/get-started/recent_maps.png)


#### Getting started

In this section, you have quick access to different options to get started with the CARTO 3 Workspace, like creating maps from your data, developing spatial applications, learning how to use the Spatial Extension, etc.

![Recent maps](/img/cloud-native-workspace/get-started/getting_started.png)

#### What’s new

Fresh features, interesting articles, and the latest news related to CARTO 3 from our <a href="https://carto.com/blog" target="_blank">blog</a>.

![Recent maps](/img/cloud-native-workspace/get-started/what_is_new.png)

#### Menu

In the left panel, you can find the navigation menu with all the available options to access the CARTO 3 features: Maps, Tilesets, Connections, Applications, Account Settings, and CARTO for Developers. 

![Menu features](/img/cloud-native-workspace/get-started/menu_features.png)

In the bottom part of the menu, you have additional options to Join our Slack channel, send us feedback, or access to Documentation.

![Menu features additional options](/img/cloud-native-workspace/get-started/menu_features_more.png)

### Quick guide to connect data and create maps

#### Introduction

This is a quick guide to help you get started. A step-by-step overview on how to connect to your data warehouse and create maps using your data.

The CARTO 3 Workspace includes functionalities for registering and managing connections to your data warehouses. Once you have registered a connection, you can perform different operations with the data source, like executing the functions provided by the CARTO Spatial Extension or creating stunning maps.

#### Create a Connection

Go to the *Connections* menu in the Workspace, where you will see the list of your current connections. If you haven’t registered a connection yet, you will see the following page:

![Connections module](/img/cloud-native-workspace/get-started/connections_module.png)

For adding a new connection follow the next steps:

1. Select your data warehouse: BigQuery, PostgreSQL, Redshift, Snowflake, etc.
2. Click the *Setup connection* button, or the *Connect using a service account* button if you are connecting to BigQuery.
3. Enter the connection parameters and credentials. You need to enter the connection parameters such as the server, username, password, or provide a service account, depending on the connector.

The following screen shows the connection setup options for BigQuery:

![Connection setup with BigQuery](/img/cloud-native-workspace/get-started/connections_bigquery_parameters.png)

After you have provided the connection parameters, click the *Connect* button. Then you will see the list of your current connections:

![Successful connection](/img/cloud-native-workspace/get-started/connections_successful.png)

#### Create a Map

The *Maps* page enables you to create and manage maps in the CARTO 3 Workspace. You can use existing connections to your data warehouses or you can directly upload new datasets files.

1. From your *Maps* page, click *Create your first map*. This will open the CARTO 3 map tool: Builder.
	
![Map module](/img/cloud-native-workspace/get-started/map_module.png)

2. The *Add data* options appear, where you can upload new datasets using a local file or add a dataset from your existing data warehouse connection. In this example, we are using the BigQuery connection created in the previous step. With BigQuery we can use a Query to retrieve data, add a whole Table, or a Tileset.
	
![Add data to your map](/img/cloud-native-workspace/get-started/map_add_dataset.png)
	
3. In this example we are going to use a table. The next step is entering the fully qualified table name.
4. Click *add*.

![Enter table name](/img/cloud-native-workspace/get-started/map_add_layer.png)

5. Once the process is finished, the BigQuery table is included in the Builder map tool as a new layer. The map displays the basemap and map layer that are the backbone for rendering your visualization. You can add additional layers, or apply styling and analysis features.
	
![Map created](/img/cloud-native-workspace/get-started/map_style.png)

The CARTO 3 Builder contains many features that guide you through the process of creating a map, changing the styling, and selecting how your data appears. Use the following task list as guide for some of the main CARTO 3 Builder features:
