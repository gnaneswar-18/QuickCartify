const forgotPasswordTemplate=({name,otp})=>{
    return `
    <h1>Welcome to our website!</h1>
    <p>Dear ${name},</p>
    <p>you're requested for password reset.please use the following otp to reset your password  </p>
    <div>
      ${otp}
     </div>
     <p>otp is valid for one hour only</p>
    <p>Best regards,</p>
    <p>Your Team</p>
    `;
}
export default forgotPasswordTemplate