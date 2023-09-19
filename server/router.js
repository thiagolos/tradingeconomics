const express = require("express");
const teController = require("./controllers/te.controller.js");

const router = express.Router();

router.get("/SwedenAndThailandData", teController.getSwedenAndThailandData);
router.get("/historicalGDP", teController.getHistoricalGDP);

module.exports = router;
