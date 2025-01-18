import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  username: string;
  age: number;
  hobbies: string[];
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true },
  age: { type: Number, required: true },
  hobbies: { type: [String], required: true },
});

export default mongoose.model<IUser>("User", UserSchema);
