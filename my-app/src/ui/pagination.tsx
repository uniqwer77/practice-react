import './pagination.css';
import chevronLeft from './svg/chevron-left.svg'; 
import chevronRight from './svg/chevron-right.svg'; 

export default function Pagination() {
    return (
        <section style={{ maxWidth: '400px' }}>
            <div className="pagination">
                <button>
                    <img src={chevronLeft} width="16" height="16" alt="Стрелка влево" />
                </button>

                <button className="active">1</button>
                <button>2</button>
                <button>3</button>
                <span>...</span>
                <button>10</button>

                <button>
                    <img src={chevronRight} width="16" height="16" alt="Стрелка вправо" />
                </button>
            </div>
        </section>
    );
}
