// src/data/menu.js
export const shop = {
  name: "Ali Bilal Ice Cream",
  phones: ["79143503", "71788746"],
  instagram: "ali.bilal.icecream",
  facebook: "AliBilalIceCream",
  whatsapp: "96171788746", // international format (IMPORTANT)
  location: "https://maps.google.com", // replace with real maps link
};

export const categories = [
  { id: "seasonal", name: "Seasonal", nameAR: "الموسمية" },
  { id: "cheesecake", name: "Cheesecake", nameAR: "تشيز كيك" },
  { id: "icecream", name: "Ice Cream", nameAR: "آيس كريم" },
  { id: "special", name: "Special Cups", nameAR: "كاسات خاصة" },
  { id: "milkshake", name: "Milkshakes", nameAR: "ميلك شيك" },
  { id: "drinks", name: "Drinks", nameAR: "مشروبات" },
  { id: "winter", name: "Winter Items", nameAR: "مشروبات شتوية" },
  { id: "dessert", name: "Desserts", nameAR: "حلويات" },
];

export const items = [

  // ================= CHEESECAKE =================
  {
  id: 1,
  category: "cheesecake",
  name: "Blueberry Cheesecake",
  nameAR: "تشيز كيك توت",
  ingredientsEN: "Cream cheese, blueberry topping, biscuit base",
  ingredientsAR: "جبنة كريمية، صوص توت، قاعدة بسكويت",
  featured: true,
  images: [
    "/src/images/photo_2026-02-21_11-53-48.jpg",
    "/src/images/photo_2026-02-21_11-53-51.jpg"
  ],
  prices: [
    { label: "Slice", price: { usd: 4, ll: 360000 } },
    { label: "Whole Cake", price: { usd: 28, ll: 2520000 } },
  ],
},
  {
    id: 2,
    category: "cheesecake",
    name: "Strawberry Cheesecake",
    nameAR: "تشيز كيك فراولة",
    prices: [
      { label: "Slice", price: { usd: 4, ll: 360000 } },
    ],
  },

  // ================= ICE CREAM =================
  {
  id: 7,
  category: "icecream",
  name: "Ice Cream (All Flavors)",
  nameAR: "آيس كريم جميع النكهات",
  ingredientsEN: "Milk, cream, sugar, natural flavors",
  ingredientsAR: "حليب، كريمة، سكر، نكهات طبيعية",
  prices: [
      { label: "Cup", price: { usd: 2, ll: 180000 } },
      { label: "Cone", price: { usd: 2.5, ll: 225000 } },
      { label: "1 Kilo", price: { usd: 18, ll: 1620000 } },
    ],
    extras: [
      { label: "Extra Nuts", price: { usd: 1, ll: 90000 } },
      { label: "Extra Cream", price: { usd: 0.5, ll: 45000 } },
    ],
  },

  {
    id: 8,
    category: "icecream",
    name: "Ashta & Pistachio",
    nameAR: "قشطة وفستق",
    prices: [
      { label: "Cup", price: { usd: 3, ll: 270000 } },
      { label: "Cone", price: { usd: 3, ll: 270000 } },
    ],
  },

  // ================= SPECIAL =================
  {
  id: 9,
  category: "special",
  name: "Oreo Special Cup",
  nameAR: "كاسة أوريو",
  ingredientsEN: "Nutella, fresh cream, milk",
  ingredientsAR: "نوتيلا، كريمة طازجة، حليب",
  featured: true,
  description: "Ice cream + essence + nuts/cream",
  prices: [
    { label: "Regular", price: { usd: 5, ll: 450000 } },
  ],
},

  // ================= MILKSHAKES =================
  {
  id: 16,
  category: "milkshake",
  name: "Nutella with Cream",
  nameAR: "نوتيلا مع كريمة",
  ingredientsEN: "Nutella, fresh cream, milk",
  ingredientsAR: "نوتيلا، كريمة طازجة، حليب",
  featured: true,
  prices: [
    { label: "Small", price: { usd: 4, ll: 360000 } },
    { label: "Large", price: { usd: 6, ll: 540000 } },
  ],
},

  {
    id: 17,
    category: "milkshake",
    name: "Strawberry",
    nameAR: "فراولة",
    prices: [
      { label: "Small", price: { usd: 3, ll: 270000 } },
      { label: "Large", price: { usd: 5, ll: 450000 } },
    ],
  },

  // ================= DRINKS =================
  {
  id: 24,
  category: "drinks",
  name: "Iced Coffee",
  nameAR: "آيس كوفي",
  seasonal: true,
    prices: [
      { label: "Regular", price: { usd: 3, ll: 270000 } },
      { label: "Large", price: { usd: 4, ll: 360000 } },
    ],
  },

  {
    id: 25,
    category: "drinks",
    name: "Hot Chocolate",
    nameAR: "هوت شوكليت",
    prices: [
      { label: "Regular", price: { usd: 3, ll: 270000 } },
    ],
  },

  // ================= WINTER =================
  {
  id: 27,
  category: "winter",
  name: "Sahlab + Habayeb",
  nameAR: "سحلب + حبايب",
  seasonal: true,
  prices: [
    { label: "Cup", price: { usd: 3, ll: 270000 } },
  ],
},

  // ================= DESSERTS =================
  {
    id: 28,
    category: "dessert",
    name: "Custard + Muhalabia",
    nameAR: "كاستر + مهلبية",
    prices: [
      { label: "Cup", price: { usd: 3, ll: 270000 } },
    ],
  },

  {
    id: 29,
    category: "dessert",
    name: "Kit Kat Mou",
    nameAR: "كيت كات مو",
    prices: [
      { label: "Piece", price: { usd: 2, ll: 180000 } },
    ],
  },
];


