import './Pagination.css';

interface PaginationProps {
    totalProducts: number;
    productsPerPage: number;
    paginate: (n: number) => void;
}

const Pagination = (props: PaginationProps) => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(props.totalProducts / props.productsPerPage); i++) {
        pageNumbers.push(i);
    }
    return (
        <div className="pagination">
            {pageNumbers.map(number => (
                <button key={number} className="paginate_buttons"><a onClick={() => props.paginate(number)} href="#!">{number}</a></button>
            ))}
        </div>
    )

}

export default Pagination;