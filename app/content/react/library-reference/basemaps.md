## Basemaps

Basemaps constants and Google Maps component

### Constants for available basemaps

- POSITRON: <code>string</code>
- VOYAGER: <code>string</code>
- DARK_MATTER: <code>string</code>
- GOOGLE_ROADMAP: <code>string</code>
- GOOGLE_SATELLITE: <code>string</code>
- GOOGLE_HYBRID: <code>string</code>

- **Example**:

    ```js
    import { VOYAGER } from '@carto/react-basemaps';

    console.log(VOYAGER); // 'voyager'
    ```

### GoogleMap

React component for working with Google Maps API and [deck.gl](https://deck.gl), by using `GoogleMapsOverlay`, from *@deck.gl/google-maps* module;. It tries to offer a basic googlemaps basemap, with an interface very similar to the one presented by `react-map-gl` for Mabpox, thus allowing an easier change between them in your app.

- **Input**:

    | Param            | Type                             | Description                      |
    | ---------------- | -------------------------------- | -------------------------------- |
    | props            |                                  |                                  |
    | props.basemap    | <code>Object</code>              | Basemap |
    | props.viewState  | <code>Object</code>              | Viewstate (center, zoom level)   |
    | props.layers     | <code>Array.&lt;Layer&gt;</code> | Layers array                      |
    | props.getTooltip | <code>function</code>            | Tooltip handler                  |
    | props.apiKey     | <code>string</code>              | Google Maps API Key              |

- **Example**:

    ```js
        import { GOOGLE_SATELLITE, GoogleMap } from '@carto/react-basemaps';

        const googleApiKey = 'YOUR_API_KEY';
        const viewState = { longitude: 0, latitude: 0, zoom: 1 };

        // options allows passing extra MapOptions (see: https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions)
        const basemap = { options: { mapTypeId: GOOGLE_SATELLITE, streetViewControl: true } };

        const deckLayers = []; // array of deck.gl layers

        // (in a react render response...)
        return (
            <GoogleMap
                apiKey={googleApiKey}
                viewState={viewState}
                basemap={basemap}
                layers={deckLayers}
            />
        );
    ```

    Note: if you use *cra template**, there is a generic `<Map>` component that abstracts away the use of GoogleMap or a Mapbox basemap, and manages its state within Redux, in a very easy to use way.