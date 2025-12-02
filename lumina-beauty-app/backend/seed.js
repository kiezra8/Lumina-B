import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';
import Service from './models/Service.js';
import Provider from './models/Provider.js';

dotenv.config();

const products = [
    { name: "Movit Hair Food", price: 15000, category: "Hair", rating: 4.5, reviews: 120, image: "https://images.unsplash.com/photo-1608248597279-f99d160bfbc8?auto=format&fit=crop&q=80&w=400", inStock: true, stock: 50 },
    { name: "Shea Moisture Curl Cream", price: 35000, category: "Hair", rating: 4.8, reviews: 95, image: "https://images.unsplash.com/photo-1571875257727-256c39da42af?auto=format&fit=crop&q=80&w=400", inStock: true, stock: 30 },
    { name: "Darling Braiding Hair", price: 30000, category: "Hair Extensions", rating: 5.0, reviews: 200, image: "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?auto=format&fit=crop&q=80&w=400", inStock: true, stock: 100 },
    { name: "Cantu Leave-In Conditioner", price: 28000, category: "Hair", rating: 4.7, reviews: 150, image: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&q=80&w=400", inStock: true, stock: 45 },
    { name: "African Black Soap", price: 12000, category: "Skincare", rating: 4.9, reviews: 310, image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=400", inStock: true, stock: 80 },
    { name: "Cocoa Butter Lotion", price: 18000, category: "Body", rating: 4.6, reviews: 180, image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=400", inStock: true, stock: 60 },
    { name: "Edge Control Gel", price: 22000, category: "Hair", rating: 4.8, reviews: 165, image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&q=80&w=400", inStock: true, stock: 40 },
    { name: "Nail Polish Set", price: 25000, category: "Nails", rating: 4.5, reviews: 90, image: "https://images.unsplash.com/photo-1610992015732-2449b76344bc?auto=format&fit=crop&q=80&w=400", inStock: true, stock: 25 },
    { name: "Argan Oil Hair Serum", price: 40000, category: "Hair", rating: 4.9, reviews: 125, image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&q=80&w=400", inStock: true, stock: 35 },
    { name: "Shea Butter (Raw)", price: 15000, category: "Natural", rating: 5.0, reviews: 220, image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&q=80&w=400", inStock: true, stock: 70 },
];

const services = [
    { name: "Box Braids", price: 150000, time: "5 hrs", type: "braids", image: "https://images.unsplash.com/photo-1583864697784-a0efc8379f70?auto=format&fit=crop&q=80&w=400", available: true },
    { name: "Knotless Braids", price: 180000, time: "6 hrs", type: "braids", image: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&q=80&w=400", available: true },
    { name: "Cornrows Styling", price: 80000, time: "3 hrs", type: "braids", image: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&q=80&w=400", available: true },
    { name: "Passion Twists", price: 160000, time: "5 hrs", type: "twists", image: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?auto=format&fit=crop&q=80&w=400", available: true },
    { name: "Faux Locs", price: 200000, time: "7 hrs", type: "locs", image: "https://images.unsplash.com/photo-1634449571010-02389ed0f9b0?auto=format&fit=crop&q=80&w=400", available: true },
    { name: "Senegalese Twists", price: 170000, time: "6 hrs", type: "twists", image: "https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&q=80&w=400", available: true },
    { name: "Afro Styling & Shaping", price: 50000, time: "2 hrs", type: "natural", image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=400", available: true },
    { name: "Silk Press", price: 90000, time: "3 hrs", type: "styling", image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&q=80&w=400", available: true },
    { name: "Pedicure & Foot Spa", price: 45000, time: "1.5 hrs", type: "nails", image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&q=80&w=400", available: true },
    { name: "Manicure & Nail Art", price: 35000, time: "1 hr", type: "nails", image: "https://images.unsplash.com/photo-1610992015732-2449b76344bc?auto=format&fit=crop&q=80&w=400", available: true },
    { name: "Gel Nails", price: 60000, time: "1.5 hrs", type: "nails", image: "https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&q=80&w=400", available: true },
    { name: "Goddess Braids", price: 140000, time: "4 hrs", type: "braids", image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=400", available: true },
    { name: "Weave Installation", price: 120000, time: "4 hrs", type: "weave", image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&q=80&w=400", available: true },
    { name: "Wig Styling", price: 75000, time: "2 hrs", type: "wig", image: "https://images.unsplash.com/photo-1595475884562-073c30d45670?auto=format&fit=crop&q=80&w=400", available: true },
    { name: "Dreadlocks Maintenance", price: 85000, time: "3 hrs", type: "locs", image: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&q=80&w=400", available: true },
];

const generateProviders = () => {
    const specialties = ['Hair', 'Nails', 'Barber', 'Makeup'];
    const providers = [];

    for (let i = 1; i <= 24; i++) {
        providers.push({
            name: `Provider ${i}`,
            location: 'Uganda',
            rating: (4 + Math.random()).toFixed(1),
            specialty: specialties[Math.floor(Math.random() * specialties.length)],
            bio: 'Experienced professional dedicated to bringing out your best look. Certified and vetted by Lumina Beauty.',
            image: `https://placehold.co/150x150/0ea5e9/ffffff?text=P${i}`,
            verified: true,
            jobsDone: Math.floor(Math.random() * 200) + 50,
            onTimeRate: Math.floor(Math.random() * 10) + 90
        });
    }

    return providers;
};

const seedDatabase = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/lumina-beauty');
        console.log('✅ Connected to MongoDB');

        // Clear existing data
        await Product.deleteMany({});
        await Service.deleteMany({});
        await Provider.deleteMany({});
        console.log('🗑️  Cleared existing data');

        // Insert new data
        await Product.insertMany(products);
        console.log(`✅ Inserted ${products.length} products`);

        await Service.insertMany(services);
        console.log(`✅ Inserted ${services.length} services`);

        const providers = generateProviders();
        await Provider.insertMany(providers);
        console.log(`✅ Inserted ${providers.length} providers`);

        console.log('\n🎉 Database seeded successfully!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
};

seedDatabase();
