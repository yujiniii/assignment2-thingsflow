const express = require("express");
const postService = require("./postService");
const router = express.Router();
const dotenv = require("dotenv");
const axios = require('axios');
dotenv.config();
const apiKey = process.env.API_KEY;
const weatherUrl = "http://api.weatherapi.com/v1/current.json"  




// 게시글 조회
router.get("/post", async (req, res, next) => {
  try {
    let pageNum = req.query.page; // 요청 페이지 넘버
    let offset = 0;
    if (pageNum > 1) {
      offset = 20 * (pageNum - 1);
    }
    const allPosts = await postService.allPostsWithOrdering(offset,20);

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
      const location = await postService.findLocation(userId);
      axios({
        url:weatherUrl,
        method:"get",
        params:{key:apiKey ,q:location, api:"no" }
      }).then(async (res)=>{
        const weather = res.data.current.condition.text;
        console.log(weather)
        await postService.postPosted(
          title,
          content,
          password,
          userId,
          weather
        );
      }).catch((err)=>{
        next(err);
      });
      res.status(200).json({  message: "게시글 등록 완료" });
  
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
    const location = await postService.findLocation(userId);
    axios({
      url:weatherUrl,
      method:"get",
      params:{key:apiKey ,q:location, api:"no" }
    }).then(async (res)=>{
      const weather = res.data.current.condition.text;
      console.log(weather)
      await postService.postUpdeted(
        postId,
        title,
        content,
        password,
        userId,
        weather
      );
    }).catch((err)=>{
      next(err);
    });

    res.status(200).json({ updated });
  } catch (err) {
    next(err);
  }
});

// 게시글 삭제
router.delete("/post", async (req, res, next) => {
  try {
    const { postId, password } = req.body;
    const deleted = await postService.postDeleted(postId,password);

    res.status(200).json({ deleted });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
