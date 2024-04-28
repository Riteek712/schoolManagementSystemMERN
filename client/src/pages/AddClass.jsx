import React, { useState } from 'react';
import axios from 'axios';

const AddClass = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    year: '',
    studentFees: ''
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showForm, setShowForm] = useState(true); // State to control form visibility

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.year || !formData.studentFees) {
      return setErrorMessage('Please fill out all fields.');
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const response = await axios.post('http://localhost:5000/api/classes', formData);
      const data = response.data;
      if (data.success === false) {
        return setErrorMessage(data.message);
      }
      setLoading(false);
      setFormData({ name: '', year: '', studentFees: '' }); // Clear form data after successful submission
      onSuccess(); // Call onSuccess prop provided by the parent component
      setShowForm(false); // Hide the form after successful submission
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  return (
    <>
      {showForm && (
        <form className='bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4 w-1/4  mx-auto' onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='name'>Name</label>
            <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' id='name' type='text' value={formData.name} onChange={handleChange} placeholder="Class name.." required />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='year'>Year</label>
            <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' id='year' type='number' value={formData.year} onChange={handleChange} placeholder="Year.." required />
          </div>
          <div className='mb-6'>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='studentFees'>Student Fees</label>
            <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' id='studentFees' type='number' value={formData.studentFees} onChange={handleChange} placeholder="Student fees.." required />
          </div>
          {errorMessage && <span className="error">{errorMessage}</span>}
          <button className='w-1/2' type='submit' aria-label='Add Class' disabled={loading}>
            {loading ? 'Adding...' : 'Add'}
          </button>
        </form>
      )}
    </>
  );
};

export default AddClass;
