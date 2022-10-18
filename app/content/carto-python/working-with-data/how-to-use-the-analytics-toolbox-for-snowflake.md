---
aliases:
    - /carto-python/working-with-data/how-to-use-the-analytics-toolbox-for-snowflake
---

## How to access CARTO's Analytics Toolbox for Snowflake and create visualizations via Python notebooks

This notebook guides the user through the process for connecting to both CARTO and Snowflake accounts and leverage CARTO's Analytics Toolbox and CARTO's integration with Pydeck to be able to perform spatial analytics at scale and create map visualizations from Python notebooks. You can find the original notebook [here](https://github.com/CartoDB/research-public/blob/master/pydeck-carto/Snowflake_CARTO_and_Pydeck_integration_for_map_visualizations_in_notebooks_V2.ipynb).

The outline of this notebooks is as follows:

* Authentication to CARTO: to be able to use 'CartoLayer' in Pydeck;
* Authentication to Snowflake (credentials that have access to the database connected to CARTO with the Analytics Toolbox installed)   
* Operations and analysis using Snowpark Python connector and CARTO's Analytics Toolbox
* Map visualizations with CARTO and Pydeck



**NOTE**: snowflake-snowpark-python is only compatible with python >= 3.8, so be sure to run the notebook in an appropriate environment



```python
!pip install snowflake-snowpark-python pandas pydeck pydeck-carto shapely python-dotenv
```

### Loading libraries


```python
import pydeck as pdk
from carto_auth import CartoAuth
from pydeck_carto import register_carto_layer, get_layer_credentials
from pydeck_carto.layer import MapType, CartoConnection
from pydeck_carto.styles import color_continuous, color_categories


import os
import json
from shapely.geometry import shape
from dotenv import load_dotenv
import pandas as pd


from snowflake.snowpark.session import Session

```

### Authentication to CARTO
In order to authenticate to your CARTO account, install the `carto_oauth` package and use it to login with your credentials.


```python
# Authentication with CARTO
carto_auth = CartoAuth.from_oauth()
```

### Authentication to Snowflake
The cell below creates an .env file with the environment variables used for connecting to snowflake


```python
with open(".env", "w+") as f:
    f.write(
"""
SF_ACCOUNT=XXXXXX
SF_USER=XXXXXX
SF_PASSWORD=XXXXXX
CARTO_APP_CREDS_FILE=creds.json
""")

load_dotenv() #loads env variables in .env file
    
```



We load our Snowflake credentials from the environment with `os` to create a Python connector to Snowpark 



```python
def create_session_object(database, schema, verbose = True):
    connection_parameters = {
      "account": os.environ.get("SF_ACCOUNT"),
      "user": os.environ.get("SF_USER"),
      "password": os.environ.get("SF_PASSWORD"),
      "database": database,
      "schema": schema,
    }
    session = Session.builder.configs(connection_parameters).create()
    if verbose:
        print(session.sql('select current_warehouse(), current_database(), current_schema()').collect())
    return session
```


```python
sf_client = create_session_object("SFDATABASE","CARTO")
```


### Downloading data from Snowflake into a Python dataframe

"Crossfit" is a gym chain located in California. We will be running a location analysis of "Crossfit" venues vs its competitors. 

We use the `h3` module in [CARTO's Analytics Toolbox for Snowflake](https://docs.carto.com/analytics-toolbox-snowflake/overview/getting-started/) to compute the H3 cell of each gym in the "Crossfit" and "Competition" tables, we then join them by h3 id and download the data.


```python
q = """
WITH crossfit_count AS (
SELECT CARTO_DEV_DATA.carto.H3_FROMGEOGPOINT(geom, 5) h3, COUNT(*) crossfit_gyms
FROM SFDATABASE.CARTO.GYMS_CA_CROSSFIT
GROUP BY h3
),
competition_count AS (
SELECT CARTO_DEV_DATA.carto.H3_FROMGEOGPOINT(geom, 5) h3, COUNT(*) competition_gyms
FROM SFDATABASE.CARTO.GYMS_CA_COMPETITION
GROUP BY h3
)
SELECT coalesce(a.h3,b.h3) h3, crossfit_gyms, competition_gyms, CARTO_DEV_DATA.carto.H3_BOUNDARY(coalesce(a.h3,b.h3)) geom
FROM crossfit_count a FULL OUTER JOIN competition_count b ON a.h3 = b.h3  
"""
```


```python
gyms_df = sf_client.sql(q).to_pandas()
```

We can export directly the output of a query as a pandas dataframe. The geometry column is downloaded as geojson text


```python
gyms_df.head()
```


    
![png](/img/carto-python/sf-notebook/output_16_0.png)
    



```python
# converts from geojson string to polygon
text_to_geom = lambda t : shape(json.loads(t))

gyms_df["GEOM"] = gyms_df.GEOM.apply(text_to_geom)
gyms_df = gyms_df.fillna(0)
gyms_df.head()
```


    
![png](/img/carto-python/sf-notebook/output_17_0.png)
    


### Uploading a dataframe back to Snowflake

We transform our current dataframe, and we upload it back into our Snowflake database


```python
total_gyms = gyms_df.drop(columns = ["GEOM"])
total_gyms["TOTAL_GYMS"] = gyms_df.CROSSFIT_GYMS + gyms_df.COMPETITION_GYMS

# We go from pandas DF to Snowflake DF. This creates a temp table with the data, which will be dropped at the end of the session.
snowflake_df = sf_client.create_dataframe(total_gyms)

# We persist such table.
snowflake_df.write.save_as_table("SFDATABASE.CARTO.GYMS_CA_TOTAL_CENTROID", mode = "overwrite")
```

### Visualizing data in Snowflake with the pydeck-carto library 

Here we visualize the uploaded data in two layers, using the new styling functions and the Analytics Toolbox installed in SF.
* hexagons: renders the h3 cells with a colour continuos style representing the dominance ratio of crossfit gyms vs total number of gyms
* points: plots the location of the gyms, with a color category style representing the gym type (crossfit gyms vs competition gyms)


```python
# Note that the attribute name must be cased when passed to the styling functions even though in the query is uncased. 
# This is because column names in SF tables are always with capital letters
# Snowflake

# Register CartoLayer in pydeck
register_carto_layer()

hexagons_query = """
SELECT  CARTO_DEV_DATA.carto.H3_BOUNDARY("H3") H3_GEOM,
        CROSSFIT_GYMS / TOTAL_GYMS AS dominance_ratio
        FROM SFDATABASE.CARTO.GYMS_CA_TOTAL_CENTROID
        """

credentials = get_layer_credentials(carto_auth)

hexagons = pdk.Layer(
    "CartoLayer",
    data = hexagons_query,
    geo_column=pdk.types.String("H3_GEOM"),
    type_=MapType.QUERY,
    connection=pdk.types.String("snowflake"),
    credentials=credentials,
    opacity=0.2,
    stroked=True,
    get_fill_color = color_continuous("DOMINANCE_RATIO", [x/10 for x in range(10)], colors = "Tropic"),
    get_line_color=[0,42,42],
    line_width_min_pixels=2,
    on_data_error=get_error_notifier(),
    )

points_query = """
SELECT GEOM, 'crossfit' AS CATEGORY
FROM SFDATABASE.CARTO.GYMS_CA_CROSSFIT
UNION ALL
SELECT GEOM, 'competitors' AS CATEGORY
FROM SFDATABASE.CARTO.GYMS_CA_COMPETITION
"""

points = pdk.Layer(
    "CartoLayer",
    data = points_query,
    geo_column=pdk.types.String("GEOM"),
    type_=MapType.QUERY,
    connection=pdk.types.String("snowflake"),
    credentials=credentials,
    opacity=0.8,
    stroked=True,
    pickable=True,
    point_radius_min_pixels=2,
    get_fill_color = color_categories("CATEGORY", ["competitors", "crossfit"], colors = "Tropic")
    )

view_state = pdk.ViewState(latitude=33.64, longitude=-117.94, zoom=5)
r = pdk.Deck(
    [hexagons, points],
    initial_view_state=view_state,
    map_style=pdk.map_styles.LIGHT,
)
r.to_html(iframe_height = 700)
```

![png](/img/carto-python/sf-notebook/sf_map.png)