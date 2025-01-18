import express from "express";
import { BaseController } from "../controllers";

const router = express.Router();

router.get("/", BaseController.index);

export default router;
