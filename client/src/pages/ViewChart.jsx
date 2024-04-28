import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PieChart } from '@mui/x-charts/PieChart';

const ViewChart = ({ classID }) => {
    const [student, setStudentsData] = useState({});

    const getStudentOfClassInfo = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/students?classID=${classID}`);
          const students = response.data.students;
          let maleCount = 0;
          let femaleCount = 0;
          let otherCount = 0;
          students.forEach(student => {
            if (student.gender === "Male") {
              maleCount++;
            } else if (student.gender === "Female") {
              femaleCount++;
            } else {
              otherCount++;
            }
          });
          setStudentsData({
            "male": maleCount,
            "female": femaleCount,
            "others": otherCount
          });
        //   return student;
          // console.log(students)
        } catch (error) {
          console.error('Error fetching student data:', error);
        }
      };
      useEffect(() => {
          getStudentOfClassInfo();
      }, []);
    
    return (
        <div>
            <PieChart
                series={[
                    {
                        data: [
                            { id: 0, value: student.male, label: 'Male' },
                            { id: 1, value: student.female, label: 'Female' },
                            { id: 2, value: student.others, label: 'Others' },
                        ],
                    },
                ]}
                width={400}
                height={200}
            />
        </div>
    );
};

export default ViewChart;
