import {NavLink, useNavigate } from 'react-router-dom';
import styles from './AppHeader.module.css';
import {isAuthenticated, getCurrentUser, logoutUser} from '../../services/authService';

const AppHeader = () => {
    const navigate = useNavigate();
    const isAuth = isAuthenticated();
    const user = getCurrentUser();

    const handleLogout = () => {
        logoutUser();
        navigate('/login');
    };

    const getLinkClass = ({ isActive }: { isActive: boolean }) =>
        isActive ? `${styles.link} ${styles.active}` : styles.link;

    return (
        <header className={styles.header}>
        <div className={styles.container}>

            <nav className={styles.nav}>
            <NavLink end className={getLinkClass} to="/">
                Посты
            </NavLink>
            <NavLink end className={getLinkClass} to="/create">
                Создать пост
            </NavLink>
            </nav>

            <div className={styles.authBlock}>
            {isAuth ? (
                <div className={styles.userInfo}>
                <span className={styles.username}>Привет, {user?.username}!</span>
                <button onClick={handleLogout} className={styles.logoutBtn}>
                    Выйти
                </button>
                </div>
            ) : (
                <nav className={styles.authNav}>
                <NavLink className={getLinkClass} to="/login">
                    Войти
                </NavLink>
                <NavLink className={getLinkClass} to="/register">
                    Регистрация
                </NavLink>
                </nav>
            )}
            </div>
        </div>
        </header>
    );
}

export default AppHeader;