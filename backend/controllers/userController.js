const userModal = require('../models/userModel');
const bcryptjs = require ('bcryptjs');

 const createUser = async(req, res) => {
    try {
        const { name, email, phoneNumber, devices, username, password, status } = req.body;

        const user = await userModal.findOne({ email:email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashPassword = await bcryptjs.hash(password, 10);
        const createdUser = new userModal({
            name: name,
            email: email,
            phoneNumber: phoneNumber,
            devices:devices,
            username: username,
            password: hashPassword,
            status:status
        });
        await createdUser.save();
        res.status(201).json({
            message: "User created successfully",
            user: {
                _id: createdUser._id,
                name: createdUser.name,
                email: createdUser.email,
            },
        });
    } catch (error) {
        console.log("Error: " + error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

const getUser = async (req, res) => {
    try {
        const users = await userModal.find().sort({ _id: -1 });
        res.status(200).send({data:users});
    } catch (error) {
        console.log("Error: " + error.message);
        res.status(500).send({message:error});
    }
}
const singleUser =  async (req, res) => {
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
const updateUser = async (req, res) => {
    console.log(req.params.id);
    try {
        const hashPassword = await bcryptjs.hash(req.body.password, 10);
        const editUser = {
            name: req.body.name,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            devices:req.body.devices,
            username: req.body.username,
            password: hashPassword,
            status:req.body.status
        };
        const user = await userModal.findByIdAndUpdate(req.params.id, editUser, { new: true });
        if (!user) {
            return res.status(404).send({mesage:"User not found !!"});
        }
        res.status(200).send({data:user,message:"User Updated Successfully"});
    } catch (error) {
        console.log("Error: " + error.message);
        res.status(400).send({message:error});
    }
}
const deleteUserById = async (req, res) => {
    try {
        const user = await userModal.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).send({message:"User Not Found !!"});
        }
        res.status(200).send({data:user, message:"User Deleted Successfully"});
    } catch (error) {
        console.log("error", error)
        res.status(500).send({message:error});
    }
}
const deleteAllUsers = async (req, res) => {
    try {
        const { userIds } = req.body;

        if (!userIds || userIds.length === 0) {
            return res.status(400).send({ message: "No user IDs provided" });
        }

        const result = await userModal.deleteMany({ _id: { $in: userIds } });

        if (result.deletedCount === 0) {
            return res.status(404).send({ message: "No users found with the provided IDs" });
        }

        res.status(200).send({ message: "Selected users deleted successfully" });
    } catch (error) {
        console.error("Error deleting selected users:", error);
        res.status(500).send({ message: "Internal server error" });
    }
};
module.exports = {createUser,getUser,singleUser,updateUser,deleteUserById,deleteAllUsers};
