import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import { DarkModeContextProvider } from "./context/darkModeContext";
import { MovieProvider } from "./context/MovieContext";
import { BookingContextProvider } from "./context/BookingContext";

ReactDOM.render(
  <React.StrictMode>
    <DarkModeContextProvider>
      <AuthContextProvider>
        <MovieProvider>
          <BookingContextProvider>
            <App />
          </BookingContextProvider>
        </MovieProvider>
      </AuthContextProvider>
    </DarkModeContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
