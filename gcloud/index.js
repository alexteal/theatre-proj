//gcloud functions deploy sendEmail --gen2 --runtime nodejs14 --trigger-http --allow-unauthenticated 
const functions = require("@google-cloud/functions-framework");
const sgMail = require("@sendgrid/mail");

// Set your SendGrid API key here
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Define the Cloud Function
functions.http("sendEmail", (req, res) => {
  // Only allow POST requests
  if (req.method !== "POST") {
    res.status(405).send("Method Not Allowed");
    return;
  }

  const { to, from, subject, text, html } = req.body;

  // Create the email
  const msg = {
    to: to,
    from: from,
    subject: subject,
    text: text,
    html: html,
  };

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
