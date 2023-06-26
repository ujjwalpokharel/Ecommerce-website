import React, { useState } from "react";
import useProductData, { IUseProductData } from "../../store/store";
import "./Cart.css";
import Navbar from "../navbar/Navbar";

export interface ProductType {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
  category: string;
}

const Cart = () => {
  const cartitem = useProductData((state: IUseProductData) => state.cartitems);
  const deleteCartItem = useProductData(
    (state: IUseProductData) => state.deleteCartItem
  );
  const DeleteData = (value: number) => deleteCartItem(value);
  const totalCartPrice = cartitem.reduce(
    (initialValues: number, items: ProductType) => initialValues + items.price,
    0
  );

  return (
    <>
      <Navbar />
      {cartitem.map((item: ProductType, index: number) => (
        <div className="cartitem" key={`${item.id}-${index}`}>
          <div className="cartitem__layot">
            <img
              className="cartitem__image"
              src={item.image}
              alt={item.title}
            />
            <p className="cartitem__title">{item.title}</p>
            <p className="cartitem__price">{`$${item.price}`}</p>

            <img
              className="cartitem__button"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTd8i7D4f1xsPh1gKWopzL6xnHrtMHPo_i4lA&usqp=CAU"
              alt="Delete"
              onClick={() => {
                DeleteData(item.id);
              }}
            />
          </div>
        </div>
      ))}
      <p className="cartitem__totalprice">
        {" "}
        Total price:{totalCartPrice.toFixed(2)}
      </p>
    </>
  );
};

export default Cart;
