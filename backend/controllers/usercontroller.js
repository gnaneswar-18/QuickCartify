import Usermodel from '../models/usermodel.js';
import bcryptjs from "bcryptjs"
import jwt from 'jsonwebtoken'
import sendEmail from '../config/sendEmail.js'
import verifyEmailTemplate from '../utils/verifyEmailTemplate.js'
import forgetPasswordtemplate from '../utils/forgetPasswordTemplate.js'
import generateOtp from '../utils/generateOtp.js'
import generateAccessToken from '../utils/generateAccessToken.js'
import generateRefreshToken from '../utils/generateRefreshtoken.js'
import uploadImageCloudinary from '../utils/uploadImageCloudinary.js';
const registerUserController = async (req, res) => {
    console.log(req.body)
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) return res.status(400).json({
            "message": "Please provide all fields", error: true,
            success: false,
        })

        const user = await Usermodel.findOne({ email });
        if (user) {
            return res.status(400).json({
                "message": "Email already exists", error: true,
                success: false,
            })
        }
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt)
        const newUser = new Usermodel({ name, email, password: hashedPassword });
        const saveduser = await newUser.save();

        const verifyEmailUrl = `${process.env.FRONTEND_URL}/verify_email?code=${saveduser._id}`
        // const verifyEmailUrl = `${process.env.FRONTEND_URL}/register`

        const verificationemail = await sendEmail({
            sendTo: email, subject: 'verification email',
            html: verifyEmailTemplate({ name, url: verifyEmailUrl })
        })
        return res.status(200).json({
            message: "User registered successfully. Please verify your email",
            error: false,
            success: true,
        })

    } catch (err) {
        return res.status(500).json({
            message: err.message,
            error: true,
            success: false,
        });
    }
}
const verifyEmailController = async (req, res) => {
    try {
        const { code } = req.body
        const user = await Usermodel.findOne({ _id: code })
        if (!user) {
            return res.status(400).json({
                message: "Invalid code",
                error: true,
                success: false,
            })

        }
        const updateUser = await Usermodel.updateOne({ _id: code }, { verify_email: true })
        return res.status(200).json({
            message: "Email verified successfully",
            error: false,
            success: true,
        })

    } catch (err) {
        return res.status(500).json({
            message: err.message,
            error: true,
            success: false,
        })
    }
}
const loginController = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await Usermodel.findOne({ email })

        if (!user) {
            return res.status(400).json({
                message: "User not found",
                error: true,
                success: false,
            })
        }
        if (user.status !== 'Active') {
            return res.status(400).json({
                message: "user account is not active.contact ADMIN",
                error: true,
                success: false,
            })

        }
        const isMatch = await bcryptjs.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid password",
                error: true,
                success: false,
            })
        }
        const updateuser=await Usermodel.findByIdAndUpdate(user?._id,{
            last_login_date:new Date(),
        })
        const accessToken = await generateAccessToken(user._id);
        const refreshToken = await generateRefreshToken(user._id);
        const cookiesOptions = {
            httpOnly: true,
            secure: true,
            sameSite: 'None'
        }
        res.cookie('accessToken', accessToken, cookiesOptions)
        res.cookie('refreshToken', refreshToken, cookiesOptions)
        return res.status(200).json({
            message: "Logged in successfully",
            error: false,
            success: true,
            data: { accessToken, refreshToken }
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message,
            error: true,
            success: false
        })
    }
}
const logoutController = async (req, res) => {
    try {
        const cookiesOptions = {
            httpOnly: true,
            secure: true,
            sameSite: 'None'
        }
        res.clearCookie('accessToken', cookiesOptions)
        res.clearCookie('refreshToken', cookiesOptions)
        const removeRefreshToken = await Usermodel.findByIdAndUpdate(req.userId, { refresh_token: "" })
        res.status(200).json({
            message: "Logged out successfully",
            error: false,
            success: true
        })

    } catch (err) {
        res.status(500).json({
            message: err.message,
            error: true,
            success: false
        })
    }
}

const uploadUserAvatarController = async (req, res) => {
    try {
        const image = req.file
        const upload = await uploadImageCloudinary(image)
        const updateUser = await Usermodel.findByIdAndUpdate(req.userId, { avatar: upload.url })
        return res.json({
            message: "Avatar uploaded successfully",
            error: false,
            success: true,
            data: {
                id: req.userId,
                avatar: upload.url
            }
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message,
            error: true,
            success: false
        })
    }
}
const updateUserDetailsController = async (req, res) => {
    try {
        const { name, email, password, mobile } = req.body
        if (password) {
            const salt = await bcryptjs.genSalt(10);
            const hashedPassword = await bcryptjs.hash(password, salt)
        }
        const updateUser = await Usermodel.updateOne({ _id: req.userId },
            {
                ...(name && { name: name }),
                ...(email && { email: email }),
                ...(password && { password: hashedPassword }),
                ...(mobile && { mobile: mobile })
            })
        return res.status(200).json({
            message: "User details updated successfully",
            error: false,
            success: true,
            data: updateUser
        })

    } catch (err) {
        return res.status(500).json({
            message: err.message,
            error: true,
            success: false
        })
    }
}
const forgotPasswordController = async (req, res) => {
    try {
        const { email } = req.body
        const user = await Usermodel.findOne({ email })
        if (!user) return res.status(404).json({
            message: "User with provided email not found",
            error: true,
            success: false
        })
        const otp = generateOtp()
        const expireTime = new Date() + 60 * 60 * 1000
        await Usermodel.findByIdAndUpdate(user._id,
            {
                forget_password_otp: otp,
                forget_password_expiry: new Date(expireTime).toISOString()
            }

        )
        await sendEmail(
            {
                sendTo: email,
                subject: "forgot password from ecommerce",
                html: forgetPasswordtemplate({
                    name: user.name,
                    otp: otp
                })
            }
        )
        return res.json({
            message: "check your email address",
            error: false,
            success: true
        })


    } catch (err) {
        return res.status(500).json({
            message: err.message,
            error: true,
            success: false
        })
    }
}
const verifyForgotPasswordOtpController = async (req, res) => {
    try {
        const { email, otp } = req.body
        if (!email || !otp) {
            return res.status(400).json({
                message: "Otp is required",
                error: true,
                success: false
            })
        }
        const user = await Usermodel.findOne({ email })
        if (!user) return res.status(404).json({
            message: "User with provided email not found",
            error: true,
            success: false
        })

        const currentTime = new Date().toISOString()
        if (user.forget_password_expiry < currentTime) {
            return res.status(403).json({
                message: "Otp expired",
                error: true,
                success: false
            })
        }
        if (otp !== user.forget_password_otp) {
            return res.status(400).json({
                message: "Invalid Otp",
                error: true,
                success: false
            })
        }
        const updateUser = await Usermodel.findByIdAndUpdate(user._id, { forget_password_otp: "", forget_password_expiry: "" })
        return res.json({
            message: "verify otp successfully",
            success: true,
            error: false
        })


    } catch (err) {
        return res.status(500).json({
            message: err.message, error: true,
            success: false
        })

    }
}
const resetPasswordController = async (req, res) => {
    try {
        const { email, newpassword, confirmpassword } = req.body
        if (!email || !newpassword || !confirmpassword) {
            return res.status(400).json({
                message: "All fields are required",
                error: true,
                success: false
            })
        }
        const user = await Usermodel.findOne({ email })
        if (!user) return res.status(404).json({
            message: "User with provided email not found",
            error: true,
            success: false
        })
        if (newpassword !== confirmpassword) {
            return res.status(400).json({
                message: "conformPassword should match newPassword",
                error: true,
                success: false
            })
        }
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(newpassword, salt)
        const updateduser = await Usermodel.findOneAndUpdate(user._id, {
            password: hashedPassword
        })
        return res.json({
            message: "password updated successfully",
            success: true,
            error: false
        })



    } catch (err) {
        return res.status(500).json({
            message: err.message, error: true,
            success: false
        })
    }
}
const refreshTokenController = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken || req?.headers?.authorization?.split(" ")[1];

        if (!refreshToken) {
            return res.status(403).json({ message: 'No refresh token provided', error: true, success: false })
        }
        const data = await jwt.verify(refreshToken, process.env.SECRET_KEY_REFRESH_TOKEN)
        if (!data) {
            return res.status(403).json({ message: 'Invalid refresh token', error: true, success: false })
        }
        const cookiesOptions = {
            httpOnly: true,
            secure: true,
            sameSite: 'None'
        }
        const newaccessToken = await generateAccessToken(data?.id)

        res.cookie('accessToken', newaccessToken, cookiesOptions)

        return res.json({ message: 'Access Token refreshed successfully', error: false, success: true, data: { newaccessToken } })

    } catch (err) {
        return res.status(500).json({ message: err.message, error: true, success: false })
    }
}
const userDetailsController = async (req, res) => {

    try {
        const userId = req.userId;
        const user = await Usermodel.findById(userId).select('-password -refresh_token');
        return res.json({
            message: 'User details fetched successfully',
            error: false,
            success: true,
            data: user
        })
    } catch (error) {
        return res.status(500).json({
            message: "something went wrong",
            error: true,
            success: false
        })
    }


}
export {
    registerUserController,
    verifyEmailController,
    loginController,
    logoutController,
    uploadUserAvatarController,
    updateUserDetailsController,
    forgotPasswordController,
    verifyForgotPasswordOtpController,
    resetPasswordController,
    refreshTokenController,
    userDetailsController

} 