import express from "express";
import multer from "multer";
import { createCertificate, deleteCertificate, getCertificates, uploadCertificate, verifyCertificate } from "../controllers/certificate.controller.js";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/create", createCertificate);
router.get("/views", getCertificates);
router.delete("/:id", deleteCertificate);
router.get("/verify/:id", verifyCertificate);
router.post("/upload", upload.single("file"), uploadCertificate);

export default router;