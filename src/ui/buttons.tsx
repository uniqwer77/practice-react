import './buttons.css';
import arrowSvg from './svg/arrow-right.svg'; 

export default function Buttons() {
    return (
        <section style={{ maxWidth: '400px' }}>
            <button className="btn btn-primary">Основная кнопка</button>
            <button className="btn btn-secondary">Вторичная кнопка</button>
            <button className="btn btn-danger">Удалить</button>
            
            <a href="#" className="text-link">
                Текстовая ссылка
                <img src={arrowSvg} className='arrow' width="16" height="16" alt="Стрелка вправо" />
            </a>
            
            <button className="btn btn-disabled" disabled>
                Неактивная кнопка
            </button>
        </section>
    );
}
