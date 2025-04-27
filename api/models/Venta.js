import mongoose from 'mongoose';

const VentaSchema = new mongoose.Schema({
  cliente: {
    fullname: String,
    email: String,
    phone: String,
    dni: String,
    street: String,
    city: String,
    province: String,
    zipcode: Number,
    details: String,
  },
  productos: [
    {
      id: String,
      name: String,
      price: Number,
      quantity: Number,
      img: String,
    }
  ],
  total: Number,
  estado: { type: String, default: 'pendiente' },
  fecha: { type: Date, default: Date.now }
});

export default mongoose.models.Venta || mongoose.model('Venta', VentaSchema);
