const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.get("/", (req, res) => {
  res.send("Server Up and running");
});

app.listen(3000, () => {
  console.log("Server is live at port 3000");
});
