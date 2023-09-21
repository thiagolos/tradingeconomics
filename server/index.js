// Standard Express app set up, using cors to allow resounce sharing and body parsing for easier data handling

const express = require("express");
const cors = require("cors");
const router = require("./router.js");

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);

app.listen(3001, () => {
  console.log("app live on port 3001");
});
