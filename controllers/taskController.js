import db from '../models/index.cjs';

const { Task, User, Sequelize } = db;
const { Op } = Sequelize;

const TASK_FIELDS = ['title', 'dueDate', 'completed', 'userId'];
const publicUser = { model: User, attributes: { exclude: ['password'] } };

export async function listTasks(req, res) {
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
}

export async function getTask(req, res) {
  const task = await Task.findByPk(req.params.id, { include: publicUser });

  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }

  return res.json(task);
}

export async function createTask(req, res) {
  const task = await Task.create(req.body, { fields: TASK_FIELDS });
  return res.status(201).json(task);
}

export async function updateTask(req, res) {
  const task = await Task.findByPk(req.params.id);

  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }

  await task.update(req.body, { fields: TASK_FIELDS });
  return res.json(task);
}

export async function deleteTask(req, res) {
  const task = await Task.findByPk(req.params.id);

  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }

  await task.destroy();
  return res.json({ message: 'Deleted', task, deletedBy: req.user.email });
}
