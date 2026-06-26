import { Link } from 'react-router-dom';
import { Calendar, Tag, ArrowRight, FileText } from 'lucide-react';
import { getPublishedPosts } from '../services/blogService';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';
import styles from './BlogList.module.css';

export default function BlogList() {
  const posts = getPublishedPosts();

  return (
    <div className="app-container">
      <Header />
      <main>
        <section className={styles.hero}>
          <div className={`container ${styles.heroInner}`}>
            <h1>Blog</h1>
            <p>Dicas, novidades e conteúdos sobre logística e transporte de cargas.</p>
          </div>
        </section>

        <section className={styles.listSection}>
          <div className="container">
            {posts.length === 0 ? (
              <div className={styles.empty}>
                <FileText size={48} />
                <h2>Nenhum post publicado ainda</h2>
                <p>Em breve traremos conteúdo exclusivo sobre logística e transporte.</p>
              </div>
            ) : (
              <div className={styles.grid}>
                {posts.map(post => (
                  <Link to={`/blog/${post.slug}`} key={post.id} className={styles.card}>
                    {post.image && (
                      <div className={styles.cardImage}>
                        <img src={post.image} alt={post.title} loading="lazy" />
                      </div>
                    )}
                    <div className={styles.cardBody}>
                      <div className={styles.cardMeta}>
                        <span className={styles.date}>
                          <Calendar size={14} />
                          {new Date(post.publishedAt).toLocaleDateString('pt-BR')}
                        </span>
                        {post.tags.length > 0 && (
                          <span className={styles.tags}>
                            <Tag size={14} />
                            {post.tags.slice(0, 2).join(', ')}
                          </span>
                        )}
                      </div>
                      <h2 className={styles.cardTitle}>{post.title}</h2>
                      <p className={styles.cardExcerpt}>{post.excerpt}</p>
                      <span className={styles.readMore}>
                        Ler mais <ArrowRight size={16} />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
