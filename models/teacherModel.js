const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
  
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' }, // Assuming 'User' is the name of the referenced model
    educationLevel: { type: String, required: true },
    rate: { type: Number },
    email: { type: String, required: true },
    workingDays: { type: String, required: true },
    selectedGrade: { type: String, required: true },
    birthDate: { type: Date, required: true },
    age: { type: Number, required: true },
    experience: { type: String, required: true },
});

// If you want to create an index on userid for faster queries
teacherSchema.index({ userid: 1 });

const Teacher = mongoose.model('Teacher', teacherSchema);

module.exports = Teacher;
