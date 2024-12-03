const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = 5000;
const filePathContact = path.join(__dirname, 'contacts.json');
const usersFilePath = path.join(__dirname, 'users.json');
const projectPath = path.join(__dirname, 'projects.json');
const tasksPath = path.join(__dirname, 'tasks.json');
const employeePath = path.join(__dirname, 'employeeDetails.json');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the 'build' directory
app.use(express.static(path.join(__dirname, 'build')));

// Ensure the JSON file exists and initialize it if not
const initializeFile = async ( filePath ) => {
  try {
    await fs.access(filePath);    
  } catch (err) {
    if (err.code === 'ENOENT') {
      // File does not exist, create it with an empty array
      await fs.writeFile(filePath, JSON.stringify([]));
    } else {
      console.error('Error checking file existence:', err);
      process.exit(1);
    }
  }
};

initializeFile(filePathContact);
initializeFile(usersFilePath);
initializeFile(projectPath);
initializeFile(employeePath);

app.post('/api/contact', async (req, res) => {
  const data = req.body;

  try {
    let contacts = [];
    try {
      const fileData = await fs.readFile(filePathContact, 'utf8');
      console.log("Read file data: ===>", fileData); // Detailed logging
      contacts = fileData ? JSON.parse(fileData) : [];
    } catch (err) {
      console.error('Error reading or parsing contacts.json:', err);
      // Initialize with an empty array if parsing fails
      contacts = [];
    }

    contacts.push(data);

    await fs.writeFile(filePath, JSON.stringify(contacts, null, 2));
    res.status(200).send('Contact data saved');
  } catch (err) {
    console.error('Error processing contact data:', err);
    res.status(500).send('Error saving contact data');
  }
});

app.get('/api/contact', async (req, res) => { try { const fileData = await fs.readFile(filePathContact, 'utf8'); const contacts = fileData ? JSON.parse(fileData) : []; res.status(200).json(contacts); } catch (err) { console.error('Error fetching contact data:', err); res.status(500).send('Error fetching contact data'); } });



app.post('/api/register', async (req, res) => { const { username, password } = req.body; try { const fileData = await fs.readFile(usersFilePath, 'utf8'); const users = fileData ? JSON.parse(fileData) : []; if (users.some(user => user.username === username)) { return res.status(400).send('Username already exists'); } users.push({ username, password }); await fs.writeFile(usersFilePath, JSON.stringify(users, null, 2)); res.status(201).send('User registered successfully'); } catch (err) { console.error('Error processing registration data:', err); res.status(500).send('Error registering user'); } });

app.post('/api/login', async (req, res) => { const { username, password } = req.body; try { const fileData = await fs.readFile(usersFilePath, 'utf8'); const users = fileData ? JSON.parse(fileData) : []; const user = users.find(user => user.username === username && user.password === password); if (user) { res.status(200).send('Login successful'); } else { res.status(401).send('Invalid username or password'); } } catch (err) { console.error('Error processing login data:', err); res.status(500).send('Error logging in user'); } });
// All other GET requests not handled before will return the React app


app.post('/api/addProject', async (req, res) => {
  const data = req.body;

  try {
    let project = [];
    try {
      const fileData = await fs.readFile(projectPath, 'utf8');
      console.log("Read file data: ===>", fileData); // Detailed logging
      project = fileData ? JSON.parse(fileData) : [];
    } catch (err) {
      console.error('Error reading or parsing project.json:', err);
      // Initialize with an empty array if parsing fails
      project = [];
    }

    project.push(data);

    await fs.writeFile(projectPath, JSON.stringify(project, null, 2));    
    res.status(200).send('Project details submitted successfully!');
  } catch (err) {
    console.error('Error processing contact data:', err);
    res.status(500).send('Error saving contact data');
  }
});


app.get('/api/projectList', async (req, res) => { try { const fileData = await fs.readFile(projectPath, 'utf8'); const contacts = fileData ? JSON.parse(fileData) : []; res.status(200).json(contacts); } catch (err) { console.error('Error fetching contact data:', err); res.status(500).send('Error fetching contact data'); } });


app.post('/api/updateProject', async (req, res) => { const updatedProject = req.body; try { const fileData = await fs.readFile(projectPath, 'utf8'); let projects = fileData ? JSON.parse(fileData) : []; projects = projects.map(project => project.id === updatedProject.id ? updatedProject : project); await fs.writeFile(projectPath, JSON.stringify(projects, null, 2)); res.status(200).json(updatedProject); } catch (err) { console.error('Error updating project data:', err); res.status(500).send('Error updating project data'); } });


app.post('/api/deleteProject', async (req, res) => { const { id } = req.body; try { const fileData = await fs.readFile(projectPath, 'utf8'); let projects = fileData ? JSON.parse(fileData) : []; projects = projects.filter(project => project.id !== id); await fs.writeFile(projectPath, JSON.stringify(projects, null, 2)); res.status(200).send('Project deleted successfully'); } catch (err) { console.error('Error deleting project:', err); res.status(500).send('Error deleting project'); } });

app.post('/api/addTask', async (req, res) => { const { projectId, task, assignedTo, status } = req.body; try { let tasks = []; try { const fileData = await fs.readFile(tasksPath, 'utf8'); tasks = fileData ? JSON.parse(fileData) : []; } catch (err) { console.error('Error reading or parsing tasks.json:', err); tasks = []; } tasks.push({ projectId, task, assignedTo, status }); await fs.writeFile(tasksPath, JSON.stringify(tasks, null, 2)); res.status(200).json({ message: 'Task added successfully!' }); } catch (err) { console.error('Error adding task:', err); res.status(500).json({ error: 'Error adding task' }); } });

app.get('/api/tasks', async (req, res) => { const { projectId } = req.query; try { const fileData = await fs.readFile(tasksPath, 'utf8'); let tasks = fileData ? JSON.parse(fileData) : []; tasks = tasks.filter(task => task.projectId === Number(projectId)); res.status(200).json(tasks); } catch (err) { console.error('Error fetching tasks:', err); res.status(500).json({ error: 'Error fetching tasks' }); } });

app.post('/api/addEmployee', async (req, res) => { const { name, contact, email, skills, assignedProject, manager } = req.body; try { let employees = []; try { const fileData = await fs.readFile(employeePath, 'utf8'); employees = fileData ? JSON.parse(fileData) : []; } catch (err) { console.error('Error reading or parsing employeeDetails.json:', err); employees = []; } employees.push({ id: employees.length + 1, name, contact, email, skills, assignedProject, manager }); await fs.writeFile(employeePath, JSON.stringify(employees, null, 2)); res.status(200).json({ message: 'Employee added successfully!' }); } catch (err) { console.error('Error adding employee:', err); res.status(500).json({ error: 'Error adding employee' }); } });

app.get('/api/employees', async (req, res) => { try { const fileData = await fs.readFile(employeePath, 'utf8'); const employees = fileData ? JSON.parse(fileData) : []; res.status(200).json(employees); } catch (err) { console.error('Error fetching employees:', err); res.status(500).json({ error: 'Error fetching employees' }); } });


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
