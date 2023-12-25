import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Carousel from './Carousel';

export default function Card({ foodName, rating, ImgSrc, price, Quantity }) {
  console.log(ImgSrc)
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
      <div className="card mt-3" style={{ width: '16rem', maxHeight: '360px' }}>
        <Carousel images={ImgSrc} id={carouselId} />
        <div className="card-body">
          <h5 className="card-title">{foodName}</h5>
          <p className="card-text">Rating: {rating}</p>
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
