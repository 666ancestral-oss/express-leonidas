import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';

import { getWhatsAppUrl, SITE_CONFIG } from '../shared/constants';
import styles from './Header.module.css';
import logo from '../assets/logo-transparent.png';

const NAV_ITEMS = [
  { href: '/#servicos', label: 'Serviços' },
  { href: '/#como-funciona', label: 'Como Funciona' },
  { href: '/#diferenciais', label: 'Diferenciais' },
  { href: '/#mapa', label: 'Atuação' },
  { href: '/blog', label: 'Blog' },
];

const WEEKDAYS = ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado'];
const MONTHS = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];

function getGreeting(h: number): string {
  if (h < 12) return 'Bom dia';
  if (h < 18) return 'Boa tarde';
  return 'Boa noite';
}

function formatDateTime(d: Date): string {
  const h = d.getHours().toString().padStart(2, '0');
  const m = d.getMinutes().toString().padStart(2, '0');
  return `${WEEKDAYS[d.getDay()]}, ${d.getDate()} de ${MONTHS[d.getMonth()]} — ${h}:${m}`;
}

interface HeaderProps {
  variant?: 'home' | 'subpage';
}

function Header({ variant = 'home' }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [now, setNow] = useState(new Date());
  const [weather, setWeather] = useState('');
  const isSubpage = variant === 'subpage';

  useEffect(() => {
    if (isSubpage) return;
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isSubpage]);

  useEffect(() => {
    if (isSubpage) return;
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen, isSubpage]);

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const lat = SITE_CONFIG.address.includes('São Paulo') ? -23.5505 : -15.7975;
    const lon = SITE_CONFIG.address.includes('São Paulo') ? -46.6333 : -47.8919;
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code&timezone=auto`)
      .then(r => r.json())
      .then(d => {
        const codes: Record<number, string> = {
          0: 'Céu limpo', 1: 'Parcialmente nublado', 2: 'Nublado', 3: 'Encoberto',
          45: 'Nevoeiro', 48: 'Nevoeiro', 51: 'Chuvisco', 61: 'Chuva', 71: 'Neve',
          80: 'Pancadas de chuva', 95: 'Tempestade',
        };
        const desc = codes[d.current.weather_code] || '';
        setWeather(`${d.current.temperature_2m}°C ${desc}`);
      })
      .catch(() => {});
  }, []);

  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen(prev => !prev), []);

  return (
    <>
      <div className={styles.topbar}>
        <span>{getGreeting(now.getHours())}! {" "}{formatDateTime(now)}</span>
        {weather && <span>{weather}</span>}
      </div>
      <header className={`${styles.header} ${!isSubpage && isScrolled ? styles.scrolled : ''} ${isSubpage ? styles.subpage : ''}`}>
        <div className={`container ${styles.inner}`}>
          <Link to="/" className={styles.logo} aria-label="Página inicial">
            <img src={logo} alt="Expresso Leonidas" />
          </Link>

          {!isSubpage && (
            <>
              <button
                className={styles.hamburger}
                onClick={toggle}
                aria-expanded={isOpen}
                aria-controls="nav-overlay"
                aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
              >
                <span className={`${styles.hamburgerLine} ${isOpen ? styles.open : ''}`} />
                <span className={`${styles.hamburgerLine} ${isOpen ? styles.open : ''}`} />
              </button>

              <nav
                id="nav-overlay"
                className={`${styles.overlay} ${isOpen ? styles.overlayVisible : ''}`}
                aria-label="Navegação principal"
              >
                <div className={styles.overlayInner}>
                  <ul className={styles.navList}>
                    {NAV_ITEMS.map((item, i) => (
                      <li
                        key={item.href}
                        className={styles.navItem}
                        style={{ transitionDelay: isOpen ? `${i * 0.06}s` : '0s' }}
                      >
                        <a href={item.href} className={styles.navLink} onClick={close}>
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                  <a
                    href={getWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.cta}
                    onClick={close}
                  >
                    Solicitar Cotação
                  </a>
                </div>
              </nav>
            </>
          )}
        </div>
      </header>
    </>
  );
}

export default Header;
