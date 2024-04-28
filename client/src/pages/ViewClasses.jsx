import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddClass from './AddClass';
import EditClass from './EditClass';
import ViewChart from './ViewChart';

const ViewClasses = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddClass, setShowAddClass] = useState(false);
  const [showEditClass, setShowEditClass] = useState(false);
  const [showChart, setShowChart] = useState(true);
  
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
  const handleShowChart = () => {
    setShowChart(true);
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
      {showAddClass && <button className='bg-red-400' onClick={()=>setShowAddClass(false)}>Cancel</button>}
      {showAddClass && <AddClass onSuccess={handleAddClassSuccess} />}
      {showEditClass && <button className='bg-red-400' onClick={()=>setShowEditClass(false)}>Cancel</button>}
      {showEditClass && <EditClass onSuccess={handleEditClassSuccess} classData={classEditData} />}
      <div>
        <ul className='flex flex-wrap justify-evenly'>
          {classes.map((cls) => (
            

            <div className="flex justify-items-center  p-6 bg-yellow-100 border border-gray-200 rounded-lg shadow dark:border-gray-700" key={cls.id}>
              
              {showChart && <ViewChart classID={cls.id} />}
              <li>
                <strong>ID:</strong> {cls.id}<br />
                <strong>Name:</strong> {cls.name}<br />
                <strong>Year:</strong> {cls.year}<br />
                <strong>Fees:</strong> {cls.studentFees}<br />
                {/* <strong>Number of students enrolled:</strong> {cls.students.length}<br /> */}
                <button className='bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded' onClick={() => deleteClass(cls.id)}>Delete</button>
                <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded" onClick={() => { editClass(cls) }}>Edit</button>
                {/* <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded" onClick={() => handleShowChart()}>View Chart</button> */}
               
              </li>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ViewClasses;
