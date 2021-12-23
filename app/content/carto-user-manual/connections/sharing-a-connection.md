## Sharing a connection

This guide describes how you can share a connection with your teammates. When you create a connection, it’s always private by default.

In the Connections section of the Workspace, you can view the list of your current connections. If your connection is private, you will have access to the quick actions menu to manage your connection by clicking on the three point icon in the top right hand corner. There are 3 options available: Edit, Share and Delete.

![Edit connection](/img/cloud-native-workspace/connections/the_connections_share.png)

If you click the *Share* quick action, you will be redirected to a new dialog screen that will allow you to select who you want to share your maps with. 

![Edit connection](/img/cloud-native-workspace/connections/the_connections_sharing_options_private.png)

Click on *Organization* to share it. 

![Edit connection](/img/cloud-native-workspace/connections/the_connections_sharing_options_organization.png)

{{% bannerNote title="WARNING" type="warning"%}}
Note that if you share the connection with your organization, you're effectively granting users access to any permissions that might be also available in this connection, such as updating or deleting data through SQL queries.
{{%/ bannerNote %}}

Once you have shared your connection, it will be available to all users in your organization. This means they'll be able to use this connection in their own maps. You can easily identify it with the icon and label on the card.

![Edit connection](/img/cloud-native-workspace/connections/the_connections_shared_connection.png)

You can always change the privacy of your connection. When you select the private mode, a message will appear warning you that by making the connection private, it will break the data sources added by other users, affecting their maps. Click on *Confirm* to accept this or click on *Cancel* to continue:

![Connection confirmation deletion](/img/cloud-native-workspace/connections/the_connections_private_warning.png)

{{% bannerNote title="About sharing OAuth connections" type="info"%}}
Connections created using OAuth credentials (such as "Sign in with Google") can't be shared with the organization since they're tied to a single OAuth account (eg: a Google account)
{{%/ bannerNote %}}
