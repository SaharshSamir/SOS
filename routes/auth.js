const express = require('express');
const router = express.Router();
const { logIn, signUp } = require("../controllers/auth");



router.post("/logIn", logIn);
router.post("/signUp", signUp);

module.exports = router;