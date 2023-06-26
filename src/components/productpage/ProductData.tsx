
import axios from "../../Apidata/ApiLink";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import "./ProductData.css";
import useProductData from "../../store/store";
import Navbar from "../navbar/Navbar";
import { ProductType } from "../cart/Cart";

const ProductData = () => {
  const navigate = useNavigate();
  // const [edata, setEdata] = useState([]);
  const edata: ProductType[] = useProductData((state: any) => state.zdata);
  const setEdata = useProductData((state: any) => state.setzdata);

  const fetchData = async () => {
    const respond = axios.get("/products");
    return respond;
  };
  const { data, isLoading, error } = useQuery("key", fetchData, {
    onSuccess(data) {
      setEdata(data?.data);
    },
  });

  return (
    <>
      <Navbar />

      <div className="products">
        {edata.map((value: ProductType, id: number) => (
          <div key={id} className="card">
            <img
              className="image"
              src={value.image}
              alt={value.title}
              onClick={() => {
                navigate(`/product/${value.id}`);
              }}
            />
            <h1 className="title">{value.title}</h1>
            <p className="price">{`$${value.price}`}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default ProductData;
