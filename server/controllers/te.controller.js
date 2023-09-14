const te = require("tradingeconomics");
te.login("740f7b774a0a4dd:tgsklshwtjbfx2d");

const countryList = ["Sweden", "Mexico", "New Zealand", "Thailand"];

getSwedenAndThailandData = async function (req, res) {
  try {
    te.getIndicatorData((country = ["Sweden", "Thailand"])).then((response) => {
      const swedishKronaObject = response.find(
        (item) => item.Title === "Swedish Krona",
      );
      const thaiBahtObject = response.find(
        (item) => item.Title === "Thai Baht",
      );

      // Define the conversion rates
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

      res.status(200).send(updatedResponse);
    });
  } catch (err) {
    console.log("Failed to fetch calendar data", err);
    res.status(500).send(err);
  }
};

module.exports = {
  getSwedenAndThailandData,
};
