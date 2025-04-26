import connectToDatabase from './db.js';
import Venta from './models/Venta.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end();

  try {
    await connectToDatabase();

    const ventas = await Venta.find({});

    res.status(200).json(ventas);
  } catch (error) {
    console.error('Error al buscar ventas:', error);
    res.status(500).json({ message: 'Error al buscar ventas', error: error.message });
  }
}
