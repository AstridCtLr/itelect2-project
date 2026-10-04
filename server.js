import 'dotenv/config';
import express from 'express';
import authRouter from './routes/auth.js';
import taskRouter from './routes/tasks.js';
import userRouter from './routes/users.js';
import errorHandler from './middleware/errorHandler.js';
import cors from "cors";
import morgan from "morgan";

const app = express();
const PORT = process.env.PORT || 3000;

const secret = process.env.JWT_SECRET;
if (!secret || secret.length < 32) {
    console.error('JWT_SECRET in .env must be at least 32 characters.');
    process.exit(1);
}

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/tasks', taskRouter);
app.use('/api/users', userRouter);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
