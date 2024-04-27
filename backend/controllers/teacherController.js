const { validationResult } = require('express-validator');
const Teacher = require('../models/Teacher');

// Get all teachers with pagination
const getAllTeachers = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skipIndex = (page - 1) * limit;

  const { filterByName, sortBy } = req.query;
  const filter = filterByName ? { name: { $regex: filterByName, $options: 'i' } } : {};
  const sortOptions = sortBy ? { [sortBy]: 1 } : {};

  try {
    const teachers = await Teacher.find(filter)
      .populate('assignedClass')
      .limit(limit)
      .skip(skipIndex)
      .sort(sortOptions);

    const totalCount = await Teacher.countDocuments(filter);

    res.json({
      teachers,
      currentPage: page,
      totalPages: Math.ceil(totalCount / limit),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get teacher by ID
const getTeacherById = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id).populate('assignedClass');
    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }
    res.json(teacher);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new teacher with form validation
const createTeacher = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const teacher = new Teacher(req.body);
  try {
    console.log("teacher")
    console.log(teacher)
    const savedTeacher = await teacher.save();
    res.status(201).json(savedTeacher);
  } catch (err) {
    console.log(err.message)
    res.status(400).json({ message: err.message });
  }
};

// Update a teacher
const updateTeacher = async (req, res) => {
  try {
    const updatedTeacher = await Teacher.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedTeacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }
    res.json(updatedTeacher);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a teacher
const deleteTeacher = async (req, res) => {
  try {
    const deletedTeacher = await Teacher.findByIdAndDelete(req.params.id);
    if (!deletedTeacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }
    res.json({ message: 'Teacher deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getAllTeachers, getTeacherById, createTeacher, updateTeacher, deleteTeacher };
