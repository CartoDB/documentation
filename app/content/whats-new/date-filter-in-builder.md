---
title: "Date filter in Builder"
type: whats-new
date: "2022-10-11"
quarter: Q4 2022
components:
  - builder
tags:
  - new
---

We have just added a new exciting component to Builder. The new Date Filter in Builder allows to reduce the size of a data source by selecting a specific time range from a date or timestamp column in your data.
It is available for dynamically tiled data sources, which basically means tables bigger than 30MB and Custom SQL queries.
Find the documentation available here :books:
:time-zone-fyi: Why is it useful?
  :zap: When dealing with temporal series it is very common to find overlapping points, repeated geometries or spatial indexes… which make the analysis and visualization of the data cumbersome and difficult to visualize. This new component lets the user select a specific time range to filter their data, making all these problems easier to work around.
:time-zone-fyi: Whats the difference with the Time-Series widget? How do they work together?
  :zap: This new filter actually pushes down a SQL filter, which reduces the amount of data processed and transferred, while the Time-Series widget allows filtering the data when it has already been loaded in the browser. They can play very well together, using the filter to pre-select a time range to work with, and the Time-Series widget for finer client-side filtering, visualizing the series, animations, etc
:time-zone-fyi: Does it work in published maps?
  :zap: Yes! As an Editor, you can decide whether or not to include the Date selector in the public map. This allows deeper data exploration for viewer and public users.
:time-zone-fyi: Who should start using this feature?
  :zap: The most benefited will be users dealing with large amounts of temporal series data who needs to use a single map to analyze and visualize different moments in time.
Also, the experienced SQL user will find the new placeholder variables most useful for more advanced use cases, like complex aggregations, spatial indexes, etc. Some customers, prospects and partners like Planet or Snowflake have already enjoyed and validated this feature