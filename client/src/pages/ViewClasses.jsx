import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddClass from './AddClass'; // Import the AddClass component

const ViewClasses = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddClass, setShowAddClass] = useState(false); // State to toggle AddClass component
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
  useEffect(() => {
    fetchClasses();
  }, [classes]);

  const handleAddClassClick = () => {
    setShowAddClass(true);
  };

  const handleAddClassSuccess = () => {
    setShowAddClass(false); // Hide the AddClass form
    fetchClasses(); // Fetch classes again to refresh the list
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Classes:</h2>
      <button onClick={handleAddClassClick} style={{ fontSize: '24px', padding: '10px' }}>+</button>
      <ul>
        {classes.map((cls) => (
          <li key={cls.id}>
          
              <strong>Name:</strong> {cls.name}<br />
              <strong>Year:</strong> {cls.year}<br />
              <strong>Fees:</strong> {cls.fees}<br />
          
          </li>
        ))}
      </ul>

      {showAddClass && <AddClass onSuccess={handleAddClassSuccess} />} {/* Pass onSuccess prop */}
    </div>
  );
};

export default ViewClasses;
