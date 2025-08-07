import mongoose, { Schema } from "mongoose";

const managedUserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    github: {
      type: String,
      required: true,
    },
    githubDP: {
      type: String,
      required: true,
    },
    linkedin: {
      type: String,
      required: true,
    },
    twitter: {
      type: String,
      required: true,
    },
    skill: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const managedUser = mongoose.model("managedUser", managedUserSchema);

export default managedUser;