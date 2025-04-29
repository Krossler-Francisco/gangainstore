import { MercadoPagoConfig, Payment } from 'mercadopago';
import connectToDatabase from './db.js'; 
import Venta from './models/Venta.js';
import mongoose from 'mongoose';

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN,
});

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
        const paymentId = data.id;

        try {
          const payment = await new Payment(client).get({ id: paymentId });

          console.log('🔵 Payment recibido:', JSON.stringify(payment, null, 2));

          if (payment.status === 'approved') {
            const externalReference = payment.external_reference;

            console.log(`✅ Pago aprobado. Referencia externa: ${externalReference}`);

            const venta = await Venta.findById(new mongoose.Types.ObjectId(externalReference));

            if (venta) {
              venta.estado = 'aprobado';
              await venta.save();
              console.log('✅ Venta actualizada correctamente.');
            } else {
              console.log('⚠️ Venta no encontrada.');
            }
          } else {
            console.log(`⚠️ Pago no aprobado. Estado actual: ${payment.status}`);
          }
        } catch (err) {
          console.error('❌ Error procesando pago:', err);
        }
      } else {
        console.log(`⚠️ Evento no manejado: ${type}`);
      }
    });

  } catch (error) {
    console.error('❌ Error en webhook handler:', error);
  }
}
