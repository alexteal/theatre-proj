import React, { useContext, useEffect } from "react";
import { BookingContext } from "../../context/BookingContext";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./orderSummary.scss";

function OrderSummary() {
  const { bookingDetails } = useContext(BookingContext);
  const { selectedShowtime, selectedSeats, ages, totalPrice, userData } =
    bookingDetails;
  const navigate = useNavigate();

  useEffect(() => {
    const handleBackButton = () => {
      navigate("/");
    };

    window.addEventListener("popstate", handleBackButton);

    return () => {
      window.removeEventListener("popstate", handleBackButton);
    };
  }, []);

  return (
    <div className="home">
      <Sidebar />
      <useBackListener />
      <div className="homeContainer">
        <Navbar />
        <div className="order-summary-container">
          <h1 className="order-placed-message">Order Placed Successfully!</h1>
          {totalPrice && (
            <>
              <h3>Order Details:</h3>
              <p>Show Time: {selectedShowtime}</p>
              <p>Seats: {selectedSeats.join(", ")}</p>
              <p>Ages: {ages.join(", ")}</p>
              <p>Total Price: ${totalPrice}</p>
            </>
          )}
          {userData && (
            <>
              <p>
                Name: {userData.firstName} {userData.lastName}
              </p>
              <p>Email: {userData.email}</p>
              <p>Billing Address: {userData.billingAddress}</p>
            </>
          )}

          <h3>
            <strong>Thank you for booking with us! Enjoy your movie.</strong>
          </h3>
        </div>
      </div>
    </div>
  );
}

export default OrderSummary;
