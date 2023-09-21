// The indicator card component displays the indicator and its value, and also tells us when the data was last updated

import "../App.css";

export default function IndicatorCard({ indicator }) {
  return (
    <>
      <div className="indicator-container">
        <div className="header-and-category">
          <h2>{indicator.Category}</h2>
          <em>Category: {indicator.CategoryGroup}</em>
        </div>
        <span>
          {indicator.LatestValue}{" "}
          {indicator.Unit && indicator.Frequency ? (
            <>
              {indicator.Unit} <em>/ Updated {indicator.Frequency}</em>
            </>
          ) : (
            <em>/ Updated {indicator.Frequency}</em>
          )}
        </span>
      </div>
    </>
  );
}
