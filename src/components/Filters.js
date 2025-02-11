import React, { useState } from "react";
import "./styles/Filters.css";

function Filters() {
  const [overlayVisible, setOverlayVisible] = useState(false); // State for overlay visibility
  const [selectedFilter, setSelectedFilter] = useState(""); // State for which filter was clicked
  const [searchInput, setSearchInput] = useState(""); // State for search input
  const [selectedLocation, setSelectedLocation] = useState(""); // State for applied filter

  const filters = [
    "Job Category",
    "Skills",
    "Location",
    "Minimum Salary",
    "Experience Range",
  ];

  const locations = [
    "Bangalore",
    "Chennai",
    "Pune",
    "Mumbai",
    "Hyderabad",
    
  ];

  // Handle click on a filter
  const handleFilterClick = (filter) => {
    setSelectedFilter(filter);
    setOverlayVisible(true);
    setSearchInput("");
  };

  // Close overlay
  const closeOverlay = () => {
    setOverlayVisible(false);
    setSelectedFilter("");
    setSearchInput("");
  };

  // Clear filter action
  const clearFilter = () => {
    setSelectedLocation("");
    setSearchInput("");
  };

  // Filtered locations based on search input
  const filteredLocations = locations.filter((loc) =>
    loc.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <>
      <div className="filters">
        <h3>Filters</h3>
        <ul>
          {filters.map((filter, index) => (
            <li key={index} onClick={() => handleFilterClick(filter)}>
              {filter}
            </li>
          ))}
        </ul>
      </div>

      {/* Overlay */}
      {overlayVisible && (
        <div className="overlay" onClick={closeOverlay}>
          <div className="overlay-content" onClick={(e) => e.stopPropagation()}>
            <div className="overlay-header">
              
            </div>

          
            <button className="close-btn" onClick={closeOverlay}>
              &times;
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Filters;
