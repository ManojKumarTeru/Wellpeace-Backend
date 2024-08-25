import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRouter from "./routes/auth";
import productsRouter from "./routes/products";
import videosRouter from './routes/videos'
import cors from "cors";
import admin from "firebase-admin";
import { initializeApp } from "firebase-admin/app";
import cloudinary from "cloudinary"


dotenv.config();
const app: Express = express();

export const Admin = admin;
const credential = Admin.credential;

const DATABASE_URL = process.env.DB_ADDRESS;
const PORT =  process.env.PORT || 3000;

if (!DATABASE_URL) {
  throw new Error("DATABASE_URL is required. ");
}


app.get("/", (_, res) => {
  res.send("Welcome to wellpeace.");
});

mongoose
  .connect(DATABASE_URL)
  .then(() => {
    app.listen(PORT ,() => {
      console.log(`WellPeace server is running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Mongodb error:", error);
  });

app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/auth", authRouter);
app.use("/products", productsRouter);
app.use("/videos", videosRouter);

initializeApp({
  credential: credential.cert({
    clientEmail: process.env.F_clientEmail,
    privateKey: process.env.F_privateKey,
    projectId: process.env.F_projectId,
  }),
  databaseURL:
    "https://wellpeace-f0719-default-rtdb.europe-west1.firebasedatabase.app",
});

