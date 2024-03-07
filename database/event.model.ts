import { Schema, model, models, Document, ObjectId } from "mongoose";

export interface IEvent extends Document {
    eventName: string;
    eventPoster?: {
        data: Buffer;
        contentType: string;
    };
    eventDesc: string;
    department: string;
    venue: string;
    uploadedBy: ObjectId;
    applicant: Schema.Types.ObjectId[];
    selected: Schema.Types.ObjectId[];
    rejected: Schema.Types.ObjectId[];
    eventTime: Date;
    uploadedAt: Date;
}

const EventSchema = new Schema({
    eventName: { type: String, required: true },
    eventPoster: {
        data: Buffer,
        contentType: String
    },
    eventDesc: { type: String, required: true },
    department: { type: String, required: true },
    venue: { type: String, required: true },
    applicant: [{ type: Schema.Types.ObjectId, ref: "User" }],
    selected: [{ type: Schema.Types.ObjectId, ref: "User" }],
    rejected: [{ type: Schema.Types.ObjectId, ref: "User" }],
    uploadedBy: { type: Schema.Types.ObjectId, ref: "User" },
    eventTime: { type: Date },
    uploadedAt: { type: Date, default: Date.now() },
});

// Check if the model is already registered
const Event = models?.Event || model("Event", EventSchema);
 

export default Event;
