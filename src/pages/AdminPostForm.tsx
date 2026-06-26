import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, Image } from 'lucide-react';
import { getPostById, createPost, updatePost } from '../services/blogService';
import styles from './AdminPostForm.module.css';

export default function AdminPostForm() {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();
  const fileRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    title: '',
    excerpt: '',
    content: '',
    tags: '',
    seoTitle: '',
    seoDescription: '',
    published: false,
  });
  const [image, setImage] = useState('');
  const [preview, setPreview] = useState('');
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');
  const [processing, setProcessing] = useState(false);
  const [compressionInfo, setCompressionInfo] = useState('');

  useEffect(() => {
    if (isEdit && id) {
      const post = getPostById(id);
      if (post) {
        setForm({
          title: post.title,
          excerpt: post.excerpt,
          content: post.content,
          tags: post.tags.join(', '),
          seoTitle: post.seoTitle,
          seoDescription: post.seoDescription,
          published: post.published,
        });
        setImage(post.image);
        setPreview(post.image);
      }
    }
  }, [isEdit, id]);

  useEffect(() => {
    if (saved) {
      const t = setTimeout(() => setSaved(false), 2000);
      return () => clearTimeout(t);
    }
  }, [saved]);

  function setField(key: string, value: string | boolean) {
    setForm(prev => ({ ...prev, [key]: value }));
  }

  function processImage(file: File): Promise<{ dataUrl: string; originalSize: number; finalSize: number }> {
    return new Promise<{ dataUrl: string; originalSize: number; finalSize: number }>((resolve, reject) => {
      const img = document.createElement('img');
      img.onload = () => {
        const MAX_DIM = 1200;
        let { width, height } = img;

        if (width > MAX_DIM || height > MAX_DIM) {
          if (width > height) {
            height = Math.round(height * MAX_DIM / width);
            width = MAX_DIM;
          } else {
            width = Math.round(width * MAX_DIM / height);
            height = MAX_DIM;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d')!;
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(blob => {
          if (!blob) { reject(new Error('Falha ao processar imagem')); return; }
          const reader = new FileReader();
          reader.onload = () => resolve({
            dataUrl: reader.result as string,
            originalSize: file.size,
            finalSize: blob.size,
          });
          reader.readAsDataURL(blob);
        }, 'image/webp', 0.85);
      };
      img.onerror = () => reject(new Error('Falha ao carregar imagem'));
      img.src = URL.createObjectURL(file);
    });
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setError('');
    setProcessing(true);
    setCompressionInfo('');

    try {
      const { dataUrl, originalSize, finalSize } = await processImage(file);
      setPreview(dataUrl);
      setImage(dataUrl);

      const origKb = (originalSize / 1024).toFixed(1);
      const finalKb = (finalSize / 1024).toFixed(1);
      const pct = Math.round((1 - finalSize / originalSize) * 100);
      setCompressionInfo(`${origKb}KB → ${finalKb}KB (${pct}% menor)`);
    } catch {
      setError('Erro ao processar imagem. Tente outro arquivo.');
    } finally {
      setProcessing(false);
    }
  }

  function handleSave() {
    setError('');
    setSaved(false);

    const tags = form.tags.split(',').map(t => t.trim()).filter(Boolean);

    const data = {
      title: form.title,
      excerpt: form.excerpt,
      content: form.content,
      tags,
      image,
      seoTitle: form.seoTitle || form.title,
      seoDescription: form.seoDescription || form.excerpt,
      published: form.published,
    };

    let result;
    if (isEdit && id) {
      result = updatePost(id, data);
    } else {
      result = createPost(data);
    }

    if (!result.success) {
      setError('Erro ao salvar o post. O armazenamento local pode estar cheio. Tente usar uma imagem menor.');
      return;
    }

    if (!result.imageSaved && image) {
      setError('Post salvo, mas a imagem não pôde ser armazenada (espaço insuficiente). Tente usar uma imagem menor.');
    }

    setSaved(true);
    if (!isEdit) {
      setTimeout(() => navigate('/admin/posts'), 1500);
    }
  }

  return (
    <div>
      <button onClick={() => navigate('/admin/posts')} className={styles.backBtn}>
        <ArrowLeft size={18} /> Voltar
      </button>

      <h2 className={styles.pageTitle}>{isEdit ? 'Editar Post' : 'Novo Post'}</h2>

      <div className={styles.grid}>
        <div className={styles.mainCard}>
          <div className={styles.field}>
            <label htmlFor="title">Título do Post</label>
            <input
              id="title"
              type="text"
              value={form.title}
              onChange={e => setField('title', e.target.value)}
              placeholder="Digite o título"
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="excerpt">Descrição Curta (excerpt)</label>
            <textarea
              id="excerpt"
              rows={3}
              value={form.excerpt}
              onChange={e => setField('excerpt', e.target.value)}
              placeholder="Resumo que aparece na listagem do blog"
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="content">Conteúdo</label>
            <textarea
              id="content"
              rows={12}
              value={form.content}
              onChange={e => setField('content', e.target.value)}
              placeholder="Escreva o conteúdo do post aqui..."
            />
          </div>
        </div>

        <div className={styles.sideCard}>
          <div className={styles.field}>
            <label>Imagem de Capa</label>
            <div className={styles.uploadArea} onClick={() => fileRef.current?.click()}>
              {preview ? (
                <img src={preview} alt="Preview" className={styles.preview} />
              ) : (
                <div className={styles.uploadPlaceholder}>
                  <Image size={32} />
                  <span>{processing ? 'Comprimindo...' : 'Clique para enviar'}</span>
                </div>
              )}
            </div>
            <input ref={fileRef} type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
            {processing && <p className={styles.compressing}>Redimensionando e convertendo para WebP...</p>}
            {compressionInfo && <p className={styles.compressionInfo}>{compressionInfo}</p>}
          </div>

          <div className={styles.field}>
            <label>Tags (separadas por vírgula)</label>
            <input
              type="text"
              value={form.tags}
              onChange={e => setField('tags', e.target.value)}
              placeholder="logística, frete, transporte"
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="seoTitle">SEO - Título</label>
            <input
              id="seoTitle"
              type="text"
              value={form.seoTitle}
              onChange={e => setField('seoTitle', e.target.value)}
              placeholder="SEO title (opcional)"
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="seoDescription">SEO - Descrição</label>
            <textarea
              id="seoDescription"
              rows={2}
              value={form.seoDescription}
              onChange={e => setField('seoDescription', e.target.value)}
              placeholder="Meta description (opcional)"
            />
          </div>

          <label className={styles.checkbox}>
            <input
              type="checkbox"
              checked={form.published}
              onChange={e => setField('published', e.target.checked)}
            />
            Publicar imediatamente
          </label>

          {error && <p className={styles.error}>{error}</p>}

          <button className={styles.saveBtn} onClick={handleSave}>
            <Save size={18} /> {saved ? 'Salvo!' : 'Salvar'}
          </button>
        </div>
      </div>
    </div>
  );
}
