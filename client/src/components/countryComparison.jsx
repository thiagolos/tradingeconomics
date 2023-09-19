import React, { useState, useEffect } from "react";
import { getSwedenAndThailandData } from "../apiService";
import IndicatorCard from "./indicatorCard";

export default function CountryComparison() {
  const [swedenData, setSwedenData] = useState([]);
  const [thailandData, setThailandData] = useState([]);
  const [swedenAndThailandData, setSwedenAndThailandData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(""); // Track selected category

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

  // Extract unique CategoryGroup values from swedenData
  const uniqueCategoryGroups = Array.from(
    new Set(swedenData.map((indicator) => indicator.CategoryGroup)),
  );

  return (
    <>
      <div className="country-headers">
        <h1>Sweden</h1>
        <h1>Thailand</h1>
      </div>
      <p className="note">
        <span>Note:</span>
        <br />
        The following Trading Economics data have been filtered to include only
        the metrics which are provided for both nations. <br />
        All local currencies have been converted into USD using the most
        recently provided exchange rates.
      </p>
      <div className="category-filter">
        <p>Filter by category:</p>
        <select
          name="categories"
          id="category-list"
          onChange={(e) => setSelectedCategory(e.target.value)}
          value={selectedCategory}
        >
          <option value="">All</option>{" "}
          {uniqueCategoryGroups.map((categoryGroup, index) => (
            <option key={index} value={categoryGroup}>
              {categoryGroup}
            </option>
          ))}
        </select>
      </div>
      <div className="column-container">
        <div className="column">
          {swedenData
            .filter((indicator) =>
              selectedCategory
                ? indicator.CategoryGroup === selectedCategory
                : true,
            )
            .map((indicator) => (
              <IndicatorCard key={indicator.Title} indicator={indicator} />
            ))}
        </div>
        <div className="column">
          {thailandData
            .filter((indicator) =>
              selectedCategory
                ? indicator.CategoryGroup === selectedCategory
                : true,
            )
            .map((indicator) => (
              <IndicatorCard key={indicator.Title} indicator={indicator} />
            ))}
        </div>
      </div>
    </>
  );
}
