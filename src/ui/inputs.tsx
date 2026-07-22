import './inputs.css';
import mail from './svg/mail.svg'; 

export default function Inputs() {
    return (
        <section style={{ maxWidth: '400px' }}>
            <input type="text" placeholder="Текстовый инпут" />

            <div className="input-icon">
                <img src={mail} width="16" height="16" alt="Почта" />
                <input type="email"placeholder="Email" />
            </div>

            <textarea placeholder="Текстовая область"></textarea>
        </section>
    );
}
