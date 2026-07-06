import './select.css';

export default function Select() {
    return (
        <section style={{ maxWidth: '400px' }}>
            <select>
                <option>Выберите категорию</option>
                <option>Технологии</option>
                <option>Дизайн</option>
                <option>Разработка</option>
            </select>

            <select>
                <option>Сортировка: новые</option>
                <option>Сначала старые</option>
            </select>

            <div className="tags-select">
                <span>
                    Технологии
                    ×
                </span>
                <span>
                    Дизайн
                    ×
                </span>
            </div>
        </section>
    );
}
