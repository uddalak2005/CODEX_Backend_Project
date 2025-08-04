
import mongoose,{ Schema } from "mongoose"

const managedUserSchema=new Schema({
    userName:
    {
        type:String,
        required:true
    },
    userEmail:{
        type:String,
        required:true
    },
    joiningDate:{
        type:Date,
        required:true
    },
    status:{
        type:String,
        required:true
    },
    year:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true
    }

},{timestamps:true})

const managedUser=mongoose.model("managedUser",managedUserSchema);

export default managedUser