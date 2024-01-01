import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrder } from "../store/slice/orderSlice";
import Spinner from "../components/Spinner";
import { useAlert } from "react-alert";
import { Container, Row, Col, Card } from "react-bootstrap";
import "../App.css"


const MyOrder = () => {
    const dispatch = useDispatch();
    const { order, status, error } = useSelector((state) => state.order);
    const alert = useAlert();
    const orders = order.orderData;

    useEffect(() => {
        dispatch(fetchOrder());
    }, [dispatch]);

    console.log(orders);
    console.log(status);
    console.log(error);

    return (
        <div className="initialMargin">
            {status === "loading" ? (
                <Spinner />
            ) : status === "failed" ? (
                alert.error(`Error occur : ${error}`)
            ) : status === "succeeded" ? (

                <div>
                    <h2 className="mb-4 text-center">Order Details</h2>
                    <Container>
                        {orders.map((orderItem) => (
                            <Row key={orderItem._id}>
                                <Col xs={12}>
                                    <Card>
                                        <Card.Body>
                                            <Card.Text>
                                                <strong>Order ID:</strong> {orderItem._id}
                                            </Card.Text>
                                            <Card.Text>
                                                <strong>Shipping Address:</strong>{" "}
                                                {orderItem.shippingInfo.address}, {orderItem.shippingInfo.city},{" "}
                                                {orderItem.shippingInfo.state}, {orderItem.shippingInfo.country},{" "}
                                                {orderItem.shippingInfo.pinCode}
                                            </Card.Text>
                                            <Card.Text>
                                                <strong>Phone Number:</strong> {orderItem.shippingInfo.phoneNo}
                                            </Card.Text>
                                            <Card.Text>
                                                <strong>Order Status:</strong> {orderItem.orderStatus}
                                            </Card.Text>
                                            <Card.Text>
                                                <strong>Items:</strong>
                                                <ul>
                                                    {orderItem.FoodItems.map((item) => (
                                                        <li key={item._id}>
                                                            {item.quantity}x {item.name} - ${item.price}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </Card.Text>
                                            <Card.Text>
                                                <strong>Items Price:</strong> ${orderItem.itemsPrice}
                                            </Card.Text>
                                            <Card.Text>
                                                <strong>Tax Price:</strong> ${orderItem.taxPrice}
                                            </Card.Text>
                                            <Card.Text>
                                                <strong>Shipping Price:</strong> ${orderItem.shippingPrice}
                                            </Card.Text>
                                            <Card.Text>
                                                <strong>Total Price:</strong> ${orderItem.totalPrice}
                                            </Card.Text>
                                            <Card.Text>
                                                <strong>Payment Status:</strong> {orderItem.paymentInfo.status}
                                            </Card.Text>
                                            <Card.Text>
                                                <strong>Payment ID:</strong> {orderItem.paymentInfo.id}
                                            </Card.Text>
                                            <Card.Text>
                                                <strong>Paid At:</strong> {new Date(orderItem.paidAt).toLocaleString()}
                                            </Card.Text>
                                            <Card.Text>
                                                <strong>Order Created At:</strong> {new Date(orderItem.createdAt).toLocaleString()}
                                            </Card.Text>

                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>


                        ))}
                    </Container>
                </div>


            ) : null}
        </div>
    );
};

export default MyOrder;
