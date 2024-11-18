/* eslint-disable no-undef, no-unused-vars */
const axios = require("axios");

const PRIMARY_SERVER = "https://cs4552048game-production.up.railway.app";
const BACKUP_SERVER = "https://cs4552048game-copy-production.up.railway.app";
const HEALTH_CHECK_INTERVAL = 10000; // 10 seconds
let activeServer = PRIMARY_SERVER;

async function checkServerHealth(url) {
  try {
    const response = await axios.get(url, { timeout: 5000 });
    return response.status === 200;
  } catch (error) {
    return false;
  }
}

async function monitorServers() {
  console.log("Starting health monitoring...");
  setInterval(async () => {
    const isPrimaryHealthy = await checkServerHealth(PRIMARY_SERVER);

    if (isPrimaryHealthy) {
      if (activeServer !== PRIMARY_SERVER) {
        console.log("Switching back to primary server.");
        activeServer = PRIMARY_SERVER;
      }
    } else {
      console.log("Primary server is down. Checking backup server...");
      const isBackupHealthy = await checkServerHealth(BACKUP_SERVER);
      if (isBackupHealthy) {
        if (activeServer !== BACKUP_SERVER) {
          console.log("Switching to backup server.");
          activeServer = BACKUP_SERVER;
        }
      } else {
        console.error("Both servers are down! Immediate action required.");
      }
    }
    console.log(`Active server: ${activeServer}`);
  }, HEALTH_CHECK_INTERVAL);
}

// Function to get the current active server
function getActiveServer() {
  return activeServer;
}

module.exports = { monitorServers, getActiveServer };
