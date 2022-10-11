---
title: "Caching performance improvements"
type: whats-new
date: "2022-09-16"
quarter: Q3 2022
components:
  - APIs
tags:
  - improvement
---

We have released a few changes in how we cache API requests in the CDN that will produce a significant improvement in the overall performance of the platform; specifically applying to Builder maps and applications developed using our APIs. Learn more about such changes in our documentation for developers at <a href="https://api-docs.carto.com" target="_blank">api-docs.carto.com</a>; each end-point in Maps API and SQL API now contains a reference about our caching strategies.

In Builder, users have new a couple of new features:
- “Refresh data source”: to make sure users get non-cached versions of the data. Note that with this option your map will be skipping the CDN and getting the data each time from your data warehouse. 
- “Refresh data source every X”: to allow the user to control the update frequency of the data displayed on public maps. 



![New interface to manage invitations and requests](/img/whats-new/caching-performance-improvements.png)