import { motion, type Variants } from 'framer-motion';
import { Truck, PackageSearch, Building2, Cpu, Briefcase, Zap } from 'lucide-react';
import styles from './ServicesSection.module.css';

interface Service {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const services: Service[] = [
  {
    icon: <Truck size={32} />,
    title: 'Carga Fechada',
    description: 'Veículos dedicados exclusivamente para a sua carga, garantindo entrega direta e máxima segurança em todo o trajeto.'
  },
  {
    icon: <PackageSearch size={32} />,
    title: 'Carga Fracionada',
    description: 'A solução ideal para pequenos e médios volumes, compartilhando espaço e reduzindo custos operacionais.'
  },
  {
    icon: <Building2 size={32} />,
    title: 'Mudanças Comerciais',
    description: 'Transferência corporativa segura, minimizando o impacto nas operações e garantindo a integridade dos equipamentos.'
  },
  {
    icon: <Cpu size={32} />,
    title: 'Transporte de Máquinas',
    description: 'Logística especializada para equipamentos pesados e sensíveis, com veículos adaptados e equipe técnica.'
  },
  {
    icon: <Briefcase size={32} />,
    title: 'Logística Empresarial',
    description: 'Gestão completa da cadeia de suprimentos da sua empresa, desde a coleta até o destino final.'
  },
  {
    icon: <Zap size={32} />,
    title: 'Entregas Expressas',
    description: 'Quando o tempo é crucial. Soluções de transporte urgente para cumprir prazos críticos.'
  }
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' }
  }
};

function ServicesSection() {
  return (
    <section id="servicos" className={styles.servicesSection} aria-label="Serviços">
      <div className="container">
        <div className={styles.sectionHeader}>
          <h2 className={styles.title}>Nossas <span className="text-gradient">Soluções</span></h2>
          <p className={styles.subtitle}>
            Oferecemos um portfólio completo de serviços logísticos desenhados para atender as demandas mais exigentes do mercado.
          </p>
        </div>

        <motion.div
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {services.map((service, index) => (
            <motion.article key={index} className={styles.card} variants={itemVariants}>
              <div className={styles.iconWrapper} aria-hidden="true">
                {service.icon}
              </div>
              <h3 className={styles.cardTitle}>{service.title}</h3>
              <p className={styles.cardDescription}>{service.description}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default ServicesSection;
