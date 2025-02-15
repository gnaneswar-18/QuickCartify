import uploadImageCloudinary from '../utils/uploadImageCloudinary.js'
const uploadImageController = async(req,res)=>{
    try {
        const file=req.file
        const image=await uploadImageCloudinary(file)
        return res.json({
            message: "Image uploaded successfully",
            error: false,
            success: true,
            data: image.url
           
          
        });
        
    } catch (error) {
        return res.status(500).json({message:error.message,
            error: true,
            success: false
        });
    }
}
export default uploadImageController