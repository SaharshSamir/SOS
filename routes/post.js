const express = require("express");
const router = express.Router();
const { upload, timelinePosts, likePost, commentPost, deletePost } = require("../controllers/posts")
const requireAuth = require("../middlewares/requireAuth");


router.post("/upload", requireAuth, upload);
router.get("/timeline/posts", timelinePosts);
router.post("/post/like", requireAuth, likePost);
router.post("/post/comment", requireAuth, commentPost);
router.delete("/post/delete/:postId", requireAuth, deletePost);

module.exports = router;