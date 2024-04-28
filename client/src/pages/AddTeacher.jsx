import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';

const AddTeacher = ({ onSuccess }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showForm, setShowForm] = useState(true); // State to control form visibility

  const onSubmit = async (formData) => {
    if (!formData.name || !formData.gender || !formData.dob || !formData.salary || !formData.contact) {
      return setErrorMessage('Please fill out all fields.');
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const response = await axios.post('http://localhost:5000/api/teachers', formData);
      const data = response.data;
      if (data.success === false) {
        return setErrorMessage(data.message);
      }
      setLoading(false);
      onSuccess(); // Notify parent component of successful addition
      setShowForm(false); // Hide the form after successful submission
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  return (
    <>
      {showForm && (
        <form className='bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4 w-1/4  mx-auto' onSubmit={handleSubmit(onSubmit)}>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='name'>Name</label>
            <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' id='name' type='text' {...register('name', { required: true })} placeholder="Teacher's name.." />
            {errors.name && <span className="error">Name is required</span>}
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="gender">Gender</label>
            <select className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' id="gender" {...register('gender', { required: true })}>
            <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Others">Others</option>
            </select>
            {errors.gender && <span className="error">Gender is required</span>}
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="dob">DOB:</label>
            <input
  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline black-calendar-icon"
  type="date"
  id="dob"
  {...register('dob', { required: true })}
/>
            {errors.dob && <span className="error">DOB is required</span>}
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="contact">Contact Number:</label>
            <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              type="tel"
              id="contact"
              {...register('contact', { required: true })}
            />
            {errors.contact && <span className="error">Contact number is required</span>}
          </div>
          <div className='mb-6'>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="salary">Salary:</label>
            <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              type="number"
              id="salary"
              {...register('salary', { required: true })}
            />
            {errors.salary && <span className="error">Salary is required</span>}
          </div>
          {errorMessage && <span className="error">{errorMessage}</span>}
          <button className='w-1/2' type='submit' aria-label='Add Teacher' disabled={loading}>
            {loading ? 'Adding...' : 'Add'}
          </button>
        </form>
      )}
    </>
  );
};

export default AddTeacher;
