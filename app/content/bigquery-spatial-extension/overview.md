## Overview

CARTO's Spatial Extension for BigQuery...Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas varius tortor nibh, sit amet tempor nibh finibus et. Aenean eu enim justo. Vestibulum aliquam hendrerit molestie. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas varius tortor nibh, sit amet tempor nibh finibus et.

Aenean eu enim justo. Vestibulum aliquam. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas varius tortor nibh, sit amet tempor nibh finibus et. Aenean eu enim justo. Vestibulum aliquam.


### Tiler

CARTO BigQuery Tiler is a solution to visualize very large spatial datasets from BigQuery.

If you have small datasets (few megabytes) on BigQuery you can use available solutions like GeoVizQuery or CARTOframes to visualize them, but if you have millions, or even billions, of rows, you need a system to load them progressively on a map. CARTO BigQuery Tiler allows you to do that without having to move your data out of BigQuery.

CARTO BigQuery Tiler is:

* Convenient: You can run it through our UI or directly as SQL commands in BigQuery. The data never leaves BigQuery so you don't have to worry about security and additional ETLs.
Fast: CARTO BigQuery Tiler benefits from the massive scalability capabilities of BigQuery and can process hundreds of millions of rows in a few minutes.
* Scalable: This solution works for 1M points or 100B points.
* Cost-effective: Since BigQuery separates storage from computing, the actual cost of hosting these Tilesets is very low. Additionally since you run the tiling on demand you only pay for that processing and you don't need to have a cluster available. Finally, thanks to our partitioning technology, serving tiles is very cost effective.



## Getting access