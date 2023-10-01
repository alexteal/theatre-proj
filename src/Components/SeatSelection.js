import React from 'react';
import './Css/SeatSelection.css';

function SeatSelection({ handleSeatClick, selectedSeats }) {
  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  const seatsInEachRow = 10;

  return (
    <div className="booking-container">
      <div className="seat-layout">
        <div className="screen">Screen</div>
        {rows.map((row) => (
          <div className="seat-row" key={row}>
            <div className="seat-row-label">{row}</div>
            {Array.from({ length: seatsInEachRow }, (_, i) => i + 1).map((seat) => (
              <div
                className={`seat ${selectedSeats.includes(`${row}${seat}`) ? 'selected' : ''}`}
                key={seat}
                onClick={() => handleSeatClick(`${row}${seat}`)}
              >
                {seat}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}


export default SeatSelection;
