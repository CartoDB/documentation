## Query Parameters

You can use QueryParameters to filter your layers & widgets at the backend side, using the concept of *parametrized queries* over your sources. You can check our related [deck.gl documentation]({{< ref "/deck-gl/reference#queryparameters-depends-on-provider-optional" >}} "About Us") for different providers.
In this guide we're going to create a simple map that shows the earthquakes in Spain and allows to filter it by their magnitude.

#### Creating a map using QueryParameters

First you'll need to create a source that supports query parameters. In this case we are getting all the earthquakes from a **bigquery** connection, whoses magnitude are between `min: 4` and `max: 5`.

```ts
import { MAP_TYPES } from '@deck.gl/carto';

const sql = 'select * from `carto-demo-data.demo_tables.spain_earthquakes` where magnitude between @min and @max';

const earthquakesSource = {
  id: 'earthquakes',
  data: sql,
  type: MAP_TYPES.QUERY,
  queryParameters: {
    min: 4,
    max: 5
  }
}
```

Once you have your source ready to be used, you can create your layer using `useCartoLayerProps` hook.  

```ts
import { CartoLayer } from '@deck.gl/carto';
import { useCartoLayerProps } from '@carto/react-api';

const layerProps = useCartoLayerProps({ source: earthquakesSource });
const earthquakesLayer = new CartoLayer({
  ...layerProps,
  id: 'earthquakesLayer',
  pointRadiusUnits: 'pixels',
  lineWidthUnits: 'pixels',
  getLineColor: [0, 0, 0],
  getPointRadius: 3,
});
```

Now your layer is ready and you can use it in your map, so we're going to create a `<FormulaWidget />` which displays the number of earthquakes in your viewport.

#### Using queryParameters with widgets
All our widgets are ready to use **sources** with queryParameters. You just need to pass the `datasource` properly configured (that basically means declaring its `type` as MAP_TYPES.QUERY and adding the corresponding `queryParameters` configuration). After that, you can use any widget as usual, eg:

```ts
<FormulaWidget
  id='totalEarthquakes'
  title='Total earthquakes'
  dataSource={earthquakesSource.id}
  operation={AggregationTypes.COUNT}
  />
```

#### Filtering with queryParameters using a widget
But the utility of queryParameters is dynamically changing the parametrized values in the app, so now we're gonna use a widget to modify those values (and as a consequence, to apply new backend filters using queryParameters). Here we're going to add a `<RangeWidgetUI />` to allow filtering earthquakes by magnitude.

First we need to prepare the source to support `queryParameters` modification, passing those values as parameters to it.

```ts
import { MAP_TYPES } from '@deck.gl/carto';

function useEarthquakeSource([min, max]) {
  const sql = 'select * from `carto-demo-data.demo_tables.spain_earthquakes` where magnitude between @min and @max';
  
  const earthquakesSource = {
    id: 'earthquakes',
    data: sql,
    type: MAP_TYPES.QUERY,
    queryParameters: {
      min,
      max,
    }
  };

  return earthquakesSource;
}
```

Once the datasource is ready we can add a widget to filter by magnitude.

```ts
import { useState } from 'react';
import { CartoLayer } from '@deck.gl/carto';
import { useCartoLayerProps } from '@carto/react-api';
import { FormulaWidget } from '@carto/react-widgets';
import { RangeWidgetUI } from '@carto/react-ui';

function Earthquakes() {
  const [magnitudes, setMagnitudes] = useState([0, 10]);
  const earthquakesSource = useEarthquakeSource(magnitudes);
  const layerProps = useCartoLayerProps({ source: earthquakesSource });
  const earthquakesLayer = new CartoLayer({
    ...layerProps,
    id: 'earthquakesLayer',
    pointRadiusUnits: 'pixels',
    lineWidthUnits: 'pixels',
    getLineColor: [0, 0, 0],
    getPointRadius: 3,
  });
  
  return (
    <>
      <RangeWidgetUI
        min={0}
        max={10}
        onSelectedRangeChange={(range) => setMagnitudes(range)}
      />
  
      <FormulaWidget
        id='totalEarthquakes'
        title='Total earthquakes'
        dataSource={earthquakesSource.id}
        operation={AggregationTypes.COUNT}
      />
    </>
  );
}

export default Earthquakes;
```

