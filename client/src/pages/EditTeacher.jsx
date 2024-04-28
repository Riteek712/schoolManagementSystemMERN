import React, { useState } from 'react';
import axios from 'axios';

const EditTeacher = ({ onSuccess, teacherData }) => {
  const teacherId = teacherData._id;

  const [editData, setEditData] = useState({
    name: teacherData.name || '',
    gender: teacherData.gender || '',
    dob: teacherData.dob ? new Date(teacherData.dob).toISOString().slice(0, 10) : '',
    contact: teacherData.contact || '',
    salary: teacherData.salary || '',
    assignedClass: teacherData.assignedClass ? teacherData.assignedClass._id : ''
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showForm, setShowForm] = useState(true);

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!editData.name || !editData.gender || !editData.dob || !editData.contact || !editData.salary) {
      return setErrorMessage('Please fill out all fields.');
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const response = await axios.put(`http://localhost:5000/api/teachers/${teacherId}`, editData);
      const data = response.data;
      if (!response) {
        throw new Error(data.message || 'Update failed.');
      }
      setLoading(false);
      setEditData({ name: '', gender: '', dob: '', contact: '', salary: '', assignedClass: '' });
      onSuccess();
      setShowForm(false);
    } catch (error) {
      console.error('Error updating teacher:', error);
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
              placeholder='Teacher name..'
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
              placeholder='Teacher gender..'
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
              placeholder='Teacher DOB..'
              required
            />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='contact'>
              Contact
            </label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='contact'
              type='tel'
              value={editData.contact}
              onChange={handleChange}
              placeholder='Teacher contact number..'
              required
            />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='salary'>
              Salary
            </label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='salary'
              type='number'
              value={editData.salary}
              onChange={handleChange}
              placeholder='Teacher salary..'
              required
            />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='assignedClass'>
              Assigned Class Id
            </label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='assignedClass'
              type='string'
              value={editData.assignedClass}
              onChange={handleChange}
              placeholder='Assigned Class Id'
             
            />
          </div>
          {errorMessage && <span className='error'>{errorMessage}</span>}
          <button className='w-1/2' type='submit' aria-label='Update Teacher' disabled={loading}>
            {loading ? 'Updating...' : 'Update'}
          </button>
        </form>
      )}
    </>
  );
};

export default EditTeacher;
