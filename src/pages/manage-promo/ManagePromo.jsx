import React, { useState } from "react";
import "./managepromo.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { AuthContext } from "../../context/AuthContext";
import { createPromo } from "../../components/email/Promos";
import { useContext } from "react";
import { fetchAllUserData } from "../../dataService";

const ManagePromo = () => {
  const { currentUser } = useContext(AuthContext);
  const [subject, setSubject] = useState("");
  const [text, setText] = useState("");
  const [to, setTo] = useState("");
  const [promoId, setPromoId] = useState("");
  const [promoVal, setPromoVal] = useState("");
  const from = "totallyrealmovies@gmail.com"; // Hardcoded 'from' email address

  const sendEmail = async (from, subject, text, html, to = null) => {
    const body = JSON.stringify({ from, subject, text, html });
    const url = "https://functions-sendemail-4pcopkyfsa-uc.a.run.app";
    let recipientList = [];

    // If 'to' parameter is not blank, use it as the recipient
    if (to) {
      recipientList.push(to);
    } else {
      // If 'to' parameter is blank, use existing code to fetch all user data
      const allUserData = await fetchAllUserData();
      console.log(allUserData);
      // Loop through user data
      for (let userId in allUserData) {
        // Check if user has registerForPromotion flag set as true
        if (allUserData[userId].registerForPromotion) {
          // Add their email to recipientList
          recipientList.push(allUserData[userId].email);
        }
      }
    }

    // Loop through recipientList
    for (let i = 0; i < recipientList.length; i++) {
      const emailBody = JSON.parse(body);
      emailBody.to = recipientList[i];
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emailBody),
      });
      console.log("request body:");
      console.log(body);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedText =
        text + " promoId: " + promoId + " promoVal: " + promoVal;
      const html = "<strong>" + updatedText + "</strong>";
      const response = await sendEmail(from, subject, text, html, to);
      console.log(response); // Log the response from the server
      if (response.code === 200) {
        alert("Email successfully sent!");
      } else {
        alert("Email failed");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Email failed");
    }
  };

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />

        <div className="manage-movies">
          <div className="movie-form">
            <h2>Send Promo Email</h2>
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <label>
                  To
                  <input
                    type="text"
                    placeholder="jane.doe@gmail.com"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                  />
                  If left blank, this will be sent to all users who are
                  registered with promotions.
                </label>
              </div>
              <div className="input-group">
                <label>
                  Subject
                  <input
                    type="text"
                    placeholder="Subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    required
                  />
                </label>
              </div>
              <div className="input-group">
                <label>
                  Text
                  <input
                    type="text"
                    placeholder="Text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    required
                  />
                </label>
              </div>
              <div className="input-group">
                <label>
                  PromoID
                  <input
                    type="text"
                    placeholder="123ABC"
                    value={promoId}
                    onChange={(e) => setPromoId(e.target.value)}
                    required
                  />
                </label>
              </div>
              <div className="input-group">
                <label>
                  Promo Value
                  <input
                    type="text"
                    placeholder="10%"
                    value={promoVal}
                    onChange={(e) => setPromoVal(e.target.value)}
                    required
                  />
                </label>
              </div>
              <button type="submit">Send Email</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagePromo;
