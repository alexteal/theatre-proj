import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./checkout.scss";
import { BookingContext } from "../../context/BookingContext";
import { AuthContext } from "../../context/AuthContext";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { fetchUserData, saveBookingData } from "../../dataService";
import { checkPromo } from "../../components/email/Promos";

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
    registerForPromotion: "",
  });

  const { selectedShowtime, selectedSeats, ages, totalPrice } = bookingDetails;
  // console.log("bookingDetails", bookingDetails);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [promoId, setPromoId] = useState("");
  const [discount, setDiscount] = useState("");
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

  const handlePromoIdChange = async (e) => {
    const promoId = e.target.value;
    setPromoId(promoId);
    const response = await checkPromo(userId, promoId);
    console.log("response = ", response);
    setDiscount(response);
    console.log(discount);
  };

  const handleCardNumberChange = (e) => {
    const val = e.target.value.substring(0, 16);
    setUserData({
      ...userData,
      paymentCard: val,
    });
  };

  const handlePurchase = (e) => {
    e.preventDefault();
    // Form validation
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      alert("Please fill in all required fields before submitting.");
      return;
    }
    // Calculate total price with discount
    const finalPrice = totalPrice - totalPrice / discount;
    // Save merged booking and user details in Firebase
    saveBookingData(
      userId,
      { ...bookingDetails, totalPrice: finalPrice },
      userData
    )
      .then(() => {
        console.log("Booking and user details saved successfully!");
      })
      .catch((error) => {
        console.error("Error saving details:", error);
      });
    // Storing user details in BookingContext
    setBookingDetails((prev) => ({
      ...prev,
      userData,
      totalPrice: finalPrice,
    }));
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
                      disabled
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
                      disabled
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
                      disabled
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
                      minLength={16}
                      maxLength={16}
                      onChange={handleCardNumberChange}
                      placeholder="Payment Card"
                      required
                    />
                  </label>
                </div>
                {userData.registerForPromotion && (
                  <div className="input-group">
                    <label>
                      Redeem Promotion:
                      <input
                        type="text"
                        className="checkout-input"
                        value={promoId}
                        onChange={handlePromoIdChange}
                        placeholder="Promo ID"
                      />
                    </label>
                  </div>
                )}

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
