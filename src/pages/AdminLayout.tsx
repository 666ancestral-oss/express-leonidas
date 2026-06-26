import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Edit3, FileText, ExternalLink, LogOut, Lock, Database } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import styles from '../components/AdminLayout.module.css';

export default function AdminLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/admin/login');
  }

  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarLogo}>
          <h1>Expresso Leonidas</h1>
          <span>Painel Administrativo</span>
        </div>

        <nav className={styles.sidebarNav}>
          <NavLink to="/admin" end className={({ isActive }) => `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}>
            <LayoutDashboard size={18} />
            Dashboard
          </NavLink>
          <NavLink to="/admin/hero" className={({ isActive }) => `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}>
            <Edit3 size={18} />
            Banner Hero
          </NavLink>
          <NavLink to="/admin/posts" className={({ isActive }) => `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}>
            <FileText size={18} />
            Blog Posts
          </NavLink>
          <NavLink to="/admin/seed" className={({ isActive }) => `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}>
            <Database size={18} />
            Gerar Posts Iniciais
          </NavLink>
          <NavLink to="/admin/password" className={({ isActive }) => `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}>
            <Lock size={18} />
            Alterar Senha
          </NavLink>
        </nav>

        <div className={styles.sidebarFooter}>
          <a href="/" target="_blank" rel="noopener noreferrer" className={styles.logoutBtn} style={{ marginBottom: '0.5rem' }}>
            <ExternalLink size={16} />
            Ver Site
          </a>
          <button onClick={handleLogout} className={styles.logoutBtn}>
            <LogOut size={16} />
            Sair
          </button>
        </div>
      </aside>

      <div className={styles.main}>
        <header className={styles.topBar}>
          <h2>Admin</h2>
          <a href="/" target="_blank" rel="noopener noreferrer" className={styles.viewSiteBtn}>
            <ExternalLink size={16} />
            Ver Site
          </a>
        </header>
        <div className={styles.content}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
