import mercadopago from 'mercadopago';

mercadopago.configurations.setAccessToken(process.env.MP_ACCESS_TOKEN);  // Inicializa o Mercado Pago com o token

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method not allowed');

  const { title, unit_price, quantity } = req.body;

  try {
    // Certifique-se de que está criando a preferência corretamente
    const preference = await mercadopago.preferences.create({
      items: [
        {
          title,
          unit_price: Number(unit_price),
          quantity: Number(quantity),
          currency_id: 'ARS', // Usando ARS para Argentina
        },
      ],
      back_urls: {
        success: 'https://tusitio.com/success',
        failure: 'https://tusitio.com/failure',
        pending: 'https://tusitio.com/pending',
      },
      auto_return: 'approved',
    });

    res.status(200).json({ init_point: preference.body.init_point });
  } catch (error) {
    console.error('Erro ao criar a preferência:', error);
    res.status(500).json({ error: 'Erro ao criar preferência' });
  }
}
