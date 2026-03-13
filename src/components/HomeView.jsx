import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Scissors, Truck, Star, ChevronLeft, ChevronRight, ShoppingCart } from 'lucide-react';

const HERO_SLIDES = [
    {
        id: 0,
        badge: "✂️ Premium Services",
        title: "Beauty Services",
        subtitle: "At Your Doorstep",
        description: "Braiding, makeup, pedicure, lashes & more — professional beauty care delivered by certified experts right to your home.",
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
        description: "Explore perfumes, skincare, wigs, accessories, electrical appliances and more — all curated for the modern woman.",
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
        description: "Order beauty products and get them delivered quickly anywhere in Kampala and Uganda. Track your order in real time.",
        cta: "Order Now",
        ctaView: "products",
        icon: Truck,
        image: "https://images.unsplash.com/photo-1580870069867-74c57ee1bb07?w=1400&q=80",
        overlay: "from-emerald-900/85 via-teal-900/60 to-transparent",
        accent: "from-emerald-400 via-teal-400 to-cyan-400",
        badge_color: "border-emerald-500/50 bg-emerald-500/10 text-emerald-300",
    },
];

// Generate 30 trending products deterministically from the products pool
function getTrendingProducts(products) {
    if (!products || products.length === 0) return [];
    const shuffled = [...products].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.min(30, shuffled.length));
}

export function HomeView({ settings, setView, products = [], onAddToCart }) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    const trending = useMemo(() => getTrendingProducts(products), [products.length]);

    // Auto-advance every 5 seconds
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
            {/* ─── HERO SECTION ─── */}
            <div className="relative h-[580px] md:h-[650px] overflow-hidden">
                {/* Background images */}
                <AnimatePresence mode="sync">
                    <motion.img
                        key={slide.image}
                        src={slide.image}
                        initial={{ opacity: 0, scale: 1.08 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.97 }}
                        transition={{ duration: 0.9, ease: "easeInOut" }}
                        className="absolute inset-0 w-full h-full object-cover"
                        alt=""
                    />
                </AnimatePresence>

                {/* Gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-r ${slide.overlay}`} />

                {/* Content */}
                <div className="absolute inset-0 flex items-center">
                    <div className="container mx-auto px-6">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentSlide}
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -30 }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                                className="max-w-2xl text-white space-y-6"
                            >
                                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border ${slide.badge_color} backdrop-blur-md text-sm font-semibold`}>
                                    {slide.badge}
                                </div>
                                <h1 className="text-5xl md:text-7xl font-black leading-tight tracking-tight">
                                    {slide.title} <br />
                                    <span className={`text-transparent bg-clip-text bg-gradient-to-r ${slide.accent}`}>
                                        {slide.subtitle}
                                    </span>
                                </h1>
                                <p className="text-lg md:text-xl text-gray-200 leading-relaxed max-w-lg">
                                    {slide.description}
                                </p>
                                <button
                                    onClick={() => setView(slide.ctaView)}
                                    className="inline-flex items-center gap-3 px-8 py-4 bg-white text-gray-900 font-black rounded-2xl shadow-2xl hover:bg-gray-100 transition-all duration-300 hover:scale-105 active:scale-95"
                                >
                                    <slide.icon className="w-5 h-5" />
                                    {slide.cta}
                                </button>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                {/* Slide controls */}
                <div className="absolute bottom-8 left-0 right-0 flex justify-center items-center gap-4">
                    {/* Prev */}
                    <button
                        onClick={() => goTo((currentSlide - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)}
                        className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white hover:bg-white/30 transition"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>

                    {/* Dots */}
                    <div className="flex gap-3">
                        {HERO_SLIDES.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => goTo(i)}
                                className={`transition-all duration-500 rounded-full ${
                                    i === currentSlide
                                        ? 'w-8 h-3 bg-white'
                                        : 'w-3 h-3 bg-white/40 hover:bg-white/70'
                                }`}
                            />
                        ))}
                    </div>

                    {/* Next */}
                    <button
                        onClick={() => goTo((currentSlide + 1) % HERO_SLIDES.length)}
                        className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white hover:bg-white/30 transition"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>

                {/* Slide number indicator */}
                <div className="absolute top-6 right-6 text-white/60 text-sm font-bold tracking-widest">
                    {String(currentSlide + 1).padStart(2, '0')} / {String(HERO_SLIDES.length).padStart(2, '0')}
                </div>
            </div>

            {/* ─── QUICK ACTION CARDS ─── */}
            <div className="container mx-auto px-4 -mt-16 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div onClick={() => setView('services')} className="relative h-56 rounded-3xl shadow-2xl overflow-hidden cursor-pointer group hover:-translate-y-2 transition-all duration-300 border border-gray-100 bg-white">
                        <img src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Services" />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent flex flex-col justify-end p-6">
                            <h3 className="text-xl font-black text-white mb-1">Book a Service</h3>
                            <p className="text-gray-300 text-sm">Professional care at your convenience</p>
                        </div>
                    </div>
                    <div onClick={() => setView('products')} className="relative h-56 rounded-3xl shadow-2xl overflow-hidden cursor-pointer group hover:-translate-y-2 transition-all duration-300 border border-gray-100 bg-white">
                        <img src="https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=800" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Shop" />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent flex flex-col justify-end p-6">
                            <h3 className="text-xl font-black text-white mb-1">Shop Beauty</h3>
                            <p className="text-gray-300 text-sm">Curated products for every skin type</p>
                        </div>
                    </div>

                </div>
            </div>

            {/* ─── TRENDING PIECES ─── */}
            {trending.length > 0 && (
                <div className="container mx-auto px-4 mt-20 mb-12">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-black text-gray-900">Trending Pieces 🔥</h2>
                            <p className="text-gray-500 mt-1">Hand-picked favourites this week</p>
                        </div>
                        <button
                            onClick={() => setView('products')}
                            className="text-sm font-bold text-gray-900 border-b-2 border-gray-900 hover:text-pink-600 hover:border-pink-600 transition"
                        >
                            View All →
                        </button>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {trending.map((product, idx) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.03 }}
                                className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden group cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                            >
                                <div className="relative h-44 overflow-hidden bg-gray-50">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <button
                                        onClick={(e) => { e.stopPropagation(); onAddToCart(product); }}
                                        className="absolute bottom-2 right-2 w-9 h-9 bg-gray-900 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-pink-600 shadow-lg"
                                    >
                                        <ShoppingCart className="w-4 h-4" />
                                    </button>
                                </div>
                                <div className="p-3">
                                    <p className="text-[10px] font-bold uppercase tracking-wider text-pink-500 mb-1">{product.category}</p>
                                    <p className="text-xs font-black text-gray-900 line-clamp-2 mb-2 leading-tight">{product.name}</p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-black text-gray-900">Ugx {product.price?.toLocaleString()}</span>
                                        <div className="flex items-center gap-1">
                                            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                                            <span className="text-[10px] font-bold text-gray-500">{product.rating?.toFixed(1)}</span>
                                        </div>
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
