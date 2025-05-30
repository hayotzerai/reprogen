import  express from 'express';
import { create } from './modules/git.mjs';
const app = express();
const port = 3000;

// Define a route
app.get('/:token/:repro',create);

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
