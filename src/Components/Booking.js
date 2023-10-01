import React, { useState } from 'react';
import SeatSelection from './SeatSelection';
import { useNavigate } from 'react-router-dom';
import './Css/Booking.css';

function TicketBooking() {
  const [selectedShowtime, setSelectedShowtime] = useState('');
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [ages, setAges] = useState([]); // Initialize ages state

  const showtimes = ['12:00 PM', '3:00 PM', '6:00 PM', '9:00 PM'];
  const seatPrices = {
    Adult: 9.79,
    Child: 7.69,
    Senior: 8.69,
  };

  const navigate = useNavigate();

  const calculateTotalPrice = () => {
    // Calculate the total price based on the selected seats and their ages
    let totalPrice = selectedSeats.reduce((total, seat, index) => {
      const age = ages[index];
      const seatPrice = seatPrices[age];
      return total + seatPrice;
    }, 0);
    return totalPrice.toFixed(2);
  };

  const finalizeBooking = () => {
    // Gather all the data to pass, including the total price
    const bookingData = {
      selectedShowtime,
      selectedSeats,
      price: calculateTotalPrice(), // Calculate and pass the total price
    };

    // Navigate to Checkout component and pass the data
    navigate('/checkout', { state: { bookingData } });
  };

  const handleSeatClick = (seat) => {
    setSelectedSeats((prevSeats) =>
      prevSeats.includes(seat)
        ? prevSeats.filter((s) => s !== seat)
        : [...prevSeats, seat]
    );
  };

  const handleAgeChange = (index, age) => {
    let newAges = [...ages];
    newAges[index] = age;
    setAges(newAges); // Update ages state
  };

  return (
    <div>
      <h2>Book Tickets</h2>

      {/* Showtime selection */}
      <h3>Select Showtime:</h3>
      <select onChange={(e) => setSelectedShowtime(e.target.value)}>
        <option value="" disabled selected>
          Select showtime
        </option>
        {showtimes.map((time, index) => (
          <option key={index} value={time}>
            {time}
          </option>
        ))}
      </select>

      {/* Seat selection */}
      {selectedShowtime && (
        <div>
          <h3>Select Seats:</h3>
          <SeatSelection handleSeatClick={handleSeatClick} selectedSeats={selectedSeats} />
        </div>
      )}

      {/* Age selection for each seat */}
      {selectedSeats.length > 0 && (
        <div>
          <h3>Specify Age for Each Seat:</h3>
          {selectedSeats.map((seat, index) => (
            <div key={index}>
              <label>{seat}</label>
              <select onChange={(e) => handleAgeChange(index, e.target.value)}>
                <option value="Adult">Adult - $9.79</option>
                <option value="Child">Child - $7.69</option>
                <option value="Senior">Senior - $8.69</option>
              </select>
            </div>
          ))}
        </div>
      )}

      {/* Finalize booking */}
      {selectedSeats.length > 0 && (
        <div>
          <button onClick={finalizeBooking}>Finalize Booking</button>
          {selectedSeats.length > 0 && (
            <p>Total Price: ${calculateTotalPrice()}</p>
          )}
        </div>
      )}
    </div>
  );
}

export default TicketBooking;
