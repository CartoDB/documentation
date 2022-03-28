## Geocoding data

To geocode your data, select a connection and click on a specific object (database/project(s), schemas/datasets and tables) from the collapsible tree. Once your table is selected, you can geocode your data by clicking on the *Geocode data* button at the top right of the screen. 

![Data Explorer geocode data](/img/cloud-native-workspace/data-explorer/de_geocode_data_button.png)

{{% bannerNote title="ONLY FOR TABLES WITHOUT geographic coordinates" type="tip" %}}
Please note that this option will only be available for those tables that require assigning longitude and latitude values to street addresses or converting an address description (eg: the name of a city or a postal code) into geographic coordinates that CARTO can visualize.
{{%/ bannerNote %}}

<!-- screenshot needed -->

A new dialog will open so you can geocode your data from different geocoding types: Address or Latitude/longitude.

![Data Explorer geocode data](/img/cloud-native-workspace/data-explorer/de_geocode_latitude_longitude(bq).png)

{{% bannerNote title="Note" type="note" %}}
Please note that Geocode table from Data Explorer is only available for BigQuery (Latitude/longitude), Snowflake and Redshift; PostgreSQL and Databricks availability is coming soon.
{{%/ bannerNote %}}

![Data Explorer geocode data](/img/cloud-native-workspace/data-explorer/de_geocode_address(bq).png)

### Geocode table by Address

To geocode your data, select Geocode by *Address*, select an `Address`column and click on *Continue*. You can optionally select a country for more accurate geocoding and the `geom` column name.

![Data Explorer geocode data](/img/cloud-native-workspace/data-explorer/de_geocode_address(sf).png)

A new dialog will appear allowing you to confirm that you want to geocode your data. Click the *Geocode* button to confirm or click *Cancel* if you don't want the changes to be applied.

![Data Explorer geocode data](/img/cloud-native-workspace/data-explorer/de_geocode_address_ok(sf).png)

Two new columns will be added to your table: a `geometry` column and `metadata` column with additional information regarding the geocoding results.
### Geocode table by Latitude / Longitude

To geocode your data, select Geocode by Latitude/longitude, select the `latitude` and `longitude` columns and click on *Continue*. You can optionally select a the `geom` column name.

![Data Explorer geocode data](/img/cloud-native-workspace/data-explorer/de_geocode_latitude_longitude(bq).png)

A new dialog will appear allowing you to confirm that you want to geocode your data. Click the Geocode button to confirm or click Cancel if you don’t want the changes to be applied. 

![Data Explorer geocode data](/img/cloud-native-workspace/data-explorer/de_geocode_address_ok(sf).png)

A new `geometry`column will be added to your existing table.

