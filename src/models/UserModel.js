import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: Number,
    required: true,

    unique: true,
  },
  regNumber: {
    type: String,
    unique: true,
    required: true,
  },
  branch: {
    type: String,
    required: true,
    required: true,
  },
  year: {
    type: Number,
    max: 4,
    required: true,
  },
  experience: {
    type: String,
    enum: ["Beginner", "Intermediate", "Advanced"],
  },
  github: {
    type: String,
  },
  linkedin: {
    type: String,
  },
  teamName: {
    type: String,
    required: true,
  },
  teamSize: {
    type: Number,
    required: true,
  },
  skills: {
    type: Array,
  },
  dietary: {
    type: String,
    enum: ["Vegetarian", "Vegan", "No Restrictions", "Gluten free", "other"],
  },
  tshirtSize: {
    type: String,
  },
  expectations: {
    type: String,
    required: true,
  },
  aggreeTerms: {
    type: boolean,
    default: False,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    default: "user",
  },
  createdAt: Date,
});

const User = mongoose.model("User", UserSchema);
export default User;
