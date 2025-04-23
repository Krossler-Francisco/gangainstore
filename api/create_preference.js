import { MercadoPagoConfig, Preference } from 'mercadopago';

const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN });

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method not allowed');

  console.log('Dados recebidos no backend:', req.body);  // Para depuração

  const { title, unit_price, quantity } = req.body;

  try {
    const preference = await new Preference(client).create({
      items: [
        {
          title,
          unit_price: Number(unit_price),
          quantity: Number(quantity),
          currency_id: 'ARS',  // Moeda para a Argentina
        },
      ],
      back_urls: {
        success: 'https://tusitio.com/success',
        failure: 'https://tusitio.com/failure',
        pending: 'https://tusitio.com/pending',
      },
      auto_return: 'approved',
    });

    res.status(200).json({ init_point: preference.init_point });
  } catch (error) {
    console.error('Erro ao criar a preferência:', error);
    res.status(500).json({ error: 'Erro ao criar preferência' });
  }
}
