import mercadopago from 'mercadopago';

// Configuração do Mercado Pago com o token de acesso
mercadopago.configurations.setAccessToken(process.env.MERCADO_PAGO_ACCESS_TOKEN);  // Token configurado a partir de variáveis de ambiente

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method not allowed');
  }

  const { title, unit_price, quantity } = req.body;

  // Validação simples para garantir que os parâmetros necessários estão presentes
  if (!title || !unit_price || !quantity) {
    return res.status(400).json({ error: 'Missing required fields: title, unit_price, quantity' });
  }

  try {
    // Criando a preferência no Mercado Pago
    const preference = await mercadopago.preferences.create({
      items: [
        {
          title: title,
          unit_price: parseFloat(unit_price),  // Garantir que o preço seja um número
          quantity: parseInt(quantity, 10),    // Garantir que a quantidade seja um número inteiro
          currency_id: 'ARS',  // Moeda correta para a Argentina
        },
      ],
      back_urls: {
        success: 'https://tusitio.com/success',  // URL de sucesso
        failure: 'https://tusitio.com/failure',  // URL de falha
        pending: 'https://tusitio.com/pending',  // URL de pendência
      },
      auto_return: 'approved',  // Retorno automático ao completar o pagamento
    });

    // Enviar o URL de pagamento gerado para o frontend
    res.status(200).json({ init_point: preference.body.init_point });
  } catch (error) {
    console.error('Erro ao criar a preferência:', error);
    res.status(500).json({ error: 'Erro ao criar preferência' });
  }
}
