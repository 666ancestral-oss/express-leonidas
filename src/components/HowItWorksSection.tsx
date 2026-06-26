import { motion } from 'framer-motion';
import styles from './HowItWorksSection.module.css';

const steps = [
  { id: 1, title: 'Solicite sua cotação', desc: 'Preencha os dados e receba atendimento.' },
  { id: 2, title: 'Receba uma proposta personalizada', desc: 'Nossa equipe enviará a melhor opção.' },
  { id: 3, title: 'Coleta da carga', desc: 'Veículo direcionado ao local com agilidade.' },
  { id: 4, title: 'Acompanhe em tempo real', desc: 'Monitoramento 24h pelo nosso sistema.' },
  { id: 5, title: 'Entrega concluída', desc: 'Sua carga no destino com segurança.' }
];

function HowItWorksSection() {
  return (
    <section id="como-funciona" className={styles.section} aria-label="Como funciona">
      <div className={`container ${styles.container}`}>
        <div className={styles.header}>
          <h2>Como <span className="text-gradient">Funciona</span></h2>
          <p>Processo simples, transparente e focado em resultados.</p>
        </div>

        <ol className={styles.timeline}>
          {steps.map((step, index) => (
            <motion.li
              key={step.id}
              className={styles.step}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
            >
              <div className={styles.lineIndicator}>
                <div className={styles.dot}>
                  <div className={styles.innerDot} />
                </div>
                {index < steps.length - 1 && <div className={styles.line} />}
              </div>
              <div className={styles.content}>
                <span className={styles.stepNumber}>Passo 0{step.id}</span>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export default HowItWorksSection;
