import './search.css';
import search from './svg/search.svg'; 

export default function Search() {
    return (
        <section style={{ maxWidth: '400px' }}>
            <div className="search">
                <input type="text" placeholder="Поиск по постам..." />

                <button>
                    <img src={search} width="16" height="16" alt="Поиск" />
                </button>
            </div>
        </section>
    );
}
