import React from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

import "./Css/Checkout.css";

function Checkout() {
    const location = useLocation();
    const { selectedShowtime, selectedSeats, price } =
        location.state.bookingData;

    const handlePurchase = (e) => {
        e.preventDefault();

        // Add any necessary logic for handling the purchase here, if needed

        // Redirect to the homepage using window.location.href
        window.location.href = "/";
    };

    return (
        <>
            <div className="mainbox">
                <div className="content">
                    <h1>Checkout</h1>

                    <h2>Your Selections:</h2>
                    <p>Show Time: {selectedShowtime}</p>
                    <p>Seats: {selectedSeats.join(", ")}</p>
                    <p>Price: ${price}</p>

                    <h2>Provide Your Information:</h2>
                    <form onSubmit={handlePurchase} className="formstuff">
                        <input type="text" placeholder="First Name" required />
                        <input type="text" placeholder="Last Name" required />
                        <input type="email" placeholder="Email" required />
                        <input type="tel" placeholder="Phone Number" required />
                        <input
                            type="text"
                            placeholder="Credit Card Information"
                            required
                        />
                        <button type="submit">Purchase</button>
                        <Link to="/">
                            <button type="exit"> Exit</button>
                        </Link>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Checkout;
