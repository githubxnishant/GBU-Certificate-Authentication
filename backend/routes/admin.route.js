import express from 'express';
import { adminLogin, adminRegister, adminStats, adminVerify, adminViews } from '../controllers/admin.controller.js';
import { verifyToken } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/signup', adminRegister);
router.post('/login', adminLogin);
router.get('/verify', verifyToken, adminVerify);
router.get('/stats', adminStats);
router.get("/admin/views", adminViews);

router.get("/dashboard", verifyToken, (req, res) => {
    res.json({ success: true, message: "Welcome to the dashboard", user: req.user });
});

export default router;