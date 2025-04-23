import { MercadoPagoConfig, Preference } from 'mercadopago';

// Configuração do Mercado Pago usando a classe MercadoPagoConfig
const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN, // Token via variável de ambiente
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method not allowed');
  }

  const { title, unit_price, quantity } = req.body;

  // Validação simples para garantir que os parâmetros estão presentes
  if (!title || !unit_price || !quantity) {
    return res.status(400).json({ error: 'Missing required fields: title, unit_price, quantity' });
  }

  try {
    // Criando a preferência no Mercado Pago com back_urls e auto_return
    const preference = await client.preferences.create({
      body: {
        items: [
          {
            title: title,
            unit_price: parseFloat(unit_price),
            quantity: parseInt(quantity, 10),
          },
        ],
        back_urls: {
          success: 'https://www.seusite.com/success',
          failure: 'https://www.seusite.com/failure',
          pending: 'https://www.seusite.com/pending',
        },
        auto_return: 'approved',
        // Opcional: external_reference para rastrear internamente a transação
        external_reference: `pedido_${Date.now()}`, // Exemplo de referência única
      },
    });

    // Retorna a resposta com o ID da preferência e o link para redirecionar o cliente
    return res.status(200).json({
      preferenceId: preference.id,
      init_point: preference.init_point, // Link de redirecionamento para o checkout
    });

  } catch (error) {
    console.error('Erro ao criar preferência:', error);
    return res.status(500).json({ error: 'Erro ao criar preferência' });
  }
}
