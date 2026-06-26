import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import styles from './AdminLogin.module.css';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (!password.trim()) {
      setError('Digite a senha');
      return;
    }
    if (login(password)) {
      navigate('/admin');
    } else {
      setError('Senha incorreta');
    }
  }

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginCard}>
        <h1>Acesso Administrativo</h1>
        <p>Entre com sua senha para acessar o painel.</p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="admin-password">Senha</label>
          <input
            id="admin-password"
            type="password"
            placeholder="Digite a senha"
            value={password}
            onChange={e => setPassword(e.target.value)}
            autoFocus
          />
          {error && <p className={styles.error}>{error}</p>}
          <button type="submit" className={styles.loginBtn}>Entrar</button>
        </form>
      </div>
    </div>
  );
}
