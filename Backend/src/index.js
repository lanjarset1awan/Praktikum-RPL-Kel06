const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");

dotenv.config();

const app = express();
const prisma = new PrismaClient();

app.use(cors({
  origin: ["https://laporin-frontend-app.vercel.app", "http://localhost:5173"],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  credentials: true
}));
app.use(express.json());

// PORT
const PORT = process.env.PORT || 2000;

// DATABASE CONNECT
async function testDB() {
    try {
        await prisma.$connect();
        console.log("Database connected");
    } catch (err) {
        console.log("Database connection error:", err);
    }
}
testDB();

// ROUTES IMPORT
const userRoutes = require("./routes/userRoutes");
const reportRoutes = require("./routes/reportRoutes");

// ROUTES USAGE
app.use("/users", userRoutes);
app.use("/reports", reportRoutes);
const adminRoutes = require("./routes/adminRoutes");
app.use("/admin", adminRoutes);

// TEST API
app.get("/", (req, res) => {
    res.send("API jalan");
});

// ERROR HANDLING
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send("Internal Server Error");
});

// START SERVER
app.listen(PORT, () => {
    console.log(`server jalan di port ${PORT}`);
});

module.exports = app;