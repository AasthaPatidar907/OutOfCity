export interface Area {
  name: string;
  blurb: string;
  avgRent: number; // average monthly rent in INR
  image: string;
}

export const AREAS: Area[] = [
  {
    name: "Vijay Nagar",
    blurb: "A busy student hub with cafes, coaching centres and great bus connectivity to colleges across Indore.",
    avgRent: 6500,
    image:
      "https://images.pexels.com/photos/28678222/pexels-photo-28678222.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  },
  {
    name: "Bhawarkua",
    blurb: "One of Indore's most established localities, packed with affordable eateries and bookshops.",
    avgRent: 5500,
    image:
      "https://images.pexels.com/photos/3340052/pexels-photo-3340052.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  },
  {
    name: "Palasia",
    blurb: "A quieter, greener neighbourhood popular with postgraduate students and young professionals.",
    avgRent: 7500,
    image:
      "https://images.pexels.com/photos/21751093/pexels-photo-21751093.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  },
  {
    name: "Rau",
    blurb: "Close to engineering and management colleges on the western outskirts, with newer co-living spaces.",
    avgRent: 6000,
    image:
      "https://images.pexels.com/photos/21363831/pexels-photo-21363831.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  },
];
