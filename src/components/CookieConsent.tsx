import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X } from 'lucide-react';
import styles from './CookieConsent.module.css';

const STORAGE_KEY = '@expressoleonidas/cookie-consent';
type ConsentChoice = 'all' | 'essential';

function getStoredConsent(): ConsentChoice | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'all' || stored === 'essential') return stored;
  } catch {
    // localStorage unavailable
  }
  return null;
}

function setStoredConsent(choice: ConsentChoice) {
  try {
    localStorage.setItem(STORAGE_KEY, choice);
  } catch {
    // localStorage unavailable
  }
}

function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const existing = getStoredConsent();
    if (!existing) {
      const timer = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  function acceptAll() {
    setStoredConsent('all');
    setVisible(false);
  }

  function rejectNonEssential() {
    setStoredConsent('essential');
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className={styles.banner}
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          role="dialog"
          aria-label="Preferências de cookies"
          aria-modal="false"
        >
          <div className={styles.inner}>
            <div className={styles.iconWrapper}>
              <Cookie size={24} aria-hidden="true" />
            </div>

            <div className={styles.textContent}>
              <p className={styles.title}>Este site utiliza cookies</p>
              <p className={styles.description}>
                Utilizamos cookies para melhorar sua experiência, analisar o tráfego
                do site e exibir conteúdo relevante. Consulte nossa{' '}
                <a href="/privacidade" className={styles.link}>
                  Política de Privacidade
                </a>{' '}
                para mais informações.
              </p>
            </div>

            <div className={styles.actions}>
              <button
                className={styles.rejectBtn}
                onClick={rejectNonEssential}
                aria-label="Recusar cookies não essenciais"
              >
                Recusar não essenciais
              </button>
              <button
                className={styles.acceptBtn}
                onClick={acceptAll}
                aria-label="Aceitar todos os cookies"
              >
                Aceitar todos
              </button>
            </div>

            <button
              className={styles.closeBtn}
              onClick={rejectNonEssential}
              aria-label="Fechar banner de cookies"
            >
              <X size={20} aria-hidden="true" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default CookieConsent;
