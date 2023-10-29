import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./checkout.scss";
import { BookingContext } from "../../context/BookingContext";
import { AuthContext } from "../../context/AuthContext";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { fetchUserData, saveBookingData } from "../../dataService";

function Checkout() {
  const { bookingDetails } = useContext(BookingContext);
  const { currentUser } = useContext(AuthContext);
  const userId = currentUser?.uid;

  const [userData, setUserData] = useState({
    billingAddress: "",
    email: "",
    firstName: "",
    lastName: "",
    paymentCard: "",
  });

  const { selectedShowtime, selectedSeats, ages, totalPrice } = bookingDetails;
  // console.log("bookingDetails", bookingDetails);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { setBookingDetails } = useContext(BookingContext);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(userId);
    fetchUserData(userId)
      .then((data) => {
        if (data) {
          setUserData(data);
          setLoading(false);
        }
      })
      .catch((err) => setError("Error fetching user data."));
  }, [userId]);

  const handlePurchase = (e) => {
    e.preventDefault();

    // Form validation
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      alert("Please fill in all required fields before submitting.");
      return;
    }

    // Save merged booking and user details in Firebase
    saveBookingData(userId, bookingDetails, userData)
      .then(() => {
        console.log("Booking and user details saved successfully!");
      })
      .catch((error) => {
        console.error("Error saving details:", error);
      });

    // Storing user details in BookingContext
    setBookingDetails((prev) => ({ ...prev, userData }));

    navigate("/order-details");
  };

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="checkout-container">
          <div className="checkout-content">
            <section className="checkout-selections">
              <h2>BOOKING SUMMARY</h2>
              <p>
                Show Time:&nbsp;
                <span className="booking-field-value">{selectedShowtime}</span>
              </p>
              <p className="booking-field-names">
                Seats:{" "}
                {selectedSeats.length > 0
                  ? selectedSeats
                      .map((seat, index) => (
                        <span className="booking-field-value" key={index}>
                          {seat} ({ages[index]})
                        </span>
                      ))
                      .reduce((prev, curr) => [prev, ", ", curr])
                  : "No seats selected"}
              </p>
              <p className="booking-field-names">
                Amount Payable:&nbsp;
                <span className="booking-field-value">${totalPrice}</span>
              </p>
            </section>
            <section className="checkout-form">
              <h2>Provide Your Information:</h2>
              <form onSubmit={handlePurchase}>
                <div className="input-group">
                  <label>
                    First Name:
                    <input
                      type="text"
                      className="checkout-input"
                      value={userData.firstName}
                      onChange={(e) =>
                        setUserData({ ...userData, firstName: e.target.value })
                      }
                      placeholder="First Name"
                      required
                    />
                  </label>
                </div>
                <div className="input-group">
                  <label>
                    Last Name:
                    <input
                      type="text"
                      className="checkout-input"
                      value={userData.lastName}
                      onChange={(e) =>
                        setUserData({ ...userData, lastName: e.target.value })
                      }
                      placeholder="Last Name"
                      required
                    />
                  </label>
                </div>
                <div className="input-group">
                  <label>
                    Email:
                    <input
                      type="email"
                      className="checkout-input"
                      value={userData.email}
                      onChange={(e) =>
                        setUserData({ ...userData, email: e.target.value })
                      }
                      placeholder="Email"
                      required
                    />
                  </label>
                </div>
                <div className="input-group">
                  <label>
                    Payment Card:
                    <input
                      type="text"
                      className="checkout-input"
                      value={userData.paymentCard}
                      onChange={(e) =>
                        setUserData({
                          ...userData,
                          paymentCard: e.target.value,
                        })
                      }
                      placeholder="Payment Card"
                      required
                    />
                  </label>
                </div>{" "}
                <div className="input-group">
                  <label>
                    Billing Address:
                    <textarea
                      className="checkout-input"
                      value={userData.billingAddress}
                      rows="4"
                      onChange={(e) =>
                        setUserData((prev) => ({
                          ...prev,
                          billingAddress: e.target.value,
                        }))
                      }
                      required
                    ></textarea>
                  </label>
                </div>
                <button type="submit">Purchase</button>
                <Link to="/">
                  <button type="exit"> Exit</button>
                </Link>
              </form>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
