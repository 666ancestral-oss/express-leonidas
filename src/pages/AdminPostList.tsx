import { Link } from 'react-router-dom';
import { Plus, Edit3, Trash2, FileText } from 'lucide-react';
import { useState } from 'react';
import { getPosts, deletePost } from '../services/blogService';
import styles from './AdminPostList.module.css';

export default function AdminPostList() {
  const [posts, setPosts] = useState(getPosts());

  function handleDelete(id: string) {
    if (!window.confirm('Tem certeza que deseja excluir este post?')) return;
    deletePost(id);
    setPosts(getPosts());
  }

  return (
    <div>
      <div className={styles.header}>
        <h2 className={styles.pageTitle}>Blog Posts</h2>
        <Link to="/admin/posts/new" className={styles.newBtn}>
          <Plus size={18} /> Novo Post
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className={styles.empty}>
          <FileText size={40} />
          <h3>Nenhum post ainda</h3>
          <p>Crie seu primeiro post de blog.</p>
          <Link to="/admin/posts/new" className={styles.newBtn}>
            <Plus size={18} /> Criar Primeiro Post
          </Link>
        </div>
      ) : (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Título</th>
                <th>Status</th>
                <th>Tags</th>
                <th>Data</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {posts.map(post => (
                <tr key={post.id}>
                  <td className={styles.titleCell}>{post.title}</td>
                  <td>
                    <span className={`${styles.badge} ${post.published ? styles.published : styles.draft}`}>
                      {post.published ? 'Publicado' : 'Rascunho'}
                    </span>
                  </td>
                  <td className={styles.tagsCell}>
                    {post.tags.slice(0, 3).map(tag => (
                      <span key={tag} className={styles.tag}>{tag}</span>
                    ))}
                  </td>
                  <td className={styles.dateCell}>
                    {post.publishedAt
                      ? new Date(post.publishedAt).toLocaleDateString('pt-BR')
                      : '—'}
                  </td>
                  <td>
                    <div className={styles.actions}>
                      <Link to={`/admin/posts/edit/${post.id}`} className={styles.actionBtn} title="Editar">
                        <Edit3 size={16} />
                      </Link>
                      <button className={styles.actionBtn} onClick={() => handleDelete(post.id)} title="Excluir">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
