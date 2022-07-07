import { createContext } from 'react';


interface Product {
    name: string;
    price: number;
    quantity: number;
}


const productsContext = createContext<Product[]>([]);

export default productsContext;