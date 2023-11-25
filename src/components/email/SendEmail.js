import sgMail from "@sendgrid/mail";

// For the record, this is really stupid and should only be done on the server's
// end. However, I don't have a credit card on this account so who cares if
// someone steals the api key ¯\_(ツ)_/¯
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
export const sendEmail = async (to, from, subject, text, html) => {
  const msg = {
    to: to,
    from: from,
    subject: subject,
    text: text,
    html: html,
  };
  try {
    await sgMail.send(msg);
    console.log("Email sent");
  } catch (error) {
    console.error(error);
  }
};
