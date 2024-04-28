import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditClass = ({ onSuccess, classData }) => {
    
  const classId = classData.id;
//   alert(`object id: ${classId}`)
  const [editData, setEditData] = useState({}); // Initialize editData state

  // Update editData whenever classData changes
  useEffect(() => {
    // Ensure classData exists and is not empty before setting editData
    if (classData && Object.keys(classData).length > 0) {
      setEditData({
        name: classData.name || '',
        year: classData.year || '',
        studentFees: classData.studentFees || '',
      });
    }
  }, []);

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showForm, setShowForm] = useState(true);

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!editData.name || !editData.year || !editData.studentFees) {
      return setErrorMessage('Please fill out all fields.');
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const response = await axios.put(`http://localhost:5000/api/classes/${classId}`, editData);
      
      if (!response) {
        return setErrorMessage(data.message || 'Update failed. Please try again.');
      }
      setLoading(false);
      setEditData({ name: '', year: '', studentFees: '' });
      onSuccess();
      setShowForm(false);
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'An error occurred. Please try again.');
      setLoading(false);
    }
  };

  return (
    <>
      {showForm && (
        <form className='bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4 w-1/4 mx-auto' onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='name'>
              Name
            </label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='name'
              type='text'
              value={editData.name || ''}
              onChange={handleChange}
              placeholder='Class name..'
              required
            />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='year'>
              Year
            </label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='year'
              type='number'
              value={editData.year || ''}
              onChange={handleChange}
              placeholder='Year..'
              required
            />
          </div>
          <div className='mb-6'>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='studentFees'>
              Student Fees
            </label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='studentFees'
              type='number'
              value={editData.studentFees || ''}
              onChange={handleChange}
              placeholder='Student fees..'
              required
            />
          </div>
          {errorMessage && <span className='error'>{errorMessage}</span>}
          <button className='w-1/2' type='submit' aria-label='Update Class' disabled={loading}>
            {loading ? 'Updating...' : 'Update'}
          </button>
          {/* <button onClick={()=>setShowForm(false)}>Calcel</button> */}
        </form>
      )}
    </>
  );
};

export default EditClass;
