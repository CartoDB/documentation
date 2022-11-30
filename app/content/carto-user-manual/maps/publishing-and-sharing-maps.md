## Publishing and sharing maps

This guide describes how you can share any CARTO map with your teammates, or publish a map to the internet, using CARTO Builder.

When you create a map, it's always **private** by default.

To be able to share a map, you need to add data and a title to the map:


![Publish options share link button](/img/cloud-native-workspace/maps/map_share_button_add_data_and_title.png)

![Publish options share link button](/img/cloud-native-workspace/maps/map_share_button_disabled.png)

Once you have added data and a title to your map, the *Share* button will be enabled and you will be able to share your maps with your organization, by clicking the *Share* button on the top-right to open the sharing options.

![Publish options share link button](/img/cloud-native-workspace/maps/map_share_button.png)

A new dialog screen will open allowing you to select who you want to share your maps with:

![Publish options share link](/img/cloud-native-workspace/maps/map_sharing_options_private_by_default.png)

Here you'll find three different sharing options:

* **Private**: Only you can view and open it.
* **Organization**: The map will be visible to all users in your organization.
    * **Sharing with specific groups**: The map will be visible to only specific groups of users in your organization. [Read more on this option](#sharing-with-certain-groups).
* **Public Map**: The map will be visible to anyone in the internet with the link.

Remember that if your map is "shared" or "public" you'll need to push your changes. So, if there is an small green dot in the top right corner of the *Share button* means there are changes that has not been updated yet:

![Publish map updates button](/img/cloud-native-workspace/maps/share_button_the_updates.png)

In order to save the changes and publish them we must click in the "Publish Updates" button, once you click in the previous sharing button:

![Publish map share button](/img/cloud-native-workspace/maps/map_publish_the_updates.png)

Public maps have some extra options: to share the link with the public, to get Developers information for embedding, or to work with CARTO for developers. You can toggle between these subtabs and select the option you are interested in.

![Publish options share link](/img/cloud-native-workspace/maps/map_new_sharing_options_public_map.png)

![Publish options share link](/img/cloud-native-workspace/maps/map_new_sharing_options_developers.png)

### Sharing with certain groups

If you have Single-Sign On (SSO) enabled at your organization, you will be able to share maps only with specific groups inside your organization, instead with all users belonging to it.

![Map sharing with specific groups](/img/cloud-native-workspace/maps/map_sharing_options_with_groups.png)


To understand how groups are synchronized between CARTO and your SSO Identity Provider, please read our documentation on [Managing User Groups](/carto-user-manual/settings/managing-user-groups).
### Password protected maps

You can also protect your maps before sharing them by enabling password protection and setting a map password.

![Publish options share link](/img/cloud-native-workspace/maps/map_sharing_enabling_password_protection.png)

Once you have set your map password, select your public map option and click on *Apply*.

![Publish options share link](/img/cloud-native-workspace/maps/map_sharing_with_password.png)

When someone opens the link, they will be asked to enter the map password before loading the map. Insert the map password and click on *Continue* to visualize the map or contact the owner if you need access.

![Publish options share link](/img/cloud-native-workspace/maps/map_sharing_dialog_enter_password.png)
### Publishing updates for shared and public maps

Once your map is shared or public, you can manage the state of the map for your viewers (so your editing doesn't affect their experience). When you're ready to push an update, click on the *Share* button:

![Publish map share button](/img/cloud-native-workspace/maps/share_button_the_updates.png)

You will see the date for the last time the map changes were pushed to the viewers. If you want to update it and push the current version, click on *Publish Updates*:

![Publish map update button](/img/cloud-native-workspace/maps/map_publish_the_last_published.png)

Viewers will see always the version of the map that you last updated.

### Publishing options

When sharing your map with other people as viewers (ie: a public map or a map shared with the organization) you can control the final experience for the viewers using the following settings:

- Refresh data sources every _N_: This option will make sure that the data displayed in your map is not older than the time specified in the setting.

{{% bannerNote title="NOTE" type="note"%}}
Bear in mind that using this option might increase the amount of data processed in your data warehouse, which might have a significant cost associated to it.

The cached objects associated to the data sources in the map will be invalidated, and the SQL queries that were executed to generate them will be executed again.
{{%/ bannerNote %}}

- Export viewport data: when enabled, viewers will be able to export the data available in the viewport in CSV format. [Read more about exporting data](/carto-user-manual/maps/exporting-data/).
- Address search bar: use this setting if you want to let viewers use the search bar in the top left to focus the map at a given address. [Read more about searching addresses](/carto-user-manual/maps/address-search-bar/).
- Date control: When enabled, viewers of the map will be able to use the date selector to filter the data layers in the map. [Read more about the Date filter](/carto-user-manual/maps/date-filter).
- Scroll wheel zoom: when enabled, viewers will be able to use their mouse wheel to zoom in or out.
- Feature selection tool: when enabled, viewers will be able to filter the map using squares, circles, or drawing their own polygons. [Read more about the feature selection tool](/carto-user-manual/maps/feature-selection-tool/).
- Show performance warnings: checking this option will make warnings regarding performance appear for viewers too, for example, when using large datasets or zooming too far away.

Finally, press "save" to confirm your changes.

![Published map options](/img/cloud-native-workspace/maps/map_sharing_options_published_settings.png)

### Embed API

CARTO embed maps can be controlled via URL parameters. These parameters allow to dynamically configure an existing map. This is specially useful when building story maps with no-code tools. Take a look at [this tutorial](/carto-user-manual/tutorials/build-interactive-map-embedded-capabilities/) to know more about it.

|Parameter  |Functionality   |Example   |
|---|---|---|
|`lat` / `lng`|Define the coordinates where the map should be centered|[...?lat=48.856&lng=2.348](https://gcp-us-east1.app.carto.com/map/c869093a-4eea-4239-a3ec-7cce66eb015e?lat=48.856&lng=2.348)
|`zoom`|Define the zoom level when loading the map|[...?zoom=15](https://gcp-us-east1.app.carto.com/map/c869093a-4eea-4239-a3ec-7cce66eb015e?lat=48.856087&lng=2.348647&zoom=15)
|`pitch`|Control the vertical angle in degrees. From `0` (orthogonal to the ground) to `60`|[...?pitch=40](https://gcp-us-east1.app.carto.com/map/c869093a-4eea-4239-a3ec-7cce66eb015e?lat=48.856087&lng=2.348647&zoom=15&pitch=40)
|`bearing`|Control the horizontal angle measured clockwise as an angle from `0` (North). East is 90° , south is 180°, and west is 270°|[...?bearing=90](https://gcp-us-east1.app.carto.com/map/c869093a-4eea-4239-a3ec-7cce66eb015e?lat=48.856087&lng=2.348647&zoom=15&pitch=40&bearing=90)
|`layers`|Select the layers that are visible in the map as a list of visible layers. Starts at `0` with the first layer in the Builder map | [...?layers=0,1](https://gcp-us-east1.app.carto.com/map/c869093a-4eea-4239-a3ec-7cce66eb015e?lat=48.856087&lng=2.348647&zoom=15&pitch=40&bearing=90&layers=0)
