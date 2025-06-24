import { useState, useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import { SearchBoxCore, SessionToken } from "@mapbox/search-js-core";
import CategoryButtons from './components/CategoryButtons';

const MAPBOX_ACCESS_TOKEN =
  "pk.eyJ1IjoiYXR0aWxhNTIiLCJhIjoiY2thOTE3N3l0MDZmczJxcjl6dzZoNDJsbiJ9.bzXjw1xzQcsIhjB_YoAuEw";

const DEFAULT_MAP_BOUNDS = [
  [-104.99008, 39.71502],
  [-104.98286, 39.71997],
];

function Map() {
  const mapRef = useRef(); // ref for the Map() instance
  const mapContainerRef = useRef(); // ref for the map container DOM element
  const searchRef = useRef(); // ref for the searchBoxCore() instance
  const [searchCategory, setSearchCategory] = useState(); // btn state the selected category

  const [searchResults, setSearchResults] = useState([]); // an array of search results
  const [searchBounds, setSearchBounds] = useState(); // the bounds of the search results
  const [mapBounds, setMapBounds] = useState(); // the current map bounds

  useEffect(() => {
    mapRef.current = new mapboxgl.Map({
      accessToken: MAPBOX_ACCESS_TOKEN, // set the Mapbox access token
      container: mapContainerRef.current, // display the map in this DOM element
      bounds: DEFAULT_MAP_BOUNDS, // set the initial map bounds
      minZoom: 13, // set the minimum zoom level to avoid zooming out too far
      style: "mapbox://styles/mapbox/dark-v11",
      config: {
        basemap: {
          showPointOfInterestLabels: false, // disable POI labels
        },
      },
    });

    // cleanup function: remove the map when the component unmounts
    return () => {
      mapRef.current.remove();
    };
  }, []);

  return (
    <>
      <CategoryButtons 
        searchCategory={searchCategory}
        setSearchCategory={setSearchCategory}
      />
      {/* Map container */}
      <div id="map-container" ref={mapContainerRef} />
    </>
  );
}

export default Map;
