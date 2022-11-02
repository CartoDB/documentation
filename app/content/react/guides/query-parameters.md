## Query Parameters

You can use QueryParameters to filter your layers at backend side, you can check our [documentation]({{< ref "/deck-gl/reference#queryparameters-depends-on-provider-optional" >}} "About Us") for different providers.
In this guide we're going to create a simple map that shows the earthquakes in Spain and allows to filter it by their magnitude.

#### Creating a map using QueryParameters

First you'll need to create a source that supports query parameters. In this case we are getting all the earthquakes whoses magnitude are between `min: 4` and `max: 5`.

```ts
import { MAP_TYPES } from '@deck.gl/carto';

const sql = 'select * from `carto-demo-data.demo_tables.spain_earthquakes` where magnitude @min and @max';

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

Once you have your source is ready to use you can create your layer using `useCartoLayerProps` hook.

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

Your layer is ready and you can use it your map, now we're going to create a `<FormulaWidget />` wich display the number of earthquakes in your viewport.

#### Using queryParameters with widgets
All our widgets are ready to use queryParameters. You just need to pass the datasource properly configured.

```ts
<FormulaWidget
  id='totalEarthquakes'
  title='Total earthquakes'
  dataSource={earthquakesSource.id}
  operation={AggregationTypes.COUNT}
  />
```

#### Filtering with queryParameters using a widget
We can use widgets to modify and apply filters using queryParameters. We're going to add a `<RangeWidgetUI />` to allows filtering by magnitude. First we need to modify the source to support modify `queryParameters`.

```ts
import { MAP_TYPES } from '@deck.gl/carto';

function useEarthquakeSource([min, max]) {
  const sql = 'select * from `carto-demo-data.demo_tables.spain_earthquakes` where magnitude @min and @max';
  
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

