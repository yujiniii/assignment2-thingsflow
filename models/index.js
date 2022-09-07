const Sequelize = require("sequelize");
const config = require(__dirname + "/../config/config.js");

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

const User = require("./user.model")(sequelize);
const Post = require("./post.model")(sequelize);

// User : Post ==> 1:n
User.hasMany(Post, { foreignKey: "userId" });
Post.belongsTo(User, { foreignKey: "userId" });

const db = {};
db.sequelize = sequelize;

db.User = User;
db.Post = Post;

module.exports = db;
