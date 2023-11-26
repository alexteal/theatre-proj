const sgMail = require("@sendgrid/mail");

const functions = require("@google-cloud/functions-framework");

functions.http("sendEmail", (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  if (req.method === "OPTIONS") {
    // Send response to OPTIONS requests
    res.set("Access-Control-Allow-Methods", "GET");
    res.set("Access-Control-Allow-Headers", "Content-Type");
    res.set("Access-Control-Max-Age", "3600");
    res.status(204).send("");
  }
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
});
