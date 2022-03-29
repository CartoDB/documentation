## Managing user roles

From the *Users* section, you can view the list of users who have access to your organization. You can access the quick actions menu to manage users role by clicking the three point icon in the right hand corner. There are four options available: Make Admin, Make Editor, Make Viewer and Delete. 

{{% bannerNote title="NOTE" type="note"%}}
Bear in mind that the available roles vary depending on the initial role and the Admin role cannot be changed or deleted. 
{{%/ bannerNote %}}

In the following example, the initial role is *Viewer* and therefore the options are limited to *Admin* and *Editor*:

![Settings user role actions](/img/cloud-native-workspace/settings/settings_managing_available_roles.png)
### Making Admin

If you click the Make Admin quick action, you are providing **Admin** role to that user. Admins can do everything an editor can do, plus they can access the Organization Settings. This allows them to invite other users, modify their roles or check organization quotas.

{{% bannerNote title="NOTE" type="note"%}}
Remember that there can be more than one admin in a given organization.
{{%/ bannerNote %}}


### Making Editor

If you click the Make Editor quick action, you are providing **Editor** role to that user. Editors can create connections, applications and maps, as well as edit them.

### Making Viewer

If you click the Make Viewer quick action, you are providing **Viewer** role to that user. Viewers can only see maps and applications previously shared with them.

If you choose the rol *Viewer* role, a dialog will appear allowing you to confirm that you want to assign the selected email account as viewer role. Click *Yes, assign viewer role* to confirm the changes or click Cancel if you don’t want the changes to be applied.

![Settings assign viewer role](/img/cloud-native-workspace/settings/settings_assign_viewer_role.png)
### Deleting User

If you click the Delete user quick action, a dialog will appear allowing you to confirm that you want to delete the user. Click the *Yes, delete* button to confirm the changes or click Cancel if you don’t want the changes to be applied.

![Settings delete user organization](/img/cloud-native-workspace/settings/settings_deleting_user_organization.png)

{{% bannerNote type="warning" title="warning"%}}
If you downgrade to viewer or fully delete a user, all assets (maps, connections, applications...) belonging to that user will be transferred to you, that is, the admin making the action.
{{%/ bannerNote %}}