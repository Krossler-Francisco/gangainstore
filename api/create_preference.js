import mercadopago from 'mercadopago';
import 'dotenv/config';

mercadopago.configure({
    access_token: process.env.MP_ACCESS_TOKEN
  });

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method not allowed');

  const { title, unit_price, quantity } = req.body;

  try {
    const preference = {
      items: [
        {
          title,
          unit_price: Number(unit_price),
          quantity: Number(quantity),
          currency_id: 'ARS',
        },
      ],
      back_urls: {
        success: 'https://tusitio.com/success',
        failure: 'https://tusitio.com/failure',
        pending: 'https://tusitio.com/pending',
      },
      auto_return: 'approved',
    };

    const response = await mercadopago.preferences.create(preference);
    res.status(200).json({ init_point: response.body.init_point });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Hubo un error al crear la preferencia' });
  }
}
