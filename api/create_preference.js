import { MercadoPagoConfig, Preference } from 'mercadopago';

// Configuração do Mercado Pago usando a classe MercadoPagoConfig
const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN, // Certifique-se que está configurado corretamente no ambiente
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method not allowed');
  }

  const { items } = req.body;

  // Validação simples para garantir que os parâmetros estão presentes e são um array
  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'Missing or invalid items array' });
  }

  try {
    // Criando a preferência no Mercado Pago
    const preference = await client.preferences.create({
      body: {
        items: items.map(item => ({
          title: item.title,
          unit_price: parseFloat(item.unit_price),
          quantity: parseInt(item.quantity, 10),
        })),
        back_urls: {
          success: 'https://www.seusite.com/success',
          failure: 'https://www.seusite.com/failure',
          pending: 'https://www.seusite.com/pending',
        },
        auto_return: 'approved',
        external_reference: `pedido_${Date.now()}`,
      },
    });

    // Responde com o ID da preferência para o frontend
    return res.status(200).json({
      id: preference.body.id,
      init_point: preference.body.init_point,
    });

  } catch (error) {
    console.error('Erro ao criar preferência:', error);
    return res.status(500).json({ error: 'Erro ao criar preferência' });
  }
}
