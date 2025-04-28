
const shippingPrices = [
  { from: 1000, to: 1499, zone: "CABA", price: "20" },
  { from: 1500, to: 1899, zone: "GBA Norte", price: "3250" },
  { from: 1900, to: 1999, zone: "GBA Sur", price: "3240" },
  { from: 2000, to: 2999, zone: "Santa Fe y Entre Ríos", price: "4570" },
  { from: 3000, to: 3999, zone: "Noreste (Chaco, Formosa, Corrientes, Misiones)", price: "8160" },
  { from: 4000, to: 4999, zone: "Noroeste (Salta, Jujuy, Tucumán, Santiago del Estero, Catamarca)", price: "8680" },
  { from: 5000, to: 5999, zone: "Córdoba", price: "4540" },
  { from: 6000, to: 6999, zone: "Buenos Aires Interior", price: "4080" },
  { from: 7000, to: 7999, zone: "Costa Atlántica y Sur de Buenos Aires", price: "6980" },
  { from: 8000, to: 8999, zone: "Patagonia Norte (Neuquén, Río Negro, La Pampa)", price: "9200" },
  { from: 9000, to: 9999, zone: "Patagonia Sur (Chubut, Santa Cruz, Tierra del Fuego)", price: "12000" }
];

export function getShippingPriceByZipcode(cp) {
  const priceInfo = shippingPrices.find(item => cp >= item.from && cp <= item.to);
  if (priceInfo) {
    return {
      zone: priceInfo.zone,
      price: Number(priceInfo.price)
    };
  } else {
    return {
      zone: null,
      price: null
    };
  }
}
