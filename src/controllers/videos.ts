import { Request, Response } from "express";
import cloudinary from "cloudinary";
import { UserModel } from "../models/auth";
import videos from "../models/videos";

cloudinary.v2.config({
    cloud_name: process.env.STORAGE,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})

export const getAllVideos=async (req: Request, res: Response)=>{
    const user=req.user;
    if (!user) {
        return res.status(401).json({message:"UnAuthorized"});
    }
    try {
        const videosList=await videos.find({});
        if (!videosList){
            return res.status(404).json({message:"No videos found"});
        }
        res.json({message:"Videos get successfully",videos:videosList});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal Server Error"})
    }
}

export const postVideo=async (req:Request,res:Response)=>{
    const user=req.user;
    if (!user) {
        return res.status(401).json({message:"UnAuthorized"});
    }
    try {
        const videoId=req.query.videoId as string;
        const {title,description,userId}=req.body;
        if (!videoId) {
            return res.status(403).json({message:"Please Provide VideoId"});
        }
        const videoUrl = cloudinary.v2.url(`${videoId}.m3u8`, {
            resource_type: 'video',
        });

        if (!videoUrl) {
            return res.status(403).json({message:"something went wrong"});
        }
        const userAccount=await UserModel.findById(userId);
        if (!userAccount) {
            return res.status(404).json({message:"User not found"});
        }

        const videoData=await videos.create({title,description,url:videoUrl,user:{_id:userAccount._id,name:userAccount.name,imageUrl:userAccount.imageUrl}});

        return res.status(200).json({message:"successfully",videoData})

    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Internal Server Error"})
    }
}