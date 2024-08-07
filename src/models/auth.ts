import { model, Schema } from "mongoose";
import { User } from "../types";

const UserSchema = new Schema<User>({
  name: { type: String, required: true,default:'unknow' },
  email: { type: String, required: true },
  password: { type: String, required: true},
  joinedAt: { type: Date, default: Date.now },
});

export const UserModel = model<User>("User", UserSchema);
