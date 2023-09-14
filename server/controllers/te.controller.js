const te = require("tradingeconomics");
te.login("740f7b774a0a4dd:tgsklshwtjbfx2d");

const countryList = ["Sweden", "Mexico", "New Zealand", "Thailand"];

getSwedenAndThailandData = async function (req, res) {
  try {
    te.getIndicatorData((country = ["Sweden", "Thailand"])).then((response) => {
      res.status(200).send(response);
    });
  } catch (err) {
    console.log("Failed to fetch calendar data", err);
    res.status(500).send(err);
  }
};

module.exports = {
  getSwedenAndThailandData,
};
