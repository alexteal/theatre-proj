import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import React, { useState } from 'react';

import Homepage from './Components/Homepage';
import Signup from './Components/Signup';
import Login from './Components/Login';
import AdminPanel from './Components/AdminPanel';
import Booking from './Components/Booking';
import Checkout from './Components/Checkout';
import EditProfile from './Components/Edit';

import movie1image from './Components/images/movie1.jpg';
import movie2Image from './Components/images/movie2.jpg';
import movie3Image from './Components/images/movie3.jpg';


function App() {

  const [currentlyRunning, setCurrentlyRunning] = useState([
    { poster: movie1image, title: 'Movie Title 1', trailerUrl: 'https://www.youtube.com/embed/xyz123' },
    { poster: movie2Image, title: 'Movie Title 2', trailerUrl: 'https://www.youtube.com/embed/abc456' },
  ]);
  
  const [comingSoon, setComingSoon] = useState([
    { poster: movie3Image, title: 'Movie Title 3', trailerUrl: 'https://www.youtube.com/embed/uvw789' },
  ]);

  return (
    /**
     * Router goes in here
     */

    <Router>
      <Routes>
        <Route exact path='/' element={<Homepage currentlyRunning={currentlyRunning} comingSoon={comingSoon}/>} />
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/adminpanel' element={<AdminPanel currentlyRunning={currentlyRunning} setCurrentlyRunning={setCurrentlyRunning} comingSoon={comingSoon} setComingSoon={setComingSoon}/>}/>
        <Route path="/book/:movieTitle" element={<Booking/>} />
        <Route path="/checkout" element={<Checkout/>}/>
        <Route path="/edit" element={<EditProfile />} />
      </Routes>

    </Router>
    
  );
}

export default App;




