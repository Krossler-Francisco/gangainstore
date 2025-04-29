import connectToDatabase from './db.js';
import Venta from './models/Venta.js';
import mongoose from 'mongoose';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  let body;
  try {
    body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  } catch (parseError) {
    console.error('❌ Error parseando body:', parseError);
    return res.status(400).json({ error: 'Invalid JSON payload' });
  }

  const { type, data } = body;

  if (!type || !data) {
    console.error('❌ Faltan type o data en el payload');
    return res.status(400).json({ error: 'Missing type or data in payload' });
  }

  if (type !== 'payment') {
    console.warn(`⚠️ Tipo de evento no manejado: ${type}`);
    return res.status(400).json({ error: `Unhandled event type: ${type}` });
  }

  const externalReference = data.external_reference;

  if (!externalReference) {
    console.error('⚠️ No se recibió external_reference en data.');
    return res.status(400).json({ error: 'Missing external_reference in data' });
  }

  try {
    await connectToDatabase();
    const venta = await Venta.findById(new mongoose.Types.ObjectId(externalReference));

    if (!venta) {
      console.warn(`⚠️ Venta no encontrada para ID: ${externalReference}`);
      return res.status(404).json({ error: 'Venta not found' });
    }

    venta.estado = 'aprobado';
    await venta.save();

    console.log(`✅ Venta actualizada exitosamente: ${venta._id}`);
    return res.status(200).json({ message: 'Venta actualizada correctamente' });

  } catch (dbError) {
    console.error('❌ Error accediendo a la base de datos:', dbError);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
