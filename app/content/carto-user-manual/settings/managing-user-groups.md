## Managing user groups

When a Single Sign-On (SSO) is configured to access CARTO, we can also synchronize the groups coming from your Identity Provider (IdP) after each user's login.

{{% bannerNote title="Note" type="note"%}}
Single Sign-On and Groups integrations are only available for Enterprise Medium plans and above. Please get in touch at hello@carto.com if you're interested in this feature.
{{%/ bannerNote %}}

![Settings groups list](/img/cloud-native-workspace/settings/settings_groups_list.png)

##### How are groups synchronized with the SSO?

We synchronize the membership for each user when they login through the SSO, and we make any necessary changes.

{{% bannerNote title="EXAMPLE" type="note"%}}
- User A:
    - Belongs to the "Sales" and "North America" groups at the IdP level
    - Logs in to CARTO
    - CARTO creates the groups "Sales" and "North America" and adds user A to both groups

- User B:
    - Belongs to the "Sales" and "Asia" groups at the IdP level
    - Logs in to CARTO
    - CARTO creates the group "Asia" and adds user B to the "Asia" and "Sales" groups

{{%/ bannerNote %}}

In practice this means that **groups in CARTO will be kept in sync with the SSO groups** throughout all possible changes, including a user being removed from a group.

Groups can be used to fine-tune access and more granular sharing in different parts of the CARTO platform, such as connections and maps. [Read more about sharing maps with certain groups](/carto-user-manual/maps/publishing-and-sharing-maps/#sharing-with-certain-groups).


