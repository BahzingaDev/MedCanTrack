import React, { useState, useEffect } from "react";
import Select from "react-select"; // Import React Select
import "./FilterBar.css";

function FilterBar({ filters, setFilters, applyFilters }) {
  const [conditions, setConditions] = useState([]);

  // Fetch available conditions from the backend
  useEffect(() => {
    fetch("http://127.0.0.1:5000/conditions")
      .then((response) => response.json())
      .then((data) => {
        setConditions(
          data.map((condition) => ({ value: condition, label: condition }))
        );
      })
      .catch((error) => console.error("Error fetching conditions:", error));
  }, []);

  // Predefined options for max results
  const maxResultsOptions = [
    { value: 10, label: "10" },
    { value: 25, label: "25" },
    { value: 50, label: "50" },
    { value: 100, label: "100" },
  ];

  return (
    <div className="filter-bar-container">
      <div className="filter-group">
        <label htmlFor="condition">Your condition:</label>
        <Select
          id="condition"
          isMulti
          options={conditions}
          placeholder="Select conditions..."
          noOptionsMessage={() => "No conditions available"}
          classNamePrefix="react-select"
          onChange={(selectedOptions) => {
            const updatedConditions = selectedOptions
              ? selectedOptions.map((option) => option.value)
              : [];
            setFilters((prevFilters) => ({
              ...prevFilters,
              condition: updatedConditions,
            }));
          }}
        />
      </div>

      <div className="filter-group">
        <label htmlFor="min-price">Min Price (£) per gram:</label>
        <input
          id="min-price"
          type="number"
          placeholder="e.g., 0"
          value={filters.minPrice}
          onChange={(e) =>
            setFilters((prevFilters) => ({
              ...prevFilters,
              minPrice: parseInt(e.target.value, 10) || 0,
            }))
          }
        />
      </div>

      <div className="filter-group">
        <label htmlFor="max-price">Max Price (£) per gram:</label>
        <input
          id="max-price"
          type="number"
          placeholder="e.g., 10"
          value={filters.maxPrice}
          onChange={(e) =>
            setFilters((prevFilters) => ({
              ...prevFilters,
              maxPrice: parseInt(e.target.value, 10) || Infinity,
            }))
          }
        />
      </div>

      {/* Horizontal checkboxes */}
      <div className="filter-group horizontal-checkboxes">
        <div className="checkbox-container">
          <input
            id="exclude-unsuitable"
            type="checkbox"
            checked={filters.excludeUnsuitable}
            onChange={(e) =>
              setFilters((prevFilters) => ({
                ...prevFilters,
                excludeUnsuitable: e.target.checked,
              }))
            }
          />
          <label htmlFor="exclude-unsuitable">Exclude Unsuitable</label>
        </div>

        <div className="checkbox-container">
          <input
            id="available-only"
            type="checkbox"
            checked={filters.availableOnly || false}
            onChange={(e) =>
              setFilters((prevFilters) => ({
                ...prevFilters,
                availableOnly: e.target.checked,
              }))
            }
          />
          <label htmlFor="available-only">Available Only</label>
        </div>
      </div>

      <div className="filter-group">
        <label htmlFor="max-results">Max Results:</label>
        <Select
          id="max-results"
          className="max-results-dropdown" // Add a class for styling
          options={maxResultsOptions}
          placeholder="Select max results..."
          value={maxResultsOptions.find(
            (option) => option.value === filters.maxResults
          )}
          onChange={(selectedOption) =>
            setFilters((prevFilters) => ({
              ...prevFilters,
              maxResults: selectedOption ? selectedOption.value : 0,
            }))
          }
        />
      </div>

      <button className="apply-filters-button" onClick={applyFilters}>
        Apply Filters
      </button>
    </div>
  );
}

export default FilterBar;