import jwt from 'jsonwebtoken';
const auth=async(req,res,next)=>{
    try {
        const token=req.cookies.accessToken|| req?.headers?.authorization?.split(" ")[1];
        if(!token){
            return res.status(401).json({
                message: "provide token",
                error: true,
                success: false,
            })
        }
        const decode=await jwt.verify(token,process.env.SECRET_KEY_ACCESS_TOKEN)
        if(!decode){
            return res.status(401).json({
                message: "unautorized access ",
                error: true,
                success: false,
            })
        }
        req.userId=decode.id;
        next()
    } catch (err) {
        return res.status(501).json({
            message: err.message,
            error: true,
            success: false,
        })
    }

}
export default auth