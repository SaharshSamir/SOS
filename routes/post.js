const express = require("express");
const router = express.Router();
const { upload, timelinePosts, likePost } = require("../controllers/posts")
const requireAuth = require("../middlewares/requireAuth");


router.post("/upload", requireAuth, upload);
router.get("/timeline/posts", timelinePosts);
router.post("/post/like", likePost);
module.exports = router;