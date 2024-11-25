import React, { useState, useEffect } from 'react';
import { submitProjectDetails, fetchProjects } from '../components/projectSevices';

const CreateProject = () => {
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [project, setProject] = useState({ id: '', name: '', type: '', frontend: '', backend: '', database: '', developedBy: '' });
  const [existingProjects, setExistingProjects] = useState([]);

  useEffect(() => {
    const getProjects = async () => {
      const data = await fetchProjects();
      setExistingProjects(data);
    };
    getProjects();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProject({ ...project, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check for duplicate project name
    const isDuplicate = existingProjects.some(existingProject => existingProject.name.toLowerCase() === project.name.toLowerCase());
    if (isDuplicate) {
      setSubmissionStatus('Project name already exists. Please choose a different name.');
      return;
    }
    setProject({ id: '', name: '', type: '', frontend: '', backend: '', database: '', developedBy: '' });
    setSubmissionStatus("Project details submitted successfully!")
    // Generate auto-incremental ID
    const highestId = existingProjects.reduce((maxId, project) => Math.max(maxId, project.id || 0), 0);
    project.id = highestId + 1;

    const statusMessage = await submitProjectDetails(project);
    
    if (statusMessage === 'Project details submitted successfully!') {
      setSubmissionStatus(null);
    } else {
      setSubmissionStatus(statusMessage);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">Create New Project</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Project Name</label>
          <input
            type="text"
            name="name"
            value={project.name}
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
            value={project.type}
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
            value={project.frontend}
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
            value={project.backend}
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
            value={project.database}
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
            value={project.developedBy}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 w-full"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
      {submissionStatus && <p className="mt-4 text-center text-red-500">{submissionStatus}</p>}
    </div>
  );
};

export default CreateProject;
