import React, { useState, useEffect } from 'react';
import EmployeeForm from '../components/employeeForm';
import EmployeeTable from '../components/employeeTable';
import { fetchEmployees } from '../components/employeeService';

const MainComponent = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const getEmployees = async () => {
      try {
        const data = await fetchEmployees();
        setEmployees(data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };
    getEmployees();
  }, []);

  const handleAddEmployee = (newEmployee) => {
    setEmployees([...employees, { id: employees.length + 1, ...newEmployee }]);
  };

  return (
    <div className="container mx-auto p-4">
      <EmployeeForm onAddEmployee={handleAddEmployee} />
      <EmployeeTable employees={employees} />
    </div>
  );
};

export default MainComponent;
