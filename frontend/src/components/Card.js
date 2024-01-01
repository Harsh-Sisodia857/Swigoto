import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Carousel from './Carousel';
import ReactStars from 'react-rating-stars-component';
import { addToCart, removeFromCart } from '../store/slice/cartSlice';
import { updateFoodItem } from '../store/slice/foodItemSlice';
import { useAlert } from 'react-alert'
import { FaPencilAlt } from 'react-icons/fa'
import "../App.css"
import { setFoodItemAfterDeletion } from '../store/slice/foodItemSlice';

export default function Card({ id, foodName, rating, ImgSrc, price, Quantity }) {
  const [qty, setQty] = useState(Quantity);
  const [isEditing, setIsEditing] = useState(false);
  const [editedPrice, setEditedPrice] = useState(price);
  const [editedRating, setEditedRating] = useState(rating);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const role = user.role;
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

  const handleDelete = async () => {
    if (isInCart) {
      alert.show('Food Item Removed From Cart')
      console.log("Payload:", { id });
      dispatch(removeFromCart({ id }));
    } 

    const response = await fetch(`http://localhost:4000/api/dishes/${id}`, {
      method : "DELETE",
      headers: {
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({
        price: editedPrice,
        rating: editedRating
      })
    })
    const data = await response.json();
    dispatch(setFoodItemAfterDeletion(id))
    alert.show('Food Item Removed From Database')
    
  }

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

  const handleUpdate = () => {
      setIsEditing(true);
  };

  const handleEditChange = (event, field) => {
    switch (field) {
      case 'price':
        setEditedPrice(event.target.value);
        break;
      case 'rating':
        setEditedRating(event.target.value);
        break;
      default:
        break;
    }
  };

  const handleEditSubmit = async () => {
    const response = await fetch(`http://localhost:4000/api/dishes/${id}`, {
      method: "PUT",
      headers: {
        "auth-token": localStorage.getItem('token')
      }
    })
    const data = await response.json();
    console.log(data);
    console.log(`Update item with ID: ${id}, new price: ${editedPrice}, new rating: ${editedRating}`);
    setIsEditing(false);
    const editItems = {
      _id : id,
      price : editedPrice,
      rating : editedRating
    }
    dispatch(updateFoodItem(editItems))
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
          {isEditing ? (
            <input type="number" max={5} value={editedRating} onChange={(e) => handleEditChange(e, 'rating')} />
          ) : (
            <ReactStars
              count={5}
              value={rating}
              size={24}
              isHalf={true}
              edit={false}
              activeColor="#ffd700"
            />
          )}

          <div className="d-flex" style={{ alignItems: "center" }}>
            <div
              className="container w-100 p-0 detailsBlock-3-1-1"
              style={{ height: '38px' }}
            >
              {role !== 'admin' ? (
                <div>
                  <button onClick={decreaseQuantity}>-</button>
                  <input readOnly type="number" value={qty} />
                  <button onClick={increaseQuantity}>+</button>
                </div>
              ) : (
                isEditing ? (
                  <button style={{ padding: "0px 20px" }} className="button-42" onClick={handleEditSubmit}>
                    Submit
                  </button>
                ) : (
                  <button style={{ padding: "0px 20px" }} className="button-42" onClick={handleUpdate}>
                    <FaPencilAlt /> Update
                  </button>
                )
              )}
            </div>
            {isEditing ? (
              <input type="number" value={editedPrice} onChange={(e) => handleEditChange(e, 'price')} />
            ) : (
              <div className="d-inline ms-2 h-100 w-20 fs-5">
                ₹{finalPrice}/-
              </div>
            )}
          </div>
          <hr />


            <button className="button-42" onClick={handleClick}>
              {isInCart ? "Remove From Cart" : "Add to Cart"}
            </button>
        </div>
      </div>
    </div>

  );
}
