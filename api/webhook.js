import { MercadoPagoConfig, Payment } from 'mercadopago';

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('not allowed');
  }

  try {
    const { type, data } = req.body;

    if (type === 'payment') {
      const paymentId = data.id;

      const payment = await new Payment(client).get({ id: paymentId });

      if (payment.status === 'approved') {
        const externalReference = payment.external_reference;

        console.log(`Pago aprobado. Referencia externa: ${externalReference}`);

      } else {
        console.log(`Pago no aprobado. Estado actual: ${payment.status}`);
      }
    }

    res.status(200).send('ok');
  } catch (error) {
    console.error('Error en webhook:', error);
    res.status(500).send('internal error');
  }
}