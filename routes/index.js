import express from 'express';
import { tasks } from '../src/utils.js';
import { fetchSampleUsers } from '../src/api.js';

const router = express.Router();

// Cached users, populated once when the server starts (see server.js)
let cachedUsers = [];

export function setCachedUsers(users) {
    cachedUsers = users;
}

// GET /api/tasks -> returns the mock task array
router.get('/tasks', (req, res) => {
    res.json(tasks);
});

// GET /api/tasks/:id -> returns a single task, or 404 if not found
router.get('/tasks/:id', (req, res) => {
    const id = Number(req.params.id);
    const task = tasks.find(t => t.id === id);

    if (!task) {
        return res.status(404).json({ error: `Task with id ${req.params.id} not found` });
    }

    res.json(task);
});

// GET /api/users -> returns the cached, transformed user list
router.get('/users', (req, res) => {
    res.json(cachedUsers);
});

export default router;