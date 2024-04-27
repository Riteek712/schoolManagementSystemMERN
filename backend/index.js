const express = require('express');
const classRoutes = require('./routes/classRoutes');
const teacherRoutes = require('./routes/teacherRoutes');
const studentRoutes = require('./routes/studentRoutes');
const cors = require('cors');
const { connectToMongoDB } = require('./config');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectToMongoDB('mongodb://127.0.0.1:27017/student_management_db')

// Routes
app.use('/api/classes', classRoutes);
app.use('/api/teachers', teacherRoutes);
app.use('/api/students', studentRoutes);

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
