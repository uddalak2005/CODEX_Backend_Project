import mongoose from "mongoose";

const Registration = mongoose.Schema(
  {
    eventId: mongoose.Schema.Types.ObjectId,
    userId: mongoose.Schema.Types.ObjectId,
    registrationDate: {
      type: Date,
    },
    status: {
      //"registered"/"disqualified"/"cancelled"/"eliminated"
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);
