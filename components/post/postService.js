const { Post } = require("../../models/index");
const crypto = require("crypto");

/**
 * 모든 게시글을 정렬해서 찾아줌
 */
const allPostsWithOrdering = async () => {
  const all = await Post.findAll({
    attributes: ["title", "content", "created_at"],
    order: [["created_at", "DESC"]],
  }).catch((err) => {
    throw new Error(err);
  });
  return all;
};

const findWeather = async (userId) => {
  const userLocation = await Post.findOne({ userId: userId }).catch((err) => {
    throw new Error(err);
  });
  const location = userLocation.dataValues.location;
  // 날씨 찾아오기
  return weatherState;
};


const newPasswordAuth = (password) => {
  if (password.length > 6 && (isNaN(password))){
    return true;
  } else {
    return false;
  }
};

const postPosted = async (title, content, password, userId, weather) => {
  const hashPassword = await crypto
    .createHash("sha256")
    .update(password)
    .digest("base64");
  const create = await Post.create({
    title: title,
    content: content,
    password: hashPassword,
    userId: userId,
    weather: weather,
  }).catch((err) => {
    throw new Error(err);
  });
  return create;
};


module.exports = {
  postDeleted,
  postPosted,
  postUpdeted,
  findWeather,
  newPasswordAuth,
  allPostsWithOrdering,
};
