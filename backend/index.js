const mongoose = require('mongoose');
const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

const URI = 'mongodb+srv://devipurnima26899:aV6BPh6w4NR3wQwt@admin-db.jflgkeq.mongodb.net/'||'mongodb://127.0.0.1:27017/admin-db';

// connect to mongoDB
try {
    mongoose.connect(URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log("Connected to mongoDB");
} catch (error) {
    console.log("Error: ", error);
}


const adminRoute = require('./routes/adminRoutes.js');
const userRoute = require('./routes/userRoutes.js');
const deviceRoute = require('./routes/deviceRoutes.js');

// defining routes
app.use("/adminApi", adminRoute);
app.use("/userApi", userRoute);
app.use("/deviceApi", deviceRoute);


app.listen(5000,()=>{
    console.log("server is running on port 5000");
    console.log("Connection successfull");
  });



// aV6BPh6w4NR3wQwt
// devipurnima26899
//   mongodb+srv://devipurnima26899:aV6BPh6w4NR3wQwt@admin-db.jflgkeq.mongodb.net/
