import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchProjects } from '../components/projectSevices';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { FiFileText, FiArrowRight } from 'react-icons/fi';

const ProjectDetails = () => {
  const [records, setRecords] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getProjects = async () => {
      const data = await fetchProjects();
      setRecords(data);
    };
    getProjects();
  }, []);

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(records);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Projects');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(data, 'Projects.xlsx');
  };

  const handleRowClick = (record) => {
    navigate('/task-status', { state: { record } });
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Project Details</h2>
        <FiFileText onClick={exportToExcel} size={20} className="cursor-pointer" />
      </div>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Type</th>
            <th className="py-2 px-4 border-b">Frontend</th>
            <th className="py-2 px-4 border-b">Backend</th>
            <th className="py-2 px-4 border-b">Database</th>
            <th className="py-2 px-4 border-b">Developed By</th>
            <th className="py-2 px-4 border-b">Action</th>
          </tr>
        </thead>
        <tbody>
          {records.map(record => (
            <tr key={record.id}>
              <td className="py-2 px-4 border-b">{record.id}</td>
              <td className="py-2 px-4 border-b">{record.name}</td>
              <td className="py-2 px-4 border-b">{record.type}</td>
              <td className="py-2 px-4 border-b">{record.frontend}</td>
              <td className="py-2 px-4 border-b">{record.backend}</td>
              <td className="py-2 px-4 border-b">{record.database}</td>
              <td className="py-2 px-4 border-b">{record.developedBy}</td>
              <td className="py-2 px-4 border-b text-center">
                <FiArrowRight 
                  size={20} 
                  className="cursor-pointer" 
                  onClick={() => handleRowClick(record)} 
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectDetails;
