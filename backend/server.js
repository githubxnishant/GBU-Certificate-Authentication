import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';

const app = express();

config({
    path: ".env.local",
})

app.use(express.json());
app.use(
    cors({
        origin: process.env.FRONTEND_URL,
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);

app.get("/", (req, res) => {
    res.send("GBU Certification backend server is working normally..!!");
})

export default app;