const express = require("express");
const teController = require("./controllers/te.controller.js");

const router = express.Router();

router.get("/getSwedenAndThailandData", teController.getSwedenAndThailandData);

module.exports = router;
