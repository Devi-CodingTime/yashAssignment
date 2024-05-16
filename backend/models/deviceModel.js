const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
   },
  type: { 
    type: String, 
    enum: ['Web', 'Android', 'iOS'], 
    required: true 
   },
  status: { 
    type: String, 
    enum: ['Active', 'Deactive'], 
    required: true 
  }
});

module.exports = mongoose.model('device', deviceSchema);
