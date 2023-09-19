import CountryComparison from "./components/countryComparison";
import { useState } from "react";
import HistoricalData from "./components/historicalData";

export default function App() {
  const [isToggled, setIsToggled] = useState(false);

  function toggleView() {
    setIsToggled(!isToggled);
  }

  return (
    <>
      <div className="toggle-view">
        <label class="switch">
          <input type="checkbox" onClick={toggleView}></input>
          <span class="slider round"></span>
        </label>
        Toggle table / chart
      </div>

      <div className="main-container">
        {isToggled ? <HistoricalData /> : <CountryComparison />}
      </div>
    </>
  );
}
