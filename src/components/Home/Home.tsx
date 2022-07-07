import { useState, useEffect } from "react";
import Navigation from "../Navigation/Navigation";
import { Routes, Route } from 'react-router-dom';
import AddPage from "../AddProduct/AddPage";
import TablePage from "../DisplayProduct/TablePage";
import productsContext from '../contexts/productsContext';

interface Product {
  name: string;
  price: number;
  quantity: number;
}

function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [pay, setPay] = useState<number>(0);

  const handleSubmit = (n: string, p: number, q: number) => {
    setProducts(prod => ([...prod, { name: n, price: p, quantity: q }]));
  };




  const changeTotal = (n: number, name: string, qu: number) => {
    setPay((pay) => Number(pay) + Number(n));
    setProducts((products) => products.map((item) => {
      if (item.name === name) {
        return { name: item.name, price: item.price, quantity: qu }
      } else return item;
    }));
  }

  const handleDelete = (n: string) => {
    setProducts((products) => products.filter(item => item.name !== n));
  }


  useEffect(() => {
  }, [products, pay]);

  return (
    <productsContext.Provider value={products}>
      <div>
        <Navigation />
        <Routes>
          <Route path="/" element={<AddPage handleSubmit={handleSubmit} />} />
          <Route path="tablePage" element={<TablePage products={products} handleDelete={handleDelete} changeTotal={changeTotal} pay={pay} />} />
        </Routes>

      </div>
    </productsContext.Provider>

  );
}

export default Home;