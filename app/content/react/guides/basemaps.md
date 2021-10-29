## Basemaps

This guide shows how you can change the basemap in your CARTO for React application. By default, the application will use the CARTO Voyager basemap, but you can choose any other CARTO basemap (Dark Matter, Voyager) or you can also use a Google Maps basemap.

These are the available basemaps:

| BASEMAP | PREVIEW | Style description |
| ------- | ------- | ----------------- |
| POSITRON | <img src="https://carto.com/help/images/building-maps/basemaps/positron_labels.png"  style="margin-bottom: 0px; vertical-align: middle;" /> | https://basemaps.cartocdn.com/gl/positron-gl-style/style.json |
| DARK_MATTER | <img src="https://carto.com/help/images/building-maps/basemaps/dark_labels.png"  style="margin-bottom: 0px; vertical-align: middle;" /> | https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json |
| VOYAGER | <img src="https://carto.com/help/images/building-maps/basemaps/voyager_labels.png"  style="margin-bottom: 0px; vertical-align: middle;" /> | https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json |
| GOOGLE_ROADMAP | No preview available yet | |
| GOOGLE_SATELLITE | No preview available yet | |
| GOOGLE_HYBRID | No preview available yet | |
| GOOGLE_CUSTOM | No preview available yet | |

If you want to change the default (Voyager) basemap, you need to edit the `src/store/initialStateSlice.js` file. At the top of this file we are importing the basemap from the `@carto/react` package.

For instance, if you want to use a Google Maps `roadmap` basemap, you need to import it like this:

```javascript
import { GOOGLE_ROADMAP } from '@carto/react-basemaps';
```

Then you need to modify the "basemap" property in the initialState object and provide the Google Maps API key:

```javascript
export const initialState = {
  ...
  basemap: GOOGLE_ROADMAP,
  googleApiKey: 'AAAAABBBBBBBCCCCCCC11111122222233333',
  ...
};
```

### Custom basemaps

You can use custom basemaps, in addition to the default basemaps provided by CARTO and Google. In this section we discuss how to configure your application to use these basemaps.

#### Google custom basemap

If you want to use a Google Maps custom basemap, you need to import it like this in the `src/store/initialStateSlice.js` file:

```javascript
import { GOOGLE_CUSTOM } from '@carto/react-basemaps';
```

Then you need to modify the "basemap" property in the initialState object and provide the map ID and Google Maps API key:

```javascript
export const initialState = {
  ...
  basemap: GOOGLE_CUSTOM,
  googleMapId: 'YOUR_GOOGLE_MAP_ID',
  googleApiKey: 'YOUR_GOOGLE_API_KEY',
  ...
};
```

#### CARTO custom basemap

CARTO basemaps follow the [Mapbox Style Specification](https://www.mapbox.com/mapbox-gl-js/style-spec). If you want to create your custom basemap, you can use a visual editor like [Maputnik](https://maputnik.github.io/). This is the process:

1. Load the style closest to the basemap you want to create (Positron, Voyager or Dark Matter) through the `Load from URL` option in the `Open Style` dialog, using the URLs provided above.

2. Edit the style properties for each layer you want to customize.

3. Export the style in JSON format using the `Export` dialog.

4. Add the JSON file to your project (adding it to your public folder is a good choice, for example public/custom_basemap.json).

5. Edit the `basemap` property in the `src/store/initialStateSlice.js`:

   ```javascript
   export const initialState = {
     ...
     basemap: {
       type: 'mapbox',
       options: {
         mapStyle: 'URL to the JSON style in your published app',
       }
     },
     ...
   };
   ```

#### Custom layer as a basemap

You can also use a custom layer as the basemap. In this case you will be actually not using a basemap but just adding a deck.gl layer in the bottom most position. For instance, this can be used to load a WMTS service using the [TileLayer](https://deck.gl/docs/api-reference/geo-layers/tile-layer).

You can add the basemap layer to each of the views where you want to use it or even add it to the `<Main>` view if you want to use it in all the application views.
