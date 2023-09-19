import Chart from "chart.js/auto";
import { useState, useEffect } from "react";

export default function HistoricalData() {
  return (
    <>
      <div className="charts-container">
        <canvas id="sweden-chart"></canvas>
        <canvas id="thailand-chart"></canvas>
      </div>
    </>
  );
}
