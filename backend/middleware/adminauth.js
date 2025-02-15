import User from '../models/usermodel.js'
const Adminauth=async(req,res,next)=>{
    try {
        const userId=req.userId
        const user=await User.findById(userId)
        if(user.role!=="Admin") return res.status(403).json({message:"permission denied",error:true,success:false});
        next()
    } catch (error) {
        res.status(500).json({message:"permission denied",error:true,success:false});
    }

}
export default Adminauth