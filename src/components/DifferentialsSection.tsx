import React from 'react';
import { motion } from 'framer-motion';
import { Zap, MapPin, ShieldCheck, Users, Activity, Clock, Headphones, Lightbulb } from 'lucide-react';
import styles from './DifferentialsSection.module.css';

const differentials = [
  { icon: <Zap size={24} />, title: 'Atendimento Ágil' },
  { icon: <MapPin size={24} />, title: 'Cobertura Nacional' },
  { icon: <ShieldCheck size={24} />, title: 'Seguro de Carga' },
  { icon: <Users size={24} />, title: 'Motoristas Qualificados' },
  { icon: <Activity size={24} />, title: 'Monitoramento em Tempo Real' },
  { icon: <Clock size={24} />, title: 'Pontualidade Garantida' },
  { icon: <Headphones size={24} />, title: 'Suporte Especializado' },
  { icon: <Lightbulb size={24} />, title: 'Logística Inteligente' }
];

const DifferentialsSection: React.FC = () => {
  return (
    <section id="diferenciais" className={styles.section}>
      <div className={`container ${styles.container}`}>
        <div className={styles.header}>
          <h2>Nossos <span className="text-gradient">Diferenciais</span></h2>
          <p>O que nos torna a escolha certa para a sua empresa.</p>
        </div>

        <div className={styles.grid}>
          {differentials.map((item, index) => (
            <motion.div 
              key={index}
              className={styles.card}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
            >
              <div className={styles.icon}>{item.icon}</div>
              <h3 className={styles.cardTitle}>{item.title}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DifferentialsSection;
