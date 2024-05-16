const adminModal = require('../models/adminModel');
const userModal = require('../models/userModel');

const bcryptjs = require ('bcryptjs');

const login = async(req, res) => {
    // try {
    //     const { email, password } = req.body;
    //     const user = await adminModal.findOne({ email });
    //     const isMatch = await bcryptjs.compare(password, user.password);
    //     if (!user || !isMatch) {
    //         return res.status(400).json({ message: "Invalid username or password" });
    //     } else {
    //         res.status(200).json({
    //             message: "Login successful",
    //             user: {
    //                 _id: user._id,
    //                 name: user.name,
    //                 email: user.email,
    //             },
    //         });
    //     }
    // } catch (error) {
    //     console.log("Error: " + error.message);
    //     res.status(500).json({ message: "Internal server error" });
    // }



    try {
        const { email, password } = req.body;

        const adminUser = await adminModal.findOne({ email });
        if (adminUser) {

            const isMatch = await bcryptjs.compare(password, adminUser.password);
            if (!isMatch) {
                return res.status(400).json({ message: "Invalid username or password" });
            }
            
            return res.status(200).json({
                message: "Admin Login successful",
                user: {
                    _id: adminUser._id,
                    name: adminUser.name,
                    email: adminUser.email,
                },
            });
        }

        const regularUser = await userModal.findOne({ email });
        if (!regularUser) {
            return res.status(400).json({ message: "Invalid username or password" });
        }

        const isUserMatch = await bcryptjs.compare(password, regularUser.password);
        if (!isUserMatch) {
            return res.status(400).json({ message: "Invalid username or password" });
        }

        if (regularUser.status !== "Active") {
            return res.status(403).send({ message: "User Not Active" });
        }

        return res.status(200).json({
            message: "User Login successful",
            user: {
                _id: regularUser._id,
                name: regularUser.name,
                email: regularUser.email,
            },
        });
    } catch (error) {
        console.log("Error: " + error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};
module.exports.login = login;

//  const signup = async(req, res) => {
//     try {
//         const { name, email, password } = req.body;

//         const user = await adminModal.findOne({ email:email });
//         if (user) {
//             return res.status(400).json({ message: "User already exists" });
//         }
//         const hashPassword = await bcryptjs.hash(password, 10);
//         const createdUser = new adminModal({
//             name: name,
//             email: email,
//             password: hashPassword,
//         });
//         await createdUser.save();
//         res.status(201).json({
//             message: "User created successfully",
//             user: {
//                 _id: createdUser._id,
//                 name: createdUser.name,
//                 email: createdUser.email,
//             },
//         });
//     } catch (error) {
//         console.log("Error: " + error.message);
//         res.status(500).json({ message: "Internal server error" });
//     }
// };

// module.exports.signup = signup;