import mongoose from "mongoose";
const categoryschema = new mongoose.Schema({
    name: { type: String, default:" "},
   image: { type: String, default:""}
},{
    timestamps: true
});
const categoryModel=mongoose.model('Category',categoryschema);
export default categoryModel;