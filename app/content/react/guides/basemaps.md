## Basemaps

This guide shows how you can change the basemap in your CARTO for React application. By default, the application will use the CARTO Positron basemap, but you can choose any other CARTO basemap (Dark Matter, Voyager) or you can also use a Google Maps basemap.

These are the available basemaps:

| BASEMAP | PREVIEW
| -----|---------
| POSITRON | <img src="https://carto.com/help/images/building-maps/basemaps/positron_labels.png"  /> | https://basemaps.cartocdn.com/gl/positron-gl-style/style.json |
| DARK_MATTER | <img src="https://carto.com/help/images/building-maps/basemaps/dark_labels.png"  /> | https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json |
| VOYAGER | <img src="https://carto.com/help/images/building-maps/basemaps/voyager_labels.png"  /> | https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json |
| GOOGLE_ROADMAP | No preview available yet |
| GOOGLE_SATELLITE | No preview available yet |
| GOOGLE_HYBRID | No preview available yet |

If you want to change the default (Positron) basemap, you need to edit the `src/store/initialStateSlice.js` file. At the top of this file we are importing the basemap from the `@carto/react` package.

For instance, if you want to use the Google Maps `roadmap` basemap, you need to import it like this:

```javascript
import { GOOGLE_ROADMAP } from '@carto/react/basemaps';
```

Then you need to modify the "basemap" property in the initialState object:

```javascript
export const initialState = {
  ...
  basemap: GOOGLE_ROADMAP,
  googleApiKey: 'AAAAABBBBBBBCCCCCCC11111122222233333',
  ...
};
```

{{% bannerNote title="note" %}}
If you want to use a Google Maps basemap you need to introduce your Google Maps API key in the `googleApiKey` property.
{{%/ bannerNote %}}