import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import movie1Image from './images/movie1.jpg';
import movie2Image from './images/movie2.jpg';
import movie3Image from './images/movie3.jpg';
import cinemaImage from './images/cinema.jpg';
import SeatSelection from './SeatSelection'; 

import './App.css';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userCart, setUserCart] = useState([]);
  const [shows, setShows] = useState([
    // Initial list of shows
    { id: 1, title: 'Show 1', time: '10:00 AM' },
    { id: 2, title: 'Show 2', time: '02:00 PM' },
    { id: 3, title: 'Show 3', time: '06:00 PM' },
  ]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [activeTab, setActiveTab] = useState('nowPlaying');
  const [newShowTitle, setNewShowTitle] = useState('');
  const [newShowTime, setNewShowTime] = useState('');
  const [newShowPrice, setNewShowPrice] = useState('');

  useEffect(() => {
    const total = userCart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotalPrice(total);
  }, [userCart]);

  const showWithImages = [
    { id: 1, title: 'Show 1', time: '10:00 AM', image: movie1Image, name: 'Movie A' },
    { id: 2, title: 'Show 2', time: '02:00 PM', image: movie2Image, name: 'Movie B' },
    { id: 3, title: 'Show 3', time: '02:00 PM', image: movie3Image, name: 'Movie C' },
    // Add more show objects and images as needed
  ];

  const handleLogin = userType => {
    setLoggedIn(true);
    setIsAdmin(userType === 'admin');
  };

  const handleAddToCart = show => {
    const existingCartItem = userCart.find(item => item.id === show.id);
    if (existingCartItem) {
      setUserCart(prevCart =>
        prevCart.map(item => (item.id === show.id ? { ...item, quantity: item.quantity + 1 } : item))
      );
    } else {
      setUserCart(prevCart => [...prevCart, { ...show, quantity: 1 }]);
    }
  };

  const handleRemoveFromCart = showToRemove => {
    const updatedCart = userCart
      .map(item => (item.id === showToRemove.id ? { ...item, quantity: item.quantity - 1 } : item))
      .filter(item => item.quantity > 0);
    setUserCart(updatedCart);
  };

  const handleAddShow = event => {
    event.preventDefault(); // Prevent default form submission
    const newShow = {
      id: Date.now(),
      title: newShowTitle,
      time: newShowTime,
      price: parseFloat(newShowPrice),
    };
    setShows(prevShows => [...prevShows, newShow]);
    setNewShowTitle('');
    setNewShowTime('');
    setNewShowPrice('');
  };

  const handleDeleteShow = showId => {
    setShows(prevShows => prevShows.filter(show => show.id !== showId));
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setUserCart([]);
    setIsAdmin(false);
    setTotalPrice(0);
  };

  return (
    <Router>
      <div className="app">
        {!loggedIn ? (
          <div className="login-page">
            <h2>Login Page</h2>
            <button onClick={() => handleLogin('user')}>Login as User</button>
            <button onClick={() => handleLogin('admin')}>Login as Admin</button>
          </div>
        ) : (
          <div className="user-page">
            <div className="tabs">
              <div className={`tab ${activeTab === 'home' ? 'active' : ''}`} onClick={() => setActiveTab('home')}>
                Home
              </div>
              <div
                className={`tab ${activeTab === 'nowPlaying' ? 'active' : ''}`}
                onClick={() => setActiveTab('nowPlaying')}
              >
                Now Playing
              </div>
              <div
                className={`tab ${activeTab === 'contact' ? 'active' : ''}`}
                onClick={() => setActiveTab('contact')}
              >
                Contact Us
              </div>
            </div>
            {activeTab === 'home' && (
              <div className="content">
                <h2>Movie Posters</h2>
                <div className="movie-posters">
                  {showWithImages.map(show => (
                    <div key={show.id} className="movie-poster">
                      <img src={show.image} alt={show.title} />
                      <h3>{show.title}</h3>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'nowPlaying' && (
              <div className="content">
                <h2>Welcome to the Cinema!</h2>
                <h3>Now Playing</h3>
                {isAdmin && (
                  <div className="admin-features">
                    <h4>Admin Features</h4>
                    <form onSubmit={handleAddShow}>
                      <input
                        type="text"
                        placeholder="Title"
                        value={newShowTitle}
                        onChange={e => setNewShowTitle(e.target.value)}
                      />
                      <input
                        type="text"
                        placeholder="Time"
                        value={newShowTime}
                        onChange={e => setNewShowTime(e.target.value)}
                      />
                      <input
                        type="number"
                        placeholder="Price"
                        value={newShowPrice}
                        onChange={e => setNewShowPrice(e.target.value)}
                      />
                      <button type="submit">Add Show</button>
                    </form>
                  </div>
                )}
                <ul>
                  {shows.map(show => (
                    <li key={show.id}>
                      {show.title} - {show.time}
                      {!isAdmin && <button onClick={() => handleAddToCart(show)}>Add to Cart</button>}
                      {isAdmin && (
                        <div className="admin-show-options">
                          <button onClick={() => handleDeleteShow(show.id)}>Delete</button>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
                <h3>Your Cart</h3>
                <ul>
                  {userCart.map(item => (
                    <li key={item.id}>
                      {item.title} - ${item.price} x {item.quantity}
                      <button onClick={() => handleRemoveFromCart(item)}>Remove</button>
                    </li>
                  ))}
                </ul>
                {/* Add a link to the SeatSelection component */}
                <Link to="seat-selection">
                  <button>Proceed to Seat Selection</button>
                </Link>
                <p>Total: ${totalPrice}</p>
              </div>
            )}

            {activeTab === 'contact' && (
              <div className="content">
                <div className="contact-form">
                  <h2>Contact Us</h2>
                  <form>
                    <label>Name:</label>
                    <input type="text" />

                    <label>Email:</label>
                    <input type="email" />

                    <label>Phone Number:</label>
                    <input type="tel" />

                    <label>Message:</label>
                    <textarea></textarea>

                    <button type="submit">Submit</button>
                  </form>
                </div>
                <div className="contact-info">
                  <h2>Visit Us</h2>
                  <img src={cinemaImage} alt="cinema" />
                  <p>Address: 1234 Movie Street, Cinema City</p>
                </div>
              </div>
            )}

            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
        {/* Define a route for the SeatSelection component */}
        <Routes>
          <Route path="/seat-selection" component={SeatSelection} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
