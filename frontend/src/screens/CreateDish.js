import React, { useState } from 'react';
import { useAlert } from 'react-alert'
import './CreateDish.css';

const CreateDish = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [images, setImages] = useState('');
  const [rating, setRating] = useState('');
  const [restaurantName, setRestaurantName] = useState('');
  const [restaurantId, setRestaurantId] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const alert = useAlert()

  const handleCreateDish = async () => {
    try {
      const myForm = new FormData();
      myForm.append('name', name);
      myForm.append('price', price);
      myForm.append('rating', rating);
      myForm.append('restaurant', restaurantId);
      myForm.append('images', images);
      console.log("My form : ", myForm)
      const response = await fetch('http://localhost:4000/api/dishes/create', {
        method: 'POST',
        headers: {
          // "Content-Type": "multipart/form-data",
          'auth-token': localStorage.getItem('token'),
        },
        body: myForm
      });

      const data = await response.json();
      console.log("DATA : ", data);
      alert.show('Dish Created Successfully')
    } catch (error) {
      alert.error('Error while creating dish');
    }
  };

  const handleFileChange = (e) => {
      setImages(e.target.files[0]);   
  };


  const handleSearchRestaurant = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/restaurent/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token'),
        },
        body: JSON.stringify({
          name: restaurantName,
        }),
      });

      const data = await response.json();

      console.log('Search result:', data);
      setSearchResult(data); // Update the search result state
    } catch (error) {
      console.error('Error searching restaurant:', error);
    }
  };
  const handleRating = (e) => {
    const val = e.target.value;
    if (val < 0) {
      alert.error("Rating Can Never Be Negative");
      return;
    }
    if (val > 5) {
      alert.error("Select Rating In Between 1 to 5");
      return
    }
    setRating(val);
  }

  return (
    <div className="InitailContainer initialMargin">
      <div className="sidebar">
        <div className='search-box'>
          <h2>Search Restaurants</h2>
          <div className="form-group">
            <label htmlFor="restaurantName">Restaurant Name:</label>
            <input
              type="text"
              id="restaurantName"
              value={restaurantName}
              onChange={(e) => setRestaurantName(e.target.value)}
            />
            <button type="button" onClick={handleSearchRestaurant}>
              Search
            </button>
          </div>
          {searchResult?.success ? (
            <div className="search-results">
              <h3>Search Result:</h3>
              {searchResult.data.map((result) => (
                <div key={result._id} className="result-item">
                  <span className="result-id">ID : {result._id}</span>
                  <span className="result-name">Name : {result.name}</span>
                  <span className="result-address">ADDRESS : {result.address}</span>
                </div>
              ))}
            </div>
          ) : (
            searchResult && (
              <div>
                <h3>Search Result : </h3>
                <h3 className="error-message">{searchResult.message}</h3>
              </div>
            )
          )}


        </div>
      </div>

      <div className="form-section">
        <div className='create-dish-container'>
          <h2>Create Dish</h2>
          <form>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            
            <div className="form-group">
              <label htmlFor="price">Price:</label>
              <input type="number" id="price"  value={price} onChange={(e) => setPrice(e.target.value)} />
            </div>
            <div className="form-group">
              <label htmlFor="images">Images:</label>
              <input
                type="file"
                id="images"
                name="images"
                onChange={handleFileChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="rating">Rating:</label>
              <input type="number" id="rating" max={5} value={rating} onChange={(e) => handleRating(e)}/>
            </div>
            <div className="form-group">
              <label htmlFor="name">Restaurant ID:</label>
              <input type="text" id="name" value={restaurantId} onChange={(e) => setRestaurantId(e.target.value)} />
            </div>
            <button type="button" onClick={handleCreateDish}>
              Create Dish
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateDish;
