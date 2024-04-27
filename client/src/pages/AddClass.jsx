import React, { useState } from 'react';
import axios from 'axios';

const AddClass = () => {
  const [formData, setFormData] = useState({
    name: '',
    year: '',
    studentFees: ''
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

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
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  return (
    <form className='addClass' onSubmit={handleSubmit}>
      <div>
        <label htmlFor='name'>Name</label>
        <input id='name' type='text' value={formData.name} onChange={handleChange} placeholder="Class name.." required />
      </div>
      <div>
        <label htmlFor='year'>Year</label>
        <input id='year' type='number' value={formData.year} onChange={handleChange} placeholder="Year.." required />
      </div>
      <div>
        <label htmlFor='studentFees'>Student Fees</label>
        <input id='studentFees' type='number' value={formData.studentFees} onChange={handleChange} placeholder="Student fees.." required />
      </div>
      {errorMessage && <span className="error">{errorMessage}</span>}
      <button type='submit' aria-label='Add Class' disabled={loading}>
        {loading ? 'Adding...' : 'Add'}
      </button>
    </form>
  );
};

export default AddClass;
