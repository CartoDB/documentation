## Build a categories & bubbles visualization

1. Log in to CARTO
2. Go to Data Explorer
3. Open CARTO Data Warehouse > CARTO Demo data > demo_tables
4. Pick “populated_places”, check map and data preview in Data Explorer

( imagen - populated_places map preview from DE )


5. Click on *Create map* 
6. Change layer name to “Populated Places”
7. Click on *Layer settings* to start styling the layer

( imagen - layer settings )

8. Click on the “three dots” icon in the Fill Color section, select “Color Based On” feature featurecla. It has information about the kind of places there are. Pick a palette for a categorical variable (versus a gradient).  

( imagen - fill color )

9. Now click on the options for the Radius configuration and in the section “Radius Based On” pick the column `pop_max`. Play with the minimum/maximum size to style the layer as you like.
 
( imagen - radius )

10. Go to the “Widgets” section

( imagen - widgets )

11. Add a widget based on the column `admin0name`. Now we can filter the data based on the country.

( imagen - widget based on)

12. Add a second widget, now based on `pop_max`. You will get a histogram widget in order to be able to filter the populated places based on their population.

( imagen - widget based on pop_max)

13. Now let’s configure the tooltip (or info window). Activate it and select the fields `Admin0name`, `Featurecla` and `Pop_max`. 

( imagen - tooltip )

14. Finally we can change our basemap. In this case we are going to pick “Dark Matter” from CARTO.

( imagen - basemap)

15. We can make the map public and share it online with our colleagues.

( imagen - public map)
 