const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
  dob: { type: Date },
  contact: { type: String },
  feesPaid: { type: Number },
  enrolledClass: { type: mongoose.Schema.Types.ObjectId, ref: 'Class' },
});

module.exports = mongoose.model('Student', studentSchema);
