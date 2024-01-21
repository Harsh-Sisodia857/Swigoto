import React, { useEffect, useState } from 'react'
import Card from './Card'
import { useSelector,useDispatch } from 'react-redux';
import { loadFoodItems, setFoodItems, setError } from '../store/slice/foodItemSlice';
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Carousel from '../components/Carousel'
export default function Home() {
  const dispatch = useDispatch();
  const { dishes: foodItems, status, error } = useSelector((state) => state.foodItem);
  const { searchQuery, filterQuery } = useSelector((state) => state.searchQuery);

  console.log("Search query : ",searchQuery)
  console.log("filter query : ", filterQuery)
  useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        const queryParams = filterQuery === 'restaurant' ? { restaurant: searchQuery } : { dish: searchQuery };
        console.log("Query Params : ",queryParams)
        const data = await dispatch(loadFoodItems(queryParams));
        dispatch(setFoodItems(data.dishes));
      } catch (error) {
        dispatch(setError(error.message));
      }
    };

    fetchFoodItems();
  }, [searchQuery, filterQuery, dispatch]);
  console.log(foodItems)
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
          {foodItems && foodItems.length > 0 ? (
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
