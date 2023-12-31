import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/AuthContext";
import Register from "./pages/registration/Register";
import TicketBooking from "./components/booking/Booking";
import ProtectedRoutesChecker from "./components/Routes/ProtectedRoutesChecker";
import EditProfile from "./pages/profile/EditProfile";
import Checkout from "./pages/checkout/Checkout";
import OrderSummary from "./pages/order-summary/OrderSummary";
import ManageMovies from "./pages/manage-movies/ManageMovies";
import ManagePromo from "./pages/manage-promo/ManagePromo";

function App() {
    const { darkMode } = useContext(DarkModeContext);
    const { currentUser } = useContext(AuthContext);
    console.log("currentUser", currentUser);
    const RequireAuth = ({ children }) => {
        return currentUser ? children : <Navigate to="/login" />;
    };
    const RequireAdminAuth = ({ children }) => {
        console.log(currentUser);
        return currentUser && currentUser.isAdmin ? (
            children
        ) : (
            <Navigate to="/login" />
        );
    };
    return (
        <div className={darkMode ? "app dark" : "app"}>
            <BrowserRouter>
                <ProtectedRoutesChecker />
                <Routes>
                    <Route path="/">
                        <Route path="/login" element={<Login />} />
                        <Route index element={<Home />} />{" "}
                        {/* No authentication required for Home */}
                        <Route path="/register" element={<Register />} />
                        <Route
                            path="/edit-profile"
                            element={
                                <RequireAuth>
                                    <EditProfile />
                                </RequireAuth>
                            }
                        />
                        <Route
                            path="/book/:movieId"
                            element={
                                <RequireAuth>
                                    <TicketBooking />
                                </RequireAuth>
                            }
                        />
                        <Route
                            path="/checkout"
                            element={
                                <RequireAuth>
                                    <Checkout />
                                </RequireAuth>
                            }
                        />
                        <Route
                            path="/order-details"
                            element={
                                <RequireAuth>
                                    <OrderSummary />
                                </RequireAuth>
                            }
                        />
                        <Route
                            path="/manage-movies"
                            element={
                                <RequireAdminAuth>
                                    <ManageMovies />
                                </RequireAdminAuth>
                            }
                        />
                        <Route
                            path="/manage-promo"
                            element={
                                <RequireAdminAuth>
                                    <ManagePromo />
                                </RequireAdminAuth>
                            }
                        />
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
