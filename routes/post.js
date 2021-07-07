const express = require("express");
const router = express.Router();
const { upload, timelinePosts, likePost, commentPost, deletePost, updatePost, deleteComment } = require("../controllers/posts")
const requireAuth = require("../middlewares/requireAuth");


router.get("/timeline/posts", timelinePosts);
router.post("/upload", requireAuth, upload);
router.post("/post/like", requireAuth, likePost);
router.post("/post/comment", requireAuth, commentPost);
router.post("/post/update", requireAuth, updatePost);
router.post("/post/comment/delete", requireAuth, deleteComment);
router.delete("/post/delete/:postId", requireAuth, deletePost);

module.exports = router;