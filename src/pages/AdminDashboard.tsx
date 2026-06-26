import { Edit3, FileText, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getPosts } from '../services/blogService';
import styles from './AdminDashboard.module.css';

export default function AdminDashboard() {
  const posts = getPosts();
  const published = posts.filter(p => p.published).length;
  const drafts = posts.filter(p => !p.published).length;

  return (
    <div>
      <h2 className={styles.pageTitle}>Dashboard</h2>

      <div className={styles.stats}>
        <div className={styles.statCard}>
          <FileText size={28} />
          <div>
            <strong>{posts.length}</strong>
            <span>Total de Posts</span>
          </div>
        </div>
        <div className={styles.statCard}>
          <FileText size={28} />
          <div>
            <strong>{published}</strong>
            <span>Publicados</span>
          </div>
        </div>
        <div className={styles.statCard}>
          <FileText size={28} />
          <div>
            <strong>{drafts}</strong>
            <span>Rascunhos</span>
          </div>
        </div>
      </div>

      <div className={styles.actions}>
        <Link to="/admin/posts/new" className={styles.actionBtn}>
          <FileText size={20} />
          Novo Post
        </Link>
        <Link to="/admin/hero" className={styles.actionBtn} style={{ background: 'var(--color-gray-light)', color: 'var(--color-text)', border: '1px solid var(--color-gray-medium)' }}>
          <Edit3 size={20} />
          Editar Hero
        </Link>
        <a href="/blog" target="_blank" rel="noopener noreferrer" className={styles.actionBtn} style={{ background: 'transparent', color: 'var(--color-blue-medium)', border: '1px solid var(--color-blue-medium)' }}>
          <ExternalLink size={20} />
          Ver Blog
        </a>
      </div>
    </div>
  );
}
