import express from 'express';
import db from '../models/index.cjs';

const { Task, User } = db;
const router = express.Router();

router.get('/tasks', async (req, res) => {
    const tasks = await Task.findAll({ include: User, order: [['id', 'ASC']] });
    res.json(tasks);
});

router.get('/tasks/:id', async (req, res) => {
    const task = await Task.findByPk(req.params.id, { include: User });

    if (!task) {
        return res.status(404).json({ error: `Task with id ${req.params.id} not found` });
    }

    res.json(task);
});

router.get('/users', async (req, res) => {
    const users = await User.findAll({ order: [['id', 'ASC']] });
    res.json(users);
});

router.post('/tasks', async (req, res, next) => {
    if (!req.body.title || !req.body.dueDate) {
        const err = new Error('title and dueDate required');
        err.status = 400;
        return next(err);
    }

    const task = await Task.create(req.body);
    res.status(201).json(task);
});

router.put('/tasks/:id', async (req, res, next) => {
    const task = await Task.findByPk(req.params.id);

    if (!task) {
        const err = new Error(`Task with id ${req.params.id} not found`);
        err.status = 404;
        return next(err);
    }

    await task.update(req.body);
    res.status(200).json(task);
});

router.delete('/tasks/:id', async (req, res, next) => {
    const task = await Task.findByPk(req.params.id);

    if (!task) {
        const err = new Error(`Task with id ${req.params.id} not found`);
        err.status = 404;
        return next(err);
    }

    await task.destroy();
    res.status(200).json({ message: 'Deleted', task });
});

export default router;