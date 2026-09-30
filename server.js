const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const assistantRoutes = require("./routes/assistantRoutes");

const app = express();


// DATABASE
connectDB();


// MIDDLEWARE
app.use(cors());

app.use(express.json());


// ROUTES
app.use("/api/brands", require("./routes/brandRoutes"));

app.use("/api/campaigns", require("./routes/campaignRoutes"));

app.use("/api/quality", require("./routes/qualityRoutes"));
app.use("/api/vision", require("./routes/visionRoutes"));
app.use("/api/assistant", assistantRoutes);


// HOME
app.get("/", (req, res) => {

    res.json({

        message: "BrandAI API is running",

        version: "1.0.0"

    });

});


// 404
app.use((req, res) => {

    res.status(404).json({

        success: false,

        message: "API route not found"

    });

});


// SERVER
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(`BrandAI server running on port ${PORT}`);

});
