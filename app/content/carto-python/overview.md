---
aliases:
    - /carto-python/overview/
---

## Overview

{{% bannerNote title="BETA" type="tip" %}}
These Python packages from CARTO are in Beta stage and they might be subject to changes in the future. 
{{%/ bannerNote %}}

Python has become one of the most commonly used languages for data science. In order to provide data scientists the ability to interact with CARTO from their most common working interfaces, CARTO provides a set of Python packages to allow data scientists to work with our platform from within Python notebooks; to run analysis, build data pipelines, machine learning processes and other data science workflows. These packages allow users to work with geospatial data in a fully cloud native way without having to leave their Python environment, and taking advantage of all the potential that [Analytics Toolbox](https://docs.carto.com/analytics-toolbox/about-the-analytics-toolbox/) provides to execute advanced spatial analytics in [Spatial SQL](https://carto.com/spatial-sql/) natively within the leading cloud data warehouse platforms.  


<div class='video-wrapper'>
  <iframe src="https://player.vimeo.com/video/761440464?h=2be7fab594&autoplay=1&muted=1&autopause=0&loop=1" width="100%" height="460" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>
</div>

<br/>
<br/>


CARTO currently provides two open source Python libraries to interact with the platform:

<br/>

- **[carto-auth:](https://github.com/cartodb/carto-auth)** to provide the user the possibility to authenticate with the CARTO account from a Python notebook, and to get access to the data objects (i.e. tables, tilesets, functions) that are available via the different connections to cloud data warehouses that have been set up in that CARTO account. This also includes access to the resources available via the [CARTO Data Warehouse](https://docs.carto.com/carto-user-manual/connections/carto-data-warehouse/) connection, with access to the functions from the Analytics Toolbox (based on its [implementation for Google BigQuery](https://docs.carto.com/analytics-toolbox-bigquery/overview/getting-started/)). This package includes:
  - CARTO Authentication via OAuth and M2M tokens.
  - Obtaining the access token of the session.
  - Creating a CARTO DW client to operate with it.



<br/>

- **[pydeck-carto:](https://github.com/visgl/deck.gl/tree/master/bindings/pydeck-carto)** to be able to visualize the tables and tilesets available in your cloud data warehouse as map layers within your data science workflows in Python notebooks using the [CartoLayer](https://deck.gl/docs/api-reference/carto/carto-layer) for [pydeck](https://deckgl.readthedocs.io/en/latest/#): 
  - It provides access to the data objects available in the [connections](https://docs.carto.com/carto-user-manual/connections/introduction/) created in the CARTO platform.
  - It supports color styling functions: bins, category, continuous.
  - It supports visualizing tilesets and our dynamic tiling implementation for medium size datasets.


<br/>
<br/>


Spatial Data Science workflows in Python often rely on the usage of geopandas in Jupyter notebooks as the de facto standards. Now, users can also integrate CARTO features into these workflows with this set of Python packages, which will save data scientists time and energy spent in switching contexts and working environments. To understand the fundamentals of our packages, in this documentation you will find guides in [Working with data](http://docs.carto.com/carto-python/working-with-data) section.