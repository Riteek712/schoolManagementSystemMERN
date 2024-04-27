import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewClasses = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/classes');
        if (Array.isArray(response.data.classes)) {
          // Convert ObjectId to string for each class
          const updatedClasses = response.data.classes.map(cls => ({
            ...cls,
            id: cls._id.toString() // Assuming _id is the ObjectId field
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
  
    fetchClasses();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Classes:</h2>
      <ul>
        {classes.map((cls) => (
          <li key={cls.id}>{cls.id} {cls.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ViewClasses;
