import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Carousel from './Carousel';
import ReactStars from "react-rating-stars-component";

export default function Card({ foodName, rating, ImgSrc, price, Quantity }) {
  const [qty, setQty] = useState(Quantity);
  const navigate = useNavigate();

  const handleClick = () => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
    }
  };

  const handleIncrement = () => {
    setQty(qty + 1);
  };

  let finalPrice = parseInt(price);
  const carouselId = `carousel-${foodName.replace(/\s+/g, '-').toLowerCase()}`;

  return (
    <div>
      <div className="card mt-3" style={{ width: '16rem', maxHeight: '525px' }}>
        {ImgSrc.length ? <Carousel images={ImgSrc} id={carouselId} /> : <Carousel id={carouselId} /> }
        <div className="card-body">
          <h5 className="card-title">{foodName}</h5>
          <ReactStars
            count={5}
            value={rating}
            size={24}
            isHalf={true}
            edit = {false}
            activeColor="#ffd700"
          />,
          <div className="container w-100 p-0" style={{ height: '38px' }}>
            <button className="btn btn-success me-2" onClick={handleIncrement} style={{ padding: '8px 12px', fontSize: '16px' }}>
              + {" "} {qty}
            </button>
            <div className="d-inline ms-2 h-100 w-20 fs-5">₹{finalPrice}/-</div>
          </div>
          <hr />
          <button className="btn btn-success justify-center ms-2" onClick={handleClick}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
