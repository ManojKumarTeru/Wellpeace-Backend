import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';
import { UserSchema } from "./zodSchemas/authSchema";
import { z } from "zod";
import { Document } from 'mongoose';

type User = z.infer<typeof UserSchema> & {joinedAt:Date,_id:string}

type AuthResponse = {
  message: string;
  user: User;
};

interface IProduct{
  _id:string;
  name:string;
  description:string;
  price:number;
  rating:number;
  imageUrl:string;
  buyUrl:string;
}


declare module 'express-serve-static-core' {
    interface Request {
        user?: DecodedIdToken;
    }
}

interface IComment {
  _id:string;
  content:string;
  createdAt:object;
  user:{
    _id:string;
    name:string;
    imageUrl:string | null;
  }
}

interface IVideo{
  _id:string;
  title:string;
  description:string;
  tags:string[];
  url:string;
  comments:IComment[];
  likes:string[];
  uploadedAt:object;
  user:{
    _id:string;
    name:string;
    imageUrl:string | null;
  }
}