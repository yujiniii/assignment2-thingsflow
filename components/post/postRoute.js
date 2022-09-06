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

// 게시글 등록
router.post("/post", async (req, res, next) => {
  try {
    const { title, content, password, userId } = req.body;
    if (postService.newPasswordAuth(password)) {
      const weather = postService.findWeather(userId);
      const posted = await postService.postPosted(
        title,
        content,
        password,
        userId,
        weather
      );
      res.status(200).json({ posted });
    } else {
      res.status(500).json({ message: "비밀번호 규정을 지켜주세요" });
    }
  } catch (err) {
    next(err);
  }
});
