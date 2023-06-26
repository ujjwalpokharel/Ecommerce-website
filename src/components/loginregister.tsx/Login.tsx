import { useFormik } from "formik";
import React from "react";
import { useState } from "react";
import "./Form.css";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { useMutation } from "react-query";

interface InitialType {
  email: string;
  password: string;
}
const cookies = new Cookies();
const Form = () => {
  const navigate = useNavigate();
  const [logvalue, setLogvalue] = useState(false);
  const PostData = async (data: InitialType) => {
    try {
      const response = await axios.post("http://localhost:8000/login", data);
      cookies.set("Token", response.data.token, { path: "/" });
      window.location.href = "/product";
    } catch (error) {
      console.log(error);
    }
  };
  const { mutateAsync } = useMutation(PostData);
  const initialValues: InitialType = {
    email: "",
    password: "",
  };

  const onSubmit = (value: InitialType, { resetForm }) => {
    // const { email, password } = value;
    // axios
    //   .post("http://localhost:8000/login", { email, password })
    //   .then((result) => {
    //     cookies.set("Token", result.data.token, { path: "/" });

    //     console.log(result);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    mutateAsync(value);
    setLogvalue(true);
    resetForm();
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Required"),
    password: Yup.string().required("Required"),
  });

  const formik = useFormik({
    initialValues,
    onSubmit,

    validationSchema,
  });

  return (
    <div className="body">
      <div className="header">
        <h1>Sign In </h1>
        <span>Welcome to Ecommerce site</span>
      </div>

      <div className="formlayot">
        <form onSubmit={formik.handleSubmit}>
          <div className="title">
            <label htmlFor="email">Email </label>
          </div>
          <input
            className="formelement"
            type="email"
            name="email"
            id="email"
            placeholder="Enter your Email"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          <br />

          <div className="title">
            <label htmlFor="password">Password </label>
          </div>
          <input
            className="formelement"
            type="password"
            name="password"
            id="password"
            placeholder="Enter your Password"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          <br />

          <button type="submit">SUBMIT</button>
        </form>
        {logvalue ? <p>LogIn successfully</p> : null}
        <br />
        <br />
        <div>
          For register <a onClick={() => navigate("/register")}>Register?</a>
        </div>
      </div>
    </div>
  );
};

export default Form;
