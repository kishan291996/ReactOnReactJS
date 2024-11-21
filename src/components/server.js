const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = 5000;
const filePathContact = path.join(__dirname, 'contacts.json');
const usersFilePath = path.join(__dirname, 'users.json');

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
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
