/* eslint-disable no-undef */
const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg'); // Importing Pool from pg
/* eslint-enable no-undef */
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(bodyParser.json());

// Setup PostgreSQL connection
const pool = new Pool({
    user: 'your_user', // Replace with your PostgreSQL username
    host: 'localhost', // Replace with your PostgreSQL host, e.g., 'localhost' or your cloud provider's URL
    database: 'your_database', // Replace with your PostgreSQL database name
    password: 'your_password', // Replace with your PostgreSQL password
    port: 5432, // Default PostgreSQL port
});

// Create the scores table if it doesn't exist
pool.query(`CREATE TABLE IF NOT EXISTS scores (
    id SERIAL PRIMARY KEY,
    playerName TEXT,
    score INTEGER,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`, (err) => {
    if (err) {
        console.error('Error creating table', err.message);
    }
});

app.post('/api/save-score', (req, res) => {
    const { playerName, score } = req.body;
    const query = `INSERT INTO scores (playerName, score) VALUES ($1, $2)`;

    pool.query(query, [playerName, score], (err) => {
        if (err) {
            res.status(500).json({ message: 'Error saving score', error: err.message });
        } else {
            res.status(201).json({ message: 'Score saved successfully' });
        }
    });
});

// Fetch the top 10 leaderboard scores from the database
app.get('/api/get-leaderboard', (req, res) => {
    const query = `SELECT playerName, score, date FROM scores ORDER BY score DESC LIMIT 10`;
    
    pool.query(query, (err, result) => {
        if (err) {
            res.status(500).json({ message: 'Error retrieving leaderboard', error: err.message });
        } else {
            res.json(result.rows);
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
