import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Badge from '@material-ui/core/Badge';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery, setFilterQuery } from '../store/slice/searchQuerySlice';
import Select from 'react-select';

export default function Navbar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);
    const role = user.role;
    const [query, setQuery] = useState('');
    const [selectedFilter, setSelectedFilter] = useState(null);
    const filterOptions = [
        { value: 'dishes', label: 'Dishes' },
        { value: 'restaurant', label: 'Restaurant' },
    ];

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const handleSearch = () => {
        dispatch(setSearchQuery(query));
        dispatch(setFilterQuery(selectedFilter?.value));
        // console.log('Search Query:', query);
        // console.log('Selected Filter:', selectedFilter?.value);
    };

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
                        {role === 'admin' && (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link fs-5 mx-3" to="/createDish">
                                        Create Dish
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link fs-5 mx-3" to="/createRestaurant">
                                        Create Restaurant
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link fs-5 mx-3" to="/deleteRestaurant">
                                        Delete Restaurant
                                    </Link>
                                </li>
                            </>
                        )}
                        {role == 'user' && localStorage.getItem('token') ? (
                            <li className="nav-item">
                                <Link className="nav-link fs-5 mx-3 active" aria-current="page" to="/myorder">
                                    My Orders
                                </Link>
                            </li>
                        ) : (
                            ''
                        )}
                        <li>
                            <div className="input-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search..."
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                />
                                <Select
                                    className="filter-select"
                                    placeholder="Filter by..."
                                    value={selectedFilter}
                                    options={filterOptions}
                                    onChange={(selectedOption) => setSelectedFilter(selectedOption)}
                                />
                                <button
                                    className="btn btn-outline-success"
                                    type="button"
                                    onClick={handleSearch}
                                >
                                    Search
                                </button>
                            </div>
                        </li>


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
                            {
                                role == 'user' && <Link className="btn bg-white text-success mx-2" to="/cart">
                                    <Badge color="secondary">
                                        <ShoppingCartIcon />
                                    </Badge>
                                    Cart
                                </Link>
                            }

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
