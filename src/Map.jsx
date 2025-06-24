import { useState, useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import { SearchBoxCore, SessionToken } from "@mapbox/search-js-core";

import "mapbox-gl/dist/mapbox-gl.css";
import "./App.css";


const DEFAULT_MAP_BOUNDS = [
  [-104.98705, 39.71675],
  [-104.97377, 39.71900],
];

function Map({ MAPBOX_ACCESS_TOKEN }) {
  const mapRef = useRef(); // ref for the Map() instance
  const mapContainerRef = useRef(); // ref for the map container DOM element
  const searchRef = useRef(); // ref for the SearchBoxCore() instance

  const [searchCategory, setSearchCategory] = useState(); // the selected category
  const [searchResults, setSearchResults] = useState([]); // an array of search results
  const [mapBounds, setMapBounds] = useState(); // the current map bounds
  const [searchBounds, setSearchBounds] = useState(); // the bounds of the search results

  // function to perform a category search using the SearchBoxCore() instance

  // uses the current map bounds and the selected category to search for points of interest

  const performCategorySearch = async () => {
    if (!searchCategory || !mapBounds) return;

    const { features } = await searchRef.current.category(searchCategory, {
      bbox: mapBounds,
      limit: 25,
    });

    setSearchResults(features);

    setSearchBounds(mapBounds);

    console.log("Search results:", features);
  };

  useEffect(() => {
    mapRef.current = new mapboxgl.Map({
      accessToken: MAPBOX_ACCESS_TOKEN, // set the Mapbox access token
      container: mapContainerRef.current, // display the map in this DOM element
      bounds: DEFAULT_MAP_BOUNDS, // set the initial map bounds
      minZoom: 13, // set the minimum zoom level to avoid zooming out too far
      config: {
        basemap: {
          showPointOfInterestLabels: false, // disable POI labels
        },
      },
    });

    // when the map is loaded, set mapBounds to the current map bounds
    mapRef.current.on("load", () => {
      setMapBounds(mapRef.current.getBounds().toArray());
    });

    // when the map moves, set mapBounds to the current map bounds
    mapRef.current.on("moveend", () => {
      setMapBounds(mapRef.current.getBounds().toArray());
    });

    // instantiate the search box
    searchRef.current = new SearchBoxCore({ accessToken: MAPBOX_ACCESS_TOKEN });
    new SessionToken();

    // cleanup function: remove the map when the component unmounts
    return () => {
      mapRef.current.remove();
    };
  }, []);

  // when the searchCategory changes, perform a category search
  useEffect(() => {
    performCategorySearch();
  }, [searchCategory]);

  // configuration array for category search buttons
  const categoryButtons = [
    { label: "☕ Coffee", value: "coffee" },
    { label: "🍽️ Restaurants", value: "restaurant" },
    { label: "🍸 Bars", value: "bar" },
    { label: "🏨 Hotels", value: "hotel" },
    { label: "🏛️ Museums", value: "museum" },
  ];

  return (
    <>
      {/* Show category search buttons */}
      <div className="navbar navbar-expand-xl navbar-dark">
        {categoryButtons.map(({ label, value }) => (
          <button
            key={value}
            onClick={() => setSearchCategory(value)}
            className={`btn btn-sm btn-outline-secondary ${
              searchCategory === value && " text-info border-info"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Map container */}
      <div id="map-container" ref={mapContainerRef} />
    </>
  );
}

export default Map;
