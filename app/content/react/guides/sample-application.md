## Sample Application

A full CARTO 2 sample-application with the most common functionality for creating LI Apps is also available at https://sample-app-react.carto.com.

To download it to your local environment or use it to kickstart an application, just run:

```bash
npx create-react-app my-app --template @carto/sample-app-2
cd my-app
yarn start
```

This application uses a dataset with retail locations, another related dataset with the monthly revenue information for each location and a tileset with buildings coming from OpenStreetMap. It includes the following views/pages:

- **Stores view**. This view demostrates how to:
  
  - Visualize a CARTO dataset applying a by-value style (color based on store type) and create a corresponding legend.

  - Include interactive data-driven widgets that allow the users to get information about the dataset and filter the information in the map.
  
    - Formula widget showing the total revenue from all the stores
  
    - Category widget showing the revenue by store type
  
    - Histogram widget showing revenue buckets
  
  - Search a location by address, city… using CARTO geocoding services through the Data Services API and zoom to the results.
  
  - Display information about a feature when hovering over. When we hover over the store, we will display a pop-up or tooltip with the total revenue for the store.
  
  - Select a feature and display detailed information. When we click on a store, the map will be centered in the location and the store will be highlighted. It demostrates how you can use CARTO SQL API to create spatial queries against CARTO. The following information will be displayed in the sidebar:
  
    - Total revenue of the store
  
    - Histogram (line chart) with the store revenue per month, showing the average per month of all stores for comparison
  
    - Calculate an isochrone using CARTO Data Services API. We can select a store from a list in the sidebar and calculate isochrones specifying the mode (car or walking) and range (time in minutes)

- **KPI view**. This view shows how to build a geospatial bussiness dashboard by creating a KPI in a few lines of code:
  - Visualize a CARTO dataset using a choropleth map with manual breaks where the store color depends on the total revenue per area and create a corresponding legend.
  
  - Include interactive data-driven widgets that allow the users to get information about the dataset and filter the information in the map.
    
    - Formula widget with the total revenue from all stores
    
    - Category widget showing the total revenue per area
    
    - Histogram widget showing the total revenue per month

- **Tileset view**. This view shows a layer connected to an aggregated tileset dataset, and it allows to see how widgets can connect also to this different type of source. It includes:
    
    - Formula widget with the total aggregated sum of buildings

    - Histogram widget showing the building count per aggregation unit