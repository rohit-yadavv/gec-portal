import { Schema, model, models, Document } from "mongoose";

export interface IRegistered extends Document {
  name: string;
  rollNo: number;
  department: string;
  course: string;
  sem: number; 
  registerFor?: Schema.Types.ObjectId;
  registeredAt: Date;
}
// name: "",
// rollNo: "", 
// department: "",
// sem: 0,
// course: "",

const RegistrationSchema = new Schema({
  name: { type: String },
  rollNo: { type: Number },
  department: { type: String },
  course: { type: String },
  sem: { type: Number },
  registerFor: { type: Schema.Types.ObjectId, ref: "Enrollment" },
  registeredAt: { type: Date, default: Date.now()}, 
});

const Registration = models.Registration || model("Registration", RegistrationSchema);
export default Registration;
