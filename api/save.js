// /pages/api/validate-payment.js o /api/validate-payment.ts

import { MercadoPagoConfig, Payment } from 'mercadopago';

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN,
});

export default async function handler(req, res) {
  const { payment_id } = req.query;

  if (!payment_id) {
    return res.status(400).json({ valid: false, error: 'Missing payment_id' });
  }

  try {
    const payment = await new Payment(client).get({ id: payment_id });

    if (payment.status === 'approved') {
      return res.status(200).json({ valid: true });
    } else {
      return res.status(200).json({ valid: false });
    }
  } catch (error) {
    console.error('Error al verificar pago:', error);
    return res.status(500).json({ valid: false });
  }
}
