import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';
import { UserSchema } from "./zodSchemas/authSchema";
import { z } from "zod";

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