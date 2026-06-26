import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Image, Video } from 'lucide-react';
import { getHeroConfig, saveHeroConfig } from '../services/heroService';
import type { HeroConfig } from '../services/types';
import styles from './AdminHeroEditor.module.css';

export default function AdminHeroEditor() {
  const [config, setConfig] = useState<HeroConfig>(getHeroConfig());
  const [saved, setSaved] = useState(false);
  const [preview, setPreview] = useState(config.imageUrl);
  const fileRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (saved) {
      const t = setTimeout(() => setSaved(false), 2000);
      return () => clearTimeout(t);
    }
  }, [saved]);

  function handleSave() {
    saveHeroConfig(config);
    setSaved(true);
  }

  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      setPreview(dataUrl);
      setConfig(prev => ({ ...prev, imageUrl: dataUrl, type: 'image' }));
    };
    reader.readAsDataURL(file);
  }

  return (
    <div>
      <button onClick={() => navigate('/admin')} className={styles.backBtn}>
        <ArrowLeft size={18} /> Voltar
      </button>

      <h2 className={styles.pageTitle}>Editar Banner Hero</h2>

      <div className={styles.card}>
        <div className={styles.field}>
          <label>Tipo de Mídia</label>
          <div className={styles.toggle}>
            <button
              className={`${styles.toggleBtn} ${config.type === 'video' ? styles.toggleActive : ''}`}
              onClick={() => setConfig(prev => ({ ...prev, type: 'video' }))}
            >
              <Video size={18} /> Vídeo YouTube
            </button>
            <button
              className={`${styles.toggleBtn} ${config.type === 'image' ? styles.toggleActive : ''}`}
              onClick={() => setConfig(prev => ({ ...prev, type: 'image' }))}
            >
              <Image size={18} /> Imagem
            </button>
          </div>
        </div>

        {config.type === 'video' && (
          <div className={styles.field}>
            <label htmlFor="videoUrl">ID do Vídeo YouTube</label>
            <input
              id="videoUrl"
              type="text"
              value={config.videoUrl}
              onChange={e => setConfig(prev => ({ ...prev, videoUrl: e.target.value }))}
              placeholder="Ex: 35ZOZSx7wBk"
            />
            <span className={styles.hint}>ID que aparece após <code>watch?v=</code> no YouTube</span>
          </div>
        )}

        {config.type === 'image' && (
          <div className={styles.field}>
            <label>Imagem de Fundo</label>
            <div className={styles.uploadArea} onClick={() => fileRef.current?.click()}>
              {preview ? (
                <img src={preview} alt="Preview" className={styles.preview} />
              ) : (
                <div className={styles.uploadPlaceholder}>
                  <Image size={40} />
                  <span>Clique para enviar uma imagem</span>
                </div>
              )}
            </div>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: 'none' }}
            />
          </div>
        )}

        <div className={styles.field}>
          <label htmlFor="overlayOpacity">Opacidade do Overlay: {Math.round(config.overlayOpacity * 100)}%</label>
          <input
            id="overlayOpacity"
            type="range"
            min="0.3"
            max="0.95"
            step="0.05"
            value={config.overlayOpacity}
            onChange={e => setConfig(prev => ({ ...prev, overlayOpacity: parseFloat(e.target.value) }))}
          />
        </div>

        <button className={styles.saveBtn} onClick={handleSave}>
          <Save size={18} /> {saved ? 'Salvo!' : 'Salvar Alterações'}
        </button>
      </div>
    </div>
  );
}
