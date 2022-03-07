## Visualizing Data Observatory datasets

Some of the spatial datasets offered in the Data Observatory are massive (a few TB), either due to their global coverage, such as [WorldPop](https://carto.com/spatial-data-catalog/browser/dataset/wp_population_e683f5e4/) or [NASADEM](https://carto.com/spatial-data-catalog/browser/dataset/nasa_nasadem_ec3517d7/), or their fine granularity, such as [ACS Sociodemographics](https://carto.com/spatial-data-catalog/browser/dataset/acs_sociodemogr_95c726f9/) at census block group level, and their visualization requires the creation of [tilesets](/analytics-toolbox-bq/overview/tilesets/) using the [Analytics Toolbox for BigQuery](/analytics-toolbox-bq/guides/creating-and-visualizing-tilesets/).

<div class="figures-table" style="text-align:center">
    <figure>
        <img src="/img/data-observatory/carto2/nasadem-elevation-tileset.png" alt="Multiresolution quadkeys">
        <figcaption class="figcaption" style="text-align:center"><a href="https://public.carto.com/viewer/user/public/bigquery?config=eyJpbml0aWFsVmlld1N0YXRlIjp7ImxhdGl0dWRlIjowLjMyODkxMjAyMjc2NTkzLCJsb25naXR1ZGUiOjE5LjY2OTQ5MjI4MzU3Njk4Miwiem9vbSI6MS43NTkxOTg3NjI4ODQxMTY0LCJwaXRjaCI6MCwiYmVhcmluZyI6MCwiZHJhZ1JvdGF0ZSI6ZmFsc2UsIndpZHRoIjoxMzQ0LCJoZWlnaHQiOjk1MywiYWx0aXR1ZGUiOjEuNSwibWF4Wm9vbSI6MjAsIm1pblpvb20iOjAsIm1heFBpdGNoIjo2MCwibWluUGl0Y2giOjAsInRyYW5zaXRpb25EdXJhdGlvbiI6MCwidHJhbnNpdGlvbkludGVycnVwdGlvbiI6MX0sInZpZXdzIjpbeyJAQHR5cGUiOiJNYXBWaWV3IiwiY29udHJvbGxlciI6dHJ1ZX1dLCJsYXllcnMiOlt7IkBAdHlwZSI6IkNhcnRvQlFUaWxlckxheWVyIiwiZGF0YSI6ImNhcnRvLWRvLXB1YmxpYy10aWxlc2V0cy5uYXNhLmVudmlyb25tZW50YWxfbmFzYWRlbV9nbG9fcXVhZGdyaWQxNV92MV9zdGF0aWNfdjFfdGlsZXNldF8wMDAiLCJjcmVkZW50aWFscyI6eyJ1c2VybmFtZSI6InB1YmxpYyIsImFwaUtleSI6ImRlZmF1bHRfcHVibGljIn0sImdldEZpbGxDb2xvciI6eyJAQGZ1bmN0aW9uIjoiY29sb3JCaW5zIiwiYXR0ciI6ImVsZXZhdGlvbiIsImRvbWFpbiI6WzAsMSwxMCw1MCwxMDAsMTAwMCwyMDAwLDUwMDAsMTAwMDBdLCJjb2xvcnMiOiJTdW5zZXQifSwicG9pbnRSYWRpdXNNaW5QaXhlbHMiOjEsInN0cm9rZWQiOmZhbHNlLCJsaW5lV2lkdGhNaW5QaXhlbHMiOjAuNSwiZ2V0TGluZUNvbG9yIjpbMjU1LDI1NSwyNTVdLCJwaWNrYWJsZSI6dHJ1ZSwiYmluYXJ5Ijp0cnVlfV19" target="_blank">NASADEM worldwide elevation tileset.</a></figcaption>
    </figure>
</div>

To create your own Data Observatory tilesets, from either your public or premium subscriptions, simply find the location of your subscription in BigQuery using the [“Access in BigQuery”](../../guides/accessing-your-subscriptions-from-bigquery-aws-or-azure/#access-in-bigquery) functionality and run the Tiler from your console. [Here](../../guides/creating-data-observatory-tilesets) is a step-by-step guide that will help you through the process.

Tilesets can be visualized directly [from the CARTO Workspace](/analytics-toolbox-bq/guides/creating-and-visualizing-tilesets) or integrated into your custom spatial applications using [CARTO for deck.gl](/deck-gl) following [this example code](/deck-gl/examples/basic-examples/data-observatory-tileset-layer/).

</br>

{{% bannerNote type="tip" title="TIP" %}}
We have created a collection of ready-to-use Data Observatory tilesets from public datasets that are directly available in the BigQuery project `carto-do-public-tilesets`. Visit [this page](../../example-tilesets) for a gallery of visualizations and the full list of available tilesets. 
{{%/ bannerNote %}}