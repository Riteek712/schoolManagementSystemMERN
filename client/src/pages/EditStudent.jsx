import React, { useState } from 'react';
import axios from 'axios';

const EditStudent = ({ onSuccess, studentData }) => {
  const studentId = studentData._id;
//   alert(studentId)
  const [editData, setEditData] = useState({
    name: studentData.name || '',
    gender: studentData.gender || '',
    dob: studentData.dob ? new Date(studentData.dob).toISOString().slice(0, 10) : '', // Convert date to string format
    feesPaid: studentData.feesPaid || '',
    enrolledClass: studentData.enrolledClass ? studentData.enrolledClass._id : ''
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showForm, setShowForm] = useState(true);

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!editData.name || !editData.gender || !editData.dob || !editData.feesPaid) {
      return setErrorMessage('Please fill out all fields.');
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const response = await axios.put(`http://localhost:5000/api/students/${studentId}`, editData);
      const data = response.data;
      if (!response) {
        throw new Error(data.message || 'Update failed.');
      }
      setLoading(false);
      setEditData({ name: '', gender: '', dob: '', feesPaid: '', enrolledClass: '' });
      onSuccess();
      setShowForm(false);
    } catch (error) {
      console.error('Error updating student:', error);
      setErrorMessage(error.message || 'An error occurred. Please try again.');
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
              value={editData.name}
              onChange={handleChange}
              placeholder='Student name..'
              required
            />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='gender'>
              Gender
            </label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='gender'
              type='text'
              value={editData.gender}
              onChange={handleChange}
              placeholder='Student gender..'
              required
            />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='dob'>
              Date of Birth
            </label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='dob'
              type='date'
              value={editData.dob}
              onChange={handleChange}
              placeholder='Student DOB..'
              required
            />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='enrolledClass'>
              Enrolled Class Id
            </label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='enrolledClass'
              type='string'
              value={editData.enrolledClass}
              onChange={handleChange}
              placeholder='class ID'
              
            />
          </div>
          <div className='mb-6'>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='feesPaid'>
              Fees Paid
            </label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='feesPaid'
              type='number'
              value={editData.feesPaid}
              onChange={handleChange}
              placeholder='Fees paid..'
              
            />
          </div>
          {errorMessage && <span className='error'>{errorMessage}</span>}
          <button className='w-1/2' type='submit' aria-label='Update Student' disabled={loading}>
            {loading ? 'Updating...' : 'Update'}
          </button>
        </form>
      )}
    </>
  );
};

export default EditStudent;
