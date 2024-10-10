/* eslint-disable no-undef */
const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(bodyParser.json());

// Setup PostgreSQL connection
const pool = new Pool({
  connectionString: process.env.NODE_ENV !== 'production' ? process.env.TEST_DATABASE_URL : process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV !== 'production' ? false : {
    rejectUnauthorized: false
  }
});
// Create the scores table if it doesn't exist
pool.query(`CREATE TABLE IF NOT EXISTS scores (
  id SERIAL PRIMARY KEY,
  playername TEXT NOT NULL,
  score INTEGER NOT NULL,
  date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`).then(() => {
  console.log('Connected to the database and ensured table exists');
}).catch((err) => {
  console.error('Error connecting to the database or creating table:', err.message);
});

app.post('/api/save-score', async (req, res) => {
  const { playerName, score } = req.body;

  // Validate input data
  if (!playerName || typeof playerName !== 'string' || !score || typeof score !== 'number') {
    return res.status(400).json({ message: 'Invalid data: playerName and score are required.' });
  }

  const query = `INSERT INTO scores (playername, score) VALUES ($1, $2)`;

  try {
    await pool.query(query, [playerName, score]);
    res.status(201).json({ message: 'Score saved successfully' });
  } catch (err) {
    console.error('Error saving score:', err.message);
    res.status(500).json({ message: 'Error saving score', error: err.message });
  }
});

app.get('/api/get-leaderboard', async (req, res) => {
  const query = `SELECT playername, score FROM scores ORDER BY score DESC LIMIT 10`;
  
  try {
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (err) {
    console.error('Error retrieving leaderboard:', err.message);
    res.status(500).json({ message: 'Error retrieving leaderboard', error: err.message });
  }
});

// Start the server
const server = app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

module.exports = { app, server, pool };
/* eslint-enable no-undef */
