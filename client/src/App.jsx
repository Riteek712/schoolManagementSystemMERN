import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link,  Navigate } from 'react-router-dom';
import Info from './pages/Info';
import ViewTeachers from './pages/ViewTeachers';
import ViewStudents from './pages/ViewStudents';
import ViewClasses from './pages/ViewClasses';


const App = () => {
  return (
    <Router>
      <div className="mx-auto">
        <div className="container mx-auto mt-2 text-center">
          {/* <h1 className="text-3xl font-bold mb-8">Welcome to My School Management App</h1> */}
        

          <div className="flex mr-2 ml-2 justify-center mb-2 gap-4">
          <Link
  to="/dashboard"
  className="flex-1 bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 border-b-8 border-purple-700 hover:border-purple-800 rounded"
>
  Info
</Link>
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
            
          </div>
        
          {/* {/* Routes */}
          <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/teachers/view" element={<ViewTeachers />} />
            <Route path="/students/view" element={<ViewStudents />} />
            <Route path="/classes/view" element={<ViewClasses />} />
            {/* Add a route for the Dashboard component */}
            <Route path="/dashboard"  element={<Info />}/>
          </Routes>
        </div>
      </div>
    </Router>
  );
};


export default App;
