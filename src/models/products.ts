import { model, Schema } from "mongoose";
import { IProduct } from "../types";

const ProductSchema = new Schema<IProduct>({
  _id: { type: "string" },
  name: { type: String, required: true },
  buyUrl: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  price: { type: Number, required: true },
  rating: { type: Number, required: true },
});

export const ProductModel = model<IProduct>("Product",ProductSchema );
