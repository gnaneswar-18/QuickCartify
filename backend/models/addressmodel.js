import moongose from 'mongoose'
const addressSchema=new moongose.Schema({
    address_line:{
        type:String,
        default:""
    },
    city:{
        type:String,
        default:""
    },
    state:{
        type:String,
        default:""
    },
    pincode:{
        type:String,
        default:""
    },
    country:{
        type:String,
        
    },
    mobile:{
        type:Number,
        default:null
    },
    userId:{
        type: moongose.Schema.Types.ObjectId,
        ref: "User"
    }
},{
    timestamps:true
})

const AddressModel=moongose.model('Address',addressSchema)
export default AddressModel;