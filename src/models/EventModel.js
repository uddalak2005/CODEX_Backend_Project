import mongoose from "mongoose";

//Demo model can be edited later
const EventSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    participantsLimit: {
      type: Number,
    },
    location: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    participants: {
      type: String,
      required: true,
    },
    prizes: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      unique: true, //eg: Hackathon, Workshop
    },
    color: {
      type: String,
      required: true,
    },
    bgColor: {
      type: String,
      required: true,
    },
    highlights: {
      type: Array,
      required: true,
    },
    schedule: [ScheduleItemSchema],
    requirements: {
      type: Array,
    },

    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const ScheduleItemSchema = new mongoose.Schema({
  time: {
    type: String,
    required: true,
  },
  activity: {
    type: String,
    required: true,
  },
  day: {
    type: String,
    enum: ["Day 1", "Day 2"], // Optional, restricts allowed values
    required: true,
  },
});
const Event = mongoose.model("Event", EventSchema);
export default Event;
