import React, { useState } from 'react';
import axios from 'axios';

const AddStudent = ({onSuccess}) => {
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    dob: '',
    assignedClass: '',
    feesPaid: '',
    contact: ''
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showForm, setShowForm] = useState(true);
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
      setFormData({
        name: '',
        gender: '',
        dob: '',
        assignedClass: '',
        feesPaid: '',
        contact: ''
      }); // Clear form data after successful submission
      onSuccess(); // Call onSuccess prop provided by the parent component
      setShowForm(false);
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);      
    }
  };

  return (
    <>
    {showForm && (<form className='bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4 w-1/4  mx-auto' onSubmit={handleSubmit}>
      <div className='mb-4' >
        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='name'>Name</label>
        <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' id='name' type='text' value={formData.name} onChange={handleChange} placeholder="Student name.." required />
      </div>
      <div className='mb-4'>
        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='gender'>Gender</label>
        <select className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' id='gender' value={formData.gender} onChange={handleChange} required>
          <option value="">Select gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div className='mb-4'>
        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='dob'>Date of Birth</label>
        <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'  id='dob' type='date' value={formData.dob} onChange={handleChange} required />
      </div>
      <div className='mb-4' >
        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='assignedClass'>Assigned Class</label>
        <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' id='assignedClass' type='text' value={formData.assignedClass} onChange={handleChange} placeholder="assignedClass"  />
      </div>
      <div className='mb-4' >
        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='feesPaid'>Fees Paid</label>
        <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' id='feesPaid' type='number' value={formData.feesPaid} onChange={handleChange} placeholder="ex: 1000"  />
      </div>
      <div className='mb-6'>
        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='contact'>Contact</label>
        <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' id='contact' type='text' value={formData.contact} onChange={handleChange} placeholder="Contact number.." required />
      </div>
      {errorMessage && <span className="error">{errorMessage}</span>}
      <button className='w-1/2' type='submit' aria-label='Add Student' disabled={loading}>
        {loading ? 'Adding...' : 'Add'}
      </button>
    </form>)}
    </>
    
  );
};

export default AddStudent;
