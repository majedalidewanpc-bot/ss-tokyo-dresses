/*
  Product information lives in this file so it is easy to update later.
  To add a product, copy one object below and give it a unique `id`.
*/
const PRODUCTS = [
  {
    id: "masoba-blouse",
    name: "Masoba Blouse",
    shortName: "Masoba",
    // Catalogue offer: MRP ₹899 less 33% = selling price ₹599.
    price: 599,
    mrp: 899,
    discountPercent: 33,
    rating: 4.3,
    ratingCount: 149,
    category: "Light Lace Work",
    material: "Fancy Silk",
    description:
      "A graceful Fancy silk blouse finished with delicate lace detailing. The softly structured silhouette, puff sleeves and elegant open-back tie detail make Masoba a beautiful partner for festive sarees and dressed-up occasions. Discover amazing with our new Designer Blouse! Made from soft Silk fabric and adorned with stunning fancy Golden Embroidery and Sequins work, this blouse offers the perfect combination of fashion and comfort.",
    highlights: [
      "Fancy Silk with delicate lace detailing",
      "Puff sleeves with decorative border",
      "Open-back design with tassel tie-up",
      "Made in India",
      "Fabric: Fancy Silk",
      "Sleeve Length: Short Sleeves",
      "Pattern: Solid",
      "Golden embroidery and sequins work",
      "Country of Origin: India"
    ],
    sizes: ["32", "34"],
    sizeGuide: [
      { size: "32", bust: "36 in", length: "14 in", shoulder: "11 in" },
      { size: "34", bust: "36 in", length: "15 in", shoulder: "12 in" }
    ],
    colours: [
      { name: "Maroon", hex: "#7f1636", image: "images/masoba-cover-maroon.jpeg" },
      { name: "Navy Blue", hex: "#142a55", image: "images/masoba-navy-front.jpeg" },
      { name: "Black", hex: "#171517", image: "images/masoba-black-front.jpeg" },
      { name: "Wine", hex: "#641b2b", image: "images/masoba-wine-view.png" },
      { name: "Red", hex: "#b81632", image: "images/masoba-red-front.jpeg" },
      { name: "Bottle Green", hex: "#0e4c3a", image: "images/masoba-green-front.jpeg" },
      { name: "Rani Pink", hex: "#b21968", image: "images/masoba-rani-pink-front.jpeg" }
    ],
    gallery: [
      "images/masoba-cover-maroon.jpeg",
      "images/masoba-back-maroon.jpeg",
      "images/masoba-side-maroon.jpeg",
      "images/masoba-red-back.jpeg"
    ],
    badge: "New collection"
  },
  {
    id: "mumtaz-blouse",
    name: "Mumtaz Blouse",
    shortName: "Mumtaz",
    // Catalogue offer: MRP ₹1,199 less 33% = selling price ₹799.
    price: 799,
    mrp: 1199,
    discountPercent: 33,
    rating: 4.8,
    ratingCount: 203,
    category: "Heavy Embroidery",
    material: "Vichitra Silk",
    description:
      "Mumtaz brings a richer finish to your saree look with striking heavy embroidery, a sculpted neckline and ornate sleeve borders. Its Vichitra silk base and statement open-back tie detail create a festive blouse made to stand out. Discover amazing with our new Designer Blouse! Made from soft Silk fabric and adorned with stunning fancy Golden Embroidery and Sequins work, this blouse offers the perfect combination of fashion and comfort.",
    highlights: [
      "Vichitra silk with heavy embroidery",
      "Ornate neckline and sleeve border work",
      "Open-back design with tassel tie-up",
      "Made in India",
      "Fabric: Vichitra Silk",
      "Sleeve Length: Short Sleeves",
      "Pattern: Embroidery",
      "Fancy golden embroidery and sequins work",
      "Country of Origin: India"
    ],
    sizes: ["32", "34"],
    sizeGuide: [
      { size: "32", bust: "36 in", length: "14 in", shoulder: "11 in" },
      { size: "34", bust: "36 in", length: "15 in", shoulder: "12 in" }
    ],
    colours: [
      { name: "Black", hex: "#171517", image: "images/mumtaz-cover-black.png" },
      { name: "Purple", hex: "#472054", image: "images/mumtaz-front-purple.png" },
      { name: "Bottle Green", hex: "#0b5138", image: "images/mumtaz-front-green.png" }
    ],
    gallery: [
      "images/mumtaz-cover-black.png",
      "images/mumtaz-back-black.png",
      "images/mumtaz-front-purple.png",
      "images/mumtaz-detail-green.jpeg"
    ],
    badge: "Festive pick"
  },
  {
    id: "mumtaz-d2-blouse",
    name: "Mumtaz D2 Blouse",
    shortName: "Mumtaz D2",
    // Catalogue offer: MRP ₹1,199 less 35% = selling price ₹775.
    price: 775,
    mrp: 1199,
    discountPercent: 35,
    rating: 4.7,
    ratingCount: 168,
    category: "Heavy Embroidery",
    material: "Vichitra Silk",
    description:
      "Mumtaz D2 brings a richer finish to your saree look with striking heavy embroidery, a sculpted neckline and ornate sleeve borders. Its Vichitra silk base and statement open-back tie detail create a festive blouse made to stand out. Discover amazing with our new Designer Blouse! Made from soft Silk fabric and adorned with stunning fancy Golden Embroidery and Sequins work, this blouse offers the perfect combination of fashion and comfort.",
    highlights: [
      "Vichitra silk with heavy embroidery",
      "Ornate neckline and sleeve border work",
      "Open-back design with tassel tie-up",
      "Made in India",
      "Fabric: Vichitra Silk",
      "Sleeve Length: Short Sleeves",
      "Pattern: Embroidery",
      "Fancy golden embroidery and sequins work",
      "Country of Origin: India"
    ],
    sizes: ["32", "34"],
    sizeGuide: [
      { size: "32", bust: "36 in", length: "14 in", shoulder: "11 in" },
      { size: "34", bust: "36 in", length: "15 in", shoulder: "12 in" }
    ],
    colours: [
      { name: "Rani Pink", hex: "#bb1460", image: "images/mumtaz-d2-rani-front.png" },
      { name: "Bottle Green", hex: "#0b5138", image: "images/mumtaz-d2-green-front.png" },
      { name: "White", hex: "#f8f6ef", image: "images/mumtaz-d2-white-front.png" }
    ],
    gallery: [
      "images/mumtaz-d2-rani-front.png",
      "images/mumtaz-d2-rani-back.png",
      "images/mumtaz-d2-green-front.png",
      "images/mumtaz-d2-green-back.png",
      "images/mumtaz-d2-white-front.png",
      "images/mumtaz-d2-white-back.png",
      "images/mumtaz-d2-rani-detail.png",
      "images/mumtaz-d2-green-detail.png",
      "images/mumtaz-d2-white-detail.png"
    ],
    badge: "New arrival"
  },
  {
    id: "queen-blouse",
    name: "Queen Blouse",
    shortName: "Queen",
    // Catalogue offer: MRP ₹1,099 less 31% = selling price ₹759.
    price: 759,
    mrp: 1099,
    discountPercent: 31,
    rating: 4.6,
    ratingCount: 186,
    category: "Pearl Embellishment",
    material: "Fancy Silk",
    description:
      "A regal maroon Fancy silk blouse adorned with pearl floral motifs and a beautifully embroidered sleeve border. Queen pairs a flattering V-neck front with an elegant open-back tie-up, creating a festive look that feels polished from every angle. New Trending Blouse For Women — Queen for Beauty in maroon colour.",
    highlights: [
      "Fancy Silk with pearl floral embellishments",
      "Embroidered scalloped sleeve border",
      "Open-back design with tassel tie-up",
      "Made in India",
      "Fabric: Fancy Silk",
      "Sleeve Length: Short Sleeves",
      "Pattern: Embroidered",
      "Golden embroidery and sequins work",
      "Country of Origin: India"
    ],
    sizes: ["32", "34"],
    sizeGuide: [
      { size: "32", bust: "36 in", length: "14 in", shoulder: "11 in" },
      { size: "34", bust: "36 in", length: "15 in", shoulder: "12 in" }
    ],
    colours: [
      { name: "Maroon", hex: "#7f1636", image: "images/queen-blouse-front-maroon.jpeg" }
    ],
    gallery: [
      "images/queen-blouse-front-maroon.jpeg",
      "images/queen-blouse-back-maroon.jpeg",
      "images/queen-blouse-flat-lay-maroon.jpeg"
    ],
    badge: "New arrival"
  },
  {
    id: "barby-blouse",
    name: "Barby Blouse",
    shortName: "Barby",
    // Catalogue offer: MRP ₹1,599 less 50% = selling price ₹799.
    price: 799,
    mrp: 1599,
    discountPercent: 50,
    rating: 4.9,
    ratingCount: 358,
    category: "Pearl Embellishment",
    material: "Fancy Silk",
    description:
      "Barby is a Fancy silk blouse adorned with pearl-inspired floral motifs and a beautifully embroidered sleeve border. Its graceful scoop-neck front and elegant open-back tie-up create a festive look that feels polished from every angle.",
    highlights: [
      "Fancy Silk with pearl floral embellishments",
      "Embroidered scalloped sleeve border",
      "Open-back design with tassel tie-up",
      "Made in India",
      "Fabric: Fancy Silk",
      "Sleeve Length: Short Sleeves",
      "Pattern: Embroidered",
      "Golden embroidery and sequins work",
      "Country of Origin: India"
    ],
    sizes: ["32", "34"],
    sizeGuide: [
      { size: "32", bust: "36 in", length: "14 in", shoulder: "11 in" },
      { size: "34", bust: "36 in", length: "15 in", shoulder: "12 in" }
    ],
    colours: [
      { name: "Red", hex: "#b81632", image: "images/barby-red-front.jpeg" },
      { name: "Tusser", hex: "#bc9352", image: "images/barby-tusser-front.jpeg" },
      { name: "Wine", hex: "#581447", image: "images/barby-wine-front.jpeg" },
      { name: "Pink", hex: "#c3196a", image: "images/barby-pink-front.jpeg" }
    ],
    gallery: [
      "images/barby-red-front.jpeg",
      "images/barby-red-back.jpeg",
      "images/barby-red-side.jpeg",
      "images/barby-red-detail.jpeg",
      "images/barby-tusser-front.jpeg",
      "images/barby-tusser-back.jpeg",
      "images/barby-tusser-side.jpeg",
      "images/barby-tusser-detail.jpeg",
      "images/barby-wine-front.jpeg",
      "images/barby-wine-back.jpeg",
      "images/barby-wine-side.jpeg",
      "images/barby-wine-detail.jpeg",
      "images/barby-pink-front.jpeg"
    ],
    badge: "New arrival"
  },
  {
    id: "cinderella-maroon-blouse",
    name: "Cinderella Maroon Colour Blouse for Women",
    shortName: "Cinderella",
    // Catalogue offer: MRP ₹2,249 less 42% = selling price ₹1,299.
    price: 1299,
    mrp: 2249,
    discountPercent: 42,
    rating: 4.9,
    ratingCount: 348,
    category: "Heavy Embroidery",
    material: "Vichitra Silk",
    description:
      "Cinderella brings a richer finish to your saree look with striking heavy embroidery, a sculpted neckline and ornate sleeve borders. Its Vichitra silk base and statement open-back tie detail create a festive blouse made to stand out. Discover amazing with our new Designer Blouse! Made from soft Silk fabric and adorned with stunning fancy Golden Embroidery and Sequins work, this blouse offers the perfect combination of fashion and comfort.",
    highlights: [
      "Vichitra silk with heavy embroidery",
      "Ornate neckline and sleeve border work",
      "Open-back design with tassel tie-up",
      "Made in India",
      "Fabric: Vichitra Silk",
      "Sleeve Length: Short Sleeves",
      "Pattern: Embroidery",
      "Fancy golden embroidery and sequins work",
      "Country of Origin: India"
    ],
    sizes: ["32", "34"],
    sizeGuide: [
      { size: "32", bust: "36 in", length: "14 in", shoulder: "11 in" },
      { size: "34", bust: "36 in", length: "15 in", shoulder: "12 in" }
    ],
    colours: [
      { name: "Maroon", hex: "#75142d", image: "images/cinderella-maroon-front.png" }
    ],
    gallery: [
      "images/cinderella-maroon-front.png",
      "images/cinderella-maroon-back-angle.png",
      "images/cinderella-maroon-back.png",
      "images/cinderella-maroon-flat-lay.png"
    ],
    badge: "New arrival",
    promoBadge: "42% OFF · HOT SELL"
  }
];

const SHIPPING_THRESHOLD = 1799;
const SHIPPING_FEE = 60;
