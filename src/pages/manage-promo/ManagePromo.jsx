import React, { useState } from "react";
import "./managepromo.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";

const ManagePromo = () => {
  const [subject, setSubject] = useState("");
  const [text, setText] = useState("");
  const [to, setTo] = useState("");
  const [promoId, setPromoId] = useState("");
  const [promoVal, setPromoVal] = useState("");
  const from = "totallyrealmovies@gmail.com"; // Hardcoded 'from' email address

  const sendEmail = async (to, from, subject, text, html) => {
    // Prepare the body of the POST request
    const body = JSON.stringify({ to, from, subject, text, html });
    const url = "https://functions-sendemail-4pcopkyfsa-uc.a.run.app";

    // Make the POST request
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: body,
    });
    console.log("request body:");
    console.log(body);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedText =
        text + " promoId: " + promoId + " promoVal: " + promoVal;
      const html = "<strong>" + updatedText + "</strong>";
      const response = await sendEmail(to, from, subject, text, html);
      console.log(response); // Log the response from the server
      alert("Email successfully sent!");
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Email Sent");
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
                    required
                  />
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
