export default function errorHandler(err, req, res, next) {
  if (err.name === 'SequelizeValidationError') {
    return res.status(400).json({ error: err.errors.map((error) => error.message) });
  }

  if (err.name === 'SequelizeUniqueConstraintError') {
    return res.status(409).json({ error: 'That email is already registered' });
  }

  if (err.status && err.status < 500) {
    return res.status(err.status).json({ error: err.message });
  }

  console.error(err.message);
  return res.status(500).json({ error: 'Something went wrong on the server' });
}
