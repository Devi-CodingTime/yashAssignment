const deviceModal = require('../models/deviceModel');

 const createDevice = async(req, res) => {
    try {
        const { name, type, status } = req.body;

        const createdDevice = new deviceModal({
            name,
            type,
            status
        });
        await createdDevice.save();
        res.status(201).json({
            message: "Device created successfully",
            user: {
                _id: createdDevice._id,
                name: createdDevice.name,
                type: createdDevice.type,
                status:createdDevice.status
            },
        });
    } catch (error) {
        console.log("Error: " + error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};
const getDevice = async(req,res) => {
    try {
        const users = await deviceModal.find().sort({ _id: -1 });
        res.status(200).send({data:users});
    } catch (error) {
        console.log("Error: " + error.message);
        res.status(500).send({message:error});
    }
}
const singleDevice =  async (req, res) => {
    try {
        const user = await userModal.findById(req.params.id);
        if (!user) {
            return res.status(404).send();
        }
        res.status(200).send({data:user});
    } catch (error) {
        res.status(500).send({message:error});
    }
}
const updateDevice = async (req, res) => {
    try {
        const device = await deviceModal.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!device) {
            return res.status(404).send({message:"Device not found !!"});
        }
        res.status(200).send({data:device});
    } catch (error) {
        res.status(400).send(error);
    }
}
const deleteDeviceById = async(req, res) => {
    try {
        const device = await deviceModal.findByIdAndDelete(req.params.id);
        if (!device) {
            return res.status(404).send({message:"Device Not Found !!"});
        }
        res.status(200).send({data:device, message:"Device Deleted Successfully"});
    } catch (error) {
        console.log("error", error)
        res.status(500).send({message:error});
    }
}
const deleteAllDevices = async(req,res) => {
    // try {
    //     await deviceModal.deleteMany({});
    //     res.status(200).send({ message: "All devices deleted successfully" });
    // } catch (error) {
    //     console.error("Error deleting all devices:", error);
    //     res.status(500).send({ message: "Internal server error" });
    // }

    try {
        // Extract the IDs of the users to be deleted from the request body
        const { deviceIds } = req.body;
        console.log(deviceIds);

        // Check if deviceIds array is empty
        if (!deviceIds || deviceIds.length === 0) {
            return res.status(400).send({ message: "No device IDs provided" });
        }

        // Delete the selected devices
        const result = await deviceModal.deleteMany({ _id: { $in: deviceIds } });

        // Check if any devices were deleted
        if (result.deletedCount === 0) {
            return res.status(404).send({ message: "No devices found with the provided IDs" });
        }

        res.status(200).send({ message: "Selected devices deleted successfully" });
    } catch (error) {
        console.error("Error deleting selected devices:", error);
        res.status(500).send({ message: "Internal server error" });
    }

}
module.exports = {createDevice,getDevice,singleDevice,updateDevice,deleteDeviceById,deleteAllDevices};