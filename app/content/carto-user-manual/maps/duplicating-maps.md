## Duplicating maps

This guide describes how you can duplicate existing maps from CARTO Workspace, the organization area; and also from CARTO Builder, our map editor. 

Copied maps will always start as `Copy of` plus the original map name, and will always started as private maps for yourself. 

#### Duplicating a map in Workspace

To make a copy of an existing map, go to "Maps" and click on the three-dotted menu in each map card. If you are the owner of the map, you will have access to the 3 available options: Edit name & description, Duplicate map and Delete.

![Recent maps](/img/cloud-native-workspace/get-started/recent_maps_new_options.png)

In the following example, the map has been shared and therefore the option is limited to "Duplicate map". This option is available for all maps, whether you have admin or edit access.

![Duplicate map from Workspace (viewer)](/img/cloud-native-workspace/maps/map_duplicate_from_workspace(viewer_role).png)

#### Duplicating a map in Builder

To be able to duplicate a map, you need to add data or a title to the map:

![Duplicate button disabled](/img/cloud-native-workspace/maps/map_duplicate_button_when_disabled.png)

Once you have added data or a title to your map, the Duplicate button will be enabled and you will be able to duplicate your maps with your organization by clicking on the three-dotted menu in the top right of Builder. If you want to duplicate your map, click on *Duplicate map*.

![Duplicate map from Builder](/img/cloud-native-workspace/maps/map_duplicate_button.png)

#### Current limitations when duplicating maps

If you click on the Duplicate map option, a dialog will appear warning you if any of the sources is not shared with you (eg: a private connection). Click on *Yes, continue anyway* button to confirm or click Cancel if you don’t want the map to be duplicated.

![Duplicate map - Data warning](/img/cloud-native-workspace/maps/map_duplicate_warning.png)

{{% bannerNote title="WARNING" type="warning"%}}
Note that if you duplicate a map with sources that are not sharing with you, the private sources will load with errors and the corresponding layers will not be visible, leaving you the choice of fully removing them or asking for access. This ensures security across data sources, even when making editable map copies between users. 
{{%/ bannerNote %}}

<!-- When duplicating a map, you'll receive a warning if any of the sources is not shared with you (eg: a private connection) — You can continue anyway, but the private sources will load with errors and the corresponding layers will not be visible, leaving you the choice of fully removing them or asking for access. 

![Duplicate map - Data warning](/img/cloud-native-workspace/maps/duplicate_warning.png)

This ensures security across data sources, even when making editable map copies between users. -->






