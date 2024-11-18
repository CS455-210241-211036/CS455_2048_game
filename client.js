/* eslint-disable no-undef, no-unused-vars */
const axios = require("axios");
const { monitorServers, getActiveServer } = require("./health-check");

monitorServers(); // Start monitoring servers

async function makeRequest(endpoint, options = {}) {
  const activeServer = getActiveServer();
  const url = `${activeServer}${endpoint}`;

  try {
    const response = await axios({
      ...options,
      url,
    });
    console.log(`Response from ${activeServer}:`, response.data);
    return response.data;
  } catch (error) {
    console.error(`Request to ${url} failed:`, error.message);
    throw error;
  }
}

// Timer to terminate the script after 1 minute
setTimeout(() => {
  console.log("1 minute has elapsed. Terminating the script.");
  process.exit(0); // Terminate the script
}, 60 * 1000); // 60 seconds

// Example usage
(async () => {
  try {
    const data = await makeRequest("/api/get-leaderboard");
    console.log("Received data:", data);
  } catch (error) {
    console.error("Failed to fetch data.");
  }
})();
