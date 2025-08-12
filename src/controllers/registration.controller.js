import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import User from "../models/user.model.js";
import Registration from "../models/registration.model.js";
import Event from "../models/event.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { sendRSVPEmail } from "../services/sendRSVPEmail.service.js";
import { sendRegistrationConfirmation } from "../services/sendNotification.service.js"
import jwt from 'jsonwebtoken';

//User reggisters for the event
const registerForEvent = asyncHandler(async (req, res) => {
  const { id } = req.params;
  console.log("USER HUN", req.user)
  const userId = req.user?._id;

  if (!userId) throw new ApiError(400, "User ID is missing.");

  const eventPresent = await Event.findById(id);
  if (!eventPresent) throw new ApiError(404, "Event not found.");

  const userExists = await User.findById(userId);
  if (!userExists) throw new ApiError(404, "User does not exist.");

  try {
    const allowedFields = [
      "githubLink",
      "linkedInLink",
      "description",
      "branch",
      "year",
      "teamName",
      "teamSize",
      "skills",
      "experience",
      "expectations",
      "agreeTerms",
      "tshirtSize",
      "dietary",
    ];

    const updates = req.body;

    const registrationData = {
      userId,
      eventId: id,
      registrationDate: new Date(),
      status: "registered",
    };


    registrationData.title = eventPresent.title;
    // Copy only allowed fields
    for (const key of allowedFields) {
      if (updates[key] !== undefined) {
        registrationData[key] = updates[key];
      }
    }
    const response = await Registration.create(registrationData);

    // Optional: update academic info in user profile
    const { branch, year, experience, skills } = req.body;
    const userUpdates = {};
    if (branch) userUpdates.branch = branch;
    if (year) userUpdates.year = year;
    if (experience) userUpdates.experience = experience;
    if (skills) userUpdates.skills = skills;

    if (Object.keys(userUpdates).length > 0) {
      await User.findByIdAndUpdate(userId, { $set: userUpdates }, { new: true });
    }

    try {
      await sendRegistrationConfirmation(userExists, eventPresent);
      console.log("reached till here");
    } catch (err) {
      console.error("Failed to send registration confirmation:", err);
      throw new ApiError(400, `Unable to send Confirmation mail to: ${userExists.fullName}`);
    }


    return res
      .status(200)
      .json(new ApiResponse(200, response, "User successfully registered for the event."));
  } catch (err) {
    if (err.code === 11000) {
      throw new ApiError(400, "User already registered for this event.");
    }
    throw err;
  }
});


//User cancels their registration
const cancelRegistration = asyncHandler(async (req, res) => {
  const { id } = req.params; // Event ID
  const userId = req.user?._id;

  if (!userId)
    throw new ApiError(400, "User ID absent");

  const eventPresent = await Event.findById(id);
  if (!eventPresent)
    throw new ApiError(404, "Event not found");

  const userExists = await User.findById(userId);
  if (!userExists)
    throw new ApiError(404, "User does not exist");

  const registration = await Registration.findOne({ userId, eventId: id });

  if (!registration)
    throw new ApiError(400, "No registration record found");

  if (registration.status === "cancelled")
    throw new ApiError(400, "Registration is already cancelled");

  registration.status = "cancelled";
  await registration.save();

  return res.status(200).json(
    new ApiResponse(200, registration, "Registration cancelled successfully (soft delete)")
  );
});


//admin
const getEventRegistrations = asyncHandler(async (req, res) => {
  const eventId = req.params.id;
  const status = req.query.status;

  const eventExists = await Event.findById(eventId);

  if (!eventExists)
    throw new ApiError(400, "Event does not exist.");

  let registrations;
  if (status)
    registrations = await Registration.find({ eventId, status }).populate("userId", "fullName regNumber email phone");
  else
    registrations = await Registration.find({ eventId }).populate("userId", "fullName regNumber email phone");

  return res
    .status(200)
    .json(
      new ApiResponse(200, registrations, `All registrations for the event ${eventExists.title} fetched successfully.`)
    );
})


//admin
const bulkDeleteRegistrations = asyncHandler(async (req, res) => {
  const { registrations } = req.body; // Array of { userId, eventId } objects

  if (!Array.isArray(registrations) || registrations.length === 0) {
    throw new ApiError(400, "No registrations provided for deletion.");
  }

  const deleted = [];

  for (const { userId, eventId } of registrations) {
    const result = await Registration.findOneAndDelete({ userId, eventId });
    if (result) deleted.push(result);
  }

  return res.status(200).json(
    new ApiResponse(200, deleted, `${deleted.length} registration(s) deleted successfully.`)
  );
});


//admin
const bulkUpdateRegistrationStatus = asyncHandler(async (req, res) => {
  console.log("updating");
  const { registrations } = req.body;

  if (!registrations || !Array.isArray(registrations))
    throw new ApiError(400, "Invalid registrations payload.");

  const results = [];

  console.log(registrations);

  for (const entry of registrations) {
    const { userId, eventId, status } = entry;
    if (!userId || !eventId || !status) continue;

    console.log("iteration")

    const updated = await Registration.findOneAndUpdate(
      { userId, eventId },
      { $set: { status } },
      { new: true }
    );



    console.log(status);

    if (status === "allowed") {

      console.log("allowing");

      const eventDetails = await Event.findById(eventId);
      const user = await User.findById(userId);
      try {
        const emailSent = await sendRSVPEmail(user, eventDetails);

      } catch (err) {
        throw new ApiError(400, `Unable to send RSVP mail to: ${user.fullName}`);
      }
    }

    if (updated) results.push(updated);
  }

  return res
    .status(200)
    .json(new ApiResponse(200, results, "Statuses updated successfully."));
});

const rsvpConfirmation = asyncHandler(async (req, res) => {

  const SECRET = process.env.ACCESS_TOKEN_SECRET;

  const { token } = req.query;
  let payload = null;
  try {
    payload = jwt.verify(token, SECRET);
    console.log("Token valid:", payload);
  } catch (err) {
    console.error("JWT verification failed:", err.message);
  }

  if (!payload) {
    return res.status(400).json(new ApiResponse(400, "Oops! Link has expired"));
  }
  const { uid, eventId } = payload;

  const updated = await Registration.findOneAndUpdate(
    { userId: uid, eventId },
    { $set: { status: "confirmed" } },
    { new: true }
  );

  console.log("here",updated);

  if (!updated) {
    return res.status(404).json(new ApiError(404, "Failed to confirm your RSVP"));
  }

  return res.status(201).json(new ApiResponse(201, "RSVP Confirmed"));
})



export {
  registerForEvent,
  cancelRegistration,
  getEventRegistrations,
  bulkUpdateRegistrationStatus,
  bulkDeleteRegistrations,
  rsvpConfirmation
}