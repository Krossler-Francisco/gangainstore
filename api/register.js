import connectToDatabase from './db.js';
import User from './models/User.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  await connectToDatabase();
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ error: 'Usuário já existe' });
    }

    const newUser = await User.create({ username, email, password });
    res.status(201).json({ message: 'Usuário criado com sucesso!', user: newUser });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao criar usuário' });
  }
}
