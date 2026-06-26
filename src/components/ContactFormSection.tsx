import { type FormEvent, useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SITE_CONFIG } from '../shared/constants';
import styles from './ContactFormSection.module.css';

interface FormData {
  nome: string;
  empresa: string;
  telefone: string;
  tipoCarga: string;
  origem: string;
  destino: string;
  mensagem: string;
}

const INITIAL_FORM: FormData = {
  nome: '',
  empresa: '',
  telefone: '',
  tipoCarga: '',
  origem: '',
  destino: '',
  mensagem: '',
};

function ContactFormSection() {
  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');

  function validate(): boolean {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (!form.nome.trim()) newErrors.nome = 'Nome é obrigatório';
    if (!form.telefone.trim()) newErrors.telefone = 'Telefone é obrigatório';
    if (!form.tipoCarga) newErrors.tipoCarga = 'Selecione o tipo de carga';
    if (!form.origem.trim()) newErrors.origem = 'Origem é obrigatória';
    if (!form.destino.trim()) newErrors.destino = 'Destino é obrigatório';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setSubmitError('');

    setIsSubmitting(true);

    try {
      const res = await fetch('https://formspree.io/f/xojodnor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        throw new Error('Erro ao enviar mensagem');
      }

      setSubmitted(true);
      setForm(INITIAL_FORM);
    } catch {
      setSubmitError('Erro ao enviar. Tente novamente ou envie um email diretamente para ' + SITE_CONFIG.email);
    } finally {
      setIsSubmitting(false);
    }
  }

  function setField<K extends keyof FormData>(key: K, value: FormData[K]) {
    setForm(prev => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors(prev => ({ ...prev, [key]: undefined }));
  }

  return (
    <section className={styles.section} aria-label="Formulário de cotação">
      <div className={`container ${styles.container}`}>
        <div className={styles.content}>
          <h2>Pronto para <span className="text-gradient">otimizar sua logística?</span></h2>
          <p>
            Sua carga merece uma logística de alto nível. Receba uma cotação personalizada em poucos minutos.
          </p>
          <div className={styles.contactInfo}>
            <div className={styles.infoBox}>
              <h3 className={styles.infoTitle}>Atendimento Personalizado</h3>
              <p>Retornamos em até 24 horas úteis.</p>
            </div>
            <div className={styles.infoBox}>
              <h3 className={styles.infoTitle}>Preço Justo</h3>
              <p>O melhor custo-benefício para a sua rota.</p>
            </div>
          </div>
        </div>

        <div className={styles.formContainer}>
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                className={styles.successMessage}
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              >
                <div className={styles.successIcon}>
                  <CheckCircle size={48} />
                </div>
                <h3 className={styles.successTitle}>Mensagem Enviada!</h3>
                <p className={styles.successText}>
                  Obrigado pelo contato! Recebemos sua solicitação de cotação e em breve retornaremos com uma proposta personalizada.
                </p>
                <p className={styles.successGreeting}>
                  Tenha um excelente dia! <span aria-hidden="true">&#x1F44B;</span>
                </p>
                <button
                  className={styles.submitBtn}
                  onClick={() => setSubmitted(false)}
                  style={{ marginTop: '1.5rem' }}
                >
                  Enviar Nova Cotação
                </button>
              </motion.div>
            ) : (
          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <div className={styles.row}>
              <div className={styles.formGroup}>
                <label htmlFor="nome">Nome Completo</label>
                <input
                  id="nome"
                  type="text"
                  placeholder="Seu nome"
                  required
                  value={form.nome}
                  onChange={e => setField('nome', e.target.value)}
                  aria-invalid={!!errors.nome}
                  aria-describedby={errors.nome ? 'error-nome' : undefined}
                />
                {errors.nome && <span id="error-nome" className={styles.error} role="alert">{errors.nome}</span>}
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="empresa">Empresa</label>
                <input
                  id="empresa"
                  type="text"
                  placeholder="Nome da empresa"
                  value={form.empresa}
                  onChange={e => setField('empresa', e.target.value)}
                />
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.formGroup}>
                <label htmlFor="telefone">Telefone / WhatsApp</label>
                <input
                  id="telefone"
                  type="tel"
                  placeholder="(00) 00000-0000"
                  required
                  value={form.telefone}
                  onChange={e => setField('telefone', e.target.value)}
                  aria-invalid={!!errors.telefone}
                  aria-describedby={errors.telefone ? 'error-telefone' : undefined}
                />
                {errors.telefone && <span id="error-telefone" className={styles.error} role="alert">{errors.telefone}</span>}
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="tipoCarga">Tipo de Carga</label>
                <select
                  id="tipoCarga"
                  required
                  value={form.tipoCarga}
                  onChange={e => setField('tipoCarga', e.target.value)}
                  aria-invalid={!!errors.tipoCarga}
                  aria-describedby={errors.tipoCarga ? 'error-tipoCarga' : undefined}
                >
                  <option value="">Selecione</option>
                  <option value="fechada">Carga Fechada</option>
                  <option value="fracionada">Carga Fracionada</option>
                  <option value="maquinas">Máquinas / Equipamentos</option>
                  <option value="mudanca">Mudança Comercial</option>
                  <option value="outro">Outro</option>
                </select>
                {errors.tipoCarga && <span id="error-tipoCarga" className={styles.error} role="alert">{errors.tipoCarga}</span>}
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.formGroup}>
                <label htmlFor="origem">Origem (Cidade/UF)</label>
                <input
                  id="origem"
                  type="text"
                  placeholder="Ex: São Paulo, SP"
                  required
                  value={form.origem}
                  onChange={e => setField('origem', e.target.value)}
                  aria-invalid={!!errors.origem}
                  aria-describedby={errors.origem ? 'error-origem' : undefined}
                />
                {errors.origem && <span id="error-origem" className={styles.error} role="alert">{errors.origem}</span>}
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="destino">Destino (Cidade/UF)</label>
                <input
                  id="destino"
                  type="text"
                  placeholder="Ex: Rio de Janeiro, RJ"
                  required
                  value={form.destino}
                  onChange={e => setField('destino', e.target.value)}
                  aria-invalid={!!errors.destino}
                  aria-describedby={errors.destino ? 'error-destino' : undefined}
                />
                {errors.destino && <span id="error-destino" className={styles.error} role="alert">{errors.destino}</span>}
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="mensagem">Mensagem ou Detalhes (Opcional)</label>
              <textarea
                id="mensagem"
                placeholder="Detalhes sobre peso, volume ou necessidades especiais..."
                rows={4}
                value={form.mensagem}
                onChange={e => setField('mensagem', e.target.value)}
              ></textarea>
            </div>

            {submitError && <div className={styles.error} role="alert">{submitError}</div>}
            <button
              type="submit"
              className={styles.submitBtn}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Enviando...' : 'Receber Cotação'}
            </button>
          </form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

export default ContactFormSection;
