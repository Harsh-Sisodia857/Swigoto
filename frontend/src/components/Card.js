import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Carousel from './Carousel';
import ReactStars from 'react-rating-stars-component';
import { addToCart, removeFromCart } from '../store/slice/cartSlice';
import { useAlert } from 'react-alert'
import "../App.css"

export default function Card({ id, foodName, rating, ImgSrc, price, Quantity }) {
  const [qty, setQty] = useState(Quantity);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);
  const isInCart = cart.some((foodItem) => foodItem.id === id);
  const alert = useAlert()
  const handleClick = () => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
    } else {
      if (isInCart) {
        alert.show('Food Item Removed From Cart')
        console.log("Payload:", { id });
        dispatch(removeFromCart({ id })); 
      } else {
        alert.show('Food Item Added To Cart')
        console.log("Payload:", { id, foodName, rating, ImgSrc, price, quantity: qty });
        dispatch(addToCart({ id, foodName, rating, ImgSrc, price, quantity: qty }));       
      }
    }
  };

  const increaseQuantity = () => {
    setQty(qty + 1);
  };
  const decreaseQuantity = () => {
    if (qty <= 1) {
      alert.show("Food Item Never Be Zero")
      return;
    }
    setQty(qty - 1);
  };

  let finalPrice = parseInt(price);
  const carouselId = `carousel-${foodName.replace(/\s+/g, '-').toLowerCase()}`;

  return (
    <div>
      <div className="card mt-3" style={{ width: '16rem', maxHeight: '525px' }}>
        {ImgSrc.length ? (
          <Carousel images={ImgSrc} id={carouselId} />
        ) : (
          <Carousel id={carouselId} />
        )}
        <div className="card-body">
          <h5 className="card-title">{foodName}</h5>
          <ReactStars
            count={5}
            value={rating}
            size={24}
            isHalf={true}
            edit={false}
            activeColor="#ffd700"
          />
          
          <div className="d-flex" style={{alignItems : "baseline"}}>
            <div
              className="container w-100 p-0 detailsBlock-3-1-1"
              style={{ height: '38px' }}
            >
              <button onClick={decreaseQuantity}>-</button>
              <input readOnly type="number" value={qty} />
              <button onClick={increaseQuantity}>+</button>
            </div>
            <div className="d-inline ms-2 h-100 w-20 fs-5">
              ₹{finalPrice}/-
            </div>
          </div>
          <hr />
          <button class="button-42" onClick={handleClick}>
           { isInCart ? "Remove From Cart" : "Add to Cart" }</button>

        </div>
      </div>
    </div>
  );
}
