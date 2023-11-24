import sgMail from "@sendgrid/mail";
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
