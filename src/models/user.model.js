import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


const UserSchema = Schema({
  fullName: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: Number,
    unique: true,
  },
  regNumber: {
    type: String,    //USING regNumber for INDEXING
    unique: true,
    required: true,
    index: true
  },
  branch: {
    type: String,
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
    type: Boolean,
    default: false,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    default: "user", // Default role for new users
  },
},{timestamps:true});


// PASSWORD ENCRYPTION BEFORE SAVING
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
})

//isPasswordCorrect function  - COMPARES PASSWORD AND RETURNS THE RESULT T/F
UserSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
}

// Access token and Refresh token generating functions

UserSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      fullName: this.fullName,
      email: this.email,
      regNumber: this.regNumber,
      role: this.role
    },
    process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRY
  }
  )
}

UserSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      fullName: this.fullName,
      email: this.email,
      regNumber: this.regNumber,
      role: this.role
    },
    process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY
  }
  )
}
const User = mongoose.model("User", UserSchema);

export default User;