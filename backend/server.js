require("dns").setServers(["8.8.8.8"]);
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
const app = express();
const authRoutes = require("./routes/authRoutes");
const hostelRoutes = require("./routes/hostelRoutes");

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
app.use("/api/hostels", hostelRoutes);
app.use("/api/auth", authRoutes);

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "OutOfCity backend is running!"
  });
});

const PORT = process.env.PORT || 5000;

async function startServer() {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

startServer();
