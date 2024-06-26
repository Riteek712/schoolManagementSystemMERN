import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddStudent from './AddStudent';
import EditStudent from './EditStudent';

const ViewStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddStudent, setShowAddStudent] = useState(false); // State to toggle AddTeacher component
  const [showEditStudent, setShowEditStudent] = useState(false); // State to toggle EditStudent component
  const [selectedStudent, setSelectedStudent] = useState(null);
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

  const deleteStudent = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/students/${id}`);
      fetchStudents(); // Fetch classes again to refresh the list
    } catch (error) {
      console.error('Error deleting student:', error);
      setError('Error deleting student');
    }
  };

  useEffect(() => {
   
  
    fetchStudents();
  }, [students]);
  const handleAddStudentClick = () => {
    setShowAddStudent(true);
  };

  const handleAddStudentSuccess = () => {
    setShowAddStudent(false); // Hide the AddTeacher form
    fetchStudents(); // Fetch teachers again to refresh the list
  };
  const handleEditStudentClick = (student) => {
    setSelectedStudent({ ...student });
    setShowEditStudent(true);
  };

  const handleEditStudentSuccess = () => {
    setShowEditStudent(false); // Hide the EditStudent form
    setSelectedStudent(null); // Clear selected student data after successful edit
    fetchStudents(); // Fetch students again to refresh the list
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Students:</h2>
      <button className='bg-green-200 shadow-2xl mr-4 mt-4 mb-4' onClick={handleAddStudentClick}>Add New</button>
      {showAddStudent && <button className='bg-red-400' onClick={()=>setShowAddStudent(false)}>Cancel</button>}
      {showAddStudent && <AddStudent onSuccess={handleAddStudentSuccess} />}
      {showEditStudent && <button className='bg-red-400' onClick={()=>setShowEditStudent(false)}>Cancel</button>} 
      {showEditStudent && <EditStudent onSuccess={handleEditStudentSuccess} studentData={selectedStudent} />} 
      <ul className='flex flex-wrap justify-evenly' >
        {students.map((student) => (
          <div className="max-w-sm p-6 mr-4 ml-4 mb-4 mt-4 bg-green-100 border border-gray-200 rounded-lg shadow-2xl hover:shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px]  'bg-gray-100 dark:border-gray-700">
            <li key={student.id}>
                <strong>ID:</strong> {student.id}<br />
                <strong>Name:</strong> {student.name}<br />
                <strong>Date of Birth:</strong> {student.dob}<br />
                <strong>Class:</strong> {student.enrolledClass ? student.enrolledClass.name :"NA" }<br />
                <strong>Gender:</strong> {student.gender}<br />
                <strong>Contact:</strong> {student.contact}<br />
                <strong>Fees Paid:</strong> {student.feesPaid ? student.feesPaid: "NA"}<br />
                <button className='bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded' onClick={() => deleteStudent(student.id)}>Delete</button>
            <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"  onClick={() => { handleEditStudentClick(student) }}>Edit</button>
            </li>
          </div>
        ))}
      </ul>
     
    </div>
  );
};

export default ViewStudents;
