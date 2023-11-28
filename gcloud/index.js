const functions = require("@google-cloud/functions-framework");
const sgMail = require("@sendgrid/mail");

// Set your SendGrid API key here
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
// Define the Cloud Function
functions.http("sendEmail", (req, res) => {
  // Set CORS headers for preflight requests
  // Allows GETs from any origin with the Content-Type header
  // and caches preflight response for 3600s

  res.set("Access-Control-Allow-Origin", "*");

  if (req.method === "OPTIONS") {
    // Send response to OPTIONS requests
    res.set("Access-Control-Allow-Methods", "GET");
    res.set("Access-Control-Allow-Headers", "Content-Type");
    res.set("Access-Control-Max-Age", "3600");
    res.status(204).send("");
  } else {
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Methods", "GET, POST");
    res.set("Access-Control-Allow-Headers", "*");
    res.set("Access-Control-Max-Age", "3600");

    const { to, from, subject, text, html } = req.body;

    // Create the email
    const msg = {
      to: to,
      from: from,
      subject: subject,
      text: text,
      html: html,
    };
    console.log("request is");
    console.log(req.body);
    console.log("message is");
    console.log(msg);
    // Send the email
    sgMail
      .send(msg)
      .then(() => {
        res.status(200).send("Email sent successfully");
      })
      .catch((error) => {
        console.error(error);
        if (error.response) {
          console.error(error.response.body);
        }
        res.status(500).send("Error sending email");
      });
  }
});
