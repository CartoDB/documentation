---
title: "Native support 2"
type: whats-new
date: "2022-09-15"
quarter: Q3 2022
components:
  - analytics toolbox
tags:
  - private beta
---


These last few months we have been working on the native support of spatial indexes across our different interfaces. Spatial indexes are data structures that when used to encode the location and resolution of a cell within a hierarchical global grid such as H3, S2 or Quadgrid, allow us to unlock geospatial analytics for very large datasets, bringing radical savings in processing and rendering times, reducing memory and storage usage.

Leveraging these global grid systems also allows for more effective visualizations, storage and the development of simple and efficient geospatial algorithms, as highlighted in this recent blogpost on the use of H3.

Now, Builder users can load, visualize and process tables, tilesets and results from SQL queries that contain spatial indexes without the need for geometry data. The resulting visualization is then aggregated dynamically at each zoom level, allowing data to be always represented in the most meaningful resolution.

![Log in Email and password](/img/cloud-native-workspace/get-started/login.png)