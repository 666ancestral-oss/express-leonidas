import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar } from 'lucide-react';
import { getPostBySlug } from '../services/blogService';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from './BlogPostPage.module.css';

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;

  if (!post) {
    return (
      <div className="app-container">
        <Header />
        <main className={styles.notFound}>
          <h1>Post não encontrado</h1>
          <p>O artigo que você procura não existe ou foi removido.</p>
          <Link to="/blog" className={styles.backLink}>
            <ArrowLeft size={18} /> Voltar para o Blog
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="app-container">
      <Header />
      <main>
        <article className={styles.article}>
          <div className={styles.hero}>
            <div className={`container ${styles.heroInner}`}>
              <Link to="/blog" className={styles.backLink}>
                <ArrowLeft size={18} /> Voltar para o Blog
              </Link>
              <div className={styles.meta}>
                <span className={styles.date}>
                  <Calendar size={16} />
                  {new Date(post.publishedAt).toLocaleDateString('pt-BR')}
                </span>
                {post.tags.map(tag => (
                  <span key={tag} className={styles.tag}>{tag}</span>
                ))}
              </div>
              <h1 className={styles.title}>{post.title}</h1>
              <p className={styles.excerpt}>{post.excerpt}</p>
            </div>
          </div>

          {post.image && (
            <div className={styles.coverWrapper}>
              <div className={`container ${styles.coverContainer}`}>
                <img src={post.image} alt={post.title} className={styles.cover} />
              </div>
            </div>
          )}

          <div className={`container ${styles.content}`}>
            <div className={styles.contentInner}>
              {post.content.split('\n').map((line, i) => {
                if (line.trim().startsWith('## ')) {
                  return <h2 key={i} className={styles.contentH2}>{line.replace('## ', '')}</h2>;
                }
                if (line.trim().startsWith('### ')) {
                  return <h3 key={i} className={styles.contentH3}>{line.replace('### ', '')}</h3>;
                }
                if (line.trim() === '') return <br key={i} />;
                return <p key={i} className={styles.contentP}>{line}</p>;
              })}
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
