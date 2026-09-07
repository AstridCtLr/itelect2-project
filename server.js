import 'dotenv/config';
import express from 'express';
import router from './routes/index.js';
import cors from "cors";
import morgan from "morgan";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(morgan('dev')); 
app.use(express.json());

app.use('/api', router);

app.use((err, req, res, next) => {
    if (err.name === 'SequelizeValidationError') {
        return res.status(400).json({ error: err.errors.map((e) => e.message) });
    }

    console.error(err.message);
    const status = err.status || 500;
    res.status(status).json({ error: err.message });
});

function startServer() {
    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    });
}

startServer();

// Update