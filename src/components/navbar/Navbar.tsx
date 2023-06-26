import React, { SyntheticEvent, useState } from "react";
import "./Navbar.css";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import useProductData, { IUseProductData } from "../../store/store";
import { ProductType } from "../cart/Cart";
import Cookies from "universal-cookie/es6";
const cookies = new Cookies();
const Navbar = () => {
  const navigate = useNavigate();
  const formdata: string = useProductData(
    (state: IUseProductData) => state.searchdata
  );
  const setFormData = useProductData(
    (state: IUseProductData) => state.setSearchData
  );
  const cartitem = useProductData((state: IUseProductData) => state.cartitems);
  interface initial {
    search: string;
  }
  const initialValues: initial = {
    search: "",
  };
  const logout = () => {
    // destroy the cookie
    cookies.remove("Token");
    // redirect user to the landing page
    window.location.href = "/";
  };

  const onSubmit = () => {
    navigate("/specificproduct");
    setFormData(formik.values.search);
    formik.values.search = "";
  };
  console.log(formdata);
  const formik = useFormik({
    initialValues,
    onSubmit,
  });

  return (
    <div className="nav">
      <img
        className="logo"
        src="https://dlscenter.com/wp-content/uploads/2017/06/real-madrid-logo.png"
        alt="realmadrid"
        onClick={() => navigate("/")}
      />
      <p className="logotext">Los Blancos</p>

      <form className="formdata" onSubmit={formik.handleSubmit}>
        <input
          className="search"
          type="text"
          name="search"
          id="search"
          value={formik.values.search}
          onChange={formik.handleChange}
          placeholder="Search Products"
        />

        <button className="buttons" type="submit">
          search
        </button>
      </form>
      <img
        className="cartlogo"
        src="https://www.freeiconspng.com/thumbs/cart-icon/black-shopping-cart-icon-22.png"
        alt="cart"
        onClick={() => navigate("/cart")}
      />
      <p className="cardcount">{cartitem.length}</p>

      <button className="logoutbutton" onClick={() => logout()}>
        Log out
      </button>
    </div>
  );
};

export default Navbar;
