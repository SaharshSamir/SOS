const express = require('express');
const router = express.Router();
const { logIn, signUp, allUsers } = require("../controllers/auth");



router.get("/allUsers", allUsers);
router.post("/logIn", logIn);
router.post("/signUp", signUp);

module.exports = router;