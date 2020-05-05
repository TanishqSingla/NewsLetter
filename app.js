const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

//Using body parser
app.use(bodyParser.urlencoded({ extended: true }));

//Serving up styles and images
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/signup.html");
});

//Getting form input
app.post("/", (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;

  console.log(firstName, lastName, email);
});

app.listen(3000, () => {
  console.log("Server is live at port 3000");
});
