import 'dotenv/config';
import express from 'express';
import router, { setCachedUsers } from './routes/index.js';
import { fetchSampleUsers } from './src/api.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use('/api', router);

async function startServer() {
    // Fetch users once at startup and cache them so /api/users
    // doesn't re-fetch on every request.
    const users = await fetchSampleUsers();
    setCachedUsers(users);

    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    });
}

startServer();