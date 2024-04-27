import React from 'react';

// Reusable Dynamic Form Component
const DynamicForm = ({ fields, onSubmit }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      {fields.map((field) => (
        <div key={field.name}>
          <label>{field.label}</label>
          <input type={field.type} name={field.name} />
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
};

// Reusable Data Table Component
const DataTable = ({ data, columns }) => {
  return (
    <table>
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col}>{col}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            {columns.map((col) => (
              <td key={`${col}-${index}`}>{item[col]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export { DynamicForm, DataTable };
