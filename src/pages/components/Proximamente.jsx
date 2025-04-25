import { useEffect, useState } from 'react';
import { SlidersHorizontal } from 'lucide-react';
import './Proximamente.css';

export default function Proximamente() {
  const [timeLeft, setTimeLeft] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fecha real de lanzamiento (por ejemplo, 25 de mayo de 2025)
    const targetDate = new Date('2025-05-25T00:00:00');
  
    const updateTimer = () => {
      const now = new Date();
      const difference = targetDate - now;
  
      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
  
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / (1000 * 60)) % 60);
      const seconds = Math.floor((difference / 1000) % 60);
  
      setTimeLeft({ days, hours, minutes, seconds });
    };
  
    updateTimer(); // calcular imediatamente
  
    const interval = setInterval(updateTimer, 1000);
  
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 0);
  
    return () => {
      clearInterval(interval);
      clearTimeout(loadingTimeout);
    };
  }, []);

  return (
    <section className='proximamente-container'>
      <div className='box'>
        <SlidersHorizontal size={36} />
        <h1>Próximamente</h1>
        <p>Estamos preparando novedades...</p>
        <div className='timer'>
          {isLoading || !timeLeft ? (
              <div>
              </div>
            ) : (
            `${timeLeft.days}d ${timeLeft.hours}h ${timeLeft.minutes}m ${timeLeft.seconds}s`
          )}
        </div>
      </div>
    </section>
  );
}
