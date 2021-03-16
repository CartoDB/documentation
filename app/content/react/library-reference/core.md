## Core
**npm package: @carto/react-core**

Set of common functions, to be used mostly by other packages. You won't usually consume this package directly, but when using `AggregationTypes` for widgets.
### aggregationFunctions ⇒ <code>Object</code>

Contains a set of basic aggregation functions (count, min, max, sum and average), used automatically for widgets and layers, see [AggregationTypes](#aggregationtypes). Functions are applicable to numbers and also objects using a numeric property

- **Input**:
    | Param                      | Type                | Description                                                                        |
    | -------------------------- | ------------------- | -----------------------------------------------------------------------------------|
    | values                     | <code>Array</code>  | Array of numbers or objects with a numerical property                              |
    | key                        | <code>string</code> | (Optional). When using objects, name of the property to use for calculations       |

- **Returns**: <code>Object</code> - An object with Aggregation functions, which keys are every `AggregationTypes` values

- **Example**:
    ```js
        import { aggregationFunctions, AggregationTypes } from '@carto/react-core';

        const values = [{f: 1}, {f: 2}, {f: 3}, {f: 4}, {f: 5}];
        const avgFn = aggregationFunctions[AggregationTypes.AVG];        

        console.log(avgFn(values, 'f')); // 3
    ```
### groupValuesByColumn ⇒ <code>Array</code>

Makes groups from features based in a column (`keysColumn`) and applying an `operation` to the numeric values in a predefined column (`valuesColumn`). 

- **Input**:
    | Param   | Type                | Default   | Description                          |
    | ------- | ------------------- | --------- | ------------------------------------ |
    | data | <code>Array</code> |         | Features for calculations (plain objects with properties)              |
    | valuesColumn | <code>string</code> |         | Quantitative column for grouping (the name of a numeric property in the object)             |
    | keysColumn | <code>string</code> |         | Qualitative column for grouping (the name of a string property in the object)             |
    | operation | <code>string</code> |         | Operation for groups calculations, see [AggregationTypes](#aggregationtypes)              |

- **Returns**: <code>Array</code> - Grouped values

- **Example**: 
    ```js
    import { groupValuesByColumn, AggregationTypes } from '@carto/react-core';

    const data = [
        { category: 'A', population: 100 },
        { category: 'A', population: 200 },
        { category: 'B', population: 50 }
    ];

    const groups = groupValuesByColumn(data, 'population', 'category', AggregationTypes.SUM);

    console.log(groups); // output: [ { name: 'A', value: 300 }, { name: 'B', value: 50 }] 
    ```
### histogram ⇒ <code>Array</code>

Makes an array of numeric values as histogram data from features

- **Input**:
    | Param   | Type                | Default   | Description                          |
    | ------- | ------------------- | --------- | ------------------------------------ |
    | features | <code>Array</code> |           | Features for calculations (plain objects with properties)                |
    | columnName | <code>string</code> |        | Quantitative column for calculations (the name of a number property in the object)              |
    | ticks | <code>Array</code>    |           | Array of numbers to build intervals (eg 1, 5, 10 --> defines 4 intervals: <1, 1 to 5, 5 to 10 and >10   | operation | <code>string</code> |         | Operation for groups calculations, see [AggregationTypes](#aggregationtypes)              |

- **Returns**: <code>Array</code> - Histogram data for each bin, derived from ticks

- **Example**:
    ```js
        import { histogram, AggregationTypes } from '@carto/react-core';

        const features = [
            { field: 1 },
            { field: 2 }, { field: 2 },
            { field: 3 }, { field: 3 }, { field: 3 },
            { field: 4 }, { field: 4 },
            { field: 5 }            
        ];

        const ticks = [2, 4, 6];

        const h = histogram(features, 'field', ticks, AggregationTypes.COUNT);        
        console.log(h); // [1, 5, 3, 0]
        /* 
            histogram results as:
            <2          --> 1 item
            >=2 to <4   --> 5 items
            >=4 to <6   --> 3 items
            >=6         --> 0 items
        */
    ```
### AggregationTypes

Enum for the different types of aggregations, available for widgets

**Kind**: global enum  
**Read only**: true

<dl>
<dt><a href="#COUNT">COUNT</a></dt>
<dd><p>Count</p>
</dd>
<dt><a href="#AVG">AVG</a></dt>
<dd><p>Average</p>
</dd>
<dt><a href="#MIN">MIN</a></dt>
<dd><p>Minimum</p>
</dd>
<dt><a href="#MAX">MAX</a></dt>
<dd><p>Maximum</p>
</dd>
<dt><a href="#SUM">SUM</a></dt>
<dd><p>Sum</p>
</dd>
</dl>

- **Example**:

    ```js
        import { AggregationTypes } from '@carto/react-core';

        console.log(AggregationTypes.COUNT);

    ```
