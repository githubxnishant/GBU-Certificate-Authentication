import verifyModel from "../models/verify.model.js";

export const verifyCount = async (req, res) => {
    try {
        let verifyDoc = await verifyModel.findOne();

        if (!verifyDoc) {
            verifyDoc = await verifyModel.create({ count: 1 });
        } else {
            verifyDoc.count += 1;
            await verifyDoc.save();
        }

        res.status(200).json({
            success: true,
            verifies: verifyDoc.count,
        });
    } catch (error) {
        console.error("Error updating verify count:", error);
        res.status(500).json({
            success: false,
            message: "Failed to update verify count",
            error: error.message,
        });
    }
};
