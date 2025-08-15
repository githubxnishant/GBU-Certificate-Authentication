import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import adminRouter from './routes/admin.route.js';
import visitRouter from './routes/visit.route.js';
import certificateRouter from './routes/certificate.route.js'
import verifyRouter from './routes/verify.route.js'
import cookieParser from "cookie-parser";

const app = express();

config({
    path: ".env.local",
})

app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: process.env.FRONTEND_URL,
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);

app.use("/", adminRouter);
app.use("/", visitRouter);
app.use("/certificate", certificateRouter);
app.use("/", verifyRouter);

app.get("/", (req, res) => {
    res.send("GBU Certification backend server is working normally..!!");
})

export default app;