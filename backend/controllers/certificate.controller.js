import certificateModel from "../models/certificate.model.js";

export const createCertificate = async (req, res) => {
    try {
        const { certificateId, studentName, rollNo, fest, date, event, category } = req.body;
        if (!certificateId || !studentName || !rollNo || !fest || !date || !event || !category) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const newCertificateId = certificateId.toUpperCase();
        const existing = await certificateModel.findOne({ certificateId: newCertificateId });
        if (existing) {
            return res.status(409).json({
                success: false,
                message: "Certificate ID already exists"
            });
        }

        const certificate = await certificateModel.create({
            certificateId: newCertificateId,
            studentName,
            rollNo,
            fest,
            date,
            event,
            category,
        });

        res.status(201).json({
            success: true,
            certificate
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Certificate creation failed",
            error: error.message
        });
    }
};

export const getCertificates = async (req, res) => {
    try {
        const certificates = await certificateModel.find().sort({ createdAt: -1 });
        const certificatesIssued = certificates.length;
        res.status(200).json({
            success: true,
            certificatesIssued,
            certificates
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch certificates",
            error: error.message
        });
    }
};

export const deleteCertificate = async (req, res) => {
    try {
        const { id } = req.params;

        const certificate = await certificateModel.findById(id);
        if (!certificate) {
            return res.status(404).json({
                success: false,
                message: "Certificate not found"
            });
        }

        await certificate.deleteOne();

        res.status(200).json({
            success: true,
            message: "Certificate deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to delete certificate",
            error: error.message
        });
    }
};

export const verifyCertificate = async (req, res) => {
    const { id } = req.params;
    try {
        const certificate = await certificateModel.findOne({ certificateId: id });
        if (!certificate) {
            return res.status(404).json({ success: false, message: "Certificate not found" });
        }

        res.status(200).json({
            success: true,
            certificate,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};