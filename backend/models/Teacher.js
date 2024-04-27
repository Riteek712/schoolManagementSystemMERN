const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
  name: { type: String, required: true },
  gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
  dob: { type: Date },
  contact: { type: String },
  salary: { type: Number, required: true },
  assignedClass: { type: mongoose.Schema.Types.ObjectId, ref: 'Class' },
});

module.exports = mongoose.model('Teacher', teacherSchema);
