import React, { useState } from 'react';

const SeatSelection = ({ movie, price }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const handleSeatClick = (seatNumber) => {
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatNumber));
    } else {
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
  };

  const calculateTotalPrice = () => {
    const pricePerSeat = price;
    const total = selectedSeats.length * pricePerSeat;
    setTotalPrice(total);
  };

  return (
    <div className="seat-selection">
      <h2>Movie Seat Selection</h2>
      <p>Movie: {movie}</p>
      <p>Price per seat: ${price}</p>
      <div className="seat-grid">
        {/* Render your seat grid here */}
        {/* Example: */}
        <div className="seat" onClick={() => handleSeatClick(1)}>1</div>
        <div className="seat" onClick={() => handleSeatClick(2)}>2</div>
        {/* Add more seats as needed */}
      </div>
      <p>Total Price: ${totalPrice}</p>
      {/* Call calculateTotalPrice when the button is clicked */}
      <button onClick={calculateTotalPrice}>Calculate Total</button>
    </div>
  );
};

export default SeatSelection;
