import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import db from './models/index.cjs';
import authRouter from './routes/auth.js';
import taskRouter from './routes/tasks.js';
import userRouter from './routes/users.js';
import errorHandler from './middleware/errorHandler.js';

const app = express();
const PORT = process.env.PORT || 3000;

const secret = process.env.JWT_SECRET;
if (!secret || secret.length < 32) {
    console.error('JWT_SECRET must be at least 32 characters.');
    process.exit(1);
}

try {
    await db.sequelize.authenticate();
} catch (error) {
    console.error('Cannot reach the database:', error.message);
    process.exit(1);
}

const allowedOrigins = (process.env.CORS_ORIGIN || '')
    .split(',')
    .filter(Boolean);

app.use(cors({ origin: allowedOrigins }));
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/tasks', taskRouter);
app.use('/api/users', userRouter);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Task Manager API running on port ${PORT}`);
});
