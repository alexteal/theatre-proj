import React, { createContext, useState } from 'react';

// Define the BookingContext
export const BookingContext = createContext();

// Define the BookingContextProvider component
export const BookingContextProvider = ({ children }) => {
    const [bookingDetails, setBookingDetails] = useState({
        selectedShowtime: null,
        selectedSeats: [],
        ages: [],
        totalPrice: 0
    });

    return (
        <BookingContext.Provider value={{ bookingDetails, setBookingDetails }}>
            {children}
        </BookingContext.Provider>
    );
};
