import './App.css';
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css'  //npm i bootstrap-dark-5 boostrap
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";

import Home from './screens/Home';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { useEffect } from 'react';
import WebFont from 'webfontloader';
import Login from './screens/Login';
import Signup from './screens/Signup';
import MyOrder from './screens/MyOrder';
import Navbar from './components/Navbar.js';
import Cart from './screens/Cart.js';
import Shipping from './screens/Shipping.js';
import ConfirmOrder from './screens/ConfirmOrder.js';
import CreateDish from './screens/CreateDish';
import CreateRestaurant from './screens/CreateRestaurant.js';
import DeleteRestaurant from './screens/DeleteRestaurant.js';
import ProtectedRoute from './components/ProtectedRoute.js';
import AdminRoute from './components/AdminRoute.js';
import AuthRedirectSignup from './components/AuthRedirect.js';

function App() {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Open Sans", "Lato"]
      }
    })
  }, [])
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<AuthRedirectSignup><Login /></AuthRedirectSignup>} />
        <Route exact path="/signup" element={<AuthRedirectSignup><Signup /></AuthRedirectSignup>} />
        <Route exact path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
        <Route exact path="/shipping" element={<ProtectedRoute><Shipping /></ProtectedRoute>} />
        <Route exact path="/order/confirm" element={<ProtectedRoute><ConfirmOrder /></ProtectedRoute>} />
        <Route exact path="/myorder" element={<ProtectedRoute><MyOrder /></ProtectedRoute>} />

        {/* Admin Routes */}
        <Route exact path="/createDish" element={<AdminRoute><CreateDish /></AdminRoute>} />
        <Route exact path="/createRestaurant" element={<AdminRoute><CreateRestaurant /></AdminRoute>} />
        <Route exact path="/deleteRestaurant" element={<AdminRoute><DeleteRestaurant /></AdminRoute>} />

      </Routes>

    </Router>
  );
}

export default App;
