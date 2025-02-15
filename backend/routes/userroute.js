import express from 'express';
import { registerUserController, verifyEmailController 
,loginController,logoutController,uploadUserAvatarController,
updateUserDetailsController,forgotPasswordController,verifyForgotPasswordOtpController,
resetPasswordController,
refreshTokenController,
userDetailsController,
} from '../controllers/usercontroller.js';
import auth from '../middleware/auth.js';
import upload from '../middleware/multer.js';
const userRouter = express.Router();

userRouter.post('/register', registerUserController);
userRouter.post('/verify-email', verifyEmailController);
userRouter.post('/login', loginController);
userRouter.get('/logout', auth,logoutController);
userRouter.put('/upload-avatar',auth,upload.single('avatar'),uploadUserAvatarController);
userRouter.put('/update-user',auth, updateUserDetailsController)
userRouter.put('/forget-password',forgotPasswordController);
userRouter.put('/verify-forget-password-otp',verifyForgotPasswordOtpController);
userRouter.put('/reset-password',resetPasswordController);
userRouter.post('/refresh-token',refreshTokenController);
userRouter.get('/user-details',auth,userDetailsController);
export default userRouter;
