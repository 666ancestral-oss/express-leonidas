import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';

import { getWhatsAppUrl } from '../shared/constants';
import styles from './Header.module.css';
import logo from '../assets/logo-transparent.png';

const NAV_ITEMS = [
  { href: '/#servicos', label: 'Serviços' },
  { href: '/#como-funciona', label: 'Como Funciona' },
  { href: '/#diferenciais', label: 'Diferenciais' },
  { href: '/#mapa', label: 'Atuação' },
  { href: '/blog', label: 'Blog' },
];

interface HeaderProps {
  variant?: 'home' | 'subpage';
}

function Header({ variant = 'home' }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
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

  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen(prev => !prev), []);

  return (
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
  );
}

export default Header;
