import React, { useState, useEffect } from 'react';
import { useAlert } from 'react-alert'
import './DeleteRestaurant.css';

const RestaurantTable = () => {
    const [restaurants, setRestaurants] = useState([]);
    const alert = useAlert()

    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                const response = await fetch('http://localhost:4000/api/restaurent/', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'auth-token': localStorage.getItem('token'),
                    },
                });

                const {data} = await response.json();
                setRestaurants(data);
            } catch (error) {
                alert.error('Error while fetching restaurants');
            }
        };

        fetchRestaurants();
    }, []);

    const handleDeleteRestaurant = async (restaurantId) => {
        try {
            const response = await fetch(`http://localhost:4000/api/restaurent/${restaurantId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token'),
                },
            });
            const { deletedRestaurant, success } = await response.json();
            console.log("RESPONSE : ", deletedRestaurant)
            if (success) {
                setRestaurants((prevRestaurants) => prevRestaurants.filter((r) => r._id !== deletedRestaurant._id));
                alert.show("Restaurant Deleted Successfully")
            } else {
                alert.error('Failed to delete restaurant');
            }
        } catch (error) {
            alert.error('Error deleting restaurant');
        }
    };

    return (
        <div className="restaurant-table-container">
            <h2 className="table-heading">Restaurant Table</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th className="table-header">ID</th>
                        <th className="table-header">Name</th>
                        <th className="table-header">Location</th>
                        <th className="table-header">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {restaurants?.map((restaurant) => (
                        <tr key={restaurant._id} className="table-row">
                            <td className="table-cell">{restaurant._id}</td>
                            <td className="table-cell">{restaurant.name}</td>
                            <td className="table-cell">{restaurant.address}</td>
                            <td className="table-cell">
                                <button
                                    className="delete-button"
                                    onClick={() => handleDeleteRestaurant(restaurant._id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};


export default RestaurantTable;
