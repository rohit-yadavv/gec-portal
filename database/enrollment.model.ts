import { Schema, model, models, Document } from "mongoose";

export interface IEnrollment extends Document {
  type?: string;
  desc?: string;
  courseCode?: string;
  courseName?: string;
  CourseCredit?: number;
  department?: string;
  teacher?: string;
  sem?: number;
  eligible?: string;
  seats?: number;
  uploadedByClerkId: string;
  applicant: Schema.Types.ObjectId[];
  uploadedAt: Date;
}

const EnrollmentSchema = new Schema({
  type: { type: String },
  desc: { type: String },
  courseCode: { type: String },
  courseName: { type: String },
  CourseCredit: { type: Number },
  department: { type: String },
  teacher: { type: String },
  uploadedByClerkId: { type: String, required:true },
  sem: { type: Number },
  eligible: { type: String },
  seats: { type: String },
  applicant: [{ type: Schema.Types.ObjectId, ref: "User" }],
  uploadedAt: { type: Date, default: Date.now()}, 
});

const Enrollment = models.Enrollment || model("Enrollment", EnrollmentSchema);
export default Enrollment;
