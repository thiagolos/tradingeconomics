import Chart from "chart.js/auto";
import { getHistoricalGDP } from "../apiService";
import { useState, useEffect, useRef } from "react";

export default function HistoricalData() {
  const [swedenAndThailandData, setSwedenAndThailandData] = useState([]);
  const [swedenData, setSwedenData] = useState([]);
  const [thailandData, setThailandData] = useState([]);
  const chartRef = useRef(null);

  useEffect(() => {
    // Call the apiService method then set the state to hold the response data
    getHistoricalGDP().then((data) => {
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
    let swedenChartData = [];
    let thailandChartData = [];

    swedenMetrics.forEach((element) =>
      swedenChartData.push({
        year: parseInt(element.DateTime.slice(0, 4), 10),
        value: element.Value,
      }),
    );

    thailandMetrics.forEach((element) =>
      thailandChartData.push({
        year: parseInt(element.DateTime.slice(0, 4), 10),
        value: element.Value,
      }),
    );
    setSwedenData(swedenChartData);
    setThailandData(thailandChartData);
  }, [swedenAndThailandData]);

  useEffect(() => {
    if (chartRef.current) {
      // Update the data for both Sweden and Thailand charts
      chartRef.current.data.labels = swedenData.map((row) => row.year);
      chartRef.current.data.datasets[0].data = swedenData.map(
        (row) => row.value,
      );
      chartRef.current.data.datasets[1].data = thailandData.map(
        (row) => row.value,
      );
      chartRef.current.update();
    }
  }, [swedenData, thailandData]);

  useEffect(() => {
    if (!chartRef.current) {
      const gdpChart = new Chart(document.getElementById("gdp-chart"), {
        type: "line",
        data: {
          labels: swedenData.map((row) => row.year),
          datasets: [
            {
              label: "Sweden Gross Domestic Product (GDP) (USD/ Billion)",
              data: swedenData.map((row) => row.value),
            },
            {
              label: "Thailand Gross Domestic Product (GDP) (USD/ Billion)",
              data: swedenData.map((row) => row.value),
            },
          ],
        },
      });
      chartRef.current = gdpChart;
    }
  }, [swedenData, thailandData]);

  return (
    <>
      <div className="charts-container">
        <canvas id="gdp-chart"></canvas>
      </div>
    </>
  );
}
