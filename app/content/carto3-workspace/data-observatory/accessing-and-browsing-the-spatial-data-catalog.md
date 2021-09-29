## Accessing and browsing the Spatial Data Catalog

CARTO's Spatial Data Catalog allows users to explore thousands of spatial datasets available via the Data Observatory, in order to find the best data based on their requirements.

The Spatial Data Catalog is built on top of a smart metadata system that has registered all characteristics defining a dataset in an homogenous manner (i.e., provider, coverage, schema, variable description, sample data, etc.). This provides a unified experience that allows users to explore and understand the details of very different types of spatial data.

The Spatial Data Catalog is available from our [public website](http://www.carto.com/data) and also from within your user dashboard once you [log into](http://app.carto.com/) your Workspace and navigate to the "Data Observatory" section. 

![Spatial Data Catalog](/img/cloud-native-workspace/data-observatory/do_spatial_data_catalog(new).png)

There are a set of high-level metadata attributes that allow the user to filter different datasets when browsing the Spatial Data Catalog:
- Countries -- The geographical coverage of the datasets.
- Categories -- The type of data product (e.g., demographic, human mobility, road traffic, environmental, etc.)
- Licenses -- Identifies whether the dataset access is governed by a public or premium license.
- Sources -- The premium data provider or public data source of the datasets.
- Placetypes -- The type of spatial aggregation used in the dataset (e.g. admin region, postal codes, road segments, grids, etc.).

![Spatial Data Catalog](/img/cloud-native-workspace/data-observatory/do-dataset-metadata(new).png)

<!-- <div style="text-align:center">
<img src="/img/data-observatory/data-observatory-dataset-metadata1.png" alt="Dataset metadata" style="width:85%; text-align:center">
</div> -->

Then, once a dataset from the list is selected the following additional metadata attributes are available:

- Summary description of the dataset.
- List of key variables.
- A sample table with 10 rows of data.
- Full detailed dataset schema with variable names and descriptions.
- Map preview.

From the Summary, there is also information on the right hand side about the following:

- License
- Country
- Source
- Placetype
- Temporal aggregation.
- Update frequency.
- Associated Geography. If applicable, these are the digital boundaries (geometries) associated with this dataset, this is, its spatial aggregation. Note that some Geographies can also require their own premium license.

![Data Observatory data sample](/img/cloud-native-workspace/data-observatory/do-summary-sample(new).png)

![Data Observatory data sample](/img/cloud-native-workspace/data-observatory/do-data-sample(new).png)

![Data Observatory map preview](/img/cloud-native-workspace/data-observatory/do-map-sample(new).png)

You can have access to a sample of the data by clicking on *Access free sample*:

![Data Observatory map preview](/img/cloud-native-workspace/data-observatory/do-public-access-free-sample(new).png)

A new dialog will open so you can accept the terms of use of the data. Click on *Connect sample* to connect to the data sample. 

![Data Observatory map preview](/img/cloud-native-workspace/data-observatory/do-connect-your-sample(new).png)

When you connect your data sample, you will be redirected to the Data Explorer section, from where you can explore your current connections as well as your data observatory subscriptions and sample data.

![Data Observatory map preview](/img/cloud-native-workspace/data-observatory/do-sample-dataset(new).png)
