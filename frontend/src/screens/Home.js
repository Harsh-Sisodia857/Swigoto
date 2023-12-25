import React, { useEffect, useState } from 'react'
import Card from '../components/Card'
// import Carousel from '../components/Carousel'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Carousel from '../components/Carousel'
export default function Home() {
  const [foodItems, setFoodItems] = useState([])
  const loadFoodItems = async () => {
    try {
      let response = await fetch("http://localhost:4000/api/dishes/", {
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
    loadFoodItems()
  }, [])

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
              <div key={item.id} className='col-12 col-md-6 col-lg-3'>
                <Card foodName={item.name} item={item} rating={item.rating} price={item.price} Quantity={1} ImgSrc={item.images} />
              </div>
            ))
          ) : (
            <div>No Such Data</div>
          )}
        </div>
      </div>
      <Footer />
    </div>









  )
}
