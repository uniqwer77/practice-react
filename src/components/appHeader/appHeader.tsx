import {NavLink, useNavigate } from 'react-router-dom';
// import './appHeader.css';
import {isAuthenticated, getCurrentUser, logoutUser} from '../../services/authService';

const AppHeader = () => {
    const navigate = useNavigate();
    const isAuth = isAuthenticated();
    const user = getCurrentUser();

    const handleLogout = () => {
        logoutUser();
        navigate('/login');
    };

    return (
        <header>
            <nav>
                <h4>
                    <NavLink end style={({isActive}) => ({color: isActive ? '#9f0013' : 'inherit'})} to="/">
                        Посты
                    </NavLink>
                </h4>

                <h4>
                    <NavLink end style={({isActive}) => ({color: isActive ? '#9f0013' : 'inherit'})}to="/create">
                        Создать пост
                    </NavLink>
                </h4>
            </nav>

            <div className="auth-block">
                {isAuth ? (
                    <>
                        <span>Привет, {user?.username}!</span>
                        <button onClick={handleLogout} className="logout-btn">
                            Выйти
                        </button>
                    </>
                ) : (
                    <>
                        <h4>
                            <NavLink style={({isActive}) => ({color: isActive ? '#9f0013' : 'inherit'})} to="/login">
                                Войти
                            </NavLink>
                        </h4>
                        <h4>
                            <NavLink style={({isActive}) => ({color: isActive ? '#9f0013' : 'inherit'})} to="/register">
                                Регистрация
                            </NavLink>
                        </h4>
                    </>
                )}
            </div>
        </header>
    );
}

export default AppHeader;