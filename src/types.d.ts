import { UserSchema } from "./zodSchemas/authSchema";
import { z } from "zod";

type User = z.infer<typeof UserSchema> & {joinedAt:Date,_id:string}

type AuthResponse = {
  message: string;
  user: User;
};
