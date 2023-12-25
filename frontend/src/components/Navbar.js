import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Badge from '@material-ui/core/Badge';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { useCart } from './ContextReducer';
import Cart from '../screens/Cart';

export default function Navbar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };


    const items = useCart();

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
            <div className="container-fluid">
                <Link className="navbar-brand fs-1 fst-italic" to="/">
                    Swigoto
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link fs-5 mx-3 active" aria-current="page" to="/">
                                Home
                            </Link>
                        </li>
                        {localStorage.getItem('token') ? (
                            <li className="nav-item">
                                <Link className="nav-link fs-5 mx-3 active" aria-current="page" to="/myorder">
                                    My Orders
                                </Link>
                            </li>
                        ) : (
                            ''
                        )}
                    </ul>
                    {!localStorage.getItem('token') ? (
                        <form className="d-flex">
                            <Link className="btn bg-white text-success mx-1" to="/login">
                                Login
                            </Link>
                            <Link className="btn bg-white text-success mx-1" to="/signup">
                                Signup
                            </Link>
                        </form>
                    ) : (
                        <div>
                                <Link className="btn bg-white text-success mx-2" to="/cart">
                                <Badge color="secondary" badgeContent={items.length}>
                                    <ShoppingCartIcon />
                                </Badge>
                                Cart
                            </Link>


                            <button onClick={handleLogout} className="btn bg-white text-success">
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}
