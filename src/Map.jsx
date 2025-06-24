import { useState, useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

import "mapbox-gl/dist/mapbox-gl.css";
import "./App.css";

const MAPBOX_ACCESS_TOKEN =
  "pk.eyJ1IjoiYXR0aWxhNTIiLCJhIjoiY2thOTE3N3l0MDZmczJxcjl6dzZoNDJsbiJ9.bzXjw1xzQcsIhjB_YoAuEw";

const DEFAULT_MAP_BOUNDS = [
  [-104.99008, 39.71502],
  [-104.98286, 39.71997],
];
function Map() {
  const mapRef = useRef(); // ref for the Map() instance
  const mapContainerRef = useRef(); // ref for the map container DOM element

  const [searchCategory, setSearchCategory] = useState(); // the selected category

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

    // cleanup function: remove the map when the component unmounts
    return () => {
      mapRef.current.remove();
    };
  }, []);

  // configuration array for category search buttons
  const categoryButtons = [
    { label: "☕ Coffee", value: "coffee" },
    { label: "🍽️ Restaurants", value: "restaurant" },
    { label: "🍸 Bars", value: "bar" },
    { label: "🏨 Hotels", value: "hotel" },
    { label: "🏛️ Museums", value: "museum" },
  ];

  const handleCategoryClick = (e) => {
    console.log(e.target.dataset.category);
    setSearchCategory(e.target.dataset.category);
    alert(e.target.dataset.category);
  };

  return (
    <>
      {/* Show category search buttons */}
      <div className="navbar navbar-expand-lg navbar-light bg-dark">
        {categoryButtons.map(({ label, value }) => (
          <button
            key={value}
            data-category={value}
            onClick={handleCategoryClick}
            className={`btn btn-sm btn-primary rounded-pill ${
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
