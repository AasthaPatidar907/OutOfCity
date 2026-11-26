require("dns").setServers(["8.8.8.8", "1.1.1.1"]);
require("dotenv").config();
const mongoose = require("mongoose");

const roomOptions = [
  ["Single Seater", "Double Sharing"],
  ["Double Sharing", "Triple Sharing"],
  ["Triple Sharing", "Four Sharing"],
  ["Single Seater", "Double Sharing", "Triple Sharing"],
  ["Double Sharing", "Four Sharing"],
  ["Triple Sharing"],
];

const amenityOptions = [
  ["Wi-Fi", "Laundry", "Housekeeping"],
  ["Meals", "Wi-Fi", "Common Area"],
  ["CCTV", "Laundry", "Power Backup"],
  ["Housekeeping", "Common Area", "Wi-Fi"],
  ["Meals", "CCTV", "Power Backup"],
  ["Laundry", "Meals", "Wi-Fi", "Common Area"],
];

const descriptions = [
  "A practical accommodation option for students looking for a comfortable base near their daily activities.",
  "A student-friendly style of stay with room arrangements to explore according to budget and preference.",
  "An accommodation listing for students and working professionals comparing locations and monthly expenses.",
  "Explore this stay option for a simple living setup with room-sharing choices to suit different budgets.",
  "A convenient-style accommodation option to compare when searching for a place to stay in Indore.",
  "A shared-living style listing for people looking to compare room types, facilities, and monthly rent.",
  "An accommodation option designed in a student-hostel style, with sample facilities for this demo listing.",
  "A budget-conscious stay option to consider while comparing accommodation across Indore.",
];

const imageOptions = [
  "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1560185008-b033106af5c3?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1000&q=80",
];

function hash(text) {
  return [...String(text)].reduce(
    (total, char) => (total * 31 + char.charCodeAt(0)) >>> 0,
    7
  );
}

async function main() {
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is missing from your backend .env file.");
  }

  await mongoose.connect(process.env.MONGO_URI);

  // Uses the existing MongoDB collection; does not reseed or recreate records.
  const collection = mongoose.connection.db.collection("hostels");
  const hostels = await collection.find({}).toArray();

  if (hostels.length === 0) {
    console.log("No hostel records found. Check your database and collection.");
    return;
  }

  let updated = 0;

  for (const hostel of hostels) {
    const seed = hash(hostel._id.toString() + hostel.name);
    const roomTypes = roomOptions[seed % roomOptions.length];
    const amenities = amenityOptions[seed % amenityOptions.length];

    const description =
      descriptions[seed % descriptions.length] +
      ` Listed locality: ${hostel.locality || "Indore"}.`;

    const set = {
      demoData: true,
      roomTypes,
    };

    if (!hostel.description?.trim()) set.description = description;
    if (!Array.isArray(hostel.amenities) || hostel.amenities.length === 0) {
      set.amenities = amenities;
    }
    if (!Array.isArray(hostel.images) || hostel.images.length === 0) {
      set.images = [imageOptions[seed % imageOptions.length]];
    }
    if (typeof hostel.deposit !== "number" || hostel.deposit <= 0) {
      // Sample deposit for demonstration only.
      set.deposit = Math.round((hostel.rent || 3000) * 0.5 / 500) * 500;
    }

    await collection.updateOne({ _id: hostel._id }, { $set: set });
    updated++;
  }

  console.log(`Processed ${updated} existing hostel records.`);
  console.log("Sample room, amenity, image, and deposit data has been added.");
  console.log("These fields are DEMO data and must be verified before launch.");
}

main()
  .catch((error) => {
    console.error("Enrichment failed:", error.message);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.disconnect();
  });
