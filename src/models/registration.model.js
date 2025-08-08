import mongoose,{Schema} from "mongoose";

const registrationSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", required: true 
  },
  eventId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Event", required: true 
  },
  registrationDate: { 
    type: Date, 
    default: Date.now 
  },
  status: { 
    type: String, 
    enum:["registered","allowed", "confirmed", "cancelled","disqualified","eliminated"],
    default: "registered" 
  },
  description: String,
  githubLink: String,
  linkedInLink: String,
  teamName: String,
  teamSize: Number,
  skills: [String],
  expectations: String,
  agreeTerms: Boolean,
  deitary:String,
  tshirtSize:String,

  // frozen academic info
  branch: String,
  year: Number,
  experience: String,
},{timestamps:true});


registrationSchema.index({ userId: 1, eventId: 1 }, { unique: true });

const Registration= mongoose.model("Registration",registrationSchema);

export default Registration;