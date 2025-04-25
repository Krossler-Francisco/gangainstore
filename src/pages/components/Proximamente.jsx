import { useEffect, useState } from 'react';
import { Link, SlidersHorizontal } from 'lucide-react';
import './Proximamente.css';
import "./Navbar.css"

export default function Proximamente() {
  const [timeLeft, setTimeLeft] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Calcular próximo domingo a las 00:00
    const getNextSundayMidnight = () => {
      const now = new Date();
      const dayOfWeek = now.getDay(); // 0 = domingo, 1 = lunes, ..., 6 = sábado
      const daysUntilSunday = (7 - dayOfWeek) % 7 || 7; // si hoy es domingo, ir al próximo
      const nextSunday = new Date(now);
      nextSunday.setDate(now.getDate() + daysUntilSunday);
      nextSunday.setHours(0, 0, 0, 0);
      return nextSunday;
    };

    const targetDate = getNextSundayMidnight();

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

    updateTimer();

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
        <p>27.04.25</p>
        <div className='timer'>
          {isLoading || !timeLeft ? (
            <div></div>
          ) : (
            `${timeLeft.days}d ${timeLeft.hours}h ${timeLeft.minutes}m ${timeLeft.seconds}s`
          )}
        </div>
      </div>
    </section>
  );
}
