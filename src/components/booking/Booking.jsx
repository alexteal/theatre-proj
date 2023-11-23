import React, { useContext, useState } from "react";
import SeatSelection from "./SeatSelection";
import { useNavigate } from "react-router-dom";
import "./booking.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { BookingContext } from "../../context/BookingContext";

function TicketBooking() {
  const [selectedShowtime, setSelectedShowtime] = useState("");
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [ages, setAges] = useState([]); // Initialize ages state
  const { setBookingDetails } = useContext(BookingContext);

  const showtimes = ["12:00 PM", "3:00 PM", "6:00 PM", "9:00 PM"];
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
    let totalPrice = calculateTotalPrice();
    // Gather all the data to pass, including the total price
    const bookingData = {
      selectedShowtime,
      selectedSeats,
      price: totalPrice, // Calculate and pass the total price
    };

    setBookingDetails({
      selectedShowtime: selectedShowtime,
      selectedSeats: selectedSeats,
      ages: ages,
      totalPrice: totalPrice,
    });

    // Navigate to Checkout component and pass the data
    navigate("/checkout", { state: { bookingData } });
  };

  const handleSeatClick = (seat) => {
    setSelectedSeats((prevSeats) => {
      if (prevSeats.includes(seat)) {
        // Remove age value for deselected seat
        const seatIndex = prevSeats.indexOf(seat);
        const newAges = [...ages];
        newAges.splice(seatIndex, 1);
        setAges(newAges);
        return prevSeats.filter((s) => s !== seat);
      } else {
        // Provide a default age value (e.g., "Adult") for the newly selected seat
        setAges([...ages, "Adult"]);
        return [...prevSeats, seat];
      }
    });
  };

  const handleAgeChange = (index, age) => {
    let newAges = [...ages];
    newAges[index] = age;
    setAges(newAges); // Update ages state
  };

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="book-tickets-container">
          <h2>Book Tickets</h2>
          <div className="showtime-container">
            {/* Showtime selection */}
            <h3>Select Showtime</h3>
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
          </div>

          {/* Seat selection */}
          {selectedShowtime && (
            <div>
              {/* <h3>Select Seats:</h3> */}
              <SeatSelection
                handleSeatClick={handleSeatClick}
                selectedSeats={selectedSeats}
              />
            </div>
          )}

          {/* Age selection for each seat */}
          {selectedSeats.length > 0 && (
            <div className="age-for-each-seat">
              <h3>Specify Age for Each Seat</h3>
              <div className="age-seats">
                {selectedSeats.map((seat, index) => (
                  <div key={index}>
                    <label>{seat}</label>
                    <select
                      onChange={(e) => handleAgeChange(index, e.target.value)}
                    >
                      <option value="Adult">Adult - $9.79</option>
                      <option value="Child">Child - $7.69</option>
                      <option value="Senior">Senior - $8.69</option>
                    </select>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Finalize booking */}
          {selectedSeats.length > 0 && (
            <div className="pay-container">
              <button onClick={finalizeBooking}>
                {selectedSeats.length > 0 && (
                  <p>Pay ${calculateTotalPrice()}</p>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TicketBooking;
