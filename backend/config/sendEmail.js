import { Resend } from 'resend';
import dotenv from 'dotenv';
dotenv.config()
if (process.env.RESEND_API) {
    console.log('provide RESEND_API inside .env file');
}
const resend = new Resend(process.env.RESEND_API);

const sendEmail = async ({ sendTo, subject, html }) => {
    try {
        const { data, error } = await resend.emails.send({
            from: 'ecommerce <onboarding@resend.dev>',
            to: sendTo,
            subject: subject,
            html: html,
        });
        if (error) {
            return console.error({ error });
        }
        return data;

    } catch (error) {
        console.log(error);
    }
}
export default sendEmail;

// This code is for sending emails using the Resend service.
// It initializes the Resend client with an API key from environment variables,
// and defines a function to send emails with the specified parameters.