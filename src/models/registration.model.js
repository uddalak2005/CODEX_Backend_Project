import mongoose,{Schema} from "mongoose";

const Registration = Schema(
  {
    eventId: Schema.Types.ObjectId,
    ref:"User",
    userId: Schema.Types.ObjectId,
    ref:"User",

    registrationDate: {
      type: Date,
    },
    status: {
      //"registered"/"disqualified"/"cancelled"/"eliminated"
      type: String,
      required: true,
      enum:["registered","disqualified","cancelled","eliminated"]
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);
