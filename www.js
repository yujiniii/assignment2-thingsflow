const app = require("./app");
const { createServer } = require("http");
const dotenv = require("dotenv");

dotenv.config();

const httpServer = createServer(app);

httpServer.listen(process.env.PORT || 8080, () => {
  console.log("Server Start......");
});
