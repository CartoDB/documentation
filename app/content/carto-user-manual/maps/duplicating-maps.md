## Duplicating maps

This guide describes how you can duplicate existing maps from CARTO Workspace, the organization area; and also from CARTO Builder, our map editor.

Copied maps will always start as `Copy of` plus the original map name, and will always started as private maps for yourself.

#### Duplicating a map in Workspace

To make a copy of an existing map, go to "Maps" and click on the three-dotted menu in each map card. A contextual menu will open with the "Duplicate map" option. This option is available for all maps, whether you have view or edit access.

![Duplicate map from Workspace](/img/cloud-native-workspace/maps/duplicate_from_workspace.png)

#### Duplicating a map in Builder

To make a copy of a map you're currently editing, click on the three-dotted menu in the top right of Builder. You'll see different options, click in the "Duplicate map" item.

![Duplicate map from Builder](/img/cloud-native-workspace/maps/duplicate_from_builder.png)

#### Current limitations when duplicating maps

When duplicating a map, you'll receive a warning if any of the sources is not shared with you (eg: a private connection) — You can continue anyway, but the private sources will load with errors and the corresponding layers will not be visible, leaving you the choice of fully removing them or asking for access. 

![Duplicate map - Data warning](/img/cloud-native-workspace/maps/duplicate_warning.png)

This ensures security across data sources, even when making editable map copies between users.






