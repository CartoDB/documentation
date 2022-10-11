## Exporting data

This guide describes how you can export your data using CARTO Builder.

To be able to export your data, you need to add data to the map:

![Export data button disabled](/img/cloud-native-workspace/maps/map_export_button_disabled.png) 

Once you have added data to your map, the *Export viewport data* button will be enabled and you will be able to export your data.

![Export data button enabled](/img/cloud-native-workspace/maps/map_export_data_button.png) 

A new dialog screen will open informing you that the resulting CSV files will contain data from the current features in the viewport. Click the *Export data* button to confirm the download of the data or click on *Cancel* if you don’t want to continue exporting.

![Export data dialog](/img/cloud-native-workspace/maps/map_export_data_dialog.png) 

In this example, we filter our data by adding widgets to our map. The result of our export will be our data already filtered in the map viewport. 

![Export filter data](/img/cloud-native-workspace/maps/map_export_filter_data.png) 

The result of the export will be a compressed file containing all visible features in the viewport in csv format.

### Exporting data from a public map

As an Editor, you can enable the _'Export viewport data'_  functionality for public maps and viewers users within your CARTO organization. 

In order to enable it, check the _'Published map settings'_  section when sharing a map, and make sure the _'Export viewport data'_ toggle is enabled.

Learn more about this and other publishing options [here](https://docs.carto.com/carto-user-manual/maps/publishing-and-sharing-maps/#publishing-options)