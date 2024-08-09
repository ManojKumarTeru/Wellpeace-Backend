import { Request, Response } from "express";
import { LoginSchema, SignupSchema } from "../zodSchemas/authSchema";
import { AuthResponse } from "../types";
import { UserModel } from "../models/auth";
import { hash as HashPassword, compare as ComparePassword } from "bcryptjs";
import dotenv from "dotenv";
import { getAuth } from "firebase-admin/auth";
import { Admin } from "..";

dotenv.config();
// ################################################## SIGNUP HANDLER #################################################
export const signup = async (req: Request, res: Response) => {
  try {
    // validating the request body
    const validation = SignupSchema.safeParse(req.body);

    // if there are errors in the validation.
    if (!validation.success) {
      const errors = validation.error.errors.map((error) => error.message);
      res.status(400).json({ message: "validation error", errors });
      return;
    }

    // if the validation is successful
    const { email, password: plainPassword, token } = validation.data;
    const isUserExist = await UserModel.findOne({ email });
    if (isUserExist) {
      res.status(409).json({
        message: "User already exist.",
        errors: ["User already exist."],
      });
      return;
    }
    const f_user = await getAuth().verifyIdToken(token);
    console.log(f_user);
    if (!f_user.uid) {
      return res
        .status(404)
        .json({
          message: "user not exist in our database.",
          errors: ["user not exist."],
        });
    }
    const password = await HashPassword(plainPassword, 10);
    const name = email.split("@")[0];
    const newUser = await UserModel.create({ name, email, password ,imageUrl:f_user.picture,uid:f_user.uid});

    const user = {
      uid: f_user.uid,
      imageUrl: f_user.picture,
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      joinedAt: newUser.joinedAt,
    };

    const response: AuthResponse = {
      user,
      message: "Signup successfully.",
    };

    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
      errors: ["Internal server error"],
    });
  }
};

// ################################################## LOGIN HANDLER #################################################

export const login = async (req: Request, res: Response) => {
  try {
    const validation = LoginSchema.safeParse(req.body);
    if (!validation.success) {
      const errors = validation.error.errors.map((error) => error.message);
      res.status(400).json({ message: "validation error", errors });
      return;
    }
    const { email, password,token } = validation.data;

    const f_user = await getAuth().verifyIdToken(token);
    console.log(f_user);
    if (!f_user.uid) {
      return res
      .status(404)
      .json({
        message: "user not exist in our database.",
        errors: ["user not exist."],
      });
    }
    const  profile= (await Admin.auth().getUser(f_user.uid)).photoURL;
    console.log(profile);

    const userAccount = await UserModel.findOne({ email });
    if (!userAccount) {
      return res.status(404).json({
        message: "User with this email does not exist.",
        errors: ["User with this email does not exist."],
      });
    }
    

    const isPasswordCrt = await ComparePassword(password, userAccount.password);
    if (!isPasswordCrt) {
      return res
        .status(401)
        .json({ status: 401, message: "Password is incorrect." });
    }

    const user = {
      _id: userAccount._id,
      uid:userAccount.uid,
      name: userAccount.name,
      email: userAccount.email,
      imageUrl: userAccount.imageUrl,
      joinedAt: userAccount.joinedAt,
    };

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined in environment variables");
    }

    const response: AuthResponse = {
      user,
      message: "login successful",
    };

    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
      errors: ["Internal server error"],
    });
  }
};
