import type { Hostel } from "@/types";

// Real, license-free Pexels photos. Each hostel has a main + gallery images.
// NOTE: All listings are DEMO sample data, not verified real properties.
export const HOSTELS: Hostel[] = [
  {
    id: "h1",
    name: "Sunrise Boys Residency",
    locality: "Vijay Nagar",
    rent: 6500,
    category: "Boys",
    rating: 4.3,
    reviews: 128,
    description:
      "A welcoming boys hostel close to major coaching institutes and bus stops. Spacious shared rooms, a common study lounge and a rooftop mess serving homely vegetarian meals.",
    amenities: ["Wi-Fi", "AC", "Meals", "Laundry", "Study Desk", "Power Backup", "CCTV"],
    images: [
      "https://images.pexels.com/photos/5137980/pexels-photo-5137980.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
      "https://images.pexels.com/photos/4443185/pexels-photo-4443185.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
      "https://images.pexels.com/photos/1099207/pexels-photo-1099207.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    ],
    verified: false,
  },
  {
    id: "h2",
    name: "Green Park Girls Hostel",
    locality: "Palasia",
    rent: 8500,
    category: "Girls",
    rating: 4.6,
    reviews: 96,
    description:
      "A secure, well-maintained girls hostel in a leafy residential lane. Offers single and twin sharing rooms, 24x7 warden support, and a fitness corner.",
    amenities: ["Wi-Fi", "AC", "Meals", "Gym", "Hot Water", "Security", "Housekeeping"],
    images: [
      "https://images.pexels.com/photos/4907197/pexels-photo-4907197.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
      "https://images.pexels.com/photos/4589784/pexels-photo-4589784.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
      "https://images.pexels.com/photos/8472881/pexels-photo-8472881.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    ],
    verified: false,
  },
  {
    id: "h3",
    name: "Urban Nest Co-Living",
    locality: "Vijay Nagar",
    rent: 9500,
    category: "Co-Living",
    rating: 4.4,
    reviews: 72,
    description:
      "A modern co-living space designed for students and young professionals. Furnished private rooms, shared lounges, a coworking zone and weekly community events.",
    amenities: ["Wi-Fi", "AC", "Coworking", "Gym", "Kitchen", "Laundry", "Lounge"],
    images: [
      "https://images.pexels.com/photos/6585598/pexels-photo-6585598.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
      "https://images.pexels.com/photos/7546648/pexels-photo-7546648.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
      "https://images.pexels.com/photos/20390785/pexels-photo-20390785.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    ],
    verified: false,
  },
  {
    id: "h4",
    name: "Bhawarkua Central Boys PG",
    locality: "Bhawarkua",
    rent: 5500,
    category: "Boys",
    rating: 4.0,
    reviews: 154,
    description:
      "Budget-friendly boys PG in the heart of Bhawarkua. Walking distance to stationery markets, dhabas and the main bus terminal. Simple, clean and practical.",
    amenities: ["Wi-Fi", "Meals", "Hot Water", "Power Backup", "CCTV"],
    images: [
      "https://images.pexels.com/photos/5213063/pexels-photo-5213063.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
      "https://images.pexels.com/photos/3954635/pexels-photo-3954635.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
      "https://images.pexels.com/photos/4907208/pexels-photo-4907208.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    ],
    verified: false,
  },
  {
    id: "h5",
    name: "Lotus Girls Residency",
    locality: "Bhawarkua",
    rent: 6000,
    category: "Girls",
    rating: 4.2,
    reviews: 88,
    description:
      "Affordable girls hostel near Bhawarkua main road with strict entry logging, CCTV and a homely mess. Popular with first-year undergraduates.",
    amenities: ["Wi-Fi", "Meals", "Laundry", "Security", "Hot Water", "Study Desk"],
    images: [
      "https://images.pexels.com/photos/4907214/pexels-photo-4907214.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
      "https://images.pexels.com/photos/8472885/pexels-photo-8472885.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
      "https://images.pexels.com/photos/4050406/pexels-photo-4050406.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    ],
    verified: false,
  },
  {
    id: "h6",
    name: "Rau Riverside Co-Living",
    locality: "Rau",
    rent: 7000,
    category: "Co-Living",
    rating: 4.5,
    reviews: 64,
    description:
      "A newer co-living property near Rau with furnished shared rooms, fast Wi-Fi and a games room. Ideal for engineering students at nearby campuses.",
    amenities: ["Wi-Fi", "AC", "Meals", "Gym", "Gaming", "Laundry", "Power Backup"],
    images: [
      "https://images.pexels.com/photos/7587828/pexels-photo-7587828.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
      "https://images.pexels.com/photos/7167073/pexels-photo-7167073.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
      "https://images.pexels.com/photos/5158945/pexels-photo-5158945.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    ],
    verified: false,
  },
  {
    id: "h7",
    name: "Palasia Heights Girls PG",
    locality: "Palasia",
    rent: 8000,
    category: "Girls",
    rating: 4.4,
    reviews: 110,
    description:
      "Bright, airy rooms in a quiet Palasia lane. Features a reading room, mini library, and balanced vegetarian meals cooked in-house.",
    amenities: ["Wi-Fi", "AC", "Meals", "Study Desk", "Library", "Security", "Housekeeping"],
    images: [
      "https://images.pexels.com/photos/4907199/pexels-photo-4907199.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
      "https://images.pexels.com/photos/36766888/pexels-photo-36766888.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
      "https://images.pexels.com/photos/4134778/pexels-photo-4134778.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    ],
    verified: false,
  },
  {
    id: "h8",
    name: "Vijay Nagar Scholar Boys Hostel",
    locality: "Vijay Nagar",
    rent: 7200,
    category: "Boys",
    rating: 4.1,
    reviews: 142,
    description:
      "A focused study-oriented boys hostel with a quiet reading floor, high-speed Wi-Fi and a mess serving North and South Indian meals. Close to two main coaching centres.",
    amenities: ["Wi-Fi", "AC", "Meals", "Study Desk", "Power Backup", "CCTV", "Hot Water"],
    images: [
      "https://images.pexels.com/photos/4939668/pexels-photo-4939668.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
      "https://images.pexels.com/photos/4907211/pexels-photo-4907211.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
      "https://images.pexels.com/photos/36730162/pexels-photo-36730162.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    ],
    verified: false,
  },
];

export const ALL_AMENITIES = [
  "Wi-Fi",
  "AC",
  "Meals",
  "Laundry",
  "Gym",
  "Power Backup",
  "CCTV",
  "Study Desk",
  "Hot Water",
  "Security",
  "Housekeeping",
  "Coworking",
  "Kitchen",
  "Lounge",
  "Gaming",
  "Library",
];

export const LOCALITIES = [
  "Vijay Nagar",
  "Bhawarkua",
  "Scheme No. 54",
  "Scheme No. 78",
  "Manorama Ganj",
  "Navlakha",
  "Geeta Bhawan",
  "New Palasia",
  "South Tukoganj",
  "Tilak Nagar",
  "Chhawni",
  "Vishnu Puri",
];
export const CATEGORIES: Hostel["category"][] = ["Boys", "Girls", "Co-Living"];

export function getHostelById(id: string): Hostel | undefined {
  return HOSTELS.find((h) => h.id === id);
}
