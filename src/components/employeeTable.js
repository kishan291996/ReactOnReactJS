import React from 'react';

const EmployeeTable = ({ employees }) => {
  return (
    <div className="bg-white p-4 border border-gray-200 rounded">
      <h3 className="text-xl font-bold mb-4">Employees</h3>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Contact No</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Skill Set</th>
            <th className="py-2 px-4 border-b">Assigned Project</th>
            <th className="py-2 px-4 border-b">Manager</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee, index) => (
            <tr key={index}>
              <td className="py-2 px-4 border-b">{employee.name}</td>
              <td className="py-2 px-4 border-b">{employee.contact}</td>
              <td className="py-2 px-4 border-b">{employee.email}</td>
              <td className="py-2 px-4 border-b">{employee.skills}</td>
              <td className="py-2 px-4 border-b">{employee.assignedProject}</td>
              <td className="py-2 px-4 border-b">{employee.manager}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;
