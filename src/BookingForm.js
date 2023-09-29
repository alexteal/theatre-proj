import React, { useState } from 'react';
import './BookingForm.css';

const BookingForm = ({ movie }) => {
  const [ticketCounts, setTicketCounts] = useState({
    child: 0,
    adult: 0,
    senior: 0,
  });

  const handleTicketChange = (type, count) => {
    setTicketCounts((prevCounts) => ({
      ...prevCounts,
      [type]: count,
    }));
  };

  // Calculate total price based on ticketCounts
  const total = ticketCounts.child * 10 + ticketCounts.adult * 15 + ticketCounts.senior * 12;

  return (
    <div>
      <h3>Booking: {movie.title}</h3>
      <div>
        <label>Child Tickets:</label>
        <input
          type="number"
          value={ticketCounts.child}
          onChange={(e) => handleTicketChange('child', e.target.value)}
        />
      </div>
      {/* Similar inputs for adult and senior tickets */}
      <p>Total Price: ${total}</p>
      <button>Proceed to Payment</button>
    </div>
  );
};

export default BookingForm;
