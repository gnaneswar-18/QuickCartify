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
    state:{
        type:Boolean,
        default:true
    }
},{
    timestamps:true
})

const AddressModel=mongoose.model('Address',addressSchema)
export default AddressModel;