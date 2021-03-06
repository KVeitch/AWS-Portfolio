const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

require('dotenv').config()
const apiKey = process.env.SENDGRID_API_KEY
const sendGrid = require("@sendGrid/mail");
const app = express();
app.set('port', process.env.PORT || 3030)
app.use(cors());
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // Change later to only allow our server
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.get("/api/v1", (req, res, next) => {
  res.send(`API Status: Up and running. <a href='https://www.google.com'>Visit my homepage</a>`);
});

app.get("/api/v1/email", (req, res, next) => {
  res.send(`API Status: Up and running. POST only here. <a href='https://www.google.com'>Visit my homepage</a>`);
});

app.post("/api/v1/email", (req, res, next) => {
  sendGrid.setApiKey(apiKey);
  console.log(req)
  const msg = {
    to: "kirk.a.veitch@gmail.com",
    from: 'kirk.a.veitch@gmail.com',
    subject: "Website Contact",
    text: `Name:${req.body.name} Msg:${req.body.message} From:${req.body.email}`,
  };
  sendGrid
    .send(msg)
    .then((result) => {
      res.status(200).json({
        success: true,
      });
    })
    .catch((err) => {
      console.log("error: ", err.response.body);
      res.status(401).json({
        success: false,
      });
    });
});

app.listen(app.get('port'));