## Getting started

The CARTO Analytics Toolbox for PostgreSQL is currently composed of a single module: _tiler_. This module provides a collection of stored procedures to create _tilesets_, used to achieve the visualizations of large scale datasets. Please visit the [this section](../tilesets) to learn more about tilesets and the [SQL Reference](../../sql-reference/tiler) to check the available procedures and usage examples.

### Requirements

The PostgreSQL server version must be at least 11. The database where the Analytics Toolbox is installed must have the PostGIS extension, version 2.5 or later.

{{% bannerNote title="NOTE" type="note" %}}
If you are a CARTO customer and want to install the Analytics Toolbox in your PostgreSQL database, please contact support@carto.com.
{{%/ bannerNote %}}