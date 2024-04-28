import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddStudent from './AddStudent';

const ViewStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddStudent, setShowAddStudent] = useState(false); // State to toggle AddTeacher component
  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/students');
      if (Array.isArray(response.data.students)) {
        const updatedStudents = response.data.students.map(student => ({
          ...student,
          id: student._id.toString()
        }));
        setStudents(updatedStudents);
      } else {
        console.error('Unexpected API response format:', response.data);
        setError('Unexpected API response format');
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching students:', error);
      setError('Error fetching students');
      setLoading(false);
    }
  };

  useEffect(() => {
   
  
    fetchStudents();
  }, []);
  const handleAddStudentClick = () => {
    setShowAddStudent(true);
  };

  const handleAddStudentSuccess = () => {
    setShowAddStudent(false); // Hide the AddTeacher form
    fetchStudents(); // Fetch teachers again to refresh the list
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Students:</h2>
      <button onClick={handleAddStudentClick} style={{ fontSize: '24px', padding: '10px' }}>+</button>
      <ul>
        {students.map((student) => (
          <li key={student.id}>
              <strong>Name:</strong> {student.name}<br />
              <strong>Date of Birth:</strong> {student.dob}<br />
              <strong>Class:</strong> {student.class}<br />
              <strong>Gender:</strong> {student.gender}<br />
              <strong>Contact:</strong> {student.contact}<br />
              <strong>Fees Paid:</strong> {student.feesPaid}<br />
          </li>
        ))}
      </ul>
      {showAddStudent && <AddStudent onSuccess={handleAddStudentSuccess} />} 
    </div>
  );
};

export default ViewStudents;
