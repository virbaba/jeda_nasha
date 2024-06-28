import React, {useRef} from "react";
import "./Brand.css";
import Red from './image/red.png';
import White from './image/white.png';
import Sparkling from './image/sparkling.png';
import Rose from './image/rose.png';
import Dessert from './image/desert.png';
import Port from './image/port.png';
import { useNavigate } from "react-router-dom";


const Brand = () => {
  const navigate = useNavigate();
  const handleClick = (type) => {
    navigate(`/product-list`, { state: { type } });
  }
  return (
    <div className="brand">
      <div className="brand-1 b-1" onClick={()=> handleClick("reds")}>
        <img src={Red} alt="Brand 1" />
        <h2>Red</h2>
      </div>
      <div className="brand-2 b-1" onClick={()=> handleClick("whites")}>
        <img src={White} alt="Brand 2" />
        <h2>White</h2>
      </div>
      <div className="brand-3 b-1" onClick={()=> handleClick("sparkling")}>
        <img src={Sparkling} alt="Brand 3" />
        <h2>Sparkling</h2>
      </div>
      <div className="brand-4 b-2" onClick={()=> handleClick("rose")}>
        <img src={Rose} alt="Brand 4" />
        <h2>Rose</h2>
      </div>
      <div className="brand-5 b-2" onClick={()=> handleClick("dessert")}>
        <img src={Dessert} alt="Brand 5" />
        <h2>Dessert</h2>
      </div>
      <div className="brand-6 b-2" onClick={()=> handleClick("port")}>
        <img src={Port} alt="Brand 6" />
        <h2>Port</h2>
      </div>
    </div>
  );
};

export default Brand;
