import "../App.css";

export default function IndicatorCard({ indicator }) {
  return (
    <>
      <div className="indicator-container">
        <h2>{indicator.Category}</h2>
        <span>
          {indicator.LatestValue}{" "}
          {indicator.Unit && indicator.Frequency ? (
            <>
              {indicator.Unit} / <em>Updated {indicator.Frequency}</em>
            </>
          ) : (
            indicator.Frequency
          )}
        </span>
      </div>
    </>
  );
}
