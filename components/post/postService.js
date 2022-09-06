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
