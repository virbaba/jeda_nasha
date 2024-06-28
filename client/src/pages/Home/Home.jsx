import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllWineData } from "../../redux-toolkit/ProductList/ProductListSlice";
import "./Home.css";
import HomeImage from "./wine.png";
import Brand from "../../components/Brand";
import ProductCardSlider from "../Product/ProductCardSlider";
import Footer from "../../components/Footer";

const Home = () => {
  const dispatch = useDispatch();
  const { wines, fetched } = useSelector((state) => state.wines);

  const api = [
    { url: import.meta.env.VITE_RED_VINE_URL, type: "reds" },
    { url: import.meta.env.VITE_WHITE_VINE_URL, type: "whites" },
    { url: import.meta.env.VITE_SPARKLING_VINE_URL, type: "sparkling" },
    { url: import.meta.env.VITE_ROSE_VINE_URL, type: "rose" },
    { url: import.meta.env.VITE_DESSERT_VINE_URL, type: "dessert" },
    { url: import.meta.env.VITE_PORT_VINE_URL, type: "port" },
  ];

  useEffect(() => {
    if (!fetched) {
      dispatch(fetchAllWineData(api));
    }
  }, [dispatch, fetched]);

  return (
    <>
      <Brand />
      <div className="home">
        <div className="part-1">
          <h4>Elegant Winery</h4>
          <h1>A Promise of Excellence</h1>
          <p>
            Welcome to our wine haven! Explore a curated selection of fine wines
            from around the world, perfect for any occasion. Whether you're a
            connoisseur or a casual enthusiast, our easy-to-navigate site offers
            detailed descriptions, expert reviews, and personalized
            recommendations to enhance your wine experience. Sip, savor, and
            discover the perfect bottle with us. Cheers!
          </p>
        </div>
        <div className="part-2">
          <div className="img-1">
            <img src={HomeImage} alt="" />
          </div>
          <div className="img-2">
            <img src={HomeImage} alt="" />
          </div>
        </div>
      </div>

      <div id="shop">
        {wines?.map((item, index) => (
          <ProductCardSlider key={index} type={item.type} data={item.value} />
        ))}
      </div>

      <Footer />
    </>
  );
};

export default Home;
