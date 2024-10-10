/* eslint-disable no-undef */
const request = require('supertest');
const { app, server, pool } = require('./server');

describe('Save Score API Tests', () => {
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
