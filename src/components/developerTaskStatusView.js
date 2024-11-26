import React, { useState, useEffect } from 'react';
import { fetchProjects, fetchTasksByProjectId } from '../components/projectSevices';
import { Pie, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  PointElement,
} from 'chart.js';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  PointElement
);

const DeveloperTaskStats = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState('');
  const [tasks, setTasks] = useState([]);
  
  useEffect(() => {
    const getProjects = async () => {
      const data = await fetchProjects();
      setProjects(data);
    };
    getProjects();
  }, []);

  useEffect(() => {
    if (selectedProject) {
      const getTasks = async () => {
        const data = await fetchTasksByProjectId(selectedProject);
        setTasks(data);
      };
      getTasks();
    }
  }, [selectedProject]);

  const handleProjectChange = (e) => {
    setSelectedProject(e.target.value);
  };

  const getDeveloperTaskData = (status) => {
    const developerTasks = tasks.filter(task => task.status === status);
    const developerCounts = developerTasks.reduce((acc, task) => {
      acc[task.assignedTo] = (acc[task.assignedTo] || 0) + 1;
      return acc;
    }, {});

    return {
      labels: Object.keys(developerCounts),
      datasets: [
        {
          data: Object.values(developerCounts),
          backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#4BC0C0',
            '#9966FF',
            '#FF9F40'
          ],
          hoverBackgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#4BC0C0',
            '#9966FF',
            '#FF9F40'
          ]
        }
      ]
    };
  };

  const getDeveloperProgressData = () => {
    const developerTaskCounts = tasks.reduce((acc, task) => {
      acc[task.assignedTo] = acc[task.assignedTo] || { total: 0, completed: 0 };
      acc[task.assignedTo].total += 1;
      if (task.status === 'Closed') {
        acc[task.assignedTo].completed += 1;
      }
      return acc;
    }, {});

    const labels = Object.keys(developerTaskCounts);
    const totalTasks = labels.map(label => developerTaskCounts[label].total);
    const completedTasks = labels.map(label => developerTaskCounts[label].completed);
    const completionRates = labels.map(label => 
      Math.round((developerTaskCounts[label].completed / developerTaskCounts[label].total) * 100)
    );

    return {
      labels,
      datasets: [
        {
          type: 'bar',
          label: 'Total Tasks',
          data: totalTasks,
          backgroundColor: '#36A2EB',
        },
        {
          type: 'bar',
          label: 'Completed Tasks',
          data: completedTasks,
          backgroundColor: '#4BC0C0',
        },
        {
          type: 'line',
          label: 'Completion Rate (%)',
          data: completionRates,
          borderColor: '#FF6384',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          fill: true,
        }
      ]
    };
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Developer Task Statistics</h2>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Select Project</label>
        <select 
          value={selectedProject}
          onChange={handleProjectChange}
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="">Select</option>
          {projects.map(project => (
            <option key={project.id} value={project.id}>
              {project.name}
            </option>
          ))}
        </select>
      </div>
      {selectedProject && (
        <div>
          <div className="flex flex-wrap -mx-2">
            <div className="w-full lg:w-1/2 p-2">
              <h3 className="text-xl font-bold mb-4">Open Tasks by Developer</h3>
              <Pie data={getDeveloperTaskData('Active')} />
            </div>
            <div className="w-full lg:w-1/2 p-2">
              <h3 className="text-xl font-bold mb-4">Closed Tasks by Developer</h3>
              <Pie data={getDeveloperTaskData('Closed')} />
            </div>
          </div>
          <div className="mt-8">
            <h3 className="text-xl font-bold mb-4">Developer Progress</h3>
            <Bar data={getDeveloperProgressData()} options={{ responsive: true, scales: { y: { beginAtZero: true } } }} />
          </div>
        </div>
      )}
    </div>
  );
};

export default DeveloperTaskStats;
