import { link } from "joi";
import mongoose, { Schema } from "mongoose";

const projectShowcaseSchema=new Schema({
    title:{
        type:String
    },
    description:{
        type:String
    },
    techStack:{
        type:[String]
    },
    githubLink:{
        type:link
    },
    projectOwner:{
        type:mongoose.Types.ObjectId,
        ref:"User"
    },
    videos:[
        {
        public_id: { type: String, required: true },
        url: { type: String, required: true },
        }
    ],
    images:[
        {
        public_id: { type: String, required: true },
        url: { type: String, required: true },
        }
    ]
},{timestamps:true})
// title, team members, description, tech stack, GitHub link, images/videos
export const projectShowcase=mongoose.model("projectShowcase",projectShowcaseSchema);