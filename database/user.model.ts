import { Schema, model, models, Document } from "mongoose";

export interface IUser extends Document {
  clerkId: string;
  name: string;
  email: number;
  admin: boolean;
  password?: string;
  picture: string;

  rollNo: number;
  department: string;
  course: string;
  sem: number;
  isProfileComplete:boolean;

  saved: Schema.Types.ObjectId[];
  savedEvents: Schema.Types.ObjectId[];
  appliedGec: Schema.Types.ObjectId[];
  appliedEvent: Schema.Types.ObjectId[];
  joinedAt: Date;
}

const UserSchema = new Schema({
  clerkId: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  admin: { type: Boolean, required: true },
  password: { type: String },
  picture: { type: String, required: true },

  rollNo: { type: Number},
  department: { type: String},
  course: { type: String},
  sem: { type: Number},
  isProfileComplete: {type: Boolean, default: false, required: true},

  saved: [{ type: Schema.Types.ObjectId, ref: "Enrollment" }],
  savedEvents: [{ type: Schema.Types.ObjectId, ref: "Event" }],
  appliedGec: [{ type: Schema.Types.ObjectId, ref: "Enrollment" }],
  appliedEvent: [{ type: Schema.Types.ObjectId, ref: "Event" }],
  joinedAt: { type: Date, default: Date.now },
});

const User = models?.User || model("User", UserSchema); 
export default User;
