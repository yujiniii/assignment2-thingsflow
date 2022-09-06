const express = require("express");
const postService = require("./postService");
const router = express.Router();

// 게시글 조회
router.get("/post", async (req, res, next) => {
  try {
    const allPosts = await postService.allPostsWithOrdering();

    res.status(200).json({ allPosts });
  } catch (err) {
    next(err);
  }
});

// 게시글 등록
router.post("/post", async (req, res, next) => {
  try {
    const { title, content, password, userId } = req.body;
    const isPasswordPolicy = await postService.newPasswordAuth(password);
    if (isPasswordPolicy) {
      //const weather = postService.findWeather(userId);
      const weather = "good";
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

// 게시글 수정
router.patch("/post", async (req, res, next) => {
  try {
    const { postId, title, content, password, userId } = req.body;

    //const weather = postService.findWeather(userId);
    const weather = "good";
    const updated = await postService.postUpdeted(
      postId,
      title,
      content,
      password,
      userId,
      weather
    );

    res.status(200).json({ updated });
  } catch (err) {
    next(err);
  }
});

// 게시글 삭제
router.delete("/post", async (req, res, next) => {
  try {
    const { postId } = req.body;
    const deleted = await postService.postDeleted(postId);

    res.status(200).json({ deleted });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
