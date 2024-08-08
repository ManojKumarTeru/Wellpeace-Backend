import { Request, Response } from "express";
import { ProductModel } from "../models/products";

export const getAllProducts=async(req:Request,res:Response)=>{
    try {
        const products=await ProductModel.find();
        if (!products) {
            return res.status(404).json({message: "Product not found",errors:["products not found."]});
        }
        res.status(200).json({message:"products get successfully",products});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"internal server error",errors:["internal server error"]});
    }
}