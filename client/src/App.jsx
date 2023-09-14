import "./App.css";
import { getSwedenAndThailandData } from "./apiService";
import { useState, useEffect } from "react";
import IndicatorCard from "./components/indicatorCard";

export default function App() {
  const [swedenData, setSwedenData] = useState([]);
  const [thailandData, setThailandData] = useState([]);
  const [swedenAndThailandData, setSwedenAndThailandData] = useState([]);

  useEffect(() => {
    // Call the apiService method then set the state to hold the response data
    getSwedenAndThailandData().then((data) => {
      setSwedenAndThailandData(data);
    });
  }, []);

  useEffect(() => {
    // Separating out the Sweden and Thailand data
    const swedenMetrics = swedenAndThailandData.filter(
      (element) => element.Country === "Sweden",
    );
    const thailandMetrics = swedenAndThailandData.filter(
      (element) => element.Country === "Thailand",
    );

    // Find the common categories between Sweden and Thailand
    const commonCategories = swedenMetrics.reduce((categories, element) => {
      if (
        thailandMetrics.some(
          (thailandElement) => thailandElement.Category === element.Category,
        )
      ) {
        categories.push(element.Category);
      }
      return categories;
    }, []);

    // Filter Sweden data to include only common categories
    const swedenFiltered = swedenMetrics.filter((element) =>
      commonCategories.includes(element.Category),
    );

    // Filter Thailand data to include only common categories
    const thailandFiltered = thailandMetrics.filter((element) =>
      commonCategories.includes(element.Category),
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
                <IndicatorCard key={indicator.Title} indicator={indicator} />
              ))
            ) : (
              <p>No data to display</p>
            )}
          </div>
          <div className="column">
            {thailandData ? (
              thailandData.map((indicator) => (
                <IndicatorCard key={indicator.Title} indicator={indicator} />
              ))
            ) : (
              <p>No data to display</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
