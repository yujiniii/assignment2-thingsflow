const express = require("express");
const userService = require("./userService");
const router = express.Router();

// 사용자 조회
router.get("/user", async (req, res, next) => {
  try {
    const allUsers = userService.allUser();

    res.status(200).json({ allUsers });
  } catch (err) {
    next(err);
  }
});

// 사용자 등록
router.post("/user", async (req, res, next) => {
  try {
    const { name, location } = req.body;

    const newUser = await userService.newUser(name, location);
    res.status(200).json({ newUser });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
