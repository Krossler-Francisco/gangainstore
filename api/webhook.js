import { MercadoPagoConfig, Payment } from 'mercadopago';
import connectToDatabase from './db.js'; 
import Venta from './models/Venta.js';

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Not allowed');
  }

  try {
    // 🔵 1. Asegurarse que el body es un objeto
    let body = req.body;
    if (typeof body === 'string') {
      body = JSON.parse(body);
    }

    const { type, data } = body;

    // 🔵 2. Responder rápido a MercadoPago
    res.status(200).send('ok');

    // 🔵 3. Si el evento es de tipo 'payment'
    if (type === 'payment') {
      const paymentId = data.id;

      // 🔵 4. Obtener los datos del pago en MercadoPago
      const payment = await new Payment(client).get({ id: paymentId });

      if (payment.status === 'approved') {
        const externalReference = payment.external_reference;

        console.log(`✅ Pago aprobado. Referencia externa: ${externalReference}`);

        // 🔵 5. Conectar a la base de datos
        await connectToDatabase();

        // 🔵 6. Buscar y actualizar la venta
        const venta = await Venta.findById(externalReference);

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
    } else {
      console.log(`⚠️ Evento no manejado: ${type}`);
    }

  } catch (error) {
    console.error('❌ Error en webhook:', error);
    // ⚡ Importante: no podemos hacer res.send acá porque ya respondimos arriba
  }
}
