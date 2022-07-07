import { useState, FC, useMemo } from "react";
import { Column, useTable } from "react-table";
import './TablePage.css';
import Pagination from "../Pagination/Pagination";

interface Props {
    products: Product[];
    changeTotal: (n: number, s: string, qu: number) => void;
    handleDelete: (s: string) => void;
    pay: number;

}
interface Product {
    name: string;
    price: number;
    quantity: number;
}

const TablePage: FC<Props> = (props: Props) => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [productsPerPage] = useState<number>(5)
    const columns: Array<Column<Product>> = useMemo(
        () => [
            {
                Header: 'Name',
                accessor: 'name',
            },
            {
                Header: 'Price',
                accessor: 'price',
            },
            {
                Header: 'Quantity',
                accessor: 'quantity',
            },


        ],
        []
    );

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = props.products.slice(indexOfFirstProduct, indexOfLastProduct);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    const handleClick = (price: number, name: string, quantity: number) => {
        if (quantity !== 0) {
            const quantityX = quantity - 1;
            props.changeTotal(price, name, quantityX);
            ;
        }
        else {
            alert("No more");
        }
    }

    const handleDelete = (price: number, name: string, quantity: number) => {
        props.handleDelete(name);
    }

    const tableHooks = (hooks: any) => {
        hooks.visibleColumns.push((columns: Array<Column<Product>>) => [
            ...columns,
            {
                id: "Buy",
                Header: "Buy",
                Cell: ({ row }: any) => (
                    <button className="table_buttons" onClick={() => { handleClick(row.values.price, row.values.name, row.values.quantity) }}>Buy</button>
                ),
            },
            {
                id: "Delete",
                Header: "Delete",
                Cell: ({ row }: any) => (
                    <button className="table_buttons" onClick={() => { handleDelete(row.values.price, row.values.name, row.values.quantity) }}>Delete</button>
                ),
            },
        ]);
    };
    const tableInstance = useTable({ columns: columns, data: currentProducts }, tableHooks);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = tableInstance;

    return (
        <div className="container">
            <div className="viewTable">
                <table id="products" {...getTableProps()}  >

                    <thead>
                        {headerGroups.map(headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map(column => (
                                    <th {...column.getHeaderProps()} >
                                        {column.render('Header')}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>

                    <tbody {...getTableBodyProps()}>
                        {rows.map(row => {
                            prepareRow(row)
                            return (
                                <tr {...row.getRowProps()}>
                                    {row.cells.map(cell => {
                                        return (
                                            <td {...cell.getCellProps()}>
                                                {cell.render('Cell')}
                                            </td>
                                        )
                                    })}
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <Pagination productsPerPage={productsPerPage} totalProducts={props.products.length} paginate={paginate} />
                <h1>Total: {props.pay}</h1>
            </div>
        </div>
    );
}

export default TablePage;