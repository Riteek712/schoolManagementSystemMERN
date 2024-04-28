import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddClass from './AddClass';
import EditClass from './EditClass';

const ViewClasses = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddClass, setShowAddClass] = useState(false);
  const [showEditClass, setShowEditClass] = useState(false);
  const [classEditData, setClassEditData] = useState(null); // State for class edit data

  const fetchClasses = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/classes');
      if (Array.isArray(response.data.classes)) {
        const updatedClasses = response.data.classes.map(cls => ({
          ...cls,
          id: cls._id.toString()
        }));
        setClasses(updatedClasses);
      } else {
        console.error('Unexpected API response format:', response.data);
        setError('Unexpected API response format');
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching classes:', error);
      setError('Error fetching classes');
      setLoading(false);
    }
  };

  const editClass = (cls) => {
    setClassEditData({ ...cls });
    setShowEditClass(true);
  };

  const deleteClass = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/classes/${id}`);
      fetchClasses(); // Fetch classes again to refresh the list
    } catch (error) {
      console.error('Error deleting class:', error);
      setError('Error deleting class');
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []); // Empty dependency array to run effect only once on mount

  const handleAddClassClick = () => {
    setShowAddClass(true);
  };

  const handleAddClassSuccess = () => {
    setShowAddClass(false);
    fetchClasses();
  };

  const handleEditClassSuccess = () => {
    setShowEditClass(false);
    setClassEditData(null); // Clear edit data after successful edit
    fetchClasses();
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Classes:</h2>
      <button onClick={handleAddClassClick} style={{ fontSize: '24px', padding: '10px' }}>+</button>
      {showAddClass && <AddClass onSuccess={handleAddClassSuccess} />}
      {showEditClass && <EditClass onSuccess={handleEditClassSuccess} classData={classEditData} />}
      <div>
        <ul className='flex'>
          {classes.map((cls) => (
            <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow bg-gray-100 dark:border-gray-700" key={cls.id}>
              <li>
                <strong>ID:</strong> {cls.id}<br />
                <strong>Name:</strong> {cls.name}<br />
                <strong>Year:</strong> {cls.year}<br />
                <strong>Fees:</strong> {cls.studentFees}<br />
                <strong>Number of students enrolled:</strong> {cls.students.length}<br />
                <button className='bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded' onClick={() => deleteClass(cls.id)}>-</button>
                <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded" onClick={() => { editClass(cls) }}>edit</button>
              </li>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ViewClasses;
