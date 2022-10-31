## Development Tools

[What frameworks and libraries can I use for developing custom apps with CARTO?](#what-frameworks-and-libraries-can-i-use-for-developing-custom-apps-with-carto)

[Are “CARTO for deck.gl” and “CARTO for React” compatible with the new version of the platform?](#are-carto-for-deckgl-and-carto-for-react-compatible-with-the-new-version-of-the-platform)

---

<!-- Using level 5 headers to avoid the title being listed in the tree -->

##### What frameworks and libraries can I use for developing custom apps with CARTO?
You can use any framework or visualization library because CARTO is based on industry-standards. If there is not a hard requirement, we recommend using deck.gl for visualization and CARTO for React for creating apps that extend the platform functionality.

---

##### Are “CARTO for deck.gl” and “CARTO for React” compatible with the new version of the platform?
Yes, you can use both tools with the previous and the new version of the platform.

---

#### Does CARTO provide an SDK for the development of Mobile applications?
CARTO does not currently offer an SDK for the development of mobile apps as a component of our cloud native platform. In order to develop mobile applications with geospatial data, we recommend using the relevant SDK of your cloud vendor, or from products such as Google Maps, Apple Maps, Mapbox or Maplibre. 

Particularly for the visualization of small datasets with spatial data (< 30MB), all SDKs will support visualization of GeoJSON files (e.g. [Google’s Maps SDK for Android](https://developers.google.com/maps/documentation/android-sdk/utility/geojson)), and CARTO’s [Maps API](https://api-docs.carto.com/#75feef02-1e8d-4d95-be36-17276228544a) can be the technology to serve them.

The Mobile SDK in the previous version of the CARTO platform will not be further developed, and we don’t recommend starting new projects with it. 
