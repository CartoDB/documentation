---
title: "Geocoding, Isolines and Tokens quotas now available for tracking in Workspace"
type: whats-new
date: "2022-11-07"
quarter: Q4 2022
components:
  - workspace
tags:
  - improvement
---

Following the release of [geocoding and isolines for Google BigQuery](/whats-new/geocoding-and-isolines-in-google-bigquery/), and the [new layout for the Settings](/whats-new/new-layout-in-settings-section/), we're adding new trackers for quotas in Workspace so users can understand and predict their consumption.

1. We added a new **"CARTO for Developers"** section, including:
   - Existing quota:  _Applications_, for applications created using Workspace
   - A new quota: _Tokens_, for tokens generated using the Tokens API

2. We also added a new **"Location Data Services"** section, including tracking for **Geocoding** and **Isolines** operations. These quotas are reset every month, and each unit represents a row processed.

3. Finally, the "Connections" quota was removed, and will be gradually removed so users can create as many connections as needed without any warnings.


![New Settings Layout](/img/whats-new/2022-added-quotas-in-settings.png)