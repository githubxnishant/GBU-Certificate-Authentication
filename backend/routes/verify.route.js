import express from "express";
import { verifyCount } from "../controllers/verify.controller.js";

const router = express.Router();

router.get("/count", verifyCount);

export default router;