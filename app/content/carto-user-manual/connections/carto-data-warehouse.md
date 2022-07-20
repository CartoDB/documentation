## CARTO Data Warehouse

Every CARTO organization comes provisioned with an active data warehouse connection that is created by default. 

This connection will grant you access to some resources, in terms of cloud storage and cloud computing, that are provided by CARTO. This default connection will help you get started with our platform, and it will also give you access to some demo datasets so you can start using our platform from the very beginning. It will also enable you to have access to spatial datasets from CARTO’s Data Observatory without the need of connecting your own data warehouse to get access to cloud resources.

![Connections module](/img/cloud-native-workspace/connections/the_connections_the_cartodw.png)

### Limits

The `CARTO Data Warehouse` connection is limited to a certain amount of computing per day. You can find this limit in the `CARTO Data Warehouse` connection's card. These limits depend on whether your organization has purchased the CARTO Data Warehouse Add-on in your subscription plan. 

### CARTO Demo Data

The `CARTO Data Warehouse` connection grants access to a set of demo tables and tilesets that can be used to start creating maps and exploring the tools from the very beginning. They're available and ready to be used in the Data Explorer.

![Connections module](/img/cloud-native-workspace/connections/the_connections_cartodw_folders_tree.png)

<!-- ![Connections module](/img/cloud-native-workspace/connections/the_connections_cartodw_folders.png) -->

{{% bannerNote type="note" title="Note"%}}
If your CARTO account has been provisioned on a cloud region outside the US (e.g., Europe-West, Asia-Northeast), you will find available an additional dataset called `shared-us` in your CARTO Data Warehouse connection. With the tables stored in `shared-us` you will be able to access certain functionalities, such as creating tilesets and performing data enrichment with Data Observatory subscriptions, that are only available at the moment for data tables stored in the US multi-region. In case of questions, please contact support@carto.com.
{{%/ bannerNote %}}

