import React, { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingCart, Star } from 'lucide-react';

// Component Imports
import Navbar from './components/Navbar';
import { HomeView } from './components/HomeView';
import { ServicesView } from './components/ServicesView';
import { ProductsView } from './components/ProductsView';
import { CategoryView } from './components/CategoryView';
import { AccountView } from './components/AccountView';
import { AuthView } from './components/AuthView';
import { SearchView } from './components/SearchView';
import { MobileNav } from './components/MobileNav';
import { CartDrawer } from './components/CartDrawer';

// --- CONSTANTS ---
const ADMIN_EMAIL = 'israelezrakisakye@gmail.com';

export default function App() {
    const savedView = localStorage.getItem('sera_view');
    const validViews = ['home', 'services', 'products', 'category', 'account', 'login', 'register'];
    const initialView = validViews.includes(savedView) ? savedView : 'home';

    const [view, setView] = useState(initialView);
    const [user, setUser] = useState(null);
    const [products, setProducts] = useState([]);
    const [services, setServices] = useState([]);
    const [cart, setCart] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null); // For product details modal
    const [settings, setSettings] = useState({
        hero1: "https://frohub.com/wp-content/uploads/2024/11/brown-fulani-braids.jpg",
        hero2: "https://media.istockphoto.com/id/1973193559/photo/smiling-barber-trimming-a-customers-hair-in-a-busy-barber-shop.jpg?s=612x612&w=0&k=20&c=K6zK0el3L59wPbfl2RM4veJvo8M9tBtqrNHdS0S4gk8=",
        hero3: "https://images.unsplash.com/photo-1580870069867-74c57ee1bb07?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2tpbiUyMGNhcmUlMjBwcm9kdWN0c3xlbnwwfHwwfHx8MA%3D%3D"
    });

    const isAdmin = user?.email === ADMIN_EMAIL;

    useEffect(() => {
        // Safe check for session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setUser(session?.user ?? null);
            if (!session?.user && (view === 'account' || view === 'admin')) {
                setView('home');
            }
        }).catch(err => {
            console.error("Session fetch failed:", err);
            setUser(null);
        });

        const { data } = supabase.auth.onAuthStateChange((_event, session) => {
            const currentUser = session?.user ?? null;
            setUser(currentUser);
            if (!currentUser && (view === 'account' || view === 'admin')) {
                setView('home');
            }
        });

        loadData();
        return () => {
            if (data?.subscription) {
                data.subscription.unsubscribe();
            }
        };
    }, []);

    useEffect(() => {
        // Scroll to top on view change
        window.scrollTo({ top: 0, behavior: 'auto' });
        
        if (!user && (view === 'account' || view === 'admin')) {
            setView('home');
        }
        localStorage.setItem('sera_view', view);
    }, [view, user]);

    const loadData = async () => {
        const { data: settingsData } = await supabase.from('site_settings').select('*');
        if (settingsData) {
            const s = { ...settings };
            settingsData.forEach(item => s[item.key] = item.value);
            setSettings(s);
        }

        const { data: productsData } = await supabase.from('products').select('*');
        if (productsData) setProducts(productsData);

        const { data: servicesData } = await supabase.from('services').select('*');
        if (servicesData) setServices(servicesData);
    };

    const handleAddToCart = (product, e) => {
        if(e) e.stopPropagation();
        setCart(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
            return [...prev, { ...product, quantity: 1 }];
        });
        setIsCartOpen(true);
        setSelectedProduct(null); // Close modal if open
    };

    const handleCheckout = () => {
        if (cart.length === 0) return;
        let msg = "Hello! I'd like to buy:\n";
        cart.forEach(i => msg += `- ${i.name} x${i.quantity}\n`);
        const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        msg += `\nTotal: Ugshs ${total.toLocaleString()}`;
        window.open(`https://wa.me/256753280593?text=${encodeURIComponent(msg)}`, '_blank');
    };

    return (
        <div className="min-h-screen bg-white font-outfit text-gray-900 overflow-x-hidden">
            <Navbar
                view={view}
                setView={setView}
                user={user}
                cartCount={cart.reduce((s, i) => s + i.quantity, 0)}
                onToggleCart={() => setIsCartOpen(!isCartOpen)}
                onSearch={setSearchQuery}
            />

            <main className="pt-20 pb-24 md:pb-12">
                <AnimatePresence mode="wait">
                    {searchQuery ? (
                        <SearchView query={searchQuery} products={products} onAddToCart={handleAddToCart} />
                    ) : view === 'home' ? (
                        <HomeView settings={settings} setView={setView} products={products} onAddToCart={handleAddToCart} onProductClick={setSelectedProduct} />
                    ) : view === 'services' ? (
                        <ServicesView isAdmin={isAdmin} services={services} onRefresh={loadData} />
                    ) : view === 'products' ? (
                        <ProductsView
                            products={products}
                            settings={settings}
                            isAdmin={isAdmin}
                            onCategorySelect={(cat) => { setSelectedCategory(cat); setView('category'); }}
                            onSeed={loadData}
                            onRefresh={loadData}
                        />
                    ) : view === 'category' ? (
                        <CategoryView
                            category={selectedCategory}
                            products={products.filter(p => p.category === selectedCategory)}
                            isAdmin={isAdmin}
                            onRefresh={loadData}
                            onAddToCart={handleAddToCart}
                            onProductClick={setSelectedProduct}
                        />
                    ) : view === 'account' ? (
                        <AccountView user={user} isAdmin={isAdmin} products={products} onRefresh={loadData} />
                    ) : view === 'login' || view === 'register' ? (
                        <AuthView mode={view} setView={setView} />
                    ) : null}
                </AnimatePresence>
            </main>

            <MobileNav view={view} setView={setView} user={user} />
            <CartDrawer
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
                cart={cart}
                setCart={setCart}
                onCheckout={handleCheckout}
            />

            {/* Product Details Modal */}
            <AnimatePresence>
                {selectedProduct && (
                    <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm p-0 sm:p-4" onClick={() => setSelectedProduct(null)}>
                        <motion.div
                            initial={{ opacity: 0, y: 100 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 100 }}
                            onClick={e => e.stopPropagation()}
                            className="bg-white w-full sm:max-w-xl sm:rounded-[2.5rem] rounded-t-[2.5rem] overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
                        >
                            <div className="relative h-64 sm:h-80 flex-shrink-0 bg-gray-50">
                                <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover" />
                                <button
                                    onClick={() => setSelectedProduct(null)}
                                    className="absolute top-4 right-4 bg-white/90 p-2 rounded-full shadow-lg backdrop-blur-md"
                                >
                                    <X className="w-5 h-5 text-gray-900" />
                                </button>
                                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold shadow-sm flex items-center gap-1">
                                    <Star className="w-4 h-4 text-amber-400 fill-current" /> {selectedProduct.rating}
                                </div>
                            </div>
                            <div className="p-6 sm:p-8 flex-1 overflow-y-auto">
                                <div className="text-sm font-black text-sky-500 uppercase tracking-widest mb-2">{selectedProduct.category}</div>
                                <h3 className="text-2xl sm:text-3xl font-black text-gray-900 mb-4">{selectedProduct.name}</h3>
                                <div className="text-3xl font-black text-gray-900 mb-6">Ugx {selectedProduct.price?.toLocaleString()}</div>
                                
                                <div className="mb-8">
                                    <h4 className="font-bold text-gray-900 mb-2">Description</h4>
                                    <p className="text-gray-500 text-sm leading-relaxed">
                                        {selectedProduct.description || "Premium quality product carefully selected for you. Perfect for everyday use and special occasions to bring out your natural glow."}
                                    </p>
                                </div>

                                <button
                                    onClick={(e) => handleAddToCart(selectedProduct, e)}
                                    className="w-full bg-gray-900 text-white font-black py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-sky-600 transition-colors shadow-xl"
                                >
                                    <ShoppingCart className="w-5 h-5" />
                                    ADD TO CART
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
