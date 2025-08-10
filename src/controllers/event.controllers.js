import Event from "../models/event.model.js";
import User from "../models/user.model.js"
import Registration from "../models/registration.model.js"
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createEvent = asyncHandler(async (req, res) => {
  const {
    title,
    subtitle,
    date,
    time,
    participantsLimit,
    location,
    duration,
    participants,
    prizes,
    type,
    color,
    bgColor,
    highlights,
    schedule,
    requirements,
    description,
  } = req.body;
  console.log(req.body);
  if (
    !title ||
    !subtitle ||
    !date ||
    !time ||
    !location ||
    !duration ||
    !participants ||
    !prizes ||
    !type ||
    !color ||
    !bgColor ||
    !highlights ||
    !description
  ) {
    return res.status(400).json({ message: "Incomplete details" });
  }

  const doesEventAlreadyExist = await Event.findOne({ title });
  if (doesEventAlreadyExist)
    throw new ApiError(400, "Event title already in use.");

  const newEvent = await Event.create({
    title,
    subtitle,
    date,
    time,
    participantsLimit,
    location,
    duration,
    participants,
    prizes,
    type,
    color,
    bgColor,
    highlights,
    schedule,
    requirements,
    description,
  });

  res
    .status(201)
    .json(new ApiResponse(200, newEvent, "Event successfully created"));
});

const deleteEvent=asyncHandler( async(req,res) => {

      const deleteEventId =req.params.id;

      
      const doesEventExist=await Event.findById(deleteEventId);


      if(!doesEventExist)
           throw new ApiError(400,"Event does not exist.");

      const response=await Event.findByIdAndDelete(deleteEventId);
      console.log(response);
      res.
      status(200)
      .json(
        new ApiResponse(200,response,"Event deleted successfully")
      );

});

const editEventDetails = asyncHandler(async (req, res) => {
  const {
    title,
    subtitle,
    date,
    time,
    participantsLimit,
    location,
    duration,
    participants,
    prizes,
    type,
    color,
    bgColor,
    highlights,
    schedule,
    requirements,
    description,
  } = req.body;

  const updates = {
    title,
    subtitle,
    date,
    time,
    participantsLimit,
    location,
    duration,
    participants,
    prizes,
    type,
    color,
    bgColor,
    highlights,
    schedule,
    requirements,
    description,
  };

  const eventId = req.params.id;

  const doesEventExist = await Event.findById(eventId);
  if (!doesEventExist) {
    throw new ApiError(404, "Event does not exist.");
  }

  Object.entries(updates).forEach(([key, value]) => {
    if (value !== undefined) doesEventExist[key] = value;
  });

  await doesEventExist.save({ validateBeforeSave: false });

  res.status(200).json(
    new ApiResponse(200, doesEventExist, "Event updated successfully")
  );
});


const getSingleEvent=asyncHandler( async(req,res) => {
      const { id } =req.params;
      
      const findEvent=await Event.findById(id);

      if(!findEvent)
        throw new ApiError(400,"Event not found.");
      res
      .status(200)
      .json(
        new ApiResponse(200,findEvent,`${findEvent.event_name} details fetched succesfully`)
      );
});

const getAllEvents=asyncHandler( async(req,res) => {
  const events=await Event.find();

  res
  .status(200)
  .json(
    new ApiResponse(200,events,"All events detail fetched successfully.")
  )
});


export {
  createEvent,
  deleteEvent,
  editEventDetails,
  getSingleEvent,
  getAllEvents,
  // uploadEventImage
};
