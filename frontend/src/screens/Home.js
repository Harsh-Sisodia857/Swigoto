import React, { useEffect, useState } from 'react'
import Card from '../components/Card'
import { useSelector } from 'react-redux';
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Carousel from '../components/Carousel'
export default function Home() {
  const [foodItems, setFoodItems] = useState([])
  const { searchQuery, filterQuery } = useSelector((state) => state.searchQuery);

  // console.log("Search query : ",searchQuery)
  // console.log("filter query : ", filterQuery)
  const loadFoodItems = async (queryParams) => {
    try {
      const queryString = new URLSearchParams(queryParams).toString();
      console.log("Query String : ",queryString)
      let response = await fetch(`http://localhost:4000/api/dishes/?${queryString}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      response = await response.json();
      setFoodItems(response.dishes);
    } catch (error) {
      console.error('Error loading food items:', error);
    }
  }

  useEffect(() => {
    if (filterQuery === 'restaurant') {
      const queryParams = {
        "restaurant"  : searchQuery,
      };
     
      loadFoodItems(queryParams);

    } else {
      const queryParams = {
        "dish": searchQuery,
      };
      
      loadFoodItems(queryParams);

    }
    
  }, [searchQuery, filterQuery]);

  return (
    <div >
      <div>
        <Navbar />
      </div>
      <div>
        <Carousel imageSize="500px" />
      </div>
      <div className='container'>
        <div className='row mb-3'>
          {foodItems && foodItems.length !== 0 ? (
            foodItems.map(item => (
              <div key={item._id} className='col-12 col-md-6 col-lg-3'>
                <Card id={item._id} foodName={item.name} item={item} rating={item.rating} price={item.price} Quantity={1} ImgSrc={item.images} />
              </div>
            ))
          ) : (
            <div className='text-center'>No Such Data</div>
          )}
        </div>
      </div>
      <Footer />
    </div>









  )
}
