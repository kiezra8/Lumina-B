import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Scissors, Truck, Star, ChevronLeft, ChevronRight, ShoppingCart } from 'lucide-react';

const HERO_SLIDES = [
    {
        id: 0,
        badge: "✂️ Premium Services",
        title: "Beauty Services",
        subtitle: "At Your Doorstep",
        description: "Braiding, makeup, pedicure, lashes & more.",
        cta: "Book a Service",
        ctaView: "services",
        icon: Scissors,
        image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1400&q=80",
        overlay: "from-purple-900/85 via-pink-900/60 to-transparent",
        accent: "from-pink-400 via-purple-400 to-fuchsia-400",
        badge_color: "border-pink-500/50 bg-pink-500/10 text-pink-300",
    },
    {
        id: 1,
        badge: "🛍️ Online Shop",
        title: "Shop Premium",
        subtitle: "Beauty Products",
        description: "Perfumes, skincare, wigs, and accessories.",
        cta: "Shop Now",
        ctaView: "products",
        icon: ShoppingBag,
        image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1400&q=80",
        overlay: "from-sky-900/85 via-blue-900/60 to-transparent",
        accent: "from-sky-400 via-cyan-400 to-teal-400",
        badge_color: "border-sky-500/50 bg-sky-500/10 text-sky-300",
    },
    {
        id: 2,
        badge: "🚚 Fast Delivery",
        title: "Delivered Fresh",
        subtitle: "Right to Your Door",
        description: "Quick delivery anywhere in Kampala.",
        cta: "Order Now",
        ctaView: "products",
        icon: Truck,
        image: "https://images.unsplash.com/photo-1580870069867-74c57ee1bb07?w=1400&q=80",
        overlay: "from-emerald-900/85 via-teal-900/60 to-transparent",
        accent: "from-emerald-400 via-teal-400 to-cyan-400",
        badge_color: "border-emerald-500/50 bg-emerald-500/10 text-emerald-300",
    },
];

function getTrendingProducts(products) {
    if (!products || products.length === 0) return [];
    // Deterministic shuffle for layout stability
    const shuffled = [...products].sort((a,b) => (a.id * 13 % 100) - (b.id * 13 % 100));
    return shuffled.slice(0, Math.min(30, shuffled.length));
}

export function HomeView({ settings, setView, products = [], onAddToCart, onProductClick }) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    const trending = useMemo(() => getTrendingProducts(products), [products]);

    useEffect(() => {
        if (!isAutoPlaying) return;
        const timer = setInterval(() => {
            setCurrentSlide(prev => (prev + 1) % HERO_SLIDES.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [isAutoPlaying]);

    const goTo = (idx) => {
        setCurrentSlide(idx);
        setIsAutoPlaying(false);
        setTimeout(() => setIsAutoPlaying(true), 10000);
    };

    const slide = HERO_SLIDES[currentSlide];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="view-section"
        >
            {/* ─── HERO SECTION (Shorter like Shein banner) ─── */}
            <div className="relative h-[300px] md:h-[400px] overflow-hidden">
                <AnimatePresence mode="sync">
                    <motion.img
                        key={slide.image}
                        src={slide.image}
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.9, ease: "easeInOut" }}
                        className="absolute inset-0 w-full h-full object-cover"
                        alt=""
                    />
                </AnimatePresence>

                <div className={`absolute inset-0 bg-gradient-to-r ${slide.overlay}`} />

                <div className="absolute inset-0 flex items-center">
                    <div className="container mx-auto px-6">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentSlide}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                                className="max-w-xl text-white space-y-4"
                            >
                                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border ${slide.badge_color} backdrop-blur-md text-xs font-semibold`}>
                                    {slide.badge}
                                </div>
                                <h1 className="text-3xl md:text-5xl font-black leading-tight tracking-tight">
                                    {slide.title} <br />
                                    <span className={`text-transparent bg-clip-text bg-gradient-to-r ${slide.accent}`}>
                                        {slide.subtitle}
                                    </span>
                                </h1>
                                <button
                                    onClick={() => setView(slide.ctaView)}
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-900 font-black rounded-xl shadow-xl hover:bg-gray-100 transition-all hover:scale-105"
                                >
                                    <slide.icon className="w-4 h-4" />
                                    {slide.cta}
                                </button>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                {/* Slideshow Nav Dots */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-center items-center gap-2">
                    {HERO_SLIDES.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => goTo(i)}
                            className={`transition-all duration-300 rounded-full ${
                                i === currentSlide ? 'w-6 h-2 bg-white' : 'w-2 h-2 bg-white/40'
                            }`}
                        />
                    ))}
                </div>
            </div>

            {/* ─── TRENDING PIECES ─── */}
            {trending.length > 0 && (
                <div className="container mx-auto px-4 mt-12 mb-12">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-3xl font-black text-gray-900">Trending 🔥</h2>
                            <p className="text-gray-500 text-sm mt-1">Must-have items this week</p>
                        </div>
                        <button
                            onClick={() => setView('products')}
                            className="text-sm font-bold text-gray-900 bg-gray-100 px-4 py-2 rounded-full hover:bg-gray-200 transition"
                        >
                            View All Shop
                        </button>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        {trending.map((product, idx) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: (idx % 10) * 0.05 }}
                                onClick={() => onProductClick(product)}
                                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group cursor-pointer hover:shadow-xl transition-all duration-300 flex flex-col h-full"
                            >
                                <div className="relative h-48 overflow-hidden bg-gray-50 flex-shrink-0">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-[10px] font-bold shadow-sm flex items-center gap-1">
                                        <Star className="w-3 h-3 text-amber-400 fill-current" /> {product.rating}
                                    </div>
                                </div>
                                <div className="p-3 flex-1 flex flex-col">
                                    <p className="text-[10px] font-bold uppercase tracking-wider text-sky-500 mb-1 line-clamp-1">{product.category}</p>
                                    <p className="text-xs font-bold text-gray-900 line-clamp-2 mb-2 leading-tight">{product.name}</p>
                                    
                                    <div className="mt-auto">
                                        <div className="text-sm font-black text-gray-900 mb-3">Ugx {product.price?.toLocaleString()}</div>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); onAddToCart(product); }}
                                            className="w-full bg-gray-900 text-white hover:bg-sky-600 text-xs font-black py-2.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 group-hover:scale-105"
                                        >
                                            <ShoppingCart className="w-4 h-4" />
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            )}
        </motion.div>
    );
}
