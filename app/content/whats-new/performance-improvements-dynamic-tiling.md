---
title: "Performance improvements in Dynamic Tiling"
type: whats-new
date: "2022-09-13"
quarter: Q3 2022
components:
  - APIs
tags:
  - improvement
---

A couple important fixes have been implemented to our [Dynamic Tiling](https://docs.carto.com/carto-user-manual/maps/performance-considerations/#medium-size-datasets-and-sql-queries) strategies. Dynamic Tiling is the technology CARTO has developed to dynamically generate tiles for medium sized dataset and layers loaded as SQL Queries from your cloud data warehouse.

- When working with points, many times widgets were not showing data due to our “visual aggregation” strategy when points were very close to each other. We have now removed this type of aggregation, and we are only applying a limit of 200k points per tile to prevent performance issues. If now you encounter widgets not showing data, you just need to zoom in to reduce the number of points per tile.
- With our previous strategy some polygons or lines that were falling in the intersection of multiple tiles were splitted for visualization purposes, which was making the same data point count multiple times in widgets. We have solved this problem by asking the user to identify a unique id property for the data source at the time of creating widgets.


![New interface to manage invitations and requests](/img/whats-new/performance-improvements-dynamic-tiling.png)