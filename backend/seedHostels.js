
require("dotenv").config();
require("dns").setServers(["8.8.8.8"]);

const mongoose = require("mongoose");
const Hostel = require("./models/Hostel");

const hostels = [
  { name: "Goyal Boys Hostel", locality: "Malwa Mill", rent: 5000, category: "Boys" },
  { name: "NARIMAN BOYS PG", locality: "Tigaria Badshah", rent: 6000, category: "Boys" },
  { name: "SAMBODHI GIRLS HOSTEL", locality: "Anand Nagar", rent: 17000, category: "Girls" },
  { name: "Aashiyana Girls Pg", locality: "Bhagyashree Colony", rent: 5000, category: "Girls" },
  { name: "Ved Boys Hostel and PG", locality: "Janta Quarter", rent: 10000, category: "Boys" },
  { name: "SR Greens Girls PG", locality: "Chikitsak Nagar", rent: 16000, category: "Girls" },
  { name: "Jain PG", locality: "Bholaram Ustad Market", rent: 6000, category: "Co-Living" },
  { name: "Nagar Boys Hostel", locality: "Sheetal Nagar", rent: 6000, category: "Boys" },
  { name: "Bhagyashree Residency Girls Hostel", locality: "Professor Colony", rent: 10500, category: "Girls" },
  { name: "Destiny Girls Hostel", locality: "Bhawarkua Main Road", rent: 10500, category: "Girls" },
  { name: "Maa Shakti Nivas PG for Girls", locality: "Malviya Nagar", rent: 4500, category: "Girls" },
  { name: "Sunita Girls PG", locality: "Indore", rent: 4500, category: "Girls" },
  { name: "VIP PG Girls Hostel", locality: "Nehru Nagar", rent: 7000, category: "Girls" },
  { name: "S-Mart Girls Hostel Indore", locality: "Indore", rent: 8600, category: "Girls" },
  { name: "Shivalay Girls Hostel", locality: "Jaora Compound", rent: 20000, category: "Girls" },
  { name: "Samriddhi Luxurious Girls PG", locality: "Manorama Ganj", rent: 5500, category: "Girls" },
  { name: "Vasundhara Girls Hostel", locality: "Vijay Nagar", rent: 15000, category: "Girls" },
  { name: "Maa Boys Hostel", locality: "Chhawni", rent: 4000, category: "Boys" },
  { name: "Mangalam Girls Hostel PG", locality: "Chhawni", rent: 10000, category: "Girls" },
  { name: "Divyaraj PG", locality: "Scheme No. 54", rent: 5000, category: "Co-Living" },
  { name: "Raghuvanshi Hostel", locality: "Indore GPO", rent: 6000, category: "Co-Living" },
  { name: "Shivalay Boys Hostel and Mess", locality: "Swadesh Nagar", rent: 8000, category: "Boys" },
  { name: "Terrace Co-Living Spaces", locality: "Snehnagar", rent: 10000, category: "Co-Living" },
  { name: "Kaivalya Girls Hostel", locality: "Anurag Nagar", rent: 7600, category: "Girls" },
  { name: "Jain Boys Hostel", locality: "Residency Area", rent: 6000, category: "Boys" },
  { name: "Tirupati Girls Hostel", locality: "Manorama Ganj", rent: 9800, category: "Girls" },
  { name: "Madhva Girls Hostel", locality: "Scheme No. 94", rent: 12000, category: "Girls" },
  { name: "Satguru Boys Hostel", locality: "Mangal Nagar", rent: 13000, category: "Boys" },
  { name: "Sai Girls PG", locality: "Manorama Ganj", rent: 6000, category: "Girls" },
  { name: "Ram Krishna PG and Hostel", locality: "Bhawarkua", rent: 12000, category: "Co-Living" },
  
  // SOUTH TUKOGANJ
  { name: "Pragya Girls Hostel/PG", locality: "South Tukoganj", rent: 8000, category: "Girls" },
  { name: "Kings Homes Stay PG", locality: "South Tukoganj", rent: 8000, category: "Co-Living" },
  { name: "Whitefeild Girls PG Indore", locality: "South Tukoganj", rent: 8500, category: "Girls" },
  { name: "Brij Dham Girls Hostel", locality: "South Tukoganj", rent: 15000, category: "Girls" },
  { name: "Shri Boys Hostel/PG", locality: "South Tukoganj", rent: 7000, category: "Boys" },
  { name: "Siddhant Boys Hostel & PG", locality: "South Tukoganj", rent: 7500, category: "Boys" },

  // GEETA BHAWAN
  { name: "7 Seas Pearl Girls Hostel", locality: "Geeta Bhawan", rent: 9000, category: "Girls" },
  { name: "Seervi Boys Hostel", locality: "Geeta Bhawan", rent: 8000, category: "Boys" },
  { name: "Maheshwari Girls Hostel", locality: "Geeta Bhawan", rent: 7500, category: "Girls" },
  { name: "Maya Devi Boys Hostel", locality: "Geeta Bhawan", rent: 7000, category: "Boys" },
  { name: "GenZ Boys Hostel", locality: "Geeta Bhawan", rent: 8000, category: "Boys" },
  { name: "Good Time Room", locality: "Geeta Bhawan", rent: 7000, category: "Co-Living" },
  { name: "Samriddhi Luxurious Girls PG", locality: "Geeta Bhawan", rent: 10000, category: "Girls" },
  { name: "Shradha Saburi Girls Hostel", locality: "Geeta Bhawan", rent: 7500, category: "Girls" },

  // NEW PALASIA
  { name: "Hostelwale", locality: "New Palasia", rent: 7000, category: "Co-Living" },
  { name: "Joshis PG", locality: "New Palasia", rent: 8000, category: "Co-Living" },

  // VISHNU PURI
  { name: "New Vijayshree Boys Hostel", locality: "Vishnu Puri", rent: 5000, category: "Boys" },
  { name: "Vrajraj PG Boys Hostel", locality: "Vishnu Puri", rent: 5000, category: "Boys" },
  { name: "Gokul Boys Hostel", locality: "Vishnu Puri", rent: 4500, category: "Boys" },
  { name: "APN Hostel", locality: "Vishnu Puri", rent: 5000, category: "Co-Living" },

  // NAVLAKHA
  { name: "Gurukul Girls Hostel", locality: "Navlakha", rent: 11999, category: "Girls" },
  { name: "Gurukul Boys Hostel", locality: "Navlakha", rent: 11999, category: "Boys" },
  { name: "Adarsh Hostel", locality: "Navlakha", rent: 7000, category: "Co-Living" },
  { name: "Hridhaan Girls Hostel", locality: "Navlakha", rent: 8000, category: "Girls" },

  // TILAK NAGAR
  { name: "Shrinath Boys Hostel", locality: "Tilak Nagar", rent: 7000, category: "Boys" },

  // CHHAWNI
  { name: "Maa Boys Hostel", locality: "Chhawni", rent: 7000, category: "Boys" },
  { name: "Shree Aashiyaana Girls Hostel", locality: "Chhawni", rent: 7500, category: "Girls" },
  { name: "Shree Ram Girls Hostel", locality: "Chhawni", rent: 8500, category: "Girls" },

];

async function seedHostels() {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is missing from backend/.env");
    }

    await mongoose.connect(process.env.MONGO_URI);

    let added = 0;
    let existing = 0;

    for (const item of hostels) {
      const hostel = {
        ...item,
        address: "",
        description:
          "Listed in a public accommodation directory. Confirm current rent, availability, address and facilities directly with the property.",
        amenities: [],
        images: [],
        phone: "",
        website: "",
        verified: false,
      };

      const result = await Hostel.updateOne(
        { name: item.name },
        { $setOnInsert: hostel },
        { upsert: true }
      );

      if (result.upsertedCount > 0) {
        added++;
      } else {
        existing++;
      }
    }

    console.log("Hostel seed completed.");
    console.log(`New listings added: ${added}`);
    console.log(`Existing listings preserved: ${existing}`);
    console.log(`Total hostels in database: ${await Hostel.countDocuments()}`);
  } catch (error) {
    console.error("Seeding failed:", error.message);
  } finally {
    await mongoose.disconnect();
  }
}

seedHostels();
