require("dns").setServers(["8.8.8.8"]);
require("dotenv").config();
const mongoose = require("mongoose");
const Hostel = require("./models/Hostel");

async function checkHostels() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const hostels = await Hostel.find(
      {},
      { name: 1, locality: 1, category: 1, rent: 1 }
    ).sort({ locality: 1, name: 1 }).lean();

    console.log("\nTOTAL HOSTELS:", hostels.length);
    console.log("\nHOSTELS BY LOCALITY:");

    const groups = {};

    for (const hostel of hostels) {
      const area = hostel.locality || "Unknown";
      if (!groups[area]) groups[area] = [];
      groups[area].push(hostel.name);
    }

    for (const [area, names] of Object.entries(groups)) {
      console.log(`\n${area} (${names.length})`);
      names.forEach((name) => console.log(" - " + name));
    }
  } catch (error) {
    console.error("Error:", error.message);
  } finally {
    await mongoose.disconnect();
  }
}

checkHostels();
