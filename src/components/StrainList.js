import React, { useState } from "react";
import "./StrainList.css";

function StrainList({ strains, darkMode }) {
  const [selectedStrain, setSelectedStrain] = useState(null);

  if (!strains || strains.length === 0) {
    return <p>No strains match the applied filters.</p>;
  }

  // Automatically sort strains by score in descending order
  const sortedStrains = [...strains].sort((a, b) => b.score - a.score);

  // Get all unique terpene names from the first strain
  const terpeneColumns = Object.keys(strains[0]).filter(
    (key) =>
      ![
        "strain_name",
        "match_status",
        "score",
        "price_per_gram",
        "matched_conditions",
        "suitable",
        "cbd_thc",
        "cbd",
        "thc",
      ].includes(key)
  );

  // Function to parse CBD and THC percentages from the "cbd_thc" field
  const parseCbdThc = (cbdThc) => {
    console.log("Parsing CBD/THC:", cbdThc); // Debug log
    if (!cbdThc) return { cbd: "N/A", thc: "N/A" };
    try {
      const [thc, cbd] = cbdThc.split(" / ").map((value) =>
        value.replace("%", "").replace("<", "").trim()
      );
      return { cbd: `${cbd}%`, thc: `${thc}%` };
    } catch (error) {
      console.error("Error parsing CBD/THC:", error); // Debug log
      return { cbd: "N/A", thc: "N/A" };
    }
  };

  // Function to get background color based on score
  const getBackgroundColor = (score) => {
    if (score >= 75) return "green"; // Suitable
    if (score >= 50) return "orange"; // Semi-suitable
    return "red"; // Not suitable
  };

  // Function to close the modal
  const closeModal = () => {
    setSelectedStrain(null);
  };

  return (
    <div
      className={`strain-list-container ${darkMode ? "dark-mode" : ""}`}
    >
      <div className="controls-and-table">
        <table className="strain-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Score</th> {/* Score column */}
              <th>Match Status</th>
              {terpeneColumns.map((terpene) => (
                <th key={terpene}>{terpene}</th>
              ))}
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {sortedStrains.map((strain, index) => {
              console.log("Strain Data:", strain); // Debug log

              // Use CBD and THC directly if provided by the backend
              const cbd = strain.cbd || "N/A";
              const thc = strain.thc || "N/A";

              return (
                <tr key={index}>
                  <td>
                    <button
                      className="strain-name-button"
                      onClick={() => setSelectedStrain({ ...strain, cbd, thc })}
                    >
                      {strain.strain_name}
                    </button>
                  </td>
                  <td
                    style={{
                      backgroundColor: getBackgroundColor(strain.score),
                      color: "white",
                      textAlign: "center",
                    }}
                  >
                    {strain.score.toFixed(2)} {/* Display the score */}
                  </td>
                  <td>{strain.match_status}</td>
                  {terpeneColumns.map((terpene) => (
                    <td key={terpene}>{strain[terpene]}</td>
                  ))}
                  <td>{strain.price_per_gram}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {selectedStrain && (
        <div className="modal-overlay" onClick={closeModal}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
          >
            <button className="close-modal-button" onClick={closeModal}>
              &times;
            </button>
            <h2>{selectedStrain.strain_name}</h2>
            <p>
              <strong>CBD:</strong> {selectedStrain.cbd} |{" "}
              <strong>THC:</strong> {selectedStrain.thc}
            </p>
            <p><strong>Terpenes:</strong></p>
            <ul>
              {Object.entries(selectedStrain)
                .filter(([key]) => terpeneColumns.includes(key))
                .map(([terpene, value]) => (
                  <li key={terpene}>
                    {terpene}: {value}
                  </li>
                ))}
            </ul>
            <p>
            This information is for educational purposes only and should not be considered medical advice. Always consult a healthcare professional before using any strain.

While we aim to provide accurate, up-to-date details, the cannabis industry is constantly evolving, so product availability and research may change. We recommend conducting your own research and consulting with professionals for the most relevant information.

It may also be helpful to connect with other patients to learn from their experiences.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default StrainList;