import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import Profile from "./models/Profile.js";

dotenv.config();
const app = express();
app.use(express.json({ limit: "10mb" })); // Handle large image data
app.use(cors());

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log("✅ MongoDB Connected..."))
  .catch(err => console.error("❌ MongoDB Connection Failed:", err));

// ✅ API Route to Save Profile Data
app.post("/api/profile", async (req, res) => {
  try {
    console.log("📥 Incoming Data:", req.body); // Debugging

    const { username, email, country, profileImage } = req.body;
    
    if (!username || !email || !country) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newProfile = new Profile({ username, email, country, profileImage });
    await newProfile.save();
    
    console.log("✅ Profile saved:", newProfile); // Debugging
    res.status(201).json({ message: "Profile saved successfully!" });

  } catch (error) {
    console.error("❌ Server Error:", error); // Debugging
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ API Route to Fetch Profile Data
app.get("/api/profile", async (req, res) => {
  try {
    const profiles = await Profile.find();
    res.json(profiles);
  } catch (error) {
    console.error("❌ Fetching Profiles Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
