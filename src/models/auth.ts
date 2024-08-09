import { model, Schema } from "mongoose";
import { User } from "../types";
import { profile } from "console";

const UserSchema = new Schema<User>({
  name: { type: String, required: true,default:'unknow' },
  email: { type: String, required: true },
  password: { type: String, required: true},
  imageUrl: { type: String,default:null},
  uid:{ type: String,required:true},
  joinedAt: { type: Date, default: Date.now },
});

export const UserModel = model<User>("User", UserSchema);
