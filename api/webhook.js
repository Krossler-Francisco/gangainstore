import { MercadoPagoConfig, Payment } from 'mercadopago';
import connectToDatabase from './db.js'; // ⚡ importante conectar
import Venta from './models/Venta.js';   // ⚡ importa tu modelo de venta

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('not allowed');
  }

  try {
    const { type, data } = req.body;

    if (type === 'payment') {
      const paymentId = data.id;

      const payment = await new Payment(client).get({ id: paymentId });

      if (payment.status === 'approved') {
        const externalReference = payment.external_reference;

        console.log(`Pago aprobado. Referencia externa: ${externalReference}`);

        // Conectamos a la base de datos
        await connectToDatabase();

        // Buscamos la venta por su _id (external_reference)
        const venta = await Venta.findById(externalReference);

        if (venta) {
          // Actualizamos el estado a "aprobado"
          venta.estado = 'aprobado';
          await venta.save();

          console.log('Venta actualizada correctamente.');
        } else {
          console.log('Venta no encontrada.');
        }
      } else {
        console.log(`Pago no aprobado. Estado actual: ${payment.status}`);
      }
    }

    res.status(200).send('ok');
  } catch (error) {
    console.error('Error en webhook:', error);
    res.status(500).send('internal error');
  }
}
