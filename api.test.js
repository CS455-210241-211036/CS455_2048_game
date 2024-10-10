/* eslint-disable no-undef */
const request = require('supertest');
const { Pool } = require('pg');
const { app, server } = require('./server');

const pool = new Pool({
  connectionString: process.env.TEST_DATABASE_URL,
  ssl: false 
});

describe('API Tests', () => {
  beforeAll(async () => {
    
    await request(app).get('/api/get-leaderboard');

    console.log('Inserting test data...');
    await pool.query(`
      INSERT INTO scores (playername, score)
      VALUES ('TestPlayer', 100), ('TestPlayer2', 150);
    `);
  }); 
  
  afterAll(async () => {
    console.log('Deleting test data...');
    await pool.query('DELETE FROM scores');
    console.log('Closing the server...');
   
    console.log('Closing the database pool...');
    await pool.end();
    await new Promise(resolve => {
        server.close(resolve); // Wait for the server to close
      });
    console.log('Cleanup complete!');
  });
  

  test('GET /api/get-leaderboard', async () => {
    const response = await request(app).get('/api/get-leaderboard');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});
/* eslint-enable no-undef */
