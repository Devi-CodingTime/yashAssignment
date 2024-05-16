const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  name: {
     type: String, 
     required: true 
    },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  phoneNumber: { 
    type: String, 
    required: true 
  },
  devices: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'device' 
  }],
  username: {
     type: String, 
     required: true, 
     unique: true 
    },
  password: { 
    type: String, 
    required: true 
  },
  status: { 
    type: String, 
    enum: ['Active', 'Deactive'], 
    required: true 
  }
});

module.exports = mongoose.model('User', userSchema);
