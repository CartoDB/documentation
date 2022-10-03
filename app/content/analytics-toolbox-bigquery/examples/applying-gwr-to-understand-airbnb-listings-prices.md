---
title: "Applying GWR to understand Airbnb listings prices"
description: "Geographically Weighted Regression (GWR) is a statistical regression method that models the local (e.g. regional or sub-regional) relationships between a set of predictor variables and an outcome of interest. Therefore, it should be used in lieu of a global model in those scenarios where these relationships vary spatially. In this example we are going to analyze the local relationships between Airbnb's listings in Berlin and the number of bedrooms and bathrooms available at these listings using the GWR_GRID procedure."
image: "/img/bq-analytics-toolbox/examples/gwr-airbnb-listings-prices.png"
type: examples
date: "2021-01-12"
categories:
    - statistics
aliases:
    - /analytics-toolbox-bq/examples/applying-gwr-to-understand-airbnb-listings-prices/
---
## Applying GWR to understand Airbnb listings prices

[Geographically Weighted Regression](https://en.wikipedia.org/wiki/Spatial_analysis#Spatial_regression) (GWR) is a statistical regression method that models the local (e.g. regional or sub-regional) relationships between a set of predictor variables and an outcome of interest. Therefore, it should be used in lieu of a global model in those scenarios where these relationships vary spatially.

In this example we are going to analyze the local relationships between Airbnb's listings in Berlin and the number of bedrooms and bathrooms available at these listings using the [GWR_GRID](../sql-reference/statistics/#gwr_grid) procedure. Our input dataset, publicly available from `cartobq.docs.airbnb_berlin_h3_qk`, contains the Airbnb listing's locations in H3 and quadkey cells at different resolutions, their prices, and their number of bedrooms and bathrooms.

We can run our GWR analysis by simply running this query:

{{% customSelector %}}𝅺{{%/ customSelector %}}
```sql
CALL `carto-un`.carto.GWR_GRID(
    'cartobq.docs.airbnb_berlin_h3_qk',
    ['bedrooms', 'bathrooms'], -- [ beds feature, bathrooms feature ]
    'price', -- price (target variable)
    'h3_z7', 'h3', 3, 'gaussian', TRUE,
    NULL
);
```

This particular configuration will run a local regression for each H3 grid cell at resolution 7. All listings at each particular grid cell and those within its neighborhood, defined as its [Kring](../sql-reference/h3/#kring) of size 3 will be taken into account to run this regression. Data points within the neighborhood will be given a weight inversely proportional to the distance to the central cell, according to the kernel function of choice, in this case, a Gaussian.

The output of our GWR analysis is a table that contains the result of each of these regressions: the coefficients for each of the predictor variables and the intercept. The following map shows the coefficients associated with the number of bedrooms (top) and bathroom (bottom), where darker/brighter areas correspond to lower/higher values:

<iframe height=800px width=100% style='margin-bottom:20px' src="https://gcp-us-east1.app.carto.com/map/fa17dbf3-99b9-4a46-8be7-e52fd5cd0e6f" title="Spatially-varying relationship between Airbnb's listing prices and their number of bedrooms and bathrooms."></iframe>

Positive values indicate a positive association between the Airbnb's listing prices and the presence of bedrooms and bathrooms (conditional on the other) and with larger absolute values indicating a stronger association.

We can see that overall, where listings are equipped with more bedrooms and bathrooms, their price is also higher. However, the strength of this association is weaker in some areas: for instance, the number of bedrooms clearly drives higher prices in the city center, while not as much in the outskirts of the city.

{{% bannerNote title="Note" %}}
Check out this [blogpost](https://carto.com/blog/geographically-weighted-regression/) for examples on the application of GWR to explore the spatially-varying relationships between crime occurrence and the number of unemployed population and average house prices.
{{%/ bannerNote %}}

{{% euFlagFunding %}}
