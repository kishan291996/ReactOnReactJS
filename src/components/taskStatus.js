import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { addTaskToProject, fetchTasksByProjectId } from '../components/projectSevices';

const TaskStatus = () => {
  const location = useLocation();
  const { record } = location.state;

  const [task, setTask] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [status, setStatus] = useState('');
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const data = await fetchTasksByProjectId(record.id);
      setTasks(data);
    };
    getTasks();
  }, [record.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const taskData = {
      projectId: record.id,
      task,
      assignedTo,
      status
    };

    const result = await addTaskToProject(taskData);
    if (result.message === 'Task added successfully!') {
      // Clear the form fields
      setTask('');
      setAssignedTo('');
      setStatus('');
      // Refresh the task list
      const updatedTasks = await fetchTasksByProjectId(record.id);
      setTasks(updatedTasks);
    } else {
      console.error('Error adding task:', result.error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Task Status for {record.name}</h2>
      <table className="min-w-full bg-white border border-gray-200 mb-4">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Field</th>
            <th className="py-2 px-4 border-b">Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="py-2 px-4 border-b">ID</td>
            <td className="py-2 px-4 border-b">{record.id}</td>
          </tr>
          <tr>
            <td className="py-2 px-4 border-b">Name</td>
            <td className="py-2 px-4 border-b">{record.name}</td>
          </tr>
          <tr>
            <td className="py-2 px-4 border-b">Type</td>
            <td className="py-2 px-4 border-b">{record.type}</td>
          </tr>
          <tr>
            <td className="py-2 px-4 border-b">Frontend</td>
            <td className="py-2 px-4 border-b">{record.frontend}</td>
          </tr>
          <tr>
            <td className="py-2 px-4 border-b">Backend</td>
            <td className="py-2 px-4 border-b">{record.backend}</td>
          </tr>
          <tr>
            <td className="py-2 px-4 border-b">Database</td>
            <td className="py-2 px-4 border-b">{record.database}</td>
          </tr>
          <tr>
            <td className="py-2 px-4 border-b">Developed By</td>
            <td className="py-2 px-4 border-b">{record.developedBy}</td>
          </tr>
        </tbody>
      </table>
      <div className="flex flex-wrap">
        <div className="w-full lg:w-1/2 p-2">
          <form onSubmit={handleSubmit} className="bg-white p-4 border border-gray-200 rounded">
            <h3 className="text-xl font-bold mb-4">Add Task</h3>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Task</label>
              <input
                type="text"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Assign To</label>
              <select
                value={assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                required
              >
                <option value="">Select</option>
                <option value="Developer 1">Developer 1</option>
                <option value="Developer 2">Developer 2</option>
                <option value="Developer 3">Developer 3</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                required
              >
                <option value="">Select</option>
                <option value="Active">Active</option>
                <option value="Closed">Closed</option>
                <option value="To Do">To Do</option>
                <option value="Need Clarification">Need Clarification</option>
                <option value="On Hold">On Hold</option>
                <option value="In Progress">In Progress</option>
              </select>
            </div>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
              Add Task
            </button>
          </form>
        </div>
        <div className="w-full lg:w-1/2 p-2">
          <h3 className="text-xl font-bold mb-4">Tasks</h3>
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Task</th>
                <th className="py-2 px-4 border-b">Assigned To</th>
                <th className="py-2 px-4 border-b">Status</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border-b">{task.task}</td>
                  <td className="py-2 px-4 border-b">{task.assignedTo}</td>
                  <td className="py-2 px-4 border-b">{task.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TaskStatus;
