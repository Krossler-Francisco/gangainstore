import connectToDatabase from './db.js';
import User from './models/User.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  await connectToDatabase();
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    res.status(200).json({ message: 'Login bem-sucedido', user });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao fazer login' });
  }
}
