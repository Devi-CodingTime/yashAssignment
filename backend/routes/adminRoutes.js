const express = require('express');
const router = express.Router();

const {login} = require('../controllers/adminController');

// router.post("/signup", signup);
router.post("/login", login);
// export default router;
module.exports = router;