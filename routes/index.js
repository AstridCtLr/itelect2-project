import express from 'express';
import db from '../models/index.cjs';
import verifyToken from '../middleware/verifyToken.js';
import requireRole from '../middleware/requireRole.js';

const { Task, User, Sequelize } = db;
const { Op } = Sequelize;

const TASK_FIELDS = ['title', 'dueDate', 'completed', 'userId'];
const publicUser = { model: User, attributes: { exclude: ['password'] } };

const router = express.Router();

router.get('/tasks', async (req, res) => {
    const { search } = req.query;
    const where = {};

    if (search) {
        where.title = { [Op.iLike]: `%${search}%` };
    }

    const tasks = await Task.findAll({
        where,
        include: publicUser,
        order: [['id', 'ASC']]
    });
    res.json(tasks);
});

router.get('/tasks/:id', async (req, res) => {
    const task = await Task.findByPk(req.params.id, { include: publicUser });

    if (!task) {
        return res.status(404).json({ error: 'Task not found' });
    }

    res.json(task);
});

router.get('/users', async (req, res) => {
    const users = await User.findAll();
    res.json(users);
});

router.post('/tasks', verifyToken, async (req, res) => {
    const task = await Task.create(req.body, { fields: TASK_FIELDS });
    res.status(201).json(task);
});

router.put('/tasks/:id', verifyToken, async (req, res) => {
    const task = await Task.findByPk(req.params.id);

    if (!task) {
        return res.status(404).json({ error: 'Task not found' });
    }

    await task.update(req.body, { fields: TASK_FIELDS });
    res.json(task);
});

router.delete('/tasks/:id', verifyToken, requireRole('admin'), async (req, res) => {
    const task = await Task.findByPk(req.params.id);

    if (!task) {
        return res.status(404).json({ error: 'Task not found' });
    }

    await task.destroy();
    res.json({ message: 'Deleted', task, deletedBy: req.user.email });
});

export default router;
