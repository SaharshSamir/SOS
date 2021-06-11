const express = require("express");
const router = express.Router();
const { upload, timelinePosts } = require("../controllers/posts")
const requireAuth = require("../middlewares/requireAuth");


router.post("/upload", requireAuth, upload);
router.get("/timeline/posts", timelinePosts);

module.exports = router;