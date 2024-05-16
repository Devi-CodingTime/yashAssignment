const express = require('express');
const router = express.Router();

const {createDevice,getDevice,singleDevice,updateDevice,deleteDeviceById,deleteAllDevices} = require('../controllers/deviceController');

router.post("/device", createDevice);
router.get("/device",getDevice)
router.get("/device/:id",singleDevice);
router.put("/device/:id",updateDevice);
router.delete("/device/:id",deleteDeviceById);
router.delete("/device",deleteAllDevices);

// export default router;
module.exports = router;