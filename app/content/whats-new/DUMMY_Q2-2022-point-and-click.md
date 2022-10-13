<!-- ---
title: "Point & Click SQL analyses, and enhanced interactive and cartographic capabilities in Builder"
type: whats-new
date: "2022-02-09"
quarter: Q2 2022
components:
  - builder
tags:
  - improvement
---


These last few months we have been working on the native support of spatial indexes across our different interfaces. Spatial indexes are data structures that when used to encode the location and resolution of a cell within a hierarchical global grid such as H3, S2 or Quadgrid, allow us to unlock geospatial analytics for very large datasets, bringing radical savings in processing and rendering times, reducing memory and storage usage.

Leveraging these global grid systems also allows for more effective visualizations, storage and the development of simple and efficient geospatial algorithms, as highlighted in this recent [blogpost](https://carto.com/builder/) on the use of H3.

### Youtube video example

<div class='video-wrapper'>
  <iframe width="100%" height="460" src="https://www.youtube.com/embed/hnM0YIDFh0Y" title="Spatial Data Science Conference 2022 is coming to New York!" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

### Vimeo video example

<div class='video-wrapper'>
  <iframe src="https://player.vimeo.com/video/341588655?h=f074bfdb18&color=c9ff23&title=0&byline=0&portrait=0" width="100%" height="460" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
</div>


### Video source example

<div class='video-wrapper'>
  <video autoplay loop muted>
    <source src="https://videos.ctfassets.net/xts27qnup0jr/1eNxL2eaUdegvHUPz4RFid/ae2f98f39b65d73ba8d5a8739f13bd2d/CARTO_for_Site_Selection_Demo__US__.mp4" type="video/mp4">
    Your browser does not support the video tag.
  </video>
</div>
Now, [Builder](https://carto.com/builder/) users can load, visualize and process tables, tilesets and results from SQL queries that contain spatial indexes without the need for geometry data. The resulting visualization is then aggregated dynamically at each zoom level, allowing data to be always represented in the most meaningful resolution.

![](/img/cloud-native-workspace/get-started/login.png) -->