const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Data
const services = [
    { id: 1, name: "Braiding", price: 150000, time: "4-6 hrs", image: "https://images.unsplash.com/photo-1605218427360-36390f8584b0?w=400" },
    { id: 2, name: "Skin Care", price: 80000, time: "1 hr", image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400" },
    { id: 3, name: "Pedicure", price: 45000, time: "1.5 hrs", image: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=400" },
    { id: 4, name: "Manicure", price: 35000, time: "1 hr", image: "https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=400" },
    { id: 5, name: "Massage", price: 120000, time: "1.5 hrs", image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400" },
    { id: 6, name: "Shaving Hair", price: 20000, time: "45 mins", image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400" },
    { id: 7, name: "Dermatology", price: 150000, time: "Consultation", image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400" },
    { id: 8, name: "Weight Loss Program", price: 300000, time: "Monthly", image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400" }
];

const products = [
    { id: 1, name: "Movit Hair Food", price: 15000, rating: 4.5, image: "https://images.unsplash.com/photo-1608248597279-f99d160bfbc8?w=400" },
    { id: 2, name: "Shea Moisture Cream", price: 35000, rating: 4.8, image: "https://images.unsplash.com/photo-1571875257727-256c39da42af?w=400" },
    { id: 3, name: "African Black Soap", price: 12000, rating: 4.9, image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400" },
    { id: 4, name: "Edge Control Gel", price: 22000, rating: 4.8, image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400" },
    { id: 5, name: "Shea Butter", price: 15000, rating: 5.0, image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=400" },
    { id: 6, name: "Argan Oil Serum", price: 45000, rating: 4.7, image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400" },
    { id: 7, name: "Cocoa Butter Lotion", price: 18000, rating: 4.6, image: "https://images.unsplash.com/photo-1601597111158-2fceff292cdc?w=400" },
    { id: 8, name: "Detangling Brush", price: 25000, rating: 4.9, image: "https://images.unsplash.com/photo-1590159763121-7c9fd312190d?w=400" }
];

// API Endpoints
app.get('/api/services', (req, res) => {
    res.json(services);
});

app.get('/api/products', (req, res) => {
    res.json(products);
});

// Fallback for SPA
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
