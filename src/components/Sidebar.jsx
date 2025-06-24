import { useState } from "react";

const Sidebar = ({ center, zoom }) => {

  return (
<div className="sidebar">
      Longitude: {center[0].toFixed(4)} | Latitude: {center[1].toFixed(4)} | Zoom:{" "}
      {zoom.toFixed(2)}
    </div>
  );
};

export default Sidebar;
