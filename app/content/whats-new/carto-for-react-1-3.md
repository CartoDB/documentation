---
title: "CARTO for React 1.3"
type: whats-new
date: "2022-07-12"
quarter: Q3 2022
components:
  - developer tools
tags:
  - new
---

We are excited to announce a new release of our CARTO for React library, packed with awesome new features to extend the CARTO platform and provide more capabilities for building custom solutions:

- We have added support for [spatial indexes](/react/guides/data-sources#spatial-indexes), so now you can visualize layers and add widgets when you are working with datasets using H3 and Quadbin indexes, in addition to traditional geometries. This is specially useful when you are dealing with large datasets.
- We have support now for dynamic tiling. By default the CartoLayer will work with [dynamic tiles](/react/guides/upgrade-guide/) and the widgets have been updated to work with them.
- Widgets now have two different [modes](/react/guides/widgets#modes-behavior): viewport and global.
- The [GeocoderWidget](/react/library-reference/widgets#geocoderwidget) now is compatible with the new [LDS API](https://api-docs.carto.com/#f70786a4-8d69-46f3-9794-4e021ab43df8).
- We have a new [BarWidget](/react/library-reference/widgets#barwidget) to display categorical/qualitative data using vertical bars.