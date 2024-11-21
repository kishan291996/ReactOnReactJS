const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = 5000;
const filePath = path.join(__dirname, 'contacts.json');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the 'build' directory
app.use(express.static(path.join(__dirname, 'build')));

// Ensure the JSON file exists and initialize it if not
const initializeFile = async () => {
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

initializeFile();

app.post('/api/contact', async (req, res) => {
  const data = req.body;

  try {
    let contacts = [];
    try {
      const fileData = await fs.readFile(filePath, 'utf8');
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

// All other GET requests not handled before will return the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
