import AddressModel from '../models/addressmodel.js'
import userModel from '../models/usermodel.js'

const addAddressController =async(req,res)=>{
    try {
        const userId=req.userId;
        const {address_line,city,state,pincode,country,mobile}=req.body;
        if(!address_line || !city || !state || !pincode || !country|| !mobile){
            return res.status(400).json({
                message:"Please enter all required fields",
                error:true,
                success:false
            })
        }

        const newaddress=new AddressModel({
            address_line,
            city,
            state,
            pincode,
            country,
            mobile,
            userId,
        })
        const savedaddress=await newaddress.save();
        const addUserAddress = await userModel.findByIdAndUpdate(
            userId,
            { $push: { address_details :savedaddress ._id } }, 
            { new: true, runValidators: true } 
        );
        
        if(!addUserAddress){
            return res.status(404).json({
                message:"User not found",
                error:true,
                success: false,
            })
        }
        return res.json({
            message:"Address added successfully",
            data:savedaddress,
            error:false,
            success: true,
        })
        
    } catch (error) {
        return res.status(500).json({
            message: error.message || "Server error",
            error: true,
            success: false,

        })
    }
}

const getAddressController=async(req,res)=>{
    try {
        const userId=req.userId;
        const userAddresses=await AddressModel.find({ userId: userId}).sort({createdAt:-1})

        return res.json({
            message: "User addresses fetched successfully",
            data: userAddresses,
            error: false,
            success: true,  
        })
        
    } catch (error) {
        return res.status(500).json({
            message: error.message || "Server error",
            error: true,
            success: false,
        })
    }
}

const deleteAddressController=async(req,res)=>{
    try {
        const userId=req.userId;
        if (!userId) {
            return res.status(400).json({ message: "User ID missing", error: true, success: false });
        }
        const {id}=req.body;
        if(!id)return res.status(400).json({message:"Please provide address id",error:true,success:false})
            
        const deletedAddress=await AddressModel.findByIdAndDelete(id);
        if(!deletedAddress) return res.status(404).json({message:"Address not found",error:true,success:false})
            
        const updateUserAddress = await userModel.findByIdAndUpdate(userId,{
            $pull: { address_details : id } }, 
            { new: true, runValidators: true }
        )
        if(!updateUserAddress) return res.status(404).json({message:"User not found",error:true,success:false})
            
        return res.json({
            message: "Address deleted successfully",
            error: false,
            success: true,
        })
        
    } catch (error) {
        return res.status(500).json({
            message: error.message || "Server error",
            error: true,
            success: false,
        })
    }
}
export {
    addAddressController,
    getAddressController,
    deleteAddressController
}