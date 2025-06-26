import mongoose from "mongoose";

//Demo model can be edited later
const EventSchema = mongoose.Schema(
  {
    event_name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },
    organizer: {
      type: String,
      required: true,
    },
    currentParticipants: {
      type: Number,
      required: true,
    },
    maxParticipants: {
      type: Number,
    },
    registrationStartDate: {
      type: Date,
      required: true,
    },
    registrationDeadline: {
      type: Date,
      required: true,
    },
    eventStartDate: {
      type: Date,
      required: true,
    },
    eventEndDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

const Event = mongoose.model("Event", EventSchema);
export default Event;
