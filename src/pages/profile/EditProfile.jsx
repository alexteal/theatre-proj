import React, { useState, useEffect, useContext } from "react";
import { fetchUserData, updateUserData } from "../../dataService";
import { AuthContext } from "../../context/AuthContext";
import { reauthenticateUser, updateUserPassword } from "../../firebase";
import "./edit-profile.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";

const EditProfile = () => {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { currentUser } = useContext(AuthContext);
  const [checked, setChecked] = useState(false);
  const userId = currentUser?.uid;
  const [bookingHistory, setBookingHistory] = useState(null);
  const [renderBookingHistory, setRenderBookingHistory] = useState(null);

  useEffect(() => {
    fetchUserData(userId)
      .then((data) => {
        setUserData(data);
        setLoading(false);
        // Fetch booking history from user data
        if (data && data.booking) {
          console.log("User bookings fetched from user data:", data.booking);
          setBookingHistory(data.booking);
        }
      })
      .catch((err) => {
        console.error("Error fetching user data:", err);
        setError("Error fetching user data.");
        setLoading(false);
      });
  }, [userId]);
  useEffect(() => {
    if (bookingHistory) {
      const bookingHistoryJSX = Object.entries(bookingHistory).map(
        ([key, value]) => {
          return (
            <div key={key}>
              <h3>Booking ID: {key}</h3>
              <p>Ages: {value.bookingDetails.ages.join(", ")}</p>
              <p>
                Selected Seats: {value.bookingDetails.selectedSeats.join(", ")}
              </p>
              <p>Selected Showtime: {value.bookingDetails.selectedShowtime}</p>
              <p>Total Price: {value.bookingDetails.totalPrice}</p>
            </div>
          );
        }
      );
      setRenderBookingHistory(bookingHistoryJSX);
    } else {
      setRenderBookingHistory(<p>No purchase history found.</p>);
    }
  }, [bookingHistory]);

  const handleCardNumberChange = (e) => {
    const val = e.target.value.substring(0, 16);
    setUserData({
      ...userData,
      paymentCard: val,
    });
  };
  const handleSave = () => {
    // If a password is provided, update the password first
    if (userData.password && userData.password.trim() !== "") {
      reauthenticateUser(userData.currentPassword) // You need to obtain the current password from the user
        .then(() => {
          // Now update the password
          return updateUserPassword(userData.password);
        })
        .then(() => {
          console.log("Password updated successfully!");
          saveProfileData(); // Save the rest of the profile data
        })
        .catch((error) => {
          if (error.code === "auth/wrong-password") {
            setError("The current password is incorrect.");
          } else {
            setError("Error updating password.");
          }
        });
    } else {
      saveProfileData(); // Save the profile data if no new password is provided
    }
  };
  const saveProfileData = () => {
    // Remove the password from the userData object before saving
    const userDataToSave = { ...userData };
    delete userDataToSave.password;
    delete userDataToSave.currentPassword;

    updateUserData(userId, userDataToSave)
      .then(() => alert("Profile updated successfully!"))
      .catch((err) => setError("Error updating profile."));
  };

  const handleCheckboxChange = (event) => {
    setChecked(event.target.checked);
  };

  console.log("booking history at render:", bookingHistory);

  return (
    <>
      <div className="home">
        <Sidebar />
        <div className="homeContainer">
          <Navbar />
          <div className="edit-profile-form">
            <h1 className="edit-form-heading">Edit Profile</h1>
            {loading && <div>Fetching User Details...</div>}
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="input-group">
                <label>
                  Email:
                  <input
                    className="edit-profile-input"
                    value={userData.email}
                    disabled
                  />
                </label>
              </div>
              <div className="name-container">
                <div className="input-group">
                  <label>
                    First Name:
                    <input
                      className="edit-profile-input"
                      value={userData.firstName}
                      onChange={(e) =>
                        setUserData((prev) => ({
                          ...prev,
                          firstName: e.target.value,
                        }))
                      }
                    />
                  </label>
                </div>

                <div className="input-group">
                  <label>
                    Last Name:
                    <input
                      className="edit-profile-input"
                      value={userData.lastName}
                      onChange={(e) =>
                        setUserData((prev) => ({
                          ...prev,
                          lastName: e.target.value,
                        }))
                      }
                    />
                  </label>
                </div>
              </div>
              <div className="input-group">
                <label>Billing Address:</label>
                <textarea
                  className="edit-profile-input"
                  rows="4"
                  value={userData.billingAddress}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      billingAddress: e.target.value,
                    }))
                  }
                ></textarea>
              </div>

              <div className="input-group">
                <label>
                  <label>
                    Current Password (for re-authentication):
                    <input
                      className="edit-profile-input"
                      type="password"
                      onChange={(e) =>
                        setUserData((prev) => ({
                          ...prev,
                          currentPassword: e.target.value,
                        }))
                      }
                    />
                  </label>
                  Password:
                  <input
                    className="edit-profile-input"
                    type="password"
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        password: e.target.value,
                      }))
                    }
                  />
                </label>
              </div>

              <div className="input-group">
                <label>
                  Payment Card:
                  <input
                    className="edit-profile-input"
                    value={userData.paymentCard}
                    minLength={16}
                    maxLength={16}
                    onChange={handleCardNumberChange}
                  />
                </label>
              </div>

              <div className="checkbox-profile">
                <input
                  type="checkbox"
                  checked={userData.registerForPromotion}
                  onChange={(e) => {
                    handleCheckboxChange(e);
                    setUserData((prev) => ({
                      ...prev,
                      registerForPromotion: e.target.checked,
                    }));
                  }}
                />
                <label className="register-for-promotion">
                  Register for promotions
                </label>
              </div>

              <div className="input-group"></div>
              <button onClick={handleSave}>Save</button>
            </form>
            {error && <div>{error}</div>}
          </div>

          <div className="booking-history-container">
            <h2>Purchase History</h2>
            {renderBookingHistory}
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
