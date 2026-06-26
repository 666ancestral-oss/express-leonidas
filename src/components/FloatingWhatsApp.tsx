import { Phone } from 'lucide-react';
import { getWhatsAppUrl } from '../shared/constants';
import styles from './FloatingWhatsApp.module.css';

function FloatingWhatsApp() {
  return (
    <a
      href={getWhatsAppUrl()}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.floatingBtn}
      aria-label="Falar no WhatsApp"
    >
      <div className={styles.pulseRing} aria-hidden="true"></div>
      <Phone size={28} aria-hidden="true" />
    </a>
  );
}

export default FloatingWhatsApp;
