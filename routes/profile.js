const express = require('express');
const router = express.Router();
const { userProfile } = require("../controllers/profile");

router.get('/', userProfile);

module.exports = router;