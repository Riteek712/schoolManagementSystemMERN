import React, { useState } from 'react';
import { DynamicForm, DataTable } from './DynamicForm'; // Assuming the file name is DynamicForm.jsx

const Dashboard = () => {
  const [formData, setFormData] = useState(null);
  const [tableData, setTableData] = useState([]);

  // Dummy data for demonstration purposes
  const fields = [
    { label: 'Name', type: 'text', name: 'name' },
    { label: 'Email', type: 'email', name: 'email' },
    { label: 'Age', type: 'number', name: 'age' },
  ];

  const handleSubmit = (data) => {
    setFormData(data);
    setTableData((prevData) => [...prevData, data]);
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <h2>Form</h2>
      <DynamicForm fields={fields} onSubmit={handleSubmit} />
      {formData && (
        <div>
          <h3>Form Data:</h3>
          <pre>{JSON.stringify(formData, null, 2)}</pre>
        </div>
      )}
      <h2>Table</h2>
      <DataTable data={tableData} columns={['name', 'email', 'age']} />
    </div>
  );
};

export default Dashboard;
