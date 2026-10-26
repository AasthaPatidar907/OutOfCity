export type Category = "Boys" | "Girls" | "Co-Living";

export interface Hostel {
  id: string;
  name: string;
  locality: string;
  rent: number; // monthly rent in INR
  category: Category;
  rating: number; // 0-5
  reviews: number; // demo review count
  description: string;
  amenities: string[];
  images: string[];
  verified: false; // always demo data
}

export interface Enquiry {
  id: string;
  hostelId: string;
  hostelName: string;
  name: string;
  email: string;
  phone: string;
  moveInDate: string;
  message: string;
  createdAt: string;
}

export interface User {
  name: string;
  email: string;
}
