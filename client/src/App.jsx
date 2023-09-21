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
        <label className="switch">
          <input type="checkbox" onClick={toggleView}></input>
          <span className="slider round"></span>
        </label>
        <div className="toggle-text">Toggle table / chart</div>
      </div>

      <div className="main-container">
        {isToggled ? <HistoricalData /> : <CountryComparison />}
      </div>
    </>
  );
}
