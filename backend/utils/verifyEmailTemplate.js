const verifyEmailTemplate=({name,url})=>{
    return `
    <h1>Welcome to our website!</h1>
    <p>Dear ${name},</p>
    <p>Thank you for signing up for ecommerce site. To confirm your subscription, please click on the following link:</p>
    <a href="${url}">Confirm Subscription</a>
    <p>Best regards,</p>
    <p>Your Team</p>
    `;
}
export default verifyEmailTemplate