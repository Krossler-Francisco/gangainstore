import connectToDatabase from './db.js'; 
import Venta from './models/Venta.js';
import mongoose from 'mongoose';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Not allowed');
  }

  try {
    let body = req.body;
    if (typeof body === 'string') {
      body = JSON.parse(body);
    }

    const { type, data } = body;

    res.status(200).send('ok');

    setImmediate(async () => {
      await connectToDatabase();

      if (type === 'payment') {
        try {
          // 🔥 Simulamos directamente que el pago es aprobado
          const externalReference = data.external_reference; // 👈 Ahora esperamos que nos mandes el external_reference directamente en el webhook

          console.log(`✅ Simulando pago aprobado para referencia: ${externalReference}`);

          if (!externalReference) {
            console.log('⚠️ No se recibió external_reference en el webhook.');
            return;
          }

          const venta = await Venta.findById(new mongoose.Types.ObjectId(externalReference));

          if (venta) {
            venta.estado = 'aprobado';
            await venta.save();
            console.log('✅ Venta actualizada correctamente.');
          } else {
            console.log('⚠️ Venta no encontrada.');
          }
        } catch (err) {
          console.error('❌ Error procesando pago simulado:', err);
        }
      } else {
        console.log(`⚠️ Evento no manejado: ${type}`);
      }
    });

  } catch (error) {
    console.error('❌ Error en webhook handler:', error);
  }
}
