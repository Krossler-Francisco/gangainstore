import connectToDatabase from './db.js';
import Venta from './models/Venta.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  await connectToDatabase();

  const { cliente, productos, total } = req.body;

  try {
    const nuevaVenta = new Venta({
      cliente,
      productos,
      total,
      estado: 'pendiente'
    });

    await nuevaVenta.save();
    res.status(200).json({ message: 'Venta registrada correctamente' });
  } catch (error) {
    console.error('Error guardando venta:', error);
    res.status(500).json({ error: 'No se pudo guardar la venta' });
  }
}