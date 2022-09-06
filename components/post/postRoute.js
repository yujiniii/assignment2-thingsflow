const express = require("express");
const postService = require("./postService");
const router = express.Router();

// 게시글 조회
router.get("/post", async (req, res, next) => {
  try {
    const allPosts = postService.allPostsWithOrdering();
    if (!allPosts) {
      res.status(200).json({ message: "등록된 게시글이 없습니다." });
    } else {
      res.status(200).json({ allPosts });
    }
  } catch (err) {
    next(err);
  }
});
