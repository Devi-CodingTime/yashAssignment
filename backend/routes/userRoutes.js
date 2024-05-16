const express = require('express');
const router = express.Router();

const {createUser,getUser,singleUser,updateUser,deleteUserById,deleteAllUsers} = require('../controllers/userController');

// router.post("/signup", signup);
router.post("/user", createUser);
router.get("/user",getUser);
router.get("/user/:id",singleUser);
router.put("/user/:id",updateUser);
router.delete("/user/:id",deleteUserById);
router.delete("/user",deleteAllUsers);

// export default router;
module.exports = router;