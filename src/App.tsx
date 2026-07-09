/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Sparkles,
  Compass,
  Search,
  ShoppingBag,
  Heart,
  GitCompare,
  User,
  Plus,
  Minus,
  Trash2,
  Star,
  ArrowRight,
  ChevronRight,
  X,
  Filter,
  Sliders,
  Check,
  CreditCard,
  Lock,
  Package,
  MapPin,
  Eye,
  MessageSquare,
  ThumbsUp,
  RotateCcw,
  ShieldCheck,
  Briefcase,
  HelpCircle
} from 'lucide-react';

import {
  Product,
  Review,
  queryIndexedProducts,
  getProductReviews,
  getSearchSuggestions,
  getProductByIndex,
  signatureProducts
} from './data/products';

// --- Custom Interactive Vector Art Fallbacks ---
interface ArtProps {
  id: string;
  category: string;
  name: string;
}

const LuxuryProductArt: React.FC<ArtProps> = ({ id, category, name }) => {
  const hashVal = useMemo(() => {
    let val = 0;
    for (let i = 0; i < id.length; i++) {
      val += id.charCodeAt(i) * (i + 1);
    }
    return val;
  }, [id]);

  const rotationOffset = (hashVal % 360);
  const hue = 35 + (hashVal % 15);
  const saturation = 45 + (hashVal % 25);
  const goldColor = `hsl(${hue}, ${saturation}%, 55%)`;

  switch (category) {
    case "Luxury Watches":
      return (
        <svg viewBox="0 0 200 200" className="w-full h-full max-h-[220px] transition-transform duration-700 hover:rotate-12" id={`art_horology_${id}`}>
          <rect width="200" height="200" fill="#FAF8F5" rx="8" />
          <circle cx="100" cy="100" r="60" fill="none" stroke={goldColor} strokeWidth="2" />
          <circle cx="100" cy="100" r="54" fill="white" stroke="#EBE6DD" strokeWidth="1" />
          {[...Array(12)].map((_, i) => {
            const angle = (i * 30) * Math.PI / 180;
            return (
              <line 
                key={i} 
                x1={100 + Math.sin(angle) * 46} 
                y1={100 - Math.cos(angle) * 46} 
                x2={100 + Math.sin(angle) * 51} 
                y2={100 - Math.cos(angle) * 51} 
                stroke={i % 3 === 0 ? goldColor : "#D5CFC4"} 
                strokeWidth={i % 3 === 0 ? "2" : "1"} 
              />
            );
          })}
          <line x1="100" y1="100" x2={100 + Math.sin((rotationOffset + 80) * Math.PI / 180) * 26} y2={100 - Math.cos((rotationOffset + 80) * Math.PI / 180) * 26} stroke="#1A1A1A" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="100" y1="100" x2={100 + Math.sin((rotationOffset * 2.5 + 210) * Math.PI / 180) * 38} y2={100 - Math.cos((rotationOffset * 2.5 + 210) * Math.PI / 180) * 38} stroke={goldColor} strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="100" cy="100" r="4.5" fill={goldColor} stroke="white" strokeWidth="1" />
        </svg>
      );
    case "Designer Clothing":
      return (
        <svg viewBox="0 0 200 200" className="w-full h-full max-h-[220px]" id={`art_couture_${id}`}>
          <rect width="200" height="200" fill="#FAF8F5" rx="8" />
          <path d="M 50 115 L 100 80 L 150 115" fill="none" stroke={goldColor} strokeWidth="2" strokeLinecap="round" />
          <path d="M 100 80 Q 100 68, 108 68 Q 115 68, 115 76" fill="none" stroke={goldColor} strokeWidth="2" strokeLinecap="round" />
          <path d="M 65 110 Q 75 125, 68 175 M 82 100 Q 90 120, 85 178 M 100 95 L 100 180 M 118 100 Q 110 120, 115 178 M 135 110 Q 125 125, 132 175" fill="none" stroke="#D5CFC4" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case "Premium Leather Goods":
      return (
        <svg viewBox="0 0 200 200" className="w-full h-full max-h-[220px]" id={`art_leather_${id}`}>
          <rect width="200" height="200" fill="#FAF8F5" rx="8" />
          <path d="M 60 145 L 70 95 L 130 95 L 140 145 Z" fill="white" stroke="#D5CFC4" strokeWidth="2" />
          <path d="M 64 141 L 73 99 L 127 99 L 136 141" fill="none" stroke={goldColor} strokeWidth="1.5" strokeDasharray="3,3" />
          <rect x="94" y="108" width="12" height="12" rx="1.5" fill={goldColor} />
          <circle cx="100" cy="114" r="2.5" fill="white" />
          <path d="M 82 95 C 82 72, 118 72, 118 95" fill="none" stroke={goldColor} strokeWidth="3.5" strokeLinecap="round" />
        </svg>
      );
    case "Luxury Perfumes":
      return (
        <svg viewBox="0 0 200 200" className="w-full h-full max-h-[220px]" id={`art_perfume_${id}`}>
          <rect width="200" height="200" fill="#FAF8F5" rx="8" />
          <polygon points="75,160 125,160 135,110 125,75 75,75 65,110" fill="white" stroke="#D5CFC4" strokeWidth="2" />
          <rect x="85" y="102" width="30" height="20" fill="#FAF8F5" stroke={goldColor} strokeWidth="1" />
          <text x="100" y="114" fontSize="5" fontFamily="monospace" fill={goldColor} textAnchor="middle" fontWeight="bold">ESSENCE</text>
          <rect x="86" y="52" width="28" height="13" rx="1.5" fill="white" stroke={goldColor} strokeWidth="1.5" />
          <line x1="100" y1="65" x2="100" y2="75" stroke={goldColor} strokeWidth="2.5" />
        </svg>
      );
    default:
      return (
        <div className="w-full h-full max-h-[220px] bg-[#FAF8F5] flex items-center justify-center text-[#B38C44] font-mono text-xs">
          <span>{name.substring(0, 3).toUpperCase()}</span>
        </div>
      );
  }
};

// --- Mock User Profile with Order History ---
interface MockUser {
  title: string;
  lastName: string;
  email: string;
  vipTier: "Premium Elite" | "Centurion Gold" | "Private Client";
  accountNo: string;
  savedAddress: {
    fullName: string;
    street: string;
    city: string;
    country: string;
    postalCode: string;
    phone: string;
  };
  orders: Array<{
    id: string;
    date: string;
    items: string;
    total: number;
    status: string;
  }>;
}

const INITIAL_MOCK_USER: MockUser = {
  title: "Mr.",
  lastName: "Sharma",
  email: "sharma.aravind@gmail.com",
  vipTier: "Centurion Gold",
  accountNo: "AG-INR-88294",
  savedAddress: {
    fullName: "Aravind Sharma",
    street: "Flat 402, Royal Residency, Indiranagar",
    city: "Bangalore",
    country: "India",
    postalCode: "560038",
    phone: "+91 98765 43210"
  },
  orders: [
    {
      id: "ORD-984210",
      date: "2026-04-12",
      items: "Zenith Carbon Chronograph Watch (1)",
      total: 345000,
      status: "Dispatched from Mumbai Hub"
    },
    {
      id: "ORD-928174",
      date: "2026-02-18",
      items: "Golden Sandalwood Luxury Perfume (2)",
      total: 23000,
      status: "Delivered"
    }
  ]
};

export default function App() {
  // --- Persistent & Core States ---
  const [cart, setCart] = useState<Array<{ product: Product; quantity: number }>>(() => {
    const saved = localStorage.getItem('aether_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [wishlist, setWishlist] = useState<Product[]>(() => {
    const saved = localStorage.getItem('aether_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  const [compareList, setCompareList] = useState<Product[]>(() => {
    const saved = localStorage.getItem('aether_compare');
    return saved ? JSON.parse(saved) : [];
  });

  // User Auth Simulator State
  const [user, setUser] = useState<MockUser | null>(() => {
    const saved = localStorage.getItem('aether_user');
    return saved ? JSON.parse(saved) : null;
  });

  // Catalog State
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedCollection, setSelectedCollection] = useState<string>("");
  const [priceRange, setPriceRange] = useState<number>(2000000); // 20 Lakhs max slider for INR
  const [sortBy, setSortBy] = useState<"relevance" | "price_asc" | "price_desc" | "rating">("relevance");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Custom added reviews persisted in state
  const [customReviews, setCustomReviews] = useState<{ [productId: string]: Review[] }>({});

  // Active overlays / dialogs
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedDetailTab, setSelectedDetailTab] = useState<"details" | "specs" | "reviews">("details");
  const [showCart, setShowCart] = useState(false);
  const [showWishlist, setShowWishlist] = useState(false);
  const [showCompare, setShowCompare] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);

  // Auth Inputs
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authError, setAuthError] = useState("");

  // Review Form Inputs
  const [newReviewAuthor, setNewReviewAuthor] = useState("");
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewComment, setNewReviewComment] = useState("");
  const [reviewSuccessMsg, setReviewSuccessMsg] = useState("");

  // Checkout Form State
  const [checkoutStep, setCheckoutStep] = useState(1);
  const [checkoutForm, setCheckoutForm] = useState({
    fullName: "",
    email: "",
    street: "",
    city: "",
    country: "",
    postalCode: "",
    phone: "",
    cardholder: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    consent: false
  });
  const [checkoutErrors, setCheckoutErrors] = useState<{ [key: string]: string }>({});
  const [confirmedOrder, setConfirmedOrder] = useState<{ id: string; deliveryDate: string } | null>(null);

  // Search autocomplete Ref
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // --- Effects for Synced Local Storage ---
  useEffect(() => {
    localStorage.setItem('aether_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('aether_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('aether_compare', JSON.stringify(compareList));
  }, [compareList]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('aether_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('aether_user');
    }
  }, [user]);

  // Click outside suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Update autocomplete suggestions
  useEffect(() => {
    if (search.trim().length > 1) {
      setSuggestions(getSearchSuggestions(search));
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [search]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, selectedCategory, selectedCollection, priceRange, sortBy]);

  // --- Catalog Query Calculations ---
  const queryResult = useMemo(() => {
    return queryIndexedProducts({
      search: search.trim() || undefined,
      category: selectedCategory || undefined,
      collection: selectedCollection || undefined,
      minPrice: 0,
      maxPrice: priceRange,
      sortBy,
      page: currentPage,
      limit: itemsPerPage
    });
  }, [search, selectedCategory, selectedCollection, priceRange, sortBy, currentPage]);

  const categoriesList = [
    "Luxury Watches",
    "Designer Clothing",
    "Premium Leather Goods",
    "Luxury Perfumes",
    "Fine Home Decor",
    "Exquisite Jewelry"
  ];

  const collectionsList = [
    "Heritage Classic",
    "Modern Minimalist",
    "Elegant Pearl",
    "Gold Edition",
    "Royal Series"
  ];

  // --- Cart Calculations ---
  const cartSubtotal = useMemo(() => {
    return cart.reduce((acc, curr) => acc + (curr.product.price * curr.quantity), 0);
  }, [cart]);

  // Complimentary delivery above ₹1,00,000, else ₹1,500
  const deliveryFee = cartSubtotal > 100000 ? 0 : 1500;
  // Custom Luxury Surcharge Tax: 8%
  const luxuryTax = Math.round(cartSubtotal * 0.08);
  const cartTotal = cartSubtotal + deliveryFee + luxuryTax;

  // --- Handlers ---
  const handleAddToCart = (product: Product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: Math.min(10, item.quantity + quantity) }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    setShowCart(true);
  };

  const handleUpdateCartQty = (productId: string, delta: number) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.product.id === productId) {
          const newQty = item.quantity + delta;
          if (newQty < 1) return null;
          if (newQty > 10) return item;
          return { ...item, quantity: newQty };
        }
        return item;
      }).filter((item): item is { product: Product; quantity: number } => item !== null);
    });
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const handleToggleWishlist = (product: Product) => {
    setWishlist(prev => {
      const exists = prev.some(item => item.id === product.id);
      if (exists) {
        return prev.filter(item => item.id !== product.id);
      } else {
        return [...prev, product];
      }
    });
  };

  const handleToggleCompare = (product: Product) => {
    setCompareList(prev => {
      const exists = prev.some(item => item.id === product.id);
      if (exists) {
        return prev.filter(item => item.id !== product.id);
      } else {
        if (prev.length >= 3) {
          alert("We only support comparing up to 3 items at the same time.");
          return prev;
        }
        return [...prev, product];
      }
    });
    setShowCompare(true);
  };

  const handleMockLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (authEmail.includes("@") && authPassword.length >= 4) {
      const customizedUser: MockUser = {
        ...INITIAL_MOCK_USER,
        email: authEmail,
        lastName: authEmail.split('@')[0].toUpperCase()
      };
      setUser(customizedUser);
      setAuthError("");
      setShowAuth(false);
    } else {
      setAuthError("Log In Failed. Check your email or password.");
    }
  };

  const handleMockLogout = () => {
    setUser(null);
  };

  const handleAutofillAddress = () => {
    if (user) {
      setCheckoutForm(prev => ({
        ...prev,
        fullName: user.savedAddress.fullName,
        email: user.email,
        street: user.savedAddress.street,
        city: user.savedAddress.city,
        country: user.savedAddress.country,
        postalCode: user.savedAddress.postalCode,
        phone: user.savedAddress.phone
      }));
    }
  };

  const validateAddressStep = () => {
    const errors: { [key: string]: string } = {};
    if (!checkoutForm.fullName.trim()) errors.fullName = "Full name is required.";
    if (!checkoutForm.email.includes("@")) errors.email = "Provide a valid email address.";
    if (!checkoutForm.street.trim()) errors.street = "Shipping address is required.";
    if (!checkoutForm.city.trim()) errors.city = "City is required.";
    if (!checkoutForm.country.trim()) errors.country = "State/Country is required.";
    if (!checkoutForm.postalCode.trim()) errors.postalCode = "PIN / Postal code is required.";
    if (!checkoutForm.phone.trim()) errors.phone = "Phone number is required.";

    setCheckoutErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validatePaymentStep = () => {
    const errors: { [key: string]: string } = {};
    if (!checkoutForm.cardholder.trim()) errors.cardholder = "Cardholder name is required.";
    if (!/^\d{16}$/.test(checkoutForm.cardNumber.replace(/\s+/g, ''))) {
      errors.cardNumber = "Valid 16-digit card number is required.";
    }
    if (!/^\d{2}\/\d{2}$/.test(checkoutForm.expiry)) {
      errors.expiry = "Expiration date must be in MM/YY format.";
    }
    if (!/^\d{3,4}$/.test(checkoutForm.cvv)) {
      errors.cvv = "Security CVV code is invalid.";
    }
    if (!checkoutForm.consent) {
      errors.consent = "You must agree to the Terms of Service.";
    }

    setCheckoutErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCheckoutSubmit = () => {
    if (checkoutStep === 1) {
      if (validateAddressStep()) {
        setCheckoutStep(2);
      }
    } else if (checkoutStep === 2) {
      if (validatePaymentStep()) {
        const orderId = `IN-ORD-${Math.floor(100000 + Math.random() * 900000)}`;
        const dateObj = new Date();
        dateObj.setDate(dateObj.getDate() + 3);
        const deliveryDate = dateObj.toLocaleDateString('en-IN', {
          weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
        });

        if (user) {
          const newOrder = {
            id: orderId,
            date: new Date().toISOString().split('T')[0],
            items: cart.map(i => `${i.product.name} (${i.quantity})`).join(', '),
            total: cartTotal,
            status: "Packed & Ready to Ship"
          };
          setUser({
            ...user,
            orders: [newOrder, ...user.orders]
          });
        }

        setConfirmedOrder({ id: orderId, deliveryDate });
        setCheckoutStep(3);
        setCart([]);
      }
    }
  };

  const handleAddReview = (e: React.FormEvent, productId: string) => {
    e.preventDefault();
    if (!newReviewAuthor.trim() || !newReviewComment.trim()) {
      alert("Please enter both your name and review text.");
      return;
    }

    const brandNewReview: Review = {
      id: `custom_${productId}_${Date.now()}`,
      author: newReviewAuthor,
      rating: newReviewRating,
      date: new Date().toISOString().split('T')[0],
      comment: newReviewComment,
      verified: true
    };

    setCustomReviews(prev => {
      const existing = prev[productId] || getProductReviews(productId);
      return {
        ...prev,
        [productId]: [brandNewReview, ...existing]
      };
    });

    setReviewSuccessMsg("Thank you! Your feedback has been posted successfully.");
    setNewReviewAuthor("");
    setNewReviewComment("");
    
    setTimeout(() => {
      setReviewSuccessMsg("");
    }, 4000);
  };

  const getMergedReviews = (productId: string) => {
    const custom = customReviews[productId];
    if (custom) return custom;
    return getProductReviews(productId);
  };

  const handleResetFilters = () => {
    setSelectedCategory("");
    setSelectedCollection("");
    setPriceRange(2000000);
    setSearch("");
  };

  return (
    <div className="min-h-screen bg-[#FDFCF9] text-[#1A1A1A] flex flex-col selection:bg-[#B38C44] selection:text-white relative overflow-x-hidden">
      
      {/* Background Decorative Ambient Radial Glow */}
      <div className="absolute top-[-300px] left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(179,140,68,0.06),transparent_65%)] pointer-events-none animate-glow z-0" />
      
      {/* TOP NOTIFICATION HEADER BANNER */}
      <div className="bg-[#1C1A17] text-center py-2 px-4 border-b border-[#B38C44]/20 text-[10px] sm:text-xs tracking-[0.2em] text-white uppercase z-50 flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-[#B38C44] animate-pulse" />
        <span className="font-semibold text-[#F1EBE0]">Complimentary Secured Delivery On All Orders Over ₹1,00,000</span>
        <Sparkles className="w-3.5 h-3.5 text-[#B38C44] animate-pulse" />
      </div>

      {/* --- LUXURY MAIN NAVIGATION --- */}
      <header className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-[#EBE6DD] h-20 px-4 sm:px-8 flex items-center justify-between z-40">
        
        {/* Brand Logo Header */}
        <div className="flex flex-col items-start cursor-pointer" onClick={() => handleResetFilters()}>
          <h1 className="font-serif text-lg sm:text-2xl tracking-[0.25em] text-[#1A1A1A] hover:text-[#B38C44] font-bold transition-colors duration-300">
            AETHER & GOLD
          </h1>
          <span className="text-[8px] tracking-[0.3em] text-[#B38C44] uppercase font-mono font-semibold mt-0.5">
            Luxury Boutique
          </span>
        </div>

        {/* --- DYNAMIC SEARCH CONTAINER --- */}
        <div className="hidden md:block relative w-[320px] lg:w-[450px]" ref={suggestionsRef}>
          <div className="relative">
            <input
              type="text"
              placeholder="Search our catalog of luxury items..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onFocus={() => { if (search.trim()) setShowSuggestions(true); }}
              className="w-full bg-[#FAF8F5] border border-[#D5CFC4] rounded-md py-2.5 pl-10 pr-4 text-xs font-sans tracking-wide text-[#1A1A1A] placeholder-[#9E9584] focus:outline-none focus:border-[#B38C44] focus:ring-1 focus:ring-[#B38C44] transition-all"
            />
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-[#9E9584]" />
            {search && (
              <button onClick={() => setSearch("")} className="absolute right-3.5 top-3 text-[#9E9584] hover:text-[#1A1A1A] transition">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Autocomplete dropdown list */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-[#D5CFC4] shadow-xl rounded-md py-2 z-50 divide-y divide-[#F0EDE6]">
              <div className="px-3.5 py-1.5 text-[9px] uppercase tracking-widest text-[#B38C44] font-mono font-bold">Suggested Products</div>
              {suggestions.map((sug, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setSearch(sug);
                    setShowSuggestions(false);
                  }}
                  className="w-full text-left px-4 py-2.5 text-xs text-[#1A1A1A] hover:bg-[#FAF8F5] hover:text-[#B38C44] transition flex items-center gap-2.5 font-sans"
                >
                  <Compass className="w-3.5 h-3.5 text-[#9E9584]" />
                  <span>{sug}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Navigation Actions bar */}
        <div className="flex items-center gap-2 sm:gap-4">
          
          {/* User Vault Account Connection */}
          <button
            onClick={() => { if (user) { handleMockLogout(); } else { setShowAuth(true); } }}
            className="flex items-center gap-2 px-3 py-2 border border-[#D5CFC4] hover:border-[#B38C44] rounded-md text-[10px] tracking-widest uppercase font-mono text-[#555555] hover:text-[#B38C44] bg-white transition"
          >
            <User className="w-3.5 h-3.5 text-[#B38C44]" />
            <span className="hidden sm:inline">
              {user ? `${user.title} ${user.lastName}` : "My Account"}
            </span>
          </button>

          {/* Compare Ledger Indicator */}
          <button
            onClick={() => setShowCompare(true)}
            className="relative p-2.5 text-[#555555] hover:text-[#1A1A1A] hover:bg-[#FAF8F5] rounded-md transition"
            title="Compare Items"
          >
            <GitCompare className="w-[18px] h-[18px]" />
            {compareList.length > 0 && (
              <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-[#B38C44] text-white rounded-full text-[9px] font-mono font-bold flex items-center justify-center">
                {compareList.length}
              </span>
            )}
          </button>

          {/* Wishlist Heart Indicator */}
          <button
            onClick={() => setShowWishlist(true)}
            className="relative p-2.5 text-[#555555] hover:text-[#1A1A1A] hover:bg-[#FAF8F5] rounded-md transition"
            title="My Wishlist"
          >
            <Heart className="w-[18px] h-[18px]" />
            {wishlist.length > 0 && (
              <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-[#B38C44] text-white rounded-full text-[9px] font-mono font-bold flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Shopping Bag / Cart */}
          <button
            onClick={() => setShowCart(true)}
            className="relative p-2.5 text-[#555555] hover:text-[#1A1A1A] hover:bg-[#FAF8F5] rounded-md transition"
            title="Shopping Bag"
          >
            <ShoppingBag className="w-[18px] h-[18px]" />
            {cart.length > 0 && (
              <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-[#B38C44] text-white rounded-full text-[9px] font-mono font-bold flex items-center justify-center">
                {cart.reduce((s, c) => s + c.quantity, 0)}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Mobile Search input bar */}
      <div className="block md:hidden bg-[#F5F2EA] p-3 border-b border-[#EBE6DD] z-30">
        <div className="relative">
          <input
            type="text"
            placeholder="Search luxury products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white border border-[#D5CFC4] rounded-md py-2 pl-9 pr-4 text-xs font-sans text-[#1A1A1A] focus:outline-none focus:border-[#B38C44]"
          />
          <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-[#9E9584]" />
        </div>
      </div>

      {/* --- STATISTICS INFO ROW --- */}
      <div className="bg-[#FAF8F5] py-4 px-4 sm:px-8 border-b border-[#EBE6DD] text-[10px] sm:text-xs font-mono text-[#7A7265] tracking-[0.1em] flex flex-wrap justify-between items-center gap-4 z-10">
        <div className="flex items-center gap-1.5 text-[#B38C44] font-semibold">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>100% AUTHENTIC QUALITY ASSURED</span>
        </div>
        <div>
          CATALOG: <span className="text-[#1A1A1A] font-bold">1,245,892</span> GENUINE ITEMS
        </div>
        <div>
          SHIPPING HUB: <span className="text-[#1A1A1A] font-bold">SECURED EXPRESS DELIVERY</span>
        </div>
        <div>
          STATUS: <span className="text-emerald-600 font-bold">● SERVICES ONLINE</span>
        </div>
      </div>

      {/* --- MAIN GRID CONTAINER --- */}
      <main className="flex-1 flex flex-col lg:flex-row z-10">
        
        {/* --- SIDEBAR FILTERS SECTION --- */}
        <aside className="w-full lg:w-72 bg-[#F9F7F2] border-r border-[#EBE6DD] p-6 flex flex-col gap-8 z-20">
          
          {/* Header Title Filter */}
          <div className="flex items-center justify-between border-b border-[#EBE6DD] pb-4">
            <div className="flex items-center gap-2 font-serif text-sm tracking-wider text-[#1A1A1A] uppercase font-bold">
              <Sliders className="w-4 h-4 text-[#B38C44]" />
              <span>Filter Products</span>
            </div>
            {(selectedCategory || selectedCollection || priceRange < 2000000 || search) && (
              <button
                onClick={handleResetFilters}
                className="flex items-center gap-1 text-[10px] tracking-wider font-mono text-[#9E9584] hover:text-[#B38C44] transition"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset All</span>
              </button>
            )}
          </div>

          {/* Categories select list */}
          <div className="flex flex-col">
            <h3 className="text-[11px] tracking-[0.15em] font-mono text-[#B38C44] uppercase mb-3 font-bold flex items-center justify-between">
              <span>Categories</span>
              <span className="text-[#9E9584] font-sans text-[10px]">{categoriesList.length}</span>
            </h3>
            <div className="flex flex-col gap-1">
              <button
                onClick={() => setSelectedCategory("")}
                className={`text-left text-xs transition py-2 px-3 rounded-md ${!selectedCategory ? 'bg-[#B38C44]/10 text-[#B38C44] font-semibold border-l-2 border-[#B38C44]' : 'text-[#555555] hover:text-[#1A1A1A] hover:bg-[#FAF8F5]'}`}
              >
                All Categories
              </button>
              {categoriesList.map((cat, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-left text-xs transition py-2 px-3 rounded-md flex items-center justify-between ${selectedCategory === cat ? 'bg-[#B38C44]/10 text-[#B38C44] font-semibold border-l-2 border-[#B38C44]' : 'text-[#555555] hover:text-[#1A1A1A] hover:bg-[#FAF8F5]'}`}
                >
                  <span>{cat}</span>
                  <ChevronRight className={`w-3 h-3 opacity-40 transition-transform ${selectedCategory === cat ? 'translate-x-1 text-[#B38C44]' : ''}`} />
                </button>
              ))}
            </div>
          </div>

          {/* Collections select list */}
          <div className="flex flex-col">
            <h3 className="text-[11px] tracking-[0.15em] font-mono text-[#B38C44] uppercase mb-3 font-bold flex items-center justify-between">
              <span>Collections</span>
              <span className="text-[#9E9584] font-sans text-[10px]">{collectionsList.length}</span>
            </h3>
            <div className="flex flex-col gap-1">
              <button
                onClick={() => setSelectedCollection("")}
                className={`text-left text-xs transition py-2 px-3 rounded-md ${!selectedCollection ? 'bg-[#B38C44]/10 text-[#B38C44] font-semibold border-l-2 border-[#B38C44]' : 'text-[#555555] hover:text-[#1A1A1A] hover:bg-[#FAF8F5]'}`}
              >
                All Collections
              </button>
              {collectionsList.map((col, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedCollection(col)}
                  className={`text-left text-xs transition py-2 px-3 rounded-md flex items-center justify-between ${selectedCollection === col ? 'bg-[#B38C44]/10 text-[#B38C44] font-semibold border-l-2 border-[#B38C44]' : 'text-[#555555] hover:text-[#1A1A1A] hover:bg-[#FAF8F5]'}`}
                >
                  <span>{col}</span>
                  <ChevronRight className={`w-3 h-3 opacity-40 transition-transform ${selectedCollection === col ? 'translate-x-1 text-[#B38C44]' : ''}`} />
                </button>
              ))}
            </div>
          </div>

          {/* Pricing Range Slider */}
          <div className="flex flex-col">
            <h3 className="text-[11px] tracking-[0.15em] font-mono text-[#B38C44] uppercase mb-3 font-bold flex justify-between">
              <span>Maximum Price</span>
              <span className="text-[#1A1A1A] font-serif font-bold">₹{priceRange.toLocaleString('en-IN')}</span>
            </h3>
            <input
              type="range"
              min="1000"
              max="2000000"
              step="5000"
              value={priceRange}
              onChange={(e) => setPriceRange(parseInt(e.target.value))}
              className="w-full accent-[#B38C44] h-1.5 bg-[#EBE6DD] rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-[#9E9584] mt-2 font-mono">
              <span>₹1,000</span>
              <span>₹20,00,000</span>
            </div>
          </div>

          {/* VIP Services Info Badge */}
          <div className="mt-auto bg-white border border-[#EBE6DD] p-5 rounded-md flex flex-col gap-3 card-shadow">
            <div className="text-[10px] tracking-[0.15em] font-mono text-[#B38C44] uppercase flex items-center gap-1.5 font-bold">
              <Briefcase className="w-3.5 h-3.5" />
              <span>Customer Help Desk</span>
            </div>
            <p className="text-[11px] text-[#6E685E] leading-relaxed font-sans">
              Contact our team for personalized help finding rare items or processing special custom orders.
            </p>
            <a href="mailto:support@aetherandgold.com" className="text-[10px] uppercase font-mono tracking-widest text-[#1A1A1A] hover:text-[#B38C44] transition-all flex items-center gap-1 font-semibold">
              <span>Contact Support</span>
              <ArrowRight className="w-3 h-3" />
            </a>
          </div>

        </aside>

        {/* --- MAIN PRODUCT CATALOG AREA --- */}
        <section className="flex-1 p-4 sm:p-8 flex flex-col min-w-0">
          
          {/* Header catalog section */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#EBE6DD] pb-6 mb-8">
            <div>
              <div className="text-[10px] tracking-[0.2em] font-mono text-[#9E9584] uppercase mb-1 font-semibold">
                {selectedCollection || "All Collections"} • {selectedCategory || "All Categories"}
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#1A1A1A] font-bold tracking-wide">
                {selectedCategory ? `${selectedCategory}` : "Premium Catalog"}
              </h2>
            </div>

            {/* Sorting, Results display count */}
            <div className="flex items-center gap-4 text-xs">
              <span className="text-[#7A7265] font-mono text-[11px]">
                Showing {queryResult.items.length} of {queryResult.totalCount.toLocaleString('en-IN')} premium items
              </span>
              <div className="flex items-center gap-2">
                <span className="text-[#9E9584] hidden sm:inline">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-white border border-[#D5CFC4] rounded-md text-xs text-[#1A1A1A] py-1.5 px-3 focus:outline-none focus:border-[#B38C44] cursor-pointer"
                >
                  <option value="relevance">Relevance & Best Sellers</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                  <option value="rating">Rating: Highest Rated</option>
                </select>
              </div>
            </div>
          </div>

          {/* IF NO RESULTS MATCH FILTERS */}
          {queryResult.items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center py-24 px-4 bg-[#FAF8F5] border border-[#EBE6DD] border-dashed rounded-md">
              <HelpCircle className="w-12 h-12 text-[#9E9584]/60 mb-4" />
              <h3 className="font-serif text-lg text-[#1A1A1A] font-bold mb-2">No Matching Products Found</h3>
              <p className="text-xs text-[#7A7265] max-w-sm mb-6 leading-relaxed">
                There are no products matching your exact filters. Try adjusting your categories, maximum price, or search tags.
              </p>
              <button
                onClick={handleResetFilters}
                className="px-6 py-2.5 bg-[#B38C44] hover:bg-[#9E7832] text-white text-xs font-mono font-bold uppercase tracking-widest rounded-md transition"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <>
              {/* PRODUCT GRID DISPLAY */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {queryResult.items.map((product) => {
                  const isInWishlist = wishlist.some(item => item.id === product.id);
                  const isInCompare = compareList.some(item => item.id === product.id);

                  return (
                    <div
                      key={product.id}
                      className="group bg-white border border-[#EBE6DD] hover:border-[#B38C44]/40 hover:shadow-xl transition-all duration-300 flex flex-col relative rounded-md overflow-hidden card-shadow"
                      id={`card_${product.id}`}
                    >
                      {/* Product Badge */}
                      {product.badge && (
                        <div className="absolute top-4 left-4 z-10 bg-[#B38C44] text-white text-[9px] tracking-[0.15em] font-mono font-bold px-2 py-1 rounded">
                          {product.badge}
                        </div>
                      )}

                      {/* Top Action Hover Icons Overlay */}
                      <div className="absolute top-4 right-4 z-10 flex flex-col gap-2 translate-y-[-10px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                        <button
                          onClick={() => handleToggleWishlist(product)}
                          className={`p-2 rounded-full border ${isInWishlist ? 'bg-[#B38C44] border-[#B38C44] text-white' : 'bg-white/90 border-[#D5CFC4] text-[#1A1A1A] hover:border-[#B38C44]'} transition-colors shadow`}
                          title={isInWishlist ? "Saved in wishlist" : "Save to wishlist"}
                        >
                          <Heart className="w-3.5 h-3.5" fill={isInWishlist ? "currentColor" : "none"} />
                        </button>
                        <button
                          onClick={() => handleToggleCompare(product)}
                          className={`p-2 rounded-full border ${isInCompare ? 'bg-[#B38C44] border-[#B38C44] text-white' : 'bg-white/90 border-[#D5CFC4] text-[#1A1A1A] hover:border-[#B38C44]'} transition-colors shadow`}
                          title={isInCompare ? "Added in compare list" : "Add to compare"}
                        >
                          <GitCompare className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* IMMERSIVE PRODUCT IMAGE PLATFORM */}
                      <div
                        onClick={() => { setSelectedProduct(product); setSelectedDetailTab("details"); }}
                        className="p-4 bg-[#FAF8F5] aspect-square flex items-center justify-center cursor-pointer relative overflow-hidden border-b border-[#F0EDE6]"
                      >
                        <div className="w-full h-full flex items-center justify-center overflow-hidden bg-white rounded-md">
                          {product.images && product.images[0] && product.images[0].startsWith('http') ? (
                            <img
                              src={product.images[0]}
                              alt={product.name}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                          ) : (
                            <LuxuryProductArt id={product.id} category={product.category} name={product.name} />
                          )}
                        </div>
                        {/* Interactive overlay details preview */}
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <span className="bg-white text-[#1A1A1A] border border-[#B38C44] text-[10px] tracking-widest font-mono uppercase px-4 py-2 rounded shadow-md flex items-center gap-2">
                            <Eye className="w-3.5 h-3.5 text-[#B38C44]" />
                            <span>Quick View</span>
                          </span>
                        </div>
                      </div>

                      {/* CARD BRIEF DESCRIPTION CONTENT */}
                      <div className="p-5 flex-1 flex flex-col justify-between">
                        <div>
                          {/* Rating and review simple count */}
                          <div className="flex items-center gap-2 mb-1.5 text-xs text-[#7A7265]">
                            <span className="font-mono text-[10px] font-semibold text-[#B38C44]">{product.category}</span>
                            <span>•</span>
                            <div className="flex items-center text-[#B38C44]">
                              <Star className="w-3.5 h-3.5 fill-current mr-0.5" />
                              <span className="font-semibold text-[#1A1A1A]">{product.rating}</span>
                            </div>
                            <span className="text-[10px]">({product.reviewsCount} reviews)</span>
                          </div>

                          <h3
                            onClick={() => { setSelectedProduct(product); setSelectedDetailTab("details"); }}
                            className="font-serif text-base text-[#1A1A1A] hover:text-[#B38C44] cursor-pointer transition-colors line-clamp-1 mb-2 font-bold tracking-wide"
                          >
                            {product.name}
                          </h3>
                          <p className="text-xs text-[#555555] line-clamp-2 leading-relaxed">
                            {product.description}
                          </p>
                        </div>

                        {/* Price and Add item to Cart controls */}
                        <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#F0EDE6]">
                          <div className="flex flex-col">
                            <span className="text-[9px] uppercase tracking-wider text-[#9E9584] font-mono">Price</span>
                            <span className="font-serif text-[#B38C44] text-base font-bold">
                              ₹{product.price.toLocaleString('en-IN')}
                            </span>
                          </div>
                          
                          <button
                            onClick={() => handleAddToCart(product)}
                            className="text-[10px] tracking-widest uppercase font-mono border-b-2 border-[#B38C44] pb-0.5 text-[#B38C44] hover:text-[#1A1A1A] hover:border-[#1A1A1A] transition-all duration-300 font-bold"
                          >
                            Add to Bag
                          </button>
                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>

              {/* PAGINATION LAYOUT FRAME */}
              <div className="mt-12 flex justify-between items-center border-t border-[#EBE6DD] pt-6 font-mono text-xs text-[#7A7265]">
                <span>
                  Page <span className="text-[#B38C44] font-bold">{queryResult.page}</span> of {queryResult.totalPages}
                </span>
                
                <div className="flex items-center gap-2">
                  <button
                    disabled={queryResult.page <= 1}
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    className="px-4 py-2 bg-white rounded-md border border-[#D5CFC4] hover:border-[#B38C44] hover:text-[#B38C44] disabled:opacity-30 disabled:hover:border-[#D5CFC4] disabled:hover:text-[#7A7265] transition cursor-pointer font-bold"
                  >
                    Previous
                  </button>
                  <button
                    disabled={queryResult.page >= queryResult.totalPages}
                    onClick={() => setCurrentPage(p => Math.min(queryResult.totalPages, p + 1))}
                    className="px-4 py-2 bg-white rounded-md border border-[#D5CFC4] hover:border-[#B38C44] hover:text-[#B38C44] disabled:opacity-30 disabled:hover:border-[#D5CFC4] disabled:hover:text-[#7A7265] transition cursor-pointer font-bold"
                  >
                    Next
                  </button>
                </div>
              </div>
            </>
          )}

        </section>

      </main>

      {/* --- FOOTER --- */}
      <footer className="bg-[#12110E] border-t border-[#1C1A17] mt-auto py-12 px-6 sm:px-12 z-10 text-xs text-[#A1998C]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          
          <div className="flex flex-col gap-4">
            <h4 className="font-serif text-[#B38C44] tracking-widest text-sm uppercase font-bold">AETHER & GOLD</h4>
            <p className="text-[11px] leading-relaxed text-[#7D7569]">
              The premier digital boutique representing the highest standards of luxury, style, and bespoke collections.
            </p>
          </div>

          <div>
            <h4 className="font-mono text-[10px] tracking-[0.2em] uppercase text-white mb-4 font-bold">SUPPORT & HELP</h4>
            <ul className="flex flex-col gap-2 font-mono text-[10px] tracking-wider text-[#7D7569]">
              <li><a href="#rules" className="hover:text-[#B38C44] transition">Secure Deliveries</a></li>
              <li><a href="#rules" className="hover:text-[#B38C44] transition">Returns & Exchanges</a></li>
              <li><a href="#rules" className="hover:text-[#B38C44] transition">Product Authenticity</a></li>
              <li><a href="#rules" className="hover:text-[#B38C44] transition">Terms & Privacy Code</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-[10px] tracking-[0.2em] uppercase text-white mb-4 font-bold">ACCOUNTS</h4>
            <ul className="flex flex-col gap-2 font-mono text-[10px] tracking-wider text-[#7D7569]">
              <li><a href="#rules" onClick={() => { setShowAuth(true); }} className="hover:text-[#B38C44] transition">My Premium Account</a></li>
              <li><a href="#rules" className="hover:text-[#B38C44] transition">Order Authenticity Tracking</a></li>
              <li><a href="#rules" className="hover:text-[#B38C44] transition">VIP Custom Fitting</a></li>
              <li><a href="#rules" className="hover:text-[#B38C44] transition">Premium Insurance Cover</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-[10px] tracking-[0.2em] uppercase text-white mb-4 font-bold">NEWSLETTER</h4>
            <p className="text-[11px] leading-relaxed text-[#7D7569] mb-3">
              Receive notifications for rare new releases and private boutique events.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="you@domain.com"
                className="bg-[#1C1A17] border border-[#2D2A24] rounded-l py-1.5 px-3 text-xs w-full text-white placeholder-[#7D7569] focus:outline-none focus:border-[#B38C44]"
              />
              <button className="bg-[#B38C44] text-white px-3.5 hover:bg-white hover:text-black transition rounded-r">
                <Check className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

        <div className="border-t border-[#2D2A24] pt-6 text-center text-[10px] font-mono tracking-widest text-[#7D7569]">
          © 2026 AETHER & GOLD INC. SECURED PLATFORM. ALL RIGHTS RESERVED.
        </div>
      </footer>

      {/* ==============================================
          OVERLAY PANEL: PRODUCT DETAIL MODAL
          ============================================== */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-[#D5CFC4] w-full max-w-4xl rounded-md shadow-2xl relative flex flex-col md:flex-row my-8 overflow-hidden animate-in fade-in zoom-in duration-300 text-[#1A1A1A]">
            
            {/* Close Modal Button */}
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 z-20 p-2 text-[#7A7265] hover:text-[#1A1A1A] transition"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left Column: Image & Gallery */}
            <div className="w-full md:w-1/2 p-8 bg-[#FAF8F5] flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-[#EBE6DD]">
              <div className="w-full max-w-[280px] aspect-square flex items-center justify-center bg-white rounded-md p-4 shadow-sm overflow-hidden">
                {selectedProduct.images && selectedProduct.images[0] && selectedProduct.images[0].startsWith('http') ? (
                  <img
                    src={selectedProduct.images[0]}
                    alt={selectedProduct.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover rounded-md"
                  />
                ) : (
                  <LuxuryProductArt id={selectedProduct.id} category={selectedProduct.category} name={selectedProduct.name} />
                )}
              </div>

              {/* Thumbnail Gallery */}
              <div className="flex items-center gap-3 mt-8">
                {selectedProduct.images.map((img, i) => (
                  <div
                    key={i}
                    className="w-14 h-14 bg-white border border-[#D5CFC4] rounded p-1 flex items-center justify-center text-[8px] font-mono text-[#555555] hover:border-[#B38C44] cursor-pointer shadow-sm"
                    title={`View ${i+1}`}
                  >
                    {img.startsWith('http') ? (
                      <img src={img} alt="" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                    ) : (
                      <span>VIEW {i+1}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Details Tabs */}
            <div className="w-full md:w-1/2 p-8 flex flex-col justify-between max-h-[600px] overflow-y-auto">
              <div>
                
                <div className="text-[10px] tracking-[0.2em] font-mono text-[#B38C44] uppercase mb-1 font-bold">
                  {selectedProduct.collection}
                </div>

                <h3 className="font-serif text-xl sm:text-2xl text-[#1A1A1A] font-bold mb-2">
                  {selectedProduct.name}
                </h3>

                {/* Rating line */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex items-center text-[#B38C44] text-sm">
                    <Star className="w-4 h-4 fill-current mr-1" />
                    <span className="font-bold text-[#1A1A1A]">{selectedProduct.rating}</span>
                  </div>
                  <span className="text-[#D5CFC4]">|</span>
                  <span className="text-xs text-[#7A7265] font-mono">
                    {getMergedReviews(selectedProduct.id).length} Verified Customer Reviews
                  </span>
                </div>

                {/* TAB TRIGGERS */}
                <div className="flex border-b border-[#EBE6DD] mb-6 font-mono text-[11px] tracking-wider uppercase">
                  <button
                    onClick={() => setSelectedDetailTab("details")}
                    className={`pb-3.5 pr-4 relative font-bold ${selectedDetailTab === "details" ? 'text-[#B38C44]' : 'text-[#9E9584] hover:text-[#1A1A1A]'}`}
                  >
                    Product Details
                    {selectedDetailTab === "details" && <span className="absolute bottom-[-1px] left-0 right-4 h-[2px] bg-[#B38C44]" />}
                  </button>
                  <button
                    onClick={() => setSelectedDetailTab("specs")}
                    className={`pb-3.5 px-4 relative font-bold ${selectedDetailTab === "specs" ? 'text-[#B38C44]' : 'text-[#9E9584] hover:text-[#1A1A1A]'}`}
                  >
                    Specifications
                    {selectedDetailTab === "specs" && <span className="absolute bottom-[-1px] left-4 right-4 h-[2px] bg-[#B38C44]" />}
                  </button>
                  <button
                    onClick={() => setSelectedDetailTab("reviews")}
                    className={`pb-3.5 pl-4 relative font-bold ${selectedDetailTab === "reviews" ? 'text-[#B38C44]' : 'text-[#9E9584] hover:text-[#1A1A1A]'}`}
                  >
                    Reviews ({getMergedReviews(selectedProduct.id).length})
                    {selectedDetailTab === "reviews" && <span className="absolute bottom-[-1px] left-4 right-0 h-[2px] bg-[#B38C44]" />}
                  </button>
                </div>

                {/* TAB 1: STORY/DESCRIPTION */}
                {selectedDetailTab === "details" && (
                  <div className="text-xs text-[#555555] leading-relaxed font-sans flex flex-col gap-4">
                    <p>{selectedProduct.description}</p>
                    <p>
                      Every purchase from our boutique is fully verified for authenticity and crafted using top tier premium materials.
                    </p>
                    <div className="bg-[#FAF8F5] p-4 border border-[#EBE6DD] rounded flex gap-3.5 items-center">
                      <Lock className="w-5 h-5 text-[#B38C44]" />
                      <div>
                        <div className="text-[10px] font-mono uppercase tracking-wider text-[#1A1A1A] font-bold">Insured Secured Shipping</div>
                        <div className="text-[9px] text-[#7D7569]">Guaranteed secure packaging and insured express delivery to your doorstep.</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 2: SPECS LISTING */}
                {selectedDetailTab === "specs" && (
                  <div className="flex flex-col gap-2 font-sans text-xs">
                    {Object.entries(selectedProduct.specs).map(([key, val], i) => (
                      <div key={i} className="flex justify-between py-2 border-b border-[#F0EDE6]">
                        <span className="text-[#7A7265] font-mono uppercase text-[10px] tracking-wide font-semibold">{key}</span>
                        <span className="text-[#1A1A1A] text-right font-medium">{val}</span>
                      </div>
                    ))}
                    <div className="flex justify-between py-2 border-b border-[#F0EDE6]">
                      <span className="text-[#7A7265] font-mono uppercase text-[10px] tracking-wide font-semibold">Boutique ID</span>
                      <span className="text-[#B38C44] font-mono font-bold">SECURE_ID_{selectedProduct.id.toUpperCase()}</span>
                    </div>
                  </div>
                )}

                {/* TAB 3: READ REVIEWS */}
                {selectedDetailTab === "reviews" && (
                  <div className="flex flex-col gap-6 max-h-[300px] overflow-y-auto pr-2">
                    
                    {/* Add Review Form */}
                    <form onSubmit={(e) => handleAddReview(e, selectedProduct.id)} className="bg-[#FAF8F5] border border-[#EBE6DD] rounded p-4 flex flex-col gap-3">
                      <h4 className="font-serif text-[11px] tracking-wider uppercase text-[#B38C44] font-bold">Write a review</h4>
                      
                      <div className="grid grid-cols-2 gap-3.5">
                        <input
                          type="text"
                          placeholder="Your Name (e.g. Lady Elena)"
                          required
                          value={newReviewAuthor}
                          onChange={(e) => setNewReviewAuthor(e.target.value)}
                          className="bg-white border border-[#D5CFC4] text-xs py-1.5 px-3 rounded text-[#1A1A1A] focus:outline-none focus:border-[#B38C44]"
                        />
                        <div className="flex items-center gap-1 bg-white border border-[#D5CFC4] rounded px-3 py-1.5 justify-between">
                          <span className="text-[10px] font-mono text-[#7D7569] uppercase font-bold">Rating:</span>
                          <select
                            value={newReviewRating}
                            onChange={(e) => setNewReviewRating(parseInt(e.target.value))}
                            className="bg-transparent text-[#B38C44] font-bold text-xs focus:outline-none cursor-pointer"
                          >
                            <option value={5}>5 Stars (Excellent)</option>
                            <option value={4}>4 Stars (Very Good)</option>
                            <option value={3}>3 Stars (Good)</option>
                          </select>
                        </div>
                      </div>

                      <textarea
                        placeholder="Write your customer review regarding this product..."
                        required
                        rows={2}
                        value={newReviewComment}
                        onChange={(e) => setNewReviewComment(e.target.value)}
                        className="bg-white border border-[#D5CFC4] text-xs py-1.5 px-3 rounded text-[#1A1A1A] focus:outline-none focus:border-[#B38C44]"
                      />

                      <button
                        type="submit"
                        className="bg-[#B38C44] text-white hover:bg-[#9E7832] transition text-[10px] tracking-widest font-mono font-bold uppercase py-2 rounded-md"
                      >
                        Submit Review
                      </button>

                      {reviewSuccessMsg && (
                        <div className="text-[10px] font-mono text-emerald-600 font-bold">{reviewSuccessMsg}</div>
                      )}
                    </form>

                    {/* Listing of feedback comments */}
                    <div className="flex flex-col gap-4 mt-2">
                      {getMergedReviews(selectedProduct.id).map((rev) => (
                        <div key={rev.id} className="border-b border-[#F0EDE6] pb-4 last:border-b-0">
                          <div className="flex justify-between items-center mb-1.5 text-xs">
                            <span className="font-serif font-bold text-[#1A1A1A]">{rev.author}</span>
                            <span className="text-[#9E9584] font-mono text-[10px]">{rev.date}</span>
                          </div>
                          
                          <div className="flex items-center text-[#B38C44] gap-1.5 mb-2">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className={`w-2.5 h-2.5 fill-current ${i < rev.rating ? 'text-[#B38C44]' : 'text-[#EBE6DD]'}`} />
                              ))}
                            </div>
                            {rev.verified && (
                              <span className="text-[9px] font-mono text-emerald-600 uppercase tracking-widest bg-emerald-50 px-1.5 py-0.5 rounded font-bold">
                                Verified Purchase
                              </span>
                            )}
                          </div>
                          
                          <p className="text-[#555555] text-[11px] leading-relaxed italic">"{rev.comment}"</p>
                        </div>
                      ))}
                    </div>

                  </div>
                )}

              </div>

              {/* Product Price Bar inside Modal */}
              <div className="mt-8 pt-6 border-t border-[#EBE6DD] flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-[9px] uppercase tracking-widest text-[#9E9584] font-mono">Price</span>
                  <span className="font-serif text-[#B38C44] text-xl font-bold">
                    ₹{selectedProduct.price.toLocaleString('en-IN')}
                  </span>
                </div>

                <button
                  onClick={() => { handleAddToCart(selectedProduct); setSelectedProduct(null); }}
                  className="bg-[#B38C44] hover:bg-[#9E7832] text-white text-[11px] font-mono font-bold tracking-widest uppercase px-6 py-3 rounded-md transition shadow"
                >
                  Add to Bag
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* ==============================================
          RIGHT DRAWER PANEL: SHOPPING CART BAG
          ============================================== */}
      {showCart && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex justify-end">
          <div className="bg-white border-l border-[#D5CFC4] w-full max-w-md h-full flex flex-col justify-between shadow-2xl p-6 animate-in slide-in-from-right duration-300 text-[#1A1A1A]">
            
            {/* Header drawer */}
            <div className="flex items-center justify-between border-b border-[#EBE6DD] pb-4">
              <div className="flex items-center gap-2 font-serif text-lg tracking-wider text-[#1A1A1A] uppercase font-bold">
                <ShoppingBag className="w-5 h-5 text-[#B38C44]" />
                <span>Shopping Bag</span>
              </div>
              <button onClick={() => setShowCart(false)} className="text-[#7D7569] hover:text-[#1A1A1A] transition p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* List items cart */}
            <div className="flex-1 overflow-y-auto py-6 divide-y divide-[#F0EDE6] pr-1">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center px-4">
                  <ShoppingBag className="w-12 h-12 text-[#D5CFC4] mb-4" />
                  <h4 className="font-serif text-[#1A1A1A] text-base font-bold mb-1">Your Shopping Bag is Empty</h4>
                  <p className="text-xs text-[#7A7265] max-w-[240px] leading-relaxed mb-6">
                    Add gorgeous products from our premium categories to start shopping.
                  </p>
                  <button
                    onClick={() => setShowCart(false)}
                    className="border-2 border-[#B38C44] text-[#B38C44] hover:bg-[#B38C44] hover:text-white rounded-md text-[10px] tracking-widest font-mono font-bold uppercase px-5 py-2.5 transition-all"
                  >
                    Return to Catalog
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {cart.map((item) => (
                    <div key={item.product.id} className="flex gap-4 py-4 first:pt-0">
                      
                      {/* Little preview image */}
                      <div className="w-16 h-16 bg-[#FAF8F5] border border-[#EBE6DD] rounded flex items-center justify-center flex-shrink-0 overflow-hidden shadow-sm">
                        {item.product.images && item.product.images[0] && item.product.images[0].startsWith('http') ? (
                          <img src={item.product.images[0]} alt="" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                        ) : (
                          <LuxuryProductArt id={item.product.id} category={item.product.category} name={item.product.name} />
                        )}
                      </div>

                      <div className="flex-1 flex flex-col justify-between">
                        <div className="flex justify-between gap-2">
                          <div>
                            <span className="text-[8px] font-mono text-[#B38C44] tracking-wider uppercase mb-0.5 block font-bold">{item.product.category}</span>
                            <h4 className="text-xs font-serif text-[#1A1A1A] font-bold line-clamp-1">{item.product.name}</h4>
                          </div>
                          <button
                            onClick={() => handleRemoveFromCart(item.product.id)}
                            className="text-[#9E9584] hover:text-red-500 transition self-start"
                            title="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* quantity adjustments */}
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center border border-[#D5CFC4] rounded bg-white overflow-hidden">
                            <button
                              onClick={() => handleUpdateCartQty(item.product.id, -1)}
                              className="px-2 py-0.5 text-[#555555] hover:bg-[#FAF8F5] text-xs"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-3 py-0.5 text-xs text-[#1A1A1A] font-mono font-bold bg-[#FAF8F5]">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => handleUpdateCartQty(item.product.id, 1)}
                              className="px-2 py-0.5 text-[#555555] hover:bg-[#FAF8F5] text-xs"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <span className="font-serif text-[#B38C44] text-xs font-bold">
                            ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                          </span>
                        </div>

                      </div>

                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Checkout Actions */}
            {cart.length > 0 && (
              <div className="border-t border-[#EBE6DD] pt-6">
                <div className="flex flex-col gap-2.5 text-xs font-mono text-[#555555] mb-6">
                  <div className="flex justify-between">
                    <span>Cart Subtotal</span>
                    <span className="text-[#1A1A1A] font-serif font-bold">₹{cartSubtotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Luxury Service Tax (8%)</span>
                    <span className="text-[#1A1A1A] font-serif font-bold">₹{luxuryTax.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Secured Courier Shipping</span>
                    {deliveryFee === 0 ? (
                      <span className="text-emerald-600 font-bold uppercase tracking-wider">Complimentary</span>
                    ) : (
                      <span className="text-[#1A1A1A] font-serif font-bold">₹{deliveryFee.toLocaleString('en-IN')}</span>
                    )}
                  </div>
                  <div className="flex justify-between border-t border-[#F0EDE6] pt-3 text-sm">
                    <span className="text-[#B38C44] font-bold">Total Bill Amount</span>
                    <span className="text-[#B38C44] font-serif font-bold text-base">₹{cartTotal.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => { setShowCart(false); setCheckoutStep(1); setShowCheckout(true); }}
                    className="w-full bg-[#B38C44] hover:bg-[#9E7832] text-white text-xs font-mono font-bold tracking-widest uppercase py-3.5 text-center transition rounded-md shadow-md"
                  >
                    Proceed to Secure Checkout
                  </button>
                  <button
                    onClick={() => setShowCart(false)}
                    className="w-full text-center py-2 text-[10px] font-mono tracking-widest uppercase text-[#7D7569] hover:text-[#1A1A1A] transition"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

      {/* ==============================================
          RIGHT DRAWER PANEL: CURATED WISHLIST
          ============================================== */}
      {showWishlist && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex justify-end">
          <div className="bg-white border-l border-[#D5CFC4] w-full max-w-md h-full flex flex-col justify-between shadow-2xl p-6 animate-in slide-in-from-right duration-300 text-[#1A1A1A]">
            
            <div className="flex items-center justify-between border-b border-[#EBE6DD] pb-4">
              <div className="flex items-center gap-2 font-serif text-lg tracking-wider text-[#1A1A1A] uppercase font-bold">
                <Heart className="w-5 h-5 text-[#B38C44]" />
                <span>My Wishlist</span>
              </div>
              <button onClick={() => setShowWishlist(false)} className="text-[#7D7569] hover:text-[#1A1A1A] transition p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-6 divide-y divide-[#F0EDE6] pr-1">
              {wishlist.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center px-4">
                  <Heart className="w-12 h-12 text-[#D5CFC4] mb-4" />
                  <h4 className="font-serif text-[#1A1A1A] text-base font-bold mb-1">Your Wishlist is Empty</h4>
                  <p className="text-xs text-[#7A7265] max-w-[240px] leading-relaxed mb-6">
                    Save products from the catalog to build your private collection.
                  </p>
                  <button
                    onClick={() => setShowWishlist(false)}
                    className="border-2 border-[#B38C44] text-[#B38C44] hover:bg-[#B38C44] hover:text-white rounded-md text-[10px] tracking-widest font-mono font-bold uppercase px-5 py-2.5 transition-all"
                  >
                    Return to Catalog
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {wishlist.map((product) => (
                    <div key={product.id} className="flex gap-4 py-4 first:pt-0">
                      
                      <div className="w-16 h-16 bg-[#FAF8F5] border border-[#EBE6DD] rounded flex items-center justify-center flex-shrink-0 overflow-hidden shadow-sm">
                        {product.images && product.images[0] && product.images[0].startsWith('http') ? (
                          <img src={product.images[0]} alt="" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                        ) : (
                          <LuxuryProductArt id={product.id} category={product.category} name={product.name} />
                        )}
                      </div>

                      <div className="flex-1 flex flex-col justify-between">
                        <div className="flex justify-between gap-2">
                          <div>
                            <span className="text-[8px] font-mono text-[#B38C44] tracking-wider uppercase mb-0.5 block font-bold">{product.category}</span>
                            <h4 className="text-xs font-serif text-[#1A1A1A] font-bold line-clamp-1">{product.name}</h4>
                            <span className="font-serif text-[#B38C44] text-xs font-bold block mt-1">
                              ₹{product.price.toLocaleString('en-IN')}
                            </span>
                          </div>
                          <button
                            onClick={() => handleToggleWishlist(product)}
                            className="text-[#9E9584] hover:text-[#1A1A1A] transition self-start"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="flex justify-between items-center mt-2.5 pt-2 border-t border-[#F0EDE6]">
                          <button
                            onClick={() => { handleAddToCart(product); handleToggleWishlist(product); }}
                            className="text-[10px] font-mono uppercase tracking-widest text-[#B38C44] hover:text-[#1A1A1A] transition font-bold"
                          >
                            Add to Bag
                          </button>
                        </div>
                      </div>

                    </div>
                  ))}
                </div>
              )}
            </div>

            {wishlist.length > 0 && (
              <div className="border-t border-[#EBE6DD] pt-4">
                <button
                  onClick={() => {
                    wishlist.forEach(p => handleAddToCart(p, 1));
                    setWishlist([]);
                    setShowWishlist(false);
                  }}
                  className="w-full bg-[#1A1A1A] hover:bg-[#B38C44] text-white text-xs font-mono font-bold tracking-widest uppercase py-3 text-center transition rounded-md shadow-md"
                >
                  Buy Entire Wishlist ({wishlist.length} Items)
                </button>
              </div>
            )}

          </div>
        </div>
      )}

      {/* ==============================================
          RIGHT DRAWER PANEL: PRODUCT COMPARISON LEDGER
          ============================================== */}
      {showCompare && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex justify-end">
          <div className="bg-white border-l border-[#D5CFC4] w-full max-w-2xl h-full flex flex-col justify-between shadow-2xl p-6 animate-in slide-in-from-right duration-300 text-[#1A1A1A]">
            
            <div className="flex items-center justify-between border-b border-[#EBE6DD] pb-4">
              <div className="flex items-center gap-2 font-serif text-lg tracking-wider text-[#1A1A1A] uppercase font-bold">
                <GitCompare className="w-5 h-5 text-[#B38C44]" />
                <span>Compare Products</span>
              </div>
              <button onClick={() => setShowCompare(false)} className="text-[#7D7569] hover:text-[#1A1A1A] transition p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-6 pr-1">
              {compareList.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center px-4">
                  <GitCompare className="w-12 h-12 text-[#D5CFC4] mb-4" />
                  <h4 className="font-serif text-[#1A1A1A] text-base font-bold mb-1">Your Comparison List is Empty</h4>
                  <p className="text-xs text-[#7A7265] max-w-[280px] leading-relaxed mb-6">
                    Add up to 3 luxury items side-by-side to review their materials and specification details.
                  </p>
                  <button
                    onClick={() => setShowCompare(false)}
                    className="border-2 border-[#B38C44] text-[#B38C44] hover:bg-[#B38C44] hover:text-white rounded-md text-[10px] tracking-widest font-mono font-bold uppercase px-5 py-2.5 transition-all"
                  >
                    Return to Catalog
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-6">
                  
                  {/* Top Item Summary cards row */}
                  <div className="grid grid-cols-3 gap-3">
                    {compareList.map((product) => (
                      <div key={product.id} className="bg-[#FAF8F5] p-3 border border-[#EBE6DD] rounded-md relative flex flex-col items-center text-center card-shadow">
                        <button
                          onClick={() => handleToggleCompare(product)}
                          className="absolute top-1.5 right-1.5 text-[#9E9584] hover:text-red-500 transition"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                        
                        <div className="w-12 h-12 bg-white border border-[#EBE6DD] rounded flex items-center justify-center mt-2 overflow-hidden">
                          {product.images && product.images[0] && product.images[0].startsWith('http') ? (
                            <img src={product.images[0]} alt="" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                          ) : (
                            <LuxuryProductArt id={product.id} category={product.category} name={product.name} />
                          )}
                        </div>
                        
                        <h5 className="font-serif text-[10px] text-[#1A1A1A] line-clamp-1 mt-3 font-bold">{product.name}</h5>
                        <span className="text-[#B38C44] font-mono text-[10px] mt-1 font-semibold">₹{product.price.toLocaleString('en-IN')}</span>
                        
                        <button
                          onClick={() => handleAddToCart(product)}
                          className="mt-3 text-[8px] font-mono tracking-wider uppercase bg-[#B38C44] text-white px-2 py-1 w-full rounded hover:bg-[#9E7832] transition font-bold"
                        >
                          Add to Bag
                        </button>
                      </div>
                    ))}
                    {compareList.length < 3 && (
                      <div className="border border-[#EBE6DD] border-dashed rounded-md flex flex-col items-center justify-center text-center p-3 text-[#9E9584] text-[10px]">
                        <span>Slot {compareList.length + 1} empty</span>
                        <span>Add item</span>
                      </div>
                    )}
                  </div>

                  {/* Specification Table Comparison */}
                  <div className="bg-[#FAF8F5] border border-[#EBE6DD] rounded-md divide-y divide-[#EBE6DD] mt-4 text-[11px] font-sans">
                    
                    <div className="grid grid-cols-4 p-3 font-mono text-[9px] uppercase tracking-wider text-[#7A7265] font-bold">
                      <span>Property</span>
                      {compareList.map((p) => (
                        <span key={p.id} className="text-[#1A1A1A] text-right font-serif truncate pr-1 font-bold">{p.name.split(' ')[0]}</span>
                      ))}
                      {[...Array(3 - compareList.length)].map((_, i) => <span key={i} />)}
                    </div>

                    <div className="grid grid-cols-4 p-3">
                      <span className="text-[#7A7265] font-mono text-[9px] uppercase font-bold">Category</span>
                      {compareList.map((p) => (
                        <span key={p.id} className="text-right text-[#1A1A1A] font-medium pr-1">{p.category}</span>
                      ))}
                      {[...Array(3 - compareList.length)].map((_, i) => <span key={i} />)}
                    </div>

                    <div className="grid grid-cols-4 p-3">
                      <span className="text-[#7A7265] font-mono text-[9px] uppercase font-bold">Collection</span>
                      {compareList.map((p) => (
                        <span key={p.id} className="text-right text-[#1A1A1A] font-medium pr-1">{p.collection}</span>
                      ))}
                      {[...Array(3 - compareList.length)].map((_, i) => <span key={i} />)}
                    </div>

                    <div className="grid grid-cols-4 p-3">
                      <span className="text-[#7A7265] font-mono text-[9px] uppercase font-bold">Customer Rating</span>
                      {compareList.map((p) => (
                        <span key={p.id} className="text-right text-[#B38C44] font-mono font-bold pr-1">{p.rating} / 5.0</span>
                      ))}
                      {[...Array(3 - compareList.length)].map((_, i) => <span key={i} />)}
                    </div>

                    <div className="grid grid-cols-4 p-3">
                      <span className="text-[#7A7265] font-mono text-[9px] uppercase font-bold">Material</span>
                      {compareList.map((p) => (
                        <span key={p.id} className="text-right text-[#1A1A1A] pr-1 truncate font-medium">{p.specs["Primary Material"] || p.specs["Material"] || p.specs["Leather Type"] || "N/A"}</span>
                      ))}
                      {[...Array(3 - compareList.length)].map((_, i) => <span key={i} />)}
                    </div>

                    <div className="grid grid-cols-4 p-3">
                      <span className="text-[#7A7265] font-mono text-[9px] uppercase font-bold">Item ID Code</span>
                      {compareList.map((p) => (
                        <span key={p.id} className="text-right text-[#7D7569] font-mono text-[9px] pr-1">{p.specs["Registered ID"] || "AUTHENTIC"}</span>
                      ))}
                      {[...Array(3 - compareList.length)].map((_, i) => <span key={i} />)}
                    </div>

                  </div>

                </div>
              )}
            </div>

            {compareList.length > 0 && (
              <div className="border-t border-[#EBE6DD] pt-4">
                <button
                  onClick={() => setCompareList([])}
                  className="w-full text-center py-2 text-[10px] font-mono tracking-widest uppercase text-red-500 hover:text-red-700 transition font-bold"
                >
                  Clear Comparison List
                </button>
              </div>
            )}

          </div>
        </div>
      )}

      {/* ==============================================
          OVERLAY PANEL: ACCOUNT LOGIN MODAL
          ============================================== */}
      {showAuth && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-[#D5CFC4] w-full max-w-md rounded-md shadow-2xl relative p-8 animate-in fade-in zoom-in duration-300 text-[#1A1A1A]">
            
            <button onClick={() => setShowAuth(false)} className="absolute top-4 right-4 text-[#7D7569] hover:text-[#1A1A1A] transition">
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <h3 className="font-serif text-xl tracking-wider text-[#B38C44] uppercase font-bold mb-1">
                Customer Account
              </h3>
              <span className="text-[10px] tracking-widest text-[#7D7569] uppercase font-mono font-semibold">
                LOG IN TO YOUR ACCOUNT
              </span>
            </div>

            <p className="text-[11px] text-[#6E685E] leading-relaxed text-center mb-6 font-sans">
              Enter any email and password to access your secure customer panel, view order history, and speed up checkout.
            </p>

            <form onSubmit={handleMockLogin} className="flex flex-col gap-4">
              
              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] uppercase tracking-widest font-mono text-[#7A7265] font-bold">Email Address</label>
                <input
                  type="email"
                  placeholder="name@domain.com"
                  required
                  value={authEmail}
                  onChange={(e) => setAuthEmail(e.target.value)}
                  className="bg-[#FAF8F5] border border-[#D5CFC4] rounded-md text-xs py-2.5 px-4 text-[#1A1A1A] placeholder-[#9E9584] focus:outline-none focus:border-[#B38C44]"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] uppercase tracking-widest font-mono text-[#7A7265] font-bold">Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  required
                  value={authPassword}
                  onChange={(e) => setAuthPassword(e.target.value)}
                  className="bg-[#FAF8F5] border border-[#D5CFC4] rounded-md text-xs py-2.5 px-4 text-[#1A1A1A] focus:outline-none focus:border-[#B38C44]"
                />
              </div>

              {authError && (
                <div className="text-[11px] text-red-500 font-mono font-bold">{authError}</div>
              )}

              <button
                type="submit"
                className="w-full bg-[#B38C44] hover:bg-[#9E7832] text-white text-xs font-mono font-bold tracking-widest uppercase py-3 rounded-md transition mt-2 shadow-md"
              >
                Log In
              </button>

              <div className="text-center mt-4">
                <span className="text-[10px] text-[#9E9584] font-mono">
                  DEMO ACCESS: Enter any valid email & password
                </span>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* ==============================================
          OVERLAY PANEL: SECURE MULTI-STEP CHECKOUT
          ============================================== */}
      {showCheckout && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-[#D5CFC4] w-full max-w-2xl rounded-md shadow-2xl relative p-8 my-8 animate-in fade-in zoom-in duration-300 text-[#1A1A1A]">
            
            <button
              onClick={() => { if (checkoutStep < 3) { if (confirm("Abort checkout? Your details will be cleared.")) { setShowCheckout(false); } } else { setShowCheckout(false); } }}
              className="absolute top-4 right-4 text-[#7D7569] hover:text-[#1A1A1A] transition"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Stepper Header */}
            <div className="flex items-center justify-between border-b border-[#EBE6DD] pb-6 mb-8 font-mono text-xs tracking-widest text-center uppercase font-bold">
              <div className={`flex items-center gap-2 ${checkoutStep >= 1 ? 'text-[#B38C44]' : 'text-[#9E9584]'}`}>
                <span className="w-5 h-5 border border-current rounded-full flex items-center justify-center text-[10px] font-bold">1</span>
                <span>Address</span>
              </div>
              <div className="h-[1px] bg-[#EBE6DD] flex-1 mx-4" />
              <div className={`flex items-center gap-2 ${checkoutStep >= 2 ? 'text-[#B38C44]' : 'text-[#9E9584]'}`}>
                <span className="w-5 h-5 border border-current rounded-full flex items-center justify-center text-[10px] font-bold">2</span>
                <span>Payment</span>
              </div>
              <div className="h-[1px] bg-[#EBE6DD] flex-1 mx-4" />
              <div className={`flex items-center gap-2 ${checkoutStep >= 3 ? 'text-[#B38C44]' : 'text-[#9E9584]'}`}>
                <span className="w-5 h-5 border border-current rounded-full flex items-center justify-center text-[10px] font-bold">3</span>
                <span>Placed</span>
              </div>
            </div>

            {/* STEP 1: BILLING & SHIPPING DETAILS */}
            {checkoutStep === 1 && (
              <div className="flex flex-col gap-6">
                
                <div className="flex justify-between items-center">
                  <h3 className="font-serif text-lg text-[#1A1A1A] font-bold">Delivery Address</h3>
                  {user && (
                    <button
                      onClick={handleAutofillAddress}
                      className="text-[10px] font-mono uppercase tracking-widest bg-[#B38C44]/10 text-[#B38C44] border border-[#B38C44]/30 px-3 py-1.5 rounded hover:bg-[#B38C44] hover:text-white transition font-bold"
                    >
                      Autofill Saved Address
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-[9px] uppercase tracking-widest font-mono text-[#7A7265] font-bold">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Aravind Sharma"
                      value={checkoutForm.fullName}
                      onChange={(e) => setCheckoutForm({...checkoutForm, fullName: e.target.value})}
                      className="bg-[#FAF8F5] border border-[#D5CFC4] rounded-md text-xs py-2 px-3 text-[#1A1A1A] focus:outline-none focus:border-[#B38C44]"
                    />
                    {checkoutErrors.fullName && <span className="text-[9px] text-red-500 font-mono mt-0.5 font-bold">{checkoutErrors.fullName}</span>}
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[9px] uppercase tracking-widest font-mono text-[#7A7265] font-bold">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="sharma.aravind@gmail.com"
                      value={checkoutForm.email}
                      onChange={(e) => setCheckoutForm({...checkoutForm, email: e.target.value})}
                      className="bg-[#FAF8F5] border border-[#D5CFC4] rounded-md text-xs py-2 px-3 text-[#1A1A1A] focus:outline-none focus:border-[#B38C44]"
                    />
                    {checkoutErrors.email && <span className="text-[9px] text-red-500 font-mono mt-0.5 font-bold">{checkoutErrors.email}</span>}
                  </div>

                  <div className="flex flex-col gap-1 md:col-span-2">
                    <label className="text-[9px] uppercase tracking-widest font-mono text-[#7A7265] font-bold">Street Address, Flat/House No.</label>
                    <input
                      type="text"
                      required
                      placeholder="Flat 402, Royal Residency, Indiranagar"
                      value={checkoutForm.street}
                      onChange={(e) => setCheckoutForm({...checkoutForm, street: e.target.value})}
                      className="bg-[#FAF8F5] border border-[#D5CFC4] rounded-md text-xs py-2 px-3 text-[#1A1A1A] focus:outline-none focus:border-[#B38C44]"
                    />
                    {checkoutErrors.street && <span className="text-[9px] text-red-500 font-mono mt-0.5 font-bold">{checkoutErrors.street}</span>}
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[9px] uppercase tracking-widest font-mono text-[#7A7265] font-bold">City</label>
                    <input
                      type="text"
                      required
                      placeholder="Bangalore"
                      value={checkoutForm.city}
                      onChange={(e) => setCheckoutForm({...checkoutForm, city: e.target.value})}
                      className="bg-[#FAF8F5] border border-[#D5CFC4] rounded-md text-xs py-2 px-3 text-[#1A1A1A] focus:outline-none focus:border-[#B38C44]"
                    />
                    {checkoutErrors.city && <span className="text-[9px] text-red-500 font-mono mt-0.5 font-bold">{checkoutErrors.city}</span>}
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[9px] uppercase tracking-widest font-mono text-[#7A7265] font-bold">PIN / Postal Code</label>
                    <input
                      type="text"
                      required
                      placeholder="560038"
                      value={checkoutForm.postalCode}
                      onChange={(e) => setCheckoutForm({...checkoutForm, postalCode: e.target.value})}
                      className="bg-[#FAF8F5] border border-[#D5CFC4] rounded-md text-xs py-2 px-3 text-[#1A1A1A] focus:outline-none focus:border-[#B38C44]"
                    />
                    {checkoutErrors.postalCode && <span className="text-[9px] text-red-500 font-mono mt-0.5 font-bold">{checkoutErrors.postalCode}</span>}
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[9px] uppercase tracking-widest font-mono text-[#7A7265] font-bold">State / Country</label>
                    <input
                      type="text"
                      required
                      placeholder="Karnataka / India"
                      value={checkoutForm.country}
                      onChange={(e) => setCheckoutForm({...checkoutForm, country: e.target.value})}
                      className="bg-[#FAF8F5] border border-[#D5CFC4] rounded-md text-xs py-2 px-3 text-[#1A1A1A] focus:outline-none focus:border-[#B38C44]"
                    />
                    {checkoutErrors.country && <span className="text-[9px] text-red-500 font-mono mt-0.5 font-bold">{checkoutErrors.country}</span>}
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[9px] uppercase tracking-widest font-mono text-[#7A7265] font-bold">Contact Telephone</label>
                    <input
                      type="text"
                      required
                      placeholder="+91 98765 43210"
                      value={checkoutForm.phone}
                      onChange={(e) => setCheckoutForm({...checkoutForm, phone: e.target.value})}
                      className="bg-[#FAF8F5] border border-[#D5CFC4] rounded-md text-xs py-2 px-3 text-[#1A1A1A] focus:outline-none focus:border-[#B38C44]"
                    />
                    {checkoutErrors.phone && <span className="text-[9px] text-red-500 font-mono mt-0.5 font-bold">{checkoutErrors.phone}</span>}
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    onClick={handleCheckoutSubmit}
                    className="flex items-center gap-2 bg-[#B38C44] hover:bg-[#9E7832] text-white text-xs font-mono font-bold uppercase tracking-widest px-8 py-3.5 rounded-md transition shadow"
                  >
                    <span>Proceed to Payment</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            )}

            {/* STEP 2: SECURE CREDIT CARD PAYMENT METHOD */}
            {checkoutStep === 2 && (
              <div className="flex flex-col gap-6">
                
                <h3 className="font-serif text-lg text-[#1A1A1A] font-bold">Secure Credit Card Payment</h3>
                
                {/* Gold credit card display */}
                <div className="bg-[#1C1A17] border-2 border-[#B38C44] p-6 rounded-md relative flex flex-col justify-between aspect-[1.586/1] w-full max-w-sm mx-auto shadow-2xl mb-4 text-white font-mono">
                  
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-[8px] uppercase tracking-widest text-[#B38C44] font-bold">AETHER PLATINUM</div>
                      <div className="text-[9px] uppercase tracking-widest font-serif italic text-[#FAF6ED] mt-0.5">PREFERRED CLIENT</div>
                    </div>
                    <CreditCard className="w-8 h-8 text-[#B38C44]" />
                  </div>

                  <div className="my-4">
                    <div className="text-sm tracking-[0.2em] font-semibold text-white/95">
                      {checkoutForm.cardNumber ? checkoutForm.cardNumber.replace(/(\d{4})/g, '$1 ').trim() : "•••• •••• •••• ••••"}
                    </div>
                  </div>

                  <div className="flex justify-between items-end text-[9px] uppercase tracking-widest">
                    <div>
                      <div className="text-[7px] text-[#A1998C] mb-0.5">Cardholder</div>
                      <div className="text-[#FAF6ED] truncate max-w-[150px]">
                        {checkoutForm.cardholder || "Aravind Sharma"}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[7px] text-[#A1998C] mb-0.5">Expires</div>
                      <div className="text-[#FAF6ED]">{checkoutForm.expiry || "MM/YY"}</div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1 md:col-span-2">
                    <label className="text-[9px] uppercase tracking-widest font-mono text-[#7A7265] font-bold">Cardholder Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Aravind Sharma"
                      value={checkoutForm.cardholder}
                      onChange={(e) => setCheckoutForm({...checkoutForm, cardholder: e.target.value})}
                      className="bg-[#FAF8F5] border border-[#D5CFC4] rounded-md text-xs py-2 px-3 text-[#1A1A1A] focus:outline-none focus:border-[#B38C44]"
                    />
                    {checkoutErrors.cardholder && <span className="text-[9px] text-red-500 font-mono mt-0.5 font-bold">{checkoutErrors.cardholder}</span>}
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[9px] uppercase tracking-widest font-mono text-[#7A7265] font-bold">16-Digit Card Number</label>
                    <input
                      type="text"
                      required
                      placeholder="4000 1234 5678 9010"
                      maxLength={16}
                      value={checkoutForm.cardNumber}
                      onChange={(e) => setCheckoutForm({...checkoutForm, cardNumber: e.target.value.replace(/\D/g, '')})}
                      className="bg-[#FAF8F5] border border-[#D5CFC4] rounded-md text-xs py-2 px-3 text-[#1A1A1A] focus:outline-none focus:border-[#B38C44]"
                    />
                    {checkoutErrors.cardNumber && <span className="text-[9px] text-red-500 font-mono mt-0.5 font-bold">{checkoutErrors.cardNumber}</span>}
                  </div>

                  <div className="grid grid-cols-2 gap-3.5">
                    <div className="flex flex-col gap-1">
                      <label className="text-[9px] uppercase tracking-widest font-mono text-[#7A7265] font-bold">Expiry (MM/YY)</label>
                      <input
                        type="text"
                        required
                        placeholder="12/28"
                        maxLength={5}
                        value={checkoutForm.expiry}
                        onChange={(e) => {
                          let val = e.target.value;
                          if (val.length === 2 && !val.includes('/')) val += '/';
                          setCheckoutForm({...checkoutForm, expiry: val});
                        }}
                        className="bg-[#FAF8F5] border border-[#D5CFC4] rounded-md text-xs py-2 px-3 text-[#1A1A1A] focus:outline-none focus:border-[#B38C44]"
                      />
                      {checkoutErrors.expiry && <span className="text-[9px] text-red-500 font-mono mt-0.5 font-bold">{checkoutErrors.expiry}</span>}
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-[9px] uppercase tracking-widest font-mono text-[#7A7265] font-bold">CVV Code</label>
                      <input
                        type="password"
                        required
                        placeholder="•••"
                        maxLength={4}
                        value={checkoutForm.cvv}
                        onChange={(e) => setCheckoutForm({...checkoutForm, cvv: e.target.value.replace(/\D/g, '')})}
                        className="bg-[#FAF8F5] border border-[#D5CFC4] rounded-md text-xs py-2 px-3 text-[#1A1A1A] focus:outline-none focus:border-[#B38C44]"
                      />
                      {checkoutErrors.cvv && <span className="text-[9px] text-red-500 font-mono mt-0.5 font-bold">{checkoutErrors.cvv}</span>}
                    </div>
                  </div>
                </div>

                {/* Consent checkbox */}
                <div className="flex flex-col gap-1.5 mt-2">
                  <label className="flex items-start gap-2.5 text-[#555555] text-xs cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={checkoutForm.consent}
                      onChange={(e) => setCheckoutForm({...checkoutForm, consent: e.target.checked})}
                      className="mt-0.5 accent-[#B38C44]"
                    />
                    <span>I authorize this payment and agree to the Terms of Service & Shipping policies.</span>
                  </label>
                  {checkoutErrors.consent && <span className="text-[9px] text-red-500 font-mono font-bold">{checkoutErrors.consent}</span>}
                </div>

                <div className="mt-4 pt-4 border-t border-[#F0EDE6] flex items-center justify-between">
                  <button
                    onClick={() => setCheckoutStep(1)}
                    className="text-[10px] font-mono uppercase tracking-widest text-[#7A7265] hover:text-[#1A1A1A] transition"
                  >
                    Back to Address
                  </button>
                  <button
                    onClick={handleCheckoutSubmit}
                    className="flex items-center gap-2 bg-[#B38C44] hover:bg-[#9E7832] text-white text-xs font-mono font-bold uppercase tracking-widest px-8 py-3.5 rounded-md transition shadow"
                  >
                    <span>Authorize Payment</span>
                    <Lock className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            )}

            {/* STEP 3: ORDER CONFIRMED */}
            {checkoutStep === 3 && confirmedOrder && (
              <div className="flex flex-col items-center text-center py-8">
                <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mb-6 border border-emerald-200">
                  <Package className="w-8 h-8" />
                </div>

                <h3 className="font-serif text-2xl text-[#1A1A1A] font-bold mb-2">Order Confirmed Successfully</h3>
                <p className="text-xs text-[#555555] max-w-md leading-relaxed mb-6">
                  Thank you for your purchase from Aether & Gold. Your order code is <span className="font-mono text-[#B38C44] font-bold">{confirmedOrder.id}</span>. We have sent a copy of your receipt to your secure email address.
                </p>

                <div className="bg-[#FAF8F5] border border-[#EBE6DD] rounded-md p-5 w-full max-w-md text-left font-sans text-xs mb-8">
                  <div className="flex justify-between py-1.5 border-b border-[#F0EDE6] text-[#7A7265]">
                    <span>Registry Reference</span>
                    <span className="font-mono text-[#1A1A1A] font-bold">{confirmedOrder.id}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-[#F0EDE6] text-[#7A7265]">
                    <span>Expected Delivery</span>
                    <span className="text-[#1A1A1A] font-semibold">{confirmedOrder.deliveryDate}</span>
                  </div>
                  <div className="flex justify-between py-1.5 text-[#7A7265]">
                    <span>Dispatch Carrier</span>
                    <span className="text-[#1A1A1A] font-semibold">Premium Insured Express</span>
                  </div>
                </div>

                <button
                  onClick={() => setShowCheckout(false)}
                  className="px-8 py-3 bg-[#B38C44] hover:bg-[#9E7832] text-white text-xs font-mono font-bold uppercase tracking-widest rounded-md transition shadow"
                >
                  Return to Catalog
                </button>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
