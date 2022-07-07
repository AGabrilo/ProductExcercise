import React, { useState, FC } from "react";
import './AddPage.css';

interface Props {
  handleSubmit: (name: string, price: number, quantity: number) => void;
}

const AddPage: FC<Props> = (props: Props) => {
  const [data, setData] = useState({
    name: '',
    price: 0,
    quantity: 0
  })

  const inputChange: (event: React.ChangeEvent<HTMLInputElement>) => void = (event) => {
    const { value, name } = event.target;
    setData({ ...data, [name]: value })
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    alert("Submitted!")
    props.handleSubmit(data.name, data.price, data.quantity);
  }
  return (
    <div className="container">
      <div className="add">
        <form onSubmit={handleSubmit} className="add_form">
          <h2 className="title">Add product</h2>
          <div className="product__field">
            <label className="product__label"><b>Name</b></label>
            <input className="product__input" type="text" name="name" onChange={inputChange} placeholder="Enter name of the product" id="psw" required />

          </div>
          <div className="product__field">
            <label className="product__label"><b>Price</b></label>
            <input className="product__input" type="number" name="price" onChange={inputChange} placeholder="Enter price" id="psw" required />
          </div>


          <div className="product__field">
            <label className="product__label"><b>Quantity</b></label>
            <input className="product__input" type="number" name="quantity" onChange={inputChange} placeholder="Enter quantity" id="psw-repeat" required />
          </div>
          <button type="submit" className="button product__submit" >Add product</button>

        </form>
      </div>
    </div>
  );
}

export default AddPage;