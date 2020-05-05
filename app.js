const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

//Keys and ids
const { key, listId } = require("./key");

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

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      },
    ],
  };

  const jsonData = JSON.stringify(data);

  const url = "https://us8.api.mailchimp.com/3.0/lists/" + listId;

  const options = {
    method: "POST",
    auth: `AlexEths:${key}`,
  };

  const request = https.request(url, options, (response) => {
    if (response.statusCode === 200) {
      res.send("Successfully subscribed");
    } else {
      res.send("There was an error while signing up");
    }
  });

  request.write(jsonData);
  request.end();
});

app.listen(3000, () => {
  console.log("Server is live at port 3000");
});
