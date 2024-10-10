/* eslint-disable no-undef */
const request = require('supertest');
const { app, server, pool } = require('./server');

describe('Save Score API Tests', () => {
    beforeAll(async () => {
    
        await request(app).get('/api/get-leaderboard');
    
        console.log('Inserting test data...');
        await pool.query(`
          INSERT INTO scores (playername, score)
          VALUES ('TestPlayer', 100), ('TestPlayer2', 150);
        `);
    }); 

    afterAll(async () => {
        // Cleanup test data
        console.log('Deleting test data...');
        await pool.query("DELETE FROM scores WHERE playername IN ('TestPlayer', 'AnotherPlayer');");

        // Close the server and database pool properly
        console.log('Closing the server...');
        await new Promise(resolve => server.close(resolve));

        console.log('Closing the database pool...');
        await pool.end();
        console.log('Cleanup complete!');
    });

    test('POST /api/save-score should save a score and return status 201', async () => {
        const testData = {
            playerName: 'TestPlayer',
            score: 200
        };

        const response = await request(app)
            .post('/api/save-score')
            .send(testData);

        expect(response.statusCode).toBe(201);
        expect(response.body).toEqual({ message: 'Score saved successfully' });

        // Check if the score was saved in the database
        const result = await pool.query('SELECT * FROM scores WHERE playername = $1 AND score = $2', [testData.playerName, testData.score]);
        expect(result.rows.length).toBe(1);
        expect(result.rows[0].playername).toBe(testData.playerName);
        expect(result.rows[0].score).toBe(testData.score);
    });

    test('POST /api/save-score should handle invalid data and return status 400', async () => {
        const invalidData = {
            playerName: 'AnotherPlayer' // Missing "score" field
        };

        const response = await request(app)
            .post('/api/save-score')
            .send(invalidData);

        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('message', 'Invalid data: playerName and score are required.');
    });
});
