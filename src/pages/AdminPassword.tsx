import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import styles from './AdminPassword.module.css';

export default function AdminPassword() {
  const { changePassword } = useAuth();
  const navigate = useNavigate();
  const [current, setCurrent] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!current || !newPassword || !confirm) {
      setError('Preencha todos os campos.');
      return;
    }
    if (newPassword.length < 6) {
      setError('A nova senha deve ter no mínimo 6 caracteres.');
      return;
    }
    if (newPassword !== confirm) {
      setError('A nova senha e a confirmação não conferem.');
      return;
    }
    if (!changePassword(current, newPassword)) {
      setError('Senha atual incorreta.');
      return;
    }

    setMessage('Senha alterada com sucesso!');
    setCurrent('');
    setNewPassword('');
    setConfirm('');
  }

  return (
    <div>
      <button onClick={() => navigate('/admin')} className={styles.backBtn}>
        <ArrowLeft size={18} /> Voltar
      </button>

      <h2 className={styles.pageTitle}>Alterar Senha</h2>

      <div className={styles.card}>
        <Lock size={36} className={styles.lockIcon} />

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label htmlFor="current">Senha Atual</label>
            <input
              id="current"
              type="password"
              value={current}
              onChange={e => setCurrent(e.target.value)}
              placeholder="Digite a senha atual"
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="newPassword">Nova Senha</label>
            <input
              id="newPassword"
              type="password"
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              placeholder="Mínimo de 6 caracteres"
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="confirm">Confirmar Nova Senha</label>
            <input
              id="confirm"
              type="password"
              value={confirm}
              onChange={e => setConfirm(e.target.value)}
              placeholder="Repita a nova senha"
            />
          </div>

          {error && (
            <div className={styles.feedbackError}>
              <AlertCircle size={16} /> {error}
            </div>
          )}

          {message && (
            <div className={styles.feedbackSuccess}>
              <CheckCircle size={16} /> {message}
            </div>
          )}

          <button type="submit" className={styles.saveBtn}>
            <Lock size={18} /> Alterar Senha
          </button>
        </form>
      </div>
    </div>
  );
}
