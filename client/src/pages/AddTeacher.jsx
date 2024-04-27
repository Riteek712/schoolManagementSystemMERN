import { useForm } from 'react-hook-form';
import React, { useState } from 'react'; // Import useState and React

import axios from 'axios'; 

const AddTeacher = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    
    const onSubmit = async (formData) => {
        if (!formData.name || !formData.gender || !formData.dob || !formData.salary || !formData.contact) {
            return setErrorMessage('Please fill out all fields.');
        }
        try {
            setLoading(true);
            setErrorMessage(null);
            console.log(formData)
            const response = await axios.post('http://localhost:5000/api/teachers', formData);
            const data = response.data;
            if (data.success === false) {
                return setErrorMessage(data.message);
            }
            setLoading(false);
        } catch (error) {
            setErrorMessage(error.message);
            setLoading(false);
        }
    };

    return (
        <form className='addTeacher' onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label htmlFor='name'>Name</label>
                <input id='name' type='text' {...register('name', { required: true })} placeholder="Teacher's name.." />
                {errors.name && <span className="error">Name is required</span>}
            </div>
            <div>
                <label htmlFor="gender">Gender</label>
                <select id="gender" {...register('gender', { required: true })}>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Others</option>
                </select>
                {errors.gender && <span className="error">Gender is required</span>}
            </div>
            <div>
                <label htmlFor="dob">DOB:</label>
                <input type="date" id="dob" {...register('dob', { required: true })} />
                {errors.dob && <span className="error">DOB is required</span>}
            </div>
            <div>
                <label htmlFor="contact">Contact Number:</label>
                <input
                    type="tel"
                    id="contact"
                    {...register('contact', { required: true })}
                />
                {errors.contact && <span className="error">Contact number is required</span>}
            </div>
            <div>
                <label htmlFor="salary">Salary:</label>
                <input
                    type="number"
                    id="salary"
                    {...register('salary', { required: true })}
                />
                {errors.salary && <span className="error">Salary is required</span>}
            </div>
            {errorMessage && <span className="error">{errorMessage}</span>}
            <button type='submit' aria-label='Add Teacher' disabled={loading}>
                {loading ? 'Adding...' : 'Add'}
            </button>
        </form>
    );
};

export default AddTeacher;
