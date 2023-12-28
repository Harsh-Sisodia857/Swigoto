import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./ConfirmOrder.css";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";

const ConfirmOrder = () => {
  const { shipping } = useSelector((state) => state.shipping);
  const shippingInfo = shipping[0];
  const { cart: cartItems } = useSelector((state) => state.cart);
  console.log(cartItems)
  const [user, setUser] = useState(null);
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/user/getUser", {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
          }
        });
        const json = await response.json();
        if (json.success) {
          setUser(json.user);
        } else {
          console.log("Error fetching User Data");
        }
      } catch (error) {
        console.error("Error fetching User Data", error);
      }
    };

    fetchData();
  }, []);

  const shippingCharges = subtotal > 1000 ? 0 : 200;
  const tax = subtotal * 0.18;
  const totalPrice = subtotal + tax + shippingCharges;

  const address = shippingInfo
    ? `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`
    : "";

  const proceedToPayment = async () => {
    const data = {
      subtotal,
      shippingCharges,
      tax,
      totalPrice,
    };

    try {
      const response = await fetch("http://localhost:4000/api/order", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token'),
        },
        body: JSON.stringify({
          shippingInfo: {
            address: shippingInfo?.address || "",
            city: shippingInfo?.city || "",
            state: shippingInfo?.state || "",
            country: shippingInfo?.country || "",
            pinCode: shippingInfo?.pinCode || "",
            phoneNo: shippingInfo?.phoneNo || "",
          },
          foodItems: cartItems.map(item => ({
            name: item.foodName,
            price: item.price,
            quantity: item.quantity,
            dish: item.product,
          })),
          paymentInfo: {
            id : "658841961d7005905bf5a4cf",
            status : "Success"
          },
          itemsPrice: subtotal,
          taxPrice: tax,
          shippingPrice: shippingCharges,
          totalPrice: totalPrice,
        }),
      });

      const json = await response.json();
      if (json.success) {
        console.log("Order details saved successfully:", json);
        // Continue with payment or navigation logic here
        sessionStorage.setItem("orderInfo", JSON.stringify(data));
        console.log("Please Pay The Bill.....")
        // TO DO ----> navigate("/payment");
      } else {
        console.log("Error saving order details:", json.error);
      }
    } catch (error) {
      console.error("Error saving order details:", error);
    }
  };


  return (
    <Fragment>
      <div className="confirmOrderPage initialPadding">
        <div>
          <div className="confirmshippingArea">
            <Typography>Shipping Info</Typography>
            <div className="confirmshippingAreaBox">
              <div>
                <p>Name:</p>
                <span>{user?.name}</span>
              </div>
              <div>
                <p>Phone:</p>
                <span>{shippingInfo?.phoneNo}</span>
              </div>
              <div>
                <p>Address:</p>
                <span>{address}</span>
              </div>
            </div>
          </div>
          <div className="confirmCartItems">
            <Typography>Your Cart Items:</Typography>
            <div className="confirmCartItemsContainer">
              {cartItems &&
                cartItems.map((item) => (
                  <div key={item.product}>
                    <img src={item.ImgSrc[0]} alt="Product" />
                    <Link to={`/product/${item.product}`}>
                      {item.foodName}
                    </Link>{" "}
                    <span>
                      {item.quantity} X ₹{item.price} ={" "}
                      <b>₹{item.price * item.quantity}</b>
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div>
          <div className="orderSummary">
            <Typography>Order Summary</Typography>
            <div>
              <div>
                <p>Subtotal:</p>
                <span>₹{subtotal}</span>
              </div>
              <div>
                <p>Shipping Charges:</p>
                <span>₹{shippingCharges}</span>
              </div>
              <div>
                <p>GST:</p>
                <span>₹{tax}</span>
              </div>
            </div>

            <div className="orderSummaryTotal">
              <p>
                <b>Total:</b>
              </p>
              <span>₹{totalPrice}</span>
            </div>

            <button onClick={proceedToPayment}>Proceed To Payment</button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ConfirmOrder;
