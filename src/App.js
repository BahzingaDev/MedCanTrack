import React, { useState, useEffect } from "react";
import axios from "axios";
import FilterBar from "./components/FilterBar";
import StrainList from "./components/StrainList";
import "./App.css"; // Add a CSS file for consistent styling

function App() {
  const [filters, setFilters] = useState({
    condition: "",
    minPrice: 0,
    maxPrice: Infinity,
    excludeUnsuitable: false,
    maxResults: 0,
  });
  const [filteredStrains, setFilteredStrains] = useState([]);

  const applyFilters = () => {
    console.log("Applying filters:", filters); // Debug log
    axios
      .get("http://127.0.0.1:5000/strains/filter", {
        params: {
          condition: filters.condition.join(","), // Ensure condition is passed as a comma-separated string
          min: filters.minPrice,
          max: filters.maxPrice,
          exclude_unsuitable: filters.excludeUnsuitable,
          max_results: filters.maxResults || 0, // Default to 0 if maxResults is empty
        },
      })
      .then((response) => {
        console.log("Filtered Strains:", response.data); // Debug log
        setFilteredStrains(response.data); // Update the state with the filtered strains
      })
      .catch((error) => console.error("Error applying filters:", error));
  };

  return (
    <div className="app-container">
      <h1 className="app-header">Medical Cannabis Strain Lookup</h1>
      <FilterBar
        filters={filters}
        setFilters={setFilters}
        applyFilters={applyFilters}
      />
      <StrainList strains={filteredStrains} />
    </div>
  );
}

export default App;