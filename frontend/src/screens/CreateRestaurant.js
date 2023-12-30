import React, { useState } from 'react';
import './createRestaurant.css';

const CreateRestaurantForm = () => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [rating, setRating] = useState('');

    const handleCreateRestaurant = async () => {
        try {
            const response = await fetch('http://localhost:4000/api/restaurent/create', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                },
                body: JSON.stringify({
                    name,
                    address,
                    rating
                })
            });
            const res = await response.json();
            console.log('Restaurant created successfully:', res);
        } catch (error) {
            console.error('Error creating restaurant:', error);
        }
    };

    return (
        <div className='main-container'>
            <div className="create-restaurant-container">
                <h2>Create Restaurant</h2>
                <form>
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">Address:</label>
                        <input type="text" id="address" value={address} onChange={(e) => setAddress(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="rating">Rating:</label>
                        <input type="number" id="rating" max={5} value={rating} onChange={(e) => setRating(e.target.value)} />
                    </div>
                    <button type="button" onClick={handleCreateRestaurant}>
                        Create Restaurant
                    </button>
                </form>
            </div>
        </div>
        
    );
};

export default CreateRestaurantForm;
