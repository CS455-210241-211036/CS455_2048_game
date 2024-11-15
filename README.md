**CS455_2048_game**
- **Press Start Game Button to start the game**
- URL for game: https://cs4552048game-production.up.railway.app
- Linter: ESLint
- Unit Testing and Coverage: Jest
- Performance Tests: Selenium
- Refactoring: Reordered the functions
- Testing: Created the Start button

**Linter Reports:**
- Go to **Actions** tab
- Select the commit for which you want to see the linter report
- In the workflow flowchart, select the **lint** job for linter reports
- In the job, select the **Run ESLint** step for linter report

**Coverage Reports:**
- Go to **Actions** tab
- Select the commit for which you want to see the coverage report
- In the workflow flowchart, select the **test** job for coverage reports
- In the job, select the **Run Tests** step for coverage report

**Performance Reports:**
- Go to **Actions** tab
- Select the commit for which you want to see the performance report
- In the workflow flowchart, select the **performance-test** job for performance reports
- In the job, select the **Run performance tests** step for the performance report containing load time and assest details
- Also note that since the leaderboard page loads while the game page is loaded, no separate load time is measured for leaderboard page
