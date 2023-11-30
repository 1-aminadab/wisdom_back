const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    password: { type: String, required: true, unique:true },
    userType: { type: String, required: true },
    address: { type:String , required :true},
    gender: { type: String ,required:true},
    freeze: { type: Boolean },
});

// If you want to create an index on phoneNumber for faster queries
userSchema.index({ phoneNumber: 1 }, { unique: true });

const User = mongoose.model('User', userSchema);

module.exports = User;