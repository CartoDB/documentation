---
title: "Additional options to configure the creation of isolines in the Analytics Toolbox"
type: whats-new
date: "2022-12-27"
quarter: Q4 2022
components:
  - analytics toolbox
tags:
  - improvement
---

In the last release of the Analytics Toolbox for [BigQuery](/analytics-toolbox-bigquery/release-notes/), [Snowflake](/analytics-toolbox-snowflake/release-notes/) and [Redshift](/analytics-toolbox-redshift/release-notes/) we have added the possibility to configure more options as parameters when executing the functions to CREATE_ISOLINES. These new options, which depend on the LDS service provider, allow the user to configure more transportation modes such as truck or bike, the possibility of specifying departure or arrival times allowing the creation of reverse isolines, and other options like different routing modes.
Additionally, we have added new confidence/relevance metadata to the results of the geocoding function GEOCODE_TABLE. 

![isolines with different transportation modes](/img/whats-new/isolines_transport_mode.png)