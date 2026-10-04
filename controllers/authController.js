import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../models/index.cjs';

const { User } = db;
const SALT_ROUNDS = 10;

export async function register(req, res) {
  const { email, password } = req.body;

  if (!password || password.length < 8) {
    return res.status(400).json({ error: 'password must be at least 8 characters' });
  }

  const taken = await User.findOne({ where: { email } });
  if (taken) {
    return res.status(409).json({ error: 'That email is already registered' });
  }

  const hash = await bcrypt.hash(password, SALT_ROUNDS);
  const user = await User.create({ email, password: hash });

  return res.status(201).json(user);
}

export async function login(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });

  if (!user) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  const match = await bcrypt.compare(password || '', user.password);
  if (!match) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  return res.json({ token });
}

export function me(req, res) {
  return res.json({ user: req.user });
}

export async function listUsers(req, res) {
  const users = await User.findAll();
  return res.json(users);
}
