## Geocoding data

To geocode your data, select a connection and click on a specific object (database/project(s), schemas/datasets and tables) from the collapsible tree. 

Once your table is selected, you can geocode your data by clicking on the *Geocode* button at the top right of the screen. 

{{% bannerNote title="ONLY FOR TABLES WITHOUT geographic coordinates" type="tip" %}}
Please note that this option will only be available for those tables that require converting an address description (eg: the name of a city or a postal code) into geographic coordinates that CARTO can visualize.
{{%/ bannerNote %}}

<!-- screenshot needed -->

A new dialog will open so you can geocode your data from different geocoding types: Admin unit, Latitude/Longitude and Postal Code. You are initially presented with a *Admin unit* type to geocode your data. 

<!-- screenshot needed -->

### Geocode table using Admin unit

Requires a single parameter column with administrative region names to generate location points. You can also specify a column to be used for country names (if all are unique).

In Builder: For country names, you can enter custom values by typing in the name (if the data is within a single region or country. For example, manually type in and select United States).

To geocode your data, select Geocode by *Administrative unit* on the left:

<!-- screenshot needed -->

This interface will allow you to set the name of the output table. Once you have completed this configuration, click on *Continue*

<!-- screenshot needed -->

The next screen requires you to select a single parameter column with administrative region names to generate location points.



### Geocode table using Latitude / Longitude

Generates location points using two parameter columns, one for latitude values and one for longitude values.

### Geocode table using Postal Code

If your dataset consists of a column with postal codes, this option geocodes those values to generate location points. Your input data must be a text column. You can also specify a column to be used as a country names, similar to the Administrative Regions option.



