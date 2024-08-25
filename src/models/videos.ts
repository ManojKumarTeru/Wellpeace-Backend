import mongoose, { Schema } from "mongoose";
import { IComment, IVideo } from "../types";

const VideoUserSchema=new Schema({
    _id: { type:String, required: true },
    name: { type:String, required: true},
    imageUrl: { type:String, default:null}
})
const CommentSchema = new Schema<IComment>({
  _id: { type: String },
  user:{type:VideoUserSchema,required:true},
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const VideoSchema = new Schema<IVideo>({
  url: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  comments: { type: [CommentSchema], default: [] },
  likes:{type:[String],default:[]},
  user:{type:VideoUserSchema,required:true},
  uploadedAt: { type: Date, default: Date.now },
});

export default mongoose.model("Video", VideoSchema);
