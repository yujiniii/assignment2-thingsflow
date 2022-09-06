const express = require("express");
const logger = require("morgan");
const db = require("./models");
const postRouter = require("./components/post/postRoute");
const app = express();

app.use(logger("dev"));
app.use(express.json());

db.sequelize
  .sync({ force: true })
  .then(() => {
    console.log("success");
  })
  .catch((err) => {
    console.log("fail : ", err);
  });

app.use(postRouter);

app.use((err, req, res, next) => {
  console.log(err.message);
  res.status(err.status || 500).send(err.message);
});

module.exports = app;
