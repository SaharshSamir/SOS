const express = require('express');
const router = express.Router();
const { logIn, signUp, allUsers, fetchUser } = require("../controllers/auth");



router.get("/allUsers", allUsers);
router.get("/user", fetchUser);
router.post("/logIn", logIn);
router.post("/signUp", signUp);

module.exports = router;