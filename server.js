const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(bodyParser.json());

const db = new sqlite3.Database('./scores.db', (err) => {
    if (err) {
      console.error('Error opening database', err.message);
    } else {
      // Create the scores table if it doesn't exist
      db.run(`CREATE TABLE IF NOT EXISTS scores (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        playerName TEXT,
        score INTEGER,
        date TEXT DEFAULT CURRENT_TIMESTAMP
      )`);
    }
  });
  
app.post('/api/save-score', (req, res) => {
    const { playerName, score } = req.body;
    const query = `INSERT INTO scores (playerName, score) VALUES (?, ?)`;
  
    db.run(query, [playerName, score], function (err) {
      if (err) {
        res.status(500).json({ message: 'Error saving score', error: err.message });
      } else {
        res.status(201).json({ message: 'Score saved successfully' });
      }
    });
  });
  
// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
