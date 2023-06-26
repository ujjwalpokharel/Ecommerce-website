import axios from "axios";
const newaxios = axios.create({
  baseURL: "https://fakestoreapi.com",
});

export default newaxios;
