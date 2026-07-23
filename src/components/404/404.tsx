import {Link} from 'react-router-dom';

import styles from './404.module.css';

const Error = () => {
    return (
        <div className={styles.center}>
            <h1>404 — Страница не найдена</h1>
            <Link to={'/'}>
                <p>Вернуться на главную</p>
            </Link>
        </div>
    )
}

export default Error;