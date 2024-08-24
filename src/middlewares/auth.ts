import { NextFunction, Request, Response } from "express";
import { Admin } from "..";
import { getAuth } from "firebase-admin/auth";

export const verifyIdToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const auth = req.headers.authorization;
    const token = auth?.split(" ")[1];
    if (!token) {
      return res.status(403).json({ message: "Auth Token not found." });
    }
    const decodedToken = await getAuth().verifyIdToken(token);
    const expirationTime = decodedToken.exp;

    if (expirationTime && expirationTime < Math.floor(Date.now() / 1000)) {
      return res.status(401).json({ error: "Token has expired" });
    }
    req.user = decodedToken;
    next();
  } catch (error:any) {
    console.log(error);
    if (error.errorInfo.code=="auth/argument-error") {
        return res.status(403).json({message:"Invalid token"})
    }
    return res.status(500).json({message:"Internal Server Error"});
  }
};
