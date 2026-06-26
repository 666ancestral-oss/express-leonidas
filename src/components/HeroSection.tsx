import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MessageCircle, Package, Star, Map, Clock } from 'lucide-react';
import { getWhatsAppUrl } from '../shared/constants';
import { getHeroConfig } from '../services/heroService';
import styles from './HeroSection.module.css';

function HeroSection() {
  const videoRef = useRef<HTMLIFrameElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const config = getHeroConfig();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVideoLoaded(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const whatsAppUrl = getWhatsAppUrl();

  return (
    <section ref={sectionRef} className={styles.hero} aria-label="Hero principal">
      <div className={styles.videoWrapper}>
        {config.type === 'video' && isVideoLoaded ? (
          <iframe
            ref={videoRef}
            className={styles.bgVideo}
            src={`https://www.youtube.com/embed/${config.videoUrl}?autoplay=1&mute=1&loop=1&playlist=${config.videoUrl}&controls=0&showinfo=0&autohide=1`}
            title="Vídeo institucional Expresso Leonidas"
            allow="autoplay; encrypted-media"
            loading="lazy"
          ></iframe>
        ) : config.type === 'image' && config.imageUrl ? (
          <img src={config.imageUrl} alt="" className={styles.bgImage} />
        ) : (
          <div className={styles.videoFallback} />
        )}
        <div
          className={styles.videoOverlay}
          style={{ opacity: config.overlayOpacity }}
        ></div>
      </div>

      <div className={`container ${styles.heroContainer}`}>
        <motion.div
          className={styles.content}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <motion.div
            className={styles.badge}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <span className={styles.badgePulse} aria-hidden="true"></span>
            Logística de Alta Performance
          </motion.div>

          <h1 className={styles.headline}>
            <span className={styles.brandFont}>Expresso Leonidas</span>
            <span className={styles.premiumSub}>Logística Premium</span>
          </h1>

          <p className={styles.subheadline}>
            Fretes e Transportes para todo o Brasil. Conectamos empresas, cargas e destinos com rapidez, tecnologia e segurança.
          </p>

          <div className={styles.ctaGroup}>
            <a href={whatsAppUrl} target="_blank" rel="noopener noreferrer" className={styles.primaryBtn}>
              Solicitar Cotação <ArrowRight size={20} aria-hidden="true" />
            </a>
            <a href={whatsAppUrl} target="_blank" rel="noopener noreferrer" className={styles.secondaryBtn}>
              <MessageCircle size={20} aria-hidden="true" /> Falar no WhatsApp
            </a>
          </div>
        </motion.div>

        <motion.div
          className={styles.indicators}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
        >
          <div className={styles.indicatorCard}>
            <Package size={24} className={styles.iconBlue} aria-hidden="true" />
            <div>
              <h4>+5.000</h4>
              <p>Entregas Realizadas</p>
            </div>
          </div>
          <div className={styles.indicatorCard}>
            <Star size={24} className={styles.iconOrange} aria-hidden="true" />
            <div>
              <h4>98%</h4>
              <p>Satisfação de Clientes</p>
            </div>
          </div>
          <div className={styles.indicatorCard}>
            <Map size={24} className={styles.iconBlue} aria-hidden="true" />
            <div>
              <h4>Nacional</h4>
              <p>Cobertura Completa</p>
            </div>
          </div>
          <div className={styles.indicatorCard}>
            <Clock size={24} className={styles.iconOrange} aria-hidden="true" />
            <div>
              <h4>24/7</h4>
              <p>Atendimento Rápido</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default HeroSection;
