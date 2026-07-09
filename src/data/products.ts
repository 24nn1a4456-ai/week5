/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Product {
  id: string;
  name: string;
  category: string;
  collection: string;
  price: number;
  rating: number;
  reviewsCount: number;
  images: string[];
  description: string;
  specs: { [key: string]: string };
  badge?: string;
  isCustom?: boolean;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

// 12 Premium Signature Curated Pieces in Indian Rupees (₹) with real Unsplash Images
export const signatureProducts: Product[] = [
  {
    id: "sig_chrono_01",
    name: "Zenith Carbon Chronograph Watch",
    category: "Luxury Watches",
    collection: "Heritage Classic",
    price: 345000,
    rating: 4.9,
    reviewsCount: 18,
    images: [
      "https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=600&q=80",
      "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&q=80"
    ],
    description: "An elegant premium watch designed with a carbon-coated frame and automated chronograph dial. Perfect for active wear and formal gatherings.",
    specs: {
      "Case Material": "Premium Carbon Fiber Blend",
      "Size": "41mm Dial",
      "Movement": "Automatic Chronograph Gearbox",
      "Power Reserve": "60 Hours",
      "Water Resistance": "50 Meters",
      "Strap": "Premium Textured Rubber and Leather"
    },
    badge: "New Release"
  },
  {
    id: "sig_blazer_01",
    name: "Midnight Silk Evening Jacket",
    category: "Designer Clothing",
    collection: "Modern Minimalist",
    price: 68000,
    rating: 4.8,
    reviewsCount: 12,
    images: [
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&q=80",
      "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=600&q=80"
    ],
    description: "Tailored to perfection from a luxury blend of fine silk and wool. Features satin lapels, premium buttons, and a comfortable premium lining.",
    specs: {
      "Material": "70% Silk, 30% Merino Wool",
      "Fit": "Tailored Fit",
      "Lining": "100% Breathable Viscose Silk",
      "Pockets": "Two front pockets, two secure interior pockets",
      "Buttons": "Natural horn style buttons"
    },
    badge: "Bestseller"
  },
  {
    id: "sig_bag_01",
    name: "Handcrafted Suede Duffle Bag",
    category: "Premium Leather Goods",
    collection: "Elegant Pearl",
    price: 45000,
    rating: 5.0,
    reviewsCount: 24,
    images: [
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&q=80",
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80"
    ],
    description: "A spacious travel weekender duffle hand-stitched from select full-grain calfskin leather. Built to stay stylish for decades.",
    specs: {
      "Leather Type": "Full Grain Italian Suede",
      "Hardware": "Solid Brushed Brass buckles",
      "Dimensions": "50cm x 26cm x 22cm",
      "Interior": "Soft micro-suede layout with zip compartments",
      "Strap": "Removable heavy-duty leather shoulder strap"
    },
    badge: "Limited Stock"
  },
  {
    id: "sig_scent_01",
    name: "Golden Sandalwood Luxury Perfume",
    category: "Luxury Perfumes",
    collection: "Gold Edition",
    price: 11500,
    rating: 4.7,
    reviewsCount: 31,
    images: [
      "https://images.unsplash.com/photo-1541643600914-78b084683601?w=600&q=80",
      "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=600&q=80"
    ],
    description: "A rich, clean fragrance blending warm sandalwood oils with fresh lavender notes. Designed to last over 12 hours with a subtle presence.",
    specs: {
      "Scent Type": "Warm Woody Sandalwood & Citrus",
      "Concentration": "Pure Eau De Parfum",
      "Volume": "100 ml",
      "Packaging": "Weighted crystal bottle with dynamic magnetic cap"
    },
    badge: "Exclusive"
  },
  {
    id: "sig_decor_01",
    name: "Crafted Ceramic Alabaster Vase",
    category: "Fine Home Decor",
    collection: "Elegant Pearl",
    price: 18500,
    rating: 4.9,
    reviewsCount: 9,
    images: [
      "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?w=600&q=80",
      "https://images.unsplash.com/photo-1581781894097-213307e2245e?w=600&q=80"
    ],
    description: "Individually hand-carved decorative vase with beautiful natural marble veins. Adds a touch of modern class to living rooms or hallways.",
    specs: {
      "Material": "Natural Polished Ceramic Stone",
      "Weight": "3.5 kg",
      "Dimensions": "30cm Tall x 15cm Width",
      "Care": "Wipe with soft dry cloth"
    },
    badge: "Artisan Made"
  },
  {
    id: "sig_shoe_01",
    name: "Burnished Suede Oxford Shoes",
    category: "Designer Clothing",
    collection: "Heritage Classic",
    price: 24000,
    rating: 4.6,
    reviewsCount: 15,
    images: [
      "https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=600&q=80"
    ],
    description: "Classic lace-up shoes made from premium calf suede. Equipped with dynamic cushioned leather soles for absolute comfort throughout the day.",
    specs: {
      "Upper Material": "Premium French Suede",
      "Sole": "Multilayer shockproof leather sole",
      "Lining": "Comfortable breathable sheepskin",
      "Style": "Elegant Oxford"
    }
  },
  {
    id: "sig_chrono_02",
    name: "Rose Gold Celestial Watch",
    category: "Luxury Watches",
    collection: "Royal Series",
    price: 520000,
    rating: 5.0,
    reviewsCount: 8,
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80"
    ],
    description: "An elegant automatic watch finished with 18k solid rose gold. Features an integrated moonphase subdial and a scratch-resistant sapphire face.",
    specs: {
      "Case Material": "18k Rose Gold Plated Premium Steel",
      "Strap": "Alligator-style genuine brown leather",
      "Diameter": "40mm",
      "Movement": "Japanese Automatic Moonphase Caliber",
      "Power Reserve": "48 Hours"
    },
    badge: "Elite Masterpiece"
  },
  {
    id: "sig_jewelry_01",
    name: "Eternity Diamond Ring",
    category: "Exquisite Jewelry",
    collection: "Royal Series",
    price: 280000,
    rating: 4.9,
    reviewsCount: 5,
    images: [
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&q=80"
    ],
    description: "A gorgeous luxury ring crafted in solid 18k yellow gold, hand-set with circular brilliant diamonds of verified purity.",
    specs: {
      "Metal": "18k Solid Yellow Gold",
      "Diamonds": "Total 1.5 Carat Weight",
      "Clarity Rating": "VS1",
      "Color": "F-Grade White Diamond",
      "Weight": "6.2 grams"
    },
    badge: "Heritage Design"
  },
  {
    id: "sig_bag_02",
    name: "Crocodile Leather Handbag",
    category: "Premium Leather Goods",
    collection: "Royal Series",
    price: 185000,
    rating: 4.9,
    reviewsCount: 11,
    images: [
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&q=80"
    ],
    description: "A statement piece created from textured alligator leather. Features a strong magnetic gold-tone lock and expandable main pocket.",
    specs: {
      "Material": "Select Calfskin with Croc Pattern Finish",
      "Clasp": "Solid Steel with 24k Gold Layer",
      "Dimensions": "28cm x 20cm x 12cm",
      "Pockets": "Two inner pockets, one external card slot"
    },
    badge: "Highly Demanded"
  },
  {
    id: "sig_decor_02",
    name: "Velvet Obsidian Lounge Chair",
    category: "Fine Home Decor",
    collection: "Modern Minimalist",
    price: 72000,
    rating: 5.0,
    reviewsCount: 3,
    images: [
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=600&q=80"
    ],
    description: "An elegant ergonomic armchair upholstered in soft midnight-black velvet. Rests on strong brass legs, adding instant charm to your lounge.",
    specs: {
      "Fabric": "High-Thread Soft Italian Velvet",
      "Legs": "Solid iron with polished gold coating",
      "Load Capacity": "Up to 150 kg",
      "Dimensions": "75cm Width x 85cm Height"
    },
    badge: "Designer's Choice"
  },
  {
    id: "sig_scent_02",
    name: "Premium Kashmiri Rose Mist",
    category: "Luxury Perfumes",
    collection: "Royal Series",
    price: 14000,
    rating: 4.8,
    reviewsCount: 19,
    images: [
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=600&q=80"
    ],
    description: "Formulated with pure extracts of handpicked Kashmiri roses, sweet honey, and cedarwood oils. Perfect for daily luxury wear.",
    specs: {
      "Volume": "100 ml",
      "Top Notes": "Fresh Rose, Citrus",
      "Base Notes": "Deep Amber, Musk, Sandalwood",
      "Concentration": "25% pure essential oils"
    }
  },
  {
    id: "sig_jewelry_02",
    name: "Solid Gold Link Bracelet",
    category: "Exquisite Jewelry",
    collection: "Modern Minimalist",
    price: 155000,
    rating: 4.7,
    reviewsCount: 14,
    images: [
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&q=80"
    ],
    description: "A bold, beautiful link chain bracelet crafted from solid yellow gold. Fitted with a secure luxury clasp for daily wear.",
    specs: {
      "Metal": "18k Solid Yellow Gold",
      "Weight": "14.5 grams",
      "Chain Style": "Polished Cuban Link",
      "Length": "19 cm with custom adjustments"
    },
    badge: "Bestseller"
  }
];

export const CATEGORIES = [
  "Luxury Watches",
  "Designer Clothing",
  "Premium Leather Goods",
  "Luxury Perfumes",
  "Fine Home Decor",
  "Exquisite Jewelry"
];

export const COLLECTIONS = [
  "Heritage Classic",
  "Modern Minimalist",
  "Elegant Pearl",
  "Gold Edition",
  "Royal Series"
];

const ADJECTIVES = [
  "Signature", "Classic", "Premium", "Supreme", "Elegant",
  "Royal", "Heritage", "Imperial", "Bespoke", "Artisan",
  "Gold Edition", "Suede", "Soft Velvet", "Vintage", "Polished"
];

const MATERIALS = [
  "Yellow Gold", "Platinum", "Textured Leather", "Sandalwood", "Fine Marble",
  "Full-Grain Calfskin", "Mulberry Silk", "Italian Suede", "Crystal", "Polished Brass"
];

const ITEMS = {
  "Luxury Watches": ["Chronograph Watch", "Automatic Watch", "Sports Watch", "Sleek Dress Watch", "Minimalist Dial Timepiece"],
  "Designer Clothing": ["Evening Blazer", "Silk Casual Dress", "Comfort Fit Jacket", "Premium Wool Coat", "Classic Suede Shoes"],
  "Premium Leather Goods": ["Travel Weekender Bag", "Leather Wallet Case", "Classic Briefcase", "Premium Crossbody Bag", "Elegant Handbag"],
  "Luxury Perfumes": ["Pure Parfum Mist", "Summer Eau De Parfum", "Floral Scent Extract", "Oud Wood Fragrance", "Sandalwood Perfume"],
  "Fine Home Decor": ["Handcrafted Vase", "Velvet Accent Chair", "Marble Sculpted Tray", "Artisan Ceramic Bowl", "Brass Desk Lamp"],
  "Exquisite Jewelry": ["Gold Link Bracelet", "Diamond Eternity Ring", "Silver Pendant Chain", "Luxury Hoop Earrings", "Faceted Pearl Bangle"]
};

// Generates a mock product deterministically from an integer index (1 to 1,245,892)
export function getProductByIndex(index: number): Product {
  const hash = (s: number) => {
    let x = Math.sin(s) * 10000;
    return x - Math.floor(x);
  };

  const r1 = hash(index);
  const r2 = hash(index + 7);
  const r3 = hash(index + 13);
  const r4 = hash(index + 29);
  const r5 = hash(index + 43);

  const category = CATEGORIES[Math.floor(r1 * CATEGORIES.length)];
  const collection = COLLECTIONS[Math.floor(r2 * COLLECTIONS.length)];
  const adj = ADJECTIVES[Math.floor(r3 * ADJECTIVES.length)];
  const material = MATERIALS[Math.floor(r4 * MATERIALS.length)];
  const itemsOfCat = ITEMS[category as keyof typeof ITEMS] || ITEMS["Luxury Watches"];
  const itemType = itemsOfCat[Math.floor(r5 * itemsOfCat.length)];

  const id = `index_${index}`;
  const name = `${adj} ${material} ${itemType} No. ${index.toString().padStart(4, "0")}`;

  // Realistic prices in INR
  let basePrice = 5000;
  if (category === "Luxury Watches") basePrice = 120000 + Math.floor(r1 * 800000);
  else if (category === "Exquisite Jewelry") basePrice = 75000 + Math.floor(r1 * 600000);
  else if (category === "Premium Leather Goods") basePrice = 18000 + Math.floor(r1 * 120000);
  else if (category === "Designer Clothing") basePrice = 12000 + Math.floor(r1 * 95000);
  else if (category === "Fine Home Decor") basePrice = 9000 + Math.floor(r1 * 140000);
  else if (category === "Luxury Perfumes") basePrice = 4500 + Math.floor(r1 * 25000);

  const roundedPrice = Math.floor(basePrice / 100) * 100;
  const rating = parseFloat((4.3 + r2 * 0.7).toFixed(1));
  const reviewsCount = Math.floor(r3 * r4 * 120) + 2;

  // Unsplash mapping for gorgeous visual consistency in generic list
  const watchImages = [
    "https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=600&q=80",
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80",
    "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&q=80"
  ];
  const clothingImages = [
    "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&q=80",
    "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=600&q=80",
    "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&q=80"
  ];
  const leatherImages = [
    "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&q=80",
    "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&q=80",
    "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80"
  ];
  const perfumeImages = [
    "https://images.unsplash.com/photo-1541643600914-78b084683601?w=600&q=80",
    "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=600&q=80",
    "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=600&q=80"
  ];
  const decorImages = [
    "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?w=600&q=80",
    "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=600&q=80",
    "https://images.unsplash.com/photo-1581781894097-213307e2245e?w=600&q=80"
  ];
  const jewelryImages = [
    "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&q=80",
    "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&q=80",
    "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=80"
  ];

  let selectedImgList = watchImages;
  if (category === "Designer Clothing") selectedImgList = clothingImages;
  else if (category === "Premium Leather Goods") selectedImgList = leatherImages;
  else if (category === "Luxury Perfumes") selectedImgList = perfumeImages;
  else if (category === "Fine Home Decor") selectedImgList = decorImages;
  else if (category === "Exquisite Jewelry") selectedImgList = jewelryImages;

  const imageIdx = Math.floor(r5 * selectedImgList.length);
  const imageUrl = selectedImgList[imageIdx];

  const description = `Part of our premium range of over 1.2 million luxury products. This beautiful ${adj.toLowerCase()} creation is made using authentic ${material.toLowerCase()} and built with high attention to detail. It matches perfectly with the aesthetics of the ${collection}. Serial registration ID #${index}.`;

  const specs = {
    "Collection": collection,
    "Primary Material": material,
    "Registered ID": `#AETHER-IND-${index.toString().padStart(7, "0")}`,
    "Care Instructions": "Handle with care, clean with a dry soft cloth.",
    "Availability": "In stock. Usually dispatched in 24 hours."
  };

  const badge = r5 < 0.20 ? "Exclusive" : r5 > 0.85 ? "Limited" : undefined;

  return {
    id,
    name,
    category,
    collection,
    price: roundedPrice,
    rating,
    reviewsCount,
    images: [imageUrl],
    description,
    specs,
    badge,
    isCustom: true
  };
}

// Complex Filtering/Sorting Engine
export function queryIndexedProducts({
  search,
  category,
  collection,
  minPrice,
  maxPrice,
  sortBy,
  page = 1,
  limit = 9
}: {
  search?: string;
  category?: string;
  collection?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: "relevance" | "price_asc" | "price_desc" | "rating";
  page?: number;
  limit?: number;
}) {
  // Step 1: Filter signature products first
  let filteredSignatures = signatureProducts.filter(p => {
    if (category && p.category !== category) return false;
    if (collection && p.collection !== collection) return false;
    if (minPrice && p.price < minPrice) return false;
    if (maxPrice && p.price > maxPrice) return false;
    if (search) {
      const q = search.toLowerCase();
      const matchName = p.name.toLowerCase().includes(q);
      const matchDesc = p.description.toLowerCase().includes(q);
      const matchCat = p.category.toLowerCase().includes(q);
      if (!matchName && !matchDesc && !matchCat) return false;
    }
    return true;
  });

  const matchedGenerics: Product[] = [];
  const TOTAL_INDEXED_ITEMS = 1245892;

  let seedBase = 1000;
  if (category) {
    seedBase += CATEGORIES.indexOf(category) * 10000;
  }
  if (collection) {
    seedBase += COLLECTIONS.indexOf(collection) * 2000;
  }

  if (search) {
    let searchVal = 0;
    for (let i = 0; i < search.length; i++) {
      searchVal += search.charCodeAt(i) * (i + 1);
    }
    seedBase += (searchVal % 500) * 100;
  }

  // Generate a list of candidate indexes to evaluate
  const candidatesCount = 120;
  for (let i = 0; i < candidatesCount; i++) {
    const itemIndex = (seedBase + i * 17) % TOTAL_INDEXED_ITEMS + 1;
    const p = getProductByIndex(itemIndex);

    // Apply strict filters
    if (category && p.category !== category) continue;
    if (collection && p.collection !== collection) continue;
    if (minPrice && p.price < minPrice) continue;
    if (maxPrice && p.price > maxPrice) continue;
    if (search) {
      const q = search.toLowerCase();
      const matchName = p.name.toLowerCase().includes(q);
      if (!matchName) continue;
    }

    matchedGenerics.push(p);
  }

  // Combine both
  let combined = [...filteredSignatures, ...matchedGenerics];

  // Remove duplicates
  const seenIds = new Set<string>();
  combined = combined.filter(item => {
    if (seenIds.has(item.id)) return false;
    seenIds.add(item.id);
    return true;
  });

  // Apply Sorting
  if (sortBy === "price_asc") {
    combined.sort((a, b) => a.price - b.price);
  } else if (sortBy === "price_desc") {
    combined.sort((a, b) => b.price - a.price);
  } else if (sortBy === "rating") {
    combined.sort((a, b) => b.rating - a.rating);
  } else {
    // Relevance - signature products first
    combined.sort((a, b) => {
      const aIsSig = a.id.startsWith("sig_");
      const bIsSig = b.id.startsWith("sig_");
      if (aIsSig && !bIsSig) return -1;
      if (!aIsSig && bIsSig) return 1;
      return 0;
    });
  }

  // Calculate simulated "Total Results"
  let simulatedTotalResults = TOTAL_INDEXED_ITEMS;
  if (search && category) {
    simulatedTotalResults = Math.floor(1450 + Math.sin(seedBase) * 600);
  } else if (search) {
    simulatedTotalResults = Math.floor(4820 + Math.sin(seedBase) * 2000);
  } else if (category && collection) {
    simulatedTotalResults = 49830;
  } else if (category) {
    simulatedTotalResults = 207640;
  } else if (collection) {
    simulatedTotalResults = 249170;
  }

  if (minPrice || maxPrice) {
    simulatedTotalResults = Math.floor(simulatedTotalResults * 0.28);
  }

  if (simulatedTotalResults < combined.length) {
    simulatedTotalResults = combined.length;
  }

  // Paginate
  const startIndex = (page - 1) * limit;
  const paginatedItems = combined.slice(startIndex, startIndex + limit);

  return {
    items: paginatedItems,
    totalCount: simulatedTotalResults,
    page,
    totalPages: Math.ceil(simulatedTotalResults / limit),
    hasMore: startIndex + limit < combined.length
  };
}

// Generate reviews deterministically from item ID
export function getProductReviews(productId: string): Review[] {
  let val = 0;
  for (let i = 0; i < productId.length; i++) {
    val += productId.charCodeAt(i) * (i + 1);
  }

  const hash = (s: number) => {
    let x = Math.sin(s) * 10000;
    return x - Math.floor(x);
  };

  const REVIEWERS = [
    "Rajesh Kumar", "Anjali Sharma", "Vikram Malhotra", "Pooja Mehta",
    "Siddharth Sen", "Elena D'Souza", "Arjun Patel", "Nisha Roy", "Rahul Verma"
  ];

  const COMMENTS_GOOD = [
    "An absolutely brilliant product. The finish is fantastic, and the delivery was very professional.",
    "Very high quality. Looks gorgeous in person, and the box packaging feels exceptionally premium.",
    "Completely satisfied with the craftsmanship. Totally worth the investment for my living space.",
    "Beautiful design. Looks premium and works incredibly well. Very fast shipping as well.",
    "Excellent support and very premium experience. Highly recommended for anyone looking for the best quality."
  ];

  const COMMENTS_OK = [
    "A lovely piece, although delivery took slightly longer than expected. Good customer service.",
    "Very decent design and solid craftsmanship. Happy with this purchase."
  ];

  const count = 3 + (val % 4);
  const reviews: Review[] = [];

  for (let i = 0; i < count; i++) {
    const seed = val + i * 29;
    const r1 = hash(seed);
    const r2 = hash(seed + 11);
    const rating = r1 > 0.35 ? 5 : 4;
    const author = REVIEWERS[Math.floor(r2 * REVIEWERS.length)];
    const comment = rating === 5 
      ? COMMENTS_GOOD[Math.floor(hash(seed + 7) * COMMENTS_GOOD.length)]
      : COMMENTS_OK[Math.floor(hash(seed + 7) * COMMENTS_OK.length)];

    const day = (1 + Math.floor(r1 * 28)).toString().padStart(2, "0");
    const month = (1 + Math.floor(r2 * 12)).toString().padStart(2, "0");
    const date = `2026-${month}-${day}`;

    reviews.push({
      id: `${productId}_rev_${i}`,
      author,
      rating,
      date,
      comment,
      verified: r1 > 0.15
    });
  }

  return reviews;
}

// Autocomplete suggestions
export function getSearchSuggestions(query: string): string[] {
  if (!query) return [];
  const q = query.toLowerCase();

  const coreSuggestions = signatureProducts
    .map(p => p.name)
    .filter(name => name.toLowerCase().includes(q));

  const genericAdjectives = ADJECTIVES.filter(adj => adj.toLowerCase().includes(q));
  const genericMaterials = MATERIALS.filter(mat => mat.toLowerCase().includes(q));

  const extraSuggestions: string[] = [];
  if (genericMaterials.length > 0) {
    extraSuggestions.push(`${ADJECTIVES[0]} ${genericMaterials[0]} Chronograph Watch`);
    extraSuggestions.push(`Classic ${genericMaterials[0]} Sandalwood Perfume`);
  }
  if (genericAdjectives.length > 0) {
    extraSuggestions.push(`${genericAdjectives[0]} Gold Link Bracelet`);
    extraSuggestions.push(`${genericAdjectives[0]} Italian Leather Bag`);
  }

  const all = [...coreSuggestions, ...extraSuggestions];
  return Array.from(new Set(all)).slice(0, 6);
}
