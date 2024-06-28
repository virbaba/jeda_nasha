import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductCard from './ProductCard';
import './ProductCardSlider.css';

export default function ProductCardSlider({ type, data }) {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    initialSlide: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  return (
    <div>
      <h2 className="brand-type"> {type.charAt(0).toUpperCase() + type.slice(1)} wine </h2>
      <Slider {...settings}>
        {data.map((item) => (
          <ProductCard
            key={item.id}
            id={item.id}
            type={type}
            winery={item.winery}
            wine={item.wine}
            rating={item.rating}
            image={item.image}
            price={item.price}
          />
        ))}
      </Slider>
    </div>
  );
}

