import { MercadoPagoConfig, Preference } from 'mercadopago';

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method not allowed');
  }

    const { items } = req.body;
    const { title, unit_price, quantity } = items[0] || {};

  if (!title || !unit_price || !quantity) {
    return res.status(400).json({ error: 'Missing required fields: title, unit_price, quantity' });
  }

  try {
    const preference = await new Preference(client).create({
      body: {
        items: [
          {
            title: title,
            unit_price: parseFloat(unit_price),
            quantity: parseInt(quantity, 10),
          },
        ],
        back_urls: {
          success: 'https://www.gangain.com.ar/success',
          failure: 'https://www.gangain.com.ar/failure',
          pending: 'https://www.gangain.com.ar/pending',
        },
        auto_return: 'approved',
        external_reference: `pedido_${Date.now()}`,
      },
    });

    return res.status(200).json({
      preferenceId: preference.id,
      init_point: preference.init_point,
    });

  } catch (error) {
    console.error('Erro ao criar preferência:', error);
    return res.status(500).json({ error: 'Erro ao criar preferência' });
  }
}
