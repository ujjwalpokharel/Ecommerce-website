import React, { useState } from "react";
import "./Description.css";
import { useParams } from "react-router-dom";
import axios from "../../Apidata/ApiLink";
import { useQuery } from "react-query";
import Navbar from "../navbar/Navbar";
import useProductData, { IUseProductData } from "../../store/store";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Description = () => {
  const { productId } = useParams();

  const cartitem = useProductData((state: IUseProductData) => state.cartitems);
  const setCartItem = useProductData(
    (state: IUseProductData) => state.setCartItems
  );

  const fetchData = async () => {
    const respond = axios.get(`/products/${productId}`);
    return respond;
  };
  const { data, isLoading, error } = useQuery("new", fetchData);

  return (
    <>
      <Navbar />

      <div className="productdata">
        <Carousel className="carousel">
          <img
            className="images"
            src={data?.data.image}
            alt={data?.data.title}
          />
          <img
            className="images"
            src={data?.data.image}
            alt={data?.data.title}
          />
          <img
            className="images"
            src={data?.data.image}
            alt={data?.data.title}
          />
        </Carousel>
        <div className="productdatalayot">
          <h1 className="productdatalayot__titles">{data?.data.title}</h1>

          <p className="productdatalayot__descriptions">
            {data?.data.description}
          </p>
          <p className="productdatalayot__prices">{`$${data?.data.price}`}</p>
          <button
            className="productdatalayot__cartbutton"
            onClick={() => {
              setCartItem(data?.data);
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </>
  );
};

export default Description;
