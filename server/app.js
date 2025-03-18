const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./routes/routes");
require("dotenv").config(); // Gunakan dotenv untuk menyimpan konfigurasi

const app = express();

// Middleware
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());
app.use("/", routes);
app.use("/api", routes);

// Koneksi ke MongoDB
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/CertiApp";

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("✅ Database Connected");

    // Jalankan server setelah koneksi database berhasil
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ Database connection error:", error);
  });
