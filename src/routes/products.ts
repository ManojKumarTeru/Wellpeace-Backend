import { Router } from "express";
import { getAllProducts } from "../controllers/products";

const router = Router();

router.get("/all", getAllProducts);

export default router;
