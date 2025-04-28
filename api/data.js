import { MercadoPagoConfig, Preference } from 'mercadopago';
import connectToDatabase from './db.js';
import Venta from './models/Venta.js';

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Not allowed');
  }

  const { cliente, productos, total } = req.body;

  if (!cliente || !productos || !total) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    await connectToDatabase();

    const montoProductos = productos.reduce((acc, p) => acc + (p.desconto * p.quantity), 0);
    const shippingPrice = total.shippingPrice || 0;
    const couponDiscount = total.couponDiscount || 0;

    const totalFinal = montoProductos + shippingPrice - couponDiscount;

    // 1. Crear la venta en MongoDB con estado pendiente
    const nuevaVenta = new Venta({
      cliente,
      productos,
      total: totalFinal,
      estado: 'pendiente'
    });

    await nuevaVenta.save();

    // 2. Preparar los items para MercadoPago
    const items = productos.map(producto => ({
      title: producto.name,
      unit_price: producto.desconto, // usamos el precio con descuento
      quantity: producto.quantity,
      currency_id: 'ARS',
    }));

    // ✅ Agregar costo de envio si existe
    if (total.shippingPrice && total.shippingPrice > 0) {
      items.push({
        title: 'Costo de Envío',
        unit_price: total.shippingPrice,
        quantity: 1,
        currency_id: 'ARS',
      });
    }

    // ✅ Agregar descuento por cupon si existe
    if (total.couponDiscount && total.couponDiscount > 0) {
      items.push({
        title: 'Descuento por Cupón',
        unit_price: -total.couponDiscount,
        quantity: 1,
        currency_id: 'ARS',
      });
    }

    const preference = await new Preference(client).create({
      body: {
        items,
        back_urls: {
          success: 'https://www.gangain.com.ar/confirm-order',
          failure: 'https://www.gangain.com.ar/confirm-order',
          pending: 'https://www.gangain.com.ar/confirm-order',
        },
        auto_return: 'approved',
        external_reference: nuevaVenta._id.toString(),
      },
    });

    // 3. Devolver al front el preferenceId y init_point
    return res.status(200).json({
      preferenceId: preference.id,
      init_point: preference.init_point,
    });

  } catch (error) {
    console.error('Error en checkout:', error);
    return res.status(500).json({ error: 'Error interno' });
  }
}
