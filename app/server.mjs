import  express from 'express';
import { createAndPushRepo } from './modules/push.mjs';
const app = express();
const port = 3000;

// Define a route
app.get('/:token/:repro',createAndPushRepo);

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
