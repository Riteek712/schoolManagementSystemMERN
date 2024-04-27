import React, { useState } from 'react';
import axios from 'axios';

const AddStudent = () => {
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    dob: '',
    contact: ''
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.gender || !formData.dob || !formData.contact) {
      return setErrorMessage('Please fill out all fields.');
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const response = await axios.post('http://localhost:5000/api/students', formData);
      const data = response.data;
      if (data.success === false) {
        return setErrorMessage(data.message);
      }
      setLoading(false);
      setFormData({ name: '', gender: '', dob: '', contact: '' }); // Clear form data after successful submission
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  return (
    <form className='addStudent' onSubmit={handleSubmit}>
      <div>
        <label htmlFor='name'>Name</label>
        <input id='name' type='text' value={formData.name} onChange={handleChange} placeholder="Student name.." required />
      </div>
      <div>
        <label htmlFor='gender'>Gender</label>
        <select id='gender' value={formData.gender} onChange={handleChange} required>
          <option value="">Select gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div>
        <label htmlFor='dob'>Date of Birth</label>
        <input id='dob' type='date' value={formData.dob} onChange={handleChange} required />
      </div>
      <div>
        <label htmlFor='contact'>Contact</label>
        <input id='contact' type='text' value={formData.contact} onChange={handleChange} placeholder="Contact number.." required />
      </div>
      {errorMessage && <span className="error">{errorMessage}</span>}
      <button type='submit' aria-label='Add Student' disabled={loading}>
        {loading ? 'Adding...' : 'Add'}
      </button>
    </form>
  );
};

export default AddStudent;
