import React, { useState } from "react";
import { sendEmail } from "../../components/email/SendEmail";
import "./managepromo.scss";

const ManagePromo = () => {
  const [subject, setSubject] = useState("");
  const [text, setText] = useState("");

  const to = "alex.teal@uga.edu"; // Hardcoded 'to' email address
  const from = "totallyrealmovies@gmail.com"; // Hardcoded 'from' email address

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await sendEmail(to, from, subject, text, "");
      alert("Email successfully sent!");
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Failed to send email.");
    }
  };

  return (
    <div className="manage-promo">
      <div className="promo-form">
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
  );
};

export default ManagePromo;
