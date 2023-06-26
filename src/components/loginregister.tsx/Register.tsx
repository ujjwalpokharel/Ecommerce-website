import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { useMutation } from "react-query";
import "./Form.css";
import { useNavigate } from "react-router-dom";

interface InitialType {
  email: string;
  password: string;
}
const NewForm = () => {
  const navigate = useNavigate();

  const PostData = async (value: InitialType) => {
    const response = axios.post("http://localhost:8000/register", value);
    return response;
  };
  const { mutateAsync } = useMutation(PostData);

  const [register, setRegister] = useState(false);
  const initialValues: InitialType = {
    email: "",
    password: "",
  };

  const onSubmit = (value: InitialType, { resetForm }) => {
    console.log(value);
    const { email, password } = value;
    setRegister(true);
    mutateAsync(value);
    resetForm();
  };
  const formik = useFormik({
    initialValues,
    onSubmit,
  });

  return (
    <div className="header">
      <h1>Register</h1>

      <span>Welcome to Ecommerce site</span>
      <br />
      <br />
      <div className="formlayot">
        <form onSubmit={formik.handleSubmit}>
          <div className="title">
            <label htmlFor="email">Email</label>
          </div>
          <input
            type="email"
            className="formelement"
            name="email"
            id="email"
            placeholder="Enter your Email"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          <br />

          <div className="title">
            <label htmlFor="password">Password</label>
          </div>
          <input
            type="password"
            className="formelement"
            name="password"
            id="password"
            placeholder="Enter your password"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          <br />
          <button type="submit">SUBMIT</button>
        </form>
        <div>
          For SignIn <a onClick={() => navigate("/")}>SignIn?</a>
        </div>
        {register ? <p>Register successfully</p> : null}
      </div>
    </div>
  );
};

export default NewForm;
