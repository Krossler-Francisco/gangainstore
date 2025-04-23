import React, { createContext, useContext, useState } from 'react';

const MercadoPagoContext = createContext();

export const MercadoPagoProvider = ({ children }) => {
  const [preferenceId, setPreferenceId] = useState(null);

  const createPreference = async (items) => {
    try {
      const res = await fetch('/api/create_preference', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items }),
      });

      const data = await res.json();

      if (data.preferenceId) {
        setPreferenceId(data.preferenceId);
      } else {
        alert('No se pudo iniciar el pago');
      }
    } catch (error) {
      console.error(error);
      alert('Error al procesar el pago');
    }
  };

  return (
    <MercadoPagoContext.Provider value={{ preferenceId, createPreference }}>
      {children}
    </MercadoPagoContext.Provider>
  );
};

export const useMercadoPago = () => useContext(MercadoPagoContext);
