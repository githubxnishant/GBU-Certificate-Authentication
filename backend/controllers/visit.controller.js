import visitModel from "../models/visit.model.js";

export const websiteVisits = async (req, res) => {
    try {
        const currentPath = req.query.path; 
        const excludedPaths = ["/dashboard", "/history", "/records"];
        const shouldIncrement = !excludedPaths.includes(currentPath);

        let visitDoc = await visitModel.findOne();
        if (!visitDoc) {
            visitDoc = await visitModel.create({ count: 0 });
        }

        if (shouldIncrement) {
            visitDoc.count += 1;
            await visitDoc.save();
        }

        res.status(200).json({
            success: true,
            visits: visitDoc.count,
            incremented: shouldIncrement,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Visit counter API crashed",
            error: error.message,
        });
    }
};
