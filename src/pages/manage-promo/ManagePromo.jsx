import React, { useState } from "react";
import "./managepromo.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";

const ManagePromo = () => {
  const [subject, setSubject] = useState("");
  const [text, setText] = useState("");

  const to = "alex.teal@uga.edu"; // Hardcoded 'to' email address
  const from = "totallyrealmovies@gmail.com"; // Hardcoded 'from' email address

  const sendEmail = async (to, from, subject, text, html) => {
    // Prepare the body of the POST request
    const body = JSON.stringify({ to, from, subject, text, html });
    const url = "https://us-central1-theatre-proj.cloudfunctions.net/sendEmail";

    // Make the POST request
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: body,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await sendEmail(to, from, subject, text, "");
      console.log(response); // Log the response from the server
      alert("Email successfully sent!");
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Failed to send email.");
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
              <button type="submit">Send Email</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagePromo;
