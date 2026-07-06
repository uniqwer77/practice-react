import './checkbox.css';

export default function Checkbox() {
    return (
        <section style={{ maxWidth: '400px' }}>
            <label>
                <input type="checkbox" defaultChecked />
                Опубликовать пост
            </label>

            <label>
                <input type="checkbox" />
                Показывать в ленте
            </label>

            <label>
                <input type="radio" name="access" defaultChecked />
                Открытый доступ
            </label>

            <label>
                <input type="radio" name="access" />
                Только для меня
            </label>
        </section>
    );
}
