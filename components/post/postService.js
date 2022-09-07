const { Post, User } = require("../../models/index");
const crypto = require("crypto");



/**
 * 모든 게시글을 정렬해서 찾아줌
 */
const allPostsWithOrdering = async (offset,limit) => {
  const all = await Post.findAll({
    attributes: ["postId","title", "content", "weather","created_at"],
    order: [["created_at", "DESC"]],
    offset: offset,
    limit: limit,
  }).catch((err) => {
    throw new Error(err);
  });
  return all;
};

/**
 * 사용자 id에 해당하는 장소 조회
 * @param {number} userId 
 * @returns {StringConstructor}
 */
const findLocation = async (userId) => {
  const userLocation = await User.findOne({ userId: userId }).catch((err) => {
    throw new Error(err);
  });
  const location = userLocation.dataValues.location;
  return location;
};

/**
 * 게시글 수정시 등록된 비밀번호와 같은지 조회
 * @param {number} postId 
 * @param {string} hashPassword 
 * @returns {boolean}
 */
const userAuth = async (postId, hashPassword) => {
  const findPostPassword = await Post.findOne({
    postId: postId,
  });
  if (findPostPassword.dataValues.password === hashPassword) {
    return true;
  } else {
    return false;
  }
};

/**
 * 게시글에서 등록한 비밀번호가 조건에 맞게 작성되었는지 확인
 * @param {string} password 
 * @returns {boolean}
 */
const newPasswordAuth = (password) => {
  if(isNaN(parseInt(password))){
    return false;
  }
  if (password.length > 6 && isNaN(password)) {
    return true;
  } else {
    return false;
  }
};

/**
 *  게시글 등록
 * @param {string} title 
 * @param {string} content 
 * @param {string} password 
 * @param {number} userId 
 * @param {string} weather 
 * @returns 
 */
const postPosted = async (title, content, password, userId,weather) => {
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

/**
 * 게시글 수정
 * @param {number} postId 
 * @param {string} title 
 * @param {string} content 
 * @param {string} password 
 * @param {number} userId 
 * @param {string} weather 
 * @returns 
 */
const postUpdeted = async (
  postId,
  title,
  content,
  weather
) => {
    const update = await Post.update(
      {
        title: title,
        content: content,
        weather: weather,
      },
      {
        where: {
          postId: postId,
        },
      }
    ).catch((err) => {
      throw new Error(err);
    });
    return update;
};

/**
 * 게시글 삭제
 * @param {number} postId 
 * @param {string} password 
 * @returns 
 */

const postDeleted = async (postId) => {
    const destroyResult = await Post.destroy({
      where: { postId: postId },
    }).catch((err) => {
      throw new Error(err);
    });
    return destroyResult;
  
};

module.exports = {
  postDeleted,
  postPosted,
  postUpdeted,
  findLocation,
  newPasswordAuth,
  allPostsWithOrdering,
  userAuth
};
