import { Star } from 'lucide-react';
import { motion } from 'framer-motion';
import styles from './TestimonialsSection.module.css';

const testimonials = [
  {
    name: 'Roberto Almeida',
    company: 'Tech Log SA',
    text: 'A Expresso Leonidas revolucionou nossa distribuição. A pontualidade e o sistema de rastreamento são impecáveis.'
  },
  {
    name: 'Carla Dias',
    company: 'Indústria Mega',
    text: 'Profissionalismo do início ao fim. As cargas sempre chegam intactas e dentro do prazo estipulado. Recomendo muito.'
  },
  {
    name: 'Fernando Costa',
    company: 'Comércio Rápido',
    text: 'O atendimento é fantástico. Tivemos uma urgência e a equipe resolveu nossa demanda em tempo recorde.'
  }
];

function TestimonialsSection() {
  return (
    <section className={styles.section} aria-label="Depoimentos de clientes">
      <div className={`container ${styles.container}`}>
        <div className={styles.header}>
          <h2>Aprovado por <span className="text-gradient">Líderes</span></h2>
          <p>Veja o que as empresas dizem sobre a nossa parceria.</p>
        </div>

        <div className={styles.carousel} role="region" aria-roledescription="carousel" aria-label="Depoimentos">
          {testimonials.map((test, index) => (
            <motion.figure
              key={index}
              className={styles.card}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              role="group"
              aria-roledescription="depoimento"
            >
              <div className={styles.stars} aria-label="5 estrelas">
                {[1, 2, 3, 4, 5].map(star => (
                  <Star key={star} size={18} fill="var(--color-orange-gold)" color="var(--color-orange-gold)" aria-hidden="true" />
                ))}
              </div>
              <blockquote className={styles.text}>
                <p>"{test.text}"</p>
              </blockquote>
              <figcaption className={styles.author}>
                <div className={styles.avatar} aria-hidden="true">{test.name.charAt(0)}</div>
                <div>
                  <strong>{test.name}</strong>
                  <span>{test.company}</span>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TestimonialsSection;
