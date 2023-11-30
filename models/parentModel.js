const mongoose = require('mongoose');

const parentSchema = new mongoose.Schema({
  
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' }, // Assuming 'User' is the name of the referenced model
    childNumber: { type: Number, required: true },
});

// If you want to create an index on userid for faster queries
parentSchema.index({ userid: 1 });

const Parent = mongoose.model('Parent', parentSchema);

module.exports = Parent;