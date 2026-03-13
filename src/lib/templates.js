export const CATEGORIES = [
    "Perfumes, Colognes & Oils",
    "Skin Care Products",
    "Accessories",
    "Wigs & Hair",
    "Women Electrical Appliances",
];

export const CATEGORY_IMAGES = {
    "Perfumes, Colognes & Oils": "https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=800",
    "Skin Care Products": "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800",
    "Accessories": "https://images.unsplash.com/photo-1535633302723-997f858509ec?w=800",
    "Wigs & Hair": "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=800",
    "Women Electrical Appliances": "https://images.unsplash.com/photo-1526045612212-70caf35c14df?w=800",
};

export const SERVICES_TEMPLATE = [
    { id: 1, name: "Braiding", price: 150000, time: "4-6 hrs", image: "https://images.unsplash.com/photo-1605218427360-36390f8584b0?w=400" },
    { id: 2, name: "Shaving for Men", price: 20000, time: "45 mins", image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400" },
    { id: 3, name: "Pedicure", price: 45000, time: "1.5 hrs", image: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=400" },
    { id: 4, name: "Manicure", price: 35000, time: "1 hr", image: "https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=400" },
    { id: 5, name: "Wig Installation", price: 80000, time: "1-2 hrs", image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=400" },
    { id: 6, name: "Lashes Fixation", price: 50000, time: "1 hr", image: "https://images.unsplash.com/photo-1583001838473-b1939109772b?w=400" },
    { id: 7, name: "Make Up", price: 100000, time: "1-2 hrs", image: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=400" },
];

export function generateProducts() {
    const products = [];
    const brandNames = ["Lumina", "Velvet", "Aura", "Royal", "Pure", "Silk", "Glow", "Noir", "Essence", "Vivid"];
    const images = {
        "Perfumes, Colognes & Oils": [
            "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400",
            "https://images.unsplash.com/photo-1594035910387-fea4779426e9?w=400",
            "https://images.unsplash.com/photo-1523293188086-b5e91d940fe6?w=400",
            "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=400"
        ],
        "Skin Care Products": [
            "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400",
            "https://images.unsplash.com/photo-1620916297397-a4a5402a3c6c?w=400",
            "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400",
            "https://images.unsplash.com/photo-1608248597279-f99d160bfbc8?w=400"
        ],
        "Accessories": [
            "https://images.unsplash.com/photo-1535633302723-997f858509ec?w=400",
            "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400",
            "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=400",
            "https://images.unsplash.com/photo-1617038220319-276d3cfab60e?w=400"
        ],
        "Wigs & Hair": [
            "https://images.unsplash.com/photo-1560869713-7d0a29430803?w=400",
            "https://images.unsplash.com/photo-1595476103518-3c9780b6a22c?w=400",
            "https://images.unsplash.com/photo-1636284646733-4f93c5c11030?w=400",
            "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=400"
        ],
        "Women Electrical Appliances": [
            "https://images.unsplash.com/photo-1526045612212-70caf35c14df?w=400",
            "https://images.unsplash.com/photo-1583947581924-860bda6a26df?w=400",
            "https://images.unsplash.com/photo-1519751138087-5bf79df62d5b?w=400",
            "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400"
        ],
    };

    CATEGORIES.forEach((cat, catIndex) => {
        const catImages = images[cat];
        for (let i = 1; i <= 100; i++) {
            const brand = brandNames[Math.floor(Math.random() * brandNames.length)];
            let name, basePrice;

            if (cat === "Perfumes, Colognes & Oils") {
                const types = ["Eau de Parfum", "Mist", "Cologne", "Essential Oil", "Musk", "Extract"];
                const adjectives = ["Midnight", "Rose", "Ocean", "Wood", "Vanilla", "Citrus", "Gold", "Spice"];
                name = `${brand} ${adjectives[Math.floor(Math.random() * adjectives.length)]} ${types[Math.floor(Math.random() * types.length)]}`;
                basePrice = 45000;
            } else if (cat === "Skin Care Products") {
                const types = ["Cleanser", "Serum", "Moisturizer", "Toner", "Sunscreen", "Face Mask", "Scrub"];
                const adjectives = ["Hydrating", "Brightening", "Soothing", "Clear", "Anti-Aging", "Radiance", "Gentle"];
                name = `${brand} ${adjectives[Math.floor(Math.random() * adjectives.length)]} ${types[Math.floor(Math.random() * types.length)]}`;
                basePrice = 35000;
            } else if (cat === "Wigs & Hair") {
                const origins = ["Brazilian", "Peruvian", "Malaysian", "Indian"];
                const styles = ["Body Wave", "Bone Straight", "Deep Wave", "Kinky Curly", "Bob Cut", "Water Wave"];
                const lengths = ["10\"", "16\"", "20\"", "24\"", "30\""];
                name = `${origins[Math.floor(Math.random() * origins.length)]} ${styles[Math.floor(Math.random() * styles.length)]} ${lengths[Math.floor(Math.random() * lengths.length)]}`;
                basePrice = 150000;
            } else if (cat === "Accessories") {
                const types = ["Watch", "Earrings", "Bangle", "Necklace", "Bracelet", "Ring", "Anklet", "Hair Clip"];
                const materials = ["Gold", "Silver", "Diamond", "Pearl", "Crystal", "Rose Gold"];
                name = `${brand} ${materials[Math.floor(Math.random() * materials.length)]} ${types[Math.floor(Math.random() * types.length)]}`;
                basePrice = 20000;
            } else { // Women Electrical Appliances
                const types = ["Hair Dryer", "Flat Iron", "Curling Wand", "Hair Curler", "Steam Brush", "Hot Comb", "Epilator"];
                const adjectives = ["Professional", "Ceramic", "Ionic", "Titanium", "Infrared", "Digital", "Cordless"];
                name = `${brand} ${adjectives[Math.floor(Math.random() * adjectives.length)]} ${types[Math.floor(Math.random() * types.length)]}`;
                basePrice = 80000;
            }

            products.push({
                id: (catIndex + 1) * 1000 + i,
                category: cat,
                name: name,
                price: basePrice + (Math.floor(Math.random() * 20) * 1000),
                rating: parseFloat((Math.random() * (5.0 - 3.8) + 3.8).toFixed(1)),
                image: catImages[i % catImages.length]
            });
        }
    });
    return products;
}
