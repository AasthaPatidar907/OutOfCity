
const mongoose = require("mongoose");

const hostelSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    locality: { type: String, required: true },
    address: { type: String, default: "" },
    rent: { type: Number, default: null },
    category: {
      type: String,
      enum: ["Boys", "Girls", "Co-Living"],
      required: true,
    },
    description: { type: String, default: "" },
    amenities: [{ type: String }],
    images: [{ type: String }],
    phone: { type: String, default: "" },
    website: { type: String, default: "" },
    verified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Hostel", hostelSchema);
