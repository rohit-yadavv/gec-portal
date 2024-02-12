import { Schema, model, models, Document } from "mongoose";

export interface IUser extends Document {
  clerkId: string;
  name: string; 
  email: number;
  admin: boolean;
  password?: string;
  picture: string;   
  saved: Schema.Types.ObjectId[];
  appliedGec: Schema.Types.ObjectId[];
  joinedAt: Date;
}

const UserSchema = new Schema({
  clerkId: { type: String, required: true },
  name: { type: String, required: true }, 
  email: { type: String, required: true },
  admin: {type: Boolean},
  password: { type: String }, 
  picture: { type: String, required: true },  
  saved: [{ type: Schema.Types.ObjectId, ref: "gec" }],
  appliedGec: [{ type: Schema.Types.ObjectId, ref: "gec" }],
  joinedAt: { type: Date, default: Date.now },
});

const User = models.User || model("User", UserSchema);
export default User;
