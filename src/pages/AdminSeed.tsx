import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Database, CheckCircle, ArrowLeft } from 'lucide-react';
import { createPost } from '../services/blogService';
import { SEED_POSTS } from '../services/blogService';
import styles from './AdminSeed.module.css';

export default function AdminSeed() {
  const [done, setDone] = useState(false);
  const [count, setCount] = useState(0);
  const navigate = useNavigate();

  function handleSeed() {
    let created = 0;
    for (const post of SEED_POSTS) {
      createPost(post);
      created++;
    }
    setCount(created);
    setDone(true);
  }

  return (
    <div>
      <button onClick={() => navigate('/admin')} className={styles.backBtn}>
        <ArrowLeft size={18} /> Voltar
      </button>

      <h2 className={styles.pageTitle}>Gerar Posts Iniciais</h2>

      {!done ? (
        <div className={styles.card}>
          <Database size={40} className={styles.icon} />
          <p className={styles.text}>
            Este assistente vai criar <strong>6 posts</strong> otimizados para SEO sobre logística e transporte,
            prontos para serem publicados no blog da Expresso Leonidas.
          </p>
          <button className={styles.seedBtn} onClick={handleSeed}>
            <Database size={20} /> Gerar Posts Agora
          </button>
        </div>
      ) : (
        <div className={styles.card}>
          <CheckCircle size={48} className={styles.checkIcon} />
          <h3 className={styles.successTitle}>{count} posts criados com sucesso!</h3>
          <p className={styles.text}>
            Os posts já estão disponíveis no blog e no painel administrativo.
          </p>
          <div className={styles.actions}>
            <button onClick={() => navigate('/admin/posts')} className={styles.actionBtn}>
              Gerenciar Posts
            </button>
            <a href="/blog" target="_blank" rel="noopener noreferrer" className={styles.actionBtn} style={{ background: 'transparent', color: 'var(--color-blue-medium)', border: '1px solid var(--color-blue-medium)' }}>
              Ver Blog
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
