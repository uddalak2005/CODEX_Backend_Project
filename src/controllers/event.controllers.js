import Event from "../models/EventRegistrationModel";

export const createEvent = async (req, res) => {
  try {
    const {
      event_name,
      description,
      location,
      organizer,
      maxParticipants,
      registrationStartDate,
      registrationDeadline,
      eventStartDate,
      eventEndDate,
    } = req.body;

    if (
      !event_name ||
      !description ||
      !location ||
      !organizer ||
      !registrationStartDate ||
      !registrationDeadline ||
      !eventStartDate
    ) {
      return res.status(400).json({ message: "Incomplete details" });
    }

    const newEvent = await Event.create({
      event_name,
      description,
      location,
      organizer,
      maxParticipants,
      registrationStartDate,
      registrationDeadline,
      eventStartDate,
      eventEndDate,
    });

    res.status(201).json({ newEvent });
  } catch (error) {}
};
