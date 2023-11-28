const functions = require("firebase-functions");
const sgMail = require("@sendgrid/mail");

exports.sendEmail = functions.https.onRequest((req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "GET, POST");
  res.set("Access-Control-Allow-Headers", "*");
  res.set("Access-Control-Max-Age", "3600");
  if (req.method === "OPTIONS") {
    // Send response to OPTIONS requests
    res.set("Access-Control-Allow-Methods", "GET, POST");
    res.set("Access-Control-Allow-Headers", "*");
    res.set("Access-Control-Max-Age", "3600");
    res.set("Access-Control-Allow-Origin", "*");
    res.status(204).send("");
  } else {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const { to, from, subject, text, html } = req.body;
    const msg = {
      to: to,
      from: from,
      subject: subject,
      text: text,
      html: html,
    };
    sgMail
      .send(msg)
      .then(() => {
        console.log("Email sent");
        res.status(200).send("Email sent");
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send("Error sending email");
      });
  }
});
