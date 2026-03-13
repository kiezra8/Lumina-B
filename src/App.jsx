import React, { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';

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
    const [cart, setCart] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(null);
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

        // Fixed: onAuthStateChange (not onAuthStateChanged)
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
    };

    const handleAddToCart = (product) => {
        setCart(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
            return [...prev, { ...product, quantity: 1 }];
        });
        setIsCartOpen(true);
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
                        <HomeView settings={settings} setView={setView} products={products} onAddToCart={handleAddToCart} />
                    ) : view === 'services' ? (
                        <ServicesView />
                    ) : view === 'products' ? (
                        <ProductsView
                            products={products}
                            onCategorySelect={(cat) => { setSelectedCategory(cat); setView('category'); }}
                            onSeed={loadData}
                        />
                    ) : view === 'category' ? (
                        <CategoryView
                            category={selectedCategory}
                            products={products.filter(p => p.category === selectedCategory)}
                            onAddToCart={handleAddToCart}
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
        </div>
    );
}
