const express = require("express");
const logger = require("morgan");

const app = express();

app.use(logger("dev"));
app.use(express.json());

app.use((err, req, res, next) => {
  console.log(err.message);
  res.status(err.status || 500).send(err.message);
});

module.exports = app;
