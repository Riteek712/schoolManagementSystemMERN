import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddTeacher from './AddTeacher'; // Import the AddTeacher component
import EditTeacher from './EditTeacher'

const ViewTeachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddTeacher, setShowAddTeacher] = useState(false); // State to toggle AddTeacher component
  const [showEditTeacher, setShowEditTeacher] = useState(false); // State to toggle EditTeacher component
  const [selectedTeacher, setSelectedTeacher] = useState(null); // State to store the selected teacher for editing



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

  const deleteTeacher = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/teacher/${id}`);
      fetchTeachers(); // Fetch classes again to refresh the list
    } catch (error) {
      console.error('Error deleting teacher:', error);
      setError('Error deleting teacher');
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, [teachers, showAddTeacher]);

  const handleAddTeacherClick = () => {
    setShowAddTeacher(true);
  };

  const handleAddTeacherSuccess = () => {
    setShowAddTeacher(false); // Hide the AddTeacher form
    fetchTeachers(); // Fetch teachers again to refresh the list
  };

  const handleEditTeacherClick = (teacher) => {
    setSelectedTeacher({ ...teacher });
    setShowEditTeacher(true);
  };

  const handleEditTeacherSuccess = () => {
    setShowEditTeacher(false); // Hide the EditTeacher form
    setSelectedTeacher(null); // Clear selected teacher data after successful edit
    fetchTeachers(); // Fetch teachers again to refresh the list
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Teachers:</h2>
      <button className='bg-blue-200 shadow-2xl mr-4 mt-4 mb-4' onClick={handleAddTeacherClick} >Add New</button>
      {showAddTeacher && <button className='bg-red-400' onClick={()=>setShowAddTeacher(false)}>Cancel</button>}
      {showAddTeacher && <AddTeacher onSuccess={handleAddTeacherSuccess}  />}
      <br/>
      {showEditTeacher &&  <button className='bg-red-400' onClick={()=>setShowEditTeacher(false)}>Cancel</button>} 
      {showEditTeacher && <EditTeacher onSuccess={handleEditTeacherSuccess} teacherData={selectedTeacher} />} 
      {teachers.length > 0 ? (
        <ul className='flex flex-wrap justify-evenly'>
          {teachers.map((teacher) => (
            <div className="max-w-sm p-6 bg-blue-100 border border-gray-200 rounded-lg shadow-2xl hover:shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px] mr-4 ml-4 mb-4 mt-4  'bg-gray-100 dark:border-gray-700">
              <li key={teacher.id}>
              <strong>ID:</strong> {teacher.id}<br />
              <strong>Name:</strong> {teacher.name}<br />
              <strong>Date of Birth:</strong> {teacher.dob}<br />
              <strong>Salary:</strong> {teacher.salary}<br />
              <strong>Gender:</strong> {teacher.gender}<br />
              <strong>Contact:</strong> {teacher.contact}<br />
              <strong>Assigned Class:</strong> {teacher.assignedClass ? teacher.assignedClass.name: "NA" }<br />
              <button className='bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded' onClick={() => deleteTeacher(teacher.id)}>Delete</button>
            <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded" onClick={() => { handleEditTeacherClick(teacher) }}>Edit</button>
            </li>
            </div>
            
          ))}
        </ul>
      ) : (
        <p>No teachers in the database.</p>
      )}

      {/* Pass onSuccess prop */}
    </div>
  );
};

export default ViewTeachers;
