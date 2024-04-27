import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddTeacher from './AddTeacher'; // Import the AddTeacher component

const ViewTeachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddTeacher, setShowAddTeacher] = useState(false); // State to toggle AddTeacher component

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/teachers');
        if (Array.isArray(response.data.teachers)) {
          const updatedTeachers = response.data.teachers.map(teacher => ({
            ...teacher,
            id: teacher._id.toString()
          }));
          setTeachers(updatedTeachers);
        } else {
          console.error('Unexpected API response format:', response.data);
          setError('Unexpected API response format');
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching teachers:', error);
        setError('Error fetching teachers');
        setLoading(false);
      }
    };
  
    fetchTeachers();
  }, []);

  const handleAddTeacherClick = () => {
    setShowAddTeacher(true);
  };

  const handleAddTeacherSuccess = () => {
    setShowAddTeacher(false); // Hide the AddTeacher form
    fetchTeachers(); // Fetch teachers again to refresh the list
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Teachers:</h2>
      <button onClick={handleAddTeacherClick} style={{ fontSize: '24px', padding: '10px' }}>+</button>
      {teachers.length > 0 ? (
        <ul>
          {teachers.map((teacher) => (
            <li key={teacher.id}>
              <strong>Name:</strong> {teacher.name}<br />
              <strong>Date of Birth:</strong> {teacher.dob}<br />
              <strong>Salary:</strong> {teacher.salary}<br />
              <strong>Gender:</strong> {teacher.gender}<br />
              <strong>Contact:</strong> {teacher.contact}<br />
            </li>
          ))}
        </ul>
      ) : (
        <p>No teachers in the database.</p>
      )}

      {showAddTeacher && <AddTeacher onSuccess={handleAddTeacherSuccess} />} {/* Pass onSuccess prop */}
    </div>
  );
};

export default ViewTeachers;
