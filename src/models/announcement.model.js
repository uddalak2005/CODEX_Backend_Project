
import mongoose,{ Schema } from "mongoose"

const announcementSchema=new Schema({
    title:
    {
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    priority:{
        type:String,
        required:true
    }

},{timestamps:true})

const Announcement=mongoose.model("Announcement",announcementSchema);

export default Announcement