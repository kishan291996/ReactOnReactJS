import React, { useState, useEffect } from 'react';
import { FiMenu, FiX, FiEdit, FiTrash2 } from 'react-icons/fi';
import { fetchProjects, updateProjectDetails, deleteProject } from '../components/projectSevices';

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [records, setRecords] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const getProjects = async () => {
      const data = await fetchProjects();
      setRecords(data);
      if (data.length > 0) {
        setSelectedRecord(data[0]);
      }
    };
    getProjects();
  }, []);

  const handleRecordClick = (record) => {
    setSelectedRecord(record);
    setIsEditing(false); // Reset editing state
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleDeleteClick = async (id) => {
    await deleteProject(id);
    const updatedRecords = records.filter(record => record.id !== id);
    setRecords(updatedRecords);
    if (updatedRecords.length > 0) {
      setSelectedRecord(updatedRecords[0]);
    } else {
      setSelectedRecord(null);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedRecord({ ...selectedRecord, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedRecords = records.map(record =>
      record.id === selectedRecord.id ? selectedRecord : record
    );
    setRecords(updatedRecords);
    setIsEditing(false);

    // Optionally, update the project details in the backend
    await updateProjectDetails(selectedRecord);
  };

  return (
    <div className="h-screen flex overflow-hidden">
      {/* Toggle Icon */}
      <div 
        onClick={toggleMenu} 
        className="p-2 bg-gray-800 text-white absolute z-10 top-4 left-4 cursor-pointer focus:outline-none"
      >
        {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </div>

      {/* Left Side Menu */}
      <aside className={`transition-transform transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} w-64 bg-gray-800 text-white flex-shrink-0`}>
        <div className="p-4">
          <h1 className="text-2xl font-bold">Records</h1>
          <nav className="mt-4">
            {records.map((record) => (
              <div key={record.id}>
                <a 
                  href="#" 
                  className={`block py-2 px-4 ${record.id === selectedRecord?.id ? 'bg-blue-200' : 'hover:bg-gray-700'} cursor-pointer`}
                  onClick={() => handleRecordClick(record)}
                >
                  {record.name}
                </a>
                <hr className="border-gray-700" />
              </div>
            ))}
          </nav>
        </div>
      </aside>

      {/* Right Side Details */}
      <main 
        className="flex-grow bg-gray-100 p-6 overflow-auto transition-all duration-300"
      >
        {selectedRecord ? (
          <div>
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold mb-4">Details for {selectedRecord.name}</h2>
              <div className="flex space-x-4">
                <button onClick={handleEditClick} className="text-gray-700 hover:text-blue-700">
                  <FiEdit size={24} />
                </button>
                <button onClick={() => handleDeleteClick(selectedRecord.id)} className="text-gray-700 hover:text-red-700">
                  <FiTrash2 size={24} />
                </button>
              </div>
            </div>
            {isEditing ? (
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700">Project Name</label>
                  <input
                    type="text"
                    name="name"
                    value={selectedRecord.name}
                    onChange={handleChange}
                    className="mt-1 p-2 border border-gray-300 w-full"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Project Type</label>
                  <input
                    type="text"
                    name="type"
                    value={selectedRecord.type}
                    onChange={handleChange}
                    className="mt-1 p-2 border border-gray-300 w-full"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Frontend</label>
                  <input
                    type="text"
                    name="frontend"
                    value={selectedRecord.frontend}
                    onChange={handleChange}
                    className="mt-1 p-2 border border-gray-300 w-full"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Backend</label>
                  <input
                    type="text"
                    name="backend"
                    value={selectedRecord.backend}
                    onChange={handleChange}
                    className="mt-1 p-2 border border-gray-300 w-full"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Database Used</label>
                  <input
                    type="text"
                    name="database"
                    value={selectedRecord.database}
                    onChange={handleChange}
                    className="mt-1 p-2 border border-gray-300 w-full"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Developed By</label>
                  <input
                    type="text"
                    name="developedBy"
                    value={selectedRecord.developedBy}
                    onChange={handleChange}
                    className="mt-1 p-2 border border-gray-300 w-full"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Update
                </button>
              </form>
            ) : (
              <div>
                <p><strong>Type:</strong> {selectedRecord.type}</p>
                <p><strong>Frontend:</strong> {selectedRecord.frontend}</p>
                <p><strong>Backend:</strong> {selectedRecord.backend}</p>
                <p><strong>Database:</strong> {selectedRecord.database}</p>
                <p><strong>Developed By:</strong> {selectedRecord.developedBy}</p>
              </div>
            )}
          </div>
        ) : (
          <div>
            <h2 className="text-xl font-bold mb-4">Select a record to see details</h2>
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
