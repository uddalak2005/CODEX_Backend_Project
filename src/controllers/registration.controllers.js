import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import User from "../models/user.model.js";
import Registration from "../models/registration.model.js";
import Event from "../models/event.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

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
      "branch",
      "year",
      "teamName",
      "teamSize",
      "skills",
      "level",
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
    const { branch, year, level, skills } = req.body;
    const userUpdates = {};
    if (branch) userUpdates.branch = branch;
    if (year) userUpdates.year = year;
    if (level) userUpdates.experience = level;
    if (skills) userUpdates.skills = skills;

    if (Object.keys(userUpdates).length > 0) {
      await User.findByIdAndUpdate(userId, { $set: userUpdates }, { new: true });
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
  const { registrations } = req.body;

  if (!registrations || !Array.isArray(registrations))
    throw new ApiError(400, "Invalid registrations payload.");

  const results = [];

  for (const entry of registrations) {
    const { userId, eventId, status } = entry;
    if (!userId || !eventId || !status) continue;

    const updated = await Registration.findOneAndUpdate(
      { userId, eventId },
      { $set: { status } },
      { new: true }
    );

    if (status === "allowed") {
      const emailSent = await
    }

    if (updated) results.push(updated);
  }

  return res
    .status(200)
    .json(new ApiResponse(200, results, "Statuses updated successfully."));
});



export {
  registerForEvent,
  cancelRegistration,
  getEventRegistrations,
  bulkUpdateRegistrationStatus,
  bulkDeleteRegistrations,
}