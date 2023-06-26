import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useProductData, { IUseProductData } from "../../store/store";
import Navbar from "../navbar/Navbar";
import { useQuery } from "react-query";
import axios from "../../Apidata/ApiLink";
import { ProductType } from "../cart/Cart";

const MenClothing = () => {
  const searchdata = useProductData(
    (state: IUseProductData) => state.searchdata
  );

  const navigate = useNavigate();
  const fetchdata = async () => {
    const respond = axios.get("/products");
    return respond;
  };
  const { data, isLoading } = useQuery("data", fetchdata);

  return (
    <>
      <Navbar />

      <div className="products">
        {data?.data
          .filter(
            (product: ProductType) =>
              product.title.toUpperCase().includes(searchdata.toUpperCase()) ||
              product.category.toUpperCase().includes(searchdata.toUpperCase())
          )
          .map((value: ProductType, id: number) => (
            <div key={id} className="card">
              <img
                className="image"
                src={value?.image}
                alt={value?.title}
                onClick={() => {
                  navigate(`/product/${value?.id}`);
                }}
              />
              <h1 className="title">{value?.title}</h1>
              <p className="price">{`$${value?.price}`}</p>
            </div>
          ))}
      </div>
    </>
  );
};

export default MenClothing;
