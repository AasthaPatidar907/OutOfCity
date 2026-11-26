
const express = require("express");
const router = express.Router();
const Hostel = require("../models/Hostel");

// Get all hostels, with optional filters
router.get("/", async (req, res) => {
  try {
    const { locality, category, maxRent, search } = req.query;
    const filter = {};

    if (locality) filter.locality = locality;
    if (category) filter.category = category;

    if (maxRent && Number.isFinite(Number(maxRent))) {
      filter.rent = { $lte: Number(maxRent), $gt: 0 };
    }

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { locality: { $regex: search, $options: "i" } },
      ];
    }

    const hostels = await Hostel.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, count: hostels.length, hostels });
  } catch (error) {
    console.error("Fetch hostels error:", error.message);
    res.status(500).json({ success: false, message: "Could not fetch hostels" });
  }
});

// Get one hostel by ID
router.get("/:id", async (req, res) => {
  try {
    const hostel = await Hostel.findById(req.params.id);
    if (!hostel) {
      return res.status(404).json({ success: false, message: "Hostel not found" });
    }
    res.json({ success: true, hostel });
  } catch (error) {
    res.status(400).json({ success: false, message: "Invalid hostel ID" });
  }
});

module.exports = router;
