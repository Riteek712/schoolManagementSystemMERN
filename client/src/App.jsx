import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import ViewTeachers from './pages/ViewTeachers';
import ViewStudents from './pages/ViewStudents';
import ViewClasses from './pages/ViewClasses';


const App = () => {
  return (
    <Router>
      <div className="mx-auto">
        <div className="container mx-auto mt-2 text-center">
          {/* <h1 className="text-3xl font-bold mb-8">Welcome to My School Management App</h1> */}
        

          <div className="flex justify-center mb-2 gap-4">
            <Link
              to="/teachers/view"
              className="flex-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border-b-8 border-blue-700 hover:border-blue-800 rounded"
            >
             <span>Teacher</span> 
            </Link>
            <Link
              to="/students/view"
              className="flex-1 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 border-b-8 border-green-700 hover:border-green-800 rounded"
              
            >
              Student
            </Link>
            <Link
              to="/classes/view"
              className="flex-1 bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 border-b-8 border-yellow-700 hover:border-yellow-800 rounded"
            >
              Classes
            </Link>
            {/* Add the Dashboard button */}
            {/* <Link
              to="/dashboard"
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-8 px-12 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
            >
              Dashboard
            </Link> */}
          </div>
        
          {/* Routes */}
          <Routes>
            
            <Route path="/teachers/view" element={<ViewTeachers />} />
            <Route path="/students/view" element={<ViewStudents />} />
            <Route path="/classes/view" element={<ViewClasses />} />
            {/* Add a route for the Dashboard component */}
            <Route path="/dashboard"  />
          </Routes>
        </div>
      </div>
    </Router>
  );
};


export default App;
