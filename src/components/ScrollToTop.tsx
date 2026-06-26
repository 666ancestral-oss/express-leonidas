import { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';
import styles from './ScrollToTop.module.css';

function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  function handleClick() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <button
      onClick={handleClick}
      className={`${styles.btn} ${visible ? styles.visible : ''}`}
      aria-label="Voltar ao topo"
    >
      <ChevronUp size={18} />
    </button>
  );
}

export default ScrollToTop;
