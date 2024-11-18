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

// Example usage
(async () => {
  try {
    const data = await makeRequest("/api/get-leaderboard");
    console.log("Received data:", data);
  } catch (error) {
    console.error("Failed to fetch data.");
  }
})();
