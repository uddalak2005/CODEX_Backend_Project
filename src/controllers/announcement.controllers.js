import  Announcement  from "../models/announcement.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createAnnouncement=asyncHandler( async(req,res)=> {
    const { title,date,content,priority }=req.body

    if(!title || !date || !content || !priority)
        throw new ApiError(400,"Details not complete for the announcement");

    if (isNaN(Date.parse(date))) {
  throw new ApiError(400, "Invalid date format.");
}

    const response = await Announcement.create({
  title: title.trim(),
  date,
  content: content.trim(),
  priority: priority.trim()
});


    return res
    .status(200)
    .json(
        new ApiResponse(200,response,"Announcement created Successfully.")
    )
})

const getAnnouncements=asyncHandler( async(req,res) => {
    const response=await Announcement.find();

    if(response.length===0)
        throw new ApiError(400,"No announcement exist.")

    return res
    .status(200)
    .json(
        new ApiResponse(200,response,"Announcements fetched succesfully.")
    )
})

const getSingleAnnouncement=asyncHandler( async(req,res) => {
    const announcementId=req.params.id;

    const response=await Announcement.findById(announcementId);

    if(!response)
        throw new ApiError(400,"Announcement does not exist.")

     return res
    .status(200)
    .json(
        new ApiResponse(200,response,"Announcement details fetched succesfully.")
    )

})
const editAnnouncement=asyncHandler( async(req,res) => {
    const announcementId=req.params.id;

    const { title,date,content,priority }=req.body

    if (date && isNaN(Date.parse(date))) {
  throw new ApiError(400, "Invalid date format.");
}

    const updates={
        title,
        date,
        content,
        priority
    }

    const response=await Announcement.findById(announcementId);

    if(!response)
        throw new ApiError(400,"Announcement does not exist.")

    Object.entries(updates).forEach(([key,value])=>{
        if(value!==undefined) response[key]=value;
    })

    await response.save({ validateBeforeSave: false });

    return res
    .status(200)
    .json(
        new ApiResponse(200,response,"Announcement updated succesfully.")
    )
    
})

const deleteAnnouncement=asyncHandler( async(req,res) => {
    const announcementId=req.params.id;

    const response=await Announcement.findByIdAndDelete(announcementId);

    if(!response)
        throw new ApiError(400,"Announcement does not exist to delete.")

    return res
    .status(200)
    .json(
        new ApiResponse(200,response,"Announcement deleted succesfully.")
    )
    
})

export {
    createAnnouncement,
    editAnnouncement,
    deleteAnnouncement,
    getAnnouncements,
    getSingleAnnouncement
}