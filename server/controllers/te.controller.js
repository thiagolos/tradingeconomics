const te = require("tradingeconomics");

// This is my free account API key/secret:
te.login("740f7b774a0a4dd:tgsklshwtjbfx2d");

getSwedenAndThailandData = async function (req, res) {
  try {
    // Here we fetch the indicator data for Sweden and Thailand from one of the provided endpoints
    te.getIndicatorData((country = ["Sweden", "Thailand"])).then((response) => {
      const swedishKronaObject = response.find(
        (item) => item.Title === "Swedish Krona",
      );
      const thaiBahtObject = response.find(
        (item) => item.Title === "Thai Baht",
      );

      // Here we look through the data and convert all local currencies (in this case SEK and THB) to USD. This makes comparison easier
      const SEKConversionRate = swedishKronaObject.LatestValue;
      const THBConversionRate = thaiBahtObject.LatestValue;

      const updatedResponse = response.map((item) => {
        if (/(SEK Million|SEK Billion|SEK\/Hour)/.test(item.Unit)) {
          const updatedValue = Math.round(item.LatestValue / SEKConversionRate);
          item.Unit = item.Unit.replace(/SEK/g, "USD");
          item.LatestValue = updatedValue;
        } else if (
          /(THB Million|THB Billion|THB\/Hour|THB\/Day|THB\/Month)/.test(
            item.Unit,
          )
        ) {
          const updatedValue = Math.round(item.LatestValue / THBConversionRate);
          item.Unit = item.Unit.replace(/THB/g, "USD");
          item.LatestValue = updatedValue;
        }
        return item;
      });
      // Then we provide a success message and send the response with the converted currencies
      res.status(200).send(updatedResponse);
    });
  } catch (err) {
    console.log("Failed to fetch country data", err);
    res.status(500).send(err);
  }
};

// Here we fetch the time series data on GDP for both Sweden and Thailand
getHistoricalGDP = async function (req, res) {
  try {
    te.getHistoricalData(
      ((country = ["sweden", "thailand"]),
      (indicator = "gdp"),
      (start_date = "2000-01-01")),
    ).then((response) => {
      res.status(200).send(response);
    });
  } catch (err) {
    console.log("Failed to fetch historical data", err);
  }
};

module.exports = {
  getSwedenAndThailandData,
  getHistoricalGDP,
};
