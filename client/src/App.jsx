import "./App.css";
import { getSwedenAndThailandData } from "./apiService";
import { useState, useEffect } from "react";

export default function App() {
  const [swedenData, setSwedenData] = useState([]);
  const [thailandData, setThailandData] = useState([]);
  const [swedenAndThailandData, setSwedenAndThailandData] = useState([]);

  useEffect(() => {
    getSwedenAndThailandData().then((data) => {
      setSwedenAndThailandData(data);
    });
  }, []);

  useEffect(() => {
    const swedenFiltered = swedenAndThailandData.filter(
      (element) => element.Country === "Sweden",
    );
    const thailandFiltered = swedenAndThailandData.filter(
      (element) => element.Country === "Thailand",
    );
    setSwedenData(swedenFiltered);
    setThailandData(thailandFiltered);
  }, [swedenAndThailandData]);

  return (
    <>
      <div className="main-container">
        <div className="country-headers">
          <h1>Sweden</h1>
          <h1>Thailand</h1>
        </div>
        <div className="column-container">
          <div className="column">
            {swedenData ? (
              swedenData.map((indicator) => (
                <div className="indicator-container" key={indicator.URL}>
                  <h2>{indicator.Category}</h2>
                </div>
              ))
            ) : (
              <p>No Data</p>
            )}
          </div>
          <div className="column">
            {thailandData ? (
              thailandData.map((indicator) => (
                <div className="indicator-container" key={indicator.URL}>
                  <h2>{indicator.Category}</h2>
                </div>
              ))
            ) : (
              <p>No Data</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
