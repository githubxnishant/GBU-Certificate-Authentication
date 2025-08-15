import express from "express";
import { createCertificate, deleteCertificate, getCertificates, verifyCertificate } from "../controllers/certificate.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/create", createCertificate);
router.get("/views", getCertificates);
router.delete("/:id", deleteCertificate);
router.get("/verify/:id", verifyCertificate);

export default router;