import express from "express";
import { websiteVisits } from "../controllers/visit.controller.js";

const router = express.Router();

router.get("/visits", websiteVisits);

export default router;