import connectToDatabase from './db';
import mongoose from 'mongoose';

export default async function handler(req, res) {
  try {
    await connectToDatabase();

    const SaleSchema = new mongoose.Schema({}, { strict: false });
    const Sale = mongoose.models.Sale || mongoose.model('Sale', SaleSchema, 'ventas');

    const sales = await Sale.find({});

    res.status(200).json(sales);
  } catch (error) {
    console.error('Error al buscar ventas:', error);
    res.status(500).json({ message: 'Error al buscar ventas', error: error.message });
  }
}