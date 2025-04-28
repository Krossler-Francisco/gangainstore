import { MercadoPagoConfig, Preference } from 'mercadopago';
import connectToDatabase from './db.js';   // 🔵 Asegurate de tener esta función conectando a MongoDB
import Venta from './models/Venta.js';     // 🔵 Tu schema de venta

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('not allowed');
  }

  const { cliente, productos, total } = req.body;

  if (!cliente || !productos || !total) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    await connectToDatabase(); // 🔵 Muy importante conectar a la base

    // 1. Crear la venta en MongoDB con estado pendiente
    const nuevaVenta = new Venta({
      cliente,
      productos,
      total,
      estado: 'pendiente'
    });

    await nuevaVenta.save();

    // 2. Crear la preferencia usando el _id como external_reference
    const items = productos.map(producto => ({
      title: producto.name,
      unit_price: producto.price,
      quantity: producto.quantity,
      currency_id: "ARS",
    }));

    const preference = await new Preference(client).create({
      body: {
        items,
        back_urls: {
          success: 'https://www.gangain.com.ar/confirm-order',
          failure: 'https://www.gangain.com.ar/confirm-order',
          pending: 'https://www.gangain.com.ar/confirm-order',
        },
        auto_return: 'approved',
        external_reference: nuevaVenta._id.toString(), // 🚀 usamos el ID real de la venta
      },
    });

    // 3. Devolver al front el preferenceId y init_point
    return res.status(200).json({
      preferenceId: preference.id,
      init_point: preference.init_point,
    });

  } catch (error) {
    console.error('Erro:', error);
    return res.status(500).json({ error: 'Erro interno' });
  }
}
