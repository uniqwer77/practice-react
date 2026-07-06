import './burger.css';

export default function Burger() {
    return (
        <section style={{ maxWidth: '400px' }}>
            <button className="burger">
                <span></span>
                <span></span>
                <span></span>
            </button>
        </section>
    );
}
