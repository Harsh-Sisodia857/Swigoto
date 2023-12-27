import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DeleteIcon from '@material-ui/icons/Delete';
import { removeFromCart } from '../store/slice/cartSlice';
import { Link, useNavigate } from "react-router-dom";
import { Typography } from "@material-ui/core";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import { useAlert } from 'react-alert'


export default function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert()
  const { cart } = useSelector((state) => state.cart);
  const checkoutHandler = () => {
    navigate("/shipping");
  };

  const handleDelete = (food) => {
    console.log(food)
    alert.show('Food Item Added To Cart')
    dispatch(removeFromCart(food))
  }

  if (cart.length === 0) {
    return (
      <div className='initialPadding'>
        <div className="emptyCart">
          <RemoveShoppingCartIcon />

          <Typography>No Dish in Your Cart</Typography>
          <Link to="/">View Dishes</Link>
        </div>
      </div>
    );
  }

  let totalPrice = cart.reduce((total, food) => total + food.price * food.quantity, 0);

  return (
    <div className='initialPadding'>
      <div className='container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md'>
        <table className='table table-hover '>
          <thead className=' text-success fs-4'>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>Name</th>
              <th scope='col'>Quantity</th>
              <th scope='col'>Price</th>
              <th scope='col'>Total Amount</th>
              <th scope='col'></th>
            </tr>
          </thead>
          <tbody>
            {cart.map((food, index) => (
              <tr key={index}>
                <th scope='row'>{index + 1}</th>
                <td>{food.foodName}</td>
                <td>{food.quantity}</td>
                <td>{food.price}</td>
                <td>
                  {Number(food.price)} X {Number(food.quantity)} = {Number(food.price) * Number(food.quantity)}
                </td>
                <td>
                  <button
                    type='button'
                    className='btn p-0'
                    onClick={() => handleDelete(food)}
                  >
                    <DeleteIcon />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className='d-flex justify-center' style={{alignItems : "center"}}>
          <h1 className='fs-2'>Total Price: ₹{totalPrice}/-</h1>
          <div className="checkOutBtn">
            <button onClick={checkoutHandler}>Check Out</button>
          </div>
        </div>
      </div>
    </div>
  );
}
