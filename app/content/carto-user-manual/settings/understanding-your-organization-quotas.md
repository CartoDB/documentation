## Understanding your organization quotas

Every CARTO pricing plan includes a set of available quotas such as the total number of editors or the total number of applications that the organization can create.

Let's review these quotas more in depth, with examples to help you predict usage.

![Appearance Settings](/img/cloud-native-workspace/settings/settings_subscription_quotas.png)

#### Editor users

An editor is a user that has permissions to create and edit maps, connections, applications... This is a hard quota, and will be enforced whenever you try to add new editors. For more information on how to manage users, check [Managing User Roles](/carto-user-manual/settings/managing-user-roles/).

{{% bannerNote title="Example"%}}
If I already have 3 out of 3 editors available, I won't be able to invite new editors or promote viewers to editors.
{{%/ bannerNote %}}

--- 

#### Viewer users

A viewer is a user that can only view the objects (maps, applications...) produced in the organization. They can't create or edit anything in the organization... This is a hard quota, and will be enforced whenever users try to signup or whenever you try to add new viewers through invitations or roles. For more information on how to manage users, check [Managing User Roles](/carto-user-manual/settings/managing-user-roles/).

{{% bannerNote title="Example"%}}
If I already have 50 out of 50 editors available, I won't be able to invite viewers or demote editors to viewers. Also, users that try to join or request to join the organization will be blocked.
{{%/ bannerNote %}}

--- 

#### Total maps

All maps (public, private or shared) from all users count towards this quota. A good practice to manage this quota is to have all the users delete unused maps. For more information on how to manage maps, check the [Maps documentation](/carto-user-manual/maps/introduction/).

{{% bannerNote title="Example"%}}
If I already have 100 out of 100 maps, I won't be able to create new maps or duplicate any existing maps. I will still be able to modify the sharing settings of existing maps.
{{%/ bannerNote %}}

--- 

#### Public maps

Only maps that are shared as "Public" count towards this quota. For more information on sharing maps, check [Publishing and Sharing Maps](/carto-user-manual/maps/publishing-and-sharing-maps/).

Maps shared only with the organization don't count towards this quota.

{{% bannerNote title="Example"%}}
If I already have 10 out of 10 public maps, I won't be able to share new maps as "Public" until I unpublish a existing map or increase the quota.
{{%/ bannerNote %}}

--- 

#### Applications

Applications are the way to create custom developments with CARTO. They are created under the Developers section of the Workspace. Registered apps (the ones you register in Settings) don't count towards this quota. Learn more in the [Applications documentation](/carto-user-manual/applications/accessing-applications/). 

{{% bannerNote title="Example"%}}
If I already have 5 out of 5 applications, I won't be able to create new applications in the "Developers" section.
{{%/ bannerNote %}}

--- 

#### Connections

The way to get, analyze and visualize data coming from your cloud data warehouse is through a **connection**. You can create a connection with Google BigQuery, Snowflake, Amazon Redshift, Databricks or PostgreSQL. Learn more about [Creating and Managing connections](/carto-user-manual/connections/introduction/).

This quota is the maximum number of connections that your organization can have, but it's a **soft quota** and you can create more connections than this number.

We recommend keeping a low number of connections for security and traceability.

{{% bannerNote title="Example"%}}
If I already have used 10 out of 10 connections, me and my users will still be able to create more connections, but a warning will appear.
{{%/ bannerNote %}}

---

#### Increasing quotas

- If you need to increase any of these quotas, please contact your Account Manager, Customer Success Manager or send an email to support@carto.com