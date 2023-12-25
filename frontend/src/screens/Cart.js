import React from 'react';
import { useSelector } from 'react-redux';

export default function Cart() {
  // Use useSelector to get the current state of the cart
  const {cart} = useSelector((state) => state.cart);
  console.log(cart)
  if (cart.length === 0) {
    return (
      <div className='initialPadding'>
        <div className='m-5 w-100 text-center fs-3'>The Cart is Empty!</div>
      </div>
    );
  }

  let totalPrice = cart.reduce((total, food) => total + food.price*food.quantity, 0);

  return (
    <div className='initialPadding'>
      <div className='container m-auto mt-5 table-responsive  table-responsive-sm table-responsive-md'>
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
                <td>{Number(food.price)} X {Number(food.quantity)} = {Number(food.price) * Number(food.quantity)}</td>
                <td>
                  {/* You can dispatch removeFromCart action here if needed */}
                  {/* <button type="button" className="btn p-0" onClick={() => dispatch(removeFromCart(food))}> */}
                  {/*   <DeleteIcon /> */}
                  {/* </button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <h1 className='fs-2'>Total Price: {totalPrice}/-</h1>
        </div>
        <div>
          {/* TO DO  */}
          {/* <button className='btn bg-success mt-5' onClick={handleCheckOut}> */}
          {/*   Check Out */}
          {/* </button> */}
        </div>
      </div>
    </div>
  );
}
