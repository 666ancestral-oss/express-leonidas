import React from 'react';
import { motion } from 'framer-motion';
import styles from './MapSection.module.css';

const MapSection: React.FC = () => {
  return (
    <section id="mapa" className={styles.section}>
      <div className={`container ${styles.container}`}>
        <div className={styles.content}>
          <h2>Cobertura em Todo o <span className="text-gradient">Brasil</span></h2>
          <p>
            Atendemos todo o território nacional com operações urbanas, intermunicipais e interestaduais, sempre com a máxima eficiência.
          </p>
        </div>
        
        <div className={styles.mapContainer}>
          <div className={styles.abstractMap}>
            {/* Abstract nodes representing cities */}
            <motion.div className={styles.node} style={{ top: '30%', left: '40%' }} animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2 }} />
            <motion.div className={styles.node} style={{ top: '50%', left: '60%' }} animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2.5 }} />
            <motion.div className={styles.node} style={{ top: '70%', left: '50%' }} animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1.8 }} />
            <motion.div className={styles.node} style={{ top: '40%', left: '75%' }} animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2.2 }} />
            <motion.div className={styles.node} style={{ top: '65%', left: '80%' }} animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2.1 }} />
            <motion.div className={styles.node} style={{ top: '80%', left: '65%' }} animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2.4 }} />

            {/* Connecting lines */}
            <svg className={styles.lines} width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
              <motion.path 
                d="M40,30 L60,50 L50,70 L80,65 L65,80 L50,70 L75,40 L60,50" 
                fill="none" 
                stroke="var(--color-blue-light)" 
                strokeWidth="0.5"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 0.5 }}
                viewport={{ once: true }}
                transition={{ duration: 3, ease: "easeInOut" }}
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MapSection;
