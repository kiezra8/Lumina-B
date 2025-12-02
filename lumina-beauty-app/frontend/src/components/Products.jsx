import { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import { useCart } from '../context/CartContext';
import api from '../services/api';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useCart();

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await api.get('/products');
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
            // Fallback to mock data
            setProducts(mockProducts);
        } finally {
            setLoading(false);
        }
    };

    const formatCurrency = (amount) => {
        return 'Ugshs ' + amount.toLocaleString();
    };

    const getStarRating = (rating) => {
        return Array.from({ length: 5 }, (_, i) => (
            <Star
                key={i}
                className="w-3 h-3 text-yellow-500"
                fill={i < Math.floor(rating) ? 'currentColor' : 'none'}
            />
        ));
    };

    if (loading) {
        return <div className="text-center py-8">Loading products...</div>;
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-900">Recommended for You</h2>
                <a href="#" className="text-sm text-pink-600 hover:text-pink-700 hover:underline font-medium">
                    See all
                </a>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {products.map((product) => (
                    <div
                        key={product._id || product.id}
                        className="bg-white rounded-lg border border-gray-200 overflow-hidden futuristic-card cursor-pointer"
                    >
                        <div className="relative aspect-square bg-gray-100">
                            <img
                                src={product.image}
                                className="w-full h-full object-cover"
                                alt={product.name}
                                onError={(e) => {
                                    e.target.src = 'https://placehold.co/400x400/94a3b8/ffffff?text=Product';
                                }}
                            />
                        </div>
                        <div className="p-3">
                            <h3 className="text-sm text-gray-900 font-medium line-clamp-2 mb-2">
                                {product.name}
                            </h3>
                            <div className="flex items-center gap-1 mb-2">
                                {getStarRating(product.rating)}
                                <span className="text-xs text-gray-500 ml-1">
                                    ({product.reviews})
                                </span>
                            </div>
                            <div className="flex items-baseline gap-2 mb-3">
                                <span className="text-lg font-bold text-gray-900">
                                    {formatCurrency(product.price)}
                                </span>
                            </div>
                            <button
                                onClick={() => addToCart(product)}
                                className="w-full bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-all"
                            >
                                Add to Cart
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Mock data fallback
const mockProducts = [
    { id: '1', name: "Movit Hair Food", price: 15000, category: "Hair", rating: 4.5, reviews: 120, image: "https://images.unsplash.com/photo-1608248597279-f99d160bfbc8?auto=format&fit=crop&q=80&w=400" },
    { id: '2', name: "Shea Moisture Curl Cream", price: 35000, category: "Hair", rating: 4.8, reviews: 95, image: "https://images.unsplash.com/photo-1571875257727-256c39da42af?auto=format&fit=crop&q=80&w=400" },
    { id: '3', name: "Darling Braiding Hair", price: 30000, category: "Hair Extensions", rating: 5.0, reviews: 200, image: "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?auto=format&fit=crop&q=80&w=400" },
    { id: '4', name: "Cantu Leave-In Conditioner", price: 28000, category: "Hair", rating: 4.7, reviews: 150, image: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&q=80&w=400" },
    { id: '5', name: "African Black Soap", price: 12000, category: "Skincare", rating: 4.9, reviews: 310, image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=400" },
    { id: '6', name: "Cocoa Butter Lotion", price: 18000, category: "Body", rating: 4.6, reviews: 180, image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=400" },
    { id: '7', name: "Edge Control Gel", price: 22000, category: "Hair", rating: 4.8, reviews: 165, image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&q=80&w=400" },
    { id: '8', name: "Nail Polish Set", price: 25000, category: "Nails", rating: 4.5, reviews: 90, image: "https://images.unsplash.com/photo-1610992015732-2449b76344bc?auto=format&fit=crop&q=80&w=400" },
    { id: '9', name: "Argan Oil Hair Serum", price: 40000, category: "Hair", rating: 4.9, reviews: 125, image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&q=80&w=400" },
    { id: '10', name: "Shea Butter (Raw)", price: 15000, category: "Natural", rating: 5.0, reviews: 220, image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&q=80&w=400" },
];

export default Products;
