import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../App.css';

export default function Signup() {
  const [credentials, setCredentials] = useState({ name: '', email: '', password: '', location: '' });
  const [fetchedLocation, setFetchedLocation] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (fetchedLocation) {
      setCredentials({ ...credentials, location: fetchedLocation });
    }
  }, [fetchedLocation, credentials]);

  const handleClick = () => {
    const fetchLocation = () => {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          },
          (error) => {
            reject(error.message);
          }
        );
      });
    };

    fetchLocation()
      .then((coords) => {
    
        const { latitude, longitude } = coords;

        return fetch('http://localhost:4000/api/user/getlocation', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ lat: latitude, long: longitude }),
        });
      })
      .then(async (response) => {
        const json = await response.json();
        if (json.success) {
          // Check if location contains 'undefined', and remove it
          const cleanedLocation = json.location.replace(/undefined,/g, '');
          setFetchedLocation(cleanedLocation);
        } else {
          alert(`Error fetching location: ${json.error}`);
        }
      })
      .catch((error) => {
        console.error('Error fetching location:', error);
        // Handle error, show a message to the user, etc.
        alert(`Error fetching location: ${error}`);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:4000/api/user/createuser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
        location: credentials.location,
      }),
    });
    const json = await response.json();
    if (json.success) {
      localStorage.setItem('token', json.authToken);
      navigate('/login');
    } else {
      alert('Enter Valid Credentials');
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div style={{ backgroundImage: 'url("https://images.pexels.com/photos/1565982/pexels-photo-1565982.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")', backgroundSize: 'cover', height: '100vh' }}>
      <div className="container" style={{ paddingTop: '90px' }}>
        <form className="w-50 m-auto mt-5 border rounded p-4" style={{ background: 'rgba(0, 0, 0, 0.7)' }} onSubmit={handleSubmit}>
          <div className="m-3">
            <label htmlFor="name" className="form-label text-white">
              Name
            </label>
            <input type="text" className="form-control" name="name" value={credentials.name} onChange={onChange} aria-describedby="emailHelp" />
          </div>
          <div className="m-3">
            <label htmlFor="email" className="form-label text-white">
              Email address
            </label>
            <input type="email" className="form-control" name="email" value={credentials.email} onChange={onChange} aria-describedby="emailHelp" />
          </div>

          <div className="m-3">
            <label htmlFor="location" className="form-label text-white">
              Location
            </label>
            <fieldset>
              <input type="text" className="form-control" name="location" value={credentials.location} placeholder="Click below for fetching location" onChange={(e) => setCredentials({ ...credentials, location: e.target.value })} aria-describedby="emailHelp" />
            </fieldset>
          </div>
          <div className="m-3">
            <button type="button" onClick={handleClick} name="location" className="btn btn-success" style={{ display: 'flex', alignItems: 'center' }}>
              <img src="./map.png" alt="Map Icon" style={{ marginRight: '8px', width: '20px', height: '20px' }} />
              <span>Click for current Location</span>
            </button>
          </div>
          <div className="m-3">
            <label htmlFor="password" className="form-label text-white">
              Password
            </label>
            <input type="password" className="form-control" value={credentials.password} onChange={onChange} name="password" />
          </div>
          <button className="button-29" style={{ marginRight: '20px', marginLeft: '15px' }} type="submit">
            Submit
          </button>
          <Link className="button-29" to="/login">
            Already a user
          </Link>
        </form>
      </div>
    </div>
  );
}
