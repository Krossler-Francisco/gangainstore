import connectToDatabase from './db.js';

export default async function handler(req, res) {
  try {
    const db = await connectToDatabase();
    res.status(200).json({ message: 'Conexão com MongoDB realizada com sucesso!' });
  } catch (error) {
    console.error('Erro ao conectar com o MongoDB:', error);
    res.status(500).json({ error: 'Erro ao conectar com o banco de dados.' });
  }
}