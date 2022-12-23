---
title: "New function to identify similar locations, such as merchants or stores, based on the characteristics of their trade areas in the Analytics Toolbox for BigQuery"
type: whats-new
date: "2022-12-27"
quarter: Q4 2022
components:
  - analytics toolbox
tags:
  - beta
---

We have released within the [cpg module](analytics-toolbox-bigquery/sql-reference/cpg/) of the [Analytics Toolbox for BigQuery](/analytics-toolbox-bigquery/overview/getting-started/) a new function named [FIND_SIMILAR_LOCATIONS](/analytics-toolbox-bigquery/sql-reference/cpg/#find_similar_locations) that allows users to identify which locations (e.g. merchants, stores) are more similar to a chosen location (e.g. top performant) based on the characteristics of their surrounding areas (or trade areas), which can be configured to be based on demographic features, environmental, nearby points of interest, footfall, etc. In [this example](/analytics-toolbox-bigquery/examples/similar-locations-iowa/) we illustrate how to use this new analysis function to solve the aforementioned use-case.

![Find Similar Locations ilustration](/img/whats-new/similar_locations_whats_new.png)