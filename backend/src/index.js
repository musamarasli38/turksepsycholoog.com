import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envPath = path.resolve(__dirname, '../.env');
console.log('Looking for .env at:', envPath);
console.log('File exists:', fs.existsSync(envPath));

dotenv.config({ path: envPath });

console.log('After dotenv.config():');
console.log('SUPABASE_URL:', process.env.SUPABASE_URL ? 'LOADED' : 'MISSING');

import express from "express";
import cors from "cors";

// Dynamic imports to ensure dotenv is loaded first
const { default: authRoutes } = await import("./routes/auth.js");
const { default: availabilityRoutes } = await import("./routes/availability.js");
const { default: appointmentsRoutes } = await import("./routes/appointments.js");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
    res.send("Backend is running");
});

app.use("/api/auth", authRoutes);
app.use("/api/availability", availabilityRoutes);
app.use("/api/appointments", appointmentsRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});