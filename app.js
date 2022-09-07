const express = require("express");
const logger = require("morgan");
const db = require("./models");
const postRouter = require("./components/post/postRoute");
const userRouter = require("./components/user/userRoute");
const swaggerFile = require('./swagger/swagger-output');
const swaggerUi = require('swagger-ui-express')

const app = express();

app.use(logger("dev"));
app.use(express.json());

db.sequelize
  .sync({ force: false })
  .then(() => {
    console.log("success");
  })
  .catch((err) => {
    console.log("fail : ", err);
  });

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile, {explorer:true}))
app.use(userRouter);
app.use(postRouter);

app.use((err, req, res, next) => {
  console.log(err.message);
  res.status(err.status || 500).send(err.message);
});

module.exports = app;
