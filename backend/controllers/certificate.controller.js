import XLSX from 'xlsx'
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

export const uploadCertificate = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        // Parse Excel/CSV file
        const workbook = XLSX.read(req.file.buffer, { type: "buffer" });
        const sheetName = workbook.SheetNames[0];
        const rows = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

        if (rows.length === 0) {
            return res.status(400).json({ error: "Sheet is empty" });
        }

        // Fields allowed by schema
        const allowedFields = [
            "certificateId",
            "studentName",
            "rollNo",
            "fest",
            "date",
            "event",
            "category",
        ];

        // Format input rows to match schema fields
        const formatted = rows.map((row) => {
            const record = {};
            allowedFields.forEach((key) => {
                if (row[key] !== undefined) record[key] = row[key];
            });
            return record;
        });

        // Collect all certificate IDs
        const allIds = formatted.map((item) => item.certificateId);

        // Find existing certificate IDs in DB
        const existingDocs = await certificateModel.find(
            { certificateId: { $in: allIds } },
            { certificateId: 1, _id: 0 }
        );

        const existingIds = existingDocs.map((doc) => doc.certificateId);

        // Filter out duplicates before inserting
        const newRecords = formatted.filter(
            (item) => !existingIds.includes(item.certificateId)
        );

        // Insert only new records
        let insertedCount = 0;
        if (newRecords.length > 0) {
            const inserted = await certificateModel.insertMany(newRecords, { ordered: false });
            insertedCount = inserted.length;
        }
        res.json({
            message: "Upload completed.",
            insertedCount,
            duplicates: existingIds,
            duplicateCount: existingIds.length,
        });
    } catch (err) {
        console.error("Error in uploadCertificates:", err);
        res.status(500).json({ error: "File processing failed" });
    }
};