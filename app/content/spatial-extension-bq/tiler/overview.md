## Overview

CARTO BigQuery Tiler is a solution to visualize very large spatial datasets from BigQuery.

If you have small datasets (few megabytes), there are solutions available on BigQuery, such as [GeoVizQuery](https://cloud.google.com/bigquery/docs/gis-visualize), to visualize them; but if you have millions, or even billions of rows, you will need a system to load them progressively on a map. CARTO BigQuery Tiler allows you to do that without having to move your data out of BigQuery. 

CARTO BigQuery Tiler is:

* **Convenient** -- It can run through our UI or directly as SQL commands in BigQuery. The data never leaves BigQuery so you won't have to worry about security and additional ETLs.
* **Fast** -- CARTO BigQuery Tiler benefits from the massive scalability capabilities of BigQuery and can process hundreds of millions of rows in a few minutes.
* **Scalable** -- This solution works for 1M points or 100B points.
* **Cost-effective** -- Since BigQuery separates storage from computing, the actual cost of hosting these tilesets is very low. Additionally since the tiling process runs on demand, you'll only pay for that processing and you won't need to have a cluster available 24/7. Finally, we have optimized how we serve the tiles, thanks to our partitioning technology.