import { Schema, model, models, Document, ObjectId } from "mongoose";

 
export interface IEnrollment extends Document {
  type?: string;
  desc?: string;
  courseCode?: string;
  courseName?: string;
  courseCredit?: number;
  department?: string;
  teacher?: string;
  sem?: number;
  eligible?: string;
  seats?: number;
  uploadedBy: ObjectId;
  applicant: Schema.Types.ObjectId[];
  selected: Schema.Types.ObjectId[];
  rejected: Schema.Types.ObjectId[];
  applyBy: Date;
  uploadedAt: Date;
}

const EnrollmentSchema = new Schema({
  type: { type: String },
  desc: { type: String },
  courseCode: { type: String },
  courseName: { type: String },
  courseCredit: { type: Number },
  department: { type: String },
  teacher: { type: String },
  sem: { type: Number },
  eligible: { type: String },
  seats: { type: String },
  applicant: [{ type: Schema.Types.ObjectId, ref: "User" }],
  selected: [{ type: Schema.Types.ObjectId, ref: "User" }],
  rejected: [{ type: Schema.Types.ObjectId, ref: "User" }],
  uploadedBy: { type: Schema.Types.ObjectId, ref: "User" },
  applyBy: { type: Date },
  uploadedAt: { type: Date, default: Date.now() },
});

const Enrollment = models?.Enrollment || model("Enrollment", EnrollmentSchema);
export default Enrollment;
