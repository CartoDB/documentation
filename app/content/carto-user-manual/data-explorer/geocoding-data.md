## Geocoding data

Two types of geocoding are available: address-level geocoding, which transforms a given address into its corresponding point location, and latitude/longitude geocoding, which converts a pair of latitude and longitude coordinates into a point geometry.

{{% bannerNote title="note" type="note" %}}
Address level geocoding is currently available for Snowflake and Redshift connections, whereas lat/lon geocoding is also available for BigQuery. PostgreSQL and Databricks support is coming soon.
{{%/ bannerNote %}}

To geocode your data, select a connection and click on the table you would like to geocode from the collapsible tree. Then, click on the *Geocode data* button at the top right of the screen. Please note that this option will only be available if your table does not have a geography column.

![Data Explorer geocode data](/img/cloud-native-workspace/data-explorer/de_the_geocode_data_button.png)

A new dialog will open for you to choose whether to geocode your table by address or by latitude/longitude.

![Data Explorer geocode data](/img/cloud-native-workspace/data-explorer/de_the_geocode_latitude_longitude(bq).png)

### By address

To geocode your data, select geocode by *Address* and fill in the options:

* select the column of your table that contains the addresses to geocode.
* optionally, select the country where your addresses are located. This is recommended as it generally improves the geocoding results. 
* optionally, specify the name of the geometry column (`geom` by default) where the result of the geocoding will be stored. 

![Data Explorer geocode data](/img/cloud-native-workspace/data-explorer/de_the_geocode_address(sf).png)

Then, click on *Continue*. A new dialog will appear allowing you to confirm your selection. Click on the *Geocode* button to confirm or click *Cancel* to abort the process.

![Data Explorer geocode data](/img/cloud-native-workspace/data-explorer/de_the_geocode_address_ok(sf).png)

As a result of the geocoding process, two new columns will be added to your existing table: a geometry column with the locations of your addresses, and a `carto_geocode_metadata` column with additional information regarding the geocoding results.

{{% bannerNote title="warning" type="warning" %}}
Address-level geocoding requires the advanced Analytics Toolbox for [Snowflake](/analytics-toolbox-snowflake)/[Redshift](/analytics-toolbox-redshift) to be available for your connection. Please get in touch at support@carto.com and we will guide you through the installation process.
{{%/ bannerNote %}}

### By latitude / longitude

To geocode your data, select geocode by *Address* and fill in the options:

* select the columns of your table where the latitude and longitude coordinates are stored. 
* optionally, specify the name of the geometry column (`geom` by default) where the result of the geocoding will be stored.

![Data Explorer geocode data](/img/cloud-native-workspace/data-explorer/de_the_geocode_latitude_longitude(bq).png)

Then, click on *Continue*. A new dialog will appear allowing you to confirm your selection. Click on the *Geocode* button to confirm or click *Cancel* to abort the process.

![Data Explorer geocode data](/img/cloud-native-workspace/data-explorer/de_the_geocode_address_ok(bq).png)

As a result of the geocoding process, a new geometry column will be added to your existing table containing the points corresponding to your latitude/longitude coordinates.

